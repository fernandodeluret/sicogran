import React, { useEffect, useState } from "react"
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, Snackbar, Switch, withStyles } from "@material-ui/core"
import Volver from '../Componentes/Volver'
import { Alert } from "@material-ui/lab"

import conectarBalanza from '../FuncionesAux/conectarBalanzas'



const SwitchPersonalizado = withStyles({
  switchBase: {
    color: 'hsla(360,30%,35%,1)',
    '& + $track': {
      backgroundColor: 'hsla(360,100%,40%,.8)'
    },
    '&$checked':{
      // color: 'hsla(200,90%,55%,1)'
      color: 'hsla(110,90%,60%,1)'
    },
    '&$checked + $track': {
      backgroundColor: 'hsla(180,100%,20%,.7)'
    }
  },
  checked:{},
  track:{}
})(Switch)




const useStyles = makeStyles({
  luzPrendida: {
    width:'15px',
    height:'15px',
    borderRadius:'50%',
    backgroundColor: 'hsla(110,90%,60%,1)',
    boxShadow: '1px 1px 12px hsla(80,100%,50%,1)'
  },
  luzApagada: {
    width:'15px',
    height:'15px',
    borderRadius:'50%',
    backgroundColor: 'hsla(360,30%,35%,1)',
    boxShadow: '1px 1.4px 3px hsla(360,100%,50%,1)'
  }
})







export default function Balanzas(props:any){
  let {balanzasConectadas, setbalanzasConectadas, abrirAlerta, setabrirAlerta, conexionWS, setconexionWS, IP} = props

  let clases = useStyles()


  return(
  <div  >
    <Volver ruta="/home" />
    <List style={{width:'400px', marginLeft:'20px'}} >
      <ListItem button>
        <ListItemIcon>
          <div className={balanzasConectadas['1']?clases.luzPrendida:clases.luzApagada} ></div>
        </ListItemIcon>
        <ListItemText>Balanza</ListItemText>
        <ListItemSecondaryAction>
          <SwitchPersonalizado
            checked={balanzasConectadas['1']}
            onChange={ (event)=>conectarBalanza('1', balanzasConectadas, setbalanzasConectadas, conexionWS, setconexionWS, setabrirAlerta, IP) }
          />
        </ListItemSecondaryAction>
      </ListItem>

    </List>

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
  )
}
