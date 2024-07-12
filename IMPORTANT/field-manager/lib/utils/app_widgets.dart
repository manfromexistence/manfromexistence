import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:shimmer/shimmer.dart';

import '../main.dart';
import 'app_colors.dart';
import 'app_constants.dart';

Widget buildShimmer(double height, double width) {
  return SizedBox(
    height: height,
    width: width,
    child: Shimmer.fromColors(
      baseColor: Colors.grey[400]!.withOpacity(0.5),
      highlightColor: Colors.grey[100]!.withOpacity(0.5),
      child: Card(
        shape: buildRoundedCorner(),
        color: Colors.white,
      ),
    ),
  );
}

RoundedRectangleBorder buildRoundedCorner({double? radius}) {
  return RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(radius ?? 10));
}

RoundedRectangleBorder buildCardCorner({double? radius}) {
  return RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(radius ?? 16));
}

RoundedRectangleBorder buildButtonCorner({double? radius}) {
  return RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(radius ?? 16));
}

// EditText rounded Style
Padding editTextStyle(var hintText,
    {isPassword = true, TextEditingController? controller}) {
  return Padding(
    padding: const EdgeInsets.fromLTRB(40, 0, 40, 0),
    child: TextFormField(
      style: const TextStyle(
          fontSize: fontSizeLargeMedium, fontFamily: fontRegular),
      obscureText: isPassword,
      controller: controller,
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.fromLTRB(24, 18, 24, 18),
        hintText: hintText,
        filled: true,
        fillColor: appStore.isDarkModeOn ? cardDarkColor : white,
        enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(40),
            borderSide:
                const BorderSide(color: editTextBackground, width: 0.0)),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(40),
          borderSide: const BorderSide(color: editTextBackground, width: 0.0),
        ),
      ),
    ),
  );
}

// Login/SignUp HeadingElement
Text formHeading(var label) {
  return Text(label,
      style: TextStyle(
          color: appStore.textPrimaryColor, fontSize: 30, fontFamily: fontBold),
      textAlign: TextAlign.center);
}

Text formSubHeadingForm(var label) {
  return Text(label,
      style: TextStyle(
          color: appStore.textSecondaryColor,
          fontSize: 20,
          fontFamily: fontBold),
      textAlign: TextAlign.center);
}

class CustomTheme extends StatelessWidget {
  final Widget? child;

  const CustomTheme({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: appStore.isDarkModeOn
          ? ThemeData.dark().copyWith(
              colorScheme: ColorScheme.fromSwatch().copyWith(secondary: appColorPrimary).copyWith(surface: context.scaffoldBackgroundColor),
            )
          : ThemeData.light(),
      child: child!,
    );
  }
}

Widget text(
  String? text, {
  var fontSize = fontSizeLargeMedium,
  Color? textColor,
  var fontFamily,
  var isCentered = false,
  var maxLine = 1,
  var latterSpacing = 0.5,
  bool textAllCaps = false,
  var isLongText = false,
  bool lineThrough = false,
}) {
  return Text(
    textAllCaps ? text!.toUpperCase() : text!,
    textAlign: isCentered ? TextAlign.center : TextAlign.start,
    maxLines: isLongText ? null : maxLine,
    overflow: TextOverflow.ellipsis,
    style: TextStyle(
      fontFamily: fontFamily,
      fontSize: fontSize,
      color: textColor ?? appStore.textSecondaryColor,
      height: 1.5,
      letterSpacing: latterSpacing,
      decoration:
          lineThrough ? TextDecoration.lineThrough : TextDecoration.none,
    ),
  );
}

Widget shadowButton(String name) {
  return MaterialButton(
    height: 60,
    minWidth: double.infinity,
    textColor: white,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40.0)),
    color: appColorPrimary,
    onPressed: () => {toast("Hi 2")},
    child: text(name,
        fontSize: fontSizeLargeMedium,
        textColor: white,
        fontFamily: fontMedium),
  );
}

AppBar appBar(BuildContext context, String title,
    {List<Widget>? actions,
    bool showBack = true,
    Color? color,
    Color? iconColor,
    Color? textColor}) {
  return AppBar(
    automaticallyImplyLeading: false,
    backgroundColor: color ?? appStore.appBarColor,
    leading: showBack
        ? IconButton(
            onPressed: () {
              finish(context);
            },
            icon: Icon(Icons.arrow_back,
                color: appStore.isDarkModeOn ? white : black),
          )
        : null,
    title:
        appBarTitleWidget(context, title, textColor: textColor, color: color),
    actions: actions,
    elevation: 0.5,
  );
}

