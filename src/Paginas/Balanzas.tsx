import React, { useState } from "react"
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, Switch, withStyles } from "@material-ui/core"
import Volver from '../Componentes/Volver'


const SwitchPersonalizado = withStyles({
  switchBase: {
    color: 'hsla(360,30%,35%,1)',
    '& + $track': {
      backgroundColor: 'hsla(360,100%,40%,.8)'
    },
    '&$checked':{
      // color: 'hsla(200,90%,55%,1)'
      color: 'hsla(110,90%,60%,1)'
    },
    '&$checked + $track': {
      backgroundColor: 'hsla(180,100%,20%,.7)'
    }
  },
  checked:{},
  track:{}
})(Switch)





export default function Balanzas(){
  let [prendido,setprendido] = useState({'1':false, '2':false, '3':false})

  const useStyles = makeStyles({
    luzPrendida: {
      width:'15px',
      height:'15px',
      borderRadius:'50%',
      backgroundColor: 'hsla(110,90%,60%,1)',
      boxShadow: '1px 1px 12px hsla(80,100%,50%,1)'
    },
    luzApagada: {
      width:'15px',
      height:'15px',
      borderRadius:'50%',
      backgroundColor: 'hsla(360,30%,35%,1)',
      boxShadow: '1px 1.4px 3px hsla(360,100%,50%,1)'
    }
  })
  let clases = useStyles()

  let conectarBalanza = (event, id)=>{
    if(prendido[id]){
      setprendido({...prendido, [id]:false} )
    }else{
      setprendido({...prendido, [id]:true} )
    }
  }


  return(
  <div  >
    <Volver />
    <List style={{width:'400px', marginLeft:'20px'}} >
      <ListItem button>
        <ListItemIcon>
          <div className={prendido['1']?clases.luzPrendida:clases.luzApagada} ></div>
        </ListItemIcon>
        <ListItemText>Balanza</ListItemText>
        <ListItemSecondaryAction>
          <SwitchPersonalizado
            checked={prendido['1']}
            onChange={ (event)=>conectarBalanza(event,'1') }
          />
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem button>
        <ListItemIcon>
        <div className={prendido['2']?clases.luzPrendida:clases.luzApagada} ></div>
        </ListItemIcon>
        <ListItemText>Balanza</ListItemText>
        <ListItemSecondaryAction>
        <SwitchPersonalizado
            checked={prendido['2']}
            onChange={ (event)=>conectarBalanza(event,'2') }
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
        <div className={prendido['3']?clases.luzPrendida:clases.luzApagada} ></div>
        </ListItemIcon>
        <ListItemText>Balanza</ListItemText>
        <ListItemSecondaryAction>
        <SwitchPersonalizado
            checked={prendido['3']}
            onChange={ (event)=>conectarBalanza(event,'3') }
          />
        </ListItemSecondaryAction>
      </ListItem>


    </List>
  </div>
  )
}
