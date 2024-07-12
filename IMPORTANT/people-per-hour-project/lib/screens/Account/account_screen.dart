import 'package:fieldmanager_hrms_flutter/utils/app_images.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:package_info/package_info.dart';
import 'package:share/share.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../main.dart';
import '../../utils/app_colors.dart';
import '../../utils/app_constants.dart';
import '../../utils/app_widgets.dart';
import '../Login/LoginScreen.dart';

class AccountScreen extends StatefulWidget {
  static String tag = '/AccountScreen';
  const AccountScreen({Key? key}) : super(key: key);

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  late double width;
  bool isNotificationEnabled = true;
  String appVersion = '1.0';

  @override
  void initState() {
    appVersion = getStringAsync(appVersionPref);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    width = MediaQuery.of(context).size.width;
    return Observer(
      builder: (_) => Scaffold(
        appBar: appBar(context, 'Account'),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SingleChildScrollView(
              child: Column(
                children: [
                  12.height,
                  CircleAvatar(
                    radius: 60,
                    child: Image.asset(
                      appProfileImg,
                    ),
                  ),
                  Center(
                    child: Text(
                      sharedHelper.getFullName(),
                      style: boldTextStyle(size: 20),
                    ),
                  ),
                  10.height,
                  Row(
                    children: <Widget>[
                      settingItem(language!.lblDarkMode, width,
                          icon: appThemeImg),
                      Switch(
                        value: appStore.isDarkModeOn,
                        onChanged: (s) {
                          appStore.toggleDarkMode(value: s);
                        },
                        activeTrackColor: opPrimaryColor,
                        activeColor: white,
                      )
                    ],
                  ),
                  divider(),
                  Row(
                    children: <Widget>[
                      settingItem(language!.lblNotification, width,
                          icon: appNotificationImg),
                      Switch(
                        value: isNotificationEnabled,
                        onChanged: (value) async {
                          var instance = FirebaseMessaging.instance;
                          if (value) {
                            instance.subscribeToTopic('announcement');
                          } else {
                            instance.unsubscribeFromTopic('announcement');
                          }
                          setState(() {
                            isNotificationEnabled = value;
                          });
                        },
                        activeTrackColor: opPrimaryColor,
                        activeColor: white,
                      )
                    ],
                  ),
                  divider(),
                  Row(
                    children: <Widget>[
                      settingItem(language!.lblAboutUs, width,
                          icon: appInfoImg),
                      IconButton(
                        icon: const Icon(
                          Icons.keyboard_arrow_right,
                          color: opSecondaryColor,
                        ),
                        onPressed: () {},
                      ),
                    ],
                  ),
                  divider(),
                  Row(
                    children: <Widget>[
                      settingItem(language!.lblRateUs, width, icon: appRateImg)
                    ],
                  ).onTap(() async {
                    PackageInfo.fromPlatform().then((value) async {
                      String package = value.packageName;
                      launchUrl(Uri.parse('$playStoreUrl$package'));
                    });
                  }),
                  divider(),
                  Row(
                    children: <Widget>[
                      settingItem(language!.lblShareApp, width,
                          icon: appShareImg)
                    ],
                  ).onTap(() async {
                    PackageInfo.fromPlatform().then((value) async {
                      PackageInfo.fromPlatform().then((value) async {
                        String package = value.packageName;
                        await Share.share(
                            'Download $mainAppName from Play Store\n\n\n$playStoreUrl$package');
                      });
                    });
                  }),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: AppButton(
                        text: language!.lblLogout,
                        color: opPrimaryColor,
                        textColor: Colors.white,
                        shapeBorder: buildButtonCorner(),
                        width: 120,
                        onTap: () {
                          showConfirmDialog(
                            context,
                            language!.lblDoYouWantToLogoutFromTheApp,
                            positiveText: language!.lblYes,
                            negativeText: language!.lblNo,
                            onAccept: (context) {
                              sharedHelper.logout();
                              const LoginScreen()
                                  .launch(context, isNewTask: true);
                            },
                          );
                        }),
                  ),
                ],
              ),
            ),
            10.height,
            Center(
              child: Text(
                'V $appVersion',
                style: secondaryTextStyle(),
              ),
            )
          ],
        ),
      ),
    );
  }
}
