import React from 'react'
import { Link } from 'react-router-dom'

export const Item = ({property}) => {
  return (
    <Link to={'/listing/' + property._id}>
    
    </Link>
  )
}

export default Item