import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../utils/app_colors.dart';

AppButton button(String text,
    {Function? onTap, Color color = opPrimaryColor, Color textColor = white}) {
  return AppButton(
      text: text,
      color: color,
      textColor: textColor,
      shapeBorder:
          RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
      width: 120,
      onTap: onTap);
}
