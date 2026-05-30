import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Query() query: any) {
    return { module: 'organizations', action: 'list', query };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return { module: 'organizations', action: 'get', id };
  }

  @Post()
  async create(@Body() body: any) {
    return { module: 'organizations', action: 'create', body };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return { module: 'organizations', action: 'update', id, body };
  }
}
