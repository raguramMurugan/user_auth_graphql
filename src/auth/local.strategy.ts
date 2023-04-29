import { Strategy } from "passport-local";
import { UnauthorizedException, Injectable } from '@nestjs/common';
import  {PassportStrategy} from '@nestjs/passport';
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService : AuthService){
        super();
    }

    async validate(username : string, password : string ) {
        const user= await this.authService.validateUser(username, password);
        if(!user) 
        {
            throw new UnauthorizedException("Invalid Credentials, Kindly check the Credentials");
        }else {
            return user;
        }

    }



}