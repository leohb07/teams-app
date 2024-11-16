import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./style";
import { Highlight } from "@components/Highlight";
import { SafeArea } from "@components/SafeArea";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { useState } from "react";
import { FlatList } from "react-native";

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([]);

  return (
    <SafeArea>
      <Container>
        <Header canShowBackButton />

        <Highlight
          title="Nome da turma"
          subtitle="adicione a galera e separe os times"
        />

        <Form>
          <Input placeholder="Nome da pessoa" autoCorrect={false} />

          <ButtonIcon iconName="add" />
        </Form>

        <HeaderList>
          <FlatList
            data={["Time A", "Time B"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Filter
                title={item}
                isActive={team === item}
                onPress={() => setTeam(item)}
              />
            )}
            horizontal
          />

          <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
        </HeaderList>
      </Container>
    </SafeArea>
  );
}
