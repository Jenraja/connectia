import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Controller('requests')
export class RequestsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Query() query: any) {
    return { module: 'requests', action: 'list', query };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return { module: 'requests', action: 'get', id };
  }

  @Post()
  async create(@Body() body: any) {
    return { module: 'requests', action: 'create', body };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return { module: 'requests', action: 'update', id, body };
  }
}
