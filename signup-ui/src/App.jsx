import { useState } from "react";
import axios from "axios";
import "./App.css";

import { useDispatch } from "react-redux";
import { addUser } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        username,
        email,
        password,
      });

      // store in redux
      dispatch(addUser({ username, email }));

      alert("Signup Successful");

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Signup Failed");
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
