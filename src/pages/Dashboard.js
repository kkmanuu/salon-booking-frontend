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

  useEffect(() => {
    axios.get("http://localhost:4000/api/services")
      .then(response => setServices(response.data))
      .catch(error => console.error("Error fetching services:", error));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/api/staff")
      .then(response => setStaff(response.data))
      .catch(error => console.error("Error fetching staff:", error));
  }, []);

  useEffect(() => {
    if (selectedStaff && selectedDate) {
      axios.get(`http://localhost:4000/api/available-slots?staffId=${selectedStaff}&date=${selectedDate}`)
        .then(response => setAvailableSlots(response.data))
        .catch(error => console.error("Error fetching available slots:", error));
    }
  }, [selectedStaff, selectedDate]);

  const handleBooking = async () => {
    if (!user || !user.id) {
      alert("Please log in before booking.");
      return;
    }
  
    // ✅ Ensure correct names are selected before setting booking data
    const selectedServiceData = services.find(s => s.id.toString() === selectedService);
    const selectedStaffData = staff.find(s => s.id.toString() === selectedStaff);
  
    const bookingData = {
      customer_id: user.id,
      service_id: selectedService,
      staff_id: selectedStaff,
      booking_date: selectedDate,
      start_time: selectedSlot,
      notes: notes || "None",
      service_name: selectedServiceData ? selectedServiceData.name : "Unknown Service",
      staff_name: selectedStaffData ? selectedStaffData.name : "Unknown Staff"
    };
  
    try {
      const response = await axios.post("http://localhost:4000/api/bookings", bookingData);
      alert("Booking successful!");
  
      // ✅ Save to localStorage to persist data
      localStorage.setItem("latestBooking", JSON.stringify(bookingData));
  
      navigate("/booking-confirmation");
    } catch (error) {
      alert("Booking failed. Please check the details.");
    }
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
        <select className="form-select" onChange={(e) => setSelectedSlot(e.target.value)} value={selectedSlot}>
          <option value="">Select Time Slot</option>
          {availableSlots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Notes:</label>
        <textarea className="form-control" onChange={(e) => setNotes(e.target.value)} value={notes}></textarea>
      </div>

      <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookingForm;
