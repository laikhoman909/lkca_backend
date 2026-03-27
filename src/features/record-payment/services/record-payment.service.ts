import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordPaymentDto, UpdateRecordPaymentDto } from '../dto/record-payment.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class RecordPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateRecordPaymentDto) {
    return await this.prisma.recordPayment.create({
      data: createDto,
    });
  }

  async createBulk(createDtos: CreateRecordPaymentDto[]) {
    return await this.prisma.recordPayment.createMany({
      data: createDtos,
    });
  }

  async findAll() {
    return await this.prisma.recordPayment.findMany({
      include: { pengajuan_kredit: true },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.recordPayment.findUnique({
      where: { id },
      include: { pengajuan_kredit: true },
    });
    if (!record) {
      throw new NotFoundException(`Record Payment dengan ID ${id} tidak ditemukan`);
    }
    return record;
  }

  async findByPengajuanId(pengajuanKreditId: number) {
    return await this.prisma.recordPayment.findMany({
      where: { pengajuan_kredit_id: pengajuanKreditId },
    });
  }

  async update(id: number, updateDto: UpdateRecordPaymentDto) {
    await this.findOne(id);
    return await this.prisma.recordPayment.update({
      where: { id },
      data: updateDto,
    });
  }

}