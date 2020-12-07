import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { mauKhoiLuong } from './interfaces/khoiluong.interface';
import { CatInput1 } from './inputs/khoiluong.input';

@Injectable()
export class KhoiLuongService {
  constructor(@InjectModel('mauKhoiLuong') private readonly catModel: Model<mauKhoiLuong>) {}

  async create(createCatDto: CatInput1): Promise<mauKhoiLuong> {
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<mauKhoiLuong[]> {
    return await this.catModel.find().exec();
  }
}
