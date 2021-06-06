import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Datastore from 'nedb-promises'
import React, { useEffect, useState } from 'react'


export default (props)=>{
  let [productos,setproductos] = useState([])


  useEffect(()=>{
    async function verListaProductos(){
      let productosdb = Datastore.create('database/productos.db')
      let data = await productosdb.find({})
      // console.log(data)
      setproductos(data)
    }
    verListaProductos()
  },[])


  let eliminarProducto = async (id:any, e:any)=>{
    let productosdb = Datastore.create('database/productos.db')
    await productosdb.remove({_id: id},{})
    let data = await productosdb.find({})
    setproductos(data)
  }

  let i = 0


  return(
    <Box style={{width:'85%',margin:'auto',marginTop:'30px', backgroundColor:'hsla(0,100%,100%,0.1)', padding:'10px', borderRadius:'6px', boxShadow:'0px 0px 4px rgba(30,30,30,.2)',maxHeight:'70vh', overflow: 'auto'}} >
    <Table >
      <TableHead>
        <TableRow>
          <TableCell style={{color:'white'}} >ID</TableCell>
          <TableCell style={{color:'white'}} >Codigo</TableCell>
          <TableCell style={{color:'white'}} >nombre</TableCell>
          <TableCell style={{color:'white'}} >precio</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody >
      {productos.map((producto)=>{
        i++
        return(
        <TableRow key={producto['_id']} >
          {/* <TableCell style={{color:'rgb(230,230,230)'}} >{producto['_id']}</TableCell> */}
          <TableCell style={{color:'rgb(230,230,230)'}} >{i}</TableCell>
          <TableCell style={{color:'rgb(230,230,230)'  }} >{producto['codigo']}</TableCell>
          <TableCell style={{color:'rgb(230,230,230)', width:'30%'  }} >{producto['nombre']}</TableCell>
          <TableCell style={{color:'rgb(230,230,230)'}} >${producto['precio']}</TableCell>
          <TableCell style={{width:'10%'}}>
            <IconButton style={{color:'rgb(150,0,0)',boxShadow: 'none' }}  onClick={ (e)=>eliminarProducto(producto['_id'], e) } >
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      )})}
      </TableBody>
    </Table>
    </Box>
  )
}