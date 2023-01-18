import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import   { Init }  from './database/database';


@Module({
  imports: [
    Init,
    ChatModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
