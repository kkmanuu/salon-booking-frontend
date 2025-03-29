import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We offer premium salon services with expert stylists. Book your appointment today and enjoy the best experience!
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white text-decoration-none">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-white text-decoration-none">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@salonbooking.com</p>
            <p>Phone: +254 712 345 678</p>
            <p>Location: Nairobi, Kenya</p>
          </Col>
        </Row>

        <hr className="bg-light" />

        <Row className="text-center">
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Salon Booking. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
