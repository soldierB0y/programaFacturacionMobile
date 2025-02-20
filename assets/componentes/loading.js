import { useState } from "react";
import {Pressable, View,Text} from "react-native"
import { Animated, Easing } from "react-native";
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen";


export const Loading= ({funcionCliente,setListaClientes})=>{

    const [fallo,setFallo]= useState(true);



      //animacion de carga
        const animacionLoading =new Animated.Value(0)

        Animated.loop(
            Animated.timing(animacionLoading, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver:false
            })
        ).start()
    
            const rotacion = animacionLoading.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "360deg"], // Rotación completa
            })
        


    return(
        <>
 
            <View style={{ display:'flex',flexDirection:'column',gap:35,width:wp('100%'),alignItems:'center',justifyContent:'center',paddingTop:hp('30%')}}>
            {
            fallo==false?  
                <Animated.Image
                    style={{
                        transform: [{ rotate: rotacion }],
                        width: 150, // Ajustar dimensiones
                        height: 150,
                    }}
                    source={require("../imagenes/loading.png")}
                />:<Pressable 
                    onPress={()=>{
                        setFallo(false);
                        (async()=>{
                            var getClientes= funcionCliente;
                            var valor=await getClientes();
                            console.log(Object.getOwnPropertyNames(valor).length)
                            if (Object.getOwnPropertyNames(valor).length <= 0)
                            {
                                setFallo(true);

                            }
                            else
                            {
                                console.log('some');
                                setListaClientes(valor)
                            }
                    })()
                    }}
                style={{backgroundColor:'#ccc',height:40,
                    height:60,
                    maxHeight:60,
                    width:200,
                    display:'flex',
                    justifyContent:'center',
                    borderRadius:15
                }}><Text style={{        textAlign:'center',
        fontSize:17,
        fontWeight:700,
        color:'white',
        userSelect:'none'}}>reintentar</Text></Pressable>
            }
            </View>
        
        </>
    )
}


