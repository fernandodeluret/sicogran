import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { PersonAdd, Settings } from '@material-ui/icons';


import Balanza from '../../img/balanza.svg'
import Ventas from '../../img/ventas.svg'
import Productos from '../../img/productos.svg'
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';


const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'flex',
  // },
  luzPrendida: {
    position:'absolute',
    top:'3px',
    left:'56px',
    width:'8px',
    height:'8px',
    borderRadius:'50%',
    backgroundColor: 'hsla(110,90%,60%,1)',
    boxShadow: '1px 1px 12px hsla(80,100%,50%,1)'
  },
  luzApagada: {
    position:'absolute',
    top:'3px',
    left:'56px',
    width:'8px',
    height:'8px',
    borderRadius:'50%',
    backgroundColor: 'hsla(360,30%,35%,1)',
    boxShadow: '1px 1.4px 3px hsla(360,100%,50%,1)'
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '6px'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '0px solid slategrey'
    }
  },
  balanzaSvg:{
    width:'40px',
    fill:'none',
    marginBottom:'5px',
    stroke:'#fff',
    strokeMiterlimit: 10,
    strokeWidth: '10px',
    '&:hover': {
      // stroke:'#fff',
    }
  },
  productosSvg:{
    width:'40px',
    fill:'none',
    marginBottom:'5px',
    stroke:'#ffffff30',
    strokeMiterlimit: 10,
    strokeWidth: '1px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // backgroundColor:"rgba(0,0,0,0)",
    background: 'linear-gradient(200.96deg, rgb(33, 180, 119) -29.09%, #069faa 81.77%, rgb(6, 105, 219) 129.35%)'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor:"red"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: 'linear-gradient(200.96deg, rgba(33, 180, 119,.95) -29.09%, #069faa95 31.77%, rgba(6, 105, 219,.95) 129.35%)',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: '70px',
    backgroundColor:"rgba(0,0,0,0)",
    boxShadow:'2px 2px 2px rgba(30,30,30,.2)'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));










export default function MiniDrawer(props) {
  let history = useHistory()
  const classes = useStyles();
  let {balanzasConectadas, setbalanzasConectadas} = props

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };




  return (
    <div style={{display:'flex'}}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            style={{boxShadow:'none'}}
          >
            <MenuIcon style={{fontSize:'30px', opacity:'.9'}} />
          </IconButton>
          <div style={{fontFamily: "Train One"}} className="sicogran">
            <span className="sicogran1" >Si</span>
            <span className="sicogran2" >stema de </span>
            <span className="sicogran1" > Co</span>
            <span className="sicogran2" >ntrol de</span>
            <span className="sicogran1" >Gran</span>
            <span className="sicogran2" >el</span>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon  style={{color:'white'}} />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={()=>{history.push("/balanzas")}} >
            <div className={balanzasConectadas['1']?classes.luzPrendida:classes.luzApagada} ></div>
            <ListItemIcon><Balanza className={classes.balanzaSvg} /></ListItemIcon>
            <ListItemText><Typography style={{color:'white', marginTop:'10px', marginLeft:'10px', fontFamily:'Poppins'}}>Conectar Balanzas</Typography></ListItemText>
          </ListItem>
          <ListItem button onClick={()=>{history.push("/listaproductos")}} >
          <ListItemIcon><Productos className={classes.productosSvg} /></ListItemIcon>
          <ListItemText><Typography style={{color:'white', marginTop:'10px', marginLeft:'10px', fontFamily:'Poppins'}}>Productos</Typography></ListItemText>
          </ListItem>
          <ListItem button onClick={()=>{history.push("/ventas")}} >
          <ListItemIcon><Ventas className={classes.balanzaSvg} /></ListItemIcon>
          <ListItemText><Typography style={{color:'white', marginTop:'10px', marginLeft:'10px', fontFamily:'Poppins'}}>Ventas</Typography></ListItemText>
          </ListItem>
          <ListItem button onClick={()=>{history.push("/crearempleados")}} >
            <ListItemIcon><PersonAdd style={{color:'#ffffff90', fontSize:'40px', marginTop:'5px', marginBottom:'5px', }} /></ListItemIcon>
            <ListItemText><Typography style={{color:'white', marginTop:'10px', marginLeft:'10px', fontFamily:'Poppins'}}>Agregar empleados</Typography></ListItemText>
          </ListItem>
          <ListItem button onClick={()=>{history.push("/login")}} >
            <ListItemIcon><Settings style={{color:'#ffffff90', fontSize:'40px', marginTop:'5px', marginBottom:'5px', }} /></ListItemIcon>
            <ListItemText><Typography style={{color:'white', marginTop:'10px', marginLeft:'10px', fontFamily:'Poppins'}}>Configuración</Typography></ListItemText>
          </ListItem>

        </List>
      </Drawer>
    </div>
  );
}