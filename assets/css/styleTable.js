import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export  const  stylesTables = StyleSheet.create({
   contenedorTabla:
   {borderRadius:20,maxHeight:325,borderWidth:1,borderColor:'gray',width:wp('90%'),boxShadow:'-1 4 6 gray',maxWidth:700},

   tablaContenedortitulares:
   {display:'flex',flexDirection:'row',backgroundColor:'#E6E6E6',borderBottomColor:'gray',borderBottomWidth:1},

   tablaTitulo:
   {flex:1,textAlign:'center'},

   contenedorTablaLinea:
   {display:'flex',flexDirection:'row',alignSelf:'center',alignItems:'center',width:wp('95%'),maxWidth:700},

   styleColumna:{
    flex:1,textAlign:'center',userSelect:'none'
   }

   
})

