import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Utils/app_widgets.dart';
import '../../main.dart';

class AttendanceStatusComponent extends StatelessWidget {
  const AttendanceStatusComponent({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Card(
            color: white.withOpacity(0.8),
            shape: buildRoundedCorner(),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Card(
                    color: Colors.cyan.shade800,
                    shape: buildRoundedCorner(),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            language!.lblAttendanceStatus,
                            style: primaryTextStyle(color: white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  5.height,
                  Observer(
                      builder: (_) => appStore.getCurrentStatus!.status != 'new'
                          ? Column(
                              children: [
                                Text(
                                    '${language!.lblAttendanceInAt} : ${appStore.getCurrentStatus!.checkInAt!.toString()}'),
                                appStore.getCurrentStatus!.checkOutAt != null
                                    ? Text(
                                        '${language!.lblAttendanceOutAt} : ${appStore.getCurrentStatus!.checkOutAt!.toString()}')
                                    : Container()
                              ],
                            )
                          : Text(language!.lblCheckInToBegin)),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
