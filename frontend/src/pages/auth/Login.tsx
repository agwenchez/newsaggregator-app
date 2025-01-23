import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { useLoginMutation } from "../../app/services/authService";
import { LoginRequest } from "../../@types";
import { setCredentials } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: LoginRequest) => {
    console.log(data);
    login(data)
      .unwrap()
      .then((result) => {
        const { user, token } = result;
        console.log("Result", result)
        if (result) {
          dispatch(
            setCredentials({
              user,
              token,
            })
          );
          navigate("/");
          toast.success("You have logged in successfully!");
        }
      })
      .catch((error) => {
        console.log("An error occured", error)
        toast.error(`${error?.data?.message}`)
    });
  };
  return (
    <div className="mx-4">
      <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
        <header className="text-center">
          <h2 className="text-2xl font-bold uppercase mb-1">Login</h2>
          <p className="mb-4">Login to your account </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="email" className="inline-block text-lg mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-200 rounded p-2 w-full"
              required
              {...register("email")}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="inline-block text-lg mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-200 rounded p-2 w-full"
              required
              {...register("password", {
                minLength: 6,
              })}
            />
            {errors.password && errors.password.type === "minLength" && (
              <p className="text-red-500">
                Password should be atleast 6 characters.
              </p>
            )}
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-black w-full text-white rounded py-2 px-4 hover:bg-green-500"
            >
              Login
            </button>
          </div>

          <div className="mt-8">
            <p>
              Don't have an account?{" "}
              {/* <a href="/login" className="text-laravel"></a> */}
              <Link to={"/register"} className="text-laravel">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
