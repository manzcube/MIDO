import React from 'react'

import DroppingSingleSection from './Grill'

const SingleShiftGrill = ({ drop, oneDay, bookings }) => {
  return (
    <>
      <DroppingSingleSection drop={drop} oneDay={oneDay} bookings={bookings} schedule="09:00-11:00" />
      <DroppingSingleSection drop={drop} oneDay={oneDay} bookings={bookings} schedule="11:00-13:00" />
      <DroppingSingleSection drop={drop} oneDay={oneDay} bookings={bookings} schedule="15:00-17:00" />
      <DroppingSingleSection drop={drop} oneDay={oneDay} bookings={bookings} schedule="17:00-19:00" />
    </>
  )
}

export default SingleShiftGrill