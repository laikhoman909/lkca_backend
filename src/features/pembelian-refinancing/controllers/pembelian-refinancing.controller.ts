import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { PembelianRefinancingService } from '../services/pembelian-refinancing.service';
import { CreatePembelianRefinancingDto, UpdatePembelianRefinancingDto } from '../dto/pembelian-refinancing.dto';

@Controller('pembelian-refinancing')
export class PembelianRefinancingController {
  constructor(private readonly service: PembelianRefinancingService) {}

  @Post()
  create(@Body() createDto: CreatePembelianRefinancingDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('pengajuan_kredit_id') pengajuan_kredit_id?: string) {
    const id = pengajuan_kredit_id ? parseInt(pengajuan_kredit_id, 10) : undefined;
    return this.service.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdatePembelianRefinancingDto) {
    return this.service.update(id, updateDto);
  }

}