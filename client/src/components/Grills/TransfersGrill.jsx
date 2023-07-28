import React from 'react'
import SingleTransferGrill from './SingleTransferGrill'

const TransfersGrill = ({ drop, transfers }) => {
    return (
      <div className='w-full flex p-10'>
        <div className='w-1/2 flex flex-col'>
          <SingleTransferGrill drop={drop} transfers={transfers} schedule="08:30 Pick Up" />
          <SingleTransferGrill drop={drop} transfers={transfers} schedule="10:45 Pick Up" />
          <SingleTransferGrill drop={drop} transfers={transfers} schedule="14:30 Pick Up" />
        </div>
        <div className='w-1/2 flex flex-col'>
          <SingleTransferGrill drop={drop} transfers={transfers} schedule="11:15 Drop Off" />
          <SingleTransferGrill drop={drop} transfers={transfers} schedule="13:45 Drop Off" />
          <SingleTransferGrill drop={drop} transfers={transfers} schedule="17:00 Drop Off" />
        </div>
      </div>
    )
}

export default TransfersGrill

