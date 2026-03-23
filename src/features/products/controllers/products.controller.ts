
import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    HttpCode, 
    HttpStatus,
    UseGuards,
  } from '@nestjs/common';
  import { ProductsService } from '../services/products.service';
  import { CreateProductDto } from '../dto/create-product.dto';
  import { UpdateProductDto } from '../dto/update-product.dto';
import { UserRole } from 'generated/prisma/client';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guards';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
  
  
  @UseGuards(JwtAuthGuard, RolesGuard) // Apply guards to all routes in this controller
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    /**
     * Create a new product
     * Requires JWT authentication and admin role
     */
    @Post()
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: any) {
      return this.productsService.create(createProductDto, user.id);
    }
  
    /**
     * Get all products
     * Publicly accessible - no role required, but JWT token is needed
     * Note: If you want truly public access, remove @UseGuards from this method
     */
    @Get()
    findAll() {
      return this.productsService.findAll();
    }
  
    /**
     * Get a single product by ID
     * Publicly accessible - no role required, but JWT token is needed
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.productsService.findOne(id);
    }
  
    /**
     * Update a product
     * Requires JWT authentication and admin role
     */
    @Patch(':id')
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
      return this.productsService.update(id, updateProductDto);
    }
  
    /**
     * Delete a product
     * Requires JWT authentication and admin role
     */
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
      return this.productsService.remove(id);
    }
  }
  