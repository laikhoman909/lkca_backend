import { Injectable } from '@nestjs/common';
import { CreateInfoDebiturPribadiDto, UpdateInfoDebiturPribadiDto } from '../dto/info-debitur-pribadi.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class InfoDebiturPribadiService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateInfoDebiturPribadiDto) {
    return this.prisma.infoDebiturPribadi.create({
      data: createDto,
    });
  }

  async findAll(pengajuan_kredit_id?: number) {
    if (pengajuan_kredit_id) {
      return this.prisma.infoDebiturPribadi.findMany({
        where: { pengajuan_kredit_id },
      });
    }
    return this.prisma.infoDebiturPribadi.findMany();
  }
  
  async update(id: number, updateDto: UpdateInfoDebiturPribadiDto) {
    return this.prisma.infoDebiturPribadi.update({
      where: { id },
      data: updateDto,
    });
  }
}