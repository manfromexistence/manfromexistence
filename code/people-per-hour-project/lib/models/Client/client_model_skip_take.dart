import 'client_model.dart';

class ClientModelSkipTake {
  List<ClientModel> clients = [];
  int totalCount = 0;

  ClientModelSkipTake.fromJson(Map<String, dynamic> json) {
    totalCount = json['totalCount'];
    if (json['clients'] != null) {
      json['clients'].forEach((v) {
        clients.add(ClientModel.fromJson(v));
      });
    }
  }
}
