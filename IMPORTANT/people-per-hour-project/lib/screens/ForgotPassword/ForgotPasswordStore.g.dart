// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ForgotPasswordStore.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$ForgotPasswordStore on ForgotPasswordStoreBase, Store {
  late final _$statusAtom =
      Atom(name: 'ForgotPasswordStoreBase.status', context: context);

  @override
  Status get status {
    _$statusAtom.reportRead();
    return super.status;
  }

  @override
  set status(Status value) {
    _$statusAtom.reportWrite(value, super.status, () {
      super.status = value;
    });
  }

  late final _$isLoadingAtom =
      Atom(name: 'ForgotPasswordStoreBase.isLoading', context: context);

  @override
  bool get isLoading {
    _$isLoadingAtom.reportRead();
    return super.isLoading;
  }

  @override
  set isLoading(bool value) {
    _$isLoadingAtom.reportWrite(value, super.isLoading, () {
      super.isLoading = value;
    });
  }

  late final _$errorMsgAtom =
      Atom(name: 'ForgotPasswordStoreBase.errorMsg', context: context);

  @override
  String? get errorMsg {
    _$errorMsgAtom.reportRead();
    return super.errorMsg;
  }

  @override
  set errorMsg(String? value) {
    _$errorMsgAtom.reportWrite(value, super.errorMsg, () {
      super.errorMsg = value;
    });
  }

  late final _$phoneNumberAtom =
      Atom(name: 'ForgotPasswordStoreBase.phoneNumber', context: context);

  @override
  String? get phoneNumber {
    _$phoneNumberAtom.reportRead();
    return super.phoneNumber;
  }

  @override
  set phoneNumber(String? value) {
    _$phoneNumberAtom.reportWrite(value, super.phoneNumber, () {
      super.phoneNumber = value;
    });
  }

  late final _$otpAtom =
      Atom(name: 'ForgotPasswordStoreBase.otp', context: context);

  @override
  String? get otp {
    _$otpAtom.reportRead();
    return super.otp;
  }

  @override
  set otp(String? value) {
    _$otpAtom.reportWrite(value, super.otp, () {
      super.otp = value;
    });
  }

  late final _$sendOTPToPhoneAsyncAction =
      AsyncAction('ForgotPasswordStoreBase.sendOTPToPhone', context: context);

  @override
  Future<dynamic> sendOTPToPhone() {
    return _$sendOTPToPhoneAsyncAction.run(() => super.sendOTPToPhone());
  }

  late final _$verifyOTPAsyncAction =
      AsyncAction('ForgotPasswordStoreBase.verifyOTP', context: context);

  @override
  Future<dynamic> verifyOTP() {
    return _$verifyOTPAsyncAction.run(() => super.verifyOTP());
  }

  late final _$resetPasswordAsyncAction =
      AsyncAction('ForgotPasswordStoreBase.resetPassword', context: context);

  @override
  Future<bool> resetPassword(String password) {
    return _$resetPasswordAsyncAction.run(() => super.resetPassword(password));
  }

  @override
  String toString() {
    return '''
status: ${status},
isLoading: ${isLoading},
errorMsg: ${errorMsg},
phoneNumber: ${phoneNumber},
otp: ${otp}
    ''';
  }
}
