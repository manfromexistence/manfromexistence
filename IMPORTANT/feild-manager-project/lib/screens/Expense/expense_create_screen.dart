import 'package:fieldmanager_hrms_flutter/main.dart';
import 'package:fieldmanager_hrms_flutter/models/Expense/expense_type_model.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../utils/app_widgets.dart';
import 'ExpenseStore.dart';

class ExpenseCreateScreen extends StatefulWidget {
  static String tag = '/ExpenseCreateScreen';
  const ExpenseCreateScreen({Key? key}) : super(key: key);

  @override
  State<ExpenseCreateScreen> createState() => _ExpenseCreateScreenState();
}

class _ExpenseCreateScreenState extends State<ExpenseCreateScreen> {
  final ExpenseStore _store = ExpenseStore();

  final _formKey = GlobalKey<FormState>();

  final _dateCont = TextEditingController();
  final _remarksCont = TextEditingController();
  final _fileUploadCont = TextEditingController();
  final _amountCont = TextEditingController();

  final _remarksFocus = FocusNode();
  final _fileUploadNode = FocusNode();
  final _dateFocus = FocusNode();
  final _amountFocus = FocusNode();

  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    await _store.loadExpenseTypes();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblCreateExpense),
      body: Observer(
        builder: (_) => !_store.isLoading
            ? _store.expenseTypes.isEmpty
                ? const Center(child: Text('No expense types are configured'))
                : Container(
                    padding: const EdgeInsets.all(16),
                    child: SingleChildScrollView(
                      child: Form(
                        key: _formKey,
                        child: Column(
                          children: [
                            TextFormField(
                              onTap: () async {
                                hideKeyboard(context);
                                await _store.selectDate(context);
                                _dateCont.text = _store.formatter
                                    .format(_store.selectedDate);
                              },
                              controller: _dateCont,
                              focusNode: _dateFocus,
                              style: primaryTextStyle(),
                              decoration: editTextDecoration(
                                  Icons.calendar_month, language!.lblDate),
                              cursorColor:
                                  appStore.isDarkModeOn ? white : blackColor,
                            ),
                            10.height,
                            FormField<String>(
                              builder: (FormFieldState<String> state) {
                                return DropdownButtonFormField(
                                  items: _store.expenseTypes.map((item) {
                                    return DropdownMenuItem(
                                        value: item,
                                        child: Row(
                                          children: <Widget>[
                                            Text(item.name!),
                                          ],
                                        ));
                                  }).toList(),
                                  onChanged: (newValue) {
                                    newValue as ExpenseTypeModel;
                                    // do other stuff with _category
                                    _store.selectedExpenseType = newValue;
                                    _store.isImgRequired =
                                        newValue.isImgRequired!;
                                  },
                                  borderRadius: BorderRadius.circular(20.0),
                                  value: _store.expenseTypes.first,
                                  decoration: editTextDecoration(
                                      Icons.table_chart,
                                      language!.lblExpenseType),
                                );
                              },
                            ),
                            10.height,
                            TextFormField(
                              controller: _amountCont,
                              focusNode: _amountFocus,
                              style: primaryTextStyle(),
                              decoration: editTextDecoration(
                                  Icons.monetization_on_sharp,
                                  language!.lblAmount),
                              cursorColor:
                                  appStore.isDarkModeOn ? white : blackColor,
                              keyboardType: TextInputType.number,
                              validator: (s) {
                                if (s!.trim().isEmpty) {
                                  return language!.lblAmountIsRequired;
                                }
                                return null;
                              },
                            ),
                            10.height,
                            TextFormField(
                              controller: _remarksCont,
                              focusNode: _remarksFocus,
                              style: primaryTextStyle(),
                              decoration: editTextDecoration(
                                  Icons.receipt, language!.lblRemarks),
                              cursorColor:
                                  appStore.isDarkModeOn ? white : blackColor,
                              keyboardType: TextInputType.name,
                              validator: (s) {
                                if (s!.trim().isEmpty) {
                                  return language!.lblRemarksIsRequired;
                                }
                                return null;
                              },
                            ),
                            10.height,
                            Observer(
                              builder: (_) => _store.isImgRequired
                                  ? TextFormField(
                                      onTap: () async {
                                        hideKeyboard(context);
                                        await _store.getFile();
                                        _fileUploadCont.text = _store.fileName;
                                      },
                                      controller: _fileUploadCont,
                                      focusNode: _fileUploadNode,
                                      style: primaryTextStyle(),
                                      decoration: editTextDecoration(
                                          Icons.upload_file,
                                          language!.lblChooseImage),
                                      validator: (s) {
                                        if (_store.isImgRequired &&
                                            s!.trim().isEmpty) {
                                          return language!.lblImageIsRequired;
                                        }
                                        return null;
                                      },
                                    )
                                  : Container(),
                            ),
                            10.height,
                            AppButton(
                                text: language!.lblSubmit,
                                color: opPrimaryColor,
                                textColor: Colors.white,
                                shapeBorder: buildButtonCorner(),
                                width: 120,
                                onTap: () async {
                                  hideKeyboard(context);
                                  if (_formKey.currentState!.validate()) {
                                    var result =
                                        await _store.sendExpenseRequest(
                                            _amountCont.text.trim(),
                                            _remarksCont.text.trim());
                                    if (result) {
                                      toast(language!.lblSubmittedSuccessfully);
                                      if (!mounted) return;
                                      finish(context);
                                    }
                                  }
                                }),
                          ],
                        ),
                      ),
                    ),
                  )
            : loadingWidgetMaker(),
      ),
    );
  }
}
