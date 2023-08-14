import { Injectable } from '@nestjs/common';
import { Run } from './model/run.model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from 'src/collections/model/collection.model';
import { Collection as PostmanCollection } from 'postman-collection';

const runtime = require('postman-runtime');
const newman = require('newman');
const runner = new runtime.Runner();

@Injectable()
export class RunsService {
  constructor(
    @InjectModel('Run')
    private readonly runsModel: Model<Run>,
    @InjectModel('Collection')
    private readonly collectionModel: Model<Collection>,
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

  startCollectionNewman(collection: PostmanCollection) {
    return new Promise(function (resolve, reject) {
      newman.run(
        { collection: collection, reporters: 'cli', environment: '' },
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

  readRuns(date: Date): Run[] {
    return [];
  }

  async createRun(run: Run) {
    const oCollection = await this.collectionModel
      .findById(run.collectionId)
      .exec();
    const sCollection = oCollection.toJSON();
    this.startCollectionNewman(new PostmanCollection(sCollection))
      .then(function (summary) {
        console.info('DONE COLLECTION!');
        console.info(summary);
      })
      .catch(function (error) {
        //
        console.info(error);
      });
    return 'started';
  }
}
