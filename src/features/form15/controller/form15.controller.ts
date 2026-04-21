import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Form15Service } from '../service/form15.service';
import { FooterDTO } from '../dto/footer.dto';

// ─────────────────────────────────────────────
// FORM 15
// ─────────────────────────────────────────────
@Controller('api/form15')
export class Form15Controller {
  constructor(private readonly formService: Form15Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: FooterDTO) {
    const result = await this.formService.createForm15(dto);
    return { success: true, message: 'Form15 created successfully', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm15(id);
    return { success: true, message: 'Form15 retrieved', data: result };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: FooterDTO) {
    const result = await this.formService.updateForm15(id, dto);
    return { success: true, message: 'Form15 updated successfully', data: result };
  }
}