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

    const firstResult = await this.prisma.$transaction(async (tx) => {
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
    return this.transformToCreateFormDto(firstResult);

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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form0 database result to CreateFormDto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateFormDto(form0: any): CreateFormDto | null {

    const result = new CreateFormDto();
    result.formRefId = form0.id;

    // Transform Form0 (main form data)
    result.Form0 = {
      TanggalTelepon: form0.TanggalTelepon,
      JamTelepon: form0.JamTelepon,
      Cabang: form0.Cabang,
      NamaCmo: form0.NamaCmo,
      FidCmo: form0.FidCmo,
      NamaDebitur: form0.NamaDebitur,
      NamaDealer: form0.NamaDealer,
      Msub: form0.Msub,
    };

    // Transform kendaraan (Form0_1)
    if (form0.kendaraan && Array.isArray(form0.kendaraan)) {
      result.Form0_1 = form0.kendaraan.map((k: any) => ({
        key: k.key,
        data1: k.data1,
        data2: k.data2,
        data3: k.data3,
        data4: k.data4,
      }));
    }

    // Transform StatusCaDeb and JenisPengajuan (Form0_2)
    const form0_2: KeyValueInputDto[] = [];
    if (form0.StatusCaDeb) {
      form0_2.push({
        key: 'StatusCaDeb',
        Value: form0.StatusCaDeb.value,
        label: form0.StatusCaDeb.label,
        CustomValue: form0.StatusCaDeb.CustomValue,
      });
    }
    if (form0.JenisPengajuan) {
      form0_2.push({
        key: 'JenisPengajuan',
        Value: form0.JenisPengajuan.value,
        label: form0.JenisPengajuan.label,
        CustomValue: form0.JenisPengajuan.CustomValue,
      });
    }
    result.Form0_2 = form0_2.length > 0 ? form0_2 : undefined;

    return result;
  }

  async findOneForm0(id: number) {
    const form0 = await this.prisma.form0.findUnique({
      where: { id },
      include: {
        kendaraan:      true,
        StatusCaDeb:    true,
        JenisPengajuan: true,
      },
    });
    return this.transformToCreateFormDto(form0);
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