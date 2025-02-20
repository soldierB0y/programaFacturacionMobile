import {View,Text,Image,TextInput,Platform} from 'react-native';
import { FormularioStyles } from '../css/formularioStyles';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import {Picker} from 'react-native-web'



const  CardInfoComponente= (params)=>{

    const [open,setOpen]=useState(false);
    const [date,setDate]=useState(new Date());
    const dates={day:[],month:[],year:[]};
    const [numero,setNumero]= useState(10);

    for(let i=1;i<=31;i++){
        dates.day.push(i);
    }
    for(let i=1;i<=12;i++){
        dates.month.push(i);
    }
    for(let i=1999;i<= new Date().getFullYear();i++){
        dates.year.push(i);
    }

    console.log(dates);

    return(
        <>
        
        
            <View style={FormularioStyles.form}>
                <Text style={[FormularioStyles.title,{fontSize:20,fontWeight:600}]} >{params.titulo}: {numero}</Text>
                <Image style={{width:100,height:100}} source={require('../imagenes/bill.png')}></Image>
                <View style={[FormularioStyles.form,{flexDirection:'row',justifyContent:'center',backgroundColor:'none'}]}>

                {
                        Platform.OS==='web'?
                        <View style={{display:'flex',flexDirection:'row',gap:2}}>

                            <Picker style={{width:100}}>
                                {
                                    dates.day.map((item,index)=><Picker.Item key={index} label={item.toString()} value={item}/>)
                                }
                            </Picker>

                            <Picker style={{width:100}}>
                                {
                                    dates.month.map((item,index)=><Picker.Item key={index} label={item.toString()} value={item}/>)
                                }
                            </Picker>


                            <Picker style={{width:100}} onValueChange={(item)=>console.log(item)}>
                                {
                                    dates.year.map((item,index)=><Picker.Item key={index} label={item.toString()} value={item}/>)
                                }
                            </Picker>
                        </View>
                        :
                        <DatePicker
                        modal={false}
                        open={open}
                        
                        date={date}
                        mode='date'
                        onConfirm={(date)=>{
                            setOpen(false);
                            setDate(date);
                        }}
                        onCancel={()=>setOpen(false)}
                    ></DatePicker>
                    }
                    <Image style={{width:15,height:15}} source={require('../imagenes/play.png')}/>
                    {
                        Platform.OS==='web'?
                        <View style={{display:'flex',flexDirection:'row',gap:2}}>

                            <Picker style={{width:100}}>
                                {
                                    dates.day.map((item,index)=><Picker.Item key={index} label={item.toString()} value={item}/>)
                                }
                            </Picker>

                            <Picker style={{width:100}}>
                                {
                                    dates.month.map((item,index)=><Picker.Item key={index} label={item.toString()} value={item}/>)
                                }
                            </Picker>


                            <Picker style={{width:100}} onValueChange={(item)=>console.log(item)}>
                                {
                                    dates.year.map((item,index)=><Picker.Item key={index} label={item.toString()} value={item}/>)
                                }
                            </Picker>
                        </View>
                        :
                        <DatePicker
                        modal={true}
                        open={open}
                        date={date}
                        mode='date'
                        onConfirm={(date)=>{
                            setOpen(false);
                            setDate(date);
                        }}
                        onCancel={()=>setOpen(false)}
                    ></DatePicker>
                    }
                    

                </View>
            </View>
        
        
        
        

        </>
    )
}


export default CardInfoComponente;