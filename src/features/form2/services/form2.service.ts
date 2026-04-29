import { Injectable } from '@nestjs/common';
import {
  CreateForm2Dto,
} from '../dto/create-form2.dto';
import { StatusDokumenDto } from '../dto/status-dokumen.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form2Service {
  constructor(private prisma: PrismaService) {}

  async createForm2(dto: CreateForm2Dto) {
    const { Form2_0, Form2_1 } = dto;
    const result = await this.prisma.$transaction(async (tx) => {
      return tx.form2.create({
        data: {
          form0Id: dto.formRefId,
          dokumen: {
            create: Form2_0?.map((k) => ({
              jenis_dokumen: k.key,
              status_ada: k.model1,
              tipe_dokumen: (k.model2 != null) ? (k.model2 == 0 ? 'FOTO': 'COPY') : '' ,
              keterangan: k.model3 ?? null,
            })),
          },
          foto: {
            create: Form2_1?.map((k) => ({
              key:   k.key,
              data1: k.data1 ?? null,
              data2: k.data2 ?? null,
              data3: k.data3 ?? null,
              data4: k.data4 ?? null,
            })),
          },
          
        },
        include: {
          foto:    true,
          dokumen: true,
        },
      });
    });

    // Transform dokumen to StatusDokumenDto format
    if (result.dokumen && Array.isArray(result.dokumen)) {
      result.dokumen = result.dokumen.map((d: any) => {
        const dokDto = new StatusDokumenDto();
        dokDto.id = d.id?.toString();
        dokDto.key = d.jenis_dokumen;
        dokDto.model1 = d.status_ada;
        dokDto.model2 = d.tipe_dokumen === 'FOTO' ? 0 : (d.tipe_dokumen === 'COPY' ? 1 : null);
        dokDto.model3 = d.keterangan;
        return dokDto;
      });
    }

    return result;
  }

  async updateForm2(form0Id: number,dto: CreateForm2Dto) {
    const { Form2_0, Form2_1 } = dto;
    return this.prisma.$transaction(async (tx) => {
      await tx.dokumenPersyaratan.deleteMany({ where: { form2Id: form0Id } });
      await tx.keyList.deleteMany({ where: { form2Id: form0Id } });
      return tx.form2.update({
        where: { form0Id },
        data: {
          dokumen: {
            create: Form2_0?.map((k) => ({
              jenis_dokumen: k.key,
              status_ada: k.model1,
              tipe_dokumen: (k.model2 != null) ? (k.model2 == 0 ? 'FOTO': 'COPY') : '' ,
              keterangan: k.model3 ?? null,
            })),
          },
          foto: {
            create: Form2_1?.map((k) => ({
              key:   k.key,
              data1: k.data1 ?? null,
              data2: k.data2 ?? null,
              data3: k.data3 ?? null,
              data4: k.data4 ?? null,
            })),
          },
          updatedAt: new Date()
        },
        include: {
          foto:    true,
          dokumen: true,
        },
      });
    });
  }

  async findAllForm2() {
    return this.prisma.form2.findMany({
      include: { foto: true, dokumen: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form2 database result to CreateForm2Dto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateForm2Dto(form2: any): CreateForm2Dto | null {
    // if (!form2) return null;

    const result = new CreateForm2Dto();
    result.formRefId = form2.form0Id;

    // Transform dokumen (Form2_0)
    if (form2.dokumen && Array.isArray(form2.dokumen)) {
      result.Form2_0 = form2.dokumen.map((d: any) => ({
        id: d.id?.toString(),
        key: d.jenis_dokumen,
        model1: d.status_ada,
        model2: d.tipe_dokumen === 'FOTO' ? 0 : (d.tipe_dokumen === 'COPY' ? 1 : null),
        model3: d.keterangan,
      }));
    }

    // Transform foto (Form2_1)
    if (form2.foto && Array.isArray(form2.foto)) {
      result.Form2_1 = form2.foto.map((f: any) => ({
        key: f.key,
        data1: f.data1,
        data2: f.data2,
        data3: f.data3,
        data4: f.data4,
      }));
    }

    return result;
  }

  async findOneForm2(form0Id: number) {
    const form2 = await this.prisma.form2.findUnique({
      where: { form0Id },
      include: { dokumen: true, foto: true },
    });
    return this.transformToCreateForm2Dto(form2);
  }

  async removeForm2(form0Id: number) {
    await this.prisma.form2.delete({ where: { form0Id } });
    return { message: 'Form2 deleted successfully' };
  }

}