import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ labelButton, onpress, style }: any) => {
  return (
    <TouchableOpacity onPress={onpress} style={style}>
      <Text style={styles.texto}>{labelButton}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  texto: {
    color: "rgb(238, 238, 238)",
  },
});

export default Button;
