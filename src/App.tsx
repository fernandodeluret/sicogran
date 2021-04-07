import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import Datastore from "nedb-promises"
import {ipcRenderer } from 'electron';
import { Button } from '@material-ui/core';

import Balanzas from "./Paginas/Balanzas"




const Hello = () => {


  //pasamos la BD al frontend
  useEffect(()=>{
    async function funcion1(){
      let datastore = Datastore.create('database/db1.db')
      // const datastore = remote.getGlobal('datastore')
      await datastore.insert({ doc: {campo1:"valor1"} })

      let data = await datastore.find({})
      console.log('find:', data)
    }
    // funcion1()


    window.addEventListener('keyup', (e)=>{
      if( (e.altKey && e.key==='Enter')){
        // PARA CAMBIAR A PANTALLA COMPLETA
        ipcRenderer.send('pantalla-completa', 'ping')
      }
    }, true)

  },[])

  let history = useHistory()



  return (
    <div>
      <div style={{fontFamily: "Train One"}} className="Hello">
        <span className="sicogran1" >Si</span>
        <span className="sicogran2" >stema de </span>
        <span className="sicogran1" > Co</span>
        <span className="sicogran2" >ntrol de           </span>
        <span className="sicogran1" >Gran</span>
        <span className="sicogran2" >el</span>
      </div>
      <Button onClick={()=>{history.push("/balanzas")}} >balanzas</Button>
    </div>
  );
};








export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/balanzas" >
          <Balanzas />
        </Route>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
