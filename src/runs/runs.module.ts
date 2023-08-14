import { Module } from '@nestjs/common';
import { RunsController } from './runs.controller';
import { RunsService } from './runs.service';

import { MongooseModule } from '@nestjs/mongoose';

import { RunSchema } from './model/run.model';
import { CollectionSchema } from '../collections/model/collection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Run', schema: RunSchema },
      { name: 'Collection', schema: CollectionSchema },
    ]),
  ],
  controllers: [RunsController],
  providers: [RunsService],
})
export class RunsModule {}
