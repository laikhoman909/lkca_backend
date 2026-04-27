import { Injectable } from '@nestjs/common';
import {
 FormSec12DTO
} from '../dto/form-sec12.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form12Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 12
  // ─────────────────────────────────────────────

  async createForm12(dto: FormSec12DTO) {
    const { DataTable } = dto;

    return this.prisma.$transaction(async (tx) => {
      return tx.form12.create({
        data: {
          form0Id:  dto.formRefId,
          kewajiban: {
            create: DataTable?.map((k) => ({
              bank: k.Bank ?? null,
              merk: k.Merk ?? null,
              besarAngsuran: k.BesarAngsuran ?? 0,
              angsKe: k.AngsuranKe ?? 0,
              keterangan: k.Keterangan ?? null
            }))
          },
        },
        include: {
          kewajiban: true
        },
      });
    });
  }

  async updateForm12(form0Id: number, dto: FormSec12DTO) {
    const { DataTable } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.kewajibanLuar.deleteMany({ where: { form12Id: form0Id } });
      return tx.form12.update({
        where: { form0Id },
        data: {
          kewajiban: {
            create: DataTable?.map((k) => ({
              bank: k.Bank ?? null,
              merk: k.Merk ?? null,
              besarAngsuran: k.BesarAngsuran ?? 0,
              angsKe: k.AngsuranKe ?? 0,
              keterangan: k.Keterangan ?? null
            }))
          },
        },
        include: {
          kewajiban: true
        },
      });
    });
  }

  async findAllForm12() {
    return this.prisma.form12.findMany({
      include: {
        kewajiban: true
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form12 database result to FormSec12DTO format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToFormSec12Dto(form12: any): FormSec12DTO | null {
    if (!form12) return null;

    const result = new FormSec12DTO();
    result.formRefId = form12.form0Id;

    // Transform kewajiban to DataTable
    if (form12.kewajiban && Array.isArray(form12.kewajiban)) {
      result.DataTable = form12.kewajiban.map((k: any) => ({
        Bank: k.bank,
        Merk: k.merk,
        BesarAngsuran: k.besarAngsuran,
        AngsuranKe: k.angsKe,
        Keterangan: k.keterangan,
      }));
    }

    return result;
  }

  async findOneForm12(form0Id: number) {
    const form12 = await this.prisma.form12.findUnique({
      where: { form0Id },
      include: {
        kewajiban: true,
      },
    });
    return this.transformToFormSec12Dto(form12);
  }
    return { message: 'Form12 deleted successfully' };
  }

}