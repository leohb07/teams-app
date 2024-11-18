import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./style";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "@storage/dtos/playerStorageDTO";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const fetchPlayersByTeam = async () => {
    setIsLoading(true);

    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Nova pessoa",
        "Não foi possível carregar as pessoas do time selecionado!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlayer = async () => {
    if (playerName.trim().length === 0) {
      return Alert.alert(
        "Novo pessoa",
        "Informe o nome da pessoa para continuar."
      );
    }

    try {
      const payload = {
        name: playerName,
        team,
      };

      await playerAddByGroup(payload, group);
      await fetchPlayersByTeam();

      newPlayerNameInputRef.current?.blur();
      setPlayerName("");
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Nova pessoa", error.message);
      }

      console.log(error);
      Alert.alert("Nova pessoa", "Não foi possível adicionar!");
    }
  };

  const handleRemovePlayer = async (name: string) => {
    try {
      await playerRemoveByGroup(group, name);
      await fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover pessoa", "Não foi possível remover está pessoa!");
    }
  };

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover grupo", "Não foi possível remover está turma!");
    }
  };

  const handleGroupRemove = () => {
    Alert.alert("Remover", "Deseja remover está turma?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => groupRemove(),
      },
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header canShowBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={playerName}
          onChangeText={setPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon iconName="add" onPress={handleAddPlayer} />
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
          showsHorizontalScrollIndicator={false}
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
