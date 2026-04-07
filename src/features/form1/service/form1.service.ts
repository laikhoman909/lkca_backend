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
        label:       item.label,
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
    const { Form1_0, Form1_1, FormSec1DTO } = dto;
    return this.prisma.$transaction(async (tx) => {
      const kvIds1 = await Promise.all(
        (Form1_0 ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );
      const kvIds2 = await Promise.all(
        (Form1_1 ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );

      return tx.form1.create({
        data: {
          formRefId: dto.formRefId,
          latarBelakangPribadi: {
            connect: kvIds1.map((id) => ({ id })),
          },
          latarBelakangBu: {
            connect: kvIds2.map((id) => ({ id })),
          },
          SusunanPengurus: {
            create: (dto.FormSec1DTO?.Tabel ?? []).map((sp) => ({
              NamaJabatan: sp.namaJabatan ?? null,
              BesarSaham:  sp.besarSaham  ?? null,
              Persen:      sp.persen      ?? null,
              Hubungan:    sp.hubungan    ?? null
            })),
          },
          keterangan: FormSec1DTO?.Keterangan
        },
        include: {
          SusunanPengurus: true,
          latarBelakangPribadi: true,
          latarBelakangBu: true
        },
      });
    });
  }

  async findAllForm1() {
    return this.prisma.form1.findMany({
      include: { latarBelakangPribadi: true, latarBelakangBu: true, SusunanPengurus: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm1(id: number) {
    return this.prisma.form1.findUnique({
      where: { id },
      include: { latarBelakangPribadi: true, latarBelakangBu: true, SusunanPengurus: true },
    });
  }

  async removeForm1(id: number) {
    await this.prisma.form1.delete({ where: { id } });
    return { message: 'Form1 deleted successfully' };
  }

}