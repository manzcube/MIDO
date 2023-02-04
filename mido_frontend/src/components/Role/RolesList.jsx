import React, { memo, useEffect } from 'react';
import { useGetRolesQuery } from "../../features/roles/roleSlice";
import SingleRole from './SingleRole.jsx';
import SignInBadge from "../Root/SignInBadge.jsx"

const MemoizedSingleRole = memo(SingleRole)

const RolesList = () => {
  const { data: roles, isLoading, isSuccess, isError } = useGetRolesQuery()
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