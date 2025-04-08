import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "customer",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await register(
      formData.username,
      formData.password,
      formData.role,
      formData.name,
      formData.phone
    );
    if (!success) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Register
            </Button>
          </Form>
          <div className="text-center">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
