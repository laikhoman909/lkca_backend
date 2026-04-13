import { Injectable } from '@nestjs/common';
import {
  CreateForm7Dto
} from '../dto/create-form7.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form7Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 7
  // ─────────────────────────────────────────────

  async createForm7(dto: CreateForm7Dto) {
    const { Form7_0, Form7_1 } = dto;
    
    return this.prisma.$transaction(async (tx) => {
      return tx.form7.create({
        data: {
          form0Id:  dto.formRefId,
          pendapatan: {
            create: Form7_0?.map((k) => ({
              key: k.key ?? '',
              income1: k.income1 ?? 0,
              income2: k.income2 ?? 0,
              income3: k.income3 ?? 0,
              total: k.total ?? 0
            })),
          },
          
          // kewajiban: {
          //   create: Form7_1?.map((j) => ({
          //     key: j.key ?? '',
          //     value: j.value ?? 0
          //   })),
          // }
        },
        include: {
          pendapatan: true,
          kewajiban: true
        },
      });
    });
  }

  async findAllForm7() {
    return this.prisma.form7.findMany({
      include: {
        pendapatan: true,
        kewajiban: true
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm7(form0Id: number) {
    return this.prisma.form7.findUnique({
      where: { form0Id },
      include: {
        pendapatan: true,
        kewajiban: true
      },
    });
  }

  async removeForm7(form0Id: number) {
    await this.prisma.form7.delete({ where: { form0Id } });
    return { message: 'Form7 deleted successfully' };
  }

}