import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MutasiRekeningService } from '../services/mutasi-rekening.service';
import { CreateMutasiRekeningDto, UpdateMutasiRekeningDto } from '../dto/mutasi-rekening.dto';

@Controller('mutasi-rekening')
export class MutasiRekeningController {
  constructor(private readonly mutasiRekeningService: MutasiRekeningService) {}

  @Post()
  create(@Body() createDto: CreateMutasiRekeningDto) {
    return this.mutasiRekeningService.create(createDto);
  }

  @Post('bulk')
  createBulk(@Body() createDtos: CreateMutasiRekeningDto[]) {
    return this.mutasiRekeningService.createBulk(createDtos);
  }

  @Get()
  findAll() {
    return this.mutasiRekeningService.findAll();
  }

  @Get('pengajuan/:pengajuanId')
  findByPengajuanId(@Param('pengajuanId') pengajuanId: string) {
    return this.mutasiRekeningService.findByPengajuanId(+pengajuanId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMutasiRekeningDto) {
    return this.mutasiRekeningService.update(+id, updateDto);
  }
}