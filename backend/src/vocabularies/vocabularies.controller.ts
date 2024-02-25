import { Controller, Get, Param } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';

@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.vocabulariesService.findById(id);
  }
}
