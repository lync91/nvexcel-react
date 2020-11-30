import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CatsModule1 } from './khoiluong/khoiluong.module';

@Module({
  imports: [
    CatsModule,
    CatsModule1,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost/khoiluong'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
