import { Injectable } from '@nestjs/common';
import {
  FooterDTO
} from '../dto/footer.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form15Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 15
  // ─────────────────────────────────────────────

  async createForm15(dto: FooterDTO){
    return this.prisma.$transaction(async (tx) => {
      return tx.footer.create({
        data: {
          form0Id:  dto.formRefId,
          signature1: dto.Signature1 ?? null,
          signature2: dto.Signature2 ?? null,
          keterangan: dto.Keterangan ?? null,
          rekomendasiCA: dto.RekomendasiCA ?? null,
        }
      });
    });
  }

  async updateForm15(form0Id: number, dto: FooterDTO){
    return this.prisma.$transaction(async (tx) => {
      return tx.footer.update({
        where: { form0Id },
        data: {
          form0Id:  dto.formRefId,
          signature1: dto.Signature1 ?? null,
          signature2: dto.Signature2 ?? null,
          keterangan: dto.Keterangan ?? null,
          rekomendasiCA: dto.RekomendasiCA ?? null,
        }
      });
    });
  }

  async findOneForm15(form0Id: number) {
    return this.prisma.footer.findUnique({
      where: { form0Id },
    });
  }

}