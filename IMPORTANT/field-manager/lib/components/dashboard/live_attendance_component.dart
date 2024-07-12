import 'package:dotted_line/dotted_line.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Utils/app_widgets.dart';
import '../../main.dart';

class LiveAttendanceComponent extends StatelessWidget {
  const LiveAttendanceComponent({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 3,
      color: Colors.teal,
      shape: buildRoundedCorner(),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              language!.lblTodayAttendance,
              style: boldTextStyle(color: white, size: 20),
            ),
            10.height,
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                itemRowWidget(language!.lblAttendanceInAt,
                    appStore.getCurrentStatus!.checkInAt),
                DottedLine(
                  dashColor: appStore.scaffoldBackground!,
                ).paddingOnly(top: 5, bottom: 5),
                appStore.getCurrentStatus!.checkOutAt != null
                    ? itemRowWidget(language!.lblAttendanceOutAt,
                        appStore.getCurrentStatus!.checkOutAt)
                    : Container()
              ],
            )
          ],
        ),
      ),
    );
  }
}
