import React from 'react'
import { useRouteError } from 'react-router-dom'

function SingleErrorPage() {
    const error = useRouteError();
    console.log(error)
  return (
    <div>
      <h4>{error.message}</h4>
    </div>
  )
}

export default SingleErrorPage;
