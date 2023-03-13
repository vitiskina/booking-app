import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();
  return <div>Single BookingPage: {id}</div>;
};

export default BookingPage;
