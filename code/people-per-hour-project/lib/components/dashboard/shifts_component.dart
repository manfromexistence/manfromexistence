import 'package:fieldmanager_hrms_flutter/Utils/app_colors.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Utils/app_widgets.dart';
import '../../main.dart';

class ShiftsComponent extends StatelessWidget {
  final String scheduleTime;
  final List<bool> scheduleWeeks;
  const ShiftsComponent(
      {super.key, required this.scheduleTime, required this.scheduleWeeks});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: boxDecorationRoundedWithShadow(10,
          backgroundColor: opPrimaryColor.withOpacity(0.8),
          shadowColor: Colors.black.withOpacity(0.7),
          blurRadius: 7),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text(
                  language!.lblShift,
                  style: boldTextStyle(color: white, size: 20),
                ),
                10.width,
                Text(
                  '($scheduleTime)',
                  style: primaryTextStyle(color: white),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                20.height,
                weekWidget(language!.lblSun,
                    scheduleWeeks[0] == true ? Colors.green : Colors.grey),
                1.width,
                weekWidget(language!.lblMon,
                    scheduleWeeks[1] == true ? Colors.green : Colors.grey),
                1.width,
                weekWidget(language!.lblTue,
                    scheduleWeeks[2] == true ? Colors.green : Colors.grey),
                1.width,
                weekWidget(language!.lblWed,
                    scheduleWeeks[3] == true ? Colors.green : Colors.grey),
                1.width,
                weekWidget(language!.lblThu,
                    scheduleWeeks[4] == true ? Colors.green : Colors.grey),
                1.width,
                weekWidget(language!.lblFri,
                    scheduleWeeks[5] == true ? Colors.green : Colors.grey),
                1.width,
                weekWidget(language!.lblSat,
                    scheduleWeeks[6] == true ? Colors.green : Colors.grey),
              ],
            )
          ],
        ),
      ),
    );
  }
}
