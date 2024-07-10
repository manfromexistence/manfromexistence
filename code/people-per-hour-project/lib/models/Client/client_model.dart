class ClientModel {
  int? id;
  String? name;
  String? address;
  double? latitude;
  double? longitude;
  String? phoneNumber;
  String? contactPerson;
  String? email;
  String? city;
  String? createdAt;
  String? status;

  ClientModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    address = json['address'];
    latitude = json['latitude'];
    longitude = json['longitude'];
    phoneNumber = json['phoneNumber'];
    contactPerson = json['contactPerson'];
    email = json['email'];
    city = json['city'];
    createdAt = json['createdAt'];
    status = json['status'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['address'] = address;
    data['latitude'] = latitude;
    data['longitude'] = longitude;
    data['phoneNumber'] = phoneNumber;
    data['contactPerson'] = contactPerson;
    data['email'] = email;
    data['city'] = city;
    return data;
  }
}
