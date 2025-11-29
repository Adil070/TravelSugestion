/**
 * User Service
 * Business logic for user management
 */
import { UserRepository } from './user.repository';
import { UpdateUserInput } from './user.types';
import { NotFoundError } from '../../shared/utils/errorHandler';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers() {
    return this.repository.findAll();
  }

  async getUserById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return this.repository.update(id, data);
  }

  async deleteUser(id: string) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return this.repository.delete(id);
  }
}