Widget appBarTitleWidget(context, String title,
    {Color? color, Color? textColor}) {
  return Container(
    width: MediaQuery.of(context).size.width,
    height: 60,
    color: color ?? appStore.appBarColor,
    child: Row(
      children: <Widget>[
        Text(
          title,
          style: boldTextStyle(
              color: color ?? appStore.textPrimaryColor, size: 20),
          maxLines: 1,
        ).expand(),
      ],
    ),
  );
}

void changeStatusColor(Color color) async {
  setStatusBarColor(color);
}

BoxDecoration boxDecoration(
    {double radius = 2,
    Color color = Colors.transparent,
    Color? bgColor,
    var showShadow = false}) {
  return BoxDecoration(
    color: bgColor ?? appStore.scaffoldBackground,
    boxShadow: showShadow
        ? defaultBoxShadow(shadowColor: shadowColorGlobal)
        : [const BoxShadow(color: Colors.transparent)],
    border: Border.all(color: color),
    borderRadius: BorderRadius.all(Radius.circular(radius)),
  );
}

Widget divider() {
  return const Divider(
    height: 0.7,
    color: Colors.grey,
  );
}

Widget weekWidget(String text, Color bgColor) {
  return Container(
    width: 32,
    decoration: boxDecorationWithRoundedCorners(backgroundColor: bgColor),
    child: Padding(
      padding: const EdgeInsets.all(2.0),
      child: Center(
        child: Text(
          text,
          style: primaryTextStyle(color: white, size: 12),
        ),
      ),
    ),
  ).paddingRight(4);
}

Widget itemRowWidget(String title, value) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: [
      Text(
        title,
        style: primaryTextStyle(color: white),
      ),
      10.width,
      Text(
        value,
        style: primaryTextStyle(color: white),
      ),
    ],
  );
}

Widget itemRowTWidget(String title, value, Color textColor) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: [
      Text(
        title,
        style: primaryTextStyle(color: textColor),
      ),
      10.width,
      Text(
        value,
        style: primaryTextStyle(color: textColor),
      ),
    ],
  );
}

Widget loadingWidgetMaker() {
  return Container(
    alignment: Alignment.center,
    child: Card(
      semanticContainer: true,
      clipBehavior: Clip.antiAliasWithSaveLayer,
      elevation: 4,
      margin: const EdgeInsets.all(4),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50.0)),
      child: Container(
        width: 45,
        height: 45,
        padding: const EdgeInsets.all(8.0),
        child: const CircularProgressIndicator(strokeWidth: 3),
      ),
    ),
  );
}

Widget settingItem(String name, double width,
    {String icon = "", var pad = 8.0}) {
  return Expanded(
    child: Padding(
      padding: EdgeInsets.all(pad),
      child: Row(
        children: <Widget>[
          Container(
            margin: const EdgeInsets.only(right: 18),
            width: width / 7.5,
            height: width / 7.5,
            padding: const EdgeInsets.all(7),
            decoration: icon.isNotEmpty
                ? boxDecoration(
                    radius: 4,
                    bgColor: appStore.scaffoldBackground,
                  )
                : null,
            child: icon.isNotEmpty
                ? Image.asset(
                    icon,
                    width: 30,
                  )
                : const SizedBox(),
          ),
          text(name,
              textColor: appStore.textPrimaryColor,
              fontFamily: fontMedium,
              fontSize: fontSizeLargeMedium)
        ],
      ),
    ),
  );
}

InputDecoration editTextDecoration(
  IconData icon,
  String title, {
  String? errorText,
  Color? bgColor,
  Color? borderColor,
}) {
  return InputDecoration(
    prefixIcon: Icon(
      icon,
      color: appStore.iconColor,
    ),
    focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: borderColor ?? appColorPrimary)),
    enabledBorder: OutlineInputBorder(
      borderRadius: const BorderRadius.all(
        Radius.circular(16),
      ),
      borderSide: BorderSide(
        color: Colors.grey.withOpacity(0.4),
      ),
    ),
    errorBorder: const OutlineInputBorder(
      borderRadius: BorderRadius.all(
        Radius.circular(16),
      ),
      borderSide: BorderSide(color: Colors.red),
    ),
    focusedErrorBorder: const OutlineInputBorder(
      borderRadius: BorderRadius.all(
        Radius.circular(16),
      ),
      borderSide: BorderSide(color: Colors.red),
    ),
    fillColor: bgColor ?? appColorPrimary.withOpacity(0.04),
    errorText: errorText,
    labelText: title,
    labelStyle: primaryTextStyle(),
    filled: true,
  );
}
