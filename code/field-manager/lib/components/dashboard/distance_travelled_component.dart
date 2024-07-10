import 'package:fieldmanager_hrms_flutter/Utils/app_colors.dart';
import 'package:fieldmanager_hrms_flutter/Utils/app_widgets.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Utils/app_constants.dart';
import '../../main.dart';

class DistanceTravelledComponent extends StatelessWidget {
  final String travelled;
  const DistanceTravelledComponent({super.key, required this.travelled});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 3,
      color: white.withOpacity(0.7),
      shape: buildRoundedCorner(),
      child: SizedBox(
        width: 100,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(
              'images/distance_travelled.png',
              width: 47,
            ),
            Text(
              '$travelled ${getStringAsync(appDistanceUnitPref)}',
              style: boldTextStyle(size: 23, color: appColorPrimary),
            ),
            Text(language!.lblTravelled)
          ],
        ),
      ).paddingAll(8.0),
    );
  }
}
