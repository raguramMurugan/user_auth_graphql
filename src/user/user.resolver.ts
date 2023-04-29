import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/auth/gql-jwt.guard';



@Resolver()
export class UserResolver {
    constructor(private userService : UserService) {}

    @UseGuards(GqlJwtGuard)
    @Query(() => [User], {name : "getAllUser"})
    getAllUserDetails() {
        return this.userService.getAllUser();
    }

    @UseGuards(GqlJwtGuard)
    @Query(() => User)
    async getUserByEmail(@Args('email') email : string) : Promise<User> {
        return await this.userService.getUserByEmail(email);
    }

 }
