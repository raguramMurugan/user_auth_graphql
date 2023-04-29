import { Resolver, Args, Mutation,Context } from '@nestjs/graphql';
import { CreateUserDto } from 'src/user/dto/user-create.dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-guard';
import { User } from 'src/user/entities/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginUserDto } from './dto/login-signIn.dto';

@Resolver()
export class AuthResolver {
    constructor(private authService : AuthService) {}

@Mutation(() => User) 
async signUp(@Args('user') user : CreateUserDto) {
return await this.authService.signup(user);
}

@Mutation(()=> LoginResponseDto)
@UseGuards(GqlAuthGuard)
async signIn(@Args('userInput') userInput : LoginUserDto, @Context() context) {
    return await this.authService.login(context.user);
}
}
