import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm">

        <h1 className="text-4xl font-bold text-center mb-2">
          LeadGen AI
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sign in to your account
        </p>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl p-3"
          />

          <button
            className="w-full bg-violet-600 text-white py-3 rounded-xl"
          >
            Sign In
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?
          <Link
            to="/signup"
            className="text-violet-600 ml-1"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}