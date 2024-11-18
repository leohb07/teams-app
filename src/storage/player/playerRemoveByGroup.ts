import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroup } from "./playersGetByGroup";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playerRemoveByGroup(group: string, playerName: string) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const filtered = storedPlayers.filter(
      (player) => player.name !== playerName
    );

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(filtered)
    );
  } catch (error) {}
}
