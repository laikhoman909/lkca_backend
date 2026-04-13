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
import { Form7Service } from '../service/form7.service';
import { CreateForm7Dto } from '../dto/create-form7.dto';

// ─────────────────────────────────────────────
// FORM 7
// ─────────────────────────────────────────────
@Controller('api/form7')
export class Form7Controller {
  constructor(private readonly formService: Form7Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateForm7Dto) {
    const result = await this.formService.createForm7(dto);
    return { success: true, message: 'Form7 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm7();
    return { success: true, message: 'Form7 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm7(id);
    return { success: true, message: 'Form7 retrieved', data: result };
  }

  // @Put(':id')
  // async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateFormDto) {
  //   const result = await this.formService.updateForm7(id, dto);
  //   return { success: true, message: 'Form7 updated successfully', data: result };
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm7(id);
    return { success: true, ...result };
  }
}