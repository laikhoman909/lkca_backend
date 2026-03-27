import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { KronologisTransaksiService } from '../services/kronologis-transaksi.service';
import { CreateKronologisTransaksiDto, UpdateKronologisTransaksiDto } from '../dto/kronologis-transaksi.dto';

@Controller('kronologis-transaksi')
export class KronologisTransaksiController {
  constructor(private readonly service: KronologisTransaksiService) {}

  @Post()
  create(@Body() createDto: CreateKronologisTransaksiDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateKronologisTransaksiDto) {
    return this.service.update(id, updateDto);
  }

}