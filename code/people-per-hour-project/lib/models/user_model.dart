class UserModel {
  String? id,
      firstName,
      lastName,
      avatar,
      gender,
      address,
      phoneNumber,
      alternateNumber,
      status,
      token;
  int? tenantId;

  UserModel(
      {this.id,
      this.firstName,
      this.lastName,
      this.avatar,
      this.gender,
      this.address,
      this.phoneNumber,
      this.alternateNumber,
      this.status,
      this.token,
      this.tenantId});

  factory UserModel.fromJSON(Map<String, dynamic> json) {
    return UserModel(
        id: json['id'].toString(),
        firstName: json['firstName'].toString(),
        lastName: json['lastName'].toString(),
        avatar: json['avatar'].toString(),
        gender: json['gender'].toString(),
        address: json['address'].toString(),
        phoneNumber: json['phoneNumber'].toString(),
        alternateNumber: json['alternateNumber'].toString(),
        status: json['status'].toString(),
        token: json['token'].toString(),
        tenantId: json['tenantId']);
  }
}
