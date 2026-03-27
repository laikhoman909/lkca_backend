import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoUsahaDto, UpdateInfoUsahaDto } from '../dto/info-usaha.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class InfoUsahaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateInfoUsahaDto) {
    return await this.prisma.infoUsaha.create({
      data: createDto,
    });
  }

  async findAll() {
    return await this.prisma.infoUsaha.findMany({
      include: { pengajuan_kredit: true },
    });
  }

  async findOne(id: number) {
    const infoUsaha = await this.prisma.infoUsaha.findUnique({
      where: { id },
      include: { pengajuan_kredit: true },
    });
    if (!infoUsaha) {
      throw new NotFoundException(`Info Usaha dengan ID ${id} tidak ditemukan`);
    }
    return infoUsaha;
  }

  async findByPengajuanId(pengajuanKreditId: number) {
    return await this.prisma.infoUsaha.findMany({
      where: { pengajuan_kredit_id: pengajuanKreditId },
    });
  }

  async update(id: number, updateDto: UpdateInfoUsahaDto) {
    await this.findOne(id);
    return await this.prisma.infoUsaha.update({
      where: { id },
      data: updateDto,
    });
  }
}