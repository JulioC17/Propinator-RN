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
} from "react-native";
import { useState, useEffect } from "react";
import Results from "./Results";
const screenHeight = Dimensions.get("window").height;

export default function Home() {
  const [showImage, setShowImage] = useState(true);
  const [workers, setworkers] = useState([]);
  const [totalTip, setTotalTips] = useState(0);
  const [currentScreen, setCurrentScreen] = useState("Home");

  const handleChange = (index, field, value) => {
    const updateWorkers = [...workers];
    updateWorkers[index][field] = value
    setworkers(updateWorkers);
  };

  return (
    <>
      {currentScreen === "Home" && (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "#AFD8DC" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView contentContainerStyle={styles.mainScreen}>
            <View style={styles.subview}>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => {
                    setShowImage(false);
                    setworkers([...workers, { Trabajador: "", Horas: "" }]);
                  }}
                >
                  <Text style={styles.addButton}>Añadir Trabajador</Text>
                </TouchableOpacity>
              </View>

              {workers.map((w, i) => {
                return (
                  <View key={i} style={styles.workersView}>
                    <Text style={styles.name}>Trabajador</Text>
                    <TextInput
                      style={styles.inputName}
                      value={w.Trabajador}
                      onChangeText={(text) =>
                        handleChange(i, "Trabajador", text)
                      }
                    ></TextInput>

                    <Text style={styles.hours}>Horas</Text>
                    <TextInput
                      style={styles.inputHours}
                      value={w.Horas.toString()}
                      onChangeText={(text) => handleChange(i, "Horas", Number(text))}
                    ></TextInput>
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

                  <TouchableOpacity onPress={() => setCurrentScreen("Results")}>
                    <Text style={styles.calcularButton}>Calcular</Text>
                  </TouchableOpacity>
                </View>
              )}

              {console.log(totalTip)}
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
    </>
  );
}

const styles = StyleSheet.create({
  subview: {
    minHeight: screenHeight,
    backgroundColor: "#AFD8DC",
    alignItems: "center",
  },
  buttonView: {
    width: 200,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#45996A",
    borderColor: "#1C514F",
    borderWidth: 2,
    marginTop: "30%",
    marginBottom: "10%",
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
    height: 50,
    backgroundColor: "#F55E3E",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    borderColor: "#BA4435",
    borderWidth: 2,
    padding: 10,
  },
  inputName: {
    width: "30%",
    backgroundColor: "#fafafaff",
    borderRadius: 3,
    textAlign: "center",
  },
  inputHours: {
    width: "10%",
    backgroundColor: "#fafafaff",
    borderRadius: 3,
    textAlign: "center",
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
    height: "10%",
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
    width: "40%",
    backgroundColor: "#fafafaff",
    borderRadius: 3,
    textAlign: "center",
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
