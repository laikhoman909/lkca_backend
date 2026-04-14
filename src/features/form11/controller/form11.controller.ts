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
import { Form11Service } from '../service/form11.service';
import { FormSec11DTO } from '../dto/form-sec11.dto';

// ─────────────────────────────────────────────
// FORM 11
// ─────────────────────────────────────────────
@Controller('api/form11')
export class Form11Controller {
  constructor(private readonly formService: Form11Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: FormSec11DTO) {
    const result = await this.formService.createForm11(dto);
    return { success: true, message: 'Form11 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm11();
    return { success: true, message: 'Form11 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm11(id);
    return { success: true, message: 'Form11 retrieved', data: result };
  }

  // @Put(':id')
  // async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateFormDto) {
  //   const result = await this.formService.updateForm11(id, dto);
  //   return { success: true, message: 'Form11 updated successfully', data: result };
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm11(id);
    return { success: true, ...result };
  }
}