
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new product
   * Only accessible by admin users
   */
  async create(createProductDto: CreateProductDto, userId: string) {
    return await this.prisma.product.create({
      data: {
        ...createProductDto,
        stock: createProductDto.stock || 0, // Default stock to 0 if not provided
        userId, // Associate product with the user who created it
      },
    });
  }

  /**
   * Get all products
   * Publicly accessible
   */
  async findAll() {
    return await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' }, // Order by creation date, newest first
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  /**
   * Get a single product by ID
   * Publicly accessible
   */
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  /**
   * Update a product
   * Only accessible by admin users
   */
  async update(id: string, updateProductDto: UpdateProductDto) {
    // Check if product exists
    await this.findOne(id);

    // Update product with new data
    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  /**
   * Delete a product
   * Only accessible by admin users
   */
  async remove(id: string) {
    // Check if product exists
    const product = await this.findOne(id);

    // Delete the product
    await this.prisma.product.delete({
      where: { id },
    });
  }

  /**
   * Update product stock
   * Helper method for inventory management
   */
  async updateStock(id: string, quantity: number) {
    const product = await this.findOne(id);
    
    // Ensure stock doesn't go negative
    const newStock = Math.max(0, product.stock + quantity);
    
    return await this.prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  }
}
