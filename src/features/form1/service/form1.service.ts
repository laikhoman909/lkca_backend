import { Injectable } from '@nestjs/common';
import {
  CreateForm1Dto,
} from '../dto/create-form1.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';

@Injectable()
export class Form1Service {
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
        label:       item.Value,
        CustomValue: item.CustomValue ?? null,
        isPreset:    false,
        isSelected:  true,
      },
    });
    return created.id;
  }


  // ─────────────────────────────────────────────
  // FORM 1
  // Uses implicit many-to-many with KeyValue via @relation("Form1KeyValues")
  // ─────────────────────────────────────────────

  async createForm1(dto: CreateForm1Dto) {
    return this.prisma.$transaction(async (tx) => {
      const kvIds = await Promise.all(
        (dto.keyValues ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );

      return tx.form1.create({
        data: {
          formRefId: dto.formRefId,
          keyValues: {
            connect: kvIds.map((id) => ({ id })),
          },
          SusunanPengurus: {
            create: (dto.SusunanPengurus ?? []).map((sp) => ({
              NamaJabatan: sp.NamaJabatan ?? null,
              BesarSaham:  sp.BesarSaham  ?? null,
              Persen:      sp.Persen      ?? null,
              Hubungan:    sp.Hubungan    ?? null,
              Keterangan:  sp.Keterangan  ?? null,
            })),
          },
        },
        include: {
          keyValues:       true,
          SusunanPengurus: true,
        },
      });
    });
  }

  async findAllForm1() {
    return this.prisma.form1.findMany({
      include: { keyValues: true, SusunanPengurus: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm1(id: number) {
    return this.prisma.form1.findUnique({
      where: { id },
      include: { keyValues: true, SusunanPengurus: true },
    });
  }

  async removeForm1(id: number) {
    await this.prisma.form1.delete({ where: { id } });
    return { message: 'Form1 deleted successfully' };
  }

}