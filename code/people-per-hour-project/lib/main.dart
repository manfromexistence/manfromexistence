import 'dart:async';
import 'dart:io' show Platform;
import 'dart:ui';

import 'package:background_location_tracker/background_location_tracker.dart';
import 'package:fieldmanager_hrms_flutter/routes.dart';
import 'package:fieldmanager_hrms_flutter/service/LocationService.dart';
import 'package:fieldmanager_hrms_flutter/service/TrackingService.dart';
import 'package:fieldmanager_hrms_flutter/service/map_helper.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_constants.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_theme.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_activity_recognition/flutter_activity_recognition.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_background_service_android/flutter_background_service_android.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:google_maps_flutter_android/google_maps_flutter_android.dart';
import 'package:google_maps_flutter_platform_interface/google_maps_flutter_platform_interface.dart';
import 'package:intl/intl.dart';
import 'package:nb_utils/nb_utils.dart';

import 'firebase_options.dart';
import 'locale/app_localizations.dart';
import 'locale/languages.dart';
import 'network/api_service.dart';
import 'screens/splash_screen.dart';
import 'service/SharedHelper.dart';
import 'store/AppStore.dart';
import 'utils/app_data_provider.dart';

AppStore appStore = AppStore();
ApiService apiRepo = ApiService();
SharedHelper sharedHelper = SharedHelper();
MapHelper mapHelper = MapHelper();
BaseLanguage? language;
//Tracking & Activity
TrackingService trackingService = TrackingService();
final _activityStreamController = StreamController<Activity>();
StreamSubscription<Activity>? _activityStreamSubscription;

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  await setupFlutterNotifications();
  showFlutterNotification(message);
  // If you're going to use other Firebase services in the background, such as Firestore,
  // make sure you call `initializeApp` before using other Firebase services.
  log('Handling a background message ${message.messageId}');
}

/// Create a [AndroidNotificationChannel] for heads up notifications
late AndroidNotificationChannel channel;

bool isFlutterLocalNotificationsInitialized = false;

Future<void> setupFlutterNotifications() async {
  if (isFlutterLocalNotificationsInitialized) {
    return;
  }
  channel = const AndroidNotificationChannel(
    'high_importance_channel', // id
    'High Importance Notifications', // title
    description:
        'This channel is used for important notifications.', // description
    importance: Importance.high,
  );

  flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

  /// Create an Android Notification Channel.
  ///
  /// We use this channel in the `AndroidManifest.xml` file to override the
  /// default FCM channel to enable heads up notifications.
  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(channel);

  /// Update the iOS foreground notification presentation options to allow
  /// heads up notifications.
  await FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(
    alert: true,
    badge: true,
    sound: true,
  );
  isFlutterLocalNotificationsInitialized = true;
}

void showFlutterNotification(RemoteMessage message) {
  RemoteNotification? notification = message.notification;
  AndroidNotification? android = message.notification?.android;
  if (notification != null && android != null && !isWeb) {
    flutterLocalNotificationsPlugin.show(
      notification.hashCode,
      notification.title,
      notification.body,
      NotificationDetails(
        android: AndroidNotificationDetails(
          channel.id,
          channel.name,
          channelDescription: channel.description,
          icon: 'ic_launcher',
        ),
      ),
    );
  }
}

late FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await initialize(aLocaleLanguageList: languageList());

  appStore.toggleDarkMode(value: getBoolAsync(isDarkModeOnPref));
  await appStore.setLanguage(
      getStringAsync(SELECTED_LANGUAGE_CODE, defaultValue: defaultLanguage));

  defaultRadius = 10;
  defaultToastGravityGlobal = ToastGravity.BOTTOM;

  final GoogleMapsFlutterPlatform mapsImplementation =
      GoogleMapsFlutterPlatform.instance;
  if (mapsImplementation is GoogleMapsFlutterAndroid) {
    mapsImplementation.useAndroidViewSurface = true;
    mapsImplementation.initializeWithRenderer(AndroidMapRenderer.latest);
  }


  await initializeService();
  await BackgroundLocationTrackerManager.initialize(
    backgroundCallback,
    config: BackgroundLocationTrackerConfig(
      loggingEnabled: false,
      androidConfig: AndroidConfig(
        enableNotificationLocationUpdates: false,
        enableCancelTrackingAction: false,
        trackingInterval: sharedHelper.getUpdateIntervalDuration(),
        distanceFilterMeters: null,
      ),
      iOSConfig: const IOSConfig(
        distanceFilterMeters: null,
        restartAfterKill: true,
      ),
    ),
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Observer(
      builder: (_) => MaterialApp(
        debugShowCheckedModeBanner: false,
        title: '$mainAppName${!isMobile ? ' ${platformName()}' : ''}',
        home: const SplashScreen(),
        theme: !appStore.isDarkModeOn
            ? AppThemeData.lightTheme
            : AppThemeData.darkTheme,
        routes: routes(),
        navigatorKey: navigatorKey,
        scrollBehavior: SBehavior(),
        supportedLocales: LanguageDataModel.languageLocales(),
        localizationsDelegates: const [
          AppLocalizations(),
          GlobalMaterialLocalizations.delegate,
          GlobalWidgetsLocalizations.delegate
        ],
        localeResolutionCallback: (locale, supportedLocales) => locale,
        locale: Locale(appStore.selectedLanguageCode),
      ),
    );
  }
}

