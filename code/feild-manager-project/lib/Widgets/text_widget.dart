import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../main.dart';

InputDecoration textInputDecoration(String label, IconData icon) {
  return InputDecoration(
    prefixIcon: Icon(
      icon,
      color: appStore.iconColor,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(20.0),
      borderSide: BorderSide(color: appStore.iconColor!),
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(20.0),
      borderSide: BorderSide(color: appStore.iconColor!),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(20.0),
      borderSide: BorderSide(width: 1, color: appStore.iconColor!),
    ),
    labelText: label,
    labelStyle: primaryTextStyle(),
  );
}
