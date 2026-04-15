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

  async findAllForm12() {
    return this.prisma.form12.findMany({
      include: {
        kewajiban: true
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm12(form0Id: number) {
    return this.prisma.form12.findUnique({
      where: { form0Id },
      include: {
        kewajiban: true,
      },
    });
  }

  async removeForm12(form0Id: number) {
    await this.prisma.form12.delete({ where: { form0Id } });
    return { message: 'Form12 deleted successfully' };
  }

}