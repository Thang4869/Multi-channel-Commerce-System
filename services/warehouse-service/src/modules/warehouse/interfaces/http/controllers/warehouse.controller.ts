import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { WarehouseService } from '../../../application/warehouse.service';
import { CreateWarehouseDto } from '../../../dtos/create-warehouse.dto';
import { UpdateWarehouseDto } from '../../../dtos/update-warehouse.dto';
import { CreateWarehouseTransactionDto } from '../../../dtos/create-warehouse-transaction.dto';
import { CreateWarehouseDistributionDto } from '../../../dtos/create-warehouse-distribution.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  createWarehouse(@Body() dto: CreateWarehouseDto) {
    return this.warehouseService.createWarehouse(dto);
  }

  @Get()
  listWarehouses(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.warehouseService.listWarehouses(Number(page), Number(limit));
  }

  @Get(':id')
  getWarehouse(@Param('id') id: string) {
    return this.warehouseService.getWarehouse(id);
  }

  @Put(':id')
  updateWarehouse(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
    return this.warehouseService.updateWarehouse(id, dto);
  }

  @Post('transactions')
  recordTransaction(@Body() dto: CreateWarehouseTransactionDto) {
    return this.warehouseService.recordTransaction(dto);
  }

  @Post('distributions')
  createDistribution(@Body() dto: CreateWarehouseDistributionDto) {
    return this.warehouseService.createDistribution(dto);
  }

  @Put('distributions/:id/status')
  updateDistributionStatus(@Param('id') id: string, @Body() body: { status: string; notes?: string }) {
    return this.warehouseService.updateDistributionStatus(id, body.status, body.notes);
  }

  @Get('distributions')
  listDistributions(@Query('warehouseId') warehouseId?: string) {
    return this.warehouseService.listDistributions(warehouseId);
  }
}
