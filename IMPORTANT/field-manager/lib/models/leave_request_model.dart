class LeaveRequestModel {
  int? id;
  String? fromDate;
  String? toDate;
  String? leaveType;
  String? comments;
  String? status;
  String? image;
  String? createdOn;
  String? approvedOn;
  String? approvedBy;

  LeaveRequestModel(
      {id,
      fromDate,
      toDate,
      leaveType,
      comments,
      status,
      image,
      createdOn,
      approvedOn,
      approvedBy});

  LeaveRequestModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    fromDate = json['fromDate'];
    toDate = json['toDate'];
    leaveType = json['leaveType'];
    comments = json['comments'];
    status = json['status'];
    image = json['image'];
    createdOn = json['createdOn'];
    approvedOn = json['approvedOn'];
    approvedBy = json['approvedBy'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['fromDate'] = fromDate;
    data['toDate'] = toDate;
    data['leaveType'] = leaveType;
    data['comments'] = comments;
    data['status'] = status;
    data['image'] = image;
    data['createdOn'] = createdOn;
    data['approvedOn'] = approvedOn;
    data['approvedBy'] = approvedBy;
    return data;
  }
}
