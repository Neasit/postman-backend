import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Environment } from './model/environment.model';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

@Injectable()
export class EnvironmentsService {
  constructor(
    @InjectModel('Environment')
    private readonly environmentModel: Model<Environment>,
  ) {}

  async getList(name: string) {
    return await this.readEnvironmentsByName(name);
  }

  async getById(id: string) {
    try {
      const oEnvironment = await this.environmentModel.findById(id).exec();
      return oEnvironment;
    } catch (error) {
      throw new NotFoundException('Environment with provided id not found');
    }
  }

  async readEnvironmentsByName(name: string): Promise<Environment[]> {
    try {
      const aEnvironments = await this.environmentModel.find().exec();
      if (name) {
        return aEnvironments.filter((item) => item.name === name);
      }
      return aEnvironments;
    } catch (error) {
      throw new InternalServerErrorException(error.getText());
    }
  }

  async create(environmentIn: Environment): Promise<Environment> {
    const newEnvironment = new this.environmentModel(environmentIn);
    const result = await newEnvironment.save();
    return result;
  }
}
