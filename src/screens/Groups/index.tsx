import { Highlight } from "@components/Highlight";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { SafeArea } from "@components/SafeArea";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  return (
    <SafeArea>
      <Container>
        <Header />

        <Highlight title="Turmas" subtitle="jogue com sua turma" />

        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <GroupCard title={item} />}
          contentContainerStyle={!groups.length && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />

        <Button title="Criar nova turma" />
      </Container>
    </SafeArea>
  );
}
