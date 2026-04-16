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
    const { Form6_0, FormSec6DTO, FormSec6_1DTO } = dto;

    const kvIds = await Promise.all(
      (Form6_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );

    return this.prisma.form6.create({
      data: {
        form0Id:                  dto.formRefId,
        NamaPerusahaan:           FormSec6DTO?.Nama                 ?? null,
        JenisUsaha:               FormSec6DTO?.usaha                ?? null,
        AlamatUsahaKantor:        FormSec6DTO?.alamatUsaha          ?? null,
        AlamatPool:               FormSec6DTO?.alamatPool           ?? null,
        TeleponHpEmail:           FormSec6DTO?.telepon              ?? null,
        UsahaPekerjaanSebelumnya: FormSec6DTO?.usaha                ?? null,
        UraianUsaha1:             FormSec6_1DTO?.Usaha1             ?? null,
        UraianUsaha2:             FormSec6_1DTO?.Usaha2             ?? null,
        UraianUsaha3:             FormSec6_1DTO?.Usaha3             ?? null,
        ECallRekanan:             FormSec6_1DTO?.ECall1             ?? null,
        ECallLainnya:             FormSec6_1DTO?.ECall2             ?? null,
        keyValues: {
          connect: kvIds.map((kvId) => ({ id: kvId })),
        },
      },
      include: { keyValues: true },
    });
  }

  async updateForm6(form0Id: number, dto: CreateForm6Dto) {
    const { Form6_0, FormSec6DTO, FormSec6_1DTO } = dto;

    const kvIds = await Promise.all(
      (Form6_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );

    return this.prisma.$transaction(async (tx) => {
      return tx.form6.update({
        where: { form0Id }, 
        data: {
          NamaPerusahaan:           FormSec6DTO?.Nama                 ?? null,
          JenisUsaha:               FormSec6DTO?.usaha                ?? null,
          AlamatUsahaKantor:        FormSec6DTO?.alamatUsaha          ?? null,
          AlamatPool:               FormSec6DTO?.alamatPool           ?? null,
          TeleponHpEmail:           FormSec6DTO?.telepon              ?? null,
          UsahaPekerjaanSebelumnya: FormSec6DTO?.usaha                ?? null,
          UraianUsaha1:             FormSec6_1DTO?.Usaha1             ?? null,
          UraianUsaha2:             FormSec6_1DTO?.Usaha2             ?? null,
          UraianUsaha3:             FormSec6_1DTO?.Usaha3             ?? null,
          ECallRekanan:             FormSec6_1DTO?.ECall1             ?? null,
          ECallLainnya:             FormSec6_1DTO?.ECall2             ?? null,
          keyValues: {
            set: [],
            connect: kvIds.map((kvId) => ({ id: kvId })),
          },
          updatedAt: new Date()
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