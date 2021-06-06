import { Box, Button, Grid } from '@material-ui/core'
import Datastore from 'nedb-promises'
import React, { useEffect, useState } from 'react'

import InputConBusqueda from '../Componentes/PersonalizadosMaterialUI/InputConBusqueda'
import InputPersonalizado from '../Componentes/PersonalizadosMaterialUI/InputPersonalizado'








export default (props)=>{
  let {setabrirAlerta} = props

  let [listadoDatos,setlistadoDatos] = useState([{label:'', codigo:1}])
  let [hayProductoSeleccionado,sethayProductoSeleccionado] = useState(false)
  let [idProdSelec, setidProdSelec] = useState()
  let [datosInputs, setdatosInputs] = useState({precioCompra:'', cantidad:'', stockactual: '' })


  useEffect(()=>{
    (async function(){
      let productosdb = await Datastore.create('database/productos.db').find({})
      let nuevoListadoDatos = []
      for(let producto of productosdb){
        let stock = 0
        if(producto['stockactual']){
          stock = producto['stockactual']
        }
        let nuevoDato = {label: producto['nombre'], codigo: producto['codigo'], stockactual: stock }
        
        nuevoListadoDatos.push(nuevoDato)
      }
      setlistadoDatos(nuevoListadoDatos)
    })()
  },[])


  let cambioInput = (e:any,campo:string)=>{
    setdatosInputs({...datosInputs,[campo]: e.target.value})
  }


  let seleccionarProducto = (e,value)=>{
    if(value){
      sethayProductoSeleccionado(true)
      setidProdSelec(value.codigo)
      setdatosInputs({...datosInputs, stockactual: value.stockactual})
    }else{
      sethayProductoSeleccionado(false)
      setidProdSelec(null)
    }
  }


  let actualizarStock = async ()=>{
    // aca hacer las alertas
    if(!datosInputs.cantidad){
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes ingresar una cantidad comprada'})
      return
    }else if(!datosInputs.precioCompra){
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes ingresar un precio de compra'})
      return
    }
    let nuevoStock = parseInt(datosInputs.stockactual) + parseInt(datosInputs.cantidad)
    let comprasDB = Datastore.create({filename:'database/compras.db', timestampData:true})  //inserto la compra en la BD
    await comprasDB.insert({ codigoproducto: idProdSelec, cantidad: datosInputs.cantidad, preciocompra: datosInputs.precioCompra })
    await Datastore.create({filename: 'database/productos.db', timestampData: true}).update({ codigo: idProdSelec }, { $set: { stockactual: nuevoStock } }) //actualizo el stock actual en la tabla productos de la BD
    setdatosInputs({precioCompra:'', cantidad:'', stockactual: nuevoStock.toString() })  //vacio los inputs y cambio el valor del input del stock
    for(let producto of listadoDatos){ //esto es para actualizar el listado de datos del select, por si cambio de producto que se mantenga la cantidad nueva, pero sin hacer otra consulta a la BD
      if(producto.codigo == idProdSelec){
        producto['stockactual'] = nuevoStock
      }
    }
    setlistadoDatos(listadoDatos)
  }



  return(
  <Box display={false} style={{width:'85%',margin:'auto',marginTop:'30px', backgroundColor:'hsla(0,100%,100%,0.1)', padding:'30px', borderRadius:'6px', boxShadow:'0px 0px 4px rgba(30,30,30,.2)',maxHeight:'70vh', overflow: 'auto'}} >
    <Grid container direction="column" alignItems="flex-start"  >
      <InputConBusqueda listadoDatos={listadoDatos} funcionOnChange={seleccionarProducto} />
      {hayProductoSeleccionado?
      <>
      <InputPersonalizado style={{ marginTop:'15px', width:'300px' }} variant='outlined' label="Stock Actual" value={datosInputs.stockactual} />
      <InputPersonalizado style={{ marginTop:'55px', width:'300px' }} variant='outlined' type="number" label="Kg a cargar" value={datosInputs.cantidad} onChange={(e)=>cambioInput(e,'cantidad')} />
      <InputPersonalizado style={{ marginTop:'15px', width:'300px' }} variant='outlined' type="number" label="Precio de compra (por Kg)" value={datosInputs.precioCompra} onChange={(e)=>cambioInput(e,'precioCompra')} />
      <Button variant='outlined' style={{color:'white', border:'1px solid #ffffff60', marginTop:'15px', width:'300px'}} onClick={actualizarStock} >Cargar</Button>
      </> : <></>}
    </Grid>
  </Box>
  )
}