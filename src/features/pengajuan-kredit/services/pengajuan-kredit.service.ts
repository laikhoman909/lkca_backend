import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePengajuanKreditDto, UpdatePengajuanKreditDto } from '../dto/pengajuan-kredit.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class PengajuanKreditService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreatePengajuanKreditDto) {
    return await this.prisma.pengajuanKredit.create({
      data: createDto,
    });
  }

  async findAll() {
    return await this.prisma.pengajuanKredit.findMany({
      include: {
        info_debitur_pribadi: true,
        info_debitur_badan_usaha: true,
        dokumen_persyaratan: true,
        konfirmasi_pembiayaan: true,
        pembelian_refinancing: true,
        info_usaha: true,
        perhitungan_pendapatan: true,
        kewajiban_angsuran: true,
        mutasi_rekening: true,
        laporan_keuangan: true,
        aset_lain: true,
        record_payment: true,
        data_slik: true,
        kewajiban_lain: true,
        info_jaminan: true,
        keputusan_kredit: true,
      },
    });
  }

  async findOne(id: number) {
    const pengajuan = await this.prisma.pengajuanKredit.findUnique({
      where: { id },
      include: {
        info_debitur_pribadi: true,
        info_debitur_badan_usaha: true,
        dokumen_persyaratan: true,
        konfirmasi_pembiayaan: true,
        pembelian_refinancing: true,
        info_usaha: true,
        perhitungan_pendapatan: true,
        kewajiban_angsuran: true,
        mutasi_rekening: true,
        laporan_keuangan: true,
        aset_lain: true,
        record_payment: true,
        data_slik: true,
        kewajiban_lain: true,
        info_jaminan: true,
        keputusan_kredit: true,
      },
    });
    if (!pengajuan) {
      throw new NotFoundException(`Pengajuan Kredit dengan ID ${id} tidak ditemukan`);
    }
    return pengajuan;
  }

  async update(id: number, updateDto: UpdatePengajuanKreditDto) {
    await this.findOne(id);
    return await this.prisma.pengajuanKredit.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.pengajuanKredit.delete({
      where: { id },
    });
    return { message: `Pengajuan Kredit dengan ID ${id} berhasil dihapus` };
  }
}