
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * UpdateProductDto extends CreateProductDto but makes all fields optional
 * This allows partial updates of product information
 */
export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, [] as const)
) {}
