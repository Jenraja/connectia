import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Controller('messages')
export class MessagesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Query() query: any) {
    return { module: 'messages', action: 'list', query };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return { module: 'messages', action: 'get', id };
  }

  @Post()
  async create(@Body() body: any) {
    return { module: 'messages', action: 'create', body };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return { module: 'messages', action: 'update', id, body };
  }
}
