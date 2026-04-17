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
import { Form12Service } from '../service/form12.service';
import { FormSec12DTO } from '../dto/form-sec12.dto';

// ─────────────────────────────────────────────
// FORM 12
// ─────────────────────────────────────────────
@Controller('api/form12')
export class Form12Controller {
  constructor(private readonly formService: Form12Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: FormSec12DTO) {
    const result = await this.formService.createForm12(dto);
    return { success: true, message: 'Form12 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm12();
    return { success: true, message: 'Form12 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm12(id);
    return { success: true, message: 'Form12 retrieved', data: result };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: FormSec12DTO) {
    const result = await this.formService.updateForm12(id, dto);
    return { success: true, message: 'Form12 updated successfully', data: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm12(id);
    return { success: true, ...result };
  }
}