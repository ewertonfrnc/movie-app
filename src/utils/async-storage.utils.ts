import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeToStorage(
  keyString: string,
  itemToStore: Object | string,
) {
  try {
    if (typeof itemToStore === "object") {
      return await AsyncStorage.setItem(keyString, JSON.stringify(itemToStore));
    }

    return await AsyncStorage.setItem(keyString, itemToStore);
  } catch (error) {
    console.warn("error storing value", error);
  }
}

export async function readStorageItem(keyString: string) {
  try {
    const storageItem = await AsyncStorage.getItem(keyString);

    return typeof storageItem === "string"
      ? storageItem
      : JSON.parse(storageItem ?? "null");
  } catch (error) {
    console.warn("error reading value", error);
  }
}

export async function removeFromStorage(keyString: string) {
  try {
    await AsyncStorage.removeItem(keyString);
  } catch (error) {
    console.warn("error removing value", error);
  }
}
