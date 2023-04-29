import { Strategy } from "passport-jwt";
import{ PassportStrategy} from '@nestjs/passport';
import {ExtractJwt} from 'passport-jwt';
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor (private authService : AuthService) {
    super({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration : false,
        secretOrKey : process.env.JWT_SECRET
    })}

    async validate(payload : any) {
        const token = await this.authService.findUserByEmail(payload.email);
        if(token) {
            console.log("in JWT Strategy, Line number 24");
            console.log(payload)
            return payload;
            
        }
        else
            throw new UnauthorizedException('You are not authorized to access this Url');
    }
}
