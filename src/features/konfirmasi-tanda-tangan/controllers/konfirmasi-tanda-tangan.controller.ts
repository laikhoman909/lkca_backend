import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { KonfirmasiTandaTanganService } from '../services/konfirmasi-tanda-tangan.service';
import { CreateKonfirmasiTandaTanganDto, UpdateKonfirmasiTandaTanganDto } from '../dto/konfirmasi-tanda-tangan.dto';

@Controller('konfirmasi-tanda-tangan')
export class KonfirmasiTandaTanganController {
  constructor(private readonly service: KonfirmasiTandaTanganService) {}

  @Post()
  create(@Body() createDto: CreateKonfirmasiTandaTanganDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('pengajuan/:pengajuanKreditId')
  findByPengajuanKredit(@Param('pengajuanKreditId', ParseIntPipe) pengajuanKreditId: number) {
    return this.service.findByPengajuanKredit(pengajuanKreditId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateKonfirmasiTandaTanganDto) {
    return this.service.update(id, updateDto);
  }

}