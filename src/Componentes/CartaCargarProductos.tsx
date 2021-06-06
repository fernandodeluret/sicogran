import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

import Productos from '../img/productos.svg'
 

const useStyles1 = makeStyles({
  cartabalanza: {
    width: '205px',
    height: '290px',
    margin: '15px',
    marginTop: '30px',
    padding:'15px 15px 10px 15px',
    backgroundColor: 'hsla(0,100%,100%,.08)',
    border:'1px solid hsla(0,100%,100%,.4)',
    borderRadius:'7px',
    transition: 'all .2s ease-out',
    '&:hover': {
      transition: 'all .3s ease-out',
      transform: 'scale(1.02)',
      // boxShadow: '1px 2px 10px hsla(100,0%,10%,1)',
      boxShadow: '1px 3px 15px hsla(100,0%,90%,.6)',
      backgroundColor: 'hsla(0,100%,100%,.25)',
      cursor: 'pointer',
      '& svg':{
        stroke:'#fff',
        strokeWidth: '1px',
      }
    },
  },
  texto1:{
    textAlign:'center',
    fontFamily: 'Poppins'
  },
  balanzaSvg:{
    fill:'none',
    marginTop: '12px',
    marginBottom:'18px',
    stroke:'#ffffff30',
    strokeMiterlimit: 10,
    strokeWidth: '1px',
  }
})

export default ()=>{
  const clases = useStyles1()
  let history = useHistory()

  let irAbalanzas = ()=>{
    history.push("/listaproductos")
  }

  return(
    <Box onClick={irAbalanzas}>
    <Grid className={clases.cartabalanza} container item direction='column' justify='center'>
      <Productos className={clases.balanzaSvg} />
      <Typography className={clases.texto1} >PRODUCTOS</Typography>
    </Grid>
    </Box>
  )
}
