import { useState } from "react"
import { Text,ScrollView,View,StyleSheet, Pressable,Image,TextInput} from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import SelectDropdown from "react-native-select-dropdown"




export const Clientes = ({navigation})=>{
    const Tap= createMaterialTopTabNavigator();
    return(
        <>
            <Tap.Navigator>
                <Tap.Screen
                 name="ListaClientes"
                 component={ListaClientes}
                 options={{title:'Listado de Clientes'}}
                 ></Tap.Screen>
                 <Tap.Screen
                 name="NuevoCliente"
                 component={NuevoCliente}
                 options={
                    {
                        title:'Nuevo Cliente'
                 }}
                 >
                    
                 </Tap.Screen>
            </Tap.Navigator>
            
        </>

    )
}


export const ListaClientes= ()=>{
    const listadoClientes = [{id:1,nombre:'Juancho'}]
    return (
        <>
        
        </>
    )
}


export const NuevoCliente= ()=>{
    const sexo= [{title:'masculino'},{title:'femenino'}]
    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Crear Nuevo Cliente</Text>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',gap:10}}>
                    <TextInput  style={styles.input} placeholder="nombre"></TextInput>
                    {/*Usar un selectDropDown para el sexo desinstalar 
                    el paquete que tengo para eso
                     actualmente, no funciona correctamente */}
                    <Text style={styles.input}>sexo</Text>
                    <TextInput style={styles.input} placeholder="direccion"></TextInput>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="telefono"></TextInput>
                    <TextInput style={styles.input} placeholder="correo"></TextInput>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="RNC"></TextInput> 
                    <TextInput style={styles.input} placeholder="empresa"></TextInput> 
                   
                
                </View>
                <Pressable style={[styles.botonCliente,{backgroundColor:'green'}]}><Text style={styles.textoBoton}>Guardar Datos</Text></Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        width:wp('100%'),
        height:hp('100%'),
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
        fontSize:15,
        fontWeight:675,
        color:'white'
    },
    title:{
    
        textAlign:'center',
        fontSize:20,
        fontWeight:790
    },
    input:{
        width:250,
        borderRadius:10,
        height:40,
        paddingLeft:10,
        borderWidth:1,
        borderColor:'#gray'
    }
})