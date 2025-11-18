// src/message/message.controller.ts
import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageResponseDto } from './dto/response-message.dto';
import { JwtAuthGuard } from '../common/utils/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() req,
  ): Promise<MessageResponseDto> {
    const senderId = req.user.userId;
    return this.messageService.create(createMessageDto, senderId);
  }

  @Get()
  async findByChatId(
    @Query('chatId') chatId: string,
  ): Promise<MessageResponseDto[]> {
    if (!chatId) {
      throw new Error('Chat ID is required');
    }
    return this.messageService.findByChatId(chatId);
  }
}