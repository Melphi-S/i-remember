import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VocabularyWordsService } from './vocabulary-words.service';
import { CreateVocabularyWordDto } from './dto/create-vocabulary-word.dto';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('vocabulary-words')
export class VocabularyWordsController {
  constructor(
    private readonly vocabularyWordsService: VocabularyWordsService,
  ) {}

  @Post()
  create(@Body() createVocabularyWordDto: CreateVocabularyWordDto) {
    return this.vocabularyWordsService.create(createVocabularyWordDto);
  }


  @Patch(':id/increase')
  increaseStatus(@AuthUser() user: User, @Param('id') id: number) {
    return this.vocabularyWordsService.increaseStatus(user.id, id);
  }

  @Patch(':id/decrease/:step')
  decreaseStatus(
    @AuthUser() user: User,
    @Param('id') id: number,
    @Param('step') step: number,
  ) {
    return this.vocabularyWordsService.decreaseStatus(user.id, id, step);
  }

  @Patch(':id/accept')
  acceptWord(@AuthUser() user: User, @Param('id') id: number) {
    return this.vocabularyWordsService.acceptWord(user.id, id);
  }

  @Patch(':id/reject')
  rejectWord(@AuthUser() user: User, @Param('id') id: number) {
    return this.vocabularyWordsService.rejectWord(user.id, id);
  }
}
