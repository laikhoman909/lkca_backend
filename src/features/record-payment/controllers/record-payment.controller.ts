import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordPaymentService } from '../services/record-payment.service';
import { CreateRecordPaymentDto, UpdateRecordPaymentDto } from '../dto/record-payment.dto';

@Controller('record-payment')
export class RecordPaymentController {
  constructor(private readonly recordPaymentService: RecordPaymentService) {}

  @Post()
  create(@Body() createDto: CreateRecordPaymentDto) {
    return this.recordPaymentService.create(createDto);
  }

  @Post('bulk')
  createBulk(@Body() createDtos: CreateRecordPaymentDto[]) {
    return this.recordPaymentService.createBulk(createDtos);
  }

  @Get()
  findAll() {
    return this.recordPaymentService.findAll();
  }

  @Get('pengajuan/:pengajuanId')
  findByPengajuanId(@Param('pengajuanId') pengajuanId: string) {
    return this.recordPaymentService.findByPengajuanId(+pengajuanId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRecordPaymentDto) {
    return this.recordPaymentService.update(+id, updateDto);
  }

}