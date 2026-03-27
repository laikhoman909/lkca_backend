import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfoUsahaService } from '../services/info-usaha.service';
import { CreateInfoUsahaDto, UpdateInfoUsahaDto } from '../dto/info-usaha.dto';

@Controller('info-usaha')
export class InfoUsahaController {
  constructor(private readonly infoUsahaService: InfoUsahaService) {}

  @Post()
  create(@Body() createDto: CreateInfoUsahaDto) {
    return this.infoUsahaService.create(createDto);
  }

  @Get()
  findAll() {
    return this.infoUsahaService.findAll();
  }

  @Get('pengajuan/:pengajuanId')
  findByPengajuanId(@Param('pengajuanId') pengajuanId: string) {
    return this.infoUsahaService.findByPengajuanId(+pengajuanId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateInfoUsahaDto) {
    return this.infoUsahaService.update(+id, updateDto);
  }

}