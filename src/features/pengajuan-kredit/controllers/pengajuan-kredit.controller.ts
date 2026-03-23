import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PengajuanKreditService } from '../services/pengajuan-kredit.service';
import { CreatePengajuanKreditDto, UpdatePengajuanKreditDto } from '../dto/pengajuan-kredit.dto';

@Controller('pengajuan-kredit')
export class PengajuanKreditController {
  constructor(private readonly pengajuanKreditService: PengajuanKreditService) {}

  @Post()
  create(@Body() createDto: CreatePengajuanKreditDto) {
    return this.pengajuanKreditService.create(createDto);
  }

  @Get()
  findAll() {
    return this.pengajuanKreditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pengajuanKreditService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePengajuanKreditDto) {
    return this.pengajuanKreditService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pengajuanKreditService.remove(+id);
  }
}