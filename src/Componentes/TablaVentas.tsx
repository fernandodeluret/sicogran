import React, { useEffect, useState } from "react"
import { IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel,  Typography } from "@material-ui/core"
import Datastore from "nedb-promises"
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@material-ui/icons"
import { useHistory } from "react-router"

import FilaCollapse from '../Componentes/FilaCollapse'
import {StyledTabs, StyledTab} from '../Componentes/PersonalizadosMaterialUI/TabPersonalizado'


const useStyles = makeStyles((theme) => ({
  claseTab: {
    '&:focus': {
      // color: 'white',
      borderBottom: '2px solid #eee',
      opacity: 1,
    },
  },
}));






export default function TablaVentas(props){

  const classes = useStyles();
  let {usuario} = props

  let [ventas,setventas] = useState([])
  let [ventasMostradas,setventasMostradas] = useState([])
  let [columnaActiva,setcolumnaActiva] = useState({'columna':'', 'orden':'asc'})
  let [paginacion,setpaginacion] = useState({paginas:0,paginaActual:1,filasPorPag:5})
  let [valorTab,setvalorTab] = useState(0)

  let ventasdb = Datastore.create('database/ventas.db')
  let history = useHistory()


  let cambiarVentasAMostrar = (direccion,ListadoCompleto)=>{
    let nuevasVentasMostradas = []
    let indiceDeInicio = paginacion.filasPorPag*(paginacion.paginaActual-1+direccion)
    let limiteSuperior = paginacion.filasPorPag
    // console.log(ListadoCompleto)
    if(ListadoCompleto.length-1 < indiceDeInicio+limiteSuperior){
      // si me voy a pasar de la cantidad de elementos, cambio el limite superior
      limiteSuperior = ListadoCompleto.length-indiceDeInicio
    }
    for(let i=0; i<limiteSuperior; i++){
      nuevasVentasMostradas.push(ListadoCompleto[indiceDeInicio+i])
    }
    setventasMostradas(nuevasVentasMostradas)
  }


  function buscarSoloConFechaDeHoy(){
    // console.log(this.createdAt)
    let fechaActual = new Date()
    let tiempoTranscurridoDelDia = (fechaActual.getHours()*60+fechaActual.getMinutes())*60*1000
    if(this.createdAt.getTime() < fechaActual.getTime()-tiempoTranscurridoDelDia ){
      return false
    }
    return true
  }


  async function verListaVentasDelDia(){
    let data = await ventasdb.find({ $where: buscarSoloConFechaDeHoy }).sort({createdAt:-1}) //HACER ESTA CONSULTA ORDENADA POR FECHA
    setventas(data)
    let cantidadPaginas = Math.max(1, Math.ceil(data.length/paginacion.filasPorPag))
    setpaginacion({...paginacion, paginas:cantidadPaginas })
    cambiarVentasAMostrar(0,data)
  }

  async function verListaVentasHistoricas(){
    let data = await ventasdb.find({}).sort({createdAt:-1})
    setventas(data)
    let cantidadPaginas = Math.max(1, Math.ceil(data.length/paginacion.filasPorPag))
    setpaginacion({...paginacion, paginas:cantidadPaginas })
    cambiarVentasAMostrar(0,data)
  }


  useEffect(()=>{
    verListaVentasDelDia()
    // return ()=>{console.log('limpiado')}
  },[])


  let ordenarColumna = (columna)=>{
    if(columnaActiva['orden']== 'asc'){
      setcolumnaActiva({columna:columna, orden:'desc'})
    }else{
      setcolumnaActiva({columna:columna, orden:'asc'})
    }
  }


  let cambiarPag = (cambio)=>{
    if(cambio==-1){
      if(paginacion.paginaActual==1){
        return
      }
      setpaginacion({...paginacion, paginaActual: paginacion.paginaActual-1 })
      cambiarVentasAMostrar(-1,ventas)
    }else{
      if(paginacion.paginaActual==paginacion.paginas){
        return
      }
      setpaginacion({...paginacion, paginaActual: paginacion.paginaActual+1 })
      cambiarVentasAMostrar(1,ventas)
    }
  }


  let cambiarTab = (e,value)=>{
    // console.log(value)
    if(value != valorTab){
      if(value == 0){
        verListaVentasDelDia()
      }else if(value == 1){
        verListaVentasHistoricas()
      }
      setvalorTab(value)
    }
  }


  let tabsSiEsAdm = ()=>{
    if(usuario.tipo != 'empleado'){//@ts-ignore
      return(<StyledTab label="Ventas historicas"/>)
    }
  }



  return(
  <>
  {//@ts-ignore
  <StyledTabs value={valorTab} style={{marginTop:'80px'}} onChange={cambiarTab}> 
    {//@ts-ignore
    <StyledTab label="Ventas del dia"/>}
    {tabsSiEsAdm()}
  </StyledTabs>
  }
  

  <TableContainer style={{ maxHeight:'500px',marginTop:'30px' }}>
    <Table  style={{width:'85%', margin:'auto', backgroundColor:'hsla(0,100%,100%,0.1)', padding:'10px' }} >
        <TableHead >
          <TableRow >
            <TableCell  style={{width:'7%', backgroundColor:'hsla(0,100%,100%,0.1)'}} ></TableCell>
            <TableCell sortDirection={false} style={{backgroundColor:'hsla(0,100%,100%,0.1)'}} >
              <TableSortLabel
                style={{color:'white'}}
                active={columnaActiva.columna=='fecha'?true:false}
                //@ts-ignore
                direction={columnaActiva.columna=='fecha'? columnaActiva.orden : 'asc'}
                onClick={()=>ordenarColumna('fecha')} 
              >
                Fecha
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={'asc'} style={{backgroundColor:'hsla(0,100%,100%,0.1)'}} >
              <TableSortLabel
                style={{color:'white'}}
                active={columnaActiva.columna=='total'?true:false}
                //@ts-ignore
                direction={columnaActiva.columna=='total'? columnaActiva.orden : 'asc'}
                onClick={()=>ordenarColumna('total')} 
              >
                Total
              </TableSortLabel>              
            </TableCell>
            <TableCell  style={{width:'10%', backgroundColor:'hsla(0,100%,100%,0.1)'}} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
        ventasMostradas.map((venta)=>{
          return(
            <FilaCollapse key={venta._id} venta={venta} setventas={setventas} cambiarVentasAMostrar={cambiarVentasAMostrar} setpaginacion={setpaginacion} paginacion={paginacion} />
        )})
        }
        </TableBody>
      </Table>
  </TableContainer>
  <TableFooter style={{textAlign:'left', paddingLeft:'30px'}} >
    <TableRow  >
      <TableCell colSpan={3} align="right" style={{borderBottom:"None"}} >
      <Typography style={{color:'rgb(220,220,220)'}} >
        <IconButton style={{color:'rgb(220,220,220)',boxShadow: 'none',margin:'15px' }} onClick={()=>{cambiarPag(-1)}} >
          <ArrowBackIosRounded />
        </IconButton>
        Página {paginacion.paginaActual} de {paginacion.paginas}
        <IconButton style={{color:'rgb(220,220,220)',boxShadow: 'none',margin:'15px' }} onClick={()=>{cambiarPag(1)}} >
          <ArrowForwardIosRounded />
        </IconButton>
      </Typography>
      </TableCell>
    </TableRow>
  </TableFooter>
  </>
  )
}