import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Utils/app_colors.dart';
import '../../Utils/app_constants.dart';
import '../../Utils/app_widgets.dart';
import '../../main.dart';

class ChangePasswordScreen extends StatefulWidget {
  const ChangePasswordScreen({super.key});

  @override
  State<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  bool isLoading = false;

  var oldPasswordCont = TextEditingController();

  var newPasswordCont = TextEditingController();

  var confirmNewPasswordCont = TextEditingController();

  var oldPasswordNode = FocusNode();

  var newPasswordNode = FocusNode();

  var confirmNewPasswordNode = FocusNode();

  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
  }

  init() async {}

  Future changePassword() async {
    var result = await apiRepo.changePassword(
        oldPasswordCont.text, confirmNewPasswordCont.text);
    if (result) {
      toast('Password changed');
      if (!mounted) return;
      finish(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, 'Change Password'),
      body: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            10.height,
            TextFormField(
              controller: oldPasswordCont,
              focusNode: oldPasswordNode,
              style: TextStyle(
                  fontSize: fontSizeLargeMedium,
                  fontFamily: fontRegular,
                  color: appStore.textPrimaryColor),
              decoration: editTextDecoration(Icons.lock, 'Old Password'),
              validator: (s) {
                if (s.isEmptyOrNull) {
                  return 'Old password is required';
                }

                if (s!.length < 5) {
                  return 'Invalid password';
                }
                return null;
              },
            ),
            12.height,
            TextFormField(
              controller: newPasswordCont,
              focusNode: newPasswordNode,
              style: TextStyle(
                  fontSize: fontSizeLargeMedium,
                  fontFamily: fontRegular,
                  color: appStore.textPrimaryColor),
              decoration: editTextDecoration(Icons.lock, 'New Password'),
              validator: (s) {
                if (s.isEmptyOrNull) {
                  return 'New password is required';
                }

                if (s!.length < 5) {
                  return 'Minimum length is 5';
                }
                return null;
              },
            ),
            12.height,
            TextFormField(
              controller: confirmNewPasswordCont,
              focusNode: confirmNewPasswordNode,
              style: TextStyle(
                  fontSize: fontSizeLargeMedium,
                  fontFamily: fontRegular,
                  color: appStore.textPrimaryColor),
              decoration:
                  editTextDecoration(Icons.lock, 'Confirm New Password'),
              validator: (s) {
                if (s.isEmptyOrNull) {
                  return 'Confirm password is required';
                }

                if (s != newPasswordCont.text) {
                  return 'Password doesn\'t match';
                }

                return null;
              },
            ),
            15.height,
            !isLoading
                ? AppButton(
                    text: 'Change',
                    color: opPrimaryColor,
                    elevation: 10,
                    textColor: Colors.white,
                    shapeBorder: buildButtonCorner(),
                    width: 150,
                    onTap: () async {
                      hideKeyboard(context);
                      isLoading = true;
                      if (_formKey.currentState!.validate()) {
                        changePassword();
                      }
                      isLoading = false;
                    })
                : loadingWidgetMaker(),
          ],
        ).paddingOnly(left: 10, right: 10),
      ),
    );
  }
}
