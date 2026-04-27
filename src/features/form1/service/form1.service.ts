import { Injectable } from '@nestjs/common';
import {
  CreateForm1Dto,
} from '../dto/create-form1.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { KeyValueInputDto } from 'src/common/dto/key-value.dto';

@Injectable()
export class Form1Service {
  constructor(private prisma: PrismaService) {}

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: resolve a KeyValueInputDto to a KeyValue id
  // Value = preset KeyValue id (string from frontend)
  // Updates CustomValue on the existing row, or creates a new one
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
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


  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // FORM 1
  // Uses implicit many-to-many with KeyValue
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

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
    const kvIds1 = await Promise.all(
      (Form1_0 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
    const kvIds2 = await Promise.all(
      (Form1_1 ?? []).map((item) => this.resolveKeyValueId(this.prisma, item)),
    );
    var kvIds = [...kvIds1, ...kvIds2];

    return this.prisma.$transaction(async (tx) => {
      await tx.form1SusunanPengurus.deleteMany({ where: { form1Id: form0Id } });
      return tx.form1.update({
        where: { form0Id },
        data: {
          latarBelakang: {
            set:     [],
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
          keterangan: FormSec1DTO?.Keterangan,
          updatedAt: new Date()

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

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // HELPER: Transform Form1 database result to CreateForm1Dto format
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  private transformToCreateForm1Dto(form1: any): CreateForm1Dto | null {
    if (!form1) return null;

    const result = new CreateForm1Dto();
    result.formRefId = form1.form0Id;

    // Transform latarBelakang (KeyValue entities) to Form1_0 and Form1_1 arrays
    // Group by the 'group' field to separate Form1_0 and Form1_1
    const form1_0: KeyValueInputDto[] = [];
    const form1_1: KeyValueInputDto[] = [];

    if (form1.latarBelakang && Array.isArray(form1.latarBelakang)) {
      for (const kv of form1.latarBelakang) {
        const item = new KeyValueInputDto();
        item.key = kv.group;
        item.Value = kv.id.toString();
        item.label = kv.label;
        item.CustomValue = kv.CustomValue;

        // Split based on group name pattern (Form1_0 or Form1_1)
        if (kv.group && kv.group.startsWith('Form1_0')) {
          form1_0.push(item);
        } else if (kv.group && kv.group.startsWith('Form1_1')) {
          form1_1.push(item);
        }
      }
    }

    result.Form1_0 = form1_0.length > 0 ? form1_0 : undefined;
    result.Form1_1 = form1_1.length > 0 ? form1_1 : undefined;

    // Transform SusunanPengurus to FormSec1DTO format
    if (form1.SusunanPengurus && Array.isArray(form1.SusunanPengurus) && form1.SusunanPengurus.length > 0) {
      result.FormSec1DTO = {
        Keterangan: form1.keterangan || undefined,
        Tabel: form1.SusunanPengurus.map((sp: any) => ({
          namaJabatan: sp.NamaJabatan,
          besarSaham: sp.BesarSaham,
          persen: sp.Persen,
          hubungan: sp.Hubungan,
        })),
      };
    } else if (form1.keterangan) {
      result.FormSec1DTO = {
        Keterangan: form1.keterangan,
        Tabel: [],
      };
    }

    return result;
  }

  async findOneForm1(form0Id: number) {
    const form1 = await this.prisma.form1.findUnique({
      where: { form0Id },
      include: { SusunanPengurus: true, latarBelakang: true },
    });
    return this.transformToCreateForm1Dto(form1);
  }

  async removeForm1(form0Id: number) {
    await this.prisma.form1.delete({ where: { form0Id } });
    return { message: 'Form1 deleted successfully' };
  }

}