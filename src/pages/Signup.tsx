import { useState } from "react";
import axios, {AxiosError} from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
    } catch (err: unknown) {
        const error = err as AxiosError<{ error: string }>;
        alert(error.response?.data?.error || "Signin failed");
      }      
  };

  return (
    <div>
      <h2>Signup</h2>
      <input name="name" onChange={handleChange} placeholder="Name" /><br/>
      <input name="email" onChange={handleChange} placeholder="Email" /><br/>
      <input name="phonenumber" onChange={handleChange} placeholder="Phone" /><br/>
      <input name="password" onChange={handleChange} placeholder="Password" type="password" /><br/>
      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
}
