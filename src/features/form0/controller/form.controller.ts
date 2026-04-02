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
import { FormService } from '../service/form.service';
import {
  CreateFormDto,
} from '../dto/create-form.dto';

// ─────────────────────────────────────────────
// PRESETS - Get predefined KeyValue options
// ─────────────────────────────────────────────
@Controller('api/presets')
export class PresetsController {
  constructor(private readonly formService: FormService) {}

  @Get()
  async getPresets(@Query('group') group: string) {
    const result = await this.formService.getPresets(group);
    return { success: true, message: `Presets for group "${group}"`, data: result };
  }
}

// ─────────────────────────────────────────────
// FORM 0
// ─────────────────────────────────────────────
@Controller('api/form0')
export class Form0Controller {
  constructor(private readonly formService: FormService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateFormDto) {
    const result = await this.formService.createForm0(dto);
    return { success: true, message: 'Form0 created successfully', data: result };
  }

  @Get()
  async findAll() {
    const result = await this.formService.findAllForm0();
    return { success: true, message: 'Form0 list retrieved', data: result };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.findOneForm0(id);
    return { success: true, message: 'Form0 retrieved', data: result };
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateFormDto) {
    const result = await this.formService.updateForm0(id, dto);
    return { success: true, message: 'Form0 updated successfully', data: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.formService.removeForm0(id);
    return { success: true, ...result };
  }
}