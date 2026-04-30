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
  // FORM 5
  // Uses implicit many-to-many with KeyValue
  // ─────────────────────────────────────────────

  async createForm5(dto: CreateForm5Dto) {
    const { Form5_0, FormSec5DTO } = dto;
    
    const kvIds = await Promise.all(
      (Form5_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );

    const firstResult = await this.prisma.form5.create({
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
          connect: kvIds.map((kvId) => ({ id: kvId })),
        },
      },
      include: { keyValues: true },
    });
    return this.transformToCreateForm5Dto(firstResult);
  }

  async updateForm5(form0Id: number,dto: CreateForm5Dto) {
    const { Form5_0, FormSec5DTO } = dto;
    
    const kvIds = await Promise.all(
      (Form5_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );

    return this.prisma.$transaction(async (tx) => {
      return tx.form5.update({
        where: { form0Id }, 
        data: {
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
            set: [],
            connect: kvIds.map((kvId) => ({ id: kvId })),
          },
          updatedAt: new Date()
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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form5 database result to CreateForm5Dto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateForm5Dto(form5: any): CreateForm5Dto | null {
    // if (!form5) return null;

    const result = new CreateForm5Dto();
    result.formRefId = form5.form0Id;

    // Transform keyValues to Form5_0
    if (form5.keyValues && Array.isArray(form5.keyValues)) {
      result.Form5_0 = form5.keyValues.map((kv: any) => ({
        key: kv.group,
        Value: kv.value,
        label: kv.label,
        CustomValue: kv.CustomValue,
      }));
    }

    // Transform FormSec5DTO
    result.FormSec5DTO = {
      HargaOtr: form5.HargaOtr,
      BesarDownPayment: form5.BesarDownPayment,
      NamaTeleponPenjual: form5.NamaTeleponPenjual,
      HasilKonfirmasiPenjual: form5.HasilKonfirmasiPenjual,
      KapanMemilikiMobil: form5.KapanMemilikiMobil,
      BerapaHargaBeli: form5.BerapaHargaBeli,
      BesarKebutuhanDana: form5.BesarKebutuhanDana,
      TujuanKebutuhanDana: form5.TujuanKebutuhanDana,
      PosisiBpkb: form5.PosisiBpkb,
    };

    return result;
  }

  async findOneForm5(form0Id: number) {
    const form5 = await this.prisma.form5.findUnique({
      where: { form0Id },
      include: { keyValues: true },
    });
    return this.transformToCreateForm5Dto(form5);
  }

  async removeForm5(form0Id: number) {
    await this.prisma.form5.delete({ where: { form0Id } });
    return { message: 'Form5 deleted successfully' };
  }

}