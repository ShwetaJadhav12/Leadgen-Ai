import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm">

        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account
        </h1>

        <form className="space-y-4 mt-6">

          <input
            placeholder="Name"
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Email"
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Password"
            className="w-full border rounded-xl p-3"
          />

          <button
            className="w-full bg-violet-600 text-white py-3 rounded-xl"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center mt-4">
          Already have an account?
          <Link
            to="/"
            className="text-violet-600 ml-1"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}