import { Injectable } from '@nestjs/common';
import {
 FormSec11DTO
} from '../dto/form-sec11.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form11Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 11
  // ─────────────────────────────────────────────

  async createForm11(dto: FormSec11DTO) {
    const { DataTable } = dto;

    return this.prisma.$transaction(async (tx) => {
      return tx.form11.create({
        data: {
          form0Id:  dto.formRefId,
          catatan: dto.Catatan ?? '',
          keterangan: dto.Keterangan ?? '',
          pembiayaan: {
            create: DataTable?.map((k) => ({
              key: k.Key,
              jumlahUnit: k.JumlahUnit ?? null,
              collRendah: k.CollRendah ?? null,
              keterangan: k.Keterangan ?? null
            }))
          },
        },
        include: {
          pembiayaan: true
        },
      });
    });
  }

  async updateForm11(form0Id: number, dto: FormSec11DTO) {
    const { DataTable } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.pembiayaan.deleteMany({ where: { form11Id: form0Id } });
      return tx.form11.update({
        where: {form0Id},
        data: {
          catatan: dto.Catatan ?? '',
          keterangan: dto.Keterangan ?? '',
          pembiayaan: {
            create: DataTable?.map((k) => ({
              key: k.Key ,
              jumlahUnit: k.JumlahUnit ?? null,
              collRendah: k.CollRendah ?? null,
              keterangan: k.Keterangan ?? null
            }))
          },
        },
        include: {
          pembiayaan: true
        },
      });
    });
  }

  async findAllForm11() {
    return this.prisma.form11.findMany({
      include: {
        pembiayaan: true
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm11(form0Id: number) {
    return this.prisma.form11.findUnique({
      where: { form0Id },
      include: {
        pembiayaan: true,
      },
    });
  }

  async removeForm11(form0Id: number) {
    await this.prisma.form11.delete({ where: { form0Id } });
    return { message: 'Form11 deleted successfully' };
  }

}