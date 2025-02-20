import { useEffect, useState } from "react"
import { Text,ScrollView,View, Pressable,Image,TextInput, Modal} from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import DropDownPicker from "react-native-dropdown-picker"
import { stylesTables } from "../css/styleTable";
import { Animated, Easing } from "react-native";
import { Loading } from "./loading";
import { FormularioStyles } from "../css/formularioStyles"

//URL de la api
const urlApi='http://localhost:8000/'


/*Apartado principal de los clientes */
export const Clientes = ({navigation})=>{
    const Tap= createMaterialTopTabNavigator();
    const [render,setRender]=useState(false)
    return(
        <>
            <Tap.Navigator>
                <Tap.Screen
                 name="ListaClientes"
                 options={{title:'Listado'}}>
                    {
                        (props)=>(
                            <ListaClientes {...props} renderizado={render} ></ListaClientes>
                        )
                    }
                 </Tap.Screen>

                 <Tap.Screen
                 name="NuevoCliente"
                 options={
                    {
                        title:'Nuevo'
                 }}>  

                    {
                        (props)=>(
                            <NuevoCliente {...props} setRenderizado={setRender} ></NuevoCliente>
                        )
                    }

                 </Tap.Screen>
                 <Tap.Screen
                    name="EditarCliente"
                    options={
                        {
                            title:'Editar'
                        }
                    }
                 >
                    {
                        (props)=>(
                            <EditarCliente {...props} setRenderizado={setRender}></EditarCliente>
                        )
                    }
                 </Tap.Screen>
            </Tap.Navigator>
            
        </>

    )
}

