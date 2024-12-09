import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../context/authContext";
import GitHubService from "../api/githubService";

const CreateIssueScreen = ({ navigation, route }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [repository, setRepository] = useState("");
  const [loading, setLoading] = useState(false);

  const githubService = new GitHubService(token);

  const handleCreateIssue = async () => {
    if (!title.trim() || !repository.trim()) {
      Alert.alert("Erro", "Título e repositório são obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const [owner, repo] = repository.split("/");
      await githubService.createIssue(owner, repo, { title, body });

      Alert.alert("Sucesso", "Issue criada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Repositório (owner/repo)</Text>
      <TextInput
        style={styles.input}
        value={repository}
        onChangeText={setRepository}
        placeholder="Ex: octocat/Hello-World"
      />

      <Text style={styles.label}>Título da Issue</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título da issue"
      />

      <Text style={styles.label}>Descrição (opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={4}
        placeholder="Descrição detalhada da issue"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateIssue}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Criando..." : "Criar Issue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4078c0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateIssueScreen;
