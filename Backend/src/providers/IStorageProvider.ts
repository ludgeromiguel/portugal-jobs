interface IStorageProvider {
  saveFile(filePath: string): Promise<string>;
  deleteFile(fileID: string): Promise<boolean>;
  getFile(fileID: string): Promise<string>;
}

export default IStorageProvider;
