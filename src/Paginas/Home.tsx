import React, { useEffect } from 'react';

import '../App.global.css';
import {ipcRenderer } from 'electron';

import CartaBalanza from '../Componentes/CartaBalanza'
import CartaCargarProductos from '../Componentes/CartaCargarProductos'
import { Grid } from '@material-ui/core';


export default () => {


  useEffect(()=>{
    window.addEventListener('keyup', (e)=>{
      if( (e.altKey && e.key==='Enter')){
        // PARA CAMBIAR A PANTALLA COMPLETA
        ipcRenderer.send('pantalla-completa', 'ping')
      }
    }, true)
  },[])






  return (
    <div>
      <div style={{fontFamily: "Train One"}} className="sicogran">
        <span className="sicogran1" >Si</span>
        <span className="sicogran2" >stema de </span>
        <span className="sicogran1" > Co</span>
        <span className="sicogran2" >ntrol de</span>
        <span className="sicogran1" >Gran</span>
        <span className="sicogran2" >el</span>
      </div>
      <Grid container >
        <CartaBalanza />
        <CartaCargarProductos />
      </Grid>
    </div>
  );
};

