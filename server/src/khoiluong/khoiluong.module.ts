import { Module } from '@nestjs/common';
import { CatsResolver } from './khoiluong.resolver';
import { mauKhoiLuongResolver } from './maukhoiluong.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { mauKhoiLuongSchema } from './khoiluong.schema';
import { KhoiLuongService } from './khoiluong.service';
import { mauKhoiLuongService } from './maukhoiluong.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'mauKhoiLuong', schema: mauKhoiLuongSchema },
  ])],
  providers: [CatsResolver, KhoiLuongService, mauKhoiLuongResolver, mauKhoiLuongService],
})
export class khoiLuongModule {}
