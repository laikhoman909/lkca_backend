import { Injectable } from '@nestjs/common';
import {
 FormSec14DTO
} from '../dto/form-sec14.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form14Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 14
  // ─────────────────────────────────────────────

  async createForm14(dto: FormSec14DTO){
    return this.prisma.$transaction(async (tx) => {
      return tx.form14.create({
        data: {
          form0Id:  dto.formRefId,
          positifPoin: dto.PositifPoin ?? '',
          negatifPoin: dto.NegatifPoin ?? ''
        }
      });
    });
  }

  async updateForm14(form0Id: number, dto: FormSec14DTO){
    return this.prisma.$transaction(async (tx) => {
      return tx.form14.update({
        where: { form0Id },
        data: {
          form0Id:  dto.formRefId,
          positifPoin: dto.PositifPoin ?? '',
          negatifPoin: dto.NegatifPoin ?? ''
        }
      });
    });
  }

  async findAllForm14() {
    return this.prisma.form14.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form14 database result to FormSec14DTO format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToFormSec14Dto(form14: any): FormSec14DTO | null {
    if (!form14) return null;

    const result = new FormSec14DTO();
    result.formRefId = form14.form0Id;
    result.PositifPoin = form14.positifPoin;
    result.NegatifPoin = form14.negatifPoin;

    return result;
  }

  async findOneForm14(form0Id: number) {
    const form14 = await this.prisma.form14.findUnique({
      where: { form0Id },
    });
    return this.transformToFormSec14Dto(form14);
  }
  
  async removeForm14(form0Id: number) {
    await this.prisma.form14.delete({ where: { form0Id } });
    return { message: 'Form14 deleted successfully' };
  }

}