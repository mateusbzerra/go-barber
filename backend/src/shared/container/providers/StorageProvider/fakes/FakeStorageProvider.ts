import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(fileName: string): Promise<string> {
    this.storage.push(fileName);
    return fileName;
  }

  public async deleteFile(fileName: string): Promise<void> {
    const findIndexFile = this.storage.findIndex(file => file === fileName);
    this.storage.splice(findIndexFile, 1);
  }
}
