import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Controller('reports')
export class ReportsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Query() query: any) {
    return { module: 'reports', action: 'list', query };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return { module: 'reports', action: 'get', id };
  }

  @Post()
  async create(@Body() body: any) {
    return { module: 'reports', action: 'create', body };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return { module: 'reports', action: 'update', id, body };
  }
}
