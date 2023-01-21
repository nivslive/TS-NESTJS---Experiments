import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioModule } from './portfolio/portfolio.module';
import   { Init }  from './database/database';


@Module({
  imports: [
    
PortfolioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
