import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";
import { groupCreate } from "@storage/group/groupCreate";

export function NewGroup() {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  const handleNew = async () => {
    if (group.trim().length === 0)
      return Alert.alert("Novo Grupo", "Informe o nome da turma!");

    try {
      await groupCreate(group);
      navigation.navigate("player", { group });
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Novo Grupo", error.message);
      }

      console.log(error);
      Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo!");
    }
  };

  return (
    <Container>
      <Header canShowBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          onSubmitEditing={handleNew}
          returnKeyType="done"
        />

        <Button title="Criar" style={{ marginTop: 24 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
