// ============================================
// FLUTTER - MAIN APP
// ============================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:geolocator/geolocator.dart';
import 'screens/login_screen.dart';
import 'screens/deliveries_screen.dart';
import 'screens/delivery_detail_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Request location permission
  final permission = await Geolocator.requestPermission();
  if (permission == LocationPermission.denied ||
      permission == LocationPermission.deniedForever) {
    print('Location permission denied');
  }

  runApp(const ProviderScope(child: DeliveryApp()));
}

class DeliveryApp extends StatelessWidget {
  const DeliveryApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Delivery App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          elevation: 0,
          centerTitle: true,
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.grey[100],
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Colors.grey),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Colors.grey),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Colors.blue, width: 2),
          ),
        ),
      ),
      home: const LoginScreen(),
      routes: {
        '/login': (context) => const LoginScreen(),
        '/deliveries': (context) => const DeliveriesScreen(),
        '/delivery-detail': (context) {
          final args = ModalRoute.of(context)?.settings.arguments as String?;
          return DeliveryDetailScreen(deliveryId: args ?? '');
        },
      },
    );
  }
}
