import 'dart:async';

import 'package:mobx/mobx.dart';

import '../../main.dart';
import '../../models/chat_response.dart';

part 'ChatStore.g.dart';

class ChatStore = ChatStoreBase with _$ChatStore;

abstract class ChatStoreBase with Store {
  late Timer timer;

  @observable
  bool isLoading = false;

  /* @observable
  ChatResponse chatData = ChatResponse(chatItems: []);*/

  @observable
  ObservableList<ChatItem?> chatItems = ObservableList<ChatItem?>();

  @action
  void addChatItems(List<ChatItem?> items) => chatItems.addAll(items);

  void getData() async {
    isLoading = true;

    var result = await apiRepo.getChats();
    if (result != null) {
      chatItems.addAll(result.chatItems);
    }

    isLoading = false;
  }

  void setupSync() async {
    timer = Timer.periodic(const Duration(seconds: 5), (timer) async {
      var result = await apiRepo.getChats();
      if (result != null) {
        if (result.chatItems.isNotEmpty &&
            result.chatItems.first != chatItems.first) {
          addChatItems(result.chatItems);
        }
      }
    });
  }

  Future<bool> sendMessage(String message) async {
    isLoading = true;
    var result = await apiRepo.postChat(message);
    isLoading = false;
    return result;
  }
}
