// ============================================
// FLUTTER - DELIVERIES LIST SCREEN
// ============================================

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/models.dart';
import '../providers/providers.dart';

class DeliveriesScreen extends ConsumerWidget {
  const DeliveriesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final deliveriesAsync = ref.watch(deliveriesProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Deliveries'),
        centerTitle: true,
        actions: [
          PopupMenuButton<String>(
            onSelected: (value) {
              if (value == 'logout') {
                ref.read(authProvider.notifier).logout();
                Navigator.of(context).pushReplacementNamed('/login');
              }
            },
            itemBuilder: (BuildContext context) => [
              const PopupMenuItem(
                value: 'logout',
                child: Text('Logout'),
              ),
            ],
          ),
        ],
      ),
      body: deliveriesAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stackTrace) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.error_outline, size: 48, color: Colors.red[400]),
              const SizedBox(height: 16),
              Text('Error: $error'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () => ref.refresh(deliveriesProvider),
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
        data: (deliveries) => deliveries.isEmpty
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.inbox, size: 48, color: Colors.grey[400]),
                    const SizedBox(height: 16),
                    Text(
                      'No deliveries',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: Colors.grey[600],
                          ),
                    ),
                  ],
                ),
              )
            : RefreshIndicator(
                onRefresh: () async {
                  // ignore: unused_result
                  ref.refresh(deliveriesProvider);
                },
                child: ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: deliveries.length,
                  itemBuilder: (context, index) {
                    final delivery = deliveries[index];
                    return DeliveryCard(
                      delivery: delivery,
                      onTap: () {
                        Navigator.of(context).pushNamed(
                          '/delivery-detail',
                          arguments: delivery.id,
                        );
                      },
                    );
                  },
                ),
              ),
      ),
    );
  }
}

class DeliveryCard extends StatelessWidget {
  final Delivery delivery;
  final VoidCallback onTap;

  const DeliveryCard({
    Key? key,
    required this.delivery,
    required this.onTap,
  }) : super(key: key);

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

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: InkWell(
          onTap: onTap,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                children: [
                  Icon(
                    _getStatusIcon(delivery.status),
                    color: _getStatusColor(delivery.status),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Order ${delivery.orderId.substring(0, 8)}...',
                      style:
                          Theme.of(context).textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                    ),
                  ),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: _getStatusColor(delivery.status).withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      delivery.status,
                      style: TextStyle(
                        color: _getStatusColor(delivery.status),
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Destination
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.location_on_outlined,
                      size: 16, color: Colors.grey),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      delivery.destLocationAddress,
                      style: Theme.of(context).textTheme.bodySmall,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              // Estimated Delivery
              Row(
                children: [
                  const Icon(Icons.schedule_outlined,
                      size: 16, color: Colors.grey),
                  const SizedBox(width: 8),
                  Text(
                    'Est. ${delivery.estimatedDeliveryTime.toString().split(' ')[0]}',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
