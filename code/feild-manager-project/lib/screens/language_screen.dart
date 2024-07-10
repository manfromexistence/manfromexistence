import 'package:fieldmanager_hrms_flutter/screens/navigation_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../Utils/app_widgets.dart';
import '../main.dart';

class LanguageScreen extends StatefulWidget {
  const LanguageScreen({super.key});

  @override
  State<LanguageScreen> createState() => _LanguageScreenState();
}

class _LanguageScreenState extends State<LanguageScreen> {
  @override
  Widget build(BuildContext context) {
    return Observer(
      builder: (context) => Scaffold(
        appBar: appBar(context, language!.lblChangeLanguage),
        body: LanguageListWidget(
          widgetType: WidgetType.LIST,
          onLanguageChange: (v) async {
            if (!mounted) return;
            finish(context);
            await appStore.setLanguage(v.languageCode!, context: context);
            toast(language!.lblLanguageChanged);
            if (!mounted) return;
            const NavigationScreen().launch(context, isNewTask: true);
          },
        ),
      ),
    );
  }
}
