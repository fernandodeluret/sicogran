import { makeStyles } from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router';



export default ()=>{
  let history = useHistory()
  const useStyles = makeStyles({
    volver: {
      // margin:'20px 0px',
      fontSize:'2.2em',
      cursor:'pointer',
      borderRadius: '5px',
      padding: '7px 30px',
      '&:hover':{backgroundColor:'hsla(110,90%,0%,.05)'},
    },
  })
  let clases = useStyles()


  return(
    <ArrowBackRounded className={clases.volver} onClick={()=>{history.goBack()}} />
  )
}
