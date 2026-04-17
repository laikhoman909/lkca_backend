import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Form14Service } from '../service/form14.service';
import { FormSec14DTO } from '../dto/form-sec14.dto';

// ─────────────────────────────────────────────
// FORM 14
// ─────────────────────────────────────────────
@Controller('api/form14')
export class Form14Controller {
  constructor(private readonly formService: Form14Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: FormSec14DTO) {
    const result = await this.formService.createForm14(dto);
    return { success: true, message: 'Form14 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm14();
    return { success: true, message: 'Form14 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm14(id);
    return { success: true, message: 'Form14 retrieved', data: result };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: FormSec14DTO) {
    const result = await this.formService.updateForm14(id, dto);
    return { success: true, message: 'Form14 updated successfully', data: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm14(id);
    return { success: true, ...result };
  }
}