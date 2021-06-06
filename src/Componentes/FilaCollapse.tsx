import { Box, Collapse, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons"
import Datastore from "nedb-promises";
import React, { useEffect, useState } from "react"





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








export default function FilaCollapse(props){
  let {venta, setventas, cambiarVentasAMostrar, paginacion, setpaginacion} = props

  const classes = useStyles();
  const [open,setopen] = useState(false)


  let eliminarVenta = async (id:any, e:any)=>{
    let ventasdb = Datastore.create('database/ventas.db')
    await ventasdb.remove({_id: id},{})
    let data = await ventasdb.find({}).sort({createdAt:-1})
    setventas(data)
    cambiarVentasAMostrar(0,data)
    setpaginacion({...paginacion,paginas:Math.ceil(data.length/paginacion.filasPorPag)})
  }


  let abrirDetalle = ()=>{
    if(open){
      setopen(false)
    }else{
      setopen(true)
    }
  }


  return(
    <>
    <TableRow key={venta['_id']} className={classes.filaTabla} >
      <TableCell onClick={abrirDetalle} style={{borderColor:'rgba(250,250,250,.0)'}} >
        {open?
          <KeyboardArrowUp style={{color:'rgb(230,230,230)'}} />
          :
          <KeyboardArrowDown style={{color:'rgb(230,230,230)'}} />
        }
        
      </TableCell>
      <TableCell onClick={abrirDetalle}  style={{color:'rgb(230,230,230)', width:'60%', borderColor:'rgba(250,250,250,.0)' }} >{venta.createdAt?venta.createdAt.toLocaleString():'-'}</TableCell>
      <TableCell onClick={abrirDetalle}  style={{color:'rgb(230,230,230)', width:'30%', borderColor:'rgba(250,250,250,.0)'}} >${venta.total}</TableCell>
      <TableCell style={{width:'10%', borderColor:'rgba(250,250,250,.0)'}}>
        <IconButton style={{color:'rgb(150,0,0)',boxShadow: 'none' }} onClick={ (e)=>eliminarVenta(venta['_id'], e) } >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4} >
        <Collapse in={open} timeout="auto" unmountOnExit>    
          <Box style={{backgroundColor:'rgba(30,30,30,.15)',padding:'10px',marginBottom:'10px',borderRadius:'2px'}}>
            <Table size="small" style={{fontSize:'8px'}} >
              <TableHead>
                <TableRow>
                  <TableCell style={{fontSize:'12px',color:'rgba(255,255,255,.7)', borderColor:'rgba(250,250,250,.4)'}} >Producto</TableCell>
                  <TableCell style={{fontSize:'12px',color:'rgba(255,255,255,.7)', borderColor:'rgba(250,250,250,.4)'}} >Cod.</TableCell>
                  <TableCell style={{fontSize:'12px',color:'rgba(255,255,255,.7)', borderColor:'rgba(250,250,250,.4)'}} >Cantidad</TableCell>
                  <TableCell style={{fontSize:'12px',color:'rgba(255,255,255,.7)', borderColor:'rgba(250,250,250,.4)'}} >Precio</TableCell>
                  <TableCell style={{fontSize:'12px',color:'rgba(255,255,255,.7)', borderColor:'rgba(250,250,250,.4)'}} >Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                venta.productos.map((producto)=>{
                  return(
                    <TableRow >
                      <TableCell style={{fontSize:'11px',color:'rgba(250,250,250,.55)', borderColor:'rgba(250,250,250,.2)'}} >{producto.nombre}</TableCell>
                      <TableCell style={{fontSize:'11px',color:'rgba(250,250,250,.55)', borderColor:'rgba(250,250,250,.2)'}} >{producto.codigo}</TableCell>
                      <TableCell style={{fontSize:'11px',color:'rgba(250,250,250,.55)', borderColor:'rgba(250,250,250,.2)'}} >{producto.peso}Kg</TableCell>
                      <TableCell style={{fontSize:'11px',color:'rgba(250,250,250,.55)', borderColor:'rgba(250,250,250,.2)'}} >${producto.precio}</TableCell>
                      <TableCell style={{fontSize:'11px',color:'rgba(250,250,250,.55)', borderColor:'rgba(250,250,250,.2)'}} >${producto.subtotal}</TableCell>
                    </TableRow>
                  )
                })
                }
                <TableRow></TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
    </>
  )
}