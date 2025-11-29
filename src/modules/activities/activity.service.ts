/**
 * Activity Service
 */
import { ActivityRepository } from './activity.repository';
import { CreateActivityInput, UpdateActivityInput } from './activity.types';
import { NotFoundError } from '../../shared/utils/errorHandler';

export class ActivityService {
  private repository: ActivityRepository;

  constructor() {
    this.repository = new ActivityRepository();
  }

  async getAllActivities() {
    return this.repository.findAll();
  }

  async getActivityById(id: string) {
    const activity = await this.repository.findById(id);
    if (!activity) {
      throw new NotFoundError('Activity not found');
    }
    return activity;
  }

  async createActivity(data: CreateActivityInput) {
    return this.repository.create(data);
  }

  async updateActivity(id: string, data: UpdateActivityInput) {
    const activity = await this.repository.findById(id);
    if (!activity) {
      throw new NotFoundError('Activity not found');
    }
    return this.repository.update(id, data);
  }

  async deleteActivity(id: string) {
    const activity = await this.repository.findById(id);
    if (!activity) {
      throw new NotFoundError('Activity not found');
    }
    return this.repository.delete(id);
  }
}
