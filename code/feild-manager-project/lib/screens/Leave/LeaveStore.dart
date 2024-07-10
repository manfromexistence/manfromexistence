import 'package:mobx/mobx.dart';

import '../../main.dart';
import '../../models/leave_request_model.dart';

part 'LeaveStore.g.dart';

class LeaveStore = LeaveStoreBase with _$LeaveStore;

abstract class LeaveStoreBase with Store {
  @observable
  bool isLoading = false;

  @observable
  ObservableList<LeaveRequestModel> leaveRequests =
      ObservableList<LeaveRequestModel>();
  int? id;

  Future init() async {
    isLoading = true;

    var result = await apiRepo.getLeaveRequests();

    if (result != null && result.isNotEmpty) {
      leaveRequests = ObservableList<LeaveRequestModel>();
      leaveRequests.addAll(result);
    } else {
      leaveRequests = ObservableList<LeaveRequestModel>();
    }
    isLoading = false;
  }

  Future<bool> deleteLeave() async {
    isLoading = true;

    var result = await apiRepo.deleteLeaveRequest(id!);

    isLoading = false;

    return result;
  }
}
