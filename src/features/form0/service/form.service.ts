import { Injectable } from '@nestjs/common';
import {
  CreateFormDto
} from '../dto/create-form.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';

@Injectable()
export class FormService {
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
  // HELPER: get all preset options for a group
  // ─────────────────────────────────────────────
  async getPresets(group: string) {
    return this.prisma.keyValue.findMany({
      where: { group, isPreset: true },
      orderBy: { id: 'asc' },
    });
  }

  // ─────────────────────────────────────────────
  // FORM 0
  // ─────────────────────────────────────────────

  async createForm0(dto: CreateFormDto) {
    const { Form0, Form0_1, Form0_2 } = dto;

    return this.prisma.$transaction(async (tx) => {
      const statusCaDebItem    = (Form0_2 ?? []).find(i => i.key === 'StatusCaDeb');
      const jenisPengajuanItem = (Form0_2 ?? []).find(i => i.key === 'JenisPengajuan');

      const statusCaDebId    = statusCaDebItem
        ? await this.resolveKeyValueId(tx, statusCaDebItem)
        : null;
      const jenisPengajuanId = jenisPengajuanItem
        ? await this.resolveKeyValueId(tx, jenisPengajuanItem)
        : null;

      return tx.form0.create({
        data: {
          TanggalTelepon:   Form0.TanggalTelepon,
          JamTelepon:       Form0.JamTelepon,
          Cabang:           Form0.Cabang,
          NamaCmo:          Form0.NamaCmo,
          FidCmo:           Form0.FidCmo,
          NamaDebitur:      Form0.NamaDebitur,
          NamaDealer:       Form0.NamaDealer,
          Msub:             Form0.Msub,
          StatusCaDebId:    statusCaDebId,
          JenisPengajuanId: jenisPengajuanId,
          kendaraan: {
            create: Form0_1?.map((k) => ({
              key:   k.key,
              data1: k.data1 ?? null,
              data2: k.data2 ?? null,
              data3: k.data3 ?? null,
              data4: k.data4 ?? null,
            })),
          },
        },
        include: {
          kendaraan:      true,
          StatusCaDeb:    true,
          JenisPengajuan: true,
        },
      });
    });
  }

  async findAllForm0() {
    return this.prisma.form0.findMany({
      include: {
        kendaraan:      true,
        StatusCaDeb:    true,
        JenisPengajuan: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm0(id: number) {
    return this.prisma.form0.findUnique({
      where: { id },
      include: {
        kendaraan:      true,
        StatusCaDeb:    true,
        JenisPengajuan: true,
      },
    });
  }

  async updateForm0(id: number, dto: CreateFormDto) {
    const { Form0, Form0_1, Form0_2 } = dto;

    return this.prisma.$transaction(async (tx) => {
      await tx.keyList.deleteMany({ where: { form0Id: id } });

      const statusCaDebItem    = (Form0_2 ?? []).find(i => i.key === 'StatusCaDeb');
      const jenisPengajuanItem = (Form0_2 ?? []).find(i => i.key === 'JenisPengajuan');

      const statusCaDebId    = statusCaDebItem
        ? await this.resolveKeyValueId(tx, statusCaDebItem)
        : null;
      const jenisPengajuanId = jenisPengajuanItem
        ? await this.resolveKeyValueId(tx, jenisPengajuanItem)
        : null;

      return tx.form0.update({
        where: { id },
        data: {
          TanggalTelepon:   Form0.TanggalTelepon,
          JamTelepon:       Form0.JamTelepon,
          Cabang:           Form0.Cabang,
          NamaCmo:          Form0.NamaCmo,
          FidCmo:           Form0.FidCmo,
          NamaDebitur:      Form0.NamaDebitur,
          NamaDealer:       Form0.NamaDealer,
          Msub:             Form0.Msub,
          StatusCaDebId:    statusCaDebId,
          JenisPengajuanId: jenisPengajuanId,
          kendaraan: {
            create: Form0_1?.map((k) => ({
              key:   k.key,
              data1: k.data1 ?? null,
              data2: k.data2 ?? null,
              data3: k.data3 ?? null,
              data4: k.data4 ?? null,
            })),
          },
          updatedAt: new Date()
        },
        include: {
          kendaraan:      true,
          StatusCaDeb:    true,
          JenisPengajuan: true,
        },
      });
    });
  }

  async removeForm0(id: number) {
    await this.prisma.form0.delete({ where: { id } });
    return { message: 'Form0 deleted successfully' };
  }

}