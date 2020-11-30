import { Module } from '@nestjs/common';
import { CatsResolver } from './khoiluong.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { mauKhoiLuongSchema } from './khoiluong.schema';
import { KhoiLuongService } from './khoiluong.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'mauKhoiLuong', schema: mauKhoiLuongSchema }])],
  providers: [CatsResolver, KhoiLuongService],
})
export class khoiLuongModule {}
