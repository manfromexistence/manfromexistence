import 'dart:convert';

import 'package:http/http.dart';
import 'package:mobx/mobx.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:validators/validators.dart';

import '../../main.dart';
import '../../models/api_response_model.dart';
import '../../models/user_model.dart';
import '../../network/api_routes.dart';
import '../../utils/app_constants.dart';

part 'LoginStore.g.dart';

class LoginStore = LoginStoreBase with _$LoginStore;

abstract class LoginStoreBase with Store {
  final LoginFormError error = LoginFormError();

  @observable
  bool isValidDevice = false;

  @observable
  bool isLoading = false;

  @observable
  String? employeeId;

  @observable
  ObservableFuture<bool> employeeIdCheck = ObservableFuture.value(true);

  @observable
  String? passwordError;

  @observable
  String? password;

  @computed
  bool get isPhoneNumberCheckPending =>
      employeeIdCheck.status == FutureStatus.pending;

  @computed
  bool get canLogin => !error.hasErrors;

  List<ReactionDisposer> _disposers = [];

  void setupValidations() {
    _disposers = [
      reaction((_) => employeeId, validateEmployeeId),
      reaction((_) => password, validatePassword)
    ];
  }

  void dispose() {
    for (final d in _disposers) {
      d();
    }
  }

  void validateAll() {
    validateEmployeeId(employeeId);
    validatePassword(password);
  }

  Future validateEmployeeId(String? value) async {
    if (isNull(value) || value == '') {
      error.employeeId = 'Cannot be blank';
      return;
    }

    if (value != null && value.length < 6) {
      error.employeeId = 'Invalid Employee Id';
      return;
    }

    try {
      employeeIdCheck = ObservableFuture(apiRepo.checkValidEmployeeId(value!));
      final isValid = await employeeIdCheck;
      if (!isValid) {
        error.employeeId = 'Employee Id not exists';
        return;
      }
      error.employeeId = null;
    } on Object catch (_) {
      error.employeeId = null;
    }

    error.employeeId = null;
  }

  Future validatePassword(String? password) async {
    if (isNull(password) || password == '') {
      error.password = 'Cannot be blank';
      return;
    }

    if (password != null) {
      if (password.isNotEmpty && password.length < 6) {
        error.password = 'Invalid password';
        return;
      }
    }

    error.password = null;
  }

  Future<String> login() async {
    Map payload = {
      'employeeId': employeeId!.trim(),
      'password': password!.trim()
    };
    String body = json.encode(payload);

    Response response = await post(Uri.parse(APIRoutes.loginURL),
        headers: {"Content-Type": "application/json"},
        body: body,
        encoding: Encoding.getByName("utf-8"));

    int statusCode = response.statusCode;

    log('Status Code: $statusCode');

    log('Response: ${response.body}');

    var data = jsonDecode(response.body);

    ApiResponseModel apiResponse = ApiResponseModel.fromJson(data);

    if (statusCode == 200) {
      var user = UserModel.fromJSON(apiResponse.data);

      await setValue(isLoggedInPref, true);
      await setValue(isDeviceVerifiedPref, false);
      await setValue(firstNamePref, user.firstName);
      await setValue(lastNamePref, user.lastName);
      await setValue(genderPref, user.gender);
      if (!user.avatar.isEmptyOrNull) {
        await setValue(avatarPref, user.avatar ?? '');
      }
      await setValue(tenantPref, user.tenantId ?? 0);

      await setValue(addressPref, user.address);
      await setValue(phoneNumberPref, user.phoneNumber);
      await setValue(alternateNumberPref, user.alternateNumber);
      await setValue(statusPref, user.status);
      await setValue(tokenPref, user.token);
      //await validateDevice();
      return user.status.toString();
    } else {
      await setValue(isLoggedInPref, false);
      await setValue(isDeviceVerifiedPref, false);
      toast(apiResponse.data.toString());
      return "";
    }
  }
}

class LoginFormError = LoginFormErrorState with _$LoginFormError;

abstract class LoginFormErrorState with Store {
  @observable
  String? employeeId;

  @observable
  String? password;

  @computed
  bool get hasErrors => employeeId != null || password != null;
}
