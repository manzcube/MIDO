// Lib
import React from 'react';

// Components
import Booking from '../Bookings/Booking.jsx';

const DayBookingsList = ({ bookings }) => {
  let content = bookings?.bookings_list.map(book => <Booking key={book.bookingURL} book={book} />)
 
  return (
    <div className='p-20 flex flex-wrap'>
      {content}
    </div>
  )
}

export default DayBookingsList