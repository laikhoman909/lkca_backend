import { Injectable } from '@nestjs/common';
import {
  CreateForm9Dto
} from '../dto/create-form9.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form9Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 9
  // ─────────────────────────────────────────────

  async createForm9(dto: CreateForm9Dto) {
    const { Form9_0 } = dto;

    return this.prisma.$transaction(async (tx) => {
      return tx.form9.create({
        data: {
          form0Id:  dto.formRefId,
          aset: {
            create: Form9_0?.map((k) => ({
              merk_tipe_tahun: k.Merk ?? null,
              nopol: k.NoPol ?? null,
              status: k.Status ?? null,
              nama_bank: k.NamaBank ?? null
            })),
          },
        },
        include: {
          aset: true
        },
      });
    });
  }

  async findAllForm9() {
    return this.prisma.form9.findMany({
      include: {
        aset: true
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm9(form0Id: number) {
    return this.prisma.form9.findUnique({
      where: { form0Id },
      include: {
        aset: true,
      },
    });
  }

  async removeForm9(form0Id: number) {
    await this.prisma.form9.delete({ where: { form0Id } });
    return { message: 'Form9 deleted successfully' };
  }

}