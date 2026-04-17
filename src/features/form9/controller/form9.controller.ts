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
import { Form9Service } from '../service/form9.service';
import { CreateForm9Dto } from '../dto/create-form9.dto';

// ─────────────────────────────────────────────
// FORM 9
// ─────────────────────────────────────────────
@Controller('api/form9')
export class Form9Controller {
  constructor(private readonly formService: Form9Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateForm9Dto) {
    const result = await this.formService.createForm9(dto);
    return { success: true, message: 'Form9 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm9();
    return { success: true, message: 'Form9 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm9(id);
    return { success: true, message: 'Form9 retrieved', data: result };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateForm9Dto) {
    const result = await this.formService.updateForm9(id, dto);
    return { success: true, message: 'Form9 updated successfully', data: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm9(id);
    return { success: true, ...result };
  }
}