"use strict";
// ============================================
// SHARED TYPES & CONTRACTS
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.DeliveryStatus = exports.WarehouseTransactionType = exports.OrderStatus = exports.UserRole = void 0;
// ========== AUTH ==========
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["WAREHOUSE_MANAGER"] = "WAREHOUSE_MANAGER";
    UserRole["STORE_MANAGER"] = "STORE_MANAGER";
    UserRole["SHIPPER"] = "SHIPPER";
    UserRole["CUSTOMER"] = "CUSTOMER";
    UserRole["SUPPLIER"] = "SUPPLIER";
})(UserRole || (exports.UserRole = UserRole = {}));
// ========== ORDER ==========
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var WarehouseTransactionType;
(function (WarehouseTransactionType) {
    WarehouseTransactionType["INBOUND"] = "INBOUND";
    WarehouseTransactionType["OUTBOUND"] = "OUTBOUND";
    WarehouseTransactionType["TRANSFER"] = "TRANSFER";
    WarehouseTransactionType["ADJUSTMENT"] = "ADJUSTMENT";
})(WarehouseTransactionType || (exports.WarehouseTransactionType = WarehouseTransactionType = {}));
// ========== DELIVERY ==========
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus["PENDING"] = "PENDING";
    DeliveryStatus["ASSIGNED"] = "ASSIGNED";
    DeliveryStatus["IN_TRANSIT"] = "IN_TRANSIT";
    DeliveryStatus["DELIVERED"] = "DELIVERED";
    DeliveryStatus["FAILED"] = "FAILED";
    DeliveryStatus["CANCELLED"] = "CANCELLED";
})(DeliveryStatus || (exports.DeliveryStatus = DeliveryStatus = {}));
// ========== NOTIFICATION ==========
var NotificationType;
(function (NotificationType) {
    NotificationType["ORDER_CREATED"] = "ORDER_CREATED";
    NotificationType["ORDER_CONFIRMED"] = "ORDER_CONFIRMED";
    NotificationType["ORDER_SHIPPED"] = "ORDER_SHIPPED";
    NotificationType["ORDER_DELIVERED"] = "ORDER_DELIVERED";
    NotificationType["ORDER_CANCELLED"] = "ORDER_CANCELLED";
    NotificationType["STOCK_LOW"] = "STOCK_LOW";
    NotificationType["DELIVERY_ASSIGNED"] = "DELIVERY_ASSIGNED";
    NotificationType["DELIVERY_IN_TRANSIT"] = "DELIVERY_IN_TRANSIT";
    NotificationType["DELIVERY_COMPLETED"] = "DELIVERY_COMPLETED";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
//# sourceMappingURL=index.js.map