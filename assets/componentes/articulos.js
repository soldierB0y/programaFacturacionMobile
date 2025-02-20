
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {Pressable, ScrollView, Text, TextInput,View,Image} from 'react-native';

import { FormularioStyles } from "../css/formularioStyles";
import { stylesTables } from "../css/styleTable";
import { use, useEffect, useState } from "react";
import CheckBox from 'react-native-bouncy-checkbox';
import  {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import { Loading } from "./loading";
import { Buffer } from "buffer";

const DefaultInfoArticulo= {
    IDArticuloMarca:-1,
    IDProovedor:-1,
    codigo:'',
    nombreArticulo:'',
    descripcion:'',
    imagen:'',
    precioVenta:'',
    precioCompra:'',
    estado:true,
    inventario:0,
    //los valores iniciales siempre deben ser falsos para estos dos booleanos porque son check que comienzan estando sin marcar
    facturarSinInventario:false,
    precioModificable:false

};

function base64ToImage(imagen)
{


    

    return {uri:`data:image/jpeg;base64,${imagen.assets[0].base64}`};
}




const Url= 'http://localhost:8000/articulos';

export const Articulos= ({navigation})=>{
    
    const Tap= createMaterialTopTabNavigator();

    return(
        <>
            <Tap.Navigator>
                <Tap.Screen name="ListaArticulos" component={ListaArticulos} options={{title:'Listado'}}></Tap.Screen>
                <Tap.Screen name="AgregarArticulos" component={AgregarArticulos} options={{title:'Nuevo'}}></Tap.Screen>
                <Tap.Screen name="ModificarArticulos" component={ModificarArticulo} options={{title:'Modificar'}}></Tap.Screen>
            </Tap.Navigator>
        </>
    )
}


const ListaArticulos= ({navigation})=>{

    //navigation.navigate('AgregarArticulos');

    const [selectedID, setSelectedID]= useState(-1);

    const listaArticulos= async ()=>{
        try {
            const respuesta= await fetch(Url);
            const datos= await respuesta.json();
            return datos;
        } catch (error) {
            console.log(error);
            return {};
        }
    }



    const [articulos, setArticulos]= useState({});

    useEffect(()=>{
        listaArticulos().then((datos)=>{
            setArticulos(datos);
            console.log(datos);
        });
    },[]);


    return(
        <>

            {Object.getOwnPropertyNames(articulos).length >0?
            <View>
                <View style={FormularioStyles.contenedorGeneral}>
                    <TextInput style={FormularioStyles.layelFondo} placeholder="nombre..." ></TextInput>
                    <ScrollView style={stylesTables.contenedorTabla}>
                        <View style={stylesTables.tablaContenedortitulares}>
                            <Text style={stylesTables.tablaTitulo}>ID</Text>                            
                            <Text style={stylesTables.tablaTitulo}>Nombre</Text>
                        </View>
                        {articulos.map((item)=>(
                                <Pressable key={item.IDArticulo}
                                    onPress={()=>{
                                    setSelectedID(item.IDArticulo)
                                    }}
                                >
                                    <View style={[stylesTables.contenedorTablaLinea,{backgroundColor: selectedID==item.IDArticulo? '#ccc':'white'}]} key={item.IDCliente}>
                                        <Text style={[stylesTables.styleColumna,{color: selectedID==item.IDArticulo? 'white':'black',userSelect:'none'}]}>{item.IDArticulo}</Text>
                                        <Text style={[stylesTables.styleColumna,{color: selectedID==item.IDArticulo? 'white':'black',userSelect:'none'}]}>{item.nombreArticulo}</Text>
                                    </View>
                                </Pressable>
                        ))}
                    </ScrollView>
                        <View style={FormularioStyles.contenedorBotones}>
                            <Pressable style={[FormularioStyles.button,{backgroundColor:'green'}]}><Text style={FormularioStyles.textoBoton}
                                onPress={()=>{
                                    

                                        navigation.navigate('AgregarArticulos');

                                
                                
                                }}
                            >Crear</Text></Pressable>




                            <Pressable style={[FormularioStyles.button,{backgroundColor:'blue'}]}
                                onPress={()=>{
                                    (
                                        async ()=>{
                                            const AllClientes=  listaArticulos().then(x=>(x.filter(item=> item.IDArticulo==selectedID)));
                                            navigation.navigate('ModificarArticulos',{infoCliente: JSON.stringify(await AllClientes)});
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
            </View>:<Loading></Loading>}

        </>
    )

}


const AgregarArticulos= ()=>{

    const [Articulos, setArticulos]= useState({});
    const [enviarDatos,setEnviarDatos]= useState('Guardar Datos');
    const imageDefault= require('../imagenes/productDefault.png');
    const [imagen, setImagen]= useState(imageDefault);
    const [botonColor,setbotonColor]= useState('green');


    useEffect(()=>{
        setArticulos(DefaultInfoArticulo);
    },[]);

    
    useEffect(
        ()=>{
            Articulos.imagen= imagen;
        },[imagen]
    )

    return(
        <>
            <ScrollView>
                <View style={FormularioStyles.container}>
                    <View style={FormularioStyles.form}>
                        <Text style={FormularioStyles.title}>Crear Nuevo Articulo</Text>
                        <View   style={FormularioStyles.inputContainer}>
                            <TextInput style={FormularioStyles.input} placeholder="Nombre"
                                value={Articulos.nombreArticulo}
                                onChange={(e)=>{setArticulos({...Articulos,nombreArticulo:e.target.value})}}
                            ></TextInput>
                            <TextInput style={FormularioStyles.input} placeholder="Descripcion"
                                value={Articulos.descripcion}
                                onChange={(e)=>{setArticulos({...Articulos,descripcion:e.target.value})}}>
                            </TextInput>
                            <TextInput style={FormularioStyles.input} placeholder="codigo"
                                value={Articulos.codigo}
                                onChange={(e)=>{setArticulos({...Articulos,codigo:e.target.value})}}>
                            </TextInput>
                            <TextInput style={FormularioStyles.input} placeholder="precio compra"
                                value={Articulos.precioCompra}
                                onChange={(e)=>{setArticulos({...Articulos,precioCompra:e.target.value})}}>
                            </TextInput>
                            <TextInput style={FormularioStyles.input} placeholder="precio Venta"
                                value={Articulos.precioVenta}
                                onChange={(e)=>{setArticulos({...Articulos,precioVenta:e.target.value})}}>
                            </TextInput>
                            <TextInput style={FormularioStyles.input} placeholder="Inventario"
                                value={Articulos.inventario}
                                onChange={(e)=>{setArticulos({...Articulos,inventario:e.target.value})}}>
                            </TextInput>
                            <View style={FormularioStyles.contenedorCheckBox}>
                                <CheckBox  innerIconStyle={{borderColor:'black'}} style={{width:50}} placeholder="Facturar sin inventario"
                                    value={Articulos.facturarSinInventario}
                                    onChange={(e)=>{setArticulos({...Articulos,facturarSinInventario:!Articulos.facturarSinInventario})}}>
                                </CheckBox>
                                <Text>Facturar sin inventario</Text>
                            </View>
                            <View style={FormularioStyles.contenedorCheckBox}>
                                <CheckBox innerIconStyle={{borderColor:'black'}} style={{width:50}} placeholder="Precio Modificable"
                                    value={Articulos.precioModificable}
                                    onPress={(e)=>{setArticulos({...Articulos,precioModificable:!Articulos.precioModificable})}}>
                                </CheckBox>
                                <Text>Precio Modificable</Text>
                            </View>


                            <Image source={imagen} style={{width:300,height:300}}></Image>
                            <Pressable style={[FormularioStyles.botonCliente,{backgroundColor:'grey',width:300}]} onPress={()=>{
                                (async()=>{
                                    var valor;
                                    valor= await launchImageLibrary({mediaType:'photo',includeBase64:true},(response)=>{
                                        if(response.didCancel)
                                        {
                                            console.log('Cancelado');
                                        }
                                        else if(response.errorMessage)
                                        {
                                            console.log('Error');
                                        }
                                        else
                                        {
                                            console.log(imagen);
                                            setImagen(base64ToImage(response));
                                            console.log(imagen);

                                        }
                                    });
                                    
                                })()

                            }}>
                                <Text style={FormularioStyles.textoBoton}>Subir Imagen</Text>
                            </Pressable>

                            <Pressable style={[FormularioStyles.botonCliente,{backgroundColor:botonColor,marginTop:20}]} onPress={()=>{

                               console.log(Articulos);
                                 setEnviarDatos('Enviando...');
                                 setbotonColor('blue');
                                 const data= fetch(Url,{
                                    method:'POST',
                                    headers:{
                                        'Content-Type':'application/json'
                                    },
                                    body:JSON.stringify(Articulos)
                                }).then((response)=>{
                                    console.log(response);
                                    if(response.status<400)
                                    {
                                        setEnviarDatos('Guardar Datos');
                                    }
                                    else
                                    {
                                        setEnviarDatos('Intentelo Nuevamente');
                                        setbotonColor('red');
                                    }
                                }).catch((error)=>{
                                    console.log(error);
                                    setEnviarDatos('Intentelo Nuevamente...');
                                    setbotonColor('red');
                                });
                            }}>
                                <Text style={FormularioStyles.textoBoton}>{enviarDatos}</Text>
                            </Pressable>

                            
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        </>
    )
}


const ModificarArticulo= ()=>{

    return(
        <>
            <Text>Modificar Articulo</Text>
        </>
    )
}