import React from 'react'

import Grill from './Grill'

const DoubleShiftGrill = ({ drop, oneDay, bookings }) => {
  return (
    <>
      <Grill drop={drop} oneDay={oneDay} bookings={bookings} schedule="08:30-10:30" group="A" />
      <Grill drop={drop} oneDay={oneDay} bookings={bookings} schedule="09:30-11:30" group="B" />
      <Grill drop={drop} oneDay={oneDay} bookings={bookings} schedule="11:00-13:00" group="A" />
      <Grill drop={drop} oneDay={oneDay} bookings={bookings} schedule="12:00-14:00" group="B" />
      <Grill drop={drop} oneDay={oneDay} bookings={bookings} schedule="14:30-16:30" group="A" />
      <Grill drop={drop} oneDay={oneDay} bookings={bookings} schedule="15:30-17:30" group="B" />
      <Grill drop={drop} oneDay={oneDay} bookings={bookings} schedule="17:00-19:00" group="A" />
      <Grill drop={drop} oneDay={oneDay} bookings={bookings} schedule="18:00-20:00" group="B" />
    </>
  )
}

export default DoubleShiftGrill