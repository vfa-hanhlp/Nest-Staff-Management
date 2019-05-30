import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import * as passport from 'passport';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * @description logger
   * @private
   * @memberof AuthStrategy
   */
  private logger = new Logger(AuthStrategy.name);

  /**
   * Creates an instance of AuthStrategy.
   * @author lee
   * @date 2019-03-15
   * @param {AuthService} authService
   * @param {JwtService} jwtserver
   * @memberof AuthStrategy
   */
  constructor(
    private readonly authService: AuthService,
    private readonly jwtserver: JwtService,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: '3.1415926',
      },
      async (req, payload, next) => await this.validate(req, payload, next),
    );
    passport.use(this);
  }
  public async validate(req, payload, done) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
