import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository, IJwtService, IHashService, ITokenRepository } from '../interfaces';
import { AuthResponseDto, UserResponseDto } from '../dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('ITokenRepository')
    private readonly tokenRepository: ITokenRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}

  async execute(refreshToken: string): Promise<AuthResponseDto> {
    const tokenData = await this.tokenRepository.findRefreshToken(refreshToken);
    if (!tokenData) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userRepository.findById(tokenData.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newAccessToken = this.jwtService.generateAccessToken(
      user.id,
      user.email,
      user.roles,
    );

    const newRefreshToken = this.jwtService.generateRefreshToken(user.id);
    const newRefreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.tokenRepository.revokeRefreshToken(refreshToken);
    await this.tokenRepository.saveRefreshToken(user.id, newRefreshToken, newRefreshTokenExpiry);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
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
