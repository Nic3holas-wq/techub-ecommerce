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
    <div>
      <h2>Signin</h2>
      <input name="email" onChange={handleChange} placeholder="Email" /><br/>
      <input name="password" onChange={handleChange} placeholder="Password" type="password" /><br/>
      <button onClick={handleSubmit}>Signin</button>
    </div>
  );
}
