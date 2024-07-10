import 'package:fieldmanager_hrms_flutter/screens/Expense/expense_create_screen.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:lottie/lottie.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../utils/app_colors.dart';
import '../../utils/app_constants.dart';
import 'ExpenseStore.dart';
import 'Widget/expense_item_widget.dart';

class ExpenseScreen extends StatefulWidget {
  static String tag = '/ExpenseScreen';
  const ExpenseScreen({Key? key}) : super(key: key);

  @override
  State<ExpenseScreen> createState() => _ExpenseScreenState();
}

class _ExpenseScreenState extends State<ExpenseScreen> {
  final ExpenseStore _store = ExpenseStore();
  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    await _store.init();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Observer(
        builder: (_) => !_store.isLoading
            ? Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [Expanded(child: newExpenseListWidget(context))],
              )
            : SingleChildScrollView(
                child: Column(
                  children: List.generate(10, (index) {
                    return buildShimmer(90, context.width())
                        .paddingOnly(left: 10, right: 10);
                  }),
                ),
              ),
      ),
      floatingActionButton: FloatingActionButton(
        elevation: 5,
        backgroundColor: opPrimaryColor,
        child: const Icon(
          Icons.add,
          color: white,
        ),
        onPressed: () async {
          await const ExpenseCreateScreen().launch(context);
          _store.init();
        },
      ),
    );
  }

  Widget newExpenseListWidget(BuildContext context) {
    return _store.expenseRequests.isNotEmpty
        ? ListView.builder(
            itemCount: _store.expenseRequests.length,
            padding: const EdgeInsets.only(left: 8, right: 8),
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemBuilder: (BuildContext context, int index) {
              var item = _store.expenseRequests[index];
              return true
                  ? ExpenseItemWidget(
                      index: index,
                      model: item,
                      deleteAction: (BuildContext context) {
                        _store.id = _store.expenseRequests[index].id!;
                        showConfirmDialogCustom(
                          context,
                          title: language!.lblAreYouSureYouWantToDelete,
                          dialogType: DialogType.DELETE,
                          positiveText: language!.lblYes,
                          negativeText: language!.lblNo,
                          onAccept: (c) {
                            _store.deleteExpense(_store.id);
                          },
                        );
                      })
                  : Card(
                      elevation: 3,
                      color:
                          _store.expenseRequests[index].status?.toLowerCase() ==
                                  'approved'
                              ? Colors.green.shade600
                              : _store.expenseRequests[index].status
                                          ?.toLowerCase() ==
                                      'pending'
                                  ? Colors.amber.shade800
                                  : Colors.red.shade600,
                      shape: buildRoundedCorner(radius: 16),
                      child: Padding(
                        padding: const EdgeInsets.all(5.0),
                        child: ListTile(
                            leading: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                    _store.expenseRequests[index].type
                                        .toString(),
                                    style: secondaryTextStyle(color: white)),
                                Text(
                                    '${language!.lblClaimed} : ${getStringAsync(appCurrencySymbolPref)}${_store.expenseRequests[index].actualAmount.toString()} ${language!.lblApproved} : ${getStringAsync(appCurrencySymbolPref)}${_store.expenseRequests[index].approvedAmount == null ? '' : _store.expenseRequests[index].approvedAmount.toString()}',
                                    style: secondaryTextStyle(color: white))
                              ],
                            ),
                            trailing: _store.expenseRequests[index].status
                                        ?.toLowerCase() ==
                                    'pending'
                                ? Column(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text(
                                        _store.expenseRequests[index].status
                                                    ?.toLowerCase() ==
                                                'approved'
                                            ? language!.lblApproved
                                            : _store.expenseRequests[index]
                                                        .status
                                                        ?.toLowerCase() ==
                                                    'rejected'
                                                ? language!.lblRejected
                                                : language!.lblPending,
                                        style: secondaryTextStyle(color: white),
                                      ),
                                      const Icon(
                                        Icons.delete,
                                        color: white,
                                      ).onTap(() {
                                        _store.id =
                                            _store.expenseRequests[index].id!;
                                        showConfirmDialogCustom(
                                          context,
                                          title: language!
                                              .lblAreYouSureYouWantToDelete,
                                          dialogType: DialogType.DELETE,
                                          positiveText: language!.lblYes,
                                          negativeText: language!.lblNo,
                                          onAccept: (c) {
                                            _store.deleteExpense(_store.id);
                                          },
                                        );
                                      })
                                    ],
                                  )
                                : Container(
                                    child: Text(
                                      _store.expenseRequests[index].status
                                                  ?.toLowerCase() ==
                                              'approved'
                                          ? language!.lblApproved
                                          : _store.expenseRequests[index].status
                                                      ?.toLowerCase() ==
                                                  'rejected'
                                              ? language!.lblRejected
                                              : language!.lblPending,
                                      style: secondaryTextStyle(color: white),
                                    ),
                                  )),
                      ),
                    );
            })
        : Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Lottie.asset('assets/animations/no_requests.json'),
                10.height,
                Text(
                  language!.lblNoRequests,
                  style: primaryTextStyle(),
                )
              ],
            ),
          );
  }
}
