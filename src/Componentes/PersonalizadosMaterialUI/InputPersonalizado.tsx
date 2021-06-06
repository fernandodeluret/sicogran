import React from 'react'
import { TextField, withStyles } from "@material-ui/core";



let InputPersonalizado = withStyles({
  root:{
    '& input':{
      color:'white'
    },
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

export default (props)=>{

  return(
    <InputPersonalizado {...props} />
  )
}