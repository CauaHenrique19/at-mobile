import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useTransactions } from "../context/TransactionContext";

import CurrencyAPI from "../api/currencyApi";

const FormularioTransacaoScreen = ({ navigation, route }) => {
  const { transacoes, setTransacoes, addTransaction } = useTransactions();

  const [title, setTitle] = useState("Nova Transação");

  const [id, setId] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("receita");
  const [moeda, setMoeda] = useState("BRL");
  const [moedas, setMoedas] = useState([]);

  useEffect(() => {
    const transacao = route.params?.transacao;
    if (transacao) {
      const newTitle = "Editar Transação";
      setTitle(newTitle);

      setId(transacao.id);
      setDescricao(transacao.descricao);
      setValor(transacao.valor.toString());
      setData(transacao.data);
      setHora(transacao.hora);
      setCategoria(transacao.categoria);
      setTipo(transacao.tipo);
      setMoeda(transacao.moeda);

      navigation.setOptions({
        title: newTitle,
      });
    }
  }, []);

  useEffect(() => {
    const fetchMoedas = async () => {
      try {
        const listaMoedas = await CurrencyAPI.getMoedas();
        setMoedas(listaMoedas);
      } catch (error) {
        console.error("Erro ao carregar moedas:", error.message);
      }
    };
    fetchMoedas();
  }, []);

  const handleSalvar = () => {
    if (!descricao || !valor || !data || !hora || !categoria || !moeda) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const newTransaction = {
      id: id || new Date().getTime(),
      descricao,
      valor: Number(valor),
      data,
      hora,
      categoria,
      tipo,
      moeda,
    };

    if (id) {
      const tempTransacoes = transacoes.filter(
        transacao => transacao.id !== newTransaction.id
      );
      tempTransacoes.push(newTransaction);
      setTransacoes(tempTransacoes);
      Alert.alert("Transação editada com sucesso!");
    } else {
      addTransaction(newTransaction);
      Alert.alert("Transação adicionada com sucesso!");
    }

    navigation.navigate("Transacoes");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        inputMode="decimal"
      />
      <TextInput
        style={styles.input}
        placeholder="Data (MM-DD-AAAA)"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />
      <Text style={styles.label}>Tipo</Text>
      <Picker
        selectedValue={tipo}
        onValueChange={itemValue => setTipo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Receita" value="receita" />
        <Picker.Item label="Despesa" value="despesa" />
      </Picker>
      <Text style={styles.label}>Moeda</Text>
      <Picker
        selectedValue={moeda}
        onValueChange={itemValue => setMoeda(itemValue)}
        style={styles.picker}
      >
        {moedas.map(item => (
          <Picker.Item
            key={item.simbolo}
            label={`${item.nomeFormatado} (${item.simbolo})`}
            value={item.simbolo}
          />
        ))}
      </Picker>
      <Button title="Salvar" onPress={handleSalvar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
});

export default FormularioTransacaoScreen;
