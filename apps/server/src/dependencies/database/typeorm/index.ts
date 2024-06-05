import { AppDataSource } from "./data-source"

class TypeormDatabase {
  init() {
    AppDataSource.initialize()
  }
}

export default new TypeormDatabase()