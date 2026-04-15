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

  async findAllForm14() {
    return this.prisma.form14.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm14(form0Id: number) {
    return this.prisma.form14.findUnique({
      where: { form0Id },
    });
  }

  async removeForm14(form0Id: number) {
    await this.prisma.form14.delete({ where: { form0Id } });
    return { message: 'Form14 deleted successfully' };
  }

}