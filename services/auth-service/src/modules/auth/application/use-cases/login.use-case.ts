import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository, IJwtService, IHashService, ITokenRepository } from '../interfaces';
import { UserRole } from '../../domain/enums';
import { AuthResponseDto, UserResponseDto } from '../dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService,
    private readonly hashService: IHashService,
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    const isPasswordValid = await this.hashService.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.generateAccessToken(
      user.id,
      user.email,
      user.roles,
    );

    const refreshToken = this.jwtService.generateRefreshToken(user.id);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.tokenRepository.saveRefreshToken(user.id, refreshToken, refreshTokenExpiry);

    return {
      accessToken,
      refreshToken,
      user: this.mapUserToDto(user),
    };
  }

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      roles: user.roles,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
