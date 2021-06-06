import { AppBar, Fab, makeStyles, Snackbar, Toolbar, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Volver from '../Componentes/Volver'


import TablaProductos from '../Componentes/TablaProductos'
import {StyledTabs, StyledTab} from '../Componentes/PersonalizadosMaterialUI/TabPersonalizado'
import CargaDeStock from '../Componentes/CargaDeStock'


const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '0px solid slategrey'
    }
  },
  filaTabla:{
    '&:hover':{
      cursor:'pointer',
      backgroundColor:'rgba(0,0,0,.05)'
    }
  }
}));




let cambiarTab = (value, valorTab, setvalorTab)=>{
  if(value != valorTab){
    setvalorTab(value)
  }
}






export default (props)=>{
  let history = useHistory()
  let clases = useStyles()
  let {abrirAlerta, setabrirAlerta} = props

  let [valorTab,setvalorTab] = useState(0)




  return(
    <div>
      <AppBar style={{backgroundColor:'hsla(0,100%,80%,0.15)'}} >
        <Toolbar>
          <Volver ruta="/home" />
          <Typography variant="h6" style={{marginLeft:'20px'}} >Productos</Typography>
        </Toolbar>
      </AppBar>
      <Fab onClick={()=>history.push("/cargarproductos") } style={{backgroundColor:'rgb(0,110,255)', position:'absolute', right:'35px',top:'0px', zIndex:99999}} >
        <Add style={{color:'white', fontSize:'2.2em'}} />
      </Fab>
      {//@ts-ignore
      <StyledTabs value={valorTab} style={{marginTop:'80px'}} onChange={(e,value)=>cambiarTab(value,valorTab,setvalorTab)}>{//@ts-ignore
        <StyledTab label="Listado de productos"/>}{//@ts-ignore
        <StyledTab label="Cargar Stock"/>}
      </StyledTabs>
      }
     
      {valorTab?<CargaDeStock setabrirAlerta={setabrirAlerta} />:<TablaProductos />}


      <Snackbar open={abrirAlerta.abierta} autoHideDuration={2000} onClose={()=>setabrirAlerta({...abrirAlerta, abierta:false})} >
        {// @ts-ignore
        <Alert severity={abrirAlerta.tipo} variant="filled" elevation={6} >{abrirAlerta.msj}</Alert>}
      </Snackbar>
    </div>
  )
}
