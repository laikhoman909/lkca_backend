import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMutasiRekeningDto, UpdateMutasiRekeningDto } from '../dto/mutasi-rekening.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class MutasiRekeningService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateMutasiRekeningDto) {
    return await this.prisma.mutasiRekening.create({
      data: createDto,
    });
  }

  async createBulk(createDtos: CreateMutasiRekeningDto[]) {
    return await this.prisma.mutasiRekening.createMany({
      data: createDtos,
    });
  }

  async findAll() {
    return await this.prisma.mutasiRekening.findMany({
      include: { pengajuan_kredit: true },
    });
  }

  async findOne(id: number) {
    const mutasi = await this.prisma.mutasiRekening.findUnique({
      where: { id },
      include: { pengajuan_kredit: true },
    });
    if (!mutasi) {
      throw new NotFoundException(`Mutasi Rekening dengan ID ${id} tidak ditemukan`);
    }
    return mutasi;
  }

  async findByPengajuanId(pengajuanKreditId: number) {
    return await this.prisma.mutasiRekening.findMany({
      where: { pengajuan_kredit_id: pengajuanKreditId },
    });
  }

  async update(id: number, updateDto: UpdateMutasiRekeningDto) {
    await this.findOne(id);
    return await this.prisma.mutasiRekening.update({
      where: { id },
      data: updateDto,
    });
  }
}