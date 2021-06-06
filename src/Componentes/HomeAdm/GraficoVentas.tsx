import { Typography } from '@material-ui/core';
import Datastore from 'nedb-promises';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';




export default function(props){
  let {ventasPorDia} = props

  let [showlegend,setShowlegend] = useState(false)

  let TraceVentas = {
    x: ventasPorDia.fechas, 
    y: ventasPorDia.valores,
    name: `ventas`,
    // hovertemplate: '<b>%{y:.3f}%</b>',
    yaxis: 'y1',
    type: 'bar', 
    // visible: 'legendonly',
    marker: {
      color: '#61ff8a20',
      line: {
        color: 'rgba(97, 255, 138, .8)',
        width: 1.5
      }
    },
  }

// AMARILLO
//   fillcolor: '#ffe88820',
//   marker: {
//     color: '#ffe88890',
//   },

// VERDE
// fillcolor: '#61ff8a20',
// marker: {
//   color: 'rgba(97, 255, 138, .8)',
// },

// ROSADO
// fillcolor: '#ff7ef130', 
// marker: {
//     color: 'rgba(255, 126, 241, .5)',
//     size: 8
//   },

// AZUL
// fillcolor: 'rgba(77, 163, 245,.2)',
// marker: {
//     color: 'rgba(40, 80, 255, .35)',
//     size: 10
// },

// ROJO
// fillcolor: '#ff006420',
// marker: {
//   color: 'rgba(255, 0, 120,.9)',
// },

// OTRO ROJO
// fillcolor: 'rgba(150, 0, 80,.3)',
// marker: {
//   color: 'rgba(150, 0, 80,.9)',
// },


 


return(
<div style={{
  marginBottom:'46px',
  width: "650px",
  height: "400px",
  // backgroundColor:'hsla(100,100%,100%,.2)',
  background: "linear-gradient(160deg, hsla(200,100%,100%,.5) -29.09%, hsla(100,100%,100%,.1) 51.77%, hsla(200,100%,10%,.15) 129.35%)",
  borderRadius:'8px',
  boxShadow:'0px 1px 15px hsla(100,100%,0%,.3)',
  textAlign:'center',
  padding:'10px'
}} >
  <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight: 100, marginTop:'0px',marginBottom:'-20px'}} >Ventas</Typography>
  
  <Plot 
    style={{
      width: "100%",
      height: "95%",
    }}
    data={[TraceVentas]}
    config={{
      displayModeBar: false,
      responsive: true,
    }}
    layout={ {
      // width: 1500, 
      // height: 750, 
      // autosize: true,
      margin: {
        l: 30,
        r: 30,
        b: 30,
        t: 30,
        // pad: 10
      },
      uirevision:'true',
      plot_bgcolor: "rgba(0,20,60,.03)",
      paper_bgcolor: "rgba(0,0,170,0)",
      // title: 'DATOS POR MINUTO',
      hovermode:"x unified",
      hoverlabel:{
        bgcolor: 'rgba(200,200,200,.1)',
        font:{
          color: 'white',
          size: 15,
        },
        bordercolor: "rgba(200,200,200,.5)"
      },
      showlegend: showlegend,
      legend: {
        x: .07,
        y: 1,
        // traceorder: 'normal',
        font: {
          // family: 'sans-serif',
          // size: 12,
          color: 'white'
        },
        // bgcolor: '#E2E2E2',
        // bordercolor: '#FFFFFF',
        // borderwidth: 2
      },
      dragmode: 'pan',
      xaxis: {
        // showspikes: true,
        // spikecolor: "green",
        spikethickness: .001,
        // spikesnap:"cursor", 
        // spikemode:"across",
        gridcolor: "rgba(255,255,255,.1)",
        tickfont: {
          color: 'white'
        },
        // range: rangeX,
        domain: [0.04, .95]
      },
      yaxis: {
        gridcolor: 'rgba(255,255,255,.2)',
        // ticksuffix: "$",
        tickprefix:'$',
        tickfont: {
          // family: 'Old Standard TT, serif',
          // size: 14,
          color: 'white'
        },
        titlefont: {
          // family: 'Arial, sans-serif',
          // size: 18,
          color: 'rgba(200,200,200,1)'
        },
        // gridwidth: 2,
        // linecolor: 'rgba(255,255,255,.4)',
        zerolinecolor: 'rgba(240,240,255,.4)',
        // linewidth: 6,
        // range: [0,20],
        title: {
        //   text:'ventas',
          standoff: 10.1
        },
        position: 0.04,
      },
      yaxis2: {
        // range: range3,
        showgrid: false,
        tickfont: {
          color: 'white'
        },
        zerolinecolor: 'rgba(240,240,255,.4)',
        titlefont: {
          color: 'rgba(200,200,200,1)'
        },
        title: {
          text:'Índices',
          standoff: -.001
        },
        overlaying: 'y',
        position: .98,
        side: 'right'
      },
    }}
  />

  
</div>
)
}