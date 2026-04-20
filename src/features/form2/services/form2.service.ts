import { Injectable } from '@nestjs/common';
import {
  CreateForm2Dto,
} from '../dto/create-form2.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form2Service {
  constructor(private prisma: PrismaService) {}

  async createForm2(dto: CreateForm2Dto) {
    const { Form2_0, Form2_1 } = dto;
    return this.prisma.$transaction(async (tx) => {
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

  async findOneForm2(form0Id: number) {
    return this.prisma.form2.findUnique({
      where: { form0Id },
      include: { dokumen: true, foto: true },
    });
  }

  async removeForm2(form0Id: number) {
    await this.prisma.form2.delete({ where: { form0Id } });
    return { message: 'Form2 deleted successfully' };
  }

}