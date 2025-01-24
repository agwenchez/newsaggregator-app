import React, { useCallback, useEffect, useState } from "react";
import {
  availableCategories,
  Category,
  DateFormat,
  DatePickerFilter,
  images,
  Source,
  sourceLabels,
  sources,
} from "../@types";
import {
  useGetAuthorsQuery,
  useLazyGetArticlesQuery,
  useLazyGetPreferedArticlesQuery,
} from "../app/services";
import Pagination from "../components/Pagination";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa";
import CustomDateInput from "../components/CustomDateInput";
import { Author } from "../@types/preferences";

const HomePage = () => {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [source, setSource] = useState<Source | "">("");
  const [category, setCategory] = useState<Category | "">("");
  const [author, setAuthor] = useState("");
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<boolean>(true);
  const [openDateFilter, setOpenDateFilter] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<DatePickerFilter>({
    start_date: null,
    end_date: null,
  });
  const { start_date, end_date } = dateFilter;
  const [trigger, { data: allArticles, isLoading, isFetching }] =
    useLazyGetArticlesQuery({});
  const { data: authors } = useGetAuthorsQuery();

  const [
    triggerPreferredArticles,
    {
      data: preferedArticles,
      isLoading: isPreferredLoading,
      isFetching: isPreferredFetching,
    },
  ] = useLazyGetPreferedArticlesQuery({});

  const articles = auth?.user ? preferedArticles : allArticles;
  const itemsPerPage = articles?.per_page ?? 10;
  const totalPages = articles?.total
    ? Math.ceil(articles.total / itemsPerPage)
    : 0;

  const totalResults = articles?.total ?? 0;

  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, articles?.total ?? 0);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value as Category);
    setActiveFilter(true);
  };

  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value as Source);
    setActiveFilter(true);
  };
  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAuthor(event.target.value as Source);
    setActiveFilter(true);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target?.value);
    // setActiveFilter(true);
  };
  const clearDateFilter = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(!start_date || !end_date) return
    setDateFilter({
      start_date: null,
      end_date: null,
    });
    setActiveFilter(true);
  };
  const clearAllFilters = () => {
    // if not filters are being used, just exit
    // if (!source || !category || !author) return;
    setDateFilter({
      start_date: null,
      end_date: null,
    });
    setSource("");
    setCategory("");
    setAuthor("")
    setActiveFilter(true);
  };

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    if (!dateFilter) return;
    e.preventDefault();
    if (start_date && end_date) {
      setActiveFilter(true);
    }
  };

  const toggleDateFilter = () => {
    setOpenDateFilter((prevState) => !prevState);
  };

  const handleLogout = useCallback(() => {
    dispatch(logout());
    window.location.reload();
  }, [dispatch]);

  useEffect(() => {
    const debouncedTimer = setTimeout(() => {
      //   console.log(`Searching for ${searchTerm}`);
      setActiveFilter(true);
    }, 500);

    return () => clearTimeout(debouncedTimer);
  }, [searchTerm]);

  useEffect(() => {
    if (!activeFilter && !auth?.user?.id) return;
    trigger({
      start_date: start_date ? dayjs(start_date).format(DateFormat) : undefined,
      end_date: end_date ? dayjs(end_date).format(DateFormat) : undefined,
      search_term: searchTerm,
      page: currentPage,
      source,
      category,
      author
    })
      .unwrap()
      .then()
      .catch((error) =>
        console.log("An error occured while fetching articles", error)
      );

    if (!activeFilter) return;
    if (auth?.user) {
      triggerPreferredArticles({
        start_date: start_date
          ? dayjs(start_date).format(DateFormat)
          : undefined,
        end_date: end_date ? dayjs(end_date).format(DateFormat) : undefined,
        search_term: searchTerm,
        page: currentPage,
        source,
        category,
      })
        .unwrap()
        .then()
        .catch((error) =>
          console.log(
            "An error occured while fetching preferred  articles",
            error
          )
        );
    }
    setActiveFilter(false);
  }, [activeFilter, searchTerm, currentPage, trigger, start_date, end_date, source, category, triggerPreferredArticles, handleLogout, auth?.user, author]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setActiveFilter(true);
  };

  return (
    <div className="mb-48">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-4 pt-4">
        <h2 className="pl-3">LOGO</h2>
        <ul className="flex space-x-6 mr-6 text-lg">
          {auth?.user ? (
            <>
              <li>
                <Link
                  to={"/preferences"}
                  state={{ data: "exampleData" }}
                  className="hover:text-blue-500 pointer"
                >
                  <i className="fa-solid fa-user-plus"></i>
                  Preferences
                </Link>
              </li>
              <li>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-blue-500"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  Logout
                </p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/register"} className="hover:text-laravel">
                  <i className="fa-solid fa-user-plus"></i>
                  Register
                </Link>
              </li>
              <li>
                <Link to={"/login"} className="hover:text-laravel">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="relative h-72 bg-laravel flex flex-col justify-center align-center text-center space-y-4 mb-4">
        <div
          className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-center"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/004/288/148/non_2x/sale-banner-poster-flyer-design-with-pattern-on-dark-black-canvas-and-grunge-texture-background-modern-design-backdrop-template-for-advertisement-social-and-fashion-ads-free-vector.jpg')",
          }}
        ></div>
        <div className="z-10">
          <h1 className="text-5xl sm:text-6xl font-bold uppercase text-white">
            News<span className="text-red-600">World</span>
          </h1>
          <p className="text-sm sm:text-1xl text-gray-200 font-bold my-4">
            Find or search articles from various sources
          </p>
          <div>
            <Link
              to={auth?.user ? "/preferences" : "/register"}
              className="inline-block border-2  border-white text-white py-2 px-4 rounded-xl uppercase mt-2 hover:bg-white hover:text-black hover:border-black"
            >
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              {auth?.user ? "Edit Preferences" : "Create Preferences"}
            </Link>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <main className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 flex flex-col">
        <div className="flex flex-col sm:flex-row justify-center w-full items-center gap-1 sm:gap-4 relative">
          <form className="w-full sm:w-2/3">
            <div className="relative border-2 border-gray-100 m-4 rounded-lg">
              <div className="absolute top-4 left-3">
                <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
              </div>
              <input
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleSearch}
                className="h-12 w-full pl-4 md:pl-4 pr-1 md:pr-10 rounded-lg z-0 focus:shadow focus:outline-none"
                placeholder="Search articles by title or description..."
              />
              <div className="absolute top-2 right-2"></div>
            </div>
          </form>
          <div className="flex gap-1 px-4 sm:px-0 sm:mr-[6.5rem] sm:gap-4 w-full sm:w-1/3">
            <select
              id="source-dropdown"
              value={source}
              onChange={handleSourceChange}
              className="mt-1 w-full sm:w-32 pl-4 border border-gray-300 rounded-md h-12 text-sm"
            >
              <option value="" onClick={() => setSource("")}>
                Select Souce
              </option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {sourceLabels[source]}
                </option>
              ))}
            </select>
            <select
              id="category-dropdown"
              value={category}
              onChange={handleCategoryChange}
              className="mt-1 w-full sm:w-32 pl-4 border border-gray-300 rounded-md h-12 text-sm"
              disabled={!source} //Disabled if no souce is selected
            >
              <option value="" onClick={() => setCategory("")}>
                Select Category
              </option>
              {/* Display only the category associated with each source */}
              {availableCategories[source]?.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              id="author-dropdown"
              value={author}
              onChange={handleAuthorChange}
              className="mt-1 w-full sm:w-36 pl-4 border border-gray-300 rounded-md h-12 text-sm"
            >
              <option value="" onClick={() => setCategory("")}>
                Select Author
              </option>
              {(authors as Author[]) &&
                authors?.map(({ author }) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
            </select>
          </div>
       
        </div>
        <div className="flex sm:self-end relative gap-2 ml-4 sm:ml-0">
          <div
            className="border-2 mt-2 sm:my-0 w-full sm:w-32 text-sm flex p-3 items-center justify-center rounded-md cursor-pointer"
            onClick={toggleDateFilter}
          >
            <p>Filter by Date</p>
          </div>
          <div
            onClick={clearAllFilters}
            className="w-full sm:w-28 flex h-12 mt-2 sm:mt-0 items-center justify-center rounded-md cursor-pointer mr-4 bg-red-500 text-white gap-2"
          >
            <FaTrash />
            <p className="text-sm">Clear All</p>
          </div>
          {openDateFilter && (
            <form
              onSubmit={(e) => handleFilter(e)}
              className="absolute sm:right-0 top-[3.8rem] sm:top-[4rem] border-2 z-10 bg-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2"
            >
              <div className="flex items-center justify-center">
                <label htmlFor="start_date" className="ml-2 mr-1">
                  From:
                </label>
                <DatePicker
                  selected={start_date}
                  onChange={(date) =>
                    setDateFilter({ ...dateFilter, start_date: date })
                  }
                  customInput={<CustomDateInput value={start_date} />}
                />
              </div>
              <div className="flex items-center justify-center">
                <label htmlFor="end_date" className="ml-6 mr-1">
                  To:
                </label>
                <DatePicker
                  selected={end_date}
                  onChange={(date) =>
                    setDateFilter({ ...dateFilter, end_date: date })
                  }
                  customInput={<CustomDateInput value={end_date} />}
                />
              </div>
              <div className="flex self-end gap-2">
                <button
                  type="button"
                  onClick={(e)=>clearDateFilter(e)}
                  className="self-end bg-red-500 text-white text-sm py-1 px-4 rounded-3xl mt-1"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="self-end bg-blue-700 text-white text-sm py-1 px-4 rounded-3xl mt-1"
                >
                  Filter
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4 mt-10 mb-20">
          {(isFetching ||
            isLoading ||
            isPreferredFetching ||
            isPreferredLoading) && (
            <div className="flex items-center justify-center min-h-96">
              <p className="text-center">Fetching articles...</p>
            </div>
          )}
          {!articles?.data.length && !isPreferredLoading && !isPreferredFetching && !isLoading && !isFetching && (
            <p className="text-center mt-4">No articles found...</p>
          )}

          {!isFetching &&
            articles &&
            articles.data.map((article, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded p-6"
              >
                <div className="flex">
                  <img
                    className="w-32 h-40 mr-6 md:block"
                    src={`${images[article.source]}`}
                    //   src={`images/${company.toLowerCase().replace(/ /g, "-")}.png`}
                    alt={`${article.source} - articleimage`}
                  />
                  <div>
                    <h3 className="text-base sm:text-xl font-bold truncate w-24 sm:w-64">
                      {article.title}
                    </h3>
                    <div className="text-xs sm:text-sm mb-4">
                      {article.description}
                    </div>
                    <ul className="flex justify-end">
                      <li className="flex items-center justify-end bg-red-500 text-white rounded-xl py-1 px-3 mr-2 text-sm ">
                        <p>Category:</p>
                        <p className="pl-2">{article.category}</p>
                      </li>
                    </ul>
                    <div className="text-sm sm:text-base mt-4 flex justify-end">
                      By {article.author}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            firstItem={firstItem}
            lastItem={lastItem}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;
