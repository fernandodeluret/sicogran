import Datastore from "nedb-promises"


let tiempoPing


let guardarVentaEnBD = async (productos) =>{
  if(productos.length == 0){
    console.log('No hay productos en la venta')
    return
  }
  let productosdb = await Datastore.create('database/productos.db').find({})
  let ventasDB = Datastore.create({filename:'database/ventas.db', timestampData:true})
// ACA LO QUE HABRIA QUE HACER PARA QUE QUEDARA BIEN ES POR FUERA DE ESTA FUNCION(asi no se hace en cada envio de venta) TENER PASADOS A OBJETO JS LOS PRODUCTOS DE LA BD INDEXADOS POR CODIGO, ASI SOLO HAGO UN FOR DE LOS PROD DE LA VENTA
  // console.log(productosdb);
  let nuevaVenta = {productos:[], total:0}
  for(let productodb of productosdb){
    for(let producto of productos){  //@ts-ignore
      if(productodb.codigo == producto.codigo){ //@ts-ignore
        let subtotal = Math.round(parseFloat(productodb.precio) * producto.peso/1000)  //@ts-ignore
        let nuevoProductoEnVta = {nombre:productodb.nombre, codigo: producto.codigo, precio: productodb.precio, peso: producto.peso/1000, subtotal: subtotal}
        nuevaVenta.productos.push(nuevoProductoEnVta)
        nuevaVenta.total += subtotal
      }
    }
  }
  // console.log(nuevaVenta)
  await ventasDB.insert(nuevaVenta)
  // console.log(await ventasDB.find({}))
}


let cerrarConexionWS = (id, conexionWS, balanzasConectadas, setbalanzasConectadas)=>{
  if(conexionWS){//@ts-ignore
    conexionWS.close()
  }
  setbalanzasConectadas({...balanzasConectadas, [id]:false} )
  clearTimeout(tiempoPing)
}


let funcionPing = (id, conexionWS, setabrirAlerta, balanzasConectadas, setbalanzasConectadas )=>{
  clearTimeout(tiempoPing)
  tiempoPing = setTimeout(()=>{//@ts-ignore
    cerrarConexionWS(id, conexionWS, balanzasConectadas, setbalanzasConectadas)
    setabrirAlerta({abierta: true, tipo:'error', msj: 'Se ha perdido la conexión con una balanza'})
  },7000)
}


let conectarBalanza = (id, balanzasConectadas, setbalanzasConectadas, conexionWS, setconexionWS, setabrirAlerta, IP )=>{
  if(balanzasConectadas[id]){  
    cerrarConexionWS(id, conexionWS, balanzasConectadas, setbalanzasConectadas)
  }else{
    // INICIAR CONEXION WS
    let connection = new WebSocket(`ws://${IP}/ws`, ['arduino']);  //@ts-ignore
    setconexionWS(connection)

    connection.onopen = async function () {
      setbalanzasConectadas({...balanzasConectadas, [id]:true} )
      // ENVIO LOS DATOS DE LOS PRODUCTOS A LA BALANZA
      let productosdb = Datastore.create('database/productos.db')
      let data = await productosdb.find({})
      let dataProcesada = {productos:[]}
      let i = 0
      function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
      for(let producto of data){
        i++
        let productoProcesado = {}
        productoProcesado['n'] = producto['nombre']
        productoProcesado['p'] = producto['precio']
        productoProcesado['c'] = producto['codigo']
        dataProcesada.productos.push(productoProcesado)
        if(i>10){
          i=0
          connection.send(JSON.stringify(dataProcesada));
          dataProcesada = {productos:[]}
          sleep(100)
        }
      }
      i=0
      connection.send(JSON.stringify(dataProcesada));
      dataProcesada = {productos:[]}     
    };


    connection.onerror = function (error) {
      setabrirAlerta({abierta: true, tipo:'error', msj: 'Ha ocurrido un error al intentar conectar la balanza'})
    };


    connection.onmessage = function (e) {
      let msj = JSON.parse(e.data)
      if(msj.tipo == 'venta'){
        guardarVentaEnBD(msj.productos)
      }else if(msj.tipo == 'ping'){
        funcionPing(id, conexionWS, setabrirAlerta, balanzasConectadas, setbalanzasConectadas)
      }       
    };


    connection.onclose = ()=>{
      // console.log('conexion cerrada')
    }
  }
}

export default conectarBalanza