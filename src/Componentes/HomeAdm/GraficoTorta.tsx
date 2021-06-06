import { Typography } from '@material-ui/core';
import Datastore from 'nedb-promises';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';




export default function(props){
  let {productosPpales} = props
  if(!productosPpales){
    productosPpales = {valores: [], labels: []}
  }

  let [showlegend,setShowlegend] = useState(false)
  
  let nuevoTraceVentas = {
    values: productosPpales['valores'],
    labels: productosPpales['labels'],
    type: 'pie',
    hole: .4,
    'marker': {
      'colors': [
        '#ffe88830',
        '#ff7ef140',
        '#ff006450',
        'rgba(77, 163, 245,.4)',
      ],
      'line': {
        'color': [
          '#ffe888',
          'rgba(255, 126, 241, .8)',
          'rgba(255, 0, 120,.7)',
          'rgba(40, 80, 255, .5)',
        ],
        'width': 1.5
      }
    },
    textfont:{
      // family:'',
      // size:'',
      color:'white',
    },
    hoverinfo: 'label',
    hoverlabel:{
      bgcolor: 'hsla(180,80%,40%,1)',
      font:{
        color: 'white',
        size: 15,
      },
      bordercolor: "rgba(200,0,0,0)"
    },
    // opacity:.8,
  }
    
   



return(
<div style={{
//   marginLeft:'50px',
//   marginTop:'50px',
  width: "250px",
  height: "250px",
  // backgroundColor:'hsla(100,100%,100%,.2)',
  background: "linear-gradient(160deg, hsla(200,100%,100%,.5) -29.09%, hsla(100,100%,100%,.1) 51.77%, hsla(200,100%,10%,.15) 129.35%)",
  borderRadius:'8px',
  boxShadow:'0px 1px 15px hsla(100,100%,0%,.3)',
  textAlign:'center',
  padding:'10px'
}} >
  <Typography variant="h6" style={{fontFamily: 'Poppins', fontWeight: 100, marginTop:'0px',marginBottom:'-20px'}} >Productos Principales</Typography>
  
  <Plot 
    style={{
      width: "100%",
      height: "100%",
    }}
    data={[nuevoTraceVentas]}
    config={{
      displayModeBar: false,
      responsive: true,
    }}
    layout={ {
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

      showlegend: showlegend,
      legend: {
        x: .07,
        y: 1,
        traceorder: 'normal',
        font: {
          // family: 'sans-serif',
          // size: 12,
          color: 'white'
        },
        // bgcolor: '#E2E2E2',
        // bordercolor: '#FFFFFF',
        // borderwidth: 2
      },
    }}
  />

  
</div>
)
}