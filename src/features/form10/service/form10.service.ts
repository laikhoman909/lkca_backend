import { Injectable } from '@nestjs/common';
import {
  CreateForm10Dto
} from '../dto/create-form10.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form10Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 10
  // ─────────────────────────────────────────────

  async createForm10(dto: CreateForm10Dto) {
    const { Form10_0 } = dto;

    return this.prisma.$transaction(async (tx) => {
      return tx.form10.create({
        data: {
          form0Id:  dto.formRefId,
          payment: {
            create: Form10_0?.map((k) => ({
              noPinjaman: k.NoPinjaman ?? null,
              atasNama: k.AtasNama ?? null,
              besarAngsuran: k.BesarAngsuran ?? 0,
              oSPokok: k.OSPokok ?? null,
              angsKe: k.AngsKe ?? null
            }))
          },
        },
        include: {
          payment: true
        },
      });
    });
  }

  async findAllForm10() {
    return this.prisma.form10.findMany({
      include: {
        payment: true
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm10(form0Id: number) {
    return this.prisma.form10.findUnique({
      where: { form0Id },
      include: {
        payment: true,
      },
    });
  }

  async removeForm10(form0Id: number) {
    await this.prisma.form10.delete({ where: { form0Id } });
    return { message: 'Form10 deleted successfully' };
  }

}