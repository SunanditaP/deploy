import { useState } from "react";
import axios from "axios";
import "./App.css";

import { useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:8000`;

function App() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_BASE_URL}/api/signup/`,
        {
          username,
          email,
          password,
        },
      );

      // store in redux
      dispatch(addUser({ username, email }));

      alert("Signup Successful");

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data || {}) ||
        error.message ||
        "Signup Failed";
      alert(`Signup Failed: ${message}`);
    }
  };

  return (
    <div className="container">
      <h2>Signup Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default App;
