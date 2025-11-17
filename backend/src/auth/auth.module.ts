import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';


const jwtOptions: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'secret-key',
  signOptions: { 
    expiresIn: '1d' 
  },
};

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register(jwtOptions),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}