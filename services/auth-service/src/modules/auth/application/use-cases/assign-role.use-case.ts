import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository, IJwtService, IHashService, ITokenRepository } from '../interfaces';
import { UserRole } from '../../domain/enums';
import { AuthResponseDto, UserResponseDto } from '../dto';

@Injectable()
export class AssignRoleUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, role: UserRole): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userRepository.addRole(userId, role);
    return this.mapUserToDto(updatedUser);
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
