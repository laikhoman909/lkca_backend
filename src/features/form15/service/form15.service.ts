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
    const firstResult = await this.prisma.$transaction(async (tx) => {
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
    return this.transformToFooterDto(firstResult);
  }

  async updateForm15(form0Id: number, dto: FooterDTO){
    const firstResult = await this.prisma.$transaction(async (tx) => {
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
    return this.transformToFooterDto(firstResult);
  }

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form15 database result to FooterDTO format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToFooterDto(form15: any): FooterDTO | null {
    if (!form15) return null;

    const result = new FooterDTO();
    result.formRefId = form15.form0Id;
    result.Signature1 = form15.signature1;
    result.Signature2 = form15.signature2;
    result.Keterangan = form15.keterangan;
    result.RekomendasiCA = form15.rekomendasiCA;

    return result;
  }

  async findOneForm15(form0Id: number) {
    const form15 = await this.prisma.footer.findUnique({
      where: { form0Id },
    });
    return this.transformToFooterDto(form15);
  }
}