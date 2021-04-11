import React, { useState } from "react"
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, Snackbar, Switch, withStyles } from "@material-ui/core"
import Volver from '../Componentes/Volver'
import { Alert } from "@material-ui/lab"
import Datastore from "nedb-promises"


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





export default function Balanzas(props:any){
  let balanzasConectadas = props.balanzasConectadas
  let setbalanzasConectadas = props.setbalanzasConectadas
  let [abrirAlerta,setabrirAlerta] = useState({abierta: false, tipo:'success', msj: ''})

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
  let clases = useStyles()
  let [conexionWS,setconexionWS] = useState()

  let conectarBalanza = (event:any, id:any)=>{
    if(balanzasConectadas[id]){
      conexionWS.close()
      setbalanzasConectadas({...balanzasConectadas, [id]:false} )
    }else{
      // INICIAR CONEXION WS
      let connection = new WebSocket('ws://192.168.1.202/ws', ['arduino']);
      setconexionWS(connection)
      connection.onopen = async function () {
        console.log('Connected: ');
        setbalanzasConectadas({...balanzasConectadas, [id]:true} )
        // ENVIO LOS DATOS DE LOS PRODUCTOS A LA BALANZA
        let productosdb = Datastore.create('database/productos.db')
        let data = await productosdb.find({})
        connection.send(JSON.stringify({productos: data }));
      };
      connection.onerror = function (error:any) {
        // console.log('WebSocket Error ', error);
        setabrirAlerta({abierta: true, tipo:'error', msj: 'Ha ocurrido un error al intentar conectar la balanza'})
      };
      connection.onmessage = function (e:any) {
        // console.log('Server: ', e.data);
      };
      connection.onclose = ()=>{
        // console.log('cerrada')
      }
    }
  }


  return(
  <div  >
    <Volver />
    <List style={{width:'400px', marginLeft:'20px'}} >
      <ListItem button>
        <ListItemIcon>
          <div className={balanzasConectadas['1']?clases.luzPrendida:clases.luzApagada} ></div>
        </ListItemIcon>
        <ListItemText>Balanza</ListItemText>
        <ListItemSecondaryAction>
          <SwitchPersonalizado
            checked={balanzasConectadas['1']}
            onChange={ (event)=>conectarBalanza(event,'1') }
          />
        </ListItemSecondaryAction>
      </ListItem>

    </List>

    <Snackbar open={abrirAlerta.abierta} autoHideDuration={2000} onClose={()=>setabrirAlerta({...abrirAlerta, abierta:false})} >
      <Alert severity={abrirAlerta.tipo} variant="filled" elevation={6} >{abrirAlerta.msj}</Alert>
    </Snackbar>
  </div>
  )
}
