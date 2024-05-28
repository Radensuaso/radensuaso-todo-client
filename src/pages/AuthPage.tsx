import React, { useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import Main from "../components/Main";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const AuthPage: React.FC = () => {
  const { login, register, logout, isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (isLogin) {
          await login(username, password);
          navigate("/");
        } else {
          await register(username, password);
          navigate("/"); 
        }
      } catch (error) {
        console.error(`${isLogin ? "Login" : "Registration"} failed`, error);
        setErrorMessage(`${isLogin ? "Login" : "Registration"} failed`);
        if (isLogin) {
          setIsLogin(false);
        }
      }
    },
    [username, password, isLogin, login, register, navigate]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/auth");
  }, [logout, navigate]);

  return (
    <Main>
      {isAuthenticated ? (
        <div>
          <h1>You are logged in</h1>
          <Button onClick={handleLogout} variant="danger">
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <h1>{isLogin ? "Login" : "Register"}</h1>
          {errorMessage && (
            <div className="text-center text-danger mb-4">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <TextInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div>
              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <Button type="submit" variant="success">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          <Button onClick={() => setIsLogin(!isLogin)} variant="warning">
            Switch to {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      )}
    </Main>
  );
};

export default React.memo(AuthPage);
