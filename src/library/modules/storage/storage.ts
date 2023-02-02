import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  static keys = Object.freeze({
    userProfile: 'userProfile',
    firstLaunch: 'firstLaunch',
  });
  static async setItemAsync(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  static async setItemAsyncWithEncryption(
    key: string,
    value: string,
  ): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  static async getItemAsync(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  static async getItemAsyncWithDecryption(key: string): Promise<string | null> {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      return value;
    }
    return '';
  }

  static async existAsync(key: string): Promise<boolean> {
    const value = await AsyncStorage.getItem(key);
    return !!value;
  }

  static async deleteItemAsync(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  static async logout(): Promise<void> {
    const result = await this.getItemAsync(this.keys.firstLaunch);
    await AsyncStorage.clear();
    await this.setItemAsync(this.keys.firstLaunch, result ?? 'false');
  }
}
