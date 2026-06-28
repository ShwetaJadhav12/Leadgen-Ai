import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authServices";
export default function Signup() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  fullName: "",
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

    await signup(formData);

    alert("Account created successfully!");

    navigate("/");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Signup failed"
    );

  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm">

        <h1 className="text-4xl font-bold text-center mb-2">
          Create Account
        </h1>

<form
  onSubmit={handleSubmit}
  className="space-y-4 mt-6"
>
          <input
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  placeholder="Name"
  className="w-full border rounded-xl p-3"
/>

          <input
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email"
  className="w-full border rounded-xl p-3"
/>

         <input
  name="password"
  type="password"
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
  {loading ? "Creating Account..." : "Sign Up"}
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