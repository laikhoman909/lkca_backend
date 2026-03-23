import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoDebiturDto, UpdateInfoDebiturDto } from '../dto/info-debitur.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class InfoDebiturService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateInfoDebiturDto) {
    return await this.prisma.infoDebitur.create({
      data: createDto,
    });
  }

  async findAll() {
    return await this.prisma.infoDebitur.findMany({
      include: { pengajuan_kredit: true },
    });
  }

  async findOne(id: number) {
    const infoDebitur = await this.prisma.infoDebitur.findUnique({
      where: { id },
      include: { pengajuan_kredit: true },
    });
    if (!infoDebitur) {
      throw new NotFoundException(`Info Debitur dengan ID ${id} tidak ditemukan`);
    }
    return infoDebitur;
  }

  async findByPengajuanId(pengajuanKreditId: number) {
    return await this.prisma.infoDebitur.findMany({
      where: { pengajuan_kredit_id: pengajuanKreditId },
    });
  }

  async update(id: number, updateDto: UpdateInfoDebiturDto) {
    await this.findOne(id);
    return await this.prisma.infoDebitur.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.infoDebitur.delete({
      where: { id },
    });
    return { message: `Info Debitur dengan ID ${id} berhasil dihapus` };
  }
}