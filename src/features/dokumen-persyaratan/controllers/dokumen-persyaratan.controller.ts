import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DokumenPersyaratanService } from '../services/dokumen-persyaratan.service';
import { CreateDokumenPersyaratanDto, UpdateDokumenPersyaratanDto } from '../dto/dokumen-persyaratan.dto';

@Controller('dokumen-persyaratan')
export class DokumenPersyaratanController {
  constructor(private readonly dokumenPersyaratanService: DokumenPersyaratanService) {}

  @Post()
  create(@Body() createDto: CreateDokumenPersyaratanDto) {
    return this.dokumenPersyaratanService.create(createDto);
  }

  @Post('bulk')
  createBulk(@Body() createDtos: CreateDokumenPersyaratanDto[]) {
    return this.dokumenPersyaratanService.createBulk(createDtos);
  }

  @Get()
  findAll() {
    return this.dokumenPersyaratanService.findAll();
  }

  @Get('pengajuan/:pengajuanId')
  findByPengajuanId(@Param('pengajuanId') pengajuanId: string) {
    return this.dokumenPersyaratanService.findByPengajuanId(+pengajuanId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDokumenPersyaratanDto) {
    return this.dokumenPersyaratanService.update(+id, updateDto);
  }
}