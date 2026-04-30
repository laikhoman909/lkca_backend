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
    const byValue = await tx.keyValue.findMany({
      where: {CustomValue: item.CustomValue , group: item.key, value: item.Value }
    });

    if( byValue.length == 0 ){
      // console.log('aa' + (byValue[0]?.label ?? '') );
      const created = await tx.keyValue.create({
        data: {
          group:       item.key,
          value:       item.Value,
          label:       byValue[0]?.label  ?? '',
          CustomValue: item.CustomValue ?? '',
          isPreset:    false
        },
      });
      return created.id;
    } 
    return byValue[0].id;
  }


  // ─────────────────────────────────────────────
  // FORM 4
  // Uses implicit many-to-many with KeyValue
  // ─────────────────────────────────────────────

  async createForm4(dto: CreateForm4Dto) {
    const { Form4_0 } = dto;

    const kvIds1 = await Promise.all(
      (Form4_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
  
    const firstResult = await this.prisma.form4.create({
      data: {
        form0Id: dto.formRefId,
        keyValues: {
          connect: kvIds1.map((kvId) => ({ id: kvId })),
        }
      },
      include: {
        keyValues: true
      },
    });
    return this.transformToCreateForm4Dto(firstResult);
  }

  async updateForm4(form0Id: number, dto: CreateForm4Dto) {
    const { Form4_0 } = dto;

    const kvIds1 = await Promise.all(
      (Form4_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
  
    return this.prisma.$transaction(async (tx) => {
      return this.prisma.form4.update({
        where: { form0Id },
        data: {
          keyValues: {
            set: [],
            connect: kvIds1.map((kvId) => ({ id: kvId })),
          },
          updatedAt: new Date()
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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form4 database result to CreateForm4Dto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateForm4Dto(form4: any): CreateForm4Dto | null {
    // if (!form4) return null;

    const result = new CreateForm4Dto();
    result.formRefId = form4.form0Id;

    // Transform keyValues to Form4_0
    if (form4.keyValues && Array.isArray(form4.keyValues)) {
      result.Form4_0 = form4.keyValues.map((kv: any) => ({
        key: kv.group,
        Value: kv.value,
        label: kv.label,
        CustomValue: kv.CustomValue,
      }));
    }

    return result;
  }

  async findOneForm4(form0Id: number) {
    const form4 = await this.prisma.form4.findUnique({
      where: { form0Id },
      include: { keyValues: true },
    });
    return this.transformToCreateForm4Dto(form4);
  }

  async removeForm4(form0Id: number) {
    await this.prisma.form4.delete({ where: { form0Id } });
    return { message: 'Form4 deleted successfully' };
  }

}