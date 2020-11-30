import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CatInput1 {
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly breed: string;
}

@InputType()
export class mauKhoiLuong {
  @Field()
  readonly loaiCongTrinh: String;
  @Field()
  readonly tenBoPhan: String;
  @Field()
  readonly data: String;
}
