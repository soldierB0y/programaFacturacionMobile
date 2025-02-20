import {StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CheckBox } from "react-native-web";

export const FormularioStyles = StyleSheet.create({
    inputContainer:{display:'flex',justifyContent:'center',alignItems:'center',gap:10},
    dropDownContainerStyle:{width:300},
    dropDownContainerStyle:{backgroundColor:'white', width:300},
    dropDownPickerContainerStyle:{display:'flex',alignItems:'center',width:300},
    textoBold:{fontWeight:700},
    contenedorVentanaEmergente:{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',width:wp('90%'),maxWidth:500,paddingLeft:20,paddingRight:20},
    contenedorGeneral:{width:wp('100%'),display:'flex',alignItems:'center',flexDirection:'column'},
    layelFondo:{marginLeft:wp('5%'),
        backgroundColor:'white',
        paddingLeft:20,
        borderWidth:0,
        fontSize:18,
         borderColor:'black',
         width:wp('90%'),
         maxWidth:450,height:40,
         alignSelf:'center',
         marginTop:20,
         marginBottom:10},
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
        maxHeight:40,
        width:100,
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
        fontSize:22},
    
    ventanaEmergente:{
        
        width:wp('95%'),
        maxWidth:500,
        height:hp('55%'),
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:hp('21%'),
        borderWidth:1,
        borderColor:'#ccc',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:40,
        gap:20
    },
    textoInfoModal:{
        maxWidth:250
    },
    contenedorBotones:{display:'flex',flexDirection:'row',gap:10,marginTop:20,paddingLeft:10,paddingRight:10},

    contenedorCheckBox:{alignSelf:'flex-start',width:300,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-start',paddingLeft:30,},

    
})