import { LinearProgress, withStyles } from '@material-ui/core';
import React from 'react'



export default withStyles((theme) => ({
    root: {
      height: 5,
      borderRadius: 5,
      marginTop:'20px', 
    },
    colorPrimary: {
      backgroundColor:'rgba(250,250,250,.15)',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);