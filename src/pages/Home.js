import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCut, FaPalette, FaHandSparkles } from "react-icons/fa"; // Fixed icons

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/3997996/pexels-photo-3997996.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        paddingTop: "50px",
      }}
    >
      <div className="bg-dark bg-opacity-75 text-white py-5 mb-4 rounded">
        <h1>Welcome to Our Salon</h1>
        <p>Book your appointment with the best stylists in town</p>
        <p>
          <Button as={Link} to="/register" variant="light" size="lg" className="me-2">
            Register Now
          </Button>
          <Button as={Link} to="/login" variant="outline-light" size="lg">
            Login
          </Button>
        </p>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow text-center">
              <div className="card-body">
                <FaCut size={50} className="text-primary mb-3" /> {/* Fixed Hair Styling Icon */}
                <h5 className="card-title">Hair Styling</h5>
                <p className="card-text">Professional hair cutting and styling services.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow text-center">
              <div className="card-body">
                <FaPalette size={50} className="text-danger mb-3" /> {/* Hair Coloring Icon */}
                <h5 className="card-title">Hair Coloring</h5>
                <p className="card-text">Expert hair coloring and treatment services.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow text-center">
              <div className="card-body">
                <FaHandSparkles size={50} className="text-success mb-3" /> {/* Nail Care Icon */}
                <h5 className="card-title">Nail Care</h5>
                <p className="card-text">Manicure, pedicure, and nail art services.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
