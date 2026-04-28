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
              key: k.key ,
              income1: k.income1 ?? 0,
              income2: k.income2 ?? 0,
              income3: k.income3 ?? 0,
              total: k.total ?? 0
            })),
          },       
             
          kewajiban: {
            create: Form7_1?.map((j) => ({
              key: j.key ,
              value: j.value ?? 0
            })),
          }
        },
        include: {
          pendapatan: true,
          kewajiban: true
        },
      });
    });
  }

  async updateForm7(form0Id: number, dto: CreateForm7Dto) {
    const { Form7_0, Form7_1 } = dto;
    
    return this.prisma.$transaction(async (tx) => {
      await tx.pendapatan.deleteMany({ where: { form7Id: form0Id } });
      await tx.kewajiban.deleteMany({ where: { form7Id: form0Id } });
      return tx.form7.update({
        where: { form0Id },
        data: {
          pendapatan: {
            create: Form7_0?.map((k) => ({
              key: k.key ,
              income1: k.income1 ?? 0,
              income2: k.income2 ?? 0,
              income3: k.income3 ?? 0,
              total: k.total ?? 0
            }))
          },       
             
          kewajiban: {
            create: Form7_1?.map((j) => ({
              key: j.key ,
              value: j.value ?? 0
            }))
          },
          updatedAt: new Date()
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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form7 database result to CreateForm7Dto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateForm7Dto(form7: any): CreateForm7Dto | null {
    if (!form7) return null;

    const result = new CreateForm7Dto();
    result.formRefId = form7.form0Id;

    // Transform pendapatan to Form7_0
    if (form7.pendapatan && Array.isArray(form7.pendapatan)) {
      result.Form7_0 = form7.pendapatan.map((p: any) => ({
        key: p.key,
        income1: p.income1,
        income2: p.income2,
        income3: p.income3,
        total: p.total,
      }));
    }

    // Transform kewajiban to Form7_1
    if (form7.kewajiban && Array.isArray(form7.kewajiban)) {
      result.Form7_1 = form7.kewajiban.map((k: any) => ({
        key: k.key,
        value: k.value,
      }));
    }

    return result;
  }

  async findOneForm7(form0Id: number) {
    const form7 = await this.prisma.form7.findUnique({
      where: { form0Id },
      include: {
        pendapatan: true,
        kewajiban: true
      },
    });
    return this.transformToCreateForm7Dto(form7);
  }

  async removeForm7(form0Id: number) {
    await this.prisma.form7.delete({ where: { form0Id } });
    return { message: 'Form7 deleted successfully' };
  }

}