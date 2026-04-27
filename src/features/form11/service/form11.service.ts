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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form11 database result to FormSec11DTO format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToFormSec11Dto(form11: any): FormSec11DTO | null {
    if (!form11) return null;

    const result = new FormSec11DTO();
    result.formRefId = form11.form0Id;
    result.Catatan = form11.catatan;
    result.Keterangan = form11.keterangan;

    // Transform pembiayaan to DataTable
    if (form11.pembiayaan && Array.isArray(form11.pembiayaan)) {
      result.DataTable = form11.pembiayaan.map((p: any) => ({
        Key: p.key,
        JumlahUnit: p.jumlahUnit,
        CollRendah: p.collRendah,
        Keterangan: p.keterangan,
      }));
    }

    return result;
  }

  async findOneForm11(form0Id: number) {
    const form11 = await this.prisma.form11.findUnique({
      where: { form0Id },
      include: {
        pembiayaan: true,
      },
    });
    return this.transformToFormSec11Dto(form11);
  }
    return { message: 'Form11 deleted successfully' };
  }

}