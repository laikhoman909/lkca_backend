import { Injectable } from '@nestjs/common';
import {
  CreateForm8Dto
} from '../dto/create-form8.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form8Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 8
  // ─────────────────────────────────────────────

  async createForm8(dto: CreateForm8Dto) {
    const { DataTableSec8DTO, DataTableSec8_1DTO } = dto;

    return this.prisma.$transaction(async (tx) => {
      return tx.form8.create({
        data: {
          form0Id:  dto.formRefId,
          bank: {
            create: DataTableSec8DTO?.map((k) => ({
              atasNama: k.AtasNama ?? '',
              nama: k.NamaBank ?? '',
              keterangan: k.Keterangan ?? '',
              radio: k.Radio ?? '',
              saldoAwal: k.SaldoAwal ?? 0,
              mutasi: {
                create: k.Mutasi?.map((j) => ({
                  keterangan: j.Keterangan ?? '',
                  debit: j.Debit ?? 0,
                  kredit: j.Kredit ?? 0,
                  saldo: j.Debit ?? 0,
                })),
              }
            })),
          },
          keterangan: DataTableSec8_1DTO?.Keterangan ?? '',
          laporanKeuangan: {
            create: DataTableSec8_1DTO?.LaporanKeuangan?.map((k) => ({
              keterangan: k.Keterangan ?? '',
              pendapatanLaba: k.PendapatanLaba ?? 0,
              biaya: k.Biaya ?? 0,
              net: k.Net ?? 0
            })),
          }
        },
        include: {
          bank: true,
          laporanKeuangan: true
        },
      });
    });
  }

  async findAllForm8() {
    return this.prisma.form8.findMany({
      include: {
        bank: true,
          laporanKeuangan: true
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm8(form0Id: number) {
    return this.prisma.form8.findUnique({
      where: { form0Id },
      include: {
        bank: true,
        laporanKeuangan: true
      },
    });
  }

  async removeForm8(form0Id: number) {
    await this.prisma.form8.delete({ where: { form0Id } });
    return { message: 'Form8 deleted successfully' };
  }

}