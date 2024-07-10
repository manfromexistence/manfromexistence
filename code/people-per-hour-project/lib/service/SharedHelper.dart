import 'package:device_uuid/device_uuid.dart';
import 'package:fieldmanager_hrms_flutter/models/Settings/app_settings_model.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:nb_utils/nb_utils.dart';

import '../main.dart';
import '../utils/app_constants.dart';

class SharedHelper {
  String getFullName() {
    return '${getStringAsync(firstNamePref)} ${getStringAsync(lastNamePref)}';
  }

  void logout() async {
    clearSharedPref();
    toast(language!.lblLoggedOutSuccessfully);
  }

  Future<String?> getDeviceId() async {
    final deviceUuidPlugin = DeviceUuid();
    String? uuid;
    // Platform messages may fail, so we use a try/catch PlatformException.
    // We also handle the message potentially returning null.
    try {
      uuid = await deviceUuidPlugin.getUUID();
    } catch (e) {
      uuid = null;
    }

    return uuid;
  }

  void setAppSettings(AppSettingsModel settings) {
    setValue(appVersionPref, settings.appVersion);
    setValue(privacyPolicyUrlPref, settings.privacyPolicyUrl);
    setValue(
        locationUpdateIntervalTypePref, settings.locationUpdateIntervalType);
    setValue(locationUpdateIntervalPref, settings.locationUpdateInterval);
    setValue(appCurrencySymbolPref, settings.currencySymbol);
    setValue(appDistanceUnitPref, settings.distanceUnit);
    setValue(appCountryPhoneCodePref, settings.countryPhoneCode);
  }

  int getUpdateInterval() {
    var interval = getIntAsync(locationUpdateIntervalPref);
    return interval == 0 ? 30 : interval;
  }

  bool isSettingsRefreshed() {
    return getBoolAsync(isSettingsRefreshedPref);
  }

  Duration getUpdateIntervalDuration() {
    var interval = getUpdateInterval();

    log('Location update interval value is $interval');

    var type = getStringAsync(locationUpdateIntervalTypePref);

    if (type == '') {
      return Duration(seconds: interval);
    } else {
      return type == 's'
          ? Duration(seconds: interval)
          : Duration(minutes: interval);
    }
  }

  Future refreshAppSettings() async {
    var appSettings = await apiRepo.getAppSettings();
    if (appSettings != null) {
      setAppSettings(appSettings);
      setValue(isSettingsRefreshedPref, true);
    }
  }

  void login() async {
    addFirebaseToken();
  }

  void addFirebaseToken() {
    FirebaseMessaging messaging = FirebaseMessaging.instance;
    messaging
        .getToken()
        .then((value) => apiRepo.addFirebaseToken(platformName(), value!));
    messaging.subscribeToTopic('announcement');
    messaging.subscribeToTopic('chat');
    messaging.subscribeToTopic('attendance');
    messaging.subscribeToTopic('general');

    setValue(notiAnnouncementPref, true);
    setValue(notiChatPref, true);
    setValue(notiAttendancePref, true);
    setValue(notiGeneralPref, true);
  }
}
