import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDokumenPersyaratanDto, UpdateDokumenPersyaratanDto } from '../dto/dokumen-persyaratan.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class DokumenPersyaratanService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateDokumenPersyaratanDto) {
    return await this.prisma.dokumenPersyaratan.create({
      data: createDto,
    });
  }

  async createBulk(createDtos: CreateDokumenPersyaratanDto[]) {
    return await this.prisma.dokumenPersyaratan.createMany({
      data: createDtos,
    });
  }

  async findAll() {
    return await this.prisma.dokumenPersyaratan.findMany({
      include: { pengajuan_kredit: true },
    });
  }

  async findOne(id: number) {
    const dokumen = await this.prisma.dokumenPersyaratan.findUnique({
      where: { id },
      include: { pengajuan_kredit: true },
    });
    if (!dokumen) {
      throw new NotFoundException(`Dokumen Persyaratan dengan ID ${id} tidak ditemukan`);
    }
    return dokumen;
  }

  async findByPengajuanId(pengajuanKreditId: number) {
    return await this.prisma.dokumenPersyaratan.findMany({
      where: { pengajuan_kredit_id: pengajuanKreditId },
      orderBy: { urutan: 'asc' },
    });
  }

  async update(id: number, updateDto: UpdateDokumenPersyaratanDto) {
    await this.findOne(id);
    return await this.prisma.dokumenPersyaratan.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.dokumenPersyaratan.delete({
      where: { id },
    });
    return { message: `Dokumen Persyaratan dengan ID ${id} berhasil dihapus` };
  }
}