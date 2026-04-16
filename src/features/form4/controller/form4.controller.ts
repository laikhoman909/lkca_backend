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
import { Form4Service } from '../service/form4.service';
import { CreateForm4Dto } from '../dto/create-form4.dto';
  
  
  // ─────────────────────────────────────────────
  // FORM 4
  // ─────────────────────────────────────────────
  @Controller('api/form4')
  export class Form4Controller {
    constructor(private readonly formService: Form4Service) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateForm4Dto) {
      const result = await this.formService.createForm4(dto);
      return { success: true, message: 'Form4 created successfully', data: result };
    }
  
    @Get()
    async findAll() {
      const result = await this.formService.findAllForm4();
      return { success: true, message: 'Form4 list retrieved', data: result };
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.findOneForm4(id);
      return { success: true, message: 'Form4 retrieved', data: result };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateForm4Dto) {
      const result = await this.formService.updateForm4(id, dto);
      return { success: true, message: 'Form4 updated successfully', data: result };
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.removeForm4(id);
      return { success: true, ...result };
    }
  }