import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './khoiluong.service';
import { CatType1 } from './dto/create-cat.dto';
import { CatInput1 } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  async hello11() {
    return 'hello';
  }
  @Query(() => String)
  async hello111() {
    return 'hello';
  }
  @Mutation(() => CatType1)
  async createCat1(@Args('input') input: CatInput1) {
    return this.catsService.create(input);
  }
}
