class DashboardModel {
  String? scheduleTime;
  List<bool>? scheduleWeeks;
  int? presentDays;
  int? halfDays;
  int? absentDays;
  int? weekOffDays;
  int? onLeaveDays;
  String? travelled;
  num? approved;
  num? pending;
  num? rejected;
  int? availableLeaveCount;

  DashboardModel(
      {this.scheduleTime,
      this.scheduleWeeks,
      this.presentDays,
      this.halfDays,
      this.absentDays,
      this.weekOffDays,
      this.onLeaveDays,
      this.travelled,
      this.approved,
      this.pending,
      this.rejected,
      this.availableLeaveCount});

  DashboardModel.fromJson(Map<String, dynamic> json) {
    scheduleTime = json['scheduleTime'];
    scheduleWeeks = json['scheduleWeeks'].cast<bool>();
    presentDays = json['presentDays'];
    halfDays = json['halfDays'];
    absentDays = json['absentDays'];
    weekOffDays = json['weekOffDays'];
    onLeaveDays = json['onLeaveDays'];
    travelled = json['travelled'].toString();
    approved = json['approved'];
    pending = json['pending'];
    rejected = json['rejected'];
    availableLeaveCount = json['availableLeaveCount'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['scheduleTime'] = scheduleTime;
    data['scheduleWeeks'] = scheduleWeeks;
    data['presentDays'] = presentDays;
    data['halfDays'] = halfDays;
    data['absentDays'] = absentDays;
    data['weekOffDays'] = weekOffDays;
    data['onLeaveDays'] = onLeaveDays;
    data['travelled'] = travelled;
    data['approved'] = approved;
    data['pending'] = pending;
    data['rejected'] = rejected;
    return data;
  }
}
