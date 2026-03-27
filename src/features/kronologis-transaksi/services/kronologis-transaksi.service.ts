import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKronologisTransaksiDto, UpdateKronologisTransaksiDto } from '../dto/kronologis-transaksi.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class KronologisTransaksiService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateKronologisTransaksiDto) {
    return await this.prisma.kronologisTransaksi.create({
      data: createDto,
    });
  }

  async findAll() {
    return await this.prisma.kronologisTransaksi.findMany({
      include: {
        pengajuan_kredit: true,
      },
    });
  }

  async findOne(id: number) {
    const kronologis = await this.prisma.kronologisTransaksi.findUnique({
      where: { id },
      include: {
        pengajuan_kredit: true,
      },
    });
    if (!kronologis) {
      throw new NotFoundException(`Kronologis Transaksi dengan ID ${id} tidak ditemukan`);
    }
    return kronologis;
  }

  async findByPengajuanKredit(pengajuanKreditId: number) {
    return await this.prisma.kronologisTransaksi.findMany({
      where: { pengajuan_kredit_id: pengajuanKreditId },
    });
  }

  async update(id: number, updateDto: UpdateKronologisTransaksiDto) {
    await this.findOne(id);
    return await this.prisma.kronologisTransaksi.update({
      where: { id },
      data: updateDto,
    });
  }

}