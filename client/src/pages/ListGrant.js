import React from 'react';

const ListGrant = (props) => {
    console.log(props)
    return (
      <li>
          <h1>Hello</h1>
          <h1 className="text-white">{props.grants.aadhar}</h1>
          <h1 className="text-white">{props.grants.req_money}</h1>
        </li>
    )
}

export default ListGrant;