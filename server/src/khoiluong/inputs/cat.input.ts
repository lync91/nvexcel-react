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
