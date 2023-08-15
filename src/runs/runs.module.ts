import { Module } from '@nestjs/common';
import { RunsController } from './runs.controller';
import { RunsService } from './runs.service';

import { MongooseModule } from '@nestjs/mongoose';

import { RunSchema } from './model/run.model';
import { EnvironmentSchema } from '../environments/model/environment.model';
import { CollectionSchema } from '../collections/model/collection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Run', schema: RunSchema },
      { name: 'Environment', schema: EnvironmentSchema },
      { name: 'Collection', schema: CollectionSchema },
    ]),
  ],
  controllers: [RunsController],
  providers: [RunsService],
})
export class RunsModule {}
