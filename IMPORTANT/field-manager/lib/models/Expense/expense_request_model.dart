class ExpenseRequestModel {
  int? id;
  String? date;
  String? type;
  num? actualAmount;
  num? approvedAmount;
  String? status;
  String? createdAt;
  String? approvedBy;

  ExpenseRequestModel(
      {this.id,
      this.date,
      this.type,
      this.actualAmount,
      this.approvedAmount,
      this.status,
      this.createdAt,
      this.approvedBy});

  ExpenseRequestModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    date = json['date'];
    type = json['type'];
    actualAmount = json['actualAmount'];
    approvedAmount = json['approvedAmount'];
    status = json['status'];
    createdAt = json['createdAt'];
    approvedBy = json['approvedBy'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['date'] = date;
    data['type'] = type;
    data['actualAmount'] = actualAmount;
    data['approvedAmount'] = approvedAmount;
    data['status'] = status;
    data['createdAt'] = createdAt;
    data['approvedBy'] = approvedBy;
    return data;
  }
}
