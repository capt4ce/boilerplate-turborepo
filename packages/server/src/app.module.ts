import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

const typeOrmModule = TypeOrmModule.forRoot({
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,

  // // mysql
  // type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'root',
  // database: 'test',

  // sqlite
  type :"sqlite",
  database: "db.sqlite",
})

@Module({
  imports: [
    typeOrmModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
