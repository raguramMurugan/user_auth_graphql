import {InputType, Field} from '@nestjs/graphql'
import { IsNotEmpty, IsEmail } from 'class-validator';


@InputType()
export class CreateUserDto {

    @Field()
    @IsNotEmpty()
    username : string;

    @Field()
    @IsNotEmpty()
    password : string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email : string;

    @Field({nullable : true})
    age : number;

}