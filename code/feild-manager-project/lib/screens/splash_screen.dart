import 'package:fieldmanager_hrms_flutter/screens/Device/device_verification_screen.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_images.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../main.dart';
import '../utils/app_constants.dart';
import 'Login/LoginScreen.dart';
import 'navigation_screen.dart';

class SplashScreen extends StatefulWidget {
  static String tag = '/SplashScreen';
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    await sharedHelper.refreshAppSettings();
    if (getBoolAsync(isLoggedInPref)) {
      if (getBoolAsync(isDeviceVerifiedPref)) {
        if (!mounted) return;
        const NavigationScreen().launch(context, isNewTask: true);
      } else {
        if (!mounted) return;
        const DeviceVerificationScreen().launch(context, isNewTask: true);
      }
    } else {
      if (!mounted) return;
      const LoginScreen().launch(context, isNewTask: true);
    }
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(),
            Image.asset(appLogoImg, height: 100, width: 100),
            Text(
              'Code with ❤️ by CZAppStudio',
              style: secondaryTextStyle(),
            ).paddingBottom(5),
          ],
        ),
      ),
    );
  }
}
