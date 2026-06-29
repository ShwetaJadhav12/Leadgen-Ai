import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authServices";
export default function Login() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await login(formData);

    // Save JWT token
    localStorage.setItem("token", response.token);

    // Save user details
    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    alert("Login Successful!");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm">

        <h1 className="text-4xl font-bold text-center mb-2">
          LeadGen AI
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sign in to your account
        </p>

<form
  onSubmit={handleSubmit}
  className="space-y-4"
>
         <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email"
  className="w-full border rounded-xl p-3"
/>

          <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Password"
  className="w-full border rounded-xl p-3"
/>

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-violet-600 text-white py-3 rounded-xl disabled:opacity-50"
>
  {loading ? "Signing In..." : "Sign In"}
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