import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { useRegisterMutation } from "../../app/services/authService";
import { setCredentials } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Record<string, string>) => {
    console.log(data);
    const { name, email, password } = data;
    const formData = {
      name,
      email,
      password,
    };
    registerUser(formData)
      .unwrap()
      .then((result) => {
        const { user, token } = result;
        if (result) {
          dispatch(
            setCredentials({
              user,
              token,
            })
          );
          navigate("/");
          toast.success("Account created successfully!");
        }
      })
      .catch((error) => {
        console.log("An error occured", error)
        if(error?.data?.message == 'The email has already been taken.'){
          toast.error("The email has already been taken")
        }
      });
  };
  return (
    <div className="mx-4">
      <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
        <header className="text-center">
          <h2 className="text-2xl font-bold uppercase mb-1">Register</h2>
          <p className="mb-4">Create an account to view preferred articles</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="name" className="inline-block text-lg mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-200 rounded p-2 w-full"
              required
              {...register("name", {
                minLength: 3,
              })}
            />
            {errors.name && errors.name.type === "minLength" && (
              <p className="text-red-500">
                Name should be atleast 3 characters.
              </p>
            )}
          </div>

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
            <label
              htmlFor="confirm_password"
              className="inline-block text-lg mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="border border-gray-200 rounded p-2 w-full"
              {...register("confirm_password", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-500">Your passwords do not match</p>
            )}
          </div>

          <div className="mb-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black w-full text-white rounded py-2 px-4 hover:bg-green-500"
            >
              {isLoading ? <Spinner secondaryColor="black" /> : "Sign Up"}
            </button>
          </div>

          <div className="mt-8">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-black hover:text-blue-500">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