Future<void> initializeService() async {
  final service = FlutterBackgroundService();

  const AndroidNotificationChannel channel = AndroidNotificationChannel(
    'my_foreground', // id
    'MY FOREGROUND SERVICE', // title
    description:
        'This channel is used for important notifications.', // description
    importance: Importance.low, // importance must be at low or higher level
  );

  final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();

  if (Platform.isIOS) {
    await flutterLocalNotificationsPlugin.initialize(
      const InitializationSettings(
        iOS: DarwinInitializationSettings(),
      ),
    );
  }

  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(channel);

  await service.configure(
    androidConfiguration: AndroidConfiguration(
      // this will be executed when app is in foreground or background in separated isolate
      onStart: onStart,
      autoStartOnBoot: true,
      // auto start service
      autoStart: false,
      isForegroundMode: true,

      notificationChannelId: 'my_foreground',
      initialNotificationTitle: '$mainAppName Background Service',
      initialNotificationContent: 'Initializing',
      foregroundServiceNotificationId: 888,
    ),
    iosConfiguration: IosConfiguration(
      // auto start service
      autoStart: false,

      // this will be executed when app is in foreground in separated isolate
      onForeground: onStart,

      // you have to enable background fetch capability on xcode project
      onBackground: onIosBackground,
    ),
  );

  service.startService();
}

@pragma('vm:entry-point')
Future<bool> onIosBackground(ServiceInstance service) async {
  WidgetsFlutterBinding.ensureInitialized();
  DartPluginRegistrant.ensureInitialized();

  SharedPreferences preferences = await SharedPreferences.getInstance();
  await preferences.reload();
  final log = preferences.getStringList('log') ?? <String>[];
  log.add(DateTime.now().toIso8601String());
  await preferences.setStringList('log', log);

  return true;
}

@pragma('vm:entry-point')
void backgroundCallback() {
  BackgroundLocationTrackerManager.handleBackgroundUpdated(
    (data) async => Repo().update(data),
  );
}

@pragma('vm:entry-point')
void onStart(ServiceInstance service) async {
  try {
    DartPluginRegistrant.ensureInitialized();
    await initialize();
    SharedPreferences preferences = await SharedPreferences.getInstance();

    //Activity Tracker
    var activityRecognition = FlutterActivityRecognition.instance;
    _activityStreamSubscription = activityRecognition.activityStream
        .handleError(_handleActivityError)
        .listen(_onActivityReceive);

    /// OPTIONAL when use custom notification
    final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
        FlutterLocalNotificationsPlugin();

    if (service is AndroidServiceInstance) {
      service.on('setAsForeground').listen((event) {
        service.setAsForegroundService();
      });

      service.on('setAsBackground').listen((event) {
        service.setAsBackgroundService();
      });
    }

    service.on('stopService').listen((event) {
      _activityStreamSubscription?.cancel();
      stopLocationService();
      service.stopSelf();
    });

    var isSettingsRefreshed =
        preferences.getBool(isSettingsRefreshedPref) ?? false;
    if (!isSettingsRefreshed) {
      SharedHelper helper = SharedHelper();
      helper.refreshAppSettings();
    }

    //Set the update interval here
    Timer.periodic(sharedHelper.getUpdateIntervalDuration(), (timer) async {
      log('Background service called');
      String message = 'error';
      try {
        await preferences.reload();
        var canTrack = preferences.getBool(isTrackingOnPref);
        var isLoggedIn = preferences.getBool(isLoggedInPref);
        var latitude = preferences.getDouble(latitudePref);
        var longitude = preferences.getDouble(longitudePref);
        var locCount = preferences.getInt(locationCountPref);
        var actCount = preferences.getInt(activityCountPref);
        var now = DateTime.now();
        final DateFormat formatter = DateFormat('jms');
        final String formattedTime = formatter.format(now);
        if ((isLoggedIn != null && isLoggedIn) &&
            (canTrack != null && canTrack)) {
          if (!await BackgroundLocationTrackerManager.isTracking() ||
              locCount == null) {
            await BackgroundLocationTrackerManager.startTracking();
          }
          //Device Update
          try {
            trackingService.updateDeviceStatus(
                latitude ?? 0.0, longitude ?? 0.0);
          } catch (e) {
            message = 'Unable to update device status';
          }
          message =
              'Tracking : ${canTrack.toString()} UpdatedAt: $formattedTime LC: $locCount AC: $actCount';
        } else {
          message = 'Tracking is disabled';
          BackgroundLocationTrackerManager.stopTracking();
        }
      } catch (e) {
        message = e.toString();
      }
      if (service is AndroidServiceInstance) {
        if (await service.isForegroundService()) {
          flutterLocalNotificationsPlugin.show(
            888,
            '$mainAppName Background Service',
            message,
            const NotificationDetails(
              android: AndroidNotificationDetails(
                'my_foreground',
                'MY FOREGROUND SERVICE',
                icon: 'ic_bg_service_small',
                ongoing: true,
                autoCancel: false,
              ),
            ),
          );
        }
      }
    });
  } catch (e) {
    log("Main Exception $e");
  }
}

void stopLocationService() async {
  if (await BackgroundLocationTrackerManager.isTracking()) {
    await BackgroundLocationTrackerManager.stopTracking();
  }
}

void _onActivityReceive(Activity activity) {
  var latitude = getDoubleAsync(latitudePref);
  var longitude = getDoubleAsync(longitudePref);
  var count = getIntAsync(activityCountPref);
  var isTracking = getBoolAsync(isTrackingOnPref);
  setValue(activityCountPref, count + 1);
  if (isTracking) {
    trackingService.updateAttendanceStatus(activity, latitude, longitude);
  }
  _activityStreamController.sink.add(activity);
}

void _handleActivityError(dynamic error) {
  log('Catch Error >> $error');
}
