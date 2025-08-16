import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRegister } from "../../api/auth/useUserRegister";
import { ROUTES } from "../../constants/routes";
import { FormEvent } from "react";
import c from "./Auth.module.css";
import toast from "react-hot-toast";

export const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useUserRegister(() => navigate(ROUTES.HOMEPAGE));

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    registerMutation.mutate({ username, password });
  };

  return (
    <div className={c.authContainer}>
      <h1>Register</h1>
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

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={registerMutation.isLoading}>
          {registerMutation.isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};
