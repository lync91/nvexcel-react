import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KhoiLuongService } from './khoiluong.service';
import { CatType1 } from './dto/create-cat.dto';
import { CatInput1 } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private readonly khoiLuongService: KhoiLuongService) { }

  @Query(() => String)
  async hello11() {
    return 'hello';
  }
  @Query(() => String)
  async hello111() {
    console.log(112);

    return 'hello';
  }
  @Mutation(() => CatType1)
  async createCat1(@Args('input') input: CatInput1) {
    console.log(14);

    return this.khoiLuongService.create(input);
  }
  @Mutation(() => String)
  async addTodo(@Args('type') type: String) {
    console.log(type);
    const id = 'generate()';
    const todo = '{ type, id };'
    return type;
  }
}
