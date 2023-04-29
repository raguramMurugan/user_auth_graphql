import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user-create.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private userService : UserService, private jwtService : JwtService) {}

async validateUser(username : string, pass : string) {
    const userExists = await this.userService.getUserByEmail(username);
    console.log(userExists);
    if(!userExists)
    {
        throw new NotFoundException("User Not Found");
    }
    const matchPassword = await this.comparePassword(pass, userExists.password);
    if(!matchPassword) {
        throw new UnauthorizedException("Invalid Password");
    }
    const {password, ...result} = userExists;
    return result;
}

async findUserByEmail(email : string) : Promise<User> {
    return await this.userService.getUserByEmail(email);
}

async signup(user : CreateUserDto) {
    const userExists = await this.userService.getUserByEmail(user.email);
    if(userExists){
        throw new UnauthorizedException("Email already exists : "+ userExists.email);
    }
    else
    {
    const hashedPass = await this.hashPassword(user.password);
    const createdUser = await this.userService.createUser({...user, password : hashedPass});
    const {password, ...result } = createdUser;
    return result;
    }
}

async login(user : User) : Promise<any> {

    const token = await this.generateToken(user);
    return {token, user};
}

private async generateToken(user : User) {
    const token = await this.jwtService.signAsync({
        username : user.username,
        email : user.email,
        id : user.id
    },
    {
        secret : process.env.JWT_SECRET,
        expiresIn : process.env.EXPIRED_TIME 
    });
    return token;
}

private async hashPassword(password : string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

private async comparePassword(userEnter: string, dbPassword: string) {
    const match = await bcrypt.compare(userEnter, dbPassword);
    return match;
}
}
