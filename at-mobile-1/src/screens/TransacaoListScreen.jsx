import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler/ReanimatedSwipeable";
import { useTransactions } from "../context/TransactionContext";
import TransacaoItemList from "../components/TransacaoItemList";

const TransacaoListScreen = ({ navigation }) => {
  const { transacoes, removeTransacao } = useTransactions();

  const [listaFiltrada, setListaFiltrada] = useState(transacoes);
  const [criterio, setCriterio] = useState("");
  const [valorFiltro, setValorFiltro] = useState("");

  const ordenarPor = propriedade => {
    const listaOrdenada = [...listaFiltrada].sort((a, b) => {
      if (typeof a[propriedade] === "number") {
        return a[propriedade] - b[propriedade];
      }
      return String(a[propriedade]).localeCompare(String(b[propriedade]));
    });
    setListaFiltrada(listaOrdenada);
  };

  const filtrarPor = () => {
    const listaFiltrada = transacoes.filter(item => {
      const valorComparado = String(item[criterio]).toLowerCase();
      return valorComparado.includes(valorFiltro.toLowerCase());
    });
    setListaFiltrada(listaFiltrada);
  };

  const resetarLista = () => {
    setListaFiltrada(transacoes);
    setCriterio("");
    setValorFiltro("");
  };

  const handleDelete = transacaoId => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta transação?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            removeTransacao(transacaoId);
            // Atualiza a lista filtrada após a exclusão
            const novaListaFiltrada = listaFiltrada.filter(
              item => item.id !== transacaoId
            );
            setListaFiltrada(novaListaFiltrada);
          },
        },
      ]
    );
  };

  const handleEdit = transacao => {
    navigation.navigate("Formulario", { transacao });
  };

  const renderSwipeableActions = transaction => {
    const renderLeftActions = (progress, dragX) => {
      return (
        <View style={[styles.swipeActionContainer, styles.deleteAction]}>
          <Text style={styles.swipeActionText}>Excluir</Text>
        </View>
      );
    };

    const renderRightActions = (progress, dragX) => {
      return (
        <View style={[styles.swipeActionContainer, styles.editAction]}>
          <Text style={styles.swipeActionText}>Editar</Text>
        </View>
      );
    };

    return (
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableLeftOpen={() => handleDelete(transaction.id)}
        onSwipeableRightOpen={() => handleEdit(transaction)}
      >
        <TransacaoItemList transacao={transaction} />
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TextInput
          style={styles.input}
          placeholder="Critério (descricao, categoria, tipo, etc.)"
          value={criterio}
          onChangeText={setCriterio}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor do filtro"
          value={valorFiltro}
          onChangeText={setValorFiltro}
        />
        <Button title="Filtrar" onPress={filtrarPor} />
        <Button title="Resetar" onPress={resetarLista} />
        <Text style={styles.separator}>Ordenar por:</Text>
        <View style={styles.buttonGroup}>
          <Button title="Descrição" onPress={() => ordenarPor("descricao")} />
          <Button title="Valor" onPress={() => ordenarPor("valor")} />
          <Button title="Data" onPress={() => ordenarPor("data")} />
        </View>
      </View>
      <FlatList
        data={listaFiltrada}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderSwipeableActions(item)}
        contentContainerStyle={styles.listContent}
      />
      <Button
        title="Adicionar Transação"
        onPress={() => navigation.navigate("Formulario")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  controls: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  separator: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  swipeActionContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  deleteAction: {
    backgroundColor: "red",
  },
  editAction: {
    backgroundColor: "blue",
  },
  swipeActionText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TransacaoListScreen;
