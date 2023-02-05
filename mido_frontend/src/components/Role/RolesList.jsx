import React, { memo } from 'react';

// Endpoint
import { useGetRolesQuery } from "../../features/roles/roleSlice";

// Components
import SingleRole from './SingleRole.jsx';
import SignInBadge from "../Root/SignInBadge.jsx"

const MemoizedSingleRole = memo(SingleRole)

const RolesList = () => {
  const { data: roles, isLoading, isSuccess, isError, error } = useGetRolesQuery()
  let content;
  if (isLoading) {
    content = <SignInBadge />
  } else if (isSuccess) {
    content = roles.map(role => <MemoizedSingleRole key={role._id} role={role} />)
  } else if (isError) {
    content = "Sign in please";
  }
    
  return (
    <>
        {content}
    </>
  )
}

export default RolesList