import { Module } from '@nestjs/common';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentsService } from './environments.service';

import { MongooseModule } from '@nestjs/mongoose';

import { EnvironmentSchema } from './model/environment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Environment', schema: EnvironmentSchema },
    ]),
  ],
  controllers: [EnvironmentsController],
  providers: [EnvironmentsService],
})
export class EnvironmentsModule {}
