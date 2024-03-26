import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@UseGuards(JwtGuard)
@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vocabulariesService.findById(id);
  }

  @Patch('getFirst')
  async getFirst(@AuthUser() user: User) {
    return this.vocabulariesService.getNewWords(
      user.vocabulary.id,
      user.id,
      user.wordsPerDay,
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async distributeBySchedule() {
    return this.vocabulariesService.distributeBySchedule();
  }
}
