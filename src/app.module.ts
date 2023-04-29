import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: 
  [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile : join(process.cwd(), 'src/schema.gql'),
      driver : ApolloDriver
    }),
    ConfigModule.forRoot({ isGlobal : true }),
    UserModule,
    TypeOrmModule.forRoot({
      type : 'postgres',
      username : process.env.TYPEORM_USERNAME,
      password : process.env.TYPEORM_PASSWORD,
      database : process.env.TYPEORM_DATABASE,
      port : Number(process.env.TYPEORM_PORT),
      host : process.env.TYPEORM_HOST,
      entities : ['dist/**/*.entity{.ts,.js}'],
      synchronize : true
    }),
    AuthModule
  ],
})
export class AppModule {}
