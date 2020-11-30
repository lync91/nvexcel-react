import * as mongoose from 'mongoose';
const Schema = mongoose.Schema

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
});

export const mauKhoiLuongSchema = new Schema({
  loaiCongTrinh: String,
  tenBoPhan: String,
  data: String
});