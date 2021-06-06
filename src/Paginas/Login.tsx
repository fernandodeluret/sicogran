import { Button, Grid, InputAdornment, LinearProgress, Snackbar, TextField, Typography, withStyles } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import conectarBalanza from '../FuncionesAux/conectarBalanzas'



const InputPersonalizado = withStyles({
  root:{
    '& input':{
      color:'white'
    },
    '& label':{
      color:'rgb(230,230,230)',
    },
    '& label.Mui-focused':{
      color:'rgb(230,230,230)',
    },
    '& .MuiOutlinedInput-root':{
      '& fieldset':{
        borderColor:'#ffffff70'
      },
      '&:hover fieldset':{
        borderColor:'#fff'
      },
      '&.Mui-focused fieldset':{
        borderColor:'#ffffff80'
      }
    },
  }
})(TextField)



const LinearProgressPersonalizado = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
    marginTop:'20px', 
  },
  colorPrimary: {
    backgroundColor:'rgba(250,250,250,.15)',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);







export default function Login(props){
  let history = useHistory()

  let {setusuario, abrirAlerta, setabrirAlerta, balanzasConectadas, setbalanzasConectadas, conexionWS, setconexionWS, setaccessToken, IP} = props
  let [datos,setdatos] = useState({username:'',password:''})
  let [mostrarBarraCarga, setmostrarBarraCarga] = useState('None')
  

  let cambioInput = (e:any,campo:string)=>{
    setdatos({...datos,[campo]: e.target.value})
  }


  let logearse = async ()=>{

    if(!navigator.onLine){
      setabrirAlerta({abierta: true, tipo:'error', msj: 'No tienes conexión a Internet.'})
      return
    }
    if(datos['username'] == ''){
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes ingresar un nombre de usuario.'})
      return
    }
    if(datos['password'] == ''){
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes ingresar una clave.'})
      return
    }
    setmostrarBarraCarga('block')
    let url = 'https://sicrogranapi-5yhs64mn6q-uc.a.run.app/login'
    let data = await fetch(url, {method:'POST', headers:{'Content-Type':'application/json'},body: JSON.stringify(datos) })
    data = await data.json()
    // console.log(data)
    if(data['access_token'] == 'credenciales incorrectas'){
      setmostrarBarraCarga('None')
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Los datos ingresados no son válidos'})
    }else if(data['tipo']=='empleado'){
      setusuario({tipo:'empleado',logeado:true})
      conectarBalanza('1', balanzasConectadas, setbalanzasConectadas, conexionWS, setconexionWS, setabrirAlerta, IP)
      history.push('/home')
    }else if(data['tipo']=='adm'){
      setaccessToken(data['access_token'])
      setusuario({tipo:'adm',logeado:true})
      conectarBalanza('1', balanzasConectadas, setbalanzasConectadas, conexionWS, setconexionWS, setabrirAlerta, IP)
      history.push('/home')
    }
  }


  return (
  <div>
    <form noValidate autoComplete="off" >
    <Grid container direction="column" alignItems="center" style={{width:'500px', height:'70vh', margin:'auto', marginTop:'100px', backgroundColor:'#ffffff20',borderRadius:'7px', boxShadow:'2px 2px 3px rgba(20,20,20,.1)' }} >      
      <Typography variant="h6" style={{fontFamily: "Poppins", marginTop:'40px'}} >Iniciar Sesión</Typography>
      <InputPersonalizado 
        spellCheck="false" 
        variant='outlined' 
        label="Usuario" 
        style={{marginTop:'70px', width:'60%'}} 
        value={datos.username} 
        onChange={(e)=>cambioInput(e,'username')} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle style={{color:'rgba(250,250,250,.5)'}} />
            </InputAdornment>
          ),
        }}
        />
      <InputPersonalizado 
        variant='outlined' 
        label="Password" 
        type="password" 
        style={{marginTop:'40px', width:'60%'}} 
        value={datos.password} 
        onChange={(e)=>cambioInput(e,'password')} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock style={{color:'rgba(250,250,250,.5)'}} />
            </InputAdornment>
          ),
        }}
        />
      <Button variant='outlined' style={{color:'white', border:'1px solid #ffffff60', marginTop:'80px', width:'60%'}} onClick={logearse} >Ingresar</Button>
    </Grid>
    </form>

    <LinearProgressPersonalizado style={{display: mostrarBarraCarga }}  />

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