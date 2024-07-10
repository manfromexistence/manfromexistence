import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobx/mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../models/Expense/expense_request_model.dart';
import '../../models/Expense/expense_type_model.dart';
import '../../utils/app_widgets.dart';

part 'ExpenseStore.g.dart';

class ExpenseStore = ExpenseStoreBase with _$ExpenseStore;

abstract class ExpenseStoreBase with Store {
  @observable
  bool isLoading = false;

  int id = 0;

  @observable
  ObservableList<ExpenseRequestModel> expenseRequests =
      ObservableList<ExpenseRequestModel>();

  File? file;
  @observable
  String fileName = '';

  @observable
  String filePath = '';

  @observable
  bool isImgRequired = false;

  final today = DateTime.now();

  @observable
  DateTime selectedDate = DateTime.now();

  @observable
  ObservableList<ExpenseTypeModel> expenseTypes =
      ObservableList<ExpenseTypeModel>();

  @observable
  ExpenseTypeModel? selectedExpenseType;

  final DateFormat formatter = DateFormat('dd/MM/yyyy');

  Future init() async {
    isLoading = true;

    var result = await apiRepo.getExpenseRequests();

    if (result.isNotEmpty) {
      expenseRequests = ObservableList<ExpenseRequestModel>();
      expenseRequests.addAll(result);
    } else {
      expenseRequests = ObservableList<ExpenseRequestModel>();
    }

    isLoading = false;
  }

  Future loadExpenseTypes() async {
    isLoading = true;
    var result = await apiRepo.getExpenseTypes();

    if (result.isNotEmpty) {
      selectedExpenseType = result.first;
      if (result.first.isImgRequired!) {
        isImgRequired = true;
      }
      expenseTypes = ObservableList<ExpenseTypeModel>();
      expenseTypes.addAll(result);
    } else {
      expenseTypes = ObservableList<ExpenseTypeModel>();
    }
    isLoading = false;
  }

  Future<String?> getFile() async {
    FilePickerResult? result =
        await FilePicker.platform.pickFiles(type: FileType.image);

    if (result != null) {
      file = File(result.files.single.path!);
      fileName = file!.path.split('/').last;
      filePath = file!.path;

      return fileName;
    }

    return null;
  }

  Future<void> selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        helpText: 'Date',
        cancelText: 'Cancel',
        confirmText: "Choose",
        fieldLabelText: 'From Date',
        fieldHintText: 'Month/Date/Year',
        errorFormatText: 'Enter valid date',
        errorInvalidText: 'Enter date in valid range',
        context: context,
        builder: (BuildContext context, Widget? child) {
          return CustomTheme(
            child: child,
          );
        },
        initialDate: today.add(const Duration(days: 1)),
        firstDate: DateTime(2000),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedDate) {
      selectedDate = picked;
    }
  }

  Future<bool> sendExpenseRequest(String amount, String remarks) async {
    isLoading = true;

    Map req = {
      "date": formatter.format(selectedDate),
      "amount": amount,
      "typeId": selectedExpenseType!.id.toString(),
      "comments": remarks
    };
    var result = await apiRepo.sendExpenseRequest(req);

    if (result && !filePath.isEmptyOrNull) {
      var uploadResult = await apiRepo.uploadExpenseDocument(filePath);
      if (!uploadResult) {
        toast('Unable to upload the file');
      }
    }

    isLoading = false;

    return result;
  }

  void deleteExpense(int id) async {
    isLoading = true;

    var result = await apiRepo.deleteExpenseRequest(id);

    if (result) {
      toast('Successfully deleted');
    }

    isLoading = true;
    init();
  }
}
