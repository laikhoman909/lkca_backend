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
import { Form10Service } from '../service/form10.service';
import { CreateForm10Dto } from '../dto/create-form10.dto';

// ─────────────────────────────────────────────
// FORM 10
// ─────────────────────────────────────────────
@Controller('api/form10')
export class Form10Controller {
  constructor(private readonly formService: Form10Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateForm10Dto) {
    const result = await this.formService.createForm10(dto);
    return { success: true, message: 'Form10 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm10();
    return { success: true, message: 'Form10 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm10(id);
    return { success: true, message: 'Form10 retrieved', data: result };
  }

  // @Put(':id')
  // async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateFormDto) {
  //   const result = await this.formService.updateForm10(id, dto);
  //   return { success: true, message: 'Form10 updated successfully', data: result };
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm10(id);
    return { success: true, ...result };
  }
}