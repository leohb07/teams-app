import { Highlight } from "@components/Highlight";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupGetAll } from "@storage/group/groupGetAll";
import { Loading } from "@components/Loading";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate("player", { group });
  };

  const fetchGroups = async () => {
    setIsLoading(true);

    try {
      const data = await groupGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Não foi possível carregar as turmas!");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="jogue com sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={!groups.length && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
