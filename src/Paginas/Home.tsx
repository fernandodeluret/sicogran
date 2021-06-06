import React, { useEffect } from 'react';

import '../App.global.css';
import {ipcRenderer } from 'electron';

import CartaBalanza from '../Componentes/CartaBalanza'
import CartaCargarProductos from '../Componentes/CartaCargarProductos'
import CartaVentas from '../Componentes/CartaVentas'
import { Badge, Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


export default (props) => {
  let {balanzasConectadas, setbalanzasConectadas, abrirAlerta, setabrirAlerta} = props




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
        <CartaBalanza balanzasConectadas={balanzasConectadas} setbalanzasConectadas={setbalanzasConectadas} />
        <CartaCargarProductos />
        <CartaVentas />
      </Grid>

    <Snackbar open={abrirAlerta.abierta} autoHideDuration={2000} onClose={()=>setabrirAlerta({...abrirAlerta, abierta:false})} >
      <Alert 
        // @ts-ignore
        severity={abrirAlerta.tipo} 
        variant="filled" 
        elevation={6} 
      >
        {abrirAlerta.msj}
      </Alert>
    </Snackbar>
    </div>
  );
};

