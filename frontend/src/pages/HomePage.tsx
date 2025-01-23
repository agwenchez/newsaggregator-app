import { useEffect, useState } from "react";
import {
  availableCategories,
  Category,
  DateFormat,
  DatePicker,
  images,
  // searchOrFilter,
  Source,
  sourceLabels,
  sources,
} from "../@types";
import { useLazyGetArticlesQuery, useLazyGetPreferedArticlesQuery,  } from "../app/services";
import Pagination from "../components/Pagination";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../app/store";
import { logout } from "../features/auth/authSlice";
import { useDebounce } from "../hooks/useDebounce";

const HomePage = () => {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [source, setSource] = useState<Source | "">("");
  const dispatch = useAppDispatch();
  //   const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");
const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [activeFilter, setActiveFilter] = useState<boolean>(true);
  const [dateFilter, setDateFilter] = useState<DatePicker>({
    start_date: undefined,
    end_date: undefined,
  });
  const { start_date, end_date } = dateFilter;
  // const filteredRef = useRef<searchOrFilter | null>(null);
  const [trigger, { data: allArticles, isLoading, isFetching }] =
    useLazyGetArticlesQuery({});

  const [triggerPreferredArticles, { data: preferedArticles, isLoading :isPreferredLoading, isFetching: isPreferredFetching }] =
    useLazyGetPreferedArticlesQuery({});

    const articles = auth?.user ? preferedArticles : allArticles;
  const itemsPerPage = articles?.per_page ?? 10;
  const totalPages = articles?.total
    ? Math.ceil(articles.total / itemsPerPage)
    : 0;

  const totalResults = articles?.total ?? 0;

  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, articles?.total ?? 0);
  const [category, setCategory] = useState<Category | "">("");

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

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // filteredRef.current = "search";
    setSearchTerm(e.target?.value);
    setActiveFilter(true);
  };
  // const clearDateFilter = () => {
  //   filteredRef.current = "search";
  //   setDateFilter({
  //     start_date: undefined,
  //     end_date: undefined,
  //   });
  //   setActiveFilter(true);
  // };
  // const handleFilter = () => {
  //   if (start_date && end_date) {
  //     setActiveFilter(true);
  //   }
  // };

  useEffect(() => {
    if (!activeFilter) return;
  
    // Debounced search and filtering(500ms)
    // const debounceTimeout = setTimeout(() => {
      trigger({
        start_date: start_date ? dayjs(start_date).format(DateFormat) : undefined,
        end_date: end_date ? dayjs(end_date).format(DateFormat) : undefined,
        search_term: searchTerm,
        page: currentPage,
        source,
        category,
      })
        .unwrap()
        .then()
        .catch((error) => console.log("An error occured while fetching articles", error));
        
      triggerPreferredArticles({
        start_date: start_date ? dayjs(start_date).format(DateFormat) : undefined,
        end_date: end_date ? dayjs(end_date).format(DateFormat) : undefined,
        search_term: searchTerm,
        page: currentPage,
        source,
        category,
      })
        .unwrap()
        .then()
        .catch((error) => console.log("An error occured while fetching preferred articles", error));
  
      setActiveFilter(false);
    // }, 500);
  
    // return () => clearTimeout(debounceTimeout); 
  }, [activeFilter, searchTerm, currentPage, trigger, start_date, end_date, source, category, triggerPreferredArticles]);
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setActiveFilter(true);
    // console.log("Current page", page);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="mb-48">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-4">
        <a href="index.html">
          <img className="w-24" src="images/logo.png" alt="Logo" />
        </a>
        <ul className="flex space-x-6 mr-6 text-lg">
          {auth?.user ? (
            <>
              <li>
                <Link to={"/register"} className="hover:text-blue-500 pointer">
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
          <h1 className="text-6xl font-bold uppercase text-white">
            News<span className="text-red-600">World</span>
          </h1>
          <p className="text-1xl text-gray-200 font-bold my-4">
            Find or search articles from various sources
          </p>
          <div>
            {/* <a
              href="register.html"
              className="inline-block border-2  border-white text-white py-2 px-4 rounded-xl uppercase mt-2 hover:bg-white hover:text-black hover:border-black"
            >
              Sign Up to Set Preferences
            </a> */}
            <Link
              to={"/register"}
              className="inline-block border-2  border-white text-white py-2 px-4 rounded-xl uppercase mt-2 hover:bg-white hover:text-black hover:border-black"
            >
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <main className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col sm:flex-row justify-center w-full items-center gap-1 sm:gap-4">
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
                className="h-14 w-full pl-4 md:pl-10 pr-1 md:pr-10 rounded-lg z-0 focus:shadow focus:outline-none"
                placeholder="Search articles by title or description..."
              />
              <div className="absolute top-2 right-2"></div>
            </div>
          </form>
          <div className="flex gap-1 px-4 sm:gap-4 w-full sm:w-1/3">
            <select
              id="source-dropdown"
              value={source}
              onChange={handleSourceChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
            >
              <option value="" onClick={() => setSource("")}>
                Select a Souce
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
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md h-14"
              disabled={!source} //Disabled if not souce is selected
            >
              <option value="" onClick={() => setCategory("")}>
                Select a Category
              </option>
              {/* Display only the category associated with each source */}
              {availableCategories[source]?.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4 mt-10">
          {/* {isLoading && !isFetching && (
            <p className="text-center mt-10">Loading articles...</p>
          )} */}

          {isFetching && (
            <p className="text-center mt-4">Fetching articles...</p>
          )}
          {!articles?.data.length && !isLoading && !isFetching && (
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
                    className="hidden w-48 mr-6 md:block"
                    src={`${images[article.source]}`}
                    //   src={`images/${company.toLowerCase().replace(/ /g, "-")}.png`}
                    alt={`${article.source} - articleimage`}
                  />
                  <div>
                    <h3 className="text-2xl">
                      <a href="show.html">{article.title}</a>
                    </h3>
                    <div className="text-xl font-bold mb-4">
                      {article.description}
                    </div>
                    <ul className="flex">
                      <li className="flex items-center justify-center bg-red-500 text-white rounded-xl py-1 px-3 mr-2 text-sm">
                        <p>Category:</p>{" "}
                        <a href="#" className="pl-2">
                          {" "}
                          {article.category}
                        </a>
                      </li>
                    </ul>
                    <div className="text-lg mt-4">
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      {article.author}
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
