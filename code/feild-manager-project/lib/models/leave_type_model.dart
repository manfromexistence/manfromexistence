class LeaveTypeModel {
  int? id;
  String? name;
  bool? isImgRequired;

  LeaveTypeModel({this.id, this.name, this.isImgRequired});

  LeaveTypeModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    isImgRequired = json['isImgRequired'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['isImgRequired'] = isImgRequired;
    return data;
  }
}
