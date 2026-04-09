import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';
import { CreateForm5Dto } from '../dto/create-form5.dto';

@Injectable()
export class Form5Service {
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
        isPreset:    false
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
  // FORM 5
  // Uses implicit many-to-many with KeyValue via @relation("Form5KeyValues")
  // ─────────────────────────────────────────────

  async createForm5(dto: CreateForm5Dto) {
    const { Form5_0, FormSec5DTO } = dto;

    return this.prisma.$transaction(async (tx) => {
      const kvIds = await Promise.all(
        (Form5_0 ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );

      return tx.form5.create({
        data: {
          form0Id:                dto.formRefId,
          HargaOtr:               FormSec5DTO?.HargaOtr               ?? null,
          BesarDownPayment:       FormSec5DTO?.BesarDownPayment        ?? null,
          NamaTeleponPenjual:     FormSec5DTO?.NamaTeleponPenjual      ?? null,
          HasilKonfirmasiPenjual: FormSec5DTO?.HasilKonfirmasiPenjual  ?? null,
          KapanMemilikiMobil:     FormSec5DTO?.KapanMemilikiMobil      ?? null,
          BerapaHargaBeli:        FormSec5DTO?.BerapaHargaBeli         ?? null,
          BesarKebutuhanDana:     FormSec5DTO?.BesarKebutuhanDana      ?? null,
          TujuanKebutuhanDana:    FormSec5DTO?.TujuanKebutuhanDana     ?? null,
          PosisiBpkb:             FormSec5DTO?.PosisiBpkb              ?? null,
          keyValues: {
            connect: kvIds.map((id) => ({ id })),
          },
        },
        include: { keyValues: true },
      });
    });
  }

  async findAllForm5() {
    return this.prisma.form5.findMany({
      include: { keyValues: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm5(form0Id: number) {
    return this.prisma.form5.findUnique({
      where: { form0Id },
      include: { keyValues: true },
    });
  }

  async removeForm5(form0Id: number) {
    await this.prisma.form5.delete({ where: { form0Id } });
    return { message: 'Form5 deleted successfully' };
  }

}