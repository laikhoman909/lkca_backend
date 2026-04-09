import { Injectable } from '@nestjs/common';
import {
  CreateForm4Dto,
} from '../dto/create-form4.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';

@Injectable()
export class Form4Service {
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
  // FORM 4
  // Uses implicit many-to-many with KeyValue via @relation("Form4KeyValues")
  // ─────────────────────────────────────────────

  async createForm4(dto: CreateForm4Dto) {
    const { Form4_0 } = dto;
    return this.prisma.$transaction(async (tx) => {
      const kvIds1 = await Promise.all(
        (Form4_0 ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );

      return tx.form4.create({
        data: {
          form0Id: dto.formRefId,
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

  async findAllForm4() {
    return this.prisma.form4.findMany({
      include: { keyValues: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm4(form0Id: number) {
    return this.prisma.form4.findUnique({
      where: { form0Id },
      include: { keyValues: true },
    });
  }

  async removeForm4(form0Id: number) {
    await this.prisma.form4.delete({ where: { form0Id } });
    return { message: 'Form4 deleted successfully' };
  }

}