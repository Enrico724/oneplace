import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    const issuer = configService.getOrThrow('AUTH0_ISSUER_URL');
    const audience = configService.getOrThrow('AUTH0_AUDIENCE');
    console.log(issuer, audience)
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuer}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: audience,
      issuer: issuer,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: { sub: string }): Promise<User> {
    Logger.log(payload.sub)
    const filter = { auth0Id: payload.sub };
    try {
      return await this.userService.repository.findOneByOrFail(filter);
    } catch (error) {
      const user = this.userService.repository.create(filter);
      return await this.userService.repository.save(user);
    }
  }
}