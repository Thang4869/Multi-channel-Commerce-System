import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository, IJwtService, IHashService, ITokenRepository } from '../interfaces';
import { UserRole } from '../../domain/enums';
import { AuthResponseDto, UserResponseDto } from '../dto';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService,
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(
    email: string,
    password: string,
    fullName: string,
    phone: string,
    role: UserRole,
  ): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await this.hashService.hash(password);

    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      phone,
      roles: [role],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.create(user);

    const accessToken = this.jwtService.generateAccessToken(
      createdUser.id,
      createdUser.email,
      createdUser.roles,
    );

    const refreshToken = this.jwtService.generateRefreshToken(createdUser.id);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.tokenRepository.saveRefreshToken(createdUser.id, refreshToken, refreshTokenExpiry);

    return {
      accessToken,
      refreshToken,
      user: this.mapUserToDto(createdUser),
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
