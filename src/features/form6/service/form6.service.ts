import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
import { CreateForm6Dto } from '../dto/create-form6.dto';

@Injectable()
export class Form6Service {
  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────
  // HELPER: resolve a KeyValueInputDto to a KeyValue id
  // Value = preset KeyValue id (string from frontend)
  // Updates CustomValue on the existing row, or creates a new one
  // ─────────────────────────────────────────────
  private async resolveKeyValueId(tx: any, item: KeyValueInputDto): Promise<number> {
    const presetId = parseInt(item.Value, 10);
    if (!isNaN(presetId)) {
      if(item.CustomValue){
        const byValue = await tx.keyValue.findMany({
          where: {CustomValue: item.CustomValue , group: item.key }
        });

        if( byValue.length == 0 ){
          // console.log('aa' + (byValue[0]?.label ?? '') );
          const created = await tx.keyValue.create({
            data: {
              group:       item.key,
              label:       byValue[0]?.label  ?? '',
              CustomValue: item.CustomValue ?? null,
              isPreset:    false
            },
          });
          return created.id;
        } 
      }
    }
    return presetId;
  }

  // ─────────────────────────────────────────────
  // HELPER: get all preset options for a group
  // ─────────────────────────────────────────────
  async getPresets(group: string) {
    return this.prisma.keyValue.findMany({
      where: { group, isPreset: true },
      orderBy: { id: 'asc' },
    });
  }

  // ─────────────────────────────────────────────
  // FORM 6
  // Uses implicit many-to-many with KeyValue via @relation("Form6KeyValues")
  // ─────────────────────────────────────────────

  async createForm6(dto: CreateForm6Dto) {
    const { Form6_0, FormSec6DTO } = dto;

    return this.prisma.$transaction(async (tx) => {
      const kvIds = await Promise.all(
        (Form6_0 ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );

      return tx.form6.create({
        data: {
          form0Id:                  dto.formRefId,
          NamaPerusahaan:           FormSec6DTO?.NamaPerusahaan           ?? null,
          JenisUsaha:               FormSec6DTO?.JenisUsaha               ?? null,
          AlamatUsahaKantor:        FormSec6DTO?.AlamatUsahaKantor        ?? null,
          AlamatPool:               FormSec6DTO?.AlamatPool               ?? null,
          TeleponHpEmail:           FormSec6DTO?.TeleponHpEmail           ?? null,
          UsahaPekerjaanSebelumnya: FormSec6DTO?.UsahaPekerjaanSebelumnya ?? null,
          UraianUsaha1:             FormSec6DTO?.UraianUsaha1             ?? null,
          UraianUsaha2:             FormSec6DTO?.UraianUsaha2             ?? null,
          UraianUsaha3:             FormSec6DTO?.UraianUsaha3             ?? null,
          ECallRekanan:             FormSec6DTO?.ECallRekanan             ?? null,
          ECallLainnya:             FormSec6DTO?.ECallLainnya             ?? null,
          keyValues: {
            connect: kvIds.map((id) => ({ id })),
          },
        },
        include: { keyValues: true },
      });
    });
  }

  async findAllForm6() {
    return this.prisma.form6.findMany({
      include: { keyValues: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm6(form0Id: number) {
    return this.prisma.form6.findUnique({
      where: { form0Id },
      include: { keyValues: true },
    });
  }

  async removeForm6(form0Id: number) {
    await this.prisma.form6.delete({ where: { form0Id } });
    return { message: 'Form6 deleted successfully' };
  }
}