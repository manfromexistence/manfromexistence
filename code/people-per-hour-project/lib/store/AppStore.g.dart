// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'AppStore.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$AppStore on AppStoreBase, Store {
  Computed<StatusResponse?>? _$getCurrentStatusComputed;

  @override
  StatusResponse? get getCurrentStatus => (_$getCurrentStatusComputed ??=
          Computed<StatusResponse?>(() => super.getCurrentStatus,
              name: 'AppStoreBase.getCurrentStatus'))
      .value;

  late final _$isDarkModeOnAtom =
      Atom(name: 'AppStoreBase.isDarkModeOn', context: context);

  @override
  bool get isDarkModeOn {
    _$isDarkModeOnAtom.reportRead();
    return super.isDarkModeOn;
  }

  @override
  set isDarkModeOn(bool value) {
    _$isDarkModeOnAtom.reportWrite(value, super.isDarkModeOn, () {
      super.isDarkModeOn = value;
    });
  }

  late final _$isHoverAtom =
      Atom(name: 'AppStoreBase.isHover', context: context);

  @override
  bool get isHover {
    _$isHoverAtom.reportRead();
    return super.isHover;
  }

  @override
  set isHover(bool value) {
    _$isHoverAtom.reportWrite(value, super.isHover, () {
      super.isHover = value;
    });
  }

  late final _$currentStatusAtom =
      Atom(name: 'AppStoreBase.currentStatus', context: context);

  @override
  StatusResponse? get currentStatus {
    _$currentStatusAtom.reportRead();
    return super.currentStatus;
  }

  @override
  set currentStatus(StatusResponse? value) {
    _$currentStatusAtom.reportWrite(value, super.currentStatus, () {
      super.currentStatus = value;
    });
  }

  late final _$iconColorAtom =
      Atom(name: 'AppStoreBase.iconColor', context: context);

  @override
  Color? get iconColor {
    _$iconColorAtom.reportRead();
    return super.iconColor;
  }

  @override
  set iconColor(Color? value) {
    _$iconColorAtom.reportWrite(value, super.iconColor, () {
      super.iconColor = value;
    });
  }

  late final _$backgroundColorAtom =
      Atom(name: 'AppStoreBase.backgroundColor', context: context);

  @override
  Color? get backgroundColor {
    _$backgroundColorAtom.reportRead();
    return super.backgroundColor;
  }

  @override
  set backgroundColor(Color? value) {
    _$backgroundColorAtom.reportWrite(value, super.backgroundColor, () {
      super.backgroundColor = value;
    });
  }

  late final _$appBarColorAtom =
      Atom(name: 'AppStoreBase.appBarColor', context: context);

  @override
  Color? get appBarColor {
    _$appBarColorAtom.reportRead();
    return super.appBarColor;
  }

  @override
  set appBarColor(Color? value) {
    _$appBarColorAtom.reportWrite(value, super.appBarColor, () {
      super.appBarColor = value;
    });
  }

  late final _$scaffoldBackgroundAtom =
      Atom(name: 'AppStoreBase.scaffoldBackground', context: context);

  @override
  Color? get scaffoldBackground {
    _$scaffoldBackgroundAtom.reportRead();
    return super.scaffoldBackground;
  }

  @override
  set scaffoldBackground(Color? value) {
    _$scaffoldBackgroundAtom.reportWrite(value, super.scaffoldBackground, () {
      super.scaffoldBackground = value;
    });
  }

  late final _$backgroundSecondaryColorAtom =
      Atom(name: 'AppStoreBase.backgroundSecondaryColor', context: context);

  @override
  Color? get backgroundSecondaryColor {
    _$backgroundSecondaryColorAtom.reportRead();
    return super.backgroundSecondaryColor;
  }

  @override
  set backgroundSecondaryColor(Color? value) {
    _$backgroundSecondaryColorAtom
        .reportWrite(value, super.backgroundSecondaryColor, () {
      super.backgroundSecondaryColor = value;
    });
  }

  late final _$appColorPrimaryLightColorAtom =
      Atom(name: 'AppStoreBase.appColorPrimaryLightColor', context: context);

  @override
  Color? get appColorPrimaryLightColor {
    _$appColorPrimaryLightColorAtom.reportRead();
    return super.appColorPrimaryLightColor;
  }

  @override
  set appColorPrimaryLightColor(Color? value) {
    _$appColorPrimaryLightColorAtom
        .reportWrite(value, super.appColorPrimaryLightColor, () {
      super.appColorPrimaryLightColor = value;
    });
  }

  late final _$iconSecondaryColorAtom =
      Atom(name: 'AppStoreBase.iconSecondaryColor', context: context);

  @override
  Color? get iconSecondaryColor {
    _$iconSecondaryColorAtom.reportRead();
    return super.iconSecondaryColor;
  }

  @override
  set iconSecondaryColor(Color? value) {
    _$iconSecondaryColorAtom.reportWrite(value, super.iconSecondaryColor, () {
      super.iconSecondaryColor = value;
    });
  }

  late final _$textPrimaryColorAtom =
      Atom(name: 'AppStoreBase.textPrimaryColor', context: context);

  @override
  Color? get textPrimaryColor {
    _$textPrimaryColorAtom.reportRead();
    return super.textPrimaryColor;
  }

  @override
  set textPrimaryColor(Color? value) {
    _$textPrimaryColorAtom.reportWrite(value, super.textPrimaryColor, () {
      super.textPrimaryColor = value;
    });
  }

  late final _$textSecondaryColorAtom =
      Atom(name: 'AppStoreBase.textSecondaryColor', context: context);

  @override
  Color? get textSecondaryColor {
    _$textSecondaryColorAtom.reportRead();
    return super.textSecondaryColor;
  }

  @override
  set textSecondaryColor(Color? value) {
    _$textSecondaryColorAtom.reportWrite(value, super.textSecondaryColor, () {
      super.textSecondaryColor = value;
    });
  }

  late final _$selectedLanguageCodeAtom =
      Atom(name: 'AppStoreBase.selectedLanguageCode', context: context);

  @override
  String get selectedLanguageCode {
    _$selectedLanguageCodeAtom.reportRead();
    return super.selectedLanguageCode;
  }

  @override
  set selectedLanguageCode(String value) {
    _$selectedLanguageCodeAtom.reportWrite(value, super.selectedLanguageCode,
        () {
      super.selectedLanguageCode = value;
    });
  }

  late final _$toggleDarkModeAsyncAction =
      AsyncAction('AppStoreBase.toggleDarkMode', context: context);

  @override
  Future<void> toggleDarkMode({bool? value}) {
    return _$toggleDarkModeAsyncAction
        .run(() => super.toggleDarkMode(value: value));
  }

  late final _$setLanguageAsyncAction =
      AsyncAction('AppStoreBase.setLanguage', context: context);

  @override
  Future<void> setLanguage(String val, {BuildContext? context}) {
    return _$setLanguageAsyncAction
        .run(() => super.setLanguage(val, context: context));
  }

  late final _$AppStoreBaseActionController =
      ActionController(name: 'AppStoreBase', context: context);

  @override
  void toggleHover({bool value = false}) {
    final _$actionInfo = _$AppStoreBaseActionController.startAction(
        name: 'AppStoreBase.toggleHover');
    try {
      return super.toggleHover(value: value);
    } finally {
      _$AppStoreBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  void setCurrentStatus(StatusResponse status) {
    final _$actionInfo = _$AppStoreBaseActionController.startAction(
        name: 'AppStoreBase.setCurrentStatus');
    try {
      return super.setCurrentStatus(status);
    } finally {
      _$AppStoreBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
isDarkModeOn: ${isDarkModeOn},
isHover: ${isHover},
currentStatus: ${currentStatus},
iconColor: ${iconColor},
backgroundColor: ${backgroundColor},
appBarColor: ${appBarColor},
scaffoldBackground: ${scaffoldBackground},
backgroundSecondaryColor: ${backgroundSecondaryColor},
appColorPrimaryLightColor: ${appColorPrimaryLightColor},
iconSecondaryColor: ${iconSecondaryColor},
textPrimaryColor: ${textPrimaryColor},
textSecondaryColor: ${textSecondaryColor},
selectedLanguageCode: ${selectedLanguageCode},
getCurrentStatus: ${getCurrentStatus}
    ''';
  }
}
