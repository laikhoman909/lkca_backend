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
              nama: k.Nama,
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

  async updateForm9(form0Id: number, dto: CreateForm9Dto) {
    const { Form9_0 } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.aset.deleteMany({ where: { form9Id: form0Id } });
      return tx.form9.update({
        where: { form0Id },
        data: {
          aset: {
            create: Form9_0?.map((k) => ({
              nama: k.Nama ,
              merk_tipe_tahun: k.Merk ?? null,
              nopol: k.NoPol ?? null,
              status: k.Status ?? null,
              nama_bank: k.NamaBank
            })),
          },
          updatedAt: new Date()
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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form9 database result to CreateForm9Dto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateForm9Dto(form9: any): CreateForm9Dto | null {
    if (!form9) return null;

    const result = new CreateForm9Dto();
    result.formRefId = form9.form0Id;

    // Transform aset to Form9_0
    if (form9.aset && Array.isArray(form9.aset)) {
      result.Form9_0 = form9.aset.map((a: any) => ({
        Nama: a.nama,
        Merk: a.merk_tipe_tahun,
        NoPol: a.nopol,
        Status: a.status,
        NamaBank: a.nama_bank,
      }));
    }

    return result;
  }

  async findOneForm9(form0Id: number) {
    const form9 = await this.prisma.form9.findUnique({
      where: { form0Id },
      include: {
        aset: true,
      },
    });
    return this.transformToCreateForm9Dto(form9);
  }
    return { message: 'Form9 deleted successfully' };
  }

}