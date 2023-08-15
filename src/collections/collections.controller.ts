import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() requestBody: Collection) {
    return await this.collectionsService.updateCollection(id, requestBody);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.collectionsService.delete(id);
  }
}
