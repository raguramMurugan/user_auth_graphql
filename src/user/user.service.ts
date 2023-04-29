import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
    constructor (@InjectRepository(User) private userRepo : Repository<User> ) {}


    async getAllUser() : Promise<User[]> {
        return await this.userRepo.find();
    }

    async getUserByEmail(email : string) : Promise<User> {
        return await this.userRepo.findOne({where : {email}});
    }

    async getUserFromUsername ( username : string) : Promise<User> {
        return await this.userRepo.findOne({where : {username}});
    }

    async createUser(user : CreateUserDto) : Promise<User> {
        let userData= this.userRepo.create(user);
        return await this.userRepo.save(userData);
        
    }

}
