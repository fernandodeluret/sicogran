import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.global.css';

import Balanzas from "./Paginas/Balanzas"
import Home from './Paginas/Home'
import ListaProductos from './Paginas/ListaProductos'
import CargarProductos from './Paginas/CargarProductos'






export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/balanzas" ><Balanzas /></Route>
        <Route path="/listaproductos" ><ListaProductos /></Route>
        <Route path="/cargarproductos" ><CargarProductos /></Route>
        <Route path="/" ><Home /></Route>
      </Switch>
    </Router>
  );
}
