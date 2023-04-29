import { User } from 'src/user/entities/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponseDto {

    @Field()
    token : string;

    @Field(()=>User)
    user : User; 

}