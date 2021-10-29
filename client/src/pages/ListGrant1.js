import React from 'react';
import { TiTick } from "react-icons/ti"
import { ImCross} from "react-icons/im"
const ListGrant1 = (props) => {
  let accept;
  const tickClick = () => {
    accept = true
    //Element should be removed
  }
  const wrongClick = () => {
    accept = false
    //Element should be removed
  }
  return (
      <li>
        <div className="ml-10 grid grid-cols-5 mb-5">
          <h1 className="text-white text-xl">{props.grants.hospital}</h1>
          <h1 className="text-white text-xl">{props.grants.req_money} Rs</h1>
          
          <button class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-green-500 p-1 text-xl" onClick={tickClick}><TiTick /></button>
          <button class="h-7 w-7 rounded-full ring-2 ring-white text-white bg-red-500 p-2 text-xs" onClick={wrongClick}><ImCross /></button>
        </div>
      </li>
    )
}

export default ListGrant1;