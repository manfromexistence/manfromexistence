import 'package:mobx/mobx.dart';

class ChatResponse {
  String? teamName;
  int? teamId;
  bool? isChatEnabled;
  List<ChatItem?> chatItems = [];

  ChatResponse(
      {this.teamName,
      this.teamId,
      this.isChatEnabled,
      required this.chatItems});

  ChatResponse.fromJson(Map<String, dynamic> json) {
    teamName = json['teamName'];
    teamId = json['teamId'];
    isChatEnabled = json['isChatEnabled'];
    if (json['chatItems'] != null) {
      chatItems = <ChatItem>[];
      json['chatItems'].forEach((v) {
        chatItems.add(ChatItem.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['teamName'] = teamName;
    data['teamId'] = teamId;
    data['isChatEnabled'] = isChatEnabled;
    return data;
  }
}

class ChatItem {
  @observable
  int? id;
  @observable
  String? from;
  @observable
  String? message;
  @observable
  String? createdAt;

  ChatItem({this.id, this.from, this.message, this.createdAt});

  ChatItem.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    from = json['from'];
    message = json['message'];
    createdAt = json['createdAt'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['from'] = from;
    data['message'] = message;
    data['createdAt'] = createdAt;
    return data;
  }
}
