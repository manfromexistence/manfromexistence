class StatusResponse {
  String? status = 'new';
  String? checkInAt;
  String? checkOutAt;
  String? userStatus;

  StatusResponse(
      {this.status, this.checkInAt, this.checkOutAt, this.userStatus});

  StatusResponse.fromJson(Map<String, dynamic> json) {
    status = json['status'];
    checkInAt = json['checkInAt'];
    checkOutAt = json['checkOutAt'];
    userStatus = json['userStatus'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['status'] = status;
    data['checkInAt'] = checkInAt;
    data['checkOutAt'] = checkOutAt;
    data['userStatus'] = userStatus;
    return data;
  }
}
