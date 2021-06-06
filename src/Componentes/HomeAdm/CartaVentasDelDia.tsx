import { Typography } from '@material-ui/core'
import React from 'react'



export default (props)=>{
  let{cantidadVentasHoy} = props



  return(
    <div style={{
      marginBottom:'40px',
      width: "250px",
      // backgroundColor:'hsla(100,100%,100%,.2)',
      background: "linear-gradient(160deg, hsla(200,100%,100%,.5) -29.09%, hsla(100,100%,100%,.1) 51.77%, hsla(200,100%,10%,.15) 129.35%)",
      borderRadius:'8px',
      boxShadow:'0px 1px 15px hsla(100,100%,0%,.3)',
      textAlign:'center',
      padding:'10px'
    }} >
      <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight: 100, marginTop:'0px',marginBottom:'10px'}} >Ventas del Dia</Typography>
      <Typography variant="h3" style={{ fontWeight: 600, marginTop:'0px',marginBottom:'5px'}} >{cantidadVentasHoy}</Typography>
    </div>
  )
}