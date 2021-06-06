import { Grid, Typography } from '@material-ui/core';
import React from 'react';

import FlechaArriba from '../../img/flechaArriba.svg'
import FlechaAbajo from '../../img/flechaAbajo.svg'


export default (props)=>{
  let {cajaAyer, cajaHoy} = props

  if(cajaAyer){
    if(cajaHoy>cajaAyer){
      return(
        <Grid container alignItems='center' style={{marginTop:'11px', marginLeft:'10px'}} >
          <FlechaArriba  style={{width:'30px'}} />
          <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight: 100, marginLeft:'20px'}} >
            Hoy
            <span  style={{ fontWeight: 600, marginTop:'0px',marginBottom:'5px'}} > {Math.round((cajaHoy-cajaAyer)/cajaAyer*100)}% más </span>
            facturación que ayer
          </Typography>
        </Grid>
      )
    }else{
      return(
        <Grid container alignItems='center' style={{marginTop:'11px', marginLeft:'10px'}} >
          <FlechaAbajo  style={{width:'30px'}} />
          <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight: 100, marginLeft:'20px'}} >
            Hoy
            <span  style={{ fontWeight: 600, marginTop:'0px',marginBottom:'5px'}} > {Math.round(-(cajaHoy-cajaAyer)/cajaAyer*100)}% menos </span>
            facturación que ayer
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