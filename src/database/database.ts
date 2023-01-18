import { TypeOrmModule } from "@nestjs/typeorm"

export const database: Object = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
  }

export const Init: any =  TypeOrmModule.forRoot(
    Object.assign(
      {},
      {
        entities: [],
        synchronize: true,
      },
      database
))
