import 'package:fieldmanager_hrms_flutter/utils/app_widgets.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

import '../main.dart';

class PrivacyScreen extends StatefulWidget {
  const PrivacyScreen({Key? key}) : super(key: key);

  @override
  State<PrivacyScreen> createState() => _PrivacyScreenState();
}

class _PrivacyScreenState extends State<PrivacyScreen> {
  String? privacyPolicyUrl = '';

  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    var appSettings = await apiRepo.getAppSettings();
    if (appSettings != null) {
      privacyPolicyUrl = appSettings.privacyPolicyUrl;
      sharedHelper.setAppSettings(appSettings);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblPrivacyPolicy),
      body: WebView(
        initialUrl: privacyPolicyUrl,
      ),
    );
  }
}
