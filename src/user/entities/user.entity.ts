import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Field()
    @Column()
    username : string;

    @Field()
    @Column()
    password : string;

    @Field()
    @Column()
    email : string;

    @Field(() => Int, {nullable : true})
    @Column({nullable : true})
    age : number;
}