import 'package:fieldmanager_hrms_flutter/screens/Login/LoginScreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../utils/app_colors.dart';
import '../../utils/app_constants.dart';
import '../../utils/app_widgets.dart';
import 'ForgotPasswordStore.dart';

class ForgotPassword extends StatefulWidget {
  static String tag = '/ForgotPassword';
  const ForgotPassword({Key? key}) : super(key: key);

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  final ForgotPasswordStore _store = ForgotPasswordStore();

  final _passwordCont = TextEditingController();

  @override
  void initState() {
    super.initState();
    _store.setupValidators();
  }

  @override
  Widget build(BuildContext context) {
    return Observer(
      builder: (_) => Scaffold(
        appBar: appBar(context, language!.lblForgotPassword),
        body: !_store.isLoading
            ? SizedBox(
                height: context.height(),
                width: context.width(),
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      30.height,
                      Padding(
                        padding: const EdgeInsets.only(right: 50),
                        child: Image.asset('images/verification_bg.png'),
                      ),
                      8.height,
                      Text(
                        language!.lblVerification,
                        style: boldTextStyle(
                            size: 20, color: appStore.textPrimaryColor),
                      ),
                      _store.status == Status.start
                          ? Text(
                              language!.lblEnterYourPhoneNumberToSendAnOTP,
                              style: secondaryTextStyle(color: gray),
                              textAlign: TextAlign.center,
                            )
                          : _store.status == Status.otp
                              ? Text(
                                  language!
                                      .lblWeHaveSendA4DigitVerificationCodeToYourPhonePleaseEnterTheCodeBelowTtoVerifyItsYou,
                                  style: secondaryTextStyle(color: gray),
                                  textAlign: TextAlign.center,
                                )
                              : Text(
                                  language!.lblVerified,
                                  style: secondaryTextStyle(color: gray),
                                  textAlign: TextAlign.center,
                                ),
                      30.height,
                      Wrap(
                        children: [
                          SizedBox(
                            height: 70,
                            child: _store.status == Status.start
                                ? TextFormField(
                                    onChanged: (value) =>
                                        _store.phoneNumber = value,
                                    style: const TextStyle(
                                        fontSize: fontSizeLargeMedium,
                                        fontFamily: fontRegular),
                                    decoration: InputDecoration(
                                      errorText: _store.errorMsg,
                                      contentPadding: const EdgeInsets.fromLTRB(
                                          24, 18, 24, 18),
                                      hintText: language!.lblPhoneNumber,
                                      filled: true,
                                      fillColor: appStore.isDarkModeOn
                                          ? cardDarkColor
                                          : white,
                                      enabledBorder: OutlineInputBorder(
                                          borderRadius:
                                              BorderRadius.circular(40),
                                          borderSide: const BorderSide(
                                              color: editTextBackground,
                                              width: 0.0)),
                                      errorBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(40),
                                        borderSide: const BorderSide(
                                            color: Colors.red, width: 0.0),
                                      ),
                                      focusedErrorBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(40),
                                        borderSide: const BorderSide(
                                            color: Colors.red, width: 0.0),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(40),
                                        borderSide: const BorderSide(
                                            color: editTextBackground,
                                            width: 0.0),
                                      ),
                                      prefixIcon: const Icon(Icons.phone,
                                          color: Colors.grey, size: 24),
                                    ),
                                  )
                                : _store.status == Status.otp
                                    ? OTPTextField(
                                        pinLength: 4,
                                        fieldWidth: 60,
                                        onChanged: (value) {
                                          _store.otp = value;
                                        },
                                        onCompleted: (value) {
                                          _store.otp = value;
                                        },
                                      )
                                    : TextFormField(
                                        controller: _passwordCont,
                                        validator: (s) {
                                          if (s.isEmptyOrNull) {
                                            return language!
                                                .lblPasswordIsRequired;
                                          }
                                          if (s!.length < 6) {
                                            return "Minimum length is 6";
                                          }
                                          return null;
                                        },
                                        style: const TextStyle(
                                            fontSize: fontSizeLargeMedium,
                                            fontFamily: fontRegular),
                                        decoration: InputDecoration(
                                          contentPadding:
                                              const EdgeInsets.fromLTRB(
                                                  24, 18, 24, 17),
                                          hintText: language!.lblNewPassword,
                                          filled: true,
                                          fillColor: appStore.isDarkModeOn
                                              ? cardDarkColor
                                              : white,
                                          enabledBorder: OutlineInputBorder(
                                              borderRadius:
                                                  BorderRadius.circular(40),
                                              borderSide: const BorderSide(
                                                  color: editTextBackground,
                                                  width: 0.0)),
                                          focusedBorder: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(40),
                                            borderSide: const BorderSide(
                                                color: editTextBackground,
                                                width: 0.0),
                                          ),
                                          prefixIcon: const Icon(Icons.lock,
                                              color: Colors.grey, size: 24),
                                        ),
                                      ),
                          ),
                        ],
                      ),
                      16.height,
                      _store.status == Status.otp
                          ? const Row(
                              //    mainAxisAlignment: MainAxisAlignment.center,
                              //   crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                /*  Text('I didn\'t get the Code.',
                                    style: secondaryTextStyle(color: gray)),
                                4.width,
                                Text('Resend Code',
                                    style: boldTextStyle(color: opPrimaryColor),
                                    textAlign: TextAlign.center),*/
                              ],
                            )
                          : Container(),
                      16.height,
                      SizedBox(
                        width: context.width(),
                        child: AppButton(
                            text: _store.status == Status.start
                                ? language!.lblSendOTP
                                : _store.status == Status.otp
                                    ? language!.lblVerifyOTP
                                    : language!.lblChange,
                            color: opPrimaryColor,
                            textColor: Colors.white,
                            shapeBorder: buildButtonCorner(),
                            width: context.width(),
                            onTap: () async {
                              hideKeyboard(context);
                              if (_store.status == Status.start) {
                                _store.sendOTPToPhone();
                              } else if (_store.status == Status.otp) {
                                _store.verifyOTP();
                              } else {
                                if (_passwordCont.text.isEmptyOrNull ||
                                    _passwordCont.text.length < 6) {
                                  toast(language!.lblInvalidPassword);
                                } else {
                                  var result = await _store
                                      .resetPassword(_passwordCont.text);
                                  if (result) {
                                    toast(language!
                                        .lblPasswordSuccessfullyChanged);
                                    if (!mounted) return;
                                    const LoginScreen()
                                        .launch(context, isNewTask: true);
                                  }
                                }
                              }
                            }),
                      ),
                    ],
                  ).paddingAll(30),
                ),
              )
            : loadingWidgetMaker(),
      ),
    );
  }
}
