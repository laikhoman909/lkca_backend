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
              noPinjaman: k.NoPinjaman,
              atasNama: k.AtasNama ?? null,
              besarAngsuran: k.BesarAngsuran ?? null,
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

  async updateForm10(form0Id: number, dto: CreateForm10Dto) {
    const { Form10_0 } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.pembayaran.deleteMany({ where: { form10Id: form0Id } });
      return tx.form10.update({
        where: {form0Id},
        data: {
          payment: {
            create: Form10_0?.map((k) => ({
              noPinjaman: k.NoPinjaman,
              atasNama: k.AtasNama ?? null,
              besarAngsuran: k.BesarAngsuran ?? null,
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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form10 database result to CreateForm10Dto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateForm10Dto(form10: any): CreateForm10Dto | null {
    if (!form10) return null;

    const result = new CreateForm10Dto();
    result.formRefId = form10.form0Id;

    // Transform payment to Form10_0
    if (form10.payment && Array.isArray(form10.payment)) {
      result.Form10_0 = form10.payment.map((p: any) => ({
        NoPinjaman: p.noPinjaman,
        AtasNama: p.atasNama,
        BesarAngsuran: p.besarAngsuran,
        OSPokok: p.oSPokok,
        AngsKe: p.angsKe,
      }));
    }

    return result;
  }

  async findOneForm10(form0Id: number) {
    const form10 = await this.prisma.form10.findUnique({
      where: { form0Id },
      include: {
        payment: true,
      },
    });
    return this.transformToCreateForm10Dto(form10);
  }

  async removeForm10(form0Id: number) {
    await this.prisma.form10.delete({ where: { form0Id } });
    return { message: 'Form10 deleted successfully' };
  }

}