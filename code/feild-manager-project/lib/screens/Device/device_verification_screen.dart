import 'package:fieldmanager_hrms_flutter/Widgets/button_widget.dart';
import 'package:fieldmanager_hrms_flutter/screens/Device/DeviceStore.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:lottie/lottie.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../utils/app_constants.dart';
import '../../utils/app_images.dart';
import '../Login/LoginScreen.dart';
import '../navigation_screen.dart';

class DeviceVerificationScreen extends StatefulWidget {
  const DeviceVerificationScreen({Key? key}) : super(key: key);

  @override
  State<DeviceVerificationScreen> createState() =>
      _DeviceVerificationScreenState();
}

class _DeviceVerificationScreenState extends State<DeviceVerificationScreen> {
  final DeviceStore _store = DeviceStore();

  @override
  void initState() {
    init();
    super.initState();
  }

  void init() async {
    await _store.init();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblDeviceVerification, showBack: false),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Observer(
              builder: (_) {
                if (_store.deviceVerificationStatus ==
                    DeviceVerificationStatus.verifying) {
                  return Lottie.asset(
                      'assets/animations/phone_number_verification.json');
                } else if (_store.deviceVerificationStatus ==
                    DeviceVerificationStatus.pending) {
                  return Column(
                    children: [
                      100.height,
                      Padding(
                        padding: const EdgeInsets.only(left: 20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Center(
                              child: Image.asset(
                                appDeviceLockImg,
                                width: 200,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  );
                } else if (_store.deviceVerificationStatus ==
                    DeviceVerificationStatus.alreadyRegistered) {
                  return Lottie.asset('assets/animations/failed.json',
                      repeat: false);
                } else if (_store.deviceVerificationStatus ==
                    DeviceVerificationStatus.notRegistered) {
                  return Column(
                    children: [
                      100.height,
                      Padding(
                        padding: const EdgeInsets.only(left: 20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Center(
                              child: Image.asset(
                                appDeviceLockImg,
                                width: 200,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  );
                } else if (_store.deviceVerificationStatus ==
                    DeviceVerificationStatus.verified) {
                  return Lottie.asset('assets/animations/success.json',
                      repeat: false);
                } else {
                  return Lottie.asset('assets/animations/failed.json',
                      repeat: false);
                }
                return Container();
              },
            ),
            10.height,
            Padding(
              padding: const EdgeInsets.all(2.0),
              child: Center(
                child: Observer(builder: (_) {
                  if (_store.deviceVerificationStatus ==
                      DeviceVerificationStatus.verifying) {
                    return Column(
                      children: [
                        Text(language!.lblVerifying,
                            style: primaryTextStyle(
                                color: appStore.textPrimaryColor, size: 20)),
                        Text(
                          language!.lblHoldOn,
                          style: primaryTextStyle(
                              color: appStore.textPrimaryColor),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    );
                  } else if (_store.deviceVerificationStatus ==
                      DeviceVerificationStatus.pending) {
                    return Column(
                      children: [
                        Text(
                          language!.lblVerificationPending,
                          style: primaryTextStyle(
                              color: appStore.textPrimaryColor, size: 20),
                        ),
                        Text(
                          language!.lblYourDeviceVerificationIsPending,
                          style: primaryTextStyle(
                              color: appStore.textPrimaryColor),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    );
                  } else if (_store.deviceVerificationStatus ==
                      DeviceVerificationStatus.alreadyRegistered) {
                    return Column(
                      children: [
                        Text(language!.lblVerificationFailed,
                            style: primaryTextStyle(
                                color: appStore.textPrimaryColor, size: 20)),
                        Text(
                          language!
                              .lblThisDeviceIsAlreadyRegisteredWithOtherAccountPleaseContactAdministrator,
                          style: primaryTextStyle(
                              color: appStore.textPrimaryColor),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    );
                  } else if (_store.deviceVerificationStatus ==
                      DeviceVerificationStatus.notRegistered) {
                    return Column(
                      children: [
                        Text(language!.lblNewDevice,
                            style: primaryTextStyle(
                                color: appStore.textPrimaryColor, size: 20)),
                        Text(
                          language!
                              .lblThisDeviceIsNotRegisteredClickOnRegisterToAddItToYourAccount,
                          style: primaryTextStyle(
                              color: appStore.textPrimaryColor),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    );
                  } else if (_store.deviceVerificationStatus ==
                      DeviceVerificationStatus.verified) {
                    return Column(
                      children: [
                        Text(language!.lblVerificationCompleted,
                            style: primaryTextStyle(
                                color: appStore.textPrimaryColor, size: 20)),
                        Text(
                          language!
                              .lblYourDeviceVerificationIsSuccessfullyCompleted,
                          style: primaryTextStyle(
                              color: appStore.textPrimaryColor),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    );
                  } else {
                    return Column(
                      children: [
                        Text(
                          language!.lblVerificationFailed,
                          style: primaryTextStyle(
                              color: appStore.textPrimaryColor, size: 20),
                        ),
                        Text(
                          language!.lblVerificationFailedPleaseTryAgain,
                          style: primaryTextStyle(
                              color: appStore.textPrimaryColor),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    );
                  }
                }),
              ),
            ),
            15.height,
            Observer(builder: (_) {
              if (_store.deviceVerificationStatus ==
                  DeviceVerificationStatus.verified) {
                return button(language!.lblOk, onTap: () async {
                  if (getBoolAsync(isDeviceVerifiedPref)) {
                    await sharedHelper.refreshAppSettings();
                    toast(language!.lblWelcomeBack);
                    if (!mounted) return;
                    const NavigationScreen().launch(context, isNewTask: true);
                  }
                });
              } else if (_store.deviceVerificationStatus ==
                  DeviceVerificationStatus.notRegistered) {
                return button(language!.lblRegisterNow, onTap: () async {
                  await _store.registerDevice();
                  if (getBoolAsync(isDeviceVerifiedPref)) {
                    sharedHelper.refreshAppSettings();
                    if (!mounted) return;
                    const NavigationScreen().launch(context, isNewTask: true);
                  }
                });
              } else if (_store.deviceVerificationStatus ==
                      DeviceVerificationStatus.alreadyRegistered ||
                  _store.deviceVerificationStatus ==
                      DeviceVerificationStatus.failed) {
                return button(language!.lblLogOut, onTap: () {
                  sharedHelper.logout();
                  const LoginScreen().launch(context, isNewTask: true);
                });
              }

              return Container();
            }),
          ],
        ),
      ),
    );
  }
}
