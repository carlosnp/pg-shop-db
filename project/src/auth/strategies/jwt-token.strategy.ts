import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities';
import { JwtPayload } from '../models';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   * @param {AuthService} authService Servicio de auth
   * @param {ConfigService} configService
   */
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  /**
   * Valida el toekn
   * @param {JwtPayload} payload Payload
   * @returns {Promise<User>}
   */
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.authService.validateJwt(payload);
    return user;
  }
}
