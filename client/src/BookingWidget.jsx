import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [redirect, setRedirect] = useState("");

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const res = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      name,
      numberOfGuests,
      phone,
      price: numberOfNights * place.price,
    });

    const bookingId = res.data._id;

    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className=" bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="  py-3 px-4 ">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="  py-3 px-4 border-l ">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="  py-3 px-4 border-t ">
            <label>Number of guests: </label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className=" py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              className=""
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Your phone number:</label>
            <input
              className=""
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span>{" for $" + numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
