// ============================================
// FLUTTER - STATE MANAGEMENT (Provider)
// ============================================

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';
import '../models/models.dart';

// Shared Preferences Provider
final sharedPreferencesProvider = FutureProvider<SharedPreferences>((ref) async {
  return await SharedPreferences.getInstance();
});

// API Service Provider (simple version without SharedPreferences dependency)
final apiServiceProvider = Provider<ApiService>((ref) {
  final dio = Dio();
  return ApiService(dio: dio, prefs: null);
});

// Auth State Provider
final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  final apiService = ref.watch(apiServiceProvider);
  return AuthNotifier(apiService: apiService);
});

// Deliveries Provider
final deliveriesProvider = FutureProvider<List<Delivery>>((ref) async {
  final apiService = ref.watch(apiServiceProvider);
  final responses = await apiService.getDeliveries();
  return responses
      .map((json) => Delivery.fromJson(json as Map<String, dynamic>))
      .toList();
});

// Single Delivery Provider
final deliveryProvider = FutureProvider.family<Delivery, String>((ref, id) async {
  final apiService = ref.watch(apiServiceProvider);
  final data = await apiService.getDeliveryById(id);
  return Delivery.fromJson(data);
});

// Auth State
class AuthState {
  final User? user;
  final bool isLoading;
  final String? error;
  final bool isAuthenticated;

  AuthState({
    this.user,
    this.isLoading = false,
    this.error,
    this.isAuthenticated = false,
  });

  AuthState copyWith({
    User? user,
    bool? isLoading,
    String? error,
    bool? isAuthenticated,
  }) {
    return AuthState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
    );
  }
}

// Auth Notifier
class AuthNotifier extends StateNotifier<AuthState> {
  final ApiService apiService;

  AuthNotifier({required this.apiService}) : super(AuthState());

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final response = await apiService.login(email: email, password: password);
      final user = User.fromJson(response['user']);
      state = AuthState(user: user, isAuthenticated: true);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> logout() async {
    await apiService.logout();
    state = AuthState();
  }
}
