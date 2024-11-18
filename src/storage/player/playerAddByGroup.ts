import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "@storage/dtos/playerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";
import { AppError } from "@utils/AppError";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playersAlreadyExists = storedPlayers.some(
      (player) => player.name === newPlayer.name
    );

    if (playersAlreadyExists) {
      throw new AppError("Está pessoa já está adicionada neste time!");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
