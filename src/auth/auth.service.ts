import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: any) {
    const { email, password } = req.body
    const user = await this.usersService.findByEmail(email)
    const { role, id } = user;

    const validatedUser = await this.validateUser(email, password);
    if (!validatedUser) throw new UnauthorizedException('Unauthorized user');

    const payload = { email, password, role, id };
    const accessToken = this.jwtService.sign(payload)
    return { accessToken };
  }

  async logout() {
    return {
      token: '',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 0,
    };
  }
}
