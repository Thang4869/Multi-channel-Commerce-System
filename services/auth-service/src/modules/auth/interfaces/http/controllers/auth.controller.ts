// ============================================
// INTERFACES - CONTROLLERS
// ============================================

import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { LoginDto, RegisterDto, RefreshTokenDto, AssignRoleDto } from '../../../application/dto';
import {
  LoginUseCase,
  RegisterUseCase,
  RefreshTokenUseCase,
  AssignRoleUseCase,
} from '../../../application/use-cases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly assignRoleUseCase: AssignRoleUseCase,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return await this.loginUseCase.execute(loginDto.email, loginDto.password);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    return await this.registerUseCase.execute(
      registerDto.email,
      registerDto.password,
      registerDto.fullName,
      registerDto.phone,
      registerDto.role,
    );
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenUseCase.execute(refreshTokenDto.refreshToken);
  }

  @Get('me')
  async getCurrentUser(@Request() req: { user: any }): Promise<any> {
    return req.user;
  }

  @Patch('users/:userId/roles')
  async assignRole(
    @Param('userId') userId: string,
    @Body() assignRoleDto: AssignRoleDto,
  ) {
    return await this.assignRoleUseCase.execute(userId, assignRoleDto.role);
  }
}
