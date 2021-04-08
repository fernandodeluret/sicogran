import { AppBar, Fab, Toolbar, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router';
import Volver from '../Componentes/Volver'


export default ()=>{
  let history = useHistory()

  return(
    <div>
      <AppBar style={{backgroundColor:'hsla(0,100%,80%,0.15)'}} >
        <Toolbar>
          <Volver />
          <Typography variant="h6" style={{marginLeft:'20px'}} >Productos</Typography>
        </Toolbar>
      </AppBar>
      <Fab onClick={()=>history.push("/cargarproductos") } style={{backgroundColor:'rgb(0,110,255)', position:'absolute', right:'35px',top:'95px'}} >
        <Add style={{color:'white', fontSize:'2.2em'}} />
      </Fab>
    </div>
  )
}
