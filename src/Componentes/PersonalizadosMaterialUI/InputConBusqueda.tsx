import { Paper } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react'

import InputPersonalizado from './InputPersonalizado'





const CustomPaper = (props) => {
  return <Paper elevation={8} style={{background:'linear-gradient(200.96deg, rgba(33, 180, 119,.7) -29.09%, #069faa99 51.77%', color:'white', position:'relative',top:'-80px', left:'-10px'}} {...props} />;
};


const CustomPopupIcon = ()=>{
  return <ArrowDropDown  />
}


export default (props)=>{
  let {listadoDatos,funcionOnChange} = props

  return(
  <Autocomplete
    options={listadoDatos}
    getOptionLabel={(option) => option['label']}
    onChange={funcionOnChange}
    PaperComponent={CustomPaper}
    popupIcon={CustomPopupIcon}
    noOptionsText='No hay coincidencias'
    style={{ width: 300 }}
    renderInput={(params) => <InputPersonalizado {...params} variant='outlined' label="Elegir Producto" style={{}} />}
  />
  )
}