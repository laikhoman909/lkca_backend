import { Injectable } from '@nestjs/common';
import { CreateInfoDebiturBadanUsahaDto, UpdateInfoDebiturBadanUsahaDto } from '../dto/info-debitur-badan-usaha.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class InfoDebiturBadanUsahaService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateInfoDebiturBadanUsahaDto) {
    return this.prisma.infoDebiturBadanUsaha.create({
      data: createDto,
    });
  }

  async findAll(pengajuan_kredit_id?: number) {
    if (pengajuan_kredit_id) {
      return this.prisma.infoDebiturBadanUsaha.findMany({
        where: { pengajuan_kredit_id },
      });
    }
    return this.prisma.infoDebiturBadanUsaha.findMany();
  }

  async update(id: number, updateDto: UpdateInfoDebiturBadanUsahaDto) {
    return this.prisma.infoDebiturBadanUsaha.update({
      where: { id },
      data: updateDto,
    });
  }
}