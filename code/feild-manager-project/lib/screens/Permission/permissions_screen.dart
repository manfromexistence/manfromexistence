import 'package:fieldmanager_hrms_flutter/screens/navigation_screen.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:permission_handler/permission_handler.dart';

import '../../main.dart';
import '../../utils/app_colors.dart';
import '../../utils/app_constants.dart';
import '../../utils/app_widgets.dart';
import '../Login/LoginScreen.dart';

class PermissionsScreen extends StatefulWidget {
  static String tag = '/PermissionsScreen';
  const PermissionsScreen({Key? key}) : super(key: key);

  @override
  State<PermissionsScreen> createState() => _PermissionsScreenState();
}

class _PermissionsScreenState extends State<PermissionsScreen> {
  PermissionsEnum _permissions = PermissionsEnum.none;
  @override
  void initState() {
    super.initState();
    init();
  }

  Future<void> init() async {
    await Permission.notification.request();

    var locationPermission = await Geolocator.checkPermission();
    var activityPermission = await Permission.activityRecognition.isGranted;

    if (locationPermission != LocationPermission.always) {
      _permissions = PermissionsEnum.location;
      setState(() {});
      return;
    } else {
      if (!activityPermission) {
        _permissions = PermissionsEnum.activity;
        setState(() {});
        return;
      }
    }
    toast(language!.lblAllSet);
    if (!mounted) return;
    const NavigationScreen().launch(context, isNewTask: true);
    setState(() {});
  }

  void handleLocationPermission() async {
    var result = await Permission.locationAlways.request();

    if (result == LocationPermission.whileInUse) {
      toast(language!.lblPleaseAllowAllTheTimeInSettings);
      await Future.delayed(const Duration(seconds: 1));
      openAppSettings();
    } else if (result != LocationPermission.always) {
      toast(language!.lblPleaseEnableAllowAllTheTimeInSettings);
      await Future.delayed(const Duration(seconds: 1));
      openAppSettings();
    } else if (result == LocationPermission.always) {
      init();
    }
  }

  void handleActivityPermission() async {
    var result = await Permission.activityRecognition.request();
    if (result == PermissionStatus.permanentlyDenied) {
      toast(language!.lblPleaseEnablePhysicalActivityPermissionInSettings);
      await Future.delayed(const Duration(seconds: 1));
      openAppSettings();
    } else if (result == PermissionStatus.granted) {
      init();
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              40.height,
              Center(
                child: Image.asset(
                    _permissions == PermissionsEnum.location
                        ? 'images/errors/map.png'
                        : 'images/errors/pedestrian.png',
                    fit: BoxFit.cover,
                    height: 170,
                    width: 180),
              ),
              Column(
                children: [
                  Text(
                      _permissions == PermissionsEnum.location
                          ? language!.lblLocationAccess
                          : language!.lblActivityAccess,
                      style: boldTextStyle(size: 30)),
                  6.height,
                  _permissions == PermissionsEnum.location
                      ? Column(
                          children: [
                            15.height,
                            RichText(
                              text: TextSpan(
                                  text:
                                      '$mainAppName ${language!.lblCollectsLocationData} \n \n',
                                  style: boldTextStyle(),
                                  children: [
                                    TextSpan(
                                      text:
                                          '* ${language!.lblToEnableAutomaticAttendance} \n',
                                      style: primaryTextStyle(),
                                    ),
                                    TextSpan(
                                      text:
                                          '* ${language!.lblToTrackTheDistanceTravelled} \n',
                                      style: primaryTextStyle(),
                                    ),
                                    TextSpan(
                                      text:
                                          '* ${language!.lblToMarkClientVisits}\n',
                                      style: primaryTextStyle(),
                                    ),
                                    TextSpan(
                                      text:
                                          '* ${language!.lblToProcessTheSalary}\n',
                                      style: primaryTextStyle(),
                                    ),
                                  ]),
                            ),
                            Text(
                              '*${language!.lblNote}: ${language!.lblLocationWillBeTrackedTnTheBackgroundAndAlsoEvenWhenTheAppIsClosedOrNotInUse}',
                              style:
                                  primaryTextStyle(size: 16, color: Colors.red),
                              textAlign: TextAlign.left,
                            ).paddingSymmetric(vertical: 8, horizontal: 40),
                            Text(
                              language!
                                  .lblImportantGiveLocationAccuracyToPreciseAndAllowAllTheTimeSoThatTheAppCanFunctionProperly,
                              style: primaryTextStyle(
                                  size: 16, color: Colors.amber.shade800),
                              textAlign: TextAlign.left,
                            ).paddingSymmetric(vertical: 8, horizontal: 40)
                          ],
                        )
                      : Padding(
                          padding: const EdgeInsets.only(left: 15, right: 15),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              6.height,
                              RichText(
                                text: TextSpan(
                                    text:
                                        '$mainAppName ${language!.lblCollectsPhysicalActivityData} \n \n',
                                    style: boldTextStyle(),
                                    children: [
                                      TextSpan(
                                        text:
                                            '* ${language!.lblToEnableAutomaticAttendance} \n',
                                        style: primaryTextStyle(),
                                      ),
                                      TextSpan(
                                        text:
                                            '* ${language!.lblToCheckTheDeviceStateToEnableTrackingWhenTravelling} \n',
                                        style: primaryTextStyle(),
                                      ),
                                      TextSpan(
                                        text:
                                            '* ${language!.lblToMarkClientVisits}\n',
                                        style: primaryTextStyle(),
                                      ),
                                    ]),
                              )
                            ],
                          ),
                        ),
                  32.height,
                  AppButton(
                    shapeBorder: buildButtonCorner(),
                    elevation: 10,
                    textColor: Colors.white,
                    color: opPrimaryColor,
                    padding: const EdgeInsets.all(16),
                    onTap: () async {
                      await init();
                      if (_permissions == PermissionsEnum.location) {
                        handleLocationPermission();
                      }
                      if (_permissions == PermissionsEnum.activity) {
                        handleActivityPermission();
                      }
                    },
                    child: Text(language!.lblEnablePermission,
                        style: boldTextStyle(color: white)),
                  ),
                  15.height,
                  AppButton(
                    shapeBorder: buildButtonCorner(),
                    elevation: 10,
                    textColor: Colors.white,
                    color: opPrimaryColor,
                    padding: const EdgeInsets.all(8),
                    onTap: () {
                      showConfirmDialog(
                        context,
                        language!.lblDoYouWantToLogoutFromTheApp,
                        positiveText: language!.lblYes,
                        negativeText: language!.lblNo,
                        onAccept: () {
                          sharedHelper.logout();
                          const LoginScreen().launch(context, isNewTask: true);
                        },
                      );
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(5),
                      child: Text(
                        language!.lblLogOut,
                        style: boldTextStyle(color: white),
                      ),
                    ),
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

enum PermissionsEnum { none, location, activity }
