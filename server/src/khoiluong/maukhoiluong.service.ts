import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mauKhoiLuong } from './interfaces/khoiluong.interface';
import { MauKhoiLuongInPut } from './inputs/khoiluong.input';

@Injectable()
export class mauKhoiLuongService {
  constructor(@InjectModel('mauKhoiLuong') private readonly mauKhoiLuongModel: Model<mauKhoiLuong>) {}

  async create(mkl: MauKhoiLuongInPut): Promise<mauKhoiLuong> {
    const createdCat = new this.mauKhoiLuongModel(mkl);
    return await createdCat.save();
  }

  async findAll(): Promise<mauKhoiLuong[]> {
    const res = await this.mauKhoiLuongModel.find().exec();
    return res;
  }
  async getLoaiCongTrinhs(): Promise<mauKhoiLuong[]> {
    return await this.mauKhoiLuongModel.aggregate()
    .group({_id: '$loaiCongTrinh'})
    .project({loaiCongTrinh: '$_id'})
    .sort({_id: 1}).exec()
  }
}
