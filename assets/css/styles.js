import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const  styles = StyleSheet.create({
    h1:{
      fontSize:30
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    TextInput:
    {
      backgroundColor:'white',
      width:"80%",
      height:"auto",
      marginBottom:5,
      borderRadius:10,
      paddingLeft:30,
      borderBottomWidth:1,
      borderBottomColor:"black",
      ...Platform.select(
        {
          web:{
            width:300,
            height:40,
            borderRadius:0
            
          }
        }
      )
      
    },
    loginBox:
    {
      backgroundColor:"white",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      gap:"5",
      textAlign:"center",
      justifyContent:"center",
      width:"90%",
      height:"auto",
      paddingTop:"100",
      paddingBottom:"100",
      borderRadius:30,
      boxShadow:"5 5 20 #d1d1d1",
      maxWidth:550,
      maxHeight:hp('90%'),
      ...Platform.select(
        {
          web:{
            minHeight:hp('95%')
          }
        }
      )
      
    },
    loginButton:
    {
      backgroundColor:"#0a70ffff",
      width:"80%",
      borderRadius:15,
      height:40,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      ...Platform.select(
        {
          web:{
            width:300
          }
        }
      )
  
    },
    Label:
    {
      textAlign:"center",
      padding:10,
    },
    botonGoogle:
    {
      backgroundColor:"#ECECEC",
      display:"flex",
      flexDirection:"row",
      width:'80%',
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:15,
      gap:10,

      ...Platform.select(
        {
          web:{
            width:300,
          }
        })
      },
      botonTextoAzul:{
        padding:40,
        color: '#0a70ffff',
        padding: 2,
        ...Platform.select(
          {
            web:{padding:25,

            }

          }
        )
      }
})

export default styles;