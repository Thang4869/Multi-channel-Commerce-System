// ============================================
// PRISMA SEED DATA
// ============================================

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  try {
    // Clear existing data (if table exists)
    try {
      await prisma.notification.deleteMany({});
      await prisma.deliveryTracking.deleteMany({});
      await prisma.delivery.deleteMany({});
      await prisma.orderItem.deleteMany({});
      await prisma.order.deleteMany({});
      await prisma.storeStock.deleteMany({});
      await prisma.warehouseStock.deleteMany({});
      await prisma.product.deleteMany({});
      await prisma.category.deleteMany({});
      await prisma.brand.deleteMany({});
      await prisma.warehouseDistribution.deleteMany({});
      await prisma.inventoryTransaction.deleteMany({});
      await prisma.storeStaff.deleteMany({});
      await prisma.store.deleteMany({});
      await prisma.warehouseStaff.deleteMany({});
      await prisma.warehouse.deleteMany({});
      await prisma.refreshToken.deleteMany({});
      await prisma.user.deleteMany({});
    } catch (e) {
      console.log('Note: Some tables may not exist yet:', (e as any).message);
    }

    // Create users
    const adminPass = await bcrypt.hash('password123', 10);
    const staffPass = await bcrypt.hash('password123', 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: adminPass,
        fullName: 'Admin User',
        phone: '+1234567890',
        roles: ['ADMIN'],
        isActive: true,
      },
    });

    const warehouseManager = await prisma.user.create({
      data: {
        email: 'manager@warehouse.local',
        password: staffPass,
        fullName: 'Warehouse Manager',
        phone: '+1234567891',
        roles: ['WAREHOUSE_MANAGER'],
        isActive: true,
      },
    });

    const storeManager = await prisma.user.create({
      data: {
        email: 'manager@store.local',
        password: staffPass,
        fullName: 'Store Manager',
        phone: '+1234567892',
        roles: ['STORE_MANAGER'],
        isActive: true,
      },
    });

    const shipper = await prisma.user.create({
      data: {
        email: 'shipper@delivery.local',
        password: staffPass,
        fullName: 'John Shipper',
        phone: '+1234567893',
        roles: ['SHIPPER'],
        isActive: true,
      },
    });

    const customer = await prisma.user.create({
      data: {
        email: 'customer@example.com',
        password: staffPass,
        fullName: 'Jane Customer',
        phone: '+1234567894',
        roles: ['CUSTOMER'],
        isActive: true,
      },
    });

    console.log(`✅ Created 5 users`);

    // Create categories
    const electronics = await prisma.category.create({
      data: { name: 'Electronics', slug: 'electronics' },
    });

    const clothing = await prisma.category.create({
      data: { name: 'Clothing', slug: 'clothing' },
    });

    const shoes = await prisma.category.create({
      data: { name: 'Shoes', slug: 'shoes' },
    });

    console.log(`✅ Created 3 categories`);

    // Create brands
    const nike = await prisma.brand.create({
      data: { name: 'Nike', logo: 'nike.png' },
    });

    const apple = await prisma.brand.create({
      data: { name: 'Apple', logo: 'apple.png' },
    });

    const samsung = await prisma.brand.create({
      data: { name: 'Samsung', logo: 'samsung.png' },
    });

    console.log(`✅ Created 3 brands`);

    // Create products
    const product1 = await prisma.product.create({
      data: {
        sku: 'SKU-001',
        name: 'Nike Shoes',
        description: 'Comfortable running shoes',
        price: '89.99',
        categoryId: shoes.id,
        brandId: nike.id,
        imageUrl: 'nike-shoes.jpg',
      },
    });

    const product2 = await prisma.product.create({
      data: {
        sku: 'SKU-002',
        name: 'iPhone 15',
        description: 'Latest iPhone model',
        price: '999.99',
        categoryId: electronics.id,
        brandId: apple.id,
        imageUrl: 'iphone-15.jpg',
      },
    });

    const product3 = await prisma.product.create({
      data: {
        sku: 'SKU-003',
        name: 'Samsung Galaxy S24',
        description: 'High-end Android phone',
        price: '899.99',
        categoryId: electronics.id,
        brandId: samsung.id,
        imageUrl: 'galaxy-s24.jpg',
      },
    });

    console.log(`✅ Created 3 products`);

    // Create warehouse
    const warehouse = await prisma.warehouse.create({
      data: {
        name: 'Main Warehouse',
        location: '123 Warehouse St, industrial zone',
        capacity: 10000,
        managerId: warehouseManager.id,
      },
    });

    console.log(`✅ Created warehouse`);

    // Create warehouse staff
    await prisma.warehouseStaff.create({
      data: {
        userId: warehouseManager.id,
        warehouseId: warehouse.id,
      },
    });

    // Create warehouse stocks
    for (const product of [product1, product2, product3]) {
      await prisma.warehouseStock.create({
        data: {
          warehouseId: warehouse.id,
          productId: product.id,
          quantity: 100,
          reserved: 0,
        },
      });
    }

    console.log(`✅ Created warehouse stocks`);

    console.log('✅ Seeding finished!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
