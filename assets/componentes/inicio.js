import { useState } from "react"
import { Text,ScrollView,View,StyleSheet, Pressable,Image} from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
// Only import react-native-gesture-handler on native platforms
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Clientes } from './clientes';
import { Inventario, RegistrosInventario } from './inventario';
import { NavigationContainer } from "@react-navigation/native";
import { FacturaPrincipal } from "./facturas";


const Drawer= createDrawerNavigator();


export  const Menu= ({navigation})=>{

    navigation.navigate('Clientes')

    return(
        <>
            {/*nav */}


                    <Drawer.Navigator
                        initialRouteName="Inicio"
                        
                        screenOptions={
                            {
 
                                drawerType:'back',
                                drawerStyle:{
                                    backgroundColor:'#011C25',
                                },
                                drawerLabelStyle:{
                                   color:'white'
                                }


                                
                                
                            }
                        }
                        
                        
                    >
                        <Drawer.Screen name="Inicio" component={Inicio}></Drawer.Screen>
                        <Drawer.Screen name="Ordenes" component={RegistrosInventario}></Drawer.Screen>
                        <Drawer.Screen name="Clientes" component={Clientes}></Drawer.Screen>
                        <Drawer.Screen name="FacturaPrincipal" component={FacturaPrincipal} options={{title:'Facturas'}}></Drawer.Screen>
                    </Drawer.Navigator>

        </>
    )
}


export const Inicio= ()=>{
    return(
        <>
        
        </>
    )
}


const styles= StyleSheet.create({

    bellButton:{
        backgroundColor:'white',
        borderWidth:2,
        borderColor:'black',
        borderRadius:18,
        position:'relative',
        zIndex:1000
    },
    bellContainer:{

        position:'absolute',
        width:'100%',
        paddingTop:hp('5%'),
        display:'flex',
        alignItems:'flex-end',
        paddingRight:5
    },
    bell:{
        width:50,
        height:50,
        

    },
    asideTittle:{
        fontSize:20,
        fontWeight:675
    },

    imageAside:{
        width:160,
        height:160
    },

    aside:
    {

        width:wp('75%'),
        minHeight:hp('100%'),
        flex:1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:18,
        paddingTop:hp('10%')
    },
    Body:{
        backgroundColor:'whiteSmoke',
        width:wp('100%'),
        height:hp('100%'),
        display:'flex',
        flexDirection:'row'
        
    },
    Nav:
    {

        height:hp('110%'),
        backgroundColor:'#1f2229ff',
        display:'flex',
        flexDirection:'column',
        position:'static',
        justifyContent:'flex-start',
        paddingTop:hp('10%'),
        gap:30,
        maxWidth:225,
        

    },
    textNav:{
        color:'white',
        textAlign:'center',
        fontSize:18,        

    },
    menu:{
        width:35,
        height:35,
        position:'relative',
    }
})