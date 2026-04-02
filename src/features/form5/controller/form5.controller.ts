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
import { Form5Service } from '../service/form5.service';
import { CreateForm5Dto } from '../dto/create-form5.dto';
  
  // ─────────────────────────────────────────────
  // FORM 5
  // ─────────────────────────────────────────────
  @Controller('api/form5')
  export class Form5Controller {
    constructor(private readonly formService: Form5Service) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateForm5Dto) {
      const result = await this.formService.createForm5(dto);
      return { success: true, message: 'Form5 created successfully', data: result };
    }
  
    @Get()
    async findAll() {
      const result = await this.formService.findAllForm5();
      return { success: true, message: 'Form5 list retrieved', data: result };
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.findOneForm5(id);
      return { success: true, message: 'Form5 retrieved', data: result };
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.removeForm5(id);
      return { success: true, ...result };
    }
  }