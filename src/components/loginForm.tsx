import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/index.css";
import { useEffect, useState } from "react";
import { useAuth } from "../auth";

const LoginForm = () => {
  interface Errors {
    email?: string;
    password?: string;
    serverError?: string;
  }

  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    let newErrors: Errors = {};

    if (email.length === 0) {
      newErrors.email = "Email must not be empty";
    }
    if (password.length === 0) {
      newErrors.password = "Password must not be empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate("/");
    } catch (error: any) {
      const serverError = error?.response?.data?.error || error?.message || "Failed to log in";
      newErrors.serverError = serverError;
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setNotification(Object.values(errors).join("\n"));
    } else {
      setNotification("");
    }
  }, [errors]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <label htmlFor="email">Email</label>
          <Form.Control
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <label htmlFor="password">Password</label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-2 justify-content-md-end">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button variant="secondary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => navigate("/newUser")}
            >
              Create user
            </Button>
          </div>
          {notification && (
            <div className="alert alert-danger mt-3" role="alert">
              {notification.split("\n").map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
          )}
        </Form.Group>
      </Form>
    </>
  );
};

export default LoginForm;
