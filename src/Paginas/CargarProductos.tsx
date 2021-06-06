import { AppBar, Button, Grid, Snackbar, TextField, Toolbar, Typography, withStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Datastore from 'nedb-promises';
import React, { useState } from 'react';
import Volver from '../Componentes/Volver'



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








export default (props)=>{

  let [producto,setproducto] = useState({nombre:'',precio:'',codigo:''})
  let {abrirAlerta, setabrirAlerta} = props

  let cambioInput = (e:any,campo:string)=>{
    setproducto({...producto,[campo]: e.target.value})
  }

  async function guardarProductosEnBD(){
    if(producto.nombre==''){
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes agregar un nombre al producto'})
    }else if(producto.precio==''){
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes agregar un precio al producto'})
    }else if(producto.codigo==''){
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Debes agregar un codigo al producto'})
    }else{
      let productos = Datastore.create({filename:'database/productos.db',timestampData:true})
      let repetido = await productos.find({codigo:producto.codigo})
      if(repetido.length != 0){
        console.log(repetido)
        setabrirAlerta({abierta: true, tipo:'error', msj: 'Ya hay otro producto con ese código'})
        return
      }
      let agregados = await productos.insert(producto)
      // console.log(agregados)
      setproducto({nombre:'',precio:'',codigo:''})
      setabrirAlerta({abierta: true, tipo:'success', msj: 'El producto se ha cargado correctamente'})
    }

  }


  return(
    <div>
      <AppBar style={{backgroundColor:'hsla(0,100%,80%,0.15)'}} >
        <Toolbar>
          <Volver ruta="/listaproductos" />
          <Typography variant="h6" style={{marginLeft:'20px'}} >Cargar Nuevo Producto</Typography>
        </Toolbar>
      </AppBar>
      <form noValidate autoComplete="off" >
      <Grid container direction="column" alignItems="center" style={{width:'500px', height:'70vh', margin:'auto', marginTop:'100px', backgroundColor:'#ffffff20',borderRadius:'7px'}} >
        <InputPersonalizado variant='outlined' label="Código" type="number" style={{marginTop:'30px', width:'60%'}} value={producto.codigo} onChange={(e)=>cambioInput(e,'codigo')} />
        <InputPersonalizado spellCheck="false" variant='outlined' label="Nombre del producto" style={{marginTop:'70px', width:'60%'}} value={producto.nombre} onChange={(e)=>cambioInput(e,'nombre')} />
        <InputPersonalizado variant='outlined' label="Precio por Kg" type="number" style={{marginTop:'30px', width:'60%'}} value={producto.precio} onChange={(e)=>cambioInput(e,'precio')} />
        <Button variant='outlined' style={{color:'white', border:'1px solid #ffffff60', marginTop:'50px', width:'60%'}} onClick={guardarProductosEnBD} >Agregar</Button>
      </Grid>
      </form>


      <Snackbar open={abrirAlerta.abierta} autoHideDuration={2000} onClose={()=>setabrirAlerta({...abrirAlerta, abierta:false})} >
        <Alert 
          // @ts-ignore
          severity={abrirAlerta.tipo} 
          variant="filled" 
          elevation={6} 
        >
          {abrirAlerta.msj}
        </Alert>
      </Snackbar>
    </div>
  )
}
