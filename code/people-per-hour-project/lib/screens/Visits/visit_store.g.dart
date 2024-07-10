// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'visit_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$VisitStore on VisitStoreBase, Store {
  late final _$isLoadingAtom =
      Atom(name: 'VisitStoreBase.isLoading', context: context);

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

  late final _$clientLabelAtom =
      Atom(name: 'VisitStoreBase.clientLabel', context: context);

  @override
  String get clientLabel {
    _$clientLabelAtom.reportRead();
    return super.clientLabel;
  }

  @override
  set clientLabel(String value) {
    _$clientLabelAtom.reportWrite(value, super.clientLabel, () {
      super.clientLabel = value;
    });
  }

  late final _$isClientsExistsAtom =
      Atom(name: 'VisitStoreBase.isClientsExists', context: context);

  @override
  bool get isClientsExists {
    _$isClientsExistsAtom.reportRead();
    return super.isClientsExists;
  }

  @override
  set isClientsExists(bool value) {
    _$isClientsExistsAtom.reportWrite(value, super.isClientsExists, () {
      super.isClientsExists = value;
    });
  }

  late final _$selectedClientAtom =
      Atom(name: 'VisitStoreBase.selectedClient', context: context);

  @override
  ClientModel? get selectedClient {
    _$selectedClientAtom.reportRead();
    return super.selectedClient;
  }

  @override
  set selectedClient(ClientModel? value) {
    _$selectedClientAtom.reportWrite(value, super.selectedClient, () {
      super.selectedClient = value;
    });
  }

  late final _$submitAsyncAction =
      AsyncAction('VisitStoreBase.submit', context: context);

  @override
  Future<bool> submit(String filePath, String comments, String clientId) {
    return _$submitAsyncAction
        .run(() => super.submit(filePath, comments, clientId));
  }

  @override
  String toString() {
    return '''
isLoading: ${isLoading},
clientLabel: ${clientLabel},
isClientsExists: ${isClientsExists},
selectedClient: ${selectedClient}
    ''';
  }
}
