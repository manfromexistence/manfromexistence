// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'DeviceStore.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$DeviceStore on DeviceStoreBase, Store {
  late final _$isLoadingAtom =
      Atom(name: 'DeviceStoreBase.isLoading', context: context);

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

  late final _$deviceVerificationStatusAtom =
      Atom(name: 'DeviceStoreBase.deviceVerificationStatus', context: context);

  @override
  DeviceVerificationStatus get deviceVerificationStatus {
    _$deviceVerificationStatusAtom.reportRead();
    return super.deviceVerificationStatus;
  }

  @override
  set deviceVerificationStatus(DeviceVerificationStatus value) {
    _$deviceVerificationStatusAtom
        .reportWrite(value, super.deviceVerificationStatus, () {
      super.deviceVerificationStatus = value;
    });
  }

  late final _$initAsyncAction =
      AsyncAction('DeviceStoreBase.init', context: context);

  @override
  Future<dynamic> init() {
    return _$initAsyncAction.run(() => super.init());
  }

  @override
  String toString() {
    return '''
isLoading: ${isLoading},
deviceVerificationStatus: ${deviceVerificationStatus}
    ''';
  }
}
