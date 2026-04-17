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
import { Form13Service } from '../service/form13.service';
import { FormSec13DTO } from '../dto/form-sec13.dto';

// ─────────────────────────────────────────────
// FORM 13
// ─────────────────────────────────────────────
@Controller('api/form13')
export class Form13Controller {
  constructor(private readonly formService: Form13Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: FormSec13DTO) {
    const result = await this.formService.createForm13(dto);
    return { success: true, message: 'Form13 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm13();
    return { success: true, message: 'Form13 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm13(id);
    return { success: true, message: 'Form13 retrieved', data: result };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: FormSec13DTO) {
    const result = await this.formService.updateForm13(id, dto);
    return { success: true, message: 'Form13 updated successfully', data: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm13(id);
    return { success: true, ...result };
  }
}