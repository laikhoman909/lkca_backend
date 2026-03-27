import { Injectable } from '@nestjs/common';
import { CreatePembelianRefinancingDto, UpdatePembelianRefinancingDto } from '../dto/pembelian-refinancing.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class PembelianRefinancingService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreatePembelianRefinancingDto) {
    return this.prisma.pembelianRefinancing.create({
      data: createDto,
    });
  }

  async findAll(pengajuan_kredit_id?: number) {
    if (pengajuan_kredit_id) {
      return this.prisma.pembelianRefinancing.findMany({
        where: { pengajuan_kredit_id },
      });
    }
    return this.prisma.pembelianRefinancing.findMany();
  }

  async findOne(id: number) {
    return this.prisma.pembelianRefinancing.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDto: UpdatePembelianRefinancingDto) {
    return this.prisma.pembelianRefinancing.update({
      where: { id },
      data: updateDto,
    });
  }

}