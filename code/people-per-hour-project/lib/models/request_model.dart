class LeaveRequest {
  int? id;
  String? type;
  String? approver;
  String? status;

  String? createdAt;
  String? updatedAt;

  LeaveRequest(this.id, this.type, this.status, this.approver, this.createdAt,
      this.updatedAt);

  LeaveRequest.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    type = json['type'];
    approver = json['approvers'];
    status = json['status'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
  }
}
