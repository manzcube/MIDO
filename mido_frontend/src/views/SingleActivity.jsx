import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOnePersonQuery } from "../features/api/apiSlice";
import SinglePerson from "../components/SinglePerson";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SingleActivity = () => {
  console.log('RENDERING SINGLE PAGE')
  
  const params = useParams()
  const personId = params.id;
  const { data: person, isLoading, isFetching, requestId, isSuccess, isError, error } = useGetOnePersonQuery(personId)


  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = <SinglePerson person={person} />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
    
  return (
    <div>
        <h4>SIgnle person</h4>
        <Link to="/">home</Link>
        {content}
    </div>
  )
};

export default SingleActivity;
