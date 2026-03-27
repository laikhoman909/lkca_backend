import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKonfirmasiTandaTanganDto, UpdateKonfirmasiTandaTanganDto } from '../dto/konfirmasi-tanda-tangan.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class KonfirmasiTandaTanganService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateKonfirmasiTandaTanganDto) {
    return await this.prisma.konfirmasiTandaTangan.create({
      data: createDto,
    });
  }

  async findAll() {
    return await this.prisma.konfirmasiTandaTangan.findMany({
      include: {
        pengajuan_kredit: true,
      },
    });
  }

  async findOne(id: number) {
    const konfirmasi = await this.prisma.konfirmasiTandaTangan.findUnique({
      where: { id },
      include: {
        pengajuan_kredit: true,
      },
    });
    if (!konfirmasi) {
      throw new NotFoundException(`Konfirmasi Tanda Tangan dengan ID ${id} tidak ditemukan`);
    }
    return konfirmasi;
  }

  async findByPengajuanKredit(pengajuanKreditId: number) {
    return await this.prisma.konfirmasiTandaTangan.findMany({
      where: { pengajuan_kredit_id: pengajuanKreditId },
    });
  }

  async update(id: number, updateDto: UpdateKonfirmasiTandaTanganDto) {
    await this.findOne(id);
    return await this.prisma.konfirmasiTandaTangan.update({
      where: { id },
      data: updateDto,
    });
  }
}