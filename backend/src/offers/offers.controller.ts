import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Controller('offers')
export class OffersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Query() query: any) {
    return { module: 'offers', action: 'list', query };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return { module: 'offers', action: 'get', id };
  }

  @Post()
  async create(@Body() body: any) {
    return { module: 'offers', action: 'create', body };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return { module: 'offers', action: 'update', id, body };
  }
}
