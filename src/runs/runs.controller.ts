import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RunsService } from './runs.service';
import { Run } from './model/run.model';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  async getList(@Param('date') date: Date) {
    return await this.runsService.getList(date);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.runsService.getById(id);
  }

  @Post()
  async create(@Body() requestBody: Run) {
    return await this.runsService.createRun(requestBody);
  }
}
