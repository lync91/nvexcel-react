import { Resolver, ResolveProperty, Query, Mutation, Args } from '@nestjs/graphql';
import { mauKhoiLuongService } from './maukhoiluong.service';
import { CatType1, MauKhoiLuongType } from './dto/khoiluong.dto';
import { MauKhoiLuongInPut } from './inputs/khoiluong.input';

@Resolver()
export class mauKhoiLuongResolver {
  constructor(private readonly mauKhoiLuongService: mauKhoiLuongService) { }

  @Query(() => [MauKhoiLuongType])
  async maukhoiluongs() {
    const res = await this.mauKhoiLuongService.findAll();
    console.log(res);
    
    return res
  }
  @Query(() => [MauKhoiLuongType])
  async loaicongtrinhs() {
    const res = await this.mauKhoiLuongService.getLoaiCongTrinhs();
    console.log(res);
    return res
  }
  @Mutation(() => MauKhoiLuongType)
  async createMauKhoiLuong(@Args('input') input: MauKhoiLuongInPut) {
    console.log(input);
    return this.mauKhoiLuongService.create(input);
  }
}
