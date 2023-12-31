import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Collection } from './model/collection.model';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel('Collection')
    private readonly collectionModel: Model<Collection>,
  ) {}

  async getList(name: string) {
    return await this.readCollectionsByName(name);
  }

  async getById(id: string) {
    try {
      const oCollection = await this.collectionModel.findById(id).exec();
      return oCollection;
    } catch (error) {
      throw new NotFoundException('Collection with provided id not found');
    }
  }

  async readCollectionsByName(name: string): Promise<Collection[]> {
    try {
      const aCollections = await this.collectionModel.find().exec();
      if (name) {
        return aCollections.filter((item) => item.info.name === name);
      }
      return aCollections;
    } catch (error) {
      throw new InternalServerErrorException(error.getText());
    }
  }

  async create(collectionIn: Collection): Promise<Collection> {
    const newCollection = new this.collectionModel(collectionIn);
    const result = await newCollection.save();
    return result;
  }

  async updateCollection(id: string, data: Collection) {
    // const oCollection = this.getById(id);

    const result = await this.collectionModel.updateOne(
      { _id: id },
      {
        info: data.info,
        item: data.item,
        event: data.event,
        auth: data.auth,
        variable: data.variable || null,
      },
    );

    if (result.modifiedCount == 0) {
      throw new InternalServerErrorException('Problem with update collection!');
    }
    return id;
  }

  async delete(id: string) {
    const result = await this.collectionModel.deleteOne({ _id: id });

    if (result.deletedCount == 0) {
      throw new InternalServerErrorException('Problem with delete collection!');
    }
    return id;
  }
}
