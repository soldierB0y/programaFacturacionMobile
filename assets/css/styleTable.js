import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export  const  stylesTables = StyleSheet.create({
   contenedorTabla:
   {backgroundColor:'white',borderRadius:20,maxHeight:325,borderWidth:1,borderColor:'gray',width:wp('90%'),boxShadow:'-1 4 6 gray',maxWidth:700,minHeight:400},

   tablaContenedortitulares:
   {paddingTop:10,paddingBottom:10,display:'flex',flexDirection:'row',backgroundColor:'#E6E6E6',borderBottomColor:'gray',borderBottomWidth:1},

   tablaTitulo:
   {flex:1,textAlign:'center'},

   contenedorTablaLinea:
   {paddingTop:7,paddingBottom:7,display:'flex',flexDirection:'row',alignSelf:'center',alignItems:'center',width:wp('95%'),maxWidth:700,borderBottomColor:'#ccc',borderBottomWidth:1},

   styleColumna:{
    flex:1,textAlign:'center',userSelect:'none'
   }

   
})

