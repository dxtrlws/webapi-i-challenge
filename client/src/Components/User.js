import React from 'react'

export default function User({user}) {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.bio}</p>
    </div>
  )
}
