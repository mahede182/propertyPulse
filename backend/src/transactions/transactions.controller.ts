import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, TransactionResponseDto } from './dto';
import { JwtAuthGuard } from 'src/common/utils/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req,
  ): Promise<TransactionResponseDto> {
    const buyerId = req.user.userId;
    return this.transactionsService.create(createTransactionDto, buyerId);
  }

  @Get()
  async findByProject(
    @Query('projectId') projectId: string,
  ): Promise<TransactionResponseDto[]> {
    if (!projectId) {
      throw new Error('Project ID is required');
    }
    return this.transactionsService.findByProjectId(projectId);
  }
}