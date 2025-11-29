/**
 * Auth Service
 * Business logic for authentication
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import { SignupInput, LoginInput, AuthResponse } from './auth.types';
import { ConflictError, UnauthorizedError } from '../../shared/utils/errorHandler';
import { env } from '../../config/env';

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async signup(input: SignupInput): Promise<AuthResponse> {
    // Check if user exists
    const existingUser = await this.repository.findUserByEmail(input.email);
    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create user
    const user = await this.repository.createUser({
      ...input,
      password: hashedPassword,
    });

    // Generate token
    const token = this.generateToken(user);

    return {
      token,
      user,
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    // Find user
    const user = await this.repository.findUserByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user);

    const { password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  async getProfile(userId: string) {
    const user = await this.repository.findUserById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    return user;
  }

  private generateToken(user: { id: string; email: string; role: string }): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }
}
