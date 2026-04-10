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
  // FORM 4
  // Uses implicit many-to-many with KeyValue
  // ─────────────────────────────────────────────

  async createForm3(dto: CreateForm4Dto) {
    const { Form4_0 } = dto;

    const kvIds1 = await Promise.all(
      (Form4_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
  
    return this.prisma.form4.create({
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