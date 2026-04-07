import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseIntPipe } from '@nestjs/common';
import { Form2Service } from '../services/form2.service';
import { CreateForm2Dto, UpdateForm2Dto } from '../dto/create-form2.dto';

@Controller('api/form2')
export class Form2Controller {
  constructor(private readonly form2Service: Form2Service) {}

  @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateForm2Dto) {
      const result = await this.form2Service.createForm2(dto);
      return { success: true, message: 'Form2 created successfully', data: result };
    }
  
    @Get()
    async findAll() {
      const result = await this.form2Service.findAllForm2();
      return { success: true, message: 'Form2 list retrieved', data: result };
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      const result = await this.form2Service.findOneForm2(id);
      return { success: true, message: 'Form2 retrieved', data: result };
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseIntPipe) id: number) {
      const result = await this.form2Service.removeForm2(id);
      return { success: true, ...result };
    }
}