import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // ✅ Retrieve booking details from localStorage
    const savedBooking = localStorage.getItem("latestBooking");
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking));
    }
  }, []);

  if (!booking) {
    return (
      <Container className="mt-5 text-center">
        <h2>No booking details found</h2>
        <p>Please go back and book an appointment.</p>
        <Button variant="primary" onClick={() => navigate("/")}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-success text-center">✅ Booking Successful!</h2>
        <hr />
        <p><strong>Service:</strong> {booking.service_name}</p>
        <p><strong>Staff:</strong> {booking.staff_name}</p>
        <p><strong>Date:</strong> {booking.booking_date}</p>
        <p><strong>Time Slot:</strong> {booking.start_time}</p>
        <p><strong>Notes:</strong> {booking.notes}</p>
        <div className="text-center">
          <Button variant="primary" onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      </Card>
    </Container>
  );
};

export default BookingConfirmation;
