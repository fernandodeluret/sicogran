import { AppBar, Button, Grid, TextField, Toolbar, Typography, withStyles } from '@material-ui/core';
import Datastore from 'nedb-promises';
import React, { useEffect } from 'react';
import Volver from '../Componentes/Volver'



const InputPersonalizado = withStyles({
  root:{
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




async function guardarProductosEnBD(){
  let datastore = Datastore.create('database/db1.db')
  await datastore.insert({ doc: {campo1:"valor1"} })
}



export default ()=>{

  useEffect(()=>{
    // guardarProductosEnBD()
  },[])


  return(
    <div>
      <AppBar style={{backgroundColor:'hsla(0,100%,80%,0.15)'}} >
        <Toolbar>
          <Volver />
          <Typography variant="h6" style={{marginLeft:'20px'}} >Cargar Producto</Typography>
        </Toolbar>
      </AppBar>
      <form noValidate autoComplete="off" >
      <Grid container direction="column" alignItems="center" style={{width:'500px', height:'70vh', margin:'auto', marginTop:'100px', backgroundColor:'#ffffff20',borderRadius:'7px'}} >
        <InputPersonalizado variant='outlined' label="Nombre del producto" style={{marginTop:'70px', width:'60%'}} />
        <InputPersonalizado variant='outlined' label="Precio por Kg" type="number" style={{marginTop:'30px', width:'60%'}} />
        <Button variant='outlined' style={{color:'white', border:'1px solid #ffffff60', marginTop:'50px', width:'60%'}} >Agregar</Button>
      </Grid>
      </form>


    </div>
  )
}
