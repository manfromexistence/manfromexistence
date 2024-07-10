class ScheduleModel {
  String? title;
  String? description;
  String? startDate;
  String? endDate;
  String? status;
  String? clientName;
  String? address;
  double? latitude;
  double? longitude;

  ScheduleModel(
      {this.title,
      this.description,
      this.startDate,
      this.endDate,
      this.status,
      this.clientName,
      this.address,
      this.latitude,
      this.longitude});

  ScheduleModel.fromJson(Map<String, dynamic> json) {
    title = json['title'];
    description = json['description'];
    startDate = json['startDate'];
    endDate = json['endDate'];
    status = json['status'];
    clientName = json['clientName'];
    address = json['address'];
    latitude = json['latitude'];
    longitude = json['longitude'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['title'] = title;
    data['description'] = description;
    data['startDate'] = startDate;
    data['endDate'] = endDate;
    data['status'] = status;
    data['clientName'] = clientName;
    data['address'] = address;
    data['latitude'] = latitude;
    data['longitude'] = longitude;
    return data;
  }
}
