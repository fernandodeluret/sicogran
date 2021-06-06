import React, { useEffect, useState } from 'react';
import { Grid, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Datastore from 'nedb-promises';

import GraficoVentas from '../Componentes/HomeAdm/GraficoVentas'
import GraficoTorta from '../Componentes/HomeAdm/GraficoTorta'
import MiniDrawer from '../Componentes/HomeAdm/MiniDrawer'
import CartaCajaDelDia from '../Componentes/HomeAdm/CartaCajaDelDia'
import CartaVentasDelDia from '../Componentes/HomeAdm/CartaVentasDelDia'
import CartaComparativaAyer from '../Componentes/HomeAdm/CartaComparativaAyer'



function buscarSoloConFechaDeHoy(){
  let fechaActual = new Date()
  let tiempoTranscurridoDelDia = (fechaActual.getHours()*60+fechaActual.getMinutes())*60*1000
  if(this.createdAt.getTime() < fechaActual.getTime()-tiempoTranscurridoDelDia ){
    return false
  }
  return true
}


function buscarSoloConFechaDeAyer(){
  let fechaActual = new Date()
  let tiempoTranscurridoDelDia = (fechaActual.getHours()*60+fechaActual.getMinutes())*60*1000
  let inicioHoy = fechaActual.getTime() - tiempoTranscurridoDelDia
  let inicioAyer = inicioHoy - 1000*60*60*24
  if(this.createdAt.getTime() < inicioHoy && this.createdAt.getTime() > inicioAyer ){
    return true
  }
  return false
}


let cajaYVentasDiaria = async (setcaja, setcantidadVentas, filtro)=>{
  let ventasdb = Datastore.create('database/ventas.db')
  let data = await ventasdb.find({ $where: filtro }).sort({createdAt:-1})
  let caja = 0
  let cantidadVentas = 0
  for(let venta of data){
    cantidadVentas+=1
    caja+= venta['total']
  }
  setcaja(caja)
  setcantidadVentas(cantidadVentas)
}


let productosPpalesHoy = async (setproductosPpales)=>{
  let ventasdb = Datastore.create('database/ventas.db')
  let data = await ventasdb.find({ $where: buscarSoloConFechaDeHoy }).sort({createdAt:-1})
  // TENGO QUE HACER QUE DIRECTAMENTE ME SETEE EL ARRAY PARA EL GRAF.. O SEA LOS TOTALES DE VENTA POR PROD
  let productos = {}
  let cantidadDeProductos = 0
  for(let venta of data){
    for(let producto of venta['productos']){
      if(productos[producto.codigo]){
        productos[producto.codigo].total += producto.subtotal
      }else{
        productos[producto.codigo] = {total: producto.subtotal, nombre: producto.nombre}
        cantidadDeProductos+=1
      }
    }
  }
  let valores = []
  let labels = []
  let mapeoValoresLabels = {}
  for(let producto in productos){
    // console.log(productos[producto].nombre)
    valores.push(productos[producto].total)
    labels.push(productos[producto].nombre)
    mapeoValoresLabels[productos[producto].total] = productos[producto].nombre
  }  
  // si hay mas de 4 productos los ordeno y dejo los 3 1ros y el resto los sumo todos
  if(cantidadDeProductos>4){
    valores.sort( (a, b)=>(b-a) )
    labels = []
    let nuevosValores = []
    let i = 0
    let totalOtrosProductos = 0
    for(let valor of valores){
      if(i<3){
        labels.push(mapeoValoresLabels[valor])
        nuevosValores.push(valor)
        i++
      }else{
        totalOtrosProductos+= valor
      }
    }
    labels.push('Otros')
    nuevosValores.push(totalOtrosProductos)
    // console.log({valores: nuevosValores, labels: labels})
    setproductosPpales({valores: nuevosValores, labels: labels})

  }else{
    // console.log({valores: valores, labels: labels})
    setproductosPpales({valores: valores, labels: labels})
  }
}


let AgregarPorDia = async(setventasPorDia)=>{
  let ventasdb = Datastore.create('database/ventas.db')
  let data = await ventasdb.find({}).sort({createdAt:-1})
  let dia = 0
  let mes =0
  let ano = 0
  let totalDiaActual = 0
  let arrayVentasPorDia = []
  let arrayFechas = []
  // console.log(new Date(2021,5,7))
  for(let venta of data){
    if(venta['createdAt'].getDate() != dia){
      if(dia != 0){
        // sumo la fecha y el total del dia a los array del graf
        let nuevaFecha = new Date(ano,mes,dia)
        arrayVentasPorDia.push(totalDiaActual)
        arrayFechas.push(nuevaFecha)
      }
      // actualizo el dia,mes y ano
      dia = venta['createdAt'].getDate()
      mes = venta['createdAt'].getMonth()
      ano = venta['createdAt'].getFullYear()
      // reinicio el totalDiaActual y le sumo el valor de esta venta
      totalDiaActual = venta['total']
    }else{
      // sumo el valor de la venta al totalDiaActual
      totalDiaActual += venta['total']
    }
  }
  let nuevaFecha = new Date(ano,mes,dia)
  arrayVentasPorDia.push(totalDiaActual)
  arrayFechas.push(nuevaFecha)
  // console.log({valores:arrayVentasPorDia, fechas:arrayFechas })
  setventasPorDia({valores:arrayVentasPorDia, fechas:arrayFechas })
}














export default function(props){
  let {balanzasConectadas, setbalanzasConectadas, abrirAlerta, setabrirAlerta} = props
  let [cajaHoy, setcajaHoy] = useState()
  let [cantidadVentasHoy, setcantidadVentasHoy] = useState()
  let [cajaAyer, setcajaAyer] = useState()
  let [cantidadVentasAyer, setcantidadVentasAyer] = useState()
  let [productosPpales, setproductosPpales] = useState()
  let [ventasPorDia, setventasPorDia] = useState({valores:[],fechas:[]})

  useEffect(()=>{
    cajaYVentasDiaria(setcajaHoy, setcantidadVentasHoy, buscarSoloConFechaDeHoy)
    cajaYVentasDiaria(setcajaAyer, setcantidadVentasAyer, buscarSoloConFechaDeAyer)
    productosPpalesHoy(setproductosPpales)
    AgregarPorDia(setventasPorDia)
  },[])
  


return(
<div>
  <MiniDrawer balanzasConectadas={balanzasConectadas} setbalanzasConectadas={setbalanzasConectadas} />
  <Grid container direction='row' justify="space-evenly" alignItems="flex-start" style={{paddingTop:'100px',paddingLeft:'70px'}} >
    <Grid >
      <GraficoVentas ventasPorDia={ventasPorDia} />
      <CartaComparativaAyer cajaAyer={cajaAyer} cajaHoy={cajaHoy} cantidadVentasAyer={cantidadVentasAyer} cantidadVentasHoy={cantidadVentasHoy} />
    </Grid>
    <Grid item >
      <CartaCajaDelDia cajaHoy={cajaHoy} />
      <CartaVentasDelDia cantidadVentasHoy={cantidadVentasHoy} />
      <GraficoTorta productosPpales={productosPpales} />
    </Grid>
  </Grid>
  

  <Snackbar open={abrirAlerta.abierta} autoHideDuration={2000} onClose={()=>setabrirAlerta({...abrirAlerta, abierta:false})} >
    {// @ts-ignore
    <Alert severity={abrirAlerta.tipo} variant="filled" elevation={6} >{abrirAlerta.msj}</Alert>
    }
  </Snackbar>
</div>
)
}