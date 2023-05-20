// Lib
import React from 'react';

// Endpoint
import { useGetBookingsQuery } from '../../features/bookings/bookingsSlice.js';

// Components
import SignInBadge from "../Root/SignInBadge.jsx"
import Booking from './Booking.jsx';

const BookingsList = () => {
  // Query
  const { data: bookings, isLoading, isSuccess, isError, error } = useGetBookingsQuery()
  let content;

  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    console.log(bookings)
    content = bookings.map(book => <Booking key={book.bookingURL} book={book} />)
  } else if (isError) {
    content = "Sign in please"
  }
  return (
    <div className='flex flex-col fixed h-screen mt-40 pt-10 border-l overflow-y-scroll border-b-2 bg-white grabbable'>
      <h1 className='text-center'>Bookings</h1>
      {content}
    </div>
  )
}

export default BookingsList