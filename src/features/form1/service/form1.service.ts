import { Injectable } from '@nestjs/common';
import {
  CreateForm1Dto,
} from '../dto/create-form1.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';

@Injectable()
export class Form1Service {
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
  // FORM 1
  // Uses implicit many-to-many with KeyValue
  // ─────────────────────────────────────────────

  async createForm1(dto: CreateForm1Dto) {
    const { Form1_0, Form1_1, FormSec1DTO } = dto;

    const kvIds1 = await Promise.all(
      (Form1_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
    const kvIds2 = await Promise.all(
      (Form1_1 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
    var kvIds = [...kvIds1, ...kvIds2];

    return this.prisma.form1.create({
      data: {
        form0Id: dto.formRefId,
        latarBelakang: {
          connect: kvIds.map((kvId) => ({ id: kvId })),
        },
        SusunanPengurus: {
          create: (dto.FormSec1DTO?.Tabel ?? []).map((sp) => ({
            NamaJabatan: sp.namaJabatan ?? null,
            BesarSaham:  sp.besarSaham  ?? null,
            Persen:      sp.persen      ?? null,
            Hubungan:    sp.hubungan    ?? null
          })),
        },
        keterangan: FormSec1DTO?.Keterangan
      },
      include: {
        SusunanPengurus: true,
        latarBelakang: true,
      },
    });

  }

  async updateForm1(form0Id: number, dto: CreateForm1Dto) {
    const { Form1_0, Form1_1, FormSec1DTO } = dto;
    return this.prisma.$transaction(async (tx) => {
      await tx.form1SusunanPengurus.deleteMany({ where: { form1Id: form0Id } });

      const kvIds1 = await Promise.all(
        (Form1_0 ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );
      const kvIds2 = await Promise.all(
        (Form1_1 ?? []).map((item) => this.resolveKeyValueId(tx, item)),
      );
      var kvIds = [...kvIds1, ...kvIds2];

      return tx.form1.update({
        where: { form0Id },
        data: {
          latarBelakang: {
            connect: kvIds.map((kvId) => ({ id: kvId })),
          },
          SusunanPengurus: {
            create: (dto.FormSec1DTO?.Tabel ?? []).map((sp) => ({
              NamaJabatan: sp.namaJabatan ?? null,
              BesarSaham:  sp.besarSaham  ?? null,
              Persen:      sp.persen      ?? null,
              Hubungan:    sp.hubungan    ?? null
            })),
          },
          keterangan: FormSec1DTO?.Keterangan
        },
        include: {
          SusunanPengurus: true,
          latarBelakang: true
        },
      });
    });
  }

  async findAllForm1() {
    return this.prisma.form1.findMany({
      include: { SusunanPengurus: true, latarBelakang: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneForm1(form0Id: number) {
    return this.prisma.form1.findUnique({
      where: { form0Id },
      include: { SusunanPengurus: true, latarBelakang: true },
    });
  }

  async removeForm1(form0Id: number) {
    await this.prisma.form1.delete({ where: { form0Id } });
    return { message: 'Form1 deleted successfully' };
  }

}