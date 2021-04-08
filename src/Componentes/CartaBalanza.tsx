import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

import Balanza from '../img/balanza.svg'


const useStyles1 = makeStyles({
  cartabalanza: {
    width: '205px',
    margin: '10px',
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
      }
    },
  },
  texto1:{
    textAlign:'center',
    fontFamily: 'Poppins'
  },
  balanzaSvg:{
    fill:'none',
    marginBottom:'20px',
    stroke:'#ffffff80',
    strokeMiterlimit: 10,
    strokeWidth: '3px',
  }
})

export default ()=>{
  const clases = useStyles1()
  let history = useHistory()

  let irAbalanzas = ()=>{
    history.push("/balanzas")
  }

  return(
    <Box onClick={irAbalanzas}>
    <Grid className={clases.cartabalanza} container item direction='column' justify='center'>
      <Balanza className={clases.balanzaSvg} />
      <Typography className={clases.texto1} >CONECTAR BALANZAS</Typography>
    </Grid>
    </Box>
  )
}
