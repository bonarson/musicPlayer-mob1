import AsyncStorage from "@react-native-async-storage/async-storage";

export const create = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

export const get = async (key) => { 
    return await AsyncStorage.getItem(key);
};

export const remove = async (key) => {
    await AsyncStorage.removeItem(key);
};

export const clear = async () => {
    await AsyncStorage.clear();
};
