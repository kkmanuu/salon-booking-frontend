import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false); // For loading state

  // Fetch services
  useEffect(() => {
    axios.get("http://localhost:4000/api/services")
      .then(response => setServices(response.data))
      .catch(error => console.error("Error fetching services:", error));
  }, []);

  // Fetch staff
  useEffect(() => {
    axios.get("http://localhost:4000/api/staff")
      .then(response => setStaff(response.data))
      .catch(error => console.error("Error fetching staff:", error));
  }, []);

  // Fetch available slots when staff or date is selected
  useEffect(() => {
    if (selectedStaff && selectedDate) {
      setLoadingSlots(true); // Start loading when fetching time slots
      axios.get(`http://localhost:4000/api/available-slots?staffId=${selectedStaff}&date=${selectedDate}`)
        .then(response => {
          setAvailableSlots(response.data);
          setLoadingSlots(false); // Stop loading when slots are fetched
        })
        .catch(error => {
          console.error("Error fetching available slots:", error);
          setLoadingSlots(false);
        });
    }
  }, [selectedStaff, selectedDate]);

  const handleBooking = async () => {
    if (!user || !user.id) {
      alert("Please log in before booking.");
      return;
    }
  
    // Validate that the required fields are filled
    if (!selectedService || !selectedStaff || !selectedDate || !selectedSlot) {
      alert("Please fill in all required fields.");
      return;
    }
  
    // Find selected service and staff from the arrays
    const selectedServiceData = services.find(s => s.id.toString() === selectedService);
    const selectedStaffData = staff.find(s => s.id.toString() === selectedStaff);
  
    // Calculate end_time (for example, adding 1 hour to the start_time)
    const endTime = calculateEndTime(selectedSlot);
  
    // Prepare the booking data
    const bookingData = {
      customer_id: user.id,
      service_id: selectedService,
      staff_id: selectedStaff,
      booking_date: selectedDate,
      start_time: selectedSlot,
      end_time: endTime,
      status: "pending", // You can update this after confirmation if needed
      notes: notes || "None",
    };
  
    try {
      const response = await axios.post("http://localhost:4000/api/bookings", bookingData);
      if (response.status === 200 || response.status === 201) {
        alert("Booking successful!");
        // Save to localStorage to persist data
        localStorage.setItem("latestBooking", JSON.stringify(bookingData));
        navigate("/booking-confirmation");
      } else {
        console.error("Failed to create booking:", response.data);
        alert("Booking failed. Please check the details.");
      }
    } catch (error) {
      console.error("Error creating booking:", error.response || error.message);
      alert("Booking failed. Please try again.");
    }
  };
  
  // Function to calculate end time based on start time (assuming a fixed duration)
  const calculateEndTime = (startTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // Add 1 hour for end time (you can customize this)
    return `${end.getHours()}:${end.getMinutes() < 10 ? "0" : ""}${end.getMinutes()}`;
  };
  
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Book an Appointment</h2>
      <div className="mb-3">
        <label className="form-label">Service:</label>
        <select className="form-select" onChange={(e) => setSelectedService(e.target.value)} value={selectedService}>
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Staff:</label>
        <select className="form-select" onChange={(e) => setSelectedStaff(e.target.value)} value={selectedStaff}>
          <option value="">Select Staff</option>
          {staff.map(person => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Date:</label>
        <input type="date" className="form-control" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />
      </div>

      <div className="mb-3">
        <label className="form-label">Time Slot:</label>
        <select className="form-select" onChange={(e) => setSelectedSlot(e.target.value)} value={selectedSlot} disabled={loadingSlots}>
          <option value="">Select Time Slot</option>
          {loadingSlots ? (
            <option>Loading...</option>
          ) : availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))
          ) : (
            <option>No available time slots</option>
          )}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Notes (Optional):</label>
        <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <button className="btn btn-primary" onClick={handleBooking}>Book Appointment</button>
    </div>
  );
};

export default BookingForm;
