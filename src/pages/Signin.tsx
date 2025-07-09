import { useState } from "react";
import axios, {AxiosError} from "axios";

interface User {
    email : string,
    password: string
}
export default function Signin() {
  const [form, setForm] = useState<User>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/signin", form);
      localStorage.setItem("token", res.data.token);
      alert("Signin successful!");
    } catch (err: unknown) {
        const error = err as AxiosError<{ error: string }>;
        alert(error.response?.data?.error || "Signin failed");
      }      
  };

  return (
    <div className="max-w-sm mx-auto mt-15 p-6 bg-white rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">Sign In</h2>

  <input
    name="email"
    onChange={handleChange}
    placeholder="Email"
    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  <input
    name="password"
    onChange={handleChange}
    placeholder="Password"
    type="password"
    className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  <button
    onClick={handleSubmit}
    className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
  >
    Sign In
  </button>
</div>

  );
}
