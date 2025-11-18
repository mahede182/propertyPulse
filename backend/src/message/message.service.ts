import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageResponseDto } from './dto/response-message.dto';
;

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  private mapToDto(message: any): MessageResponseDto {
    return {
      id: message.id,
      chatId: message.chatId,
      senderId: message.senderId,
      content: message.content,
      timestamp: message.createdAt,
    };
  }

  async create(createMessageDto: CreateMessageDto, senderId: string): Promise<MessageResponseDto> {
    const { chatId, content } = createMessageDto;

    // Verify chat exists
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { participants: true }
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    // Verify sender is a participant
    const isParticipant = chat.participants.some(p => p.id === senderId);
    if (!isParticipant) {
      throw new NotFoundException('You are not a participant in this chat');
    }

    const message = await this.prisma.message.create({
      data: {
        chatId,
        senderId,
        content,
      },
    });

    return this.mapToDto(message);
  }

  async findByChatId(chatId: string): Promise<MessageResponseDto[]> {
    const messages = await this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
    });

    return messages.map(this.mapToDto);
  }
}
