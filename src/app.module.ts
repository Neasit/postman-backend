import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectionsModule } from './collections/collections.module';

import { MongooseModule } from '@nestjs/mongoose';
import { RunsModule } from './runs/runs.module';
import { EnvironmentsModule } from './environments/environments.module';

@Module({
  imports: [
    CollectionsModule,
    RunsModule,
    EnvironmentsModule,
    MongooseModule.forRoot(
      'mongodb+srv://danilinaw:Vehvzrf312@cluster0.7vijcja.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
