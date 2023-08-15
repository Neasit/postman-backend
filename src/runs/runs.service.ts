import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Run, status } from './model/run.model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from 'src/collections/model/collection.model';
import { Environment } from 'src/environments/model/environment.model';
import { Collection as PostmanCollection } from 'postman-collection';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const runtime = require('postman-runtime');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const newman = require('newman');
const runner = new runtime.Runner();

@Injectable()
export class RunsService {
  constructor(
    @InjectModel('Run')
    private readonly runsModel: Model<Run>,
    @InjectModel('Collection')
    private readonly collectionModel: Model<Collection>,
    @InjectModel('Environment')
    private readonly environmentModel: Model<Environment>,
  ) {}

  startCollectionRunner(collection: PostmanCollection) {
    return new Promise(function (resolve, reject) {
      runner.run(collection, null, function (err, run) {
        if (err) {
          reject(err);
        } else {
          run.start({
            done: function (error) {
              if (error) {
                reject(error);
              } else {
                resolve('Done');
              }
            },
          });
        }
      });
    });
  }

  startCollectionNewman(
    collection: PostmanCollection,
    environment?: Environment,
  ) {
    return new Promise(function (resolve, reject) {
      newman.run(
        {
          collection: collection,
          reporters: 'cli',
          environment: environment || '',
        },
        function (err, summary) {
          if (err) {
            reject(err);
          } else {
            resolve(summary);
          }
        },
      );
    });
  }

  getList(date: Date): any {
    return this.readRuns(date);
  }

  async readRuns(date?: Date): Promise<Run[]> {
    const runs = this.runsModel
      .find(date ? { date: { $ge: date } } : null)
      .exec();
    return runs;
  }

  async getById(id: string) {
    let run;
    try {
      run = this.runsModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Run not found with provided id');
    }
    return run;
  }

  async createRun(run: Run) {
    let oCollection;
    let oEnvironment;
    try {
      oCollection = await this.collectionModel
        .findById(run.collectionId)
        .exec();
    } catch (error) {
      throw new NotFoundException('Collection not found!');
    }
    try {
      oEnvironment = await this.environmentModel
        .findById(run.environmentId)
        .exec();
    } catch (error) {
      console.warn('Evironment was not found');
      // throw new NotFoundException('Environment not found!');
    }
    // TODO - add also request
    run.request = null;
    run.date = new Date();
    run.status = status.pending;
    const newRun = new this.runsModel(run);
    const result = await newRun.save();

    this.startCollectionNewman(
      new PostmanCollection(oCollection.toJSON(), oEnvironment || null),
    )
      .then(
        function (summary) {
          console.info(summary);
          this.updateStatusAndSaveData(
            result._id,
            status.success,
            JSON.stringify(summary),
          );
        }.bind(this),
      )
      .catch(
        function (error) {
          // update status of run and save data
          console.info(error);
          this.updateStatusAndSaveData(
            result._id,
            status.faild,
            JSON.stringify(error),
          );
        }.bind(this),
      );

    return result;
  }

  async updateStatusAndSaveData(id: string, status: string, data?: string) {
    let run;
    try {
      run = await this.runsModel
        .updateOne({ _id: id }, { status: status, report: data || '' })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return run;
  }
}
