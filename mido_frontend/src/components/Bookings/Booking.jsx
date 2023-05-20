import React from 'react'

const Booking = ({book}) => {
  return (
    <div>
        <div className='m-3 rounded border p-2 text-sm'>
            <p className='w-full flex justify-between'>
                <span>{book.activity}</span>
                <span>{book.number_of_people} {book.values.map(val => val.Idioma)}</span>
            </p>
            <p>Swim: {book.values.map(val => val.Swim)}</p>
            <p>Hotel {book.values.map(val => val.Hotel)}</p>
            <p>Room: {book.values.map(val => val.Room)}</p>
            <p>Pick Up: {book.values.map(val => val["Pick Up Time"])}</p>
        </div>
    </div>
  )
}

export default Booking