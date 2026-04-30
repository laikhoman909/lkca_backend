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

    const firstResult = await this.prisma.$transaction(async (tx) => {
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
                  saldo: j.Saldo ?? 0,
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
    return this.transformToCreateForm8Dto(firstResult);
  }

  async updateForm8(form0Id: number, dto: CreateForm8Dto) {
    const {  DataTableSec8_1DTO } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.laporanKeuangan.deleteMany({ where: { form8Id: form0Id } });
      return tx.form8.update({
        where: { form0Id },
        data: {
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

  async updateBankById(form0Id: number, dto: CreateForm8Dto, id: number) {
    const { DataTableSec8DTO } = dto;

    return this.prisma.$transaction(async (tx) => {
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
                      saldo: j.Saldo ?? 0,
                    }))
                  }
              }
            }
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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form8 database result to CreateForm8Dto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateForm8Dto(form8: any): CreateForm8Dto | null {
    // if (!form8) return null;

    const result = new CreateForm8Dto();
    result.formRefId = form8.form0Id;
    result.bankId = form8.bankId;

    // Transform bank to DataTableSec8DTO
    if (form8.bank && Array.isArray(form8.bank)) {
      result.DataTableSec8DTO = form8.bank.map((b: any) => ({
        id: b.id,
        Keterangan: b.keterangan,
        AtasNama: b.atasNama,
        NamaBank: b.nama,
        Radio: b.radio,
        SaldoAwal: b.saldoAwal,
        Mutasi: b.mutasi?.map((m: any) => ({
          Keterangan: m.keterangan,
          Debit: m.debit,
          Kredit: m.kredit,
          Saldo: m.saldo,
        })) || [],
      }));
    }

    // Transform laporanKeuangan to DataTableSec8_1DTO
    if (form8.laporanKeuangan && Array.isArray(form8.laporanKeuangan)) {
      result.DataTableSec8_1DTO = {
        Keterangan: form8.keterangan,
        LaporanKeuangan: form8.laporanKeuangan.map((lk: any) => ({
          Keterangan: lk.keterangan,
          PendapatanLaba: lk.pendapatanLaba,
          Biaya: lk.biaya,
          Net: lk.net,
        })),
      };
    }

    return result;
  }

  async findOneForm8(form0Id: number) {
    const form8 = await this.prisma.form8.findUnique({
      where: { form0Id },
      include: {
        bank: {
          include: { mutasi: true }
        },
        laporanKeuangan: true
      },
    });
    return this.transformToCreateForm8Dto(form8);
  }

  async removeForm8(form0Id: number) {
    await this.prisma.form8.delete({ where: { form0Id } });
    return { message: 'Form8 deleted successfully' };
  }

}