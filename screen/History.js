import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function History ({goBack, sendToHome}) {
    const [period, setPeriod] = useState([{año:"", mes:""}])
    const [history, setHistory] = useState([])
    const [visibleHistory, setVisibleHistory] = useState([])
    const [visibleBtn, setVisibleBtn] = useState(false)

    useEffect(() => {
        const loadHistory = async () => {
            const listHistory = await AsyncStorage.getItem('history')

            if(listHistory){
                setHistory(JSON.parse(listHistory))
            }
        }

        loadHistory()
    }, [])

    useEffect(() => {
        let temp = {}
        period.forEach((w, i) => {
            if(history[w.año] && history[w.año][w.mes]){
                Object.entries(history[w.año][w.mes]).forEach(([worker, hours]) => {
                    temp[worker] = (temp[worker] || 0) + hours
                    setVisibleBtn(true)
                })
            }
        })
        setVisibleHistory(temp)
    },[period, history])

   

    const months = [
      {key:"01",label:"Enero" , value: "Enero"},
      {key:"02",label:"Febrero" , value: "Febrero"},
      {key:"03",label:"Marzo" , value: "Marzo"},
      {key:"4",label:"Abril" , value: "Abril"},
      {key:"5",label:"Mayo" , value: "Mayo"},
      {key:"6",label:"Junio" , value: "Junio"},
      {key:"7",label:"Julio" , value: "Julio"},
      {key:"8",label:"Agosto" , value: "Agosto"},
      {key:"9",label:"Septiembre" , value: "Septiembre"},
      {key:"10",label:"Octubre" , value: "Octubre"},
      {key:"11",label:"Noviembre" , value: "Noviembre"},
      {key:"12",label:"Diciembre" , value: "Diciembre"},
    ]

    const years = []
  for (let i = 2026; i <= 2030; i++){
    years.push({ key: i.toString(),label:i.toString(), value:i.toString()})
  }

    return(
        <KeyboardAvoidingView
        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
        style = {styles.keyboardOut}
        >
        <ScrollView style = {styles.keyboardScroll} keyboardShouldPersistTaps="handled">
            <View style={styles.generalView}>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
                    <Text style={styles.textBtn}>Ir Atrás</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addPeriod} onPress={() => {
                        setPeriod([...period, {año:"", mes:""}])
                        
                    }}>
                    <Text style={styles.textBtn}>Agregar Periodo</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.modals}>
                    
                        {period.map((p, i)=> {
                            
                            return(
                                <View key = {i}  style ={styles.modalsContainer}>
                                <ModalSelector
                                    data = {years}
                                    initValue={p.año || "Año" }
                                    onChange={(option) => {
                                        const update = [...period]
                                        update[i] = {...update[i], año:option.value}
                                        setPeriod(update)
                                    }}
                                    initValueTextStyle={{color:'#000', fontSize:18, }}
                                    selectStyle={{backgroundColor: "#ffffff", height: 45, elevation: 2, alignItems:'center', justifyContent:'center', fontSize:20, width:150, color:'#000'}}
                                    optionTextStyle={{fontSize: 20, color: "#000", paddingVertical: 10, fontWeight:'bold'}}
                                    optionContainerStyle={{backgroundColor: "#f7f7f7", borderRadius: 8, marginHorizontal: 10, fontSize: 20,}}
                                />

                                <ModalSelector
                                    data = {months}
                                    initValue={p.mes || "Mes" }
                                    onChange={(option) => {
                                        const update = [...period]
                                        update[i] = {...update[i], mes:option.value}
                                        setPeriod(update)
                                    }}
                                    initValueTextStyle={{color:'#000', fontSize:18, }}
                                    selectStyle={{backgroundColor: "#ffffff", height: 45, elevation: 2, alignItems:'center', justifyContent:'center', fontSize:20, width:150, color:'#000'}}
                                    optionTextStyle={{fontSize: 20, color: "#000", paddingVertical: 10, fontWeight:'bold'}}
                                    optionContainerStyle={{backgroundColor: "#f7f7f7", borderRadius: 8, marginHorizontal: 10, fontSize: 20,}}
                                />
                                </View>
                            )
                        })}
                    </View>

                    <View >
                        {Object.entries(visibleHistory).length > 0 ? (
                            Object.entries(visibleHistory).map(([w, h]) => {
                               return (
                                <View style = {styles.listView} key ={w}>
                               <Text key = {w} style = {styles.worker}>{w}</Text>
                               <Text key = {h} style = {styles.worker}>{h} Horas</Text>
                               </View>
                            )
                            })
                        ):(
                            <Text key = {1} style = {styles.error}>No hay fechas seleccionadas</Text>
                        )}
                    </View>
                    
                    {visibleBtn === true && (
                        <View style={styles.calculateBtnView}>
                            <TouchableOpacity style={styles.calculateBtn} onPress={() =>{
                                const newWorkers = Object.entries(visibleHistory).map(([w, h]) => ({
                                    Trabajador:w,
                                    Horas:h
                                }))
                                sendToHome(newWorkers)
                            }}>
                                <Text style={styles.calculateBtnText}>Calcular</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    
            
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    generalView: {
    minHeight: screenHeight,
    backgroundColor: "#AFD8DC",
    alignItems: "center",
    paddingBottom:150
  },
    goBackBtn:{
    height: 55,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    marginTop: "5%",
    marginLeft: "1%",
},buttonView:{
    width:350,
    height:100,
    flexDirection:'row',
    marginTop:50,
    justifyContent:'space-around',
    alignItems:'center'
},
textBtn: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addPeriod:{
 height: 55,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    marginTop: 20,
    marginLeft: 0,
  },
    modalsContainer:{
    flexDirection:'row',
    width:'90%',
    borderColor:'#BA4435',
    borderWidth:2,
    justifyContent:'space-around',
    alignItems:'center',
    padding:10,
    borderRadius:10,
    margin:5,
    backgroundColor:'#F55E3E'
  },
  worker:{
    fontSize:20
},
listView:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#EDB987',
    borderColor:'#BA4435',
    borderWidth:2,
    width:300,
    fontSize:20,
    margin:5,
    borderRadius:10,
    padding:10
},error:{
    fontSize:18,
    padding:15,
    margin:10,
    borderColor:'#000',
    backgroundColor:'#BA4435',
    borderWidth:2,
    borderRadius:10,
    color:'#AFD8DC',
    fontWeight:'bold'
},calculateBtnView:{
    height:55,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    marginTop: "5%",
    marginLeft: "1%",
},calculateBtnText:{
    fontSize:18,
    fontWeight:'bold'
},
keyboardOut:{
    flex:1
},
keyboardScroll:{
    paddingBottom:40
}
  
})

/*
Fondo suave azul/verde
#AFD8DC
Rojo quemado oscuro
#BA4435
Verde esmeralda
#45996A
Naranja rojizo brillante
#F55E3E
Verde petróleo oscuro
#1C514F
Beige cálido / piel
#EDB987
*/
//setCurrentScreen("Results")
