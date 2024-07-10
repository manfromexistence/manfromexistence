import 'package:fieldmanager_hrms_flutter/screens/ChangePassword/change_password_screen.dart';
import 'package:fieldmanager_hrms_flutter/screens/Settings/status_screen.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Utils/app_widgets.dart';
import '../../main.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblSettings),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SettingItemWidget(
              title: language!.lblRefreshAppConfiguration,
              trailing: Icon(Icons.keyboard_arrow_right_rounded,
                  color: context.dividerColor),
              decoration: BoxDecoration(borderRadius: radius()),
              onTap: () async {
                await sharedHelper.refreshAppSettings();
                toast(language!.lblSettingsRefreshed);
              },
            ),
            SettingItemWidget(
              title: language!.lblDeviceStatus,
              trailing: Icon(Icons.keyboard_arrow_right_rounded,
                  color: context.dividerColor),
              decoration: BoxDecoration(borderRadius: radius()),
              onTap: () async {
                const StatusScreen().launch(context);
              },
            ),
            SettingItemWidget(
              title: 'Change Password',
              trailing: Icon(Icons.keyboard_arrow_right_rounded,
                  color: context.dividerColor),
              decoration: BoxDecoration(borderRadius: radius()),
              onTap: () async {
                const ChangePasswordScreen().launch(context);
              },
            ),
          ],
        ).paddingOnly(top: 5),
      ),
    );
  }
}
