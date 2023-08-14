import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { Environment } from './model/environment.model';

@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Get()
  async getList(@Param('name') name: string) {
    return await this.environmentsService.getList(name);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.environmentsService.getById(id);
  }

  @Post()
  async create(@Body() requestBody: Environment) {
    return await this.environmentsService.create(requestBody);
  }
}
