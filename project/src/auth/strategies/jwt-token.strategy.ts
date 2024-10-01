import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Repository } from 'typeorm';
import { User } from '../entities';
import { JwtPayload } from '../models';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.authService.validateJwt(payload);
    // const user = await this.userRepository.findOneBy({ email });
    // if (!user) {
    //   throw new UnauthorizedException('Token not valid');
    // }
    // if (!user.isActive) {
    //   throw new UnauthorizedException('User is inactive, talk with an admin');
    // }
    return user;
  }
}
