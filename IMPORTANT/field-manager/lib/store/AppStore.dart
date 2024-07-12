import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../locale/app_localizations.dart';
import '../locale/languages.dart';
import '../main.dart';
import '../models/status/status_response.dart';
import '../utils/app_colors.dart';
import '../utils/app_constants.dart';

part 'AppStore.g.dart';

class AppStore = AppStoreBase with _$AppStore;

abstract class AppStoreBase with Store {
  @observable
  bool isDarkModeOn = false;

  @observable
  bool isHover = false;

  @observable
  StatusResponse? currentStatus = StatusResponse();

  @observable
  Color? iconColor;

  @observable
  Color? backgroundColor;

  @observable
  Color? appBarColor;

  @observable
  Color? scaffoldBackground;

  @observable
  Color? backgroundSecondaryColor;

  @observable
  Color? appColorPrimaryLightColor;

  @observable
  Color? iconSecondaryColor;

  @observable
  Color? textPrimaryColor;

  @observable
  Color? textSecondaryColor;

  @observable
  String selectedLanguageCode = defaultLanguage;

  @action
  Future<void> toggleDarkMode({bool? value}) async {
    isDarkModeOn = value ?? !isDarkModeOn;

    if (isDarkModeOn) {
      scaffoldBackground = appBackgroundColorDark;

      appBarColor = cardBackgroundBlackDark;
      backgroundColor = Colors.white;
      backgroundSecondaryColor = Colors.white;
      appColorPrimaryLightColor = cardBackgroundBlackDark;

      iconColor = iconColorPrimary;
      iconSecondaryColor = iconColorSecondary;

      textPrimaryColor = whiteColor;
      textSecondaryColor = Colors.white54;

      textPrimaryColorGlobal = whiteColor;
      textSecondaryColorGlobal = Colors.white54;
      shadowColorGlobal = appShadowColorDark;
    } else {
      scaffoldBackground = scaffoldLightColor;

      appBarColor = Colors.white;
      backgroundColor = Colors.black;
      backgroundSecondaryColor = appSecondaryBackgroundColor;
      appColorPrimaryLightColor = appColorPrimaryLight;

      iconColor = iconColorPrimaryDark;
      iconSecondaryColor = iconColorSecondaryDark;

      textPrimaryColor = appTextColorPrimary;
      textSecondaryColor = appTextColorSecondary;

      textPrimaryColorGlobal = appTextColorPrimary;
      textSecondaryColorGlobal = appTextColorSecondary;
      shadowColorGlobal = appShadowColor;
    }
    setStatusBarColor(scaffoldBackground!);

    setValue(isDarkModeOnPref, isDarkModeOn);
  }

  @action
  void toggleHover({bool value = false}) => isHover = value;

  @action
  void setCurrentStatus(StatusResponse status) {
    currentStatus = status;
  }

  @computed
  StatusResponse? get getCurrentStatus => currentStatus;

  @action
  Future<void> setLanguage(String val, {BuildContext? context}) async {
    selectedLanguageCode = val;
    if (context != null) language = BaseLanguage.of(context);
    await setValue(SELECTED_LANGUAGE_CODE, selectedLanguageCode);
    selectedLanguageDataModel = getSelectedLanguageModel();
    language =
        await const AppLocalizations().load(Locale(selectedLanguageCode));
  }
}
