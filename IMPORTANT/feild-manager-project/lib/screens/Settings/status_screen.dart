import 'package:background_location_tracker/background_location_tracker.dart';
import 'package:fieldmanager_hrms_flutter/Utils/app_constants.dart';
import 'package:fieldmanager_hrms_flutter/Widgets/button_widget.dart';
import 'package:fieldmanager_hrms_flutter/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Utils/app_widgets.dart';

class StatusScreen extends StatefulWidget {
  const StatusScreen({super.key});

  @override
  State<StatusScreen> createState() => _StatusScreenState();
}

class _StatusScreenState extends State<StatusScreen> {
  int locationCount = 0, activityCount = 0;
  String locationStatus = '',
      backgroundStatus = '',
      locationUpdateDuration = '',
      trackingStartedAt = '';

  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.reload();

    var duration = getIntAsync(locationUpdateIntervalPref);

    locationUpdateDuration =
        '${duration.toString()} ${getStringAsync(locationUpdateIntervalTypePref).toLowerCase() == 's' ? 'Seconds' : 'Minutes'}';

    final service = FlutterBackgroundService();
    var isRunning = await service.isRunning();

    var locationTrackingStatus =
        await BackgroundLocationTrackerManager.isTracking();

    setState(() {
      if (appStore.getCurrentStatus != null &&
          !appStore.getCurrentStatus!.checkInAt.isEmptyOrNull) {
        trackingStartedAt = appStore.getCurrentStatus!.checkInAt!;
      } else {
        trackingStartedAt = '';
      }

      if (isRunning) {
        backgroundStatus = language!.lblRunning;
      } else {
        backgroundStatus = language!.lblStopped;
      }

      if (locationTrackingStatus) {
        locationStatus = language!.lblRunning;
      } else {
        locationStatus = language!.lblStopped;
      }

      locationCount = prefs.getInt(locationCountPref) ?? 0;
      activityCount = prefs.getInt(activityCountPref) ?? 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblDeviceStatus),
      body: Column(
        children: [
          !trackingStartedAt.isEmptyOrNull
              ? Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(language!.lblTrackingStartedAt),
                        Text(trackingStartedAt)
                      ],
                    ),
                    const Divider(),
                    10.height,
                  ],
                )
              : Container(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(language!.lblActivityCount),
              Text(activityCount.toString())
            ],
          ),
          const Divider(),
          10.height,
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(language!.lblLocationCount),
              Text(locationCount.toString())
            ],
          ),
          const Divider(),
          10.height,
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(language!.lblLastLocation),
              Text(
                  '${getDoubleAsync(latitudePref)},${getDoubleAsync(longitudePref)}')
            ],
          ),
          const Divider(),
          10.height,
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(language!.lblDeviceStatusUpdateInterval),
              Text(locationUpdateDuration)
            ],
          ),
          const Divider(),
          10.height,
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(language!.lblBackgroundServiceStatus),
              Text(locationStatus)
            ],
          ),
          const Divider(),
          10.height,
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(language!.lblBackgroundLocationTracker),
              Text(locationStatus)
            ],
          ),
          20.height,
          button(language!.lblRefresh, onTap: () => init())
        ],
      ).paddingOnly(top: 10, left: 10, right: 10),
    );
  }
}
