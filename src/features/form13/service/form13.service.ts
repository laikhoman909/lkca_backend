import { Injectable } from '@nestjs/common';
import {
 FormSec13DTO
} from '../dto/form-sec13.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class Form13Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // FORM 13
  // ─────────────────────────────────────────────

  async createForm13(dto: FormSec13DTO){
    return this.prisma.$transaction(async (tx) => {
      return tx.form13.create({
        data: {
          form0Id:  dto.formRefId,
          dpGross: dto.DPGross ?? 0,
          hargaPasar: dto.HargaPasar ?? 0,
          hargaRata: dto.HargaRataRata ?? 0,
          hargaReal: dto.HargaReal ?? 0,
          hargaTertinggi: dto.HargaTertinggi ?? 0,
          hargaTerendah: dto.HargaTerendah ?? 0,
          referensi: dto.Referensi ?? '',
          ltv: dto.ltv ?? 0,
          sph: dto.sph ?? 0
        }
      });
    });
  }

  async updateForm13( form0Id: number, dto: FormSec13DTO){
    return this.prisma.$transaction(async (tx) => {
      return tx.form13.update({
        where: { form0Id },
        data: {
          dpGross: dto.DPGross ?? 0,
          hargaPasar: dto.HargaPasar ?? 0,
          hargaRata: dto.HargaRataRata ?? 0,
          hargaReal: dto.HargaReal ?? 0,
          hargaTertinggi: dto.HargaTertinggi ?? 0,
          hargaTerendah: dto.HargaTerendah ?? 0,
          referensi: dto.Referensi ?? '',
          ltv: dto.ltv ?? 0,
          sph: dto.sph ?? 0
        }
      });
    });
  }

  async findAllForm13() {
    return this.prisma.form13.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm13(form0Id: number) {
    return this.prisma.form13.findUnique({
      where: { form0Id },
    });
  }

  async removeForm13(form0Id: number) {
    await this.prisma.form13.delete({ where: { form0Id } });
    return { message: 'Form13 deleted successfully' };
  }

}