import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStorageDTO } from "@storage/dtos/playerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playersGetByGroup(
  group: string
): Promise<PlayerStorageDTO[]> {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw error;
  }
}
