import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.global.css';

import Balanzas from "./Paginas/Balanzas"
import Home from './Paginas/Home'
import ListaProductos from './Paginas/ListaProductos'
import CargarProductos from './Paginas/CargarProductos'
import Ventas from './Paginas/Ventas'
import Login from './Paginas/Login'
import HomeAdm from './Paginas/HomeAdm'
import { ipcRenderer } from 'electron';
import CrearEmpleados from './Paginas/CrearEmpleados'






export default function App() {
  let [balanzasConectadas,setbalanzasConectadas] = useState({'1':false, '2':false, '3':false})
  let [usuario,setusuario] = useState({tipo:'',logeado:false})
  let [abrirAlerta,setabrirAlerta] = useState({abierta: false, tipo:'success', msj: ''})
  let [conexionWS, setconexionWS] = useState()
  let [accessToken, setaccessToken] = useState()
  let [IP, setIP] = useState('192.168.100.121')


  useEffect(()=>{
    window.addEventListener('keyup', (e)=>{
      if( (e.altKey && e.key==='Enter')){
        // PARA CAMBIAR A PANTALLA COMPLETA
        ipcRenderer.send('pantalla-completa', 'ping')
      }
    }, true)
  },[])


  let isAdm = ()=>{
    if(usuario.tipo=='adm'){
      return( <HomeAdm usuario={usuario} abrirAlerta={abrirAlerta} setabrirAlerta={setabrirAlerta} balanzasConectadas={balanzasConectadas} setbalanzasConectadas={setbalanzasConectadas} />)
    }else{
      return( <Home usuario={usuario} abrirAlerta={abrirAlerta} setabrirAlerta={setabrirAlerta} balanzasConectadas={balanzasConectadas} setbalanzasConectadas={setbalanzasConectadas} />) 
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/balanzas" ><Balanzas balanzasConectadas={balanzasConectadas} setbalanzasConectadas={setbalanzasConectadas} abrirAlerta={abrirAlerta} setabrirAlerta={setabrirAlerta} conexionWS={conexionWS} setconexionWS={setconexionWS} IP={IP} /></Route>
        <Route path="/listaproductos" ><ListaProductos abrirAlerta={abrirAlerta} setabrirAlerta={setabrirAlerta} /></Route>
        <Route path="/cargarproductos" ><CargarProductos abrirAlerta={abrirAlerta} setabrirAlerta={setabrirAlerta} /></Route>
        <Route path="/ventas" ><Ventas usuario={usuario} abrirAlerta={abrirAlerta} setabrirAlerta={setabrirAlerta} /></Route>
        <Route path="/home" >{isAdm}</Route>
        <Route path="/crearempleados" ><CrearEmpleados abrirAlerta={abrirAlerta} setabrirAlerta={setabrirAlerta} accessToken={accessToken} /> </Route>
        <Route path="/" ><Login setusuario={setusuario} abrirAlerta={abrirAlerta} setabrirAlerta={setabrirAlerta} balanzasConectadas={balanzasConectadas} setbalanzasConectadas={setbalanzasConectadas} conexionWS={conexionWS} setconexionWS={setconexionWS} setaccessToken={setaccessToken} IP={IP} /></Route>
      </Switch>
    </Router>
  );
}
