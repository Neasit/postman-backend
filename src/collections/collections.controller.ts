import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { Collection } from './model/collection.model';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async getList(@Param('name') name: string) {
    return await this.collectionsService.getList(name);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.collectionsService.getById(id);
  }

  @Post()
  async create(@Body() requestBody: Collection) {
    return await this.collectionsService.create(requestBody);
  }
}
