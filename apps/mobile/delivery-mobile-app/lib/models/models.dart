// ============================================
// FLUTTER - MODELS
// ============================================

class Delivery {
  final String id;
  final String orderId;
  final String status;
  final String destLocationAddress;
  final double destLocationLat;
  final double destLocationLng;
  final String? currentLocationAddress;
  final double? currentLocationLat;
  final double? currentLocationLng;
  final DateTime estimatedDeliveryTime;
  final DateTime? actualDeliveryTime;
  final String? notes;
  final DateTime createdAt;
  final DateTime updatedAt;

  Delivery({
    required this.id,
    required this.orderId,
    required this.status,
    required this.destLocationAddress,
    required this.destLocationLat,
    required this.destLocationLng,
    this.currentLocationAddress,
    this.currentLocationLat,
    this.currentLocationLng,
    required this.estimatedDeliveryTime,
    this.actualDeliveryTime,
    this.notes,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Delivery.fromJson(Map<String, dynamic> json) => Delivery(
    id: json['id'] ?? '',
    orderId: json['orderId'] ?? '',
    status: json['status'] ?? '',
    destLocationAddress: json['destLocationAddress'] ?? '',
    destLocationLat: (json['destLocationLat'] ?? 0).toDouble(),
    destLocationLng: (json['destLocationLng'] ?? 0).toDouble(),
    currentLocationAddress: json['currentLocationAddress'],
    currentLocationLat: json['currentLocationLat']?.toDouble(),
    currentLocationLng: json['currentLocationLng']?.toDouble(),
    estimatedDeliveryTime: DateTime.parse(json['estimatedDeliveryTime'] ?? DateTime.now().toIso8601String()),
    actualDeliveryTime: json['actualDeliveryTime'] != null ? DateTime.parse(json['actualDeliveryTime']) : null,
    notes: json['notes'],
    createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
    updatedAt: DateTime.parse(json['updatedAt'] ?? DateTime.now().toIso8601String()),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'orderId': orderId,
    'status': status,
    'destLocationAddress': destLocationAddress,
    'destLocationLat': destLocationLat,
    'destLocationLng': destLocationLng,
    'currentLocationAddress': currentLocationAddress,
    'currentLocationLat': currentLocationLat,
    'currentLocationLng': currentLocationLng,
    'estimatedDeliveryTime': estimatedDeliveryTime.toIso8601String(),
    'actualDeliveryTime': actualDeliveryTime?.toIso8601String(),
    'notes': notes,
    'createdAt': createdAt.toIso8601String(),
    'updatedAt': updatedAt.toIso8601String(),
  };
}

class DeliveryOrder {
  final String id;
  final String orderNumber;
  final String customerId;
  final String shippingAddress;
  final double totalPrice;
  final String status;
  final List<OrderItem> items;
  final DateTime createdAt;

  DeliveryOrder({
    required this.id,
    required this.orderNumber,
    required this.customerId,
    required this.shippingAddress,
    required this.totalPrice,
    required this.status,
    required this.items,
    required this.createdAt,
  });

  factory DeliveryOrder.fromJson(Map<String, dynamic> json) => DeliveryOrder(
    id: json['id'] ?? '',
    orderNumber: json['orderNumber'] ?? '',
    customerId: json['customerId'] ?? '',
    shippingAddress: json['shippingAddress'] ?? '',
    totalPrice: (json['totalPrice'] ?? 0).toDouble(),
    status: json['status'] ?? '',
    items: (json['items'] as List?)?.map((i) => OrderItem.fromJson(i)).toList() ?? [],
    createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'orderNumber': orderNumber,
    'customerId': customerId,
    'shippingAddress': shippingAddress,
    'totalPrice': totalPrice,
    'status': status,
    'items': items.map((i) => i.toJson()).toList(),
    'createdAt': createdAt.toIso8601String(),
  };
}

class OrderItem {
  final String id;
  final String productId;
  final int quantity;
  final double price;
  final double subtotal;

  OrderItem({
    required this.id,
    required this.productId,
    required this.quantity,
    required this.price,
    required this.subtotal,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) => OrderItem(
    id: json['id'] ?? '',
    productId: json['productId'] ?? '',
    quantity: json['quantity'] ?? 0,
    price: (json['price'] ?? 0).toDouble(),
    subtotal: (json['subtotal'] ?? 0).toDouble(),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'productId': productId,
    'quantity': quantity,
    'price': price,
    'subtotal': subtotal,
  };
}

class User {
  final String id;
  final String email;
  final String fullName;
  final String phone;
  final List<String> roles;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  User({
    required this.id,
    required this.email,
    required this.fullName,
    required this.phone,
    required this.roles,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['id'] ?? '',
    email: json['email'] ?? '',
    fullName: json['fullName'] ?? '',
    phone: json['phone'] ?? '',
    roles: List<String>.from(json['roles'] ?? []),
    isActive: json['isActive'] ?? true,
    createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
    updatedAt: DateTime.parse(json['updatedAt'] ?? DateTime.now().toIso8601String()),
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'email': email,
    'fullName': fullName,
    'phone': phone,
    'roles': roles,
    'isActive': isActive,
    'createdAt': createdAt.toIso8601String(),
    'updatedAt': updatedAt.toIso8601String(),
  };
}
