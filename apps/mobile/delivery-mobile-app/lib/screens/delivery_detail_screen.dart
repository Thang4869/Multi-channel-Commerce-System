// ============================================
// FLUTTER - DELIVERY DETAIL SCREEN
// ============================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:geolocator/geolocator.dart';
import '../providers/providers.dart';

class DeliveryDetailScreen extends ConsumerStatefulWidget {
  final String deliveryId;

  const DeliveryDetailScreen({Key? key, required this.deliveryId})
      : super(key: key);

  @override
  ConsumerState<DeliveryDetailScreen> createState() =>
      _DeliveryDetailScreenState();
}

class _DeliveryDetailScreenState extends ConsumerState<DeliveryDetailScreen> {
  final notesController = TextEditingController();

  @override
  void dispose() {
    notesController.dispose();
    super.dispose();
  }

  Future<void> _updateDeliveryStatus(String newStatus) async {
    try {
      // Get current location
      final position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );

      final apiService = ref.read(apiServiceProvider);
      await apiService.updateDeliveryStatus(
        deliveryId: widget.deliveryId,
        status: newStatus,
        lat: position.latitude,
        lng: position.longitude,
        notes: notesController.text.isEmpty ? null : notesController.text,
      );

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Status updated successfully')),
        );
        Navigator.of(context).pop();
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final deliveryAsync = ref.watch(deliveryProvider(widget.deliveryId));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Delivery Details'),
        centerTitle: true,
      ),
      body: deliveryAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stackTrace) => Center(
          child: Text('Error: $error'),
        ),
        data: (delivery) => SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Status Card
              Card(
                color: _getStatusColor(delivery.status).withValues(alpha: 0.2),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Current Status',
                        style: Theme.of(context).textTheme.labelSmall,
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Icon(
                            _getStatusIcon(delivery.status),
                            size: 32,
                            color: _getStatusColor(delivery.status),
                          ),
                          const SizedBox(width: 16),
                          Text(
                            delivery.status,
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall
                                ?.copyWith(
                                  color: _getStatusColor(delivery.status),
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Delivery Information
              Text(
                'Delivery Information',
                style: Theme.of(context)
                    .textTheme
                    .titleMedium
                    ?.copyWith(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),

              // Order ID
              _buildInfoRow(
                context,
                'Order',
                delivery.orderId.substring(0, 8),
                Icons.shopping_bag_outlined,
              ),
              const SizedBox(height: 12),

              // Destination
              _buildInfoRow(
                context,
                'Destination',
                delivery.destLocationAddress,
                Icons.location_on_outlined,
              ),
              const SizedBox(height: 12),

              // Estimated Delivery
              _buildInfoRow(
                context,
                'Estimated Delivery',
                delivery.estimatedDeliveryTime.toString().split(' ')[0],
                Icons.calendar_today_outlined,
              ),
              const SizedBox(height: 24),

              // Notes
              TextField(
                controller: notesController,
                decoration: InputDecoration(
                  labelText: 'Notes',
                  hintText: 'Add delivery notes',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  prefixIcon: const Icon(Icons.note_outlined),
                ),
                maxLines: 3,
              ),
              const SizedBox(height: 24),

              // Action Buttons
              if (delivery.status == 'PENDING' || delivery.status == 'ASSIGNED')
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => _updateDeliveryStatus('IN_TRANSIT'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text(
                      'Start Delivery',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              if (delivery.status == 'IN_TRANSIT')
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => _updateDeliveryStatus('DELIVERED'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text(
                      'Mark as Delivered',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoRow(BuildContext context, String label, String value,
      IconData icon) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, size: 20, color: Colors.grey[600]),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: Theme.of(context).textTheme.labelSmall,
              ),
              const SizedBox(height: 4),
              Text(
                value,
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'PENDING':
        return Colors.yellow;
      case 'ASSIGNED':
        return Colors.blue;
      case 'IN_TRANSIT':
        return Colors.purple;
      case 'DELIVERED':
        return Colors.green;
      case 'FAILED':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  IconData _getStatusIcon(String status) {
    switch (status) {
      case 'PENDING':
        return Icons.schedule;
      case 'ASSIGNED':
        return Icons.person_outline;
      case 'IN_TRANSIT':
        return Icons.local_shipping;
      case 'DELIVERED':
        return Icons.check_circle;
      case 'FAILED':
        return Icons.cancel;
      default:
        return Icons.help;
    }
  }
}
