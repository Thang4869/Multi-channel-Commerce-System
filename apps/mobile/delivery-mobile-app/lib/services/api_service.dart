// ============================================
// FLUTTER - MOCK API SERVICE
// ============================================

import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  final SharedPreferences? _prefs;

  ApiService({dynamic dio, SharedPreferences? prefs}) : _prefs = prefs;

  static final List<Map<String, dynamic>> _deliveries = [
    {
      'id': 'del-001',
      'orderId': 'ord-10001234',
      'status': 'PENDING',
      'destLocationAddress': '12 Nguyen Hue, District 1, Ho Chi Minh City',
      'destLocationLat': 10.7769,
      'destLocationLng': 106.7009,
      'currentLocationAddress': 'Central Warehouse, Binh Tan',
      'currentLocationLat': 10.7481,
      'currentLocationLng': 106.6221,
      'estimatedDeliveryTime':
          DateTime.now().add(const Duration(hours: 3)).toIso8601String(),
      'actualDeliveryTime': null,
      'notes': 'Handle with care',
      'createdAt': DateTime.now()
          .subtract(const Duration(minutes: 20))
          .toIso8601String(),
      'updatedAt': DateTime.now().toIso8601String(),
    },
    {
      'id': 'del-002',
      'orderId': 'ord-10001235',
      'status': 'ASSIGNED',
      'destLocationAddress': '88 Le Loi, District 3, Ho Chi Minh City',
      'destLocationLat': 10.7794,
      'destLocationLng': 106.692,
      'currentLocationAddress': 'Delivery Hub A',
      'currentLocationLat': 10.7812,
      'currentLocationLng': 106.6894,
      'estimatedDeliveryTime': DateTime.now()
          .add(const Duration(hours: 1, minutes: 30))
          .toIso8601String(),
      'actualDeliveryTime': null,
      'notes': 'Call customer on arrival',
      'createdAt':
          DateTime.now().subtract(const Duration(hours: 1)).toIso8601String(),
      'updatedAt': DateTime.now().toIso8601String(),
    },
  ];

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final token = 'mock-token-$email';
    await _prefs?.setString('auth_token', token);
    return {
      'accessToken': token,
      'refreshToken': 'mock-refresh-token-$email',
      'user': {
        'id': 'user-shipper-001',
        'email': email,
        'fullName': 'Delivery Shipper',
        'phone': '0909000111',
        'roles': ['SHIPPER'],
        'isActive': true,
        'createdAt': DateTime.now().toIso8601String(),
        'updatedAt': DateTime.now().toIso8601String(),
      },
    };
  }

  Future<List<dynamic>> getDeliveries() async {
    return List<Map<String, dynamic>>.from(_deliveries);
  }

  Future<Map<String, dynamic>> getDeliveryById(String deliveryId) async {
    final delivery = _deliveries.firstWhere(
      (item) => item['id'] == deliveryId,
      orElse: () => _deliveries.first,
    );
    return Map<String, dynamic>.from(delivery);
  }

  Future<void> updateDeliveryStatus({
    required String deliveryId,
    required String status,
    String? notes,
  }) async {
    final index = _deliveries.indexWhere((item) => item['id'] == deliveryId);
    if (index == -1) {
      throw Exception('Delivery not found');
    }

    _deliveries[index] = {
      ..._deliveries[index],
      'status': status,
      'notes': notes ?? _deliveries[index]['notes'],
      'actualDeliveryTime': status == 'DELIVERED'
          ? DateTime.now().toIso8601String()
          : _deliveries[index]['actualDeliveryTime'],
      'updatedAt': DateTime.now().toIso8601String(),
    };
  }

  Future<void> logout() async {
    await _prefs?.remove('auth_token');
  }
}
