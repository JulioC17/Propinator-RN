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
import Results from "./Results";
import ConfigWorkers from "./configWorkers";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenHeight = Dimensions.get("window").height;

export default function Home() {
  const [showImage, setShowImage] = useState(true);
  const [getWorkers, setGetWorkers] = useState([])
  const [workers, setworkers] = useState([]);
  const [totalTip, setTotalTips] = useState(0);
  const [currentScreen, setCurrentScreen] = useState("Home");

  const handleChange = (index, field, value) => {
    const updateWorkers = [...workers];
    updateWorkers[index][field] = value
    setworkers(updateWorkers);
  };

  useEffect(() => {
    const loadWorkers = async() =>{
      const listWorkers = await AsyncStorage.getItem('@workers')

      if(listWorkers){
        setGetWorkers(JSON.parse(listWorkers))
      }
    }
    loadWorkers()
  },[getWorkers])

  const pickerData = getWorkers.map((name, index) => ({key:index, label:name}))

  return (
    <>
        
      {currentScreen === "Home" && (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "#AFD8DC" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.mainScreen}>
            <View style={styles.subview}>

                <View style = {styles.buttonsView}>
              
              <View style={styles.buttonAdd}>
                <TouchableOpacity
                  onPress={() => {
                    setShowImage(false);
                    setworkers([...workers, { Trabajador: "", Horas: "" }]);
                    
                   
                  }}
                >
                  <Text style={styles.addButton}>Añadir Trabajador</Text>
                </TouchableOpacity>
              </View>

              <View style = {styles.buttonConfig}>
                   <TouchableOpacity onPress={() => setCurrentScreen("configWorkers")}>
                        <Text style={styles.config}>⚙️</Text>
                    </TouchableOpacity> 
              </View>

                </View>

              {workers.map((w, i) => {
                
                return (
                  <View key={i} style={styles.workersView}>
                    
                  
                  <View style={styles.containerModal}>
                  <ModalSelector
                    data = {pickerData}
                    initValue={w.Trabajador || "Selecciona un trabajador"}
                    onChange={(option) => handleChange(i, "Trabajador", option.label)}
                    style = {{flex:1}}
                     selectStyle={{
                              backgroundColor: "#ffffff",
                              height: "100%",
                              elevation: 2,
                              alignItems:'center',
                              justifyContent:'center',
                              fontSize:20,
                              width:175,
                              color:'#000'
                              
                              
                    }}
                    selectTextStyle={{
                              fontSize: 20,
                              color: "#000",
                              textAlign: "center",
                              fontWeight:'bold',
                              alignItems:'center'
                  }}
                    optionTextStyle={{
                              fontSize: 20,
                              color: "#000",
                              paddingVertical: 10,
                              fontWeight:'bold'
                  }}
                    optionContainerStyle={{
                              backgroundColor: "#f7f7f7",
                              borderRadius: 8,
                              marginHorizontal: 10,
                              fontSize: 20,
                  }}
                    initValueTextStyle={{color:'#000', fontSize:18, }}
                    />
                    </View>
                     
                     <View style={styles.containerHours}>
                    <Text style={styles.hours}>Horas</Text>
                    <TextInput
                      style={styles.inputHours}
                      value={w.Horas.toString()}
                      onChangeText={(text) => handleChange(i, "Horas", Number(text))}
                    ></TextInput>
                    </View>


                  </View>
                );
              })}

              {showImage ? (
                <View style={styles.imageView}>
                  <Image
                    style={styles.image}
                    source={require("../assets/image.png")}
                  />
                </View>
              ) : (
                <View style={styles.calcularView}>
                  <View style={styles.calcularInput}>
                    <Text style={styles.tipText}>Propina Total</Text>
                    <TextInput
                      style={styles.tipInput}
                      value={totalTip}
                      onChangeText={(text) => setTotalTips(text)}
                    ></TextInput>
                  </View>

                  <TouchableOpacity onPress={() => {
                      workers.map(w =>{
                        if(w.Horas === "" || w.Trabajador === "" || totalTip === 0){
                          Alert.alert(
                            "Atención",
                            "No pueden haber Horas Vacías",
                            [{text: "Ok"}]
                          )
                          console.log(w)
                        }else{
                          setCurrentScreen("Results")
                        }
                      })
                  }}>
                    
                    
                    <Text style={styles.calcularButton}>Calcular</Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

      {currentScreen === "Results" && (
        <Results
          props={workers}
          tips={totalTip}
          goBack={() => setCurrentScreen("Home")}
        />
      )}

      {currentScreen === 'configWorkers' && (
        <ConfigWorkers
           goBack={() => setCurrentScreen("Home")} 
        />
      )}

    </>
  );
}

const styles = StyleSheet.create({
  subview: {
    minHeight: screenHeight,
    backgroundColor: "#AFD8DC",
    alignItems: "center",
  },
  buttonsView:{
    width:'90%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:100,
    marginTop:'20%',
    marginBottom: "10%",
    gap:20
  },
  buttonConfig:{
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1C514F",
    borderColor: "#1C514F",
    borderWidth: 2,
  },
  config:{
    fontSize:26,
    fontWeight:'bold',
  },
  buttonAdd: {
    width: 200,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
  },
  addButton: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 450,
    height: 450,
  },
  imageView: {
    marginTop: 100,
  },
  workersView: {
    width: "90%",
    height: 70,
    backgroundColor: "#F55E3E",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    borderColor: "#BA4435",
    borderWidth: 2,
    padding: 10,
  },
  containerModal:{
    justifyContent:'center',
    alignItems:'center',
    
    
  },
  containerHours:{
    flexDirection:'row',
    width:'35%',
    gap:10,
    alignItems:'center',
  },
  inputHours: {
    width: 40,
    height:45,
    backgroundColor: "#fafafaff",
    borderRadius: 3,
    textAlign: "center",
    fontSize:18
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hours: {
    fontSize: 18,
    fontWeight: "bold",
  },
  calcularView: {
    flexDirection: "row",
    width: "80%",
    padding: 15,
    height: "15%",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#EDB987",
    borderColor: "#a97749ff",
    borderWidth: 2,
    margin: "10%",
  },
  calcularButton: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    padding: 10,
    borderRadius: 5,
  },
  tipInput: {
    width: "50%",
    height:45,
    backgroundColor: "#fafafaff",
    borderRadius: 3,
    textAlign: "center",
    fontSize:18
  },
  calcularInput: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tipText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

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

/*if(workers.Horas === ""){
                      Alert.alert(
                            "Atención",
                            "Hay Horas Vacias",
                            [{text: "OK"}]
                      )
                    }*/