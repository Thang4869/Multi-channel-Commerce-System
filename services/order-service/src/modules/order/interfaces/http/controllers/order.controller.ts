// ============================================
// INTERFACES - ORDER CONTROLLER
// ============================================

import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto, UpdateOrderStatusDto, OrderResponseDto, PaginatedOrdersDto } from '../../../application/dto';
import {
  CreateOrderUseCase,
  ConfirmOrderUseCase,
  CancelOrderUseCase,
  UpdateOrderStatusUseCase,
} from '../../../application/use-cases';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly confirmOrderUseCase: ConfirmOrderUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
    private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(
    @Request() req: { user: any },
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    const order = await this.createOrderUseCase.execute(
      createOrderDto.customerId,
      createOrderDto.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: 100, // In real app, fetch from product service
      })),
      createOrderDto.shippingAddress,
      createOrderDto.billingAddress,
      createOrderDto.notes,
    );

    return this.mapToResponse(order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async getOrder(@Param('id') orderId: string): Promise<OrderResponseDto> {
    // Implement getOrder
    throw new Error('Not implemented');
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  async getAllOrders(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string,
  ): Promise<PaginatedOrdersDto> {
    // Implement getAllOrders
    throw new Error('Not implemented');
  }

  @Patch(':id/confirm')
  @HttpCode(200)
  @ApiOperation({ summary: 'Confirm an order' })
  async confirmOrder(@Param('id') orderId: string): Promise<OrderResponseDto> {
    const order = await this.confirmOrderUseCase.execute(orderId);
    return this.mapToResponse(order);
  }

  @Patch(':id/cancel')
  @HttpCode(200)
  @ApiOperation({ summary: 'Cancel an order' })
  async cancelOrder(@Param('id') orderId: string): Promise<OrderResponseDto> {
    const order = await this.cancelOrderUseCase.execute(orderId);
    return this.mapToResponse(order);
  }

  @Patch(':id/status')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update order status' })
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Body() updateDto: UpdateOrderStatusDto,
  ): Promise<OrderResponseDto> {
    const order = await this.updateOrderStatusUseCase.execute(orderId, updateDto.status);
    return this.mapToResponse(order);
  }

  private mapToResponse(order: any): OrderResponseDto {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      totalPrice: order.totalPrice,
      status: order.status,
      items: order.items.map((item: any) => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      } as const)),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
