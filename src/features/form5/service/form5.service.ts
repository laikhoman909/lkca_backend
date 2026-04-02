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
        label:       item.Value,
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
  // FORM 5
  // Uses implicit many-to-many with KeyValue via @relation("Form5KeyValues")
  // ─────────────────────────────────────────────

  async createForm5(dto: CreateForm5Dto) {
    return this.prisma.$transaction(async (tx) => {
      const kvIds = await Promise.all(
        (dto.keyValues ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );

      return tx.form5.create({
        data: {
          formRefId:              dto.formRefId,
          HargaOtr:               dto.HargaOtr               ?? null,
          BesarDownPayment:       dto.BesarDownPayment        ?? null,
          NamaTeleponPenjual:     dto.NamaTeleponPenjual      ?? null,
          HasilKonfirmasiPenjual: dto.HasilKonfirmasiPenjual  ?? null,
          KapanMemilikiMobil:     dto.KapanMemilikiMobil      ?? null,
          BerapaHargaBeli:        dto.BerapaHargaBeli         ?? null,
          BesarKebutuhanDana:     dto.BesarKebutuhanDana      ?? null,
          TujuanKebutuhanDana:    dto.TujuanKebutuhanDana     ?? null,
          PosisiBpkb:             dto.PosisiBpkb              ?? null,
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

  async findOneForm5(id: number) {
    return this.prisma.form5.findUnique({
      where: { id },
      include: { keyValues: true },
    });
  }

  async removeForm5(id: number) {
    await this.prisma.form5.delete({ where: { id } });
    return { message: 'Form5 deleted successfully' };
  }

}