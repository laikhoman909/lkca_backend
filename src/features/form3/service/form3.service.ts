import { Injectable } from '@nestjs/common';
import {
  CreateForm3Dto,
} from '../dto/create-form3.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';

@Injectable()
export class Form3Service {
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
  // FORM 3
  // Uses implicit many-to-many with KeyValue via @relation("Form3KeyValues")
  // ─────────────────────────────────────────────

  async createForm3(dto: CreateForm3Dto) {
    const { Form3_0 } = dto;
    return this.prisma.$transaction(async (tx) => {
      const kvIds1 = await Promise.all(
        (Form3_0 ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );

      return tx.form3.create({
        data: {
          formRefId: dto.formRefId,
          keyValues: {
            connect: kvIds1.map((id) => ({ id })),
          }
        },
        include: {
          keyValues: true
        },
      });
    });
  }

  async findAllForm3() {
    return this.prisma.form3.findMany({
      include: { keyValues: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm3(id: number) {
    return this.prisma.form3.findUnique({
      where: { id },
      include: { keyValues: true },
    });
  }

  async removeForm3(id: number) {
    await this.prisma.form3.delete({ where: { id } });
    return { message: 'Form3 deleted successfully' };
  }

}