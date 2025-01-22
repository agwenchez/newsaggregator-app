
const Register = () => {
  return (
    <div className="mx-4">
      <div className="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
        <header className="text-center">
          <h2 className="text-2xl font-bold uppercase mb-1">Register</h2>
          <p className="mb-4">Create an account to post gigs</p>
        </header>

        <form>
          <div className="mb-6">
            <label htmlFor="name" className="inline-block text-lg mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-200 rounded p-2 w-full"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="inline-block text-lg mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-200 rounded p-2 w-full"
            />
            <p className="text-red-500 text-xs mt-1">
              Please enter a valid email
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="inline-block text-lg mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-200 rounded p-2 w-full"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password2" className="inline-block text-lg mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              className="border border-gray-200 rounded p-2 w-full"
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="bg-laravel text-white rounded py-2 px-4 hover:bg-black"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-8">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-laravel">
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
