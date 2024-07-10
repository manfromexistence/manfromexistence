import 'package:fieldmanager_hrms_flutter/screens/Leave/LeaveRequestScreen.dart';
import 'package:fieldmanager_hrms_flutter/screens/Leave/LeaveStore.dart';
import 'package:fieldmanager_hrms_flutter/screens/Leave/widget/leave_item_widget.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_colors.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:lottie/lottie.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../models/leave_request_model.dart';

class LeaveScreen extends StatefulWidget {
  static String tag = '/LeaveScreen';
  const LeaveScreen({Key? key}) : super(key: key);

  @override
  State<LeaveScreen> createState() => _LeaveScreenState();
}

class _LeaveScreenState extends State<LeaveScreen> {
  final LeaveStore _store = LeaveStore();

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
            ? _store.leaveRequests.isNotEmpty
                ? ListView.builder(
                    itemCount: _store.leaveRequests.length,
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.only(left: 8, right: 8),
                    scrollDirection: Axis.vertical,
                    shrinkWrap: true,
                    itemBuilder: (BuildContext context, int index) {
                      var item = _store.leaveRequests[index];
                      return LeaveItemWidget(
                        index: index,
                        model: item,
                        deleteAction: (BuildContext context) {
                          _store.id = _store.leaveRequests[index].id;
                          showConfirmDialogCustom(
                            context,
                            title: language!.lblAreYouSureYouWantToDelete,
                            dialogType: DialogType.DELETE,
                            positiveText: language!.lblYes,
                            negativeText: language!.lblNo,
                            onAccept: (c) async {
                              await _store.deleteLeave();
                            },
                          );
                        },
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
          await const LeaveRequestScreen().launch(context);
          await _store.init();
        },
      ),
    );
  }
}

class DetailsDialog extends StatelessWidget {
  final LeaveRequestModel leaveRequestModel;
  const DetailsDialog(this.leaveRequestModel, {super.key});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      elevation: 0.0,
      backgroundColor: Colors.transparent,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: context.cardColor,
          shape: BoxShape.rectangle,
          borderRadius: BorderRadius.circular(16),
          boxShadow: const [
            BoxShadow(
              color: Colors.black26,
              blurRadius: 10.0,
              offset: Offset(0.0, 10.0),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min, // To make the card compact
          children: <Widget>[
            GestureDetector(
              onTap: () {
                finish(context);
              },
              child: Container(
                  padding: const EdgeInsets.all(4),
                  alignment: Alignment.centerRight,
                  child: Icon(Icons.close, color: appStore.textPrimaryColor)),
            ),
            Text('Details',
                style:
                    boldTextStyle(color: appStore.textPrimaryColor, size: 20)),
            16.height,
            itemRowWidget('Type', leaveRequestModel.leaveType),
            10.height,
            itemRowWidget('From', leaveRequestModel.fromDate),
            10.height,
            itemRowWidget('To', leaveRequestModel.toDate),
            10.height,
            itemRowWidget('Status', leaveRequestModel.status),
            10.height,
            itemRowWidget('Applied On', leaveRequestModel.createdOn),
            10.height,
            itemRowWidget(
                'Approved By',
                leaveRequestModel.approvedBy.isEmptyOrNull
                    ? '-'
                    : leaveRequestModel.approvedBy),
            10.height,
            itemRowWidget(
                'Approved On',
                leaveRequestModel.approvedOn.isEmptyOrNull
                    ? '-'
                    : leaveRequestModel.approvedOn),
            30.height,
          ],
        ),
      ),
    );
  }

  Widget itemRowWidget(String title, value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: boldTextStyle(color: appStore.textPrimaryColor),
        ),
        10.width,
        Text(
          value,
          style: primaryTextStyle(color: appStore.textPrimaryColor),
        ),
      ],
    );
  }
}
