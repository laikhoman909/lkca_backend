import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfoDebiturService } from '../services/info-debitur.service';
import { CreateInfoDebiturDto, UpdateInfoDebiturDto } from '../dto/info-debitur.dto';

@Controller('info-debitur')
export class InfoDebiturController {
  constructor(private readonly infoDebiturService: InfoDebiturService) {}

  @Post()
  create(@Body() createDto: CreateInfoDebiturDto) {
    return this.infoDebiturService.create(createDto);
  }

  @Get()
  findAll() {
    return this.infoDebiturService.findAll();
  }

  @Get('pengajuan/:pengajuanId')
  findByPengajuanId(@Param('pengajuanId') pengajuanId: string) {
    return this.infoDebiturService.findByPengajuanId(+pengajuanId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infoDebiturService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateInfoDebiturDto) {
    return this.infoDebiturService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoDebiturService.remove(+id);
  }
}