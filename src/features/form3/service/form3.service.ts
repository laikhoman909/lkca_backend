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
  // FORM 3
  // Uses implicit many-to-many with KeyValue
  // ─────────────────────────────────────────────

  async createForm3(dto: CreateForm3Dto) {
    const { Form3_0 } = dto;

    const kvIds1 = await Promise.all(
      (Form3_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
  
    return this.prisma.form3.create({
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

  async updateForm3(form0Id: number, dto: CreateForm3Dto) {
    const { Form3_0 } = dto;
    const kvIds1 = await Promise.all(
      (Form3_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
    
    return this.prisma.$transaction(async (tx) => {
      return tx.form3.update({
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

  async findAllForm3() {
    return this.prisma.form3.findMany({
      include: { keyValues: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm3(form0Id: number) {
    return this.prisma.form3.findUnique({
      where: { form0Id },
      include: { keyValues: true },
    });
  }

  async removeForm3(form0Id: number) {
    await this.prisma.form3.delete({ where: { form0Id } });
    return { message: 'Form3 deleted successfully' };
  }

}