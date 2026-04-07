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
          formRefId: dto.formRefId,
          dokumen: {
            create: Form2_0?.map((k) => ({
              jenis_dokumen: k.jenis_dokumen ?? null,
              status_ada: k.status_ada ?? null,
              tipe_dokumen: k.tipe_dokumen ?? null,
              keterangan: k.keterangan ?? null,
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

  async findAllForm2() {
    return this.prisma.form2.findMany({
      include: { foto: true, dokumen: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm2(id: number) {
    return this.prisma.form2.findUnique({
      where: { id },
      include: { dokumen: true, foto: true },
    });
  }

  async removeForm2(id: number) {
    await this.prisma.form2.delete({ where: { id } });
    return { message: 'Form2 deleted successfully' };
  }

}