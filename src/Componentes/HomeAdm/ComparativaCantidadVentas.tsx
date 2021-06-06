import { Grid, Typography } from '@material-ui/core';
import React from 'react';

import FlechaArriba from '../../img/flechaArriba.svg'
import FlechaAbajo from '../../img/flechaAbajo.svg'




export default (props)=>{
  let {cantidadVentasAyer, cantidadVentasHoy} = props


  if(cantidadVentasAyer){
    if(cantidadVentasHoy>cantidadVentasAyer){
      return(
        <Grid container alignItems='center' style={{marginTop:'14px', marginLeft:'10px'}} >
            {
              <FlechaArriba  style={{width:'30px'}} />
            }
            <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight: 100, marginLeft:'20px'}} >
            Hoy
            <span  style={{ fontWeight: 600, marginTop:'0px',marginBottom:'5px'}} > {Math.round((cantidadVentasHoy-cantidadVentasAyer)/cantidadVentasAyer*100)}% más </span>
            clientes que ayer
            </Typography>
        </Grid>  
      )
    }else{
      return(
        <Grid container alignItems='center' style={{marginTop:'14px', marginLeft:'10px'}} >
            {
              <FlechaAbajo  style={{width:'30px'}} />
            }
            <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight: 100, marginLeft:'20px'}} >
            Hoy
            <span  style={{ fontWeight: 600, marginTop:'0px',marginBottom:'5px'}} > {Math.round(-(cantidadVentasHoy-cantidadVentasAyer)/cantidadVentasAyer*100)}% menos </span>
            clientes que ayer
            </Typography>
        </Grid>  
      )
    }

  }else{
    return(
      <Grid container alignItems='center' style={{marginTop:'11px', marginLeft:'10px'}} >
        <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight: 100, marginLeft:'20px'}} > - (No se puede comparar con ayer)</Typography>
      </Grid>
    )
  }
}