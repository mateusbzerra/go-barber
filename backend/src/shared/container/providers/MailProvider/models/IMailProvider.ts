export default interface IMailProvider {
  sendMail(to: string, body: string): Promise<void>;
  // deleteFile(path: string): Promise<void>;
}
