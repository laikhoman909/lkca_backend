import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

/**
 * PrismaService wraps the PrismaClient and handles connection lifecycle
 * Implements OnModuleInit to connect when the module initializes
 * Implements OnModuleDestroy to disconnect when the application shuts down
 */
@Injectable()
export class PrismaService 
  extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    // 1. Setup the native PG connection pool
    // const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    // 2. Initialize the Prisma Adapter
    const adapter = new PrismaPg(
        {
          user: process.env.DB_USERNAME,
          database: process.env.DB_DATABASE,
          port: 5432,
          password: process.env.DB_PASSWORD,
          host: process.env.DB_HOST,
        },
        { schema: process.env.DB_SCHEMA },
      );
  
      // 3. Pass the adapter to the parent PrismaClient
      super({ adapter });
  }

  /**
   * Connect to the database when the module initializes
   */
  async onModuleInit() {
    await this.$connect();
    console.log('Database connected successfully');
  }

  /**
   * Disconnect from the database when the application shuts down
   */
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Database disconnected');
  }

  /**
   * Utility method to clean the database (useful for testing)
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }

    // Delete in correct order to respect foreign key constraints
    await this.product.deleteMany();
    await this.user.deleteMany();
  }
}