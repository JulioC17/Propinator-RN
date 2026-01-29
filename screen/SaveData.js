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
import { func } from "prop-types";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;


export default function SaveData ({goBack}) {
    const [getWorkers, setGetWorkers] = useState([])
    const [yearSelected, setYearSelected] = useState("")
    const [monthSelected, setMonthSelected] = useState("")
    const [workers, setworkers] = useState([])

    useEffect(() => {
    const loadWorkers = async() =>{
      const listWorkers = await AsyncStorage.getItem('@workers')

      if(listWorkers){
        setGetWorkers(JSON.parse(listWorkers))
      }
    }
    loadWorkers()
  },[])

  const removeItem = (array,index) =>{
    const itemTrash = array.filter((w,i,a) => a[i] != a[index])
    setworkers(itemTrash)
  }

  
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

  const modalList = getWorkers.map((w, i) => ({
   key:i.toString(),
   label: w,
   value: w
  })) 

  return (
    <KeyboardAvoidingView
        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
        style = {styles.keyboardOut}
    >
        <ScrollView style = {styles.generaScrolllView}>
            <View style={styles.generalView}>
                <View style={styles.buttonView}>
                      <TouchableOpacity style={styles.goBackBtn} onPress={goBack}>
                        <Text style={styles.textBtn}>Ir Atrás</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.modalsAndBtn}>
                        
                        <ModalSelector
                            data = {years}
                            initValue={yearSelected || "Selecciona un año" }
                            onChange={(option) => setYearSelected(option.value)}
                            initValueTextStyle={{color:'#000', fontSize:18, }}
                            selectStyle={{backgroundColor: "#ffffff", height: 45, elevation: 2, alignItems:'center', justifyContent:'center', fontSize:20, width:300, color:'#000'}}
                            optionTextStyle={{fontSize: 20, color: "#000", paddingVertical: 10, fontWeight:'bold'}}
                            optionContainerStyle={{backgroundColor: "#f7f7f7", borderRadius: 8, marginHorizontal: 10, fontSize: 20,}}
                        />
                        
                        <ModalSelector
                            data = {months}
                            initValue={ monthSelected || "Selecciona una Mes"}
                            onChange={(option) => setMonthSelected(option.value)}
                            initValueTextStyle={{color:'#000', fontSize:18, }}
                            selectStyle={{backgroundColor: "#ffffff", height: 45, elevation: 2, alignItems:'center', justifyContent:'center', fontSize:20, width:300, color:'#000'}}
                            optionTextStyle={{fontSize: 20, color: "#000", paddingVertical: 10, fontWeight:'bold'}}
                            optionContainerStyle={{backgroundColor: "#f7f7f7", borderRadius: 8, marginHorizontal: 10, fontSize: 20,}}
                        />
                        
                        <View style={styles.addBtnView}>
                      <TouchableOpacity style={styles.addBtn} onPress={() => {
                        if(yearSelected === "" || monthSelected ===""){
                            Alert.alert(
                                    "Atención",
                                    "Selecciona Mes y Año",
                                    [{text: "OK"}]
                            )
                            return                   
                        }
                        setworkers([...workers, {Trabajador:"", Horas: ""}])}}>
                        
                        <Text style={styles.addBtnText}>Añadir Trabajador</Text>
                      </TouchableOpacity>
                    </View>

                    <View style = {styles.listView}>

                    </View>
                        
                        {workers.map((w, i) => {
                           
                           return(
                           <View  key = {i} style={styles.listView} >
                            
                               <View style = {styles.workerContainer}>
                               
                                <ModalSelector
                                    data={modalList}
                                    initValue = {w.Trabajador || "Trabajador"}
                                    onChange = {(option) => {
                                        const workerUpdated = [...workers]
                                        workerUpdated[i].Trabajador = option.label
                                        setworkers(workerUpdated)
                                    }}
                                    
                                    initValueTextStyle={{color:'#000', fontSize:18, }}
                                    selectStyle={{backgroundColor: "#ffffff", height: 45, elevation: 2, alignItems:'center', justifyContent:'center', fontSize:20, width:120, color:'#000'}}
                                    optionTextStyle={{fontSize: 20, color: "#000", paddingVertical: 10, fontWeight:'bold'}}
                                    optionContainerStyle={{backgroundColor: "#f7f7f7", borderRadius: 8, marginHorizontal: 10, fontSize: 20,}}
                                />

                               
                               <View style = {styles.inputContainer}>
                                <Text style = {styles.hours}>Horas</Text>
                                <TextInput
                                    style = {styles.input}
                                    value = {w.Horas.toString() || ""}
                                    onChangeText={(text) => {
                                        const updateHours = [...workers]
                                        updateHours[i].Horas = text
                                        setworkers(updateHours)
                                    }}
                                ></TextInput>
                               </View>

                               <TouchableOpacity
                                    style={styles.removeItem}
                                    onPress={() => {removeItem(workers, i)}}
                                >
                                    <Text style={styles.addButton}>❌</Text>
                                </TouchableOpacity>

                               
                                </View>

                                

                            </View>
                           )
                            })}

                            {workers.length > 0 && (
                                <View style = {styles.saveDataView}>
                                    <TouchableOpacity style = {styles.saveDataTouch} onPress={ async () => {
                                        const historyRaw = await AsyncStorage.getItem("history")
                                        const history = historyRaw ? JSON.parse(historyRaw) : {}
                                        
                                        
                                        if(!history[yearSelected]){
                                            history[yearSelected] = {}
                                        }
                                        if(!history[yearSelected][monthSelected]){
                                            history[yearSelected][monthSelected] = {}
                                        }

                                        for (const w of workers) {

                                            if(w.Trabajador === "" || w.Horas ===""){
                                                 Alert.alert(
                                                     "Atención",
                                                    "Todos los campos deben rellenarse",
                                                    [{text: "OK"}]
                                                    )
                                                    return
                                            }

                                             history[yearSelected][monthSelected][w.Trabajador] = (history[yearSelected][monthSelected][w.Trabajador] || 0) + Number(w.Horas)
                                        }

                                        let mensaje = `${monthSelected} del ${yearSelected}\n`
                                            for (const w of workers) {
                                                mensaje += `${w.Trabajador}: ${w.Horas} horas\n`
                                            }

                                            Alert.alert(
                                                "Atención",
                                                `CONFIRMA ESTOS DATOS\n${mensaje}`,
                                                
                                            [{text: "Cancelar"}, {text: "Guardar", onPress: async () => {
                                                await AsyncStorage.setItem("history", JSON.stringify(history))
                                                goBack()
                                                Alert.alert(
                                                    "Guardado",
                                                    "Datos guardado con éxito",
                                                    [{text: "OK"}]
                                                )
                                            }}]
                                            )
                                        
                                    
                                        

                                    }}>
                                        <Text style = {styles.saveDataText}>Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                    </View>

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
  modalsAndBtn:{
    width:200,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#000',
    gap:10
   },

  goBackBtn:{
    height: 45,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    marginTop: 10,
    marginLeft: 0,
},buttonView:{
    width: 300,
    height: 100,
    marginTop: 75,
    marginBottom: 20,
},
textBtn: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addBtn:{
    width: 200,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
  },
  addBtnText:{
     color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  workerContainer:{
    flexDirection:'row',
    borderColor:'#BA4435',
    borderWidth:2,
    width:350,
    justifyContent:'space-between',
    padding:10,
    borderRadius:10,
    backgroundColor:'#F55E3E',
    alignItems:"center"

},
input:{
    backgroundColor:'#fff',
    width:40,
    height:45,
    borderRadius:5,
    textAlign:'center'
},
inputContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:10,
    height:'100%',
    width:'35%'
},
hours:{
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
},
saveDataTouch:{
    height: 60,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    marginTop: "5%",
    marginLeft: "1%",
},
saveDataText:{
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
},
generaScrolllView:{
    backgroundColor:'#AFD8DC',
    paddingBottom:150
},
keyboardOut:{
    backgroundColor:'#AFD8DC',
    flex:1
},
addButton: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  removeItem:{
    borderWidth:1,
    borderColorL:"#000",
    padding:1,
    backgroundColor:"#ebebeb",
    borderRadius:5,
    height:35,
    width:35,
    justifyContent:"center",
    alignItems:"center"
  }

})