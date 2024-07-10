import 'package:device_info_plus/device_info_plus.dart';
import 'package:mobx/mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../utils/app_constants.dart';

part 'DeviceStore.g.dart';

class DeviceStore = DeviceStoreBase with _$DeviceStore;

abstract class DeviceStoreBase with Store {
  @observable
  bool isLoading = false;

  @observable
  DeviceVerificationStatus deviceVerificationStatus =
      DeviceVerificationStatus.verifying;

  static final DeviceInfoPlugin deviceInfoPlugin = DeviceInfoPlugin();

  @action
  Future init() async {
    deviceVerificationStatus = DeviceVerificationStatus.verifying;
    await checkDevice();
  }

  Future checkDevice() async {
    await Future.delayed(const Duration(seconds: 5));
    var device = await sharedHelper.getDeviceId();
    var result = await apiRepo.checkDevice(
        platformName().toLowerCase(), device.toString());
    if (result == null) {
      deviceVerificationStatus = DeviceVerificationStatus.failed;
      toast('Unable to check device status');
    } else if (result.toLowerCase() == 'verified') {
      deviceVerificationStatus = DeviceVerificationStatus.verified;
      await setValue(isDeviceVerifiedPref, true);
      sharedHelper.login();
    } else if (result.toLowerCase() == 'already registered with other device') {
      deviceVerificationStatus = DeviceVerificationStatus.alreadyRegistered;
      await setValue(isDeviceVerifiedPref, true);
      sharedHelper.login();
    } else if (result.toLowerCase() == 'not registered') {
      deviceVerificationStatus = DeviceVerificationStatus.notRegistered;
    } else {
      deviceVerificationStatus = DeviceVerificationStatus.failed;
      toast(result);
    }
  }

  Future registerDevice() async {
    isLoading = true;

    var deviceId = await sharedHelper.getDeviceId();
    if (deviceId == null) {
      toast('Unable to get device id');
      isLoading = false;
      return;
    }

    try {
      var request = <String, Object>{};
      if (isIOS) {
        var build = await deviceInfoPlugin.iosInfo;
        request = {
          "deviceType": "ios",
          "deviceId": deviceId,
          "brand": 'Apple',
          "board": build.systemName ?? "",
          "sdkVersion": build.systemVersion.toString(),
          "model": build.model ?? ""
        };
      } else {
        AndroidDeviceInfo build = await deviceInfoPlugin.androidInfo;
        request = {
          "deviceType": "android",
          "deviceId": deviceId,
          "brand": build.brand,
          "board": build.board,
          "sdkVersion": build.version.sdkInt.toString(),
          "model": build.model
        };
      }

      var result = await apiRepo.registerDevice(request);
      if (result) {
        isLoading = false;
        toast('Device successfully registered');
        sharedHelper.login();
        await setValue(isDeviceVerifiedPref, true);
      } else {
        toast('Unable to register device');
      }
    } catch (e) {
      log(e.toString());
    }
    isLoading = false;
  }
}

enum DeviceVerificationStatus {
  pending,
  verifying,
  verified,
  alreadyRegistered,
  notRegistered,
  failed
}
