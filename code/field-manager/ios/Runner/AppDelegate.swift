import UIKit
import Flutter
import background_location_tracker
import flutter_background_service_ios
import GoogleMaps
import flutter_local_notifications

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
     // This is required to make any communication available in the action isolate.
          FlutterLocalNotificationsPlugin.setPluginRegistrantCallback { (registry) in
              GeneratedPluginRegistrant.register(with: registry)
          }

          if #available(iOS 10.0, *) {
            UNUserNotificationCenter.current().delegate = self as UNUserNotificationCenterDelegate
          }

          GMSServices.provideAPIKey("maps_key_here")
          GeneratedPluginRegistrant.register(with: self)

          BackgroundLocationTrackerPlugin.setPluginRegistrantCallback { registry in
                     GeneratedPluginRegistrant.register(with: registry)
                 }

          SwiftFlutterBackgroundServicePlugin.taskIdentifier = "your.custom.task.identifier"
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
