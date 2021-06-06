import React from "react"
import { AppBar, Snackbar, Toolbar, Typography } from "@material-ui/core"

import Volver from '../Componentes/Volver'


import TablaVentas from "../Componentes/TablaVentas"
import { Alert } from "@material-ui/lab"


export default function Ventas(props:any){
  let {usuario, abrirAlerta, setabrirAlerta} = props


  return(
  <div  >
    <AppBar style={{backgroundColor:'hsla(0,100%,80%,0.15)'}} >
      <Toolbar>
        <Volver ruta="/home" />
        <Typography variant="h6" style={{marginLeft:'20px'}} >Ventas</Typography>
      </Toolbar>
    </AppBar>

    <TablaVentas usuario={usuario} />

    <Snackbar open={abrirAlerta.abierta} autoHideDuration={2000} onClose={()=>setabrirAlerta({...abrirAlerta, abierta:false})} >
      <Alert 
        // @ts-ignore
        severity={abrirAlerta.tipo} 
        variant="filled" 
        elevation={6}>
        {abrirAlerta.msj}
      </Alert>
    </Snackbar>
  </div>
  )
}
