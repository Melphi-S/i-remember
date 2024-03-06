import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vocabulariesService.findById(id);
  }
}
