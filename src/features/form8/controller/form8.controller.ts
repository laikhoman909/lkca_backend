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
import { Form8Service } from '../service/form8.service';
import { CreateForm8Dto } from '../dto/create-form8.dto';

// ─────────────────────────────────────────────
// FORM 8
// ─────────────────────────────────────────────
@Controller('api/form8')
export class Form8Controller {
  constructor(private readonly formService: Form8Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateForm8Dto) {
    const result = await this.formService.createForm8(dto);
    return { success: true, message: 'Form8 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm8();
    return { success: true, message: 'Form8 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm8(id);
    return { success: true, message: 'Form8 retrieved', data: result };
  }

  // @Put(':id')
  // async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateForm8Dto) {
  //   const result = await this.formService.updateForm8(id, dto);
  //   return { success: true, message: 'Form8 updated successfully', data: result };
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm8(id);
    return { success: true, ...result };
  }
}