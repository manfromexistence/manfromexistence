import 'dart:async';

import 'package:fieldmanager_hrms_flutter/screens/navigation_screen.dart';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Widgets/button_widget.dart';
import '../../main.dart';
import '../../utils/app_constants.dart';
import '../../utils/app_widgets.dart';
import '../Login/LoginScreen.dart';

class BannedScreen extends StatefulWidget {
  const BannedScreen({Key? key}) : super(key: key);

  @override
  State<BannedScreen> createState() => _BannedScreenState();
}

class _BannedScreenState extends State<BannedScreen> {
  late Timer timer;

  @override
  void initState() {
    init();
    super.initState();
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  void init() async {
    timer = Timer.periodic(const Duration(seconds: 4), (timer) async {
      log('Banned Status Checking');
      if (getBoolAsync(isLoggedInPref)) {
        var result = await apiRepo.checkAttendanceStatus();
        if (result != null) {
          appStore.setCurrentStatus(result);
          if (result.userStatus != 'inactive') {
            timer.cancel();
            if (!mounted) return;
            toast(language!.lblYourAccountIsActive);
            const NavigationScreen().launch(context, isNewTask: true);
          }
        } else {
          trackingService.stopTrackingService();
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblBanned, showBack: false),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Lottie.asset('assets/animations/failed.json', repeat: false),
            Column(
              children: [
                Text(language!.lblYouReBanned,
                    style: primaryTextStyle(
                        color: appStore.textPrimaryColor, size: 20)),
                Text(
                  language!.lblKindlyContactAdministrator,
                  style: primaryTextStyle(color: appStore.textPrimaryColor),
                  textAlign: TextAlign.center,
                ),
                25.height,
                button(language!.lblLogout, onTap: () {
                  sharedHelper.logout();
                  const LoginScreen().launch(context, isNewTask: true);
                })
              ],
            )
          ],
        ),
      ),
    );
  }
}
