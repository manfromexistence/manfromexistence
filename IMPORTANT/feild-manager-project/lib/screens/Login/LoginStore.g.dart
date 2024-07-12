// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'LoginStore.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$LoginStore on LoginStoreBase, Store {
  Computed<bool>? _$isPhoneNumberCheckPendingComputed;

  @override
  bool get isPhoneNumberCheckPending => (_$isPhoneNumberCheckPendingComputed ??=
          Computed<bool>(() => super.isPhoneNumberCheckPending,
              name: 'LoginStoreBase.isPhoneNumberCheckPending'))
      .value;
  Computed<bool>? _$canLoginComputed;

  @override
  bool get canLogin => (_$canLoginComputed ??=
          Computed<bool>(() => super.canLogin, name: 'LoginStoreBase.canLogin'))
      .value;

  late final _$isValidDeviceAtom =
      Atom(name: 'LoginStoreBase.isValidDevice', context: context);

  @override
  bool get isValidDevice {
    _$isValidDeviceAtom.reportRead();
    return super.isValidDevice;
  }

  @override
  set isValidDevice(bool value) {
    _$isValidDeviceAtom.reportWrite(value, super.isValidDevice, () {
      super.isValidDevice = value;
    });
  }

  late final _$isLoadingAtom =
      Atom(name: 'LoginStoreBase.isLoading', context: context);

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

  late final _$employeeIdAtom =
      Atom(name: 'LoginStoreBase.employeeId', context: context);

  @override
  String? get employeeId {
    _$employeeIdAtom.reportRead();
    return super.employeeId;
  }

  @override
  set employeeId(String? value) {
    _$employeeIdAtom.reportWrite(value, super.employeeId, () {
      super.employeeId = value;
    });
  }

  late final _$employeeIdCheckAtom =
      Atom(name: 'LoginStoreBase.employeeIdCheck', context: context);

  @override
  ObservableFuture<bool> get employeeIdCheck {
    _$employeeIdCheckAtom.reportRead();
    return super.employeeIdCheck;
  }

  @override
  set employeeIdCheck(ObservableFuture<bool> value) {
    _$employeeIdCheckAtom.reportWrite(value, super.employeeIdCheck, () {
      super.employeeIdCheck = value;
    });
  }

  late final _$passwordErrorAtom =
      Atom(name: 'LoginStoreBase.passwordError', context: context);

  @override
  String? get passwordError {
    _$passwordErrorAtom.reportRead();
    return super.passwordError;
  }

  @override
  set passwordError(String? value) {
    _$passwordErrorAtom.reportWrite(value, super.passwordError, () {
      super.passwordError = value;
    });
  }

  late final _$passwordAtom =
      Atom(name: 'LoginStoreBase.password', context: context);

  @override
  String? get password {
    _$passwordAtom.reportRead();
    return super.password;
  }

  @override
  set password(String? value) {
    _$passwordAtom.reportWrite(value, super.password, () {
      super.password = value;
    });
  }

  @override
  String toString() {
    return '''
isValidDevice: ${isValidDevice},
isLoading: ${isLoading},
employeeId: ${employeeId},
employeeIdCheck: ${employeeIdCheck},
passwordError: ${passwordError},
password: ${password},
isPhoneNumberCheckPending: ${isPhoneNumberCheckPending},
canLogin: ${canLogin}
    ''';
  }
}

mixin _$LoginFormError on LoginFormErrorState, Store {
  Computed<bool>? _$hasErrorsComputed;

  @override
  bool get hasErrors =>
      (_$hasErrorsComputed ??= Computed<bool>(() => super.hasErrors,
              name: 'LoginFormErrorState.hasErrors'))
          .value;

  late final _$employeeIdAtom =
      Atom(name: 'LoginFormErrorState.employeeId', context: context);

  @override
  String? get employeeId {
    _$employeeIdAtom.reportRead();
    return super.employeeId;
  }

  @override
  set employeeId(String? value) {
    _$employeeIdAtom.reportWrite(value, super.employeeId, () {
      super.employeeId = value;
    });
  }

  late final _$passwordAtom =
      Atom(name: 'LoginFormErrorState.password', context: context);

  @override
  String? get password {
    _$passwordAtom.reportRead();
    return super.password;
  }

  @override
  set password(String? value) {
    _$passwordAtom.reportWrite(value, super.password, () {
      super.password = value;
    });
  }

  @override
  String toString() {
    return '''
employeeId: ${employeeId},
password: ${password},
hasErrors: ${hasErrors}
    ''';
  }
}
