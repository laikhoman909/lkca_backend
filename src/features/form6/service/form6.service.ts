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
      await tx.keyValue.update({
        where: { id: presetId },
        data: { CustomValue: item.CustomValue ?? null },
      });
      return presetId;
    }

    // Fallback: create a new custom row if Value is not a valid id
    const created = await tx.keyValue.create({
      data: {
        group:       item.key,
        label:       item.label,
        CustomValue: item.CustomValue ?? null,
        isPreset:    false,
        isSelected:  true,
      },
    });
    return created.id;
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
    return this.prisma.$transaction(async (tx) => {
      const kvIds = await Promise.all(
        (dto.keyValues ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );

      return tx.form6.create({
        data: {
          formRefId:                dto.formRefId,
          NamaPerusahaan:           dto.NamaPerusahaan           ?? null,
          JenisUsaha:               dto.JenisUsaha               ?? null,
          AlamatUsahaKantor:        dto.AlamatUsahaKantor        ?? null,
          AlamatPool:               dto.AlamatPool               ?? null,
          TeleponHpEmail:           dto.TeleponHpEmail           ?? null,
          UsahaPekerjaanSebelumnya: dto.UsahaPekerjaanSebelumnya ?? null,
          UraianUsaha1:             dto.UraianUsaha1             ?? null,
          UraianUsaha2:             dto.UraianUsaha2             ?? null,
          UraianUsaha3:             dto.UraianUsaha3             ?? null,
          ECallRekanan:             dto.ECallRekanan             ?? null,
          ECallLainnya:             dto.ECallLainnya             ?? null,
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

  async findOneForm6(id: number) {
    return this.prisma.form6.findUnique({
      where: { id },
      include: { keyValues: true },
    });
  }

  async removeForm6(id: number) {
    await this.prisma.form6.delete({ where: { id } });
    return { message: 'Form6 deleted successfully' };
  }
}