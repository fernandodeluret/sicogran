import React from "react"
import { useHistory } from "react-router"

export default function Balanzas(){
  let history = useHistory()

  return(
    <p onClick={()=>{history.push("/")}} >Hola balanzas</p>
  )
}
