import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { InfoDebiturBadanUsahaService } from '../services/info-debitur-badan-usaha.service';
import { CreateInfoDebiturBadanUsahaDto, UpdateInfoDebiturBadanUsahaDto } from '../dto/info-debitur-badan-usaha.dto';

@Controller('info-debitur-badan-usaha')
export class InfoDebiturBadanUsahaController {
  constructor(private readonly service: InfoDebiturBadanUsahaService) {}

  @Post()
  create(@Body() createDto: CreateInfoDebiturBadanUsahaDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('pengajuan_kredit_id') pengajuan_kredit_id?: string) {
    const id = pengajuan_kredit_id ? parseInt(pengajuan_kredit_id, 10) : undefined;
    return this.service.findAll(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateInfoDebiturBadanUsahaDto) {
    return this.service.update(id, updateDto);
  }
}