//Listado de clientes
export const ListaClientes= ({navigation,renderizado})=>{

    

    const defaultInfoCliente={
        IDCliente: null,
        IDRNC: null,
        nombreRepresentante: null,
        tipoCliente: null,
        sexo: null,
        cedula: null,
        empresa: null,
        direccion: null,
        balance: 0,
        deuda: 0,
        fechaCreacion:null,
        fechaModificacion: null,
        correo: null,
        imagen: null,
        montoTotalCompras: null,
        descripcionModificacion:null,
        telefono: null
    } 
    const[searchValue, setSearchValue]= useState(null);
    const [listaClientes,setListaclientes]= useState({});
    const [selectedID,setSelectedID]= useState(null);
    const [modalVisible,setModalVisible]=useState(false);
    const [modalCliente,setModalCliente]= useState(false);
    const [render,setRender]=useState(false);
    const [apartadoEliminarRegistro,setApartadoEliminarRegistro]=useState('flex')
    const [apartadoEnviadoExitosamente,setApartadoEliminadoExitosamente]= useState('none')
    const [apartadoEliminadoFallo,setApartadoEliminadoFallo]= useState('none')
    const [apartadoCargando, setApartadoCargando]=useState('none');
    const [infoClienteSeleccionado,setInfoClienteSeleccionado]=useState(defaultInfoCliente);
    //animacion de carga
    const animacionLoading =new Animated.Value(0)

    Animated.loop(
        Animated.timing(animacionLoading, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver:false
        })
    ).start()

        const rotacion = animacionLoading.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"], // Rotación completa
        })
    //solicitud de los datos
    const  getClientes = async ()=>
        { 
            try {
                const value =  await fetch(urlApi+'clientes',{method:"GET"}).then(x=>  (x.json()));
                return await value;
                
            } catch (error) {
                console.log('Error:'+error);
                return {};
            }

        }

    const eliminarCliente= async (IDCliente)=>{
        if(IDCliente !=undefined && IDCliente !=null)
        {
            setApartadoCargando('flex');
            setApartadoEliminadoExitosamente('none');
            setApartadoEliminadoFallo('none');
            setApartadoEliminarRegistro('none');
            
            const value= await fetch(urlApi+'clientes',
                {
                    method:'DELETE',
                    body: JSON.stringify(
                        {
                            IDCliente:IDCliente
                        }
                    ),
                    headers:{'Content-Type':'application/json'}
                }
            ).then(
                
                res=>{

                    setApartadoCargando('none')

                    if(res.ok)
                    {
                        setApartadoEliminarRegistro('none');
                        setApartadoEliminadoExitosamente('flex');
                        setTimeout(() => {
                                setApartadoEliminadoExitosamente('none');
                                setModalVisible(false);
                                setApartadoEliminarRegistro('flex');
                        }, 1500);

                        setRender(x=>!x)
                    }
                    else
                    {
                        setApartadoEliminadoExitosamente('none');
                        setApartadoEliminarRegistro('none')
                        setApartadoEliminadoFallo('flex');
                        setTimeout(() => {
                            setApartadoEliminadoFallo('none');
                            setModalVisible(false);
                            setApartadoEliminarRegistro('flex');
                        }, 3000);
                    }
                }
            ).catch(
                error=>{
                    
                    setApartadoCargando('none')
                    console.log(error)
                    setApartadoEliminadoExitosamente('none');
                    setApartadoEliminarRegistro('none');
                    setApartadoEliminadoFallo('flex');
                    setTimeout(() => {
                        setModalVisible(false)
                        setApartadoEliminarRegistro('flex');
                        setApartadoEliminadoFallo('none');
                    }, 2500);
                }
            )
        }
    }
    
    // al seleccionar un cliente si queremos visualizar su informacion es necesario tomar estos datos previamente antes de mostrarlo de eso se encarga esta funcion
    function datosClienteSeleccionado(ClienteSeleccionado)
    {
        var value= listaClientes.filter(item=> item.IDCliente== ClienteSeleccionado);
        setInfoClienteSeleccionado({...infoClienteSeleccionado,nombreRepresentante:value[0].nombreRepresentante,
            sexo:value[0].sexo,
            telefono:value[0].telefono,
            correo:value[0].correo,
            direccion:value[0].direccion,
            cedula: value[0].cedula,
            tipo:value[0].tipo,
            montoTotalCompras:value[0].montoTotalCompras,
            balance:value[0].balance,
            deuda:value[0].deuda,
            empresa:value[0].empresa
        });
        console.log([value,infoClienteSeleccionado])
    }

    
    useEffect(() => {
        (async () => {
            const clientes = await getClientes();
            console.log(clientes);  // Solo loguear los datos obtenidos
            setListaclientes(clientes);  // Usar setListaclientes para actualizar el estado
        })();
    }, [renderizado,render]);
    
    
    useEffect(()=>{

            (async()=>{
            if (searchValue !=null && searchValue!='')
            {
               setListaclientes( listaClientes.filter(item=> item.nombreRepresentante.toUpperCase().includes(searchValue.toUpperCase())))
            }
            else
            {
                setListaclientes(await getClientes())
            }
        })()

    },
  [searchValue])

  
    return (
        <>
                {
                    Object.getOwnPropertyNames(listaClientes).length > 0?
                    <View>
                        <View style={FormularioStyles.contenedorGeneral}>
                        <TextInput style={FormularioStyles.layelFondo} placeholder="nombre..." 
                        onChangeText={(e)=>{

                            setSearchValue(e)

                        }}></TextInput>
                        
                        <ScrollView style={stylesTables.contenedorTabla}>
                            <View style={stylesTables.tablaContenedortitulares}><Text style={stylesTables.tablaTitulo}>ID</Text><Text style={stylesTables.tablaTitulo}>nombre</Text></View>
                            {listaClientes.map(item=>(

                                <Pressable key={item.IDCliente}
                                    onPress={()=>{
                                    setSelectedID(item.IDCliente)
                                    }}
                                >
                                    <View style={[stylesTables.contenedorTablaLinea,{backgroundColor: selectedID==item.IDCliente? '#ccc':'white'}]} key={item.IDCliente}>
                                        <Text style={[stylesTables.styleColumna,{color: selectedID==item.IDCliente? 'white':'black',userSelect:'none'}]}>{item.IDCliente}</Text>
                                        <Text style={[stylesTables.styleColumna,{color: selectedID==item.IDCliente? 'white':'black',userSelect:'none'}]}>{item.nombreRepresentante}</Text>
                                    </View>
                                </Pressable>


                            )

                            )}
                        </ScrollView>
                        <View style={FormularioStyles.contenedorBotones}>
                            <Pressable style={[FormularioStyles.button,{backgroundColor:'green'}]}><Text style={FormularioStyles.textoBoton}
                                onPress={()=>{navigation.navigate('NuevoCliente')}}
                            >Crear</Text></Pressable>
                            <Pressable style={[FormularioStyles.button,{backgroundColor:'blue'}]}
                                onPress={()=>{
                                    (
                                        async ()=>{
                                            const AllClientes=  getClientes().then(x=>(x.filter(item=> item.IDCliente==selectedID)));
                                            navigation.navigate('EditarCliente',{infoCliente: JSON.stringify(await AllClientes)});
                                        }
                                    )()
                                }}
                            ><Text style={FormularioStyles.textoBoton}>Editar</Text></Pressable>
                            <Pressable style={[FormularioStyles.button,{backgroundColor:'red'}]}
                                onPress={()=>{
                                    if(selectedID !=null && selectedID!='')
                                    {
                                        setModalVisible(true)
                                    }
                                }}
                            ><Text style={FormularioStyles.textoBoton}>Eliminar</Text></Pressable>
                                            <Pressable style={[FormularioStyles.button,{backgroundColor:'#ccc'}]}
                                onPress={()=>{
                                    if(selectedID !=null && selectedID!='')
                                    {
                                        datosClienteSeleccionado(selectedID);
                                        setModalCliente(true)
                                    }
                                }}
                            ><Text style={FormularioStyles.textoBoton}>Info</Text></Pressable>
                        </View>
                        </View>
                        <Modal animationType="slide" visible={modalVisible} transparent={true} onRequestClose={()=>{setModalVisible(false)}}>
                            <View style={FormularioStyles.ventanaEmergente}>
                                <View style={{display:apartadoEliminarRegistro,width:wp('95%'),maxWidth:500,alignItems:'center',gap:30}}>
                                    <Text style={FormularioStyles.textoModal}>¿Estas seguro que deseas eliminar este Registro?</Text>
                                    <View style={FormularioStyles.contenedorBotones}>
                                        <Pressable style={{flex:1,backgroundColor:'gray',maxWidth:125,minWidth:125,height:35,justifyContent:'center',borderRadius:5}} 
                                            
                                            onPress={()=>{
                                                eliminarCliente(selectedID);
                                            }}
                                        
                                        ><Text style={{textAlign:'center',color:'white',fontSize:15}}>si</Text></Pressable>
                                        <Pressable style={{flex:1,backgroundColor:'gray',maxWidth:125,minWidth:125,height:35, justifyContent:'center',borderRadius:5}} onPress={()=>{setModalVisible(false)}}><Text style={{textAlign:'center', color:'white'}}>no</Text></Pressable>
                                    </View>
                                </View>
                                <View style={{ display:apartadoEnviadoExitosamente,flexDirection:'column',gap:35}}>
                                    <Text style={FormularioStyles.textoModal}>Eliminado exitosamente</Text>
                                    <Image  style={{width:70,height:70,alignSelf:'center'}} source={require('../imagenes/bin.png')}></Image>
                                </View>
                                <View style={{ display:apartadoEliminadoFallo,flexDirection:'column',gap:35}}>
                                    <Text style={FormularioStyles.textoModal}>No se pudo eliminar el registro</Text>
                                    <Image  style={{width:70,height:70,alignSelf:'center'}} source={require('../imagenes/warning.png')}></Image>
                                </View>

                                <View style={{ display:apartadoCargando,flexDirection:'column',gap:35}}>
                                    <Animated.Image
                                        style={{
                                            transform: [{ rotate: rotacion }],
                                            width: 100, // Ajustar dimensiones
                                            height: 100,
                                        }}
                                        source={require("../imagenes/loading.png")}
                                    />
                                </View>
                            </View>
                        </Modal>
                        <Modal animationType="slide" visible={modalCliente} transparent={true} onRequestClose={()=>{setModalVisible(false)}}>
                            <View style={FormularioStyles.ventanaEmergente}>
                                <View style={FormularioStyles.contenedorVentanaEmergente}>
                                    <Image style={{width:150,height:150}} source={require('../imagenes/client.png')} ></Image>
                                    <View style={{display:'flex',flexDirection:'column',gap:3}}>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>nombre:</Text> {infoClienteSeleccionado.nombreRepresentante || 'ninguno'}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>sexo</Text> {infoClienteSeleccionado.sexo || 'ninguno'}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>telefono:</Text>  {infoClienteSeleccionado.telefono || 'ninguno'}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>correo:</Text>  {infoClienteSeleccionado.correo || 'ninguno'}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>direccion:</Text>  {infoClienteSeleccionado.direccion || 'ninguno'}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>cedula:</Text>  {infoClienteSeleccionado.cedula || 'ninguno'}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>tipo:</Text> {infoClienteSeleccionado.tipoCliente || 'ninguno'}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}> <Text style={FormularioStyles.textoBold}>total en compras:</Text> {infoClienteSeleccionado.montoTotalCompras || 0}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>balance:</Text>  {infoClienteSeleccionado.balance || 0}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>deudas:</Text> {infoClienteSeleccionado.deuda || 0}</Text>
                                        <Text style={FormularioStyles.textoInfoModal}><Text style={FormularioStyles.textoBold}>empresa</Text> {infoClienteSeleccionado.empresa || 'ninguno'}</Text>
                                    </View>
                                </View>
                                <Pressable
                                    onPress={()=>{
                                        setInfoClienteSeleccionado(defaultInfoCliente);
                                        setModalCliente(false)
                                    }}
                                style={[FormularioStyles.button,{backgroundColor:'#ccc'}]}>
                                        <Text style={FormularioStyles.textoBoton}>
                                            Listo
                                        </Text>
                                </Pressable>
                            </View>
                        </Modal>
                    </View>:
                    <View><Loading funcionCliente={getClientes} setListaClientes={setListaclientes}/></View>
                    
                }

        </>
    )
}

