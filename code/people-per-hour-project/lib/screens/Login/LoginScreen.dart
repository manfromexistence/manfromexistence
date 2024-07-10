import 'package:fieldmanager_hrms_flutter/screens/Device/device_verification_screen.dart';
import 'package:fieldmanager_hrms_flutter/screens/privacy_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../utils/app_colors.dart';
import '../../utils/app_constants.dart';
import '../../utils/app_images.dart';
import '../../utils/app_widgets.dart';
import 'LoginStore.dart';

class LoginScreen extends StatefulWidget {
  static String tag = '/LoginScreen';
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final LoginStore _loginStore = LoginStore();
  bool? rememberMe = false;

  @override
  void initState() {
    _loginStore.setupValidations();
    init();
    trackingService.stopTrackingService();
    super.initState();
  }

  init() async {
    if (isIOS) {
      setDarkStatusBar();
      //setStatusBarColor(Colors.black,statusBarBrightness: Brightness.dark);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Observer(
      builder: (_) => Scaffold(
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              200.height,
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Image.asset(appLogoImg, height: 50, width: 50),
                      5.width,
                      Text(
                        mainAppName,
                        style: boldTextStyle(size: 25, weight: FontWeight.w500),
                      ),
                    ],
                  ),
                  20.height,
                  SizedBox(
                    width: 300,
                    child: Container(
                      decoration: boxDecorationRoundedWithShadow(10,
                          backgroundColor: appStore.scaffoldBackground!),
                      child: Padding(
                        padding: const EdgeInsets.all(14.0),
                        child: Column(
                          children: [
                            Text(
                              'Login to continue',
                              style: primaryTextStyle(),
                            ),
                            10.height,
                            /* DropdownButtonFormField<String>(
                              hint: const Text(
                                'Select a product type',
                                overflow: TextOverflow.ellipsis,
                              ),
                              items: <String>[
                                'Field Manager',
                                'Field Manager SaaS'
                              ].map((String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(value),
                                );
                              }).toList(),
                              onChanged: (_) {},
                              borderRadius: BorderRadius.circular(20.0),
                              decoration: editTextDecoration(
                                  Icons.table_chart, 'Product Type'),
                            ),
                            10.height,*/
                            Observer(
                              builder: (_) => TextFormField(
                                style: TextStyle(
                                    fontSize: fontSizeLargeMedium,
                                    fontFamily: fontRegular,
                                    color: appStore.textPrimaryColor),
                                onChanged: (value) =>
                                    _loginStore.employeeId = value,
                                decoration: editTextDecoration(
                                    Icons.person_outline, language!.lblUserName,
                                    errorText: _loginStore.error.employeeId),
                              ),
                            ),
                            10.height,
                            Observer(
                              builder: (_) => AppTextField(
                                textFieldType: TextFieldType.PASSWORD,
                                onChanged: (value) =>
                                    {_loginStore.password = value},
                                decoration: editTextDecoration(
                                    Icons.lock, language!.lblPassword,
                                    errorText: _loginStore.error.password),
                              ),
                            ),
                            const SizedBox(height: 24),
                            !_loginStore.isLoading
                                ? AppButton(
                                    text: language!.lblLogin,
                                    color: opPrimaryColor,
                                    elevation: 10,
                                    textColor: Colors.white,
                                    shapeBorder: buildButtonCorner(),
                                    width: 150,
                                    onTap: () async {
                                      hideKeyboard(context);
                                      _loginStore.isLoading = true;
                                      _loginStore.validateAll();
                                      if (_loginStore.canLogin) {
                                        var result = await _loginStore.login();
                                        if (!result.isEmptyOrNull) {
                                          if (result.toLowerCase() ==
                                              'active') {
                                            if (!mounted) return;
                                            const DeviceVerificationScreen()
                                                .launch(context,
                                                    isNewTask: true);
                                          }
                                        }
                                      }
                                      toast(_loginStore.error.employeeId
                                          .toString());
                                      _loginStore.isLoading = false;
                                    })
                                : loadingWidgetMaker(),
                            const SizedBox(height: 24),
                            /*       GestureDetector(
                              onTap: () {
                                const ForgotPassword().launch(context);
                              },
                              child: text("${language!.lblForgotPassword} ?",
                                  textColor: blueColor, fontFamily: fontMedium),
                            ),*/
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              Column(
                children: [
                  50.height,
                  Text(language!.lblByLoggingInYouAreAgreedToThePrivacyPolicy),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(40, 16, 40, 16),
                    child: GestureDetector(
                      onTap: () {
                        const PrivacyScreen().launch(context);
                      },
                      child: Text(
                        language!.lblClickHereToReadPrivacyPolicy,
                        style: const TextStyle(color: opPrimaryColor),
                      ),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
