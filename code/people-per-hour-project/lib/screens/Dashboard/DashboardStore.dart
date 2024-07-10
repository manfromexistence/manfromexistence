import 'package:fieldmanager_hrms_flutter/models/dashboard_model.dart';
import 'package:mobx/mobx.dart';

import '../../main.dart';

part 'DashboardStore.g.dart';

class DashboardStore = DashboardStoreBase with _$DashboardStore;

abstract class DashboardStoreBase with Store {
  DashboardModel dashboardModel = DashboardModel();

  @observable
  bool isLoading = false;

  void getData() async {
    isLoading = true;
    var result = await apiRepo.getDashboardInfo();

    if (result != null) {
      dashboardModel = result;
    }

    isLoading = false;
  }
}
