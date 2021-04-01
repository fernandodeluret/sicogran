import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import Datastore from "nedb-promises"
import {ipcRenderer } from 'electron';
import { Button } from '@material-ui/core';






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












  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
          <Button>asdas</Button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
