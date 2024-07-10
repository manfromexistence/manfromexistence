import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../utils/app_widgets.dart';

class LanguageSelectionScreen extends StatefulWidget {
  const LanguageSelectionScreen({Key? key}) : super(key: key);

  @override
  State<LanguageSelectionScreen> createState() =>
      _LanguageSelectionScreenState();
}

class _LanguageSelectionScreenState extends State<LanguageSelectionScreen> {
  @override
  Widget build(BuildContext context) {
    return Observer(
      builder: (context) => Scaffold(
        appBar: appBar(context, language!.lblLanguage),
        body: LanguageListWidget(
          widgetType: WidgetType.LIST,
          onLanguageChange: (v) async {
            await appStore.setLanguage(v.languageCode!, context: context);
            setState(() {});
          },
        ),
      ),
    );
  }
}
