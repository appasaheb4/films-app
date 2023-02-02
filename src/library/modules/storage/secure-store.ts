import AsyncStorage from '@react-native-async-storage/async-storage';
import {constants} from '@/library/utils';

const SIZE_LIMIT = 2048;
export class SecureStore {
  static async setItemAsync(key: string, value: string): Promise<void> {
    if (value && new Blob([value]).size <= SIZE_LIMIT) {
      await AsyncStorage.setItem(key, value);
    } else {
      // Todo Handle the condition if unable to save values
    }
  }

  static async getItemAsync(key: string): Promise<string | null> {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      return result;
    }
    return null;
  }

  static async deleteItemAsync(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  static async isAvailableAsync(): Promise<boolean> {
    return false; //AsyncStorage.();
  }

  static async logout(): Promise<void> {
    await this.deleteItemAsync(constants.encryptionKey);
    await this.deleteItemAsync(constants.refreshToken);
    await this.deleteItemAsync(constants.expireTime);
  }
}
