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
import { Form1Service } from '../service/form1.service';
import { CreateForm1Dto } from '../dto/create-form1.dto';
  
  
  // ─────────────────────────────────────────────
  // FORM 1
  // ─────────────────────────────────────────────
  @Controller('api/form1')
  export class Form1Controller {
    constructor(private readonly formService: Form1Service) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateForm1Dto) {
      const result = await this.formService.createForm1(dto);
      return { success: true, message: 'Form1 created successfully', data: result };
    }
  
    @Get()
    async findAll() {
      const result = await this.formService.findAllForm1();
      return { success: true, message: 'Form1 list retrieved', data: result };
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.findOneForm1(id);
      return { success: true, message: 'Form1 retrieved', data: result };
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.removeForm1(id);
      return { success: true, ...result };
    }
  }