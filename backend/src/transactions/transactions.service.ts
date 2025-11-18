import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto, TransactionResponseDto } from './dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  private mapToDto(transaction: any): TransactionResponseDto {
    return {
      id: transaction.id,
      projectId: transaction.projectId,
      buyerId: transaction.buyerId,
      sellerId: transaction.sellerId,
      amount: transaction.amount,
      timestamp: transaction.createdAt,
    };
  }

  async create(
    createTransactionDto: CreateTransactionDto,
    buyerId: string,
  ): Promise<TransactionResponseDto> {
    const { projectId, sellerId } = createTransactionDto;

    if (buyerId === sellerId) {
      throw new ForbiddenException('Buyer and seller cannot be the same');
    }

    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        buyerId,
      },
    });

    return this.mapToDto(transaction);
  }

  async findAll(): Promise<TransactionResponseDto[]> {
    const transactions = await this.prisma.transaction.findMany();
    return transactions.map(this.mapToDto);
  }

  async findOne(id: string): Promise<TransactionResponseDto> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return this.mapToDto(transaction);
  }

  async findByProjectId(projectId: string): Promise<TransactionResponseDto[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { projectId },
    });
    return transactions.map(this.mapToDto);
  }
}