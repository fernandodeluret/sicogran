import { AppBar, Button, Fab, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import { Add, Close, Delete } from '@material-ui/icons';
import Datastore from 'nedb-promises';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Volver from '../Componentes/Volver'


export default ()=>{
  let history = useHistory()
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
    <div>
      <AppBar style={{backgroundColor:'hsla(0,100%,80%,0.15)'}} >
        <Toolbar>
          <Volver />
          <Typography variant="h6" style={{marginLeft:'20px'}} >Productos</Typography>
        </Toolbar>
      </AppBar>
      <Fab onClick={()=>history.push("/cargarproductos") } style={{backgroundColor:'rgb(0,110,255)', position:'absolute', right:'35px',top:'-70px'}} >
        <Add style={{color:'white', fontSize:'2.2em'}} />
      </Fab>
      <Table style={{width:'85%',margin:'auto',marginTop:'150px', backgroundColor:'hsla(0,100%,100%,0.1)', padding:'10px' }} >
        <TableHead>
          <TableRow>
            <TableCell style={{color:'white'}} >ID</TableCell>
            <TableCell style={{color:'white'}} >Codigo</TableCell>
            <TableCell style={{color:'white'}} >nombre</TableCell>
            <TableCell style={{color:'white'}} >precio</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
              <Button href="#" style={{color:'rgb(150,0,0)'}} onClick={ (e)=>eliminarProducto(producto['_id'], e) } >
                <Delete />
              </Button>
            </TableCell>
          </TableRow>
        )})}
        </TableBody>
      </Table>
    </div>
  )
}
