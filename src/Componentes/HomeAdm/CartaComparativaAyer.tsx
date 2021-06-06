import React from 'react'


import ComparativaFacturacion from './ComparativaFacturacion'
import ComparativaCantidadVentas from './ComparativaCantidadVentas'


export default (props)=>{
  let {cajaAyer,cajaHoy,cantidadVentasAyer,cantidadVentasHoy} = props

  return(
    <div style={{
      width: "650px",
      height:'110px',
      // backgroundColor:'hsla(100,100%,100%,.2)',
      background: "linear-gradient(160deg, hsla(200,100%,100%,.5) -29.09%, hsla(100,100%,100%,.1) 51.77%, hsla(200,100%,10%,.15) 129.35%)",
      borderRadius:'8px',
      boxShadow:'0px 1px 15px hsla(100,100%,0%,.3)',
      textAlign:'center',
      padding:'10px'
    }} >
      
      <ComparativaFacturacion cajaAyer={cajaAyer} cajaHoy={cajaHoy} />
      <ComparativaCantidadVentas cantidadVentasAyer={cantidadVentasAyer} cantidadVentasHoy={cantidadVentasHoy} />
  
    </div>
  )
}