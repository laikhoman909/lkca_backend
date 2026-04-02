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
import { Form6Service } from '../service/form6.service';
import { CreateForm6Dto } from '../dto/create-form6.dto';
  
  
  // ─────────────────────────────────────────────
  // FORM 6
  // ─────────────────────────────────────────────
  @Controller('api/form6')
  export class Form6Controller {
    constructor(private readonly formService: Form6Service) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateForm6Dto) {
      const result = await this.formService.createForm6(dto);
      return { success: true, message: 'Form6 created successfully', data: result };
    }
  
    @Get()
    async findAll() {
      const result = await this.formService.findAllForm6();
      return { success: true, message: 'Form6 list retrieved', data: result };
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.findOneForm6(id);
      return { success: true, message: 'Form6 retrieved', data: result };
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number) {
      const result = await this.formService.removeForm6(id);
      return { success: true, ...result };
    }
  }