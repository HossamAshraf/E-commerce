import React from 'react'

export default function Profile({currentUser}) {
  return <>
  <h2 className='text-center'>Hello {currentUser.name}</h2>
  </>
}
