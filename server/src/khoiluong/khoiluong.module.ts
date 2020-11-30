import { Module } from '@nestjs/common';
import { CatsResolver } from './khoiluong.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from './khoiluong.schema';
import { CatsService } from './khoiluong.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  providers: [CatsResolver, CatsService],
})
export class CatsModule1 {}
