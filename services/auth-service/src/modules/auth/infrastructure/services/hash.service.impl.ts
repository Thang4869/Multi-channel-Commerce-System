import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IJwtService, IHashService } from '../../application/interfaces';
import { UserRole } from '../../domain/enums';

@Injectable()
export class HashServiceImpl implements IHashService {
  private readonly rounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.rounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
