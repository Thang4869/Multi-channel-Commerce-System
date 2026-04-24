// ============================================
// FLUTTER - API SERVICE
// ============================================

import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3001'; // Update for production
  final Dio _dio;
  final SharedPreferences? _prefs;

  ApiService({required Dio dio, SharedPreferences? prefs})
      : _dio = dio,
        _prefs = prefs {
    _setupInterceptors();
  }

  void _setupInterceptors() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = _prefs?.getString('auth_token');
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          options.headers['Content-Type'] = 'application/json';
          return handler.next(options);
        },
        onResponse: (response, handler) {
          return handler.next(response);
        },
        onError: (error, handler) async {
          if (error.response?.statusCode == 401) {
            // Token expired - refresh or redirect to login
            await _prefs?.remove('auth_token');
          }
          return handler.next(error);
        },
      ),
    );
  }

  // Auth APIs
  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await _dio.post(
        '$baseUrl/auth/login',
        data: {
          'email': email,
          'password': password,
        },
      );

      if (response.statusCode == 200) {
        final data = response.data as Map<String, dynamic>;
        final token = data['accessToken'];
        await _prefs?.setString('auth_token', token);
        return data;
      }
      throw Exception('Login failed');
    } on DioException catch (e) {
      throw Exception(e.message ?? 'Network error');
    }
  }

  // Delivery APIs
  Future<List<dynamic>> getDeliveries() async {
    try {
      final response = await _dio.get('$baseUrl/deliveries');
      if (response.statusCode == 200) {
        return response.data as List<dynamic>;
      }
      throw Exception('Failed to fetch deliveries');
    } on DioException catch (e) {
      throw Exception(e.message ?? 'Network error');
    }
  }

  Future<Map<String, dynamic>> getDeliveryById(String deliveryId) async {
    try {
      final response = await _dio.get('$baseUrl/deliveries/$deliveryId');
      if (response.statusCode == 200) {
        return response.data as Map<String, dynamic>;
      }
      throw Exception('Failed to fetch delivery');
    } on DioException catch (e) {
      throw Exception(e.message ?? 'Network error');
    }
  }

  Future<void> updateDeliveryStatus({
    required String deliveryId,
    required String status,
    required double lat,
    required double lng,
    String? notes,
  }) async {
    try {
      final response = await _dio.patch(
        '$baseUrl/deliveries/$deliveryId/status',
        data: {
          'status': status,
          'currentLocation': {
            'latitude': lat,
            'longitude': lng,
          },
          'notes': notes,
        },
      );

      if (response.statusCode != 200) {
        throw Exception('Failed to update delivery status');
      }
    } on DioException catch (e) {
      throw Exception(e.message ?? 'Network error');
    }
  }

  Future<void> logout() async {
    await _prefs?.remove('auth_token');
  }
}
