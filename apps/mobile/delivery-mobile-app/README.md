# Flutter Delivery Mobile App

Professional delivery tracking application for Multi-Channel Commerce System, built with Flutter 3.0+, Google Maps, and real-time location tracking.

## Features

### 🔐 Authentication
- Secure JWT-based authentication
- Email/password login
- Secure token storage
- Auto-login on app restart
- Logout functionality

### 📍 Delivery Tracking
- Real-time delivery status monitoring
- Live map view with GPS tracking
- Delivery list with smart filtering
- Tracking timeline with milestones
- Distance and time estimates

### 🗺️ Maps Integration
- Embedded Google Maps
- Current location marker
- Delivery destination marker
- Automatic zoom and pan
- Route visualization

### 👤 Driver Features
- Quick access to driver info
- Call driver directly
- Message driver
- Driver rating and reviews

### 🔔 Notifications
- Push notifications for status changes
- Local notifications
- In-app alerts
- Notification history

### 📱 Responsive Design
- Works on 4.5" - 6.7" devices
- Landscape orientation support
- Safe area handling
- High DPI support

## Tech Stack

### Frontend
- **Framework**: Flutter 3.0+
- **State Management**: Riverpod v2.4
- **HTTP Client**: Dio v5.3
- **Maps**: Google Maps Flutter v2.5
- **Location**: Geolocator v10.1
- **Storage**: SharedPreferences v2.2, Hive v2.2

### Architecture
- Clean Architecture pattern
- Service layer for API calls
- Provider pattern for state management
- Separation of concerns

### Testing
- Unit tests with mockito
- Widget tests
- Integration tests (future)

## Getting Started

### Prerequisites
- Flutter SDK 3.0+
- Dart 3.0+
- Android Studio or Xcode
- Google Maps API keys

### Installation

```bash
# Clone repository
git clone https://github.com/Thang4869/Multi-channel-Commerce-System.git
cd apps/mobile/delivery-mobile-app

# Install dependencies
flutter pub get

# Generate code (if using build_runner)
flutter pub run build_runner build

# Run app
flutter run
```

### Configuration

#### Android Setup
```bash
# Add Google Maps API key to AndroidManifest.xml
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_API_KEY" />
```

#### iOS Setup
```bash
# Update Podfile for Google Maps
cd ios
pod install
cd ..
```

#### Environment Variables
Create `.env` file:
```
API_BASE_URL=http://localhost:80/api
API_TIMEOUT=30s
LOG_LEVEL=debug
```

## Usage

### Login
1. Launch app
2. Enter email and password
3. Tap "Login"
4. App saves token for future sessions

### View Deliveries
1. Navigate to Deliveries tab
2. See list of active deliveries
3. Filter by status if needed
4. Pull to refresh

### View Delivery Detail
1. Tap delivery card
2. View embedded map
3. See tracking timeline
4. Call or message driver

### Location Tracking
1. App automatically tracks location every 10 seconds
2. Distance to destination updates in real-time
3. Location permissions required

## API Endpoints

### Authentication
```
POST /api/auth/login
- Email, Password
- Returns: JWT token, user ID, refresh token

POST /api/auth/logout
- Authorized only
- Clears session
```

### Deliveries
```
GET /api/deliveries
- Query params: status, page, limit
- Returns: List of deliveries

GET /api/deliveries/{id}
- Returns: Delivery detail with tracking

POST /api/deliveries/{id}/status
- Update delivery status
- Body: status, latitude, longitude, notes
```

### Driver
```
GET /api/driver/{id}
- Returns: Driver info, rating, reviews
- Authorized only
```

## Project Structure

```
lib/
├── main.dart
│   └── App entry point, theme setup
│
├── screens/
│   ├── login_screen.dart
│   │   └── Authentication UI
│   ├── deliveries_screen.dart
│   │   └── Delivery list with filtering
│   └── delivery_detail_screen.dart
│       └── Detail view with map and timeline
│
├── services/
│   └── api_service.dart
│       └── Dio HTTP client with interceptors
│
├── providers/
│   └── providers.dart
│       └── Riverpod state providers
│
├── models/
│   └── models.dart
│       └── Data classes and serialization
│
├── widgets/
│   ├── delivery_card.dart
│   ├── tracking_timeline.dart
│   └── map_view.dart
│
└── utils/
    ├── constants.dart
    └── helpers.dart
```

## State Management (Riverpod)

### Auth Provider
```dart
final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});
```

### Delivery Provider
```dart
final deliveriesProvider = FutureProvider<List<Delivery>>((ref) async {
  return apiService.getDeliveries();
});
```

### Location Provider
```dart
final locationProvider = StreamProvider<Position>((ref) {
  return Geolocator.getPositionStream();
});
```

## Error Handling

### Network Errors
- Automatic retry with exponential backoff
- User-friendly error messages
- Offline mode fallback

### Permission Errors
- Request location permission on first launch
- Handle denied permissions gracefully
- Show permission rationale dialog

### API Errors
- Handle 401 (unauthorized) with re-login
- Handle 403 (forbidden) with error message
- Handle 5xx errors with retry

## Performance Optimization

### Caching
- API responses cached with Hive
- Image caching with cached_network_image
- Location cache with 10-second TTL

### Lazy Loading
- Delivery list paginated (20 items per page)
- Load more on scroll
- Caching prevents redundant requests

### Battery Optimization
- Location updates throttled to 10 seconds
- Background location in power-save mode
- Request deduplication

## Security

### Authentication
- JWT tokens stored securely
- Token refresh on 401 response
- Logout clears all local data
- HTTPS enforced

### Data Protection
- No sensitive data logged
- Encrypted storage with Hive
- Permission checks before data access

### API Security
- Request signing (future)
- Certificate pinning (future)
- Rate limiting per API Gateway

## Testing

### Unit Tests
```bash
flutter test test/unit/
```

### Widget Tests
```bash
flutter test test/widget/
```

### Integration Tests
```bash
flutter test integration_test/
```

## Building for Release

### Android
```bash
flutter build apk --release
# or
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

## Deployment

### Play Store
1. Build release APK/AAB
2. Create Play Store account
3. Upload to Play Store
4. Configure store listing
5. Submit for review

### App Store
1. Build release IPA
2. Create App Store Connect account
3. Upload with Xcode
4. Configure app listing
5. Submit for review

## Troubleshooting

### Maps not showing
- Verify Google Maps API key
- Check AndroidManifest.xml
- Restart emulator/device

### Location permission denied
- Grant location permission in settings
- Request permission on first launch
- Handle denied gracefully

### Network errors
- Verify API_BASE_URL configuration
- Check internet connection
- Review API logs

### Build errors
- Run `flutter clean`
- Run `flutter pub get`
- Update Flutter SDK: `flutter upgrade`

## Contributing

Follow the conventions in `.github/instructions.md`:
- Conventional commits (feat, fix, docs, etc.)
- Branch naming: `feat/feature-name`, `fix/fix-name`
- Detailed PR descriptions
- Link issues to PRs

## Documentation

- [API Reference](../../../docs/API_ENDPOINTS.md)
- [Git Workflow](../../../docs/runbooks/git/git-strategy.md)
- [Architecture](../../../docs/ARCHITECTURE.md)
- [Troubleshooting](../../../docs/runbooks/fixes/errors-fix.md)

## License

MIT License - See LICENSE file

## Support

- Issues: [GitHub Issues](https://github.com/Thang4869/Multi-channel-Commerce-System/issues)
- Discussions: [GitHub Discussions](https://github.com/Thang4869/Multi-channel-Commerce-System/discussions)
- Email: support@example.com
