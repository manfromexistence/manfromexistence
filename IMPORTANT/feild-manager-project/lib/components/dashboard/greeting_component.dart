import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:lottie/lottie.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';

class GreetingComponent extends StatelessWidget {
  const GreetingComponent({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Padding(
          padding:
              const EdgeInsets.only(left: 10, top: 10, right: 15, bottom: 7),
          child: Lottie.asset('assets/animations/sun.json', width: 70),
        ),
        10.height,
        Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              greeting(),
              style: boldTextStyle(size: 19),
            ),
            Text(
              sharedHelper.getFullName(),
              style: boldTextStyle(size: 19),
            ),
            Text(
              '${language!.lblToday} : ${getDate()}',
              style: boldTextStyle(),
            )
          ],
        )
      ],
    );
  }

  String greeting() {
    var hour = DateTime.now().hour;
    if (hour < 12) {
      return 'Good Morning';
    }
    if (hour < 17) {
      return 'Good Afternoon';
    }
    return 'Good Evening';
  }

  String getDate() {
    final DateTime now = DateTime.now();
    final DateFormat formatter = DateFormat('dd-MM-yyyy');
    final String formatted = formatter.format(now);

    return formatted;
  }
}
