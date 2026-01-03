export abstract class BaseProvider {
  abstract fetchRawData(): Promise<void>;
  abstract processData(): Promise<void>;
  abstract generateReport(): Promise<void>;

  async run() {
    await this.fetchRawData();
    await this.processData();
    await this.generateReport();
  }
}
