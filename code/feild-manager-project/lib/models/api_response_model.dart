class ApiResponseModel {
  int? statusCode;
  String? status;
  dynamic data;

  ApiResponseModel({this.statusCode, this.status, this.data});

  ApiResponseModel.fromJson(Map<String, dynamic> json) {
    statusCode = json['statusCode'];
    status = json['status'];
    data = json['data'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['statusCode'] = statusCode;
    data['status'] = status;
    data['data'] = data;
    return data;
  }
}
