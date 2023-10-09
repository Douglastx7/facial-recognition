import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Home } from "./src/Home";
import Button from "./src/Home/Button";

export default function App() {
  const [ativarImg, setAtivarImg] = useState(false);
  const [ativarPropsImg, setAtivarPropsImg] = useState(true);
  const [addImgPropsNeutro, setAddImgPropsNeutro] = useState(null || Boolean);

  const AtivarImg = () => {
    setAtivarPropsImg(true);
    setAtivarImg(false);
  };
  const DesativarImg = () => {
    setAtivarPropsImg(false);
    setAtivarImg(true);
  };

  const FunctionAddImgNeutro = () => {
    setAddImgPropsNeutro(true);
  };

  return (
    <View style={styles.containerApp}>
      <Home
        ativarImgProps={ativarPropsImg}
        adicionarImgPropsActiveNeutro={addImgPropsNeutro}
        setAddImgPropsNeutro={setAddImgPropsNeutro}
      />
      <View style={styles.containerButton}></View>
      {ativarImg ? (
        <Button
          labelButton="Ativar Imagem"
          onpress={AtivarImg}
          style={styles.buttonAtivo}
        />
      ) : (
        <Button
          labelButton="Desativar Imagem"
          onpress={DesativarImg}
          style={styles.buttonDesativo}
        />
      )}
      <Button
        labelButton="Adicionar Imagem"
        onpress={FunctionAddImgNeutro}
        style={styles.buttonAddImg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerApp: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  containerButton: {
    flexDirection: "row",
  },
  buttonAtivo: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 30,
    margin: 7,
  },
  buttonDesativo: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 30,
    margin: 7,
  },
  buttonAddImg: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 30,
    margin: 7,
  },
});
