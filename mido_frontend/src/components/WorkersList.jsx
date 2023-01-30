import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {deleteWorker} from "../features/workers/workerSlice"
import { useGetPersonsQuery, useDeletePersonMutation } from '../features/api/apiSlice';
import { useMemo } from 'react';
import { memo } from 'react';
import SinglePerson from './SinglePerson';
import { toast } from "react-toastify";




const WorkersList = () => {
  console.log('WORKERS LIST')
  // const apiData = useSelector(state => state.api)
  // console.log('api dat', apiData.mutations)
  const { data: persons, isLoading, isFetching, isSuccess, isError, error, requestId } = useGetPersonsQuery()
  let content;
  console.log(persons, isLoading, isFetching, isSuccess, isError, error, requestId)
  
  

  // if (isLoading) {
  //   content = <p>Loading...</p>
  // } else if (isSuccess) {
  //   content = persons.map(per => <SinglePerson key={per._id} person={per} />)
  // } else if (isError) {
  //   content = "No Content";
  //   return toast.error(error.data)
  // }
  
    
  return (
    <div>
        <h4>PeopleList</h4>
        {/* {content} */}
    </div>
  )
}

export default WorkersList