import 'dart:async';

import 'package:battery_plus/battery_plus.dart';
import 'package:location/location.dart';
import 'package:mobx/mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';

part 'AttendanceStore.g.dart';

class AttendanceStore = AttendanceStoreBase with _$AttendanceStore;

abstract class AttendanceStoreBase with Store {
  final Location locationService = Location();

  late StreamSubscription<LocationData> locationSubscription;

  @observable
  bool isLoading = true;

  void getData() async {
    isLoading = true;

    var statusResult = await apiRepo.checkAttendanceStatus();

    if (statusResult != null) {
      appStore.setCurrentStatus(statusResult);
    }

    isLoading = false;
  }

  Future checkInOut(String status) async {
    isLoading = true;

    var location = await locationService.getLocation();
    var battery = Battery();

    var connectivityResult = await (Connectivity().checkConnectivity());
    Map req = {
      "status": status,
      "latitude": location.latitude,
      "longitude": location.longitude,
      "altitude": location.altitude ?? 0,
      "bearing": 0,
      "locationAccuracy": location.accuracy ?? 0,
      "speed": location.speed ?? 0,
      "time": location.time ?? 0,
      "isMock": location.isMock ?? false,
      "batteryPercentage": await battery.batteryLevel,
      "isLocationOn": true,
      "isWifiOn": connectivityResult == ConnectivityResult.wifi,
      "signalStrength": connectivityResult == ConnectivityResult.mobile ? 5 : 0
    };

    var result = await apiRepo.checkInOut(req);
    if (!result.isSuccess) {
      toast(result.message);
      return false;
    }
    var statusResult = await apiRepo.checkAttendanceStatus();
    if (statusResult != null) {
      appStore.setCurrentStatus(statusResult);
    }
    if (status == 'checkin') {
      trackingService.startTrackingService();
    } else {
      trackingService.stopTrackingService();
    }
    toast('Successfully $status');
    isLoading = false;
    return true;
  }
}
