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
import { Form3Service } from '../service/form3.service';
import { CreateForm3Dto } from '../dto/create-form3.dto';
  
  
  // ─────────────────────────────────────────────
  // FORM 1
  // ─────────────────────────────────────────────
  @Controller('api/form3')
  export class Form3Controller {
    constructor(private readonly formService: Form3Service) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateForm3Dto) {
      const result = await this.formService.createForm3(dto);
      return { success: true, message: 'Form3 created successfully', data: result };
    }
  
    @Get()
    async findAll() {
      const result = await this.formService.findAllForm3();
      return { success: true, message: 'Form3 list retrieved', data: result };
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.findOneForm3(id);
      return { success: true, message: 'Form3 retrieved', data: result };
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.removeForm3(id);
      return { success: true, ...result };
    }
  }