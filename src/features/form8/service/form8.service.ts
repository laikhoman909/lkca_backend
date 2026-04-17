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
              keterangan: k.Keterangan ?? null,
              radio: k.Radio ?? '',
              saldoAwal: k.SaldoAwal ?? 0,
              mutasi: {
                create: k.Mutasi?.map((j) => ({
                  keterangan: j.Keterangan ?? null,
                  debit: j.Debit ?? 0,
                  kredit: j.Kredit ?? 0,
                  saldo: j.Debit ?? 0,
                })),
              }
            })),
          },
          keterangan: DataTableSec8_1DTO?.Keterangan ?? null,
          laporanKeuangan: {
            create: DataTableSec8_1DTO?.LaporanKeuangan?.map((k) => ({
              keterangan: k.Keterangan ?? null,
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

  async updateForm8(form0Id: number, dto: CreateForm8Dto) {
    const { DataTableSec8DTO, DataTableSec8_1DTO } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.laporanKeuangan.deleteMany({ where: { form8Id: form0Id } });
      await tx.bank.deleteMany({ where: { id: form0Id } });

      return tx.form8.update({
        where: { form0Id },
        data: {
          bank: {
            create: DataTableSec8DTO?.map((k) => ({
              atasNama: k.AtasNama ?? '',
              nama: k.NamaBank ?? '',
              keterangan: k.Keterangan ?? null,
              radio: k.Radio ?? '',
              saldoAwal: k.SaldoAwal ?? 0,
              mutasi: {
                create: k.Mutasi?.map((j) => ({
                  keterangan: j.Keterangan ?? null,
                  debit: j.Debit ?? 0,
                  kredit: j.Kredit ?? 0,
                  saldo: j.Debit ?? 0,
                })),
              }
            })),
          },
          keterangan: DataTableSec8_1DTO?.Keterangan ?? null,
          laporanKeuangan: {
            create: DataTableSec8_1DTO?.LaporanKeuangan?.map((k) => ({
              keterangan: k.Keterangan ?? null,
              pendapatanLaba: k.PendapatanLaba ?? 0,
              biaya: k.Biaya ?? 0,
              net: k.Net ?? 0
            })),
          },
          updatedAt: new Date()
        },
        include: {
          bank: true,
          laporanKeuangan: true
        },
      });
    });
  }

  async updateForm8_1(form0Id: number, dto: CreateForm8Dto, id: number) {
    const { DataTableSec8DTO, DataTableSec8_1DTO } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.laporanKeuangan.deleteMany({ where: { form8Id: form0Id } });
      await tx.mutasi.deleteMany({ where: { bankId: id } });

      return tx.form8.update({
        where: { form0Id },
        data: {
          bank: {
            update: {
              where: { id },
                data: {
                  atasNama: DataTableSec8DTO[0].AtasNama ?? '',
                  nama: DataTableSec8DTO[0].NamaBank ?? '',
                  keterangan: DataTableSec8DTO[0].Keterangan ?? null,
                  radio: DataTableSec8DTO[0].Radio ?? '',
                  saldoAwal: DataTableSec8DTO[0].SaldoAwal ?? 0,
                  mutasi: {
                    create: DataTableSec8DTO[0].Mutasi?.map((j) => ({
                      keterangan: j.Keterangan ?? null,
                      debit: j.Debit ?? 0,
                      kredit: j.Kredit ?? 0,
                      saldo: j.Debit ?? 0,
                    }))
                  }
              }
            }
          }, 
          keterangan: DataTableSec8_1DTO?.Keterangan ?? null,
          laporanKeuangan: {
            create: DataTableSec8_1DTO?.LaporanKeuangan?.map((k) => ({
              keterangan: k.Keterangan ?? null,
              pendapatanLaba: k.PendapatanLaba ?? 0,
              biaya: k.Biaya ?? 0,
              net: k.Net ?? 0
            })),
          },
          updatedAt: new Date()
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