import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

import Balanza from '../img/balanza.svg'

 
const useStyles1 = makeStyles({
  cartabalanza: {
    width: '205px',
    height: '290px',
    margin: '10px',
    marginTop: '30px',
    padding:'10px 15px 10px 15px',
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
      },
    },
  },
  texto1:{
    textAlign:'center',
    fontFamily: 'Poppins'
  },
  balanzaSvg:{
    fill:'none',
    marginTop:'-8px',
    marginBottom:'20px',
    stroke:'#ffffff80',
    strokeMiterlimit: 10,
    strokeWidth: '7px',
  },
  luzPrendida: {
    position:'relative',
    top:'0px',
    width:'15px',
    height:'15px',
    borderRadius:'50%',
    backgroundColor: 'hsla(110,90%,60%,1)',
    boxShadow: '1px 1px 12px hsla(80,100%,50%,1)'
  },
  luzApagada: {
    position:'relative',
    top:'0px',
    width:'15px',
    height:'15px',
    borderRadius:'50%',
    backgroundColor: 'hsla(360,30%,35%,1)',
    boxShadow: '1px 1.4px 3px hsla(360,100%,50%,1)'
  }
})

export default (props)=>{
  let {balanzasConectadas, setbalanzasConectadas} = props
  const clases = useStyles1()
  let history = useHistory()

  let irAbalanzas = ()=>{
    history.push("/balanzas")
  }

  return(
    <Box onClick={irAbalanzas}>
    <Grid className={clases.cartabalanza} container item direction='column' justify='center'>
      <div className={balanzasConectadas['1']?clases.luzPrendida:clases.luzApagada} ></div>
      <Balanza className={clases.balanzaSvg} />
      <Typography className={clases.texto1} >CONECTAR BALANZAS</Typography>
    </Grid>
    </Box>
  )
}