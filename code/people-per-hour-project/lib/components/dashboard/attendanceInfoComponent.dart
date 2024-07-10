import 'package:dotted_line/dotted_line.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Utils/app_widgets.dart';
import '../../main.dart';

class AttendanceInfoComponent extends StatelessWidget {
  final int presentDays,
      halfDays,
      absentDays,
      weekOffDays,
      onLeaveDays,
      availableLeaveCount;

  const AttendanceInfoComponent(
      {super.key,
      required this.presentDays,
      required this.halfDays,
      required this.absentDays,
      required this.weekOffDays,
      required this.onLeaveDays,
      required this.availableLeaveCount});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: boxDecorationRoundedWithShadow(10,
          backgroundColor: Colors.teal.withOpacity(0.8),
          shadowColor: Colors.black.withOpacity(0.7),
          blurRadius: 7),
      child: Padding(
        padding: const EdgeInsets.only(left: 12, right: 12, bottom: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(language!.lblAttendanceInformation,
                    style: boldTextStyle(color: white, size: 20)),
                IconButton(
                    onPressed: () => {},
                    icon: const Icon(
                      Icons.more_vert_sharp,
                      color: white,
                    ))
              ],
            ),
            5.height,
            itemRowWidget(
                language!.lblPresent, '$presentDays ${language!.lblDays}'),
            DottedLine(
              dashColor: appStore.scaffoldBackground!,
            ).paddingOnly(top: 5, bottom: 5),
            itemRowWidget(
                language!.lblHalfDay, '$halfDays  ${language!.lblDays}'),
            DottedLine(
              dashColor: appStore.scaffoldBackground!,
            ).paddingOnly(top: 5, bottom: 5),
            itemRowWidget(
                language!.lblAbsent, '$absentDays ${language!.lblDays}'),
            DottedLine(
              dashColor: appStore.scaffoldBackground!,
            ).paddingOnly(top: 5, bottom: 5),
            itemRowWidget(
                language!.lblWeeklyOff, '$weekOffDays  ${language!.lblDays}'),
            DottedLine(
              dashColor: appStore.scaffoldBackground!,
            ).paddingOnly(top: 5, bottom: 5),
            itemRowWidget(
                language!.lblOnLeave, '$onLeaveDays ${language!.lblDays}'),
            DottedLine(
              dashColor: appStore.scaffoldBackground!,
            ).paddingOnly(top: 5, bottom: 5),
            itemRowWidget(language!.lblAvailableLeave,
                '$availableLeaveCount  ${language!.lblDays}'),
            DottedLine(
              dashColor: appStore.scaffoldBackground!,
            ).paddingOnly(top: 5, bottom: 5),
          ],
        ),
      ),
    );
  }
}
