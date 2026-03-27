import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { InfoDebiturPribadiService } from '../services/info-debitur-pribadi.service';
import { CreateInfoDebiturPribadiDto, UpdateInfoDebiturPribadiDto } from '../dto/info-debitur-pribadi.dto';

@Controller('info-debitur-pribadi')
export class InfoDebiturPribadiController {
  constructor(private readonly service: InfoDebiturPribadiService) {}

  @Post()
  create(@Body() createDto: CreateInfoDebiturPribadiDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll(@Query('pengajuan_kredit_id') pengajuan_kredit_id?: string) {
    const id = pengajuan_kredit_id ? parseInt(pengajuan_kredit_id, 10) : undefined;
    return this.service.findAll(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateInfoDebiturPribadiDto) {
    return this.service.update(id, updateDto);
  }

}