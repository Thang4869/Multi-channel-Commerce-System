import { Body, Controller, Post } from '@nestjs/common';
import { InventoryService } from '../../../application/inventory.service';
import { LockStockDto } from '../../../dtos/lock-stock.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('lock')
  async lock(@Body() body: LockStockDto) {
    const { orderId, productId, quantity } = body;
    return this.inventoryService.lockStock(orderId, productId, quantity);
  }

  @Post('release')
  async release(@Body() body: { lockId: string }) {
    return this.inventoryService.releaseLock(body.lockId);
  }
}