/*Formulario de Nuevos Clientes*/
export const NuevoCliente= ({navigation,setRenderizado})=>{
    //detonante del renderizado del componente listaClientes
    //genero
    const [item,setItem]= useState([{label:'masculino',value:'m'},{label:'femenino',value:'f'},{label:'prefiero no responder',value:null}])
    const [open, setOpen]= useState(false);
    const [genero, setGenero]= useState(null);
    //visibilidad de los textoError
    const [errorNombre,setErrorNombre]=useState(true);
    const [errorGenero,setErrorGenero]=useState(true);
    const [errorDireccion,setErrorDireccion]=useState(true);
    const [errorTelefono,setErrorTelefono]=useState(true);
    const [errorCorreo,setErrorCorreo]=useState(true);
    const [enviarDatos,setEnviarDatos]=useState('Guardar Datos');
    const [colorBotonEnviar,setColorBotonEnviar]=useState('green');

    //estructura de cliente
    const newCliente= {
        nombre:'',
        direccion:'',
        telefono:'',
        correo:'',
        RNC:'',
        empresa:'',
        sexo:'',

    };
    //useState para asignar valores a cliente
    const [cliente,setCliente]=useState(
        newCliente
    )

    useEffect(()=>{
        if(cliente[0]!= undefined)
        {
            cliente.sexo= genero;
            
        }
    },[genero])


    //funcion para enviar datos
    async function enviarDatosCliente(objCliente) {
        setColorBotonEnviar('green');
        setEnviarDatos('espere...');
        try {
            console.log(objCliente);
            //console.log('objCliente es:',objCliente)
            const datos= await fetch(urlApi+'clientes',{
                headers:{'Content-Type':'application/json'},
                method:'POST',
                body: JSON.stringify({
                    nombre:objCliente.nombre,
                    tipoCliente:"basico",
                    sexo: objCliente.sexo,
                    telefono: objCliente.telefono,
                    cedula: null,
                    empresa: objCliente.empresa,
                    direccion:objCliente.direccion,
                    balance:0,
                    deuda:0,
                    correo: objCliente.correo,
                    imagen: null,
                    descripcionModificacion:'Practicando fetch'
                })
            }).then(res=>{
                if (res.ok)
                {
                    setEnviarDatos('Enviado');
                    setCliente(newCliente);
                    setTimeout(() => {
                        navigation.navigate('ListaClientes')
                        setRenderizado(x=>!x)
                        setEnviarDatos('Guardar Datos');
                    }, 1500);
                }
                else
                {
                    setColorBotonEnviar('red')
                    setEnviarDatos('Intentelo nuevamente')
                }
            })
        } catch (error) {
            setColorBotonEnviar('red')
            console.log({error:error})
            setEnviarDatos('reintentar')
        }
    }

    return(
        <>
            <ScrollView>
                <View style={FormularioStyles.container}>
                    <View style={FormularioStyles.form}>
                        <Text style={FormularioStyles.title}>Crear Nuevo Cliente</Text>
                        <View style={FormularioStyles.inputContainer}>
                            <TextInput  style={FormularioStyles.input} placeholder="nombre" autoComplete="off"
                                value={cliente.nombre}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,nombre:e.target.value});
                                        if (errorNombre==false)
                                        {
                                            setErrorNombre(true)
                                        }
                                    }
                                }
                            ></TextInput>
                            <Text style={[FormularioStyles.textoError,{display:errorNombre==true?'none':'flex'}]}>Debes completar tu nombre</Text>
                            {/*Usar un selectDropDown para el sexo desinstalar 
                            el paquete que tengo para eso
                            actualmente, no funciona correctamente */}
                            <DropDownPicker
                                open={open}
                                value={genero}
                                items={item}
                                setOpen={setOpen}
                                setValue={setGenero}
                                setItems={setItem}
                                placeholder="genero"
                                style={FormularioStyles.dropDownPickerStyle}
                                containerStyle={FormularioStyles.dropDownPickerContainerStyle}
                                dropDownContainerStyle={FormularioStyles.dropDownContainerStyle}

                                onChangeValue={()=>{cliente.sexo=genero}}
                            >
                            </DropDownPicker>
                            <Text style={[FormularioStyles.textoError,{display:errorGenero==true?'none':'flex'}]}>ingresa tu genero</Text>
                            <TextInput style={FormularioStyles.input} placeholder="direccion" autoComplete="off"
                                value={cliente.direccion}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,direccion:e.target.value})
                                        if (errorDireccion==false)
                                        {
                                            setErrorDireccion(true)
                                        }
                                    }
                                }
                            ></TextInput>
                            <Text style={[FormularioStyles.textoError,{display:errorDireccion==true?'none':'flex'}]}>Debes ingresar  tu direccion</Text>
                            <TextInput style={FormularioStyles.input} keyboardType="numeric" placeholder="telefono"
                                value={cliente.telefono}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,telefono:e.target.value})
                                        if (errorTelefono==false)
                                        {
                                            setErrorTelefono(true)
                                        }
                                    }
                                }
                            ></TextInput>
                            <Text style={[FormularioStyles.textoError,{display:errorTelefono==true?'none':'flex'}]}>Debes ingresar tu telefono</Text>
                            <TextInput style={FormularioStyles.input} placeholder="correo"
                                value={cliente.correo}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,correo:e.target.value});
                                        if (errorCorreo==false)
                                        {
                                            setErrorCorreo(true)
                                        }
                                    }
                                }
                            ></TextInput>
                            <Text style={[FormularioStyles.textoError,{display:errorCorreo==true?'none':'flex'}]}>Debes ingresar tu correo</Text>
                            <TextInput style={FormularioStyles.input} keyboardType="numeric" placeholder="RNC (opcional)"
                                
                                value={cliente.RNC}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,RNC:e.target.value})


                                    }
                                }
                            ></TextInput> 
                            
                            <TextInput style={FormularioStyles.input} placeholder="empresa (opcional)"
                                value={cliente.empresa}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,empresa:e.target.value})
                                    }
                                }
                            ></TextInput> 

                        
                        
                        </View>
                        <Pressable 
                            onPress={()=>{
                                if ((cliente.nombre!="" &&  cliente.nombre !="")&&(cliente.direccion!=null && cliente.direccion!="")&&(cliente.telefono!="" && cliente.telefono!=null) &&(cliente.correo!="" && cliente.correo !=""))
                                {
                                    setColorBotonEnviar('green')
                                    enviarDatosCliente(cliente)
                                }
                                else
                                {

                                    
                                    if (cliente.nombre==null || cliente.nombre=='')
                                    {

                                        setErrorNombre(false)
                                    }
                                    if (cliente.direccion==null || cliente.direccion=='')
                                    {
                                        setErrorDireccion(false)
                                    }
                                    if (cliente.telefono==null || cliente.telefono=='')
                                    {
                                        setErrorTelefono(false)
                                    }
                                    if (cliente.correo==null || cliente.correo=='')
                                    {
                                        setErrorCorreo(false)
                                    }
                                }
                            }}
                        
                        style={[FormularioStyles.botonCliente,{backgroundColor:colorBotonEnviar}]}>
                            
                        <Text style={FormularioStyles.textoBoton}>{enviarDatos}</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export const EditarCliente=({navigation,setRenderizado,route})=>{
 
           //estructura de cliente
        const newCliente= {
            IDCliente:'',
            nombre:'',
            direccion:'',
            telefono:'',
            correo:'',
            RNC:'',
            empresa:'',
            sexo:''
        };

    const [parametros, setParametros]= useState(route.params);

    //useState para asignar valores a cliente
    const [cliente,setCliente]=useState(
         newCliente
    )
     //detonante del renderizado del componente listaClientes
    useEffect(()=>{
        setParametros(route.params)

    },[route])







    const [item,setItem]= useState([{label:'masculino',value:'m'},{label:'femenino',value:'f'},{label:'prefiero no responder',value:null}])
    const [open, setOpen]= useState(false);
    const [genero, setGenero]= useState(null);




    //visibilidad de los textoError
    const [errorNombre,setErrorNombre]=useState(true)
    const [errorGenero,setErrorGenero]=useState(true)
    const [errorDireccion,setErrorDireccion]=useState(true)
    const [errorTelefono,setErrorTelefono]=useState(true)
    const [errorCorreo,setErrorCorreo]=useState(true)
    const [enviarDatos,setEnviarDatos]=useState('Guardar Datos')
    const [colorBotonEnviar,setColorBotonEnviar]=useState('blue')



    
    useEffect(()=>{
        if(parametros != undefined && parametros != null)
        {
                var value=JSON.parse(parametros.infoCliente);
                (async()=>{
                    setCliente({...cliente,nombre: value[0].nombreRepresentante,direccion:value[0].direccion,telefono:value[0].telefono,correo:value[0].correo,IDCliente:value[0].IDCliente,sexo:value[0].sexo})              
                
                    setGenero(value[0].sexo);
                
                }
            )()
        }
    },[parametros])

    //funcion para enviar datos
    async function enviarDatosCliente(objCliente) {
        setColorBotonEnviar('green')
        setEnviarDatos('espere...')
        try {
            //console.log('objCliente es:',objCliente)
            const datos= await fetch(urlApi+'clientes',{
                headers:{'Content-Type':'application/json'},
                method:'PUT',
                body: JSON.stringify({
                    nombre:objCliente.nombre,
                    tipoCliente:"basico",
                    IDCliente:objCliente.IDCliente,
                    sexo: objCliente.sexo,
                    cedula: null,
                    telefono:objCliente.telefono,
                    empresa: objCliente.empresa,
                    direccion:objCliente.direccion,
                    balance:0,
                    deuda:0,
                    correo: objCliente.correo,
                    imagen: null,
                    descripcionModificacion:'Practicando fetch'
                })
            }).then(res=>{
                if (res.ok)
                {
                    setEnviarDatos('Modificado');
                    setCliente(newCliente);
                    setTimeout(() => {
                        navigation.navigate('ListaClientes')
                        setRenderizado(x=>!x)
                        setEnviarDatos('Guardar Datos');
                    }, 1500);
                }
                else
                {
                    setColorBotonEnviar('red')
                    setEnviarDatos('Intentelo nuevamente')
                }
            })
        } catch (error) {
            setColorBotonEnviar('red')
            console.log({error:error})
            setEnviarDatos('reintentar')
        }
    }

    return(
        <>
            <ScrollView>

                <View style={FormularioStyles.container}>
                    <View style={FormularioStyles.form}>
                        <Text style={FormularioStyles.title}>Modificar Cliente</Text>
                        <View style={FormularioStyles.inputContainer}>
                            <TextInput  style={FormularioStyles.input} placeholder="nombre" autoComplete="off"
                                value={cliente.nombre}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,nombre:e.target.value});
                                        if (errorNombre==false)
                                        {
                                            setErrorNombre(true)
                                        }
                                    }
                                }
                            ></TextInput>
                            <Text style={[FormularioStyles.textoError,{display:errorNombre==true?'none':'flex'}]}>Debes completar tu nombre</Text>
                            {/*Usar un selectDropDown para el sexo desinstalar 
                            el paquete que tengo para eso
                            actualmente, no funciona correctamente */}
                            <DropDownPicker
                                open={open}
                                value={genero}
                                items={item}
                                setOpen={setOpen}
                                setValue={setGenero}
                                setItems={setItem}
                                placeholder="genero"
                                style={FormularioStyles.dropDownPickerStyle}
                                containerStyle={FormularioStyles.dropDownPickerContainerStyle}
                                dropDownContainerStyle={FormularioStyles.dropDownContainerStyle}

                                onChangeValue={()=>{cliente.sexo=genero}}
                            >
                            </DropDownPicker>
                            <Text style={[FormularioStyles.textoError,{display:errorGenero==true?'none':'flex'}]}>ingresa tu genero</Text>
                            <TextInput style={FormularioStyles.input} placeholder="direccion" autoComplete="off"
                                value={cliente.direccion}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,direccion:e.target.value})
                                        if (errorDireccion==false)
                                        {
                                            setErrorDireccion(true)
                                        }
                                    }
                                }
                            ></TextInput>
                            <Text style={[FormularioStyles.textoError,{display:errorDireccion==true?'none':'flex'}]}>Debes ingresar  tu direccion</Text>
                            <TextInput style={FormularioStyles.input} keyboardType="numeric" placeholder="telefono"
                                value={cliente.telefono}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,telefono:e.target.value})
                                        if (errorTelefono==false)
                                        {
                                            setErrorTelefono(true)
                                        }
                                    }
                                }
                            ></TextInput>
                            <Text style={[FormularioStyles.textoError,{display:errorCorreo==true?'none':'flex'}]}>Debes ingresar tu telefono</Text>
                            <TextInput style={FormularioStyles.input} placeholder="correo"
                                value={cliente.correo}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,correo:e.target.value});
                                        if (errorCorreo==false)
                                        {
                                            setErrorCorreo(true)
                                        }
                                    }
                                }
                            ></TextInput>
                            <Text style={[FormularioStyles.textoError,{display:'none'}]}>Debes ingresar tu correo</Text>
                            <TextInput style={FormularioStyles.input} keyboardType="numeric" placeholder="RNC (opcional)"
                                
                                value={cliente.RNC}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,RNC:e.target.value})


                                    }
                                }
                            ></TextInput> 
                            
                            <TextInput style={FormularioStyles.input} placeholder="empresa (opcional)"
                                value={cliente.empresa}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,empresa:e.target.value})
                                    }
                                }
                            ></TextInput> 

                        
                        
                        </View>
                        <Pressable 
                            onPress={()=>{
                                if ((cliente.nombre!="" &&  cliente.nombre !="")&&(cliente.direccion!=null && cliente.direccion!="")&&(cliente.telefono!="" && cliente.telefono!=null) &&(cliente.correo!="" && cliente.correo !=""))
                                {
                                    setColorBotonEnviar('green')
                                    enviarDatosCliente(cliente)
                                }
                                else
                                {

                                    
                                    if (cliente.nombre==null || cliente.nombre=='')
                                    {

                                        setErrorNombre(false)
                                    }
                                    if (cliente.direccion==null || cliente.direccion=='')
                                    {
                                        setErrorDireccion(false)
                                    }
                                    if (cliente.telefono==null || cliente.telefono=='')
                                    {
                                        setErrorTelefono(false)
                                    }
                                    if (cliente.correo==null || cliente.correo=='')
                                    {
                                        setErrorCorreo(false)
                                    }
                                }
                            }}
                        
                        style={[FormularioStyles.botonCliente,{backgroundColor:colorBotonEnviar}]}>
                            
                        <Text style={[FormularioStyles.textoBoton]}>{enviarDatos}</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </>
    )
 
}




/*estilos*/
