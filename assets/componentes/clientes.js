import { useEffect, useState } from "react"
import { Text,ScrollView,View,StyleSheet, Pressable,Image,TextInput, Modal} from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import DropDownPicker from "react-native-dropdown-picker"
import { stylesTables } from "../css/styleTable";
import { Animated, Easing } from "react-native";

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
                    component={EditarCliente}
                    options={
                        {
                            title:'Editar'
                        }
                    }
                 >
                 </Tap.Screen>
            </Tap.Navigator>
            
        </>

    )
}

//Listado de clientes
export const ListaClientes= ({navigation,renderizado})=>{

    
      

    const[searchValue, setSearchValue]= useState(null);
    const [listaClientes,setListaclientes]= useState([{}]);
    const [selectedID,setSelectedID]= useState(null);
    const [modalVisible,setModalVisible]=useState(false);
    const [render,setRender]=useState(false);
    const [apartadoEliminarRegistro,setApartadoEliminarRegistro]=useState('flex')
    const [apartadoEnviadoExitosamente,setApartadoEliminadoExitosamente]= useState('none')
    const [apartadoEliminadoFallo,setApartadoEliminadoFallo]= useState('none')
    const [apartadoCargando, setApartadoCargando]=useState('none')
    //animacion de carga
    const animacionLoading =new Animated.Value(0)

    Animated.loop(
        Animated.timing(animacionLoading, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
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
                return [{}];
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



    
    useEffect(() => {
        (async () => {
            const clientes = await getClientes();
            console.log(clientes);  // Solo loguear los datos obtenidos
            setListaclientes(clientes);  // Usar setListaclientes para actualizar el estado
        })();
    }, [renderizado,render]);
    
    
    useEffect(()=>{
            async()=>{
            if (searchValue !=null && searchValue!='')
            {
               setListaclientes( listaClientes.filter(item=> item.nombreRepresentante.toUpperCase().includes(searchValue.toUpperCase())))
            }
            else
            {
                setListaclientes(await getClientes())
            }
        }

    },
  [searchValue])

  
    return (
        <>
                <View style={{width:wp('100%'),display:'flex',alignItems:'center'}}>
                <TextInput style={{marginLeft:wp('5%'),backgroundColor:'white',paddingLeft:20,borderWidth:0,fontSize:18, borderColor:'black',width:wp('90%'),maxWidth:450,height:40,alignSelf:'center',marginTop:20,marginBottom:10}} placeholder="nombre..." onChangeText={(e)=>{

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
                <View style={{display:'flex',flexDirection:'row',gap:10,marginTop:20}}>
                    <Pressable style={[styles.button,{backgroundColor:'green'}]}><Text style={styles.textoBoton}
                        onPress={()=>{navigation.navigate('NuevoCliente')}}
                    >Crear</Text></Pressable>
                    <Pressable style={[styles.button,{backgroundColor:'blue'}]}
                        onPress={()=>{
                            navigation.navigate('EditarCliente')
                        }}
                    ><Text style={styles.textoBoton}>Editar</Text></Pressable>
                    <Pressable style={[styles.button,{backgroundColor:'red'}]}
                        onPress={()=>{
                            if(selectedID !=null && selectedID!='')
                            {
                                setModalVisible(true)
                            }
                        }}
                    ><Text style={styles.textoBoton}>Eliminar</Text></Pressable>
                </View>
                </View>
                <Modal animationType="slide" visible={modalVisible} transparent={true} onRequestClose={()=>{setModalVisible(false)}}>
                    <View style={{width:wp('95%'),maxWidth:500,height:hp('45%'),backgroundColor:'white',alignSelf:'center',marginTop:hp('21%'),borderWidth:1,borderColor:'#ccc',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:40,gap:20}}>
                        <View style={{display:apartadoEliminarRegistro,width:wp('95%'),maxWidth:500,alignItems:'center',gap:30}}>
                            <Text style={styles.textoModal}>¿Estas seguro que deseas eliminar este Registro?</Text>
                            <View style={{flexDirection:'row',gap:50}}>
                                <Pressable style={{flex:1,backgroundColor:'gray',maxWidth:125,minWidth:125,height:35,justifyContent:'center',borderRadius:5}} 
                                    
                                    onPress={()=>{
                                        eliminarCliente(selectedID);
                                    }}
                                
                                ><Text style={{textAlign:'center',color:'white',fontSize:15}}>si</Text></Pressable>
                                <Pressable style={{flex:1,backgroundColor:'gray',maxWidth:125,minWidth:125,height:35, justifyContent:'center',borderRadius:5}} onPress={()=>{setModalVisible(false)}}><Text style={{textAlign:'center', color:'white'}}>no</Text></Pressable>
                            </View>
                        </View>
                        <View style={{ display:apartadoEnviadoExitosamente,flexDirection:'column',gap:35}}>
                            <Text style={styles.textoModal}>Eliminado exitosamente</Text>
                            <Image  style={{width:70,height:70,alignSelf:'center'}} source={require('../imagenes/checked.png')}></Image>
                        </View>
                        <View style={{ display:apartadoEliminadoFallo,flexDirection:'column',gap:35}}>
                            <Text style={styles.textoModal}>No se pudo eliminar el registro</Text>
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
    const [errorNombre,setErrorNombre]=useState(true)
    const [errorGenero,setErrorGenero]=useState(true)
    const [errorDireccion,setErrorDireccion]=useState(true)
    const [errorTelefono,setErrorTelefono]=useState(true)
    const [errorCorreo,setErrorCorreo]=useState(true)
    const [enviarDatos,setEnviarDatos]=useState('Guardar Datos')
    const [colorBotonEnviar,setColorBotonEnviar]=useState('green')

    //estructura de cliente
    const newCliente= {
        nombre:'',
        direccion:'',
        telefono:'',
        correo:'',
        RNC:'',
        genero:'',
        empresa:''
    };
    //useState para asignar valores a cliente
    const [cliente,setCliente]=useState(
        newCliente
    )

    //funcion para enviar datos
    async function enviarDatosCliente(objCliente) {
        setColorBotonEnviar('green')
        setEnviarDatos('espere...')
        try {
            //console.log('objCliente es:',objCliente)
            const datos= await fetch(urlApi+'clientes',{
                headers:{'Content-Type':'application/json'},
                method:'POST',
                body: JSON.stringify({
                    nombre:objCliente.nombre,
                    tipoCliente:"basico",
                    sexo: objCliente.sexo,
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
                    }, 2000);
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
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.title}>Crear Nuevo Cliente</Text>
                        <View style={{display:'flex',justifyContent:'center',alignItems:'center',gap:10}}>
                            <TextInput  style={styles.input} placeholder="nombre" autoComplete="off"
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
                            <Text style={[styles.textoError,{display:errorNombre==true?'none':'flex'}]}>Debes completar tu nombre</Text>
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
                                style={{backgroundColor:'white', width:300}}
                                containerStyle={{display:'flex',alignItems:'center'}}
                                dropDownContainerStyle={{width:300}}

                                onChangeValue={()=>{cliente.genero=genero}}
                            >
                            </DropDownPicker>
                            <Text style={[styles.textoError,{display:errorGenero==true?'none':'flex'}]}>ingresa tu genero</Text>
                            <TextInput style={styles.input} placeholder="direccion" autoComplete="off"
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
                            <Text style={[styles.textoError,{display:errorDireccion==true?'none':'flex'}]}>Debes ingresar  tu direccion</Text>
                            <TextInput style={styles.input} keyboardType="numeric" placeholder="telefono"
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
                            <Text style={[styles.textoError,{display:errorTelefono==true?'none':'flex'}]}>Debes ingresar tu telefono</Text>
                            <TextInput style={styles.input} placeholder="correo"
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
                            <Text style={[styles.textoError,{display:errorCorreo==true?'none':'flex'}]}>Debes ingresar tu correo</Text>
                            <TextInput style={styles.input} keyboardType="numeric" placeholder="RNC (opcional)"
                                
                                value={cliente.RNC}
                                onChange={
                                    (e)=>{
                                        setCliente({...cliente,RNC:e.target.value})


                                    }
                                }
                            ></TextInput> 
                            
                            <TextInput style={styles.input} placeholder="empresa (opcional)"
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
                        
                        style={[styles.botonCliente,{backgroundColor:colorBotonEnviar}]}>
                            
                        <Text style={styles.textoBoton}>{enviarDatos}</Text></Pressable>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export const EditarCliente=({navigation})=>{
    
    const [item,setItem]= useState([{label:'masculino',value:'masculino'},{label:'femenino',value:'femenino'},{label:'prefiero no responder',value:null}])
    const [open, setOpen]= useState(false);
    const [value, setValue]= useState(null);


    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Modificar Cliente</Text>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',gap:10}}>
                    <TextInput  style={styles.input} placeholder="nombre"
                        
                    ></TextInput>
                    {/*Usar un selectDropDown para el sexo desinstalar 
                    el paquete que tengo para eso
                     actualmente, no funciona correctamente */}
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={item}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItem}
                        placeholder="genero"
                        style={{backgroundColor:'white', width:300}}
                        dropDownContainerStyle={{width:300}}


                    >
                    </DropDownPicker>
                    <TextInput style={styles.input} placeholder="direccion"></TextInput>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="telefono"></TextInput>
                    <TextInput style={styles.input} placeholder="correo"></TextInput>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="RNC"></TextInput> 
                    <TextInput style={styles.input} placeholder="empresa"></TextInput> 
                   
                
                </View>
                <Pressable style={[styles.botonCliente,{backgroundColor:'green'}]}><Text style={styles.textoBoton}
                    onPress={()=>{
                        navigation.navigate('ListaClientes')
                    }}
                >Guardar Datos</Text></Pressable>
            </View>
       </>
    )
}




/*estilos*/
const styles = StyleSheet.create({

    form:{
        backgroundColor:'white',
        width:wp('70%'),
        minWidth:340,
        display:'flex',
        alignItems:'center',
        gap:10,
        paddingTop:30,
        paddingBottom:30,
        borderRadius:40,
        marginBottom:40
    },
    textoError:{
        color:'red'
    },
    button:{
        flex:1,
        height:40,
        width:150,
        display:'flex',
        justifyContent:'center',
        borderRadius:15
    },
    container:{
        width:wp('100%'),
        height:'auto',
        backgroundColor:'whiteSmoke',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:50
        ,
        gap:20
    },
    botonCliente:
    {
        width:200,
        height:40,
        borderRadius:20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    textoBoton:{

        textAlign:'center',
        fontSize:17,
        fontWeight:700,
        color:'white',
        userSelect:'none'
    },
    title:{
    
        textAlign:'center',
        fontSize:20,
        fontWeight:790
    },
    input:{
        width:300,
        borderRadius:10,
        height:40,
        paddingLeft:10,
        borderWidth:1,
        borderColor:'gray',
        backgroundColor:'white'
    },
    textoModal:{
        textAlign:'center',
        fontSize:22}
})