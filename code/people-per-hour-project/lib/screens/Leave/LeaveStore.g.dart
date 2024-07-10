// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'LeaveStore.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$LeaveStore on LeaveStoreBase, Store {
  late final _$isLoadingAtom =
      Atom(name: 'LeaveStoreBase.isLoading', context: context);

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

  late final _$leaveRequestsAtom =
      Atom(name: 'LeaveStoreBase.leaveRequests', context: context);

  @override
  ObservableList<LeaveRequestModel> get leaveRequests {
    _$leaveRequestsAtom.reportRead();
    return super.leaveRequests;
  }

  @override
  set leaveRequests(ObservableList<LeaveRequestModel> value) {
    _$leaveRequestsAtom.reportWrite(value, super.leaveRequests, () {
      super.leaveRequests = value;
    });
  }

  @override
  String toString() {
    return '''
isLoading: ${isLoading},
leaveRequests: ${leaveRequests}
    ''';
  }
}
