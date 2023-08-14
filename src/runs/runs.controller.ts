import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RunsService } from './runs.service';
import { Run } from './model/run.model';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  getList(@Param('date') date: Date): string {
    return this.runsService.getList(date);
  }

  @Post()
  async create(@Body() requestBody: Run) {
    return await this.runsService.createRun(requestBody);
  }
}
