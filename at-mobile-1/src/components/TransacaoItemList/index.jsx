import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from "react-native";

const TransacaoItemList = ({ transacao }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width < height) {
        console.log("PORTRAIT");
      } else {
        console.log("LANDSCAPE");
      }
    });
  }, []);

  return (
    <View
      style={[
        styles.container,
        transacao.tipo === "receita" ? styles.receita : styles.despesa,
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.descricao}>{transacao.descricao}</Text>
        <Text style={styles.valor}>
          {transacao.tipo === "receita" ? "+" : "-"} {transacao.moeda}{" "}
          {transacao.valor.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.data}>Data: {transacao.data}</Text>

      {/* Informações adicionais no modo paisagem */}
      {isLandscape && (
        <>
          <Text style={styles.info}>Hora: {transacao.hora}</Text>
          <Text style={styles.info}>Categoria: {transacao.categoria}</Text>
          <Text style={styles.info}>Tipo: {transacao.tipo}</Text>
          <Text style={styles.info}>Moeda: {transacao.moeda}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descricao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  receita: {
    borderLeftColor: "#4CAF50",
    borderLeftWidth: 5,
  },
  despesa: {
    borderLeftColor: "#F44336",
    borderLeftWidth: 5,
  },
  data: {
    marginTop: 5,
    fontSize: 14,
    color: "#777",
  },
  info: {
    marginTop: 5,
    fontSize: 12,
    color: "#999",
  },
});

export default TransacaoItemList;
