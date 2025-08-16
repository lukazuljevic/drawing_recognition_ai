import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserLogin } from "../../api/auth/useUserLogin";
import { ROUTES } from "../../constants/routes";
import { FormEvent } from "react";
import c from "./Auth.module.css";

export const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useUserLogin(() => navigate(ROUTES.HOMEPAGE));

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className={c.authContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
