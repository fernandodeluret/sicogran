import { AppBar, Button, Grid, IconButton, List, ListItem, ListItemIcon, makeStyles, Snackbar, TextField, Toolbar, Typography, withStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'


import Volver from '../Componentes/Volver'
import LinearProgressPersonalizado from '../Componentes/PersonalizadosMaterialUI/LinearProgressPersonalizado'
import InputPersonalizado from '../Componentes/PersonalizadosMaterialUI/InputPersonalizado'
import { Delete } from '@material-ui/icons'




let crearEmpleado = async(empleado, setempleado, setabrirAlerta, setmostrarBarraCarga, accessToken, listadoEmpleados, setlistadoEmpleados)=>{   
  if(empleado['username'] == ''){
    setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes ingresar un nombre de usuario.'})
    return
  }
  if(empleado['password'] == ''){
    setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes ingresar una clave.'})
    return
  }
  setmostrarBarraCarga('block')
  let url = 'https://sicrogranapi-5yhs64mn6q-uc.a.run.app/crearempleado'
  let resp = await fetch(url, {
    method: 'POST', 
    headers:{
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(empleado),
  });
  resp = await resp.json()
  // console.log(resp)
  setmostrarBarraCarga('None')
  if(resp['resp'] == 'empleado creado'){
    setabrirAlerta({abierta: true, tipo:'success', msj: 'Empleado creado correctamente'})
    listadoEmpleados.push(empleado.username)
    setlistadoEmpleados(listadoEmpleados)
    setempleado({username:'',password:''})
  }else if(resp['resp']=="el nombre de usuario ya existe"){
    setabrirAlerta({abierta: true, tipo:'error', msj: 'El nombre de usuario ya existe, elige otro.'})
  }
}



let listarEmpleados = async(accessToken, setlistadoEmpleados)=>{
  let url = 'https://sicrogranapi-5yhs64mn6q-uc.a.run.app/listarempleados'
  let resp = await fetch(url, {
    method: 'GET', 
    headers:{
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
    },
  });
  resp = await resp.json()
  if(resp['resp']=='ok'){
    setlistadoEmpleados(resp['listado'])
  }
}



let eliminarEmpleado = async(nombreEmpleado, accessToken, listadoEmpleados, setlistadoEmpleados, setabrirAlerta)=>{
  let url = 'https://sicrogranapi-5yhs64mn6q-uc.a.run.app/eliminarempleado'
  let resp = await fetch(url, {
    method: 'POST', 
    headers:{
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: nombreEmpleado}),
  });
  resp = await resp.json()
  // console.log(resp)
  if(resp['resp']=="empleado eliminado"){
    setabrirAlerta({abierta: true, tipo:'warning', msj: 'Empleado eliminado'})
    let indiceAEliminar = listadoEmpleados.indexOf(nombreEmpleado)
    listadoEmpleados.splice(indiceAEliminar,1)
    setlistadoEmpleados(listadoEmpleados)
  }
}




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









export default (props)=>{
  let {abrirAlerta, setabrirAlerta, accessToken} = props
  let clases = useStyles()

  let [empleado,setempleado] = useState({username:'',password:''})
  let [mostrarBarraCarga, setmostrarBarraCarga] = useState('None')
  let [listadoEmpleados, setlistadoEmpleados] = useState([])

  let cambioInput = (e:any,campo:string)=>{
    setempleado({...empleado,[campo]: e.target.value})
  }

  useEffect(()=>{listarEmpleados(accessToken, setlistadoEmpleados)},[listadoEmpleados])




  return(
  <div>
    <AppBar style={{backgroundColor:'hsla(0,100%,80%,0.15)'}} >
      <Toolbar>
        <Volver ruta="/home" />
        <Typography variant="h6" style={{marginLeft:'20px'}} >Crear cuentas de empleados</Typography>
      </Toolbar>
    </AppBar>  

    <Grid container>
      <Grid container direction="column" alignItems="center" style={{width:'500px', height:'70vh', margin:'auto', marginTop:'100px', backgroundColor:'#ffffff20',borderRadius:'7px', boxShadow:'0px 0px 8px rgba(30,30,30,.3)'}} >
        <Typography variant='h6' style={{fontFamily:'Poppins',marginTop:'20px'}} >Agregar nuevo empleado</Typography>
        <InputPersonalizado variant='outlined' label="Nombre de usuario" spellCheck="false" style={{marginTop:'50px', width:'60%'}} value={empleado.username} onChange={(e)=>cambioInput(e,'username')} />
        <InputPersonalizado variant='outlined' label="Contraseña" type="password" style={{marginTop:'50px', width:'60%'}} value={empleado.password} onChange={(e)=>cambioInput(e,'password')} />
        <Button 
          variant='outlined' 
          style={{color:'white', border:'1px solid #ffffff60', marginTop:'60px', width:'60%'}} 
          onClick={(e)=>crearEmpleado(empleado, setempleado, setabrirAlerta, setmostrarBarraCarga, accessToken, listadoEmpleados, setlistadoEmpleados)} >
            Agregar
        </Button>
      </Grid>
      <Grid container direction="column" alignItems="center" style={{width:'300px', height:'70vh', margin:'auto', marginTop:'100px', backgroundColor:'#ffffff20',borderRadius:'7px', boxShadow:'0px 0px 8px rgba(30,30,30,.3)'}} >
        <Typography variant='h6' style={{fontFamily:'Poppins',marginTop:'20px'}} >Listado de empleados</Typography>
        <List style={{width:'80%', maxHeight:'80%', overflow: 'auto'}} >
        {listadoEmpleados.map((nombreEmpleado)=>{
          return(
            <ListItem key={nombreEmpleado} >
              <Grid container alignItems='center' justify='space-around'>
                <Typography style={{fontFamily:'Poppins', width:'60%'}} >{nombreEmpleado}</Typography>
                <ListItemIcon >
                  <IconButton 
                    style={{boxShadow:'None', color:'rgba(250,250,250,.6)'}} 
                    onClick={(e)=>eliminarEmpleado(nombreEmpleado, accessToken, listadoEmpleados, setlistadoEmpleados, setabrirAlerta)} >
                      <Delete />
                  </IconButton>
                </ListItemIcon>
              </Grid>
            </ListItem>
          )
        })}
        </List>
      </Grid>
    </Grid>
    

    <LinearProgressPersonalizado style={{display: mostrarBarraCarga }}  />
    <Snackbar open={abrirAlerta.abierta} autoHideDuration={2000} onClose={()=>setabrirAlerta({...abrirAlerta, abierta:false})} >
      {// @ts-ignore
      <Alert severity={abrirAlerta.tipo} variant="filled" elevation={6} >{abrirAlerta.msj}</Alert>
      }
    </Snackbar>
  </div>
  )
}