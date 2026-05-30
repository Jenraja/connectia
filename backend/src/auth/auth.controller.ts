import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Post('register')
  async register(@Body() body: any) {
    return { next: 'hash-password-and-create-user', received: body };
  }

  @Post('login')
  async login(@Body() body: any) {
    return { next: 'validate-user-and-return-jwt', received: { email: body.email } };
  }
}
