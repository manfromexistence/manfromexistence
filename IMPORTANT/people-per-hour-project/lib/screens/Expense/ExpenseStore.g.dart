// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ExpenseStore.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$ExpenseStore on ExpenseStoreBase, Store {
  late final _$isLoadingAtom =
      Atom(name: 'ExpenseStoreBase.isLoading', context: context);

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

  late final _$expenseRequestsAtom =
      Atom(name: 'ExpenseStoreBase.expenseRequests', context: context);

  @override
  ObservableList<ExpenseRequestModel> get expenseRequests {
    _$expenseRequestsAtom.reportRead();
    return super.expenseRequests;
  }

  @override
  set expenseRequests(ObservableList<ExpenseRequestModel> value) {
    _$expenseRequestsAtom.reportWrite(value, super.expenseRequests, () {
      super.expenseRequests = value;
    });
  }

  late final _$fileNameAtom =
      Atom(name: 'ExpenseStoreBase.fileName', context: context);

  @override
  String get fileName {
    _$fileNameAtom.reportRead();
    return super.fileName;
  }

  @override
  set fileName(String value) {
    _$fileNameAtom.reportWrite(value, super.fileName, () {
      super.fileName = value;
    });
  }

  late final _$filePathAtom =
      Atom(name: 'ExpenseStoreBase.filePath', context: context);

  @override
  String get filePath {
    _$filePathAtom.reportRead();
    return super.filePath;
  }

  @override
  set filePath(String value) {
    _$filePathAtom.reportWrite(value, super.filePath, () {
      super.filePath = value;
    });
  }

  late final _$isImgRequiredAtom =
      Atom(name: 'ExpenseStoreBase.isImgRequired', context: context);

  @override
  bool get isImgRequired {
    _$isImgRequiredAtom.reportRead();
    return super.isImgRequired;
  }

  @override
  set isImgRequired(bool value) {
    _$isImgRequiredAtom.reportWrite(value, super.isImgRequired, () {
      super.isImgRequired = value;
    });
  }

  late final _$selectedDateAtom =
      Atom(name: 'ExpenseStoreBase.selectedDate', context: context);

  @override
  DateTime get selectedDate {
    _$selectedDateAtom.reportRead();
    return super.selectedDate;
  }

  @override
  set selectedDate(DateTime value) {
    _$selectedDateAtom.reportWrite(value, super.selectedDate, () {
      super.selectedDate = value;
    });
  }

  late final _$expenseTypesAtom =
      Atom(name: 'ExpenseStoreBase.expenseTypes', context: context);

  @override
  ObservableList<ExpenseTypeModel> get expenseTypes {
    _$expenseTypesAtom.reportRead();
    return super.expenseTypes;
  }

  @override
  set expenseTypes(ObservableList<ExpenseTypeModel> value) {
    _$expenseTypesAtom.reportWrite(value, super.expenseTypes, () {
      super.expenseTypes = value;
    });
  }

  late final _$selectedExpenseTypeAtom =
      Atom(name: 'ExpenseStoreBase.selectedExpenseType', context: context);

  @override
  ExpenseTypeModel? get selectedExpenseType {
    _$selectedExpenseTypeAtom.reportRead();
    return super.selectedExpenseType;
  }

  @override
  set selectedExpenseType(ExpenseTypeModel? value) {
    _$selectedExpenseTypeAtom.reportWrite(value, super.selectedExpenseType, () {
      super.selectedExpenseType = value;
    });
  }

  @override
  String toString() {
    return '''
isLoading: ${isLoading},
expenseRequests: ${expenseRequests},
fileName: ${fileName},
filePath: ${filePath},
isImgRequired: ${isImgRequired},
selectedDate: ${selectedDate},
expenseTypes: ${expenseTypes},
selectedExpenseType: ${selectedExpenseType}
    ''';
  }
}
