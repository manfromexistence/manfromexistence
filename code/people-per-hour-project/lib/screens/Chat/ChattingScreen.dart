import 'dart:async';

import 'package:fieldmanager_hrms_flutter/utils/app_colors.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_constants.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../models/chat_response.dart';
import '../../utils/app_widgets.dart';

class ChattingScreen extends StatefulWidget {
  static String tag = '/ChattingScreen';
  const ChattingScreen({Key? key}) : super(key: key);
  @override
  State<ChattingScreen> createState() => _ChattingScreenState();
}

class _ChattingScreenState extends State<ChattingScreen> {
  ChatResponse _response = ChatResponse(chatItems: []);
  bool _isLoading = false;
  var messageCont = TextEditingController();
  late Timer timer;

  void init() async {
    setState(() {
      _isLoading = true;
    });
    var result = await apiRepo.getChats();
    if (result != null) {
      _response = result;
    }

    setState(() {
      _isLoading = false;
    });
  }

  void setupSync() async {
    timer = Timer.periodic(const Duration(seconds: 2), (timer) async {
      var result = await apiRepo.getChats();
      if (result != null) {
        if (result.chatItems.isNotEmpty &&
            result.chatItems.first != _response.chatItems.first) {
          setState(() {
            _response.chatItems = result.chatItems;
          });
        }
      }
    });
  }

  void sendMessage() async {
    setState(() {
      _isLoading = true;
    });

    var result = await apiRepo.postChat(messageCont.text);
    if (result) {
      messageCont.text = '';
      init();
    }

    setState(() {
      _isLoading = false;
    });
  }

  @override
  void initState() {
    super.initState();
    init();
    setupSync();
  }

  @override
  void dispose() {
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: appBar(context, language!.lblChats),
      body: !_isLoading
          ? Stack(
              children: [
                _response.chatItems.isEmpty
                    ? Center(
                        child: Padding(
                          padding: const EdgeInsets.only(bottom: 40),
                          child: Text(language!.lblNoMessages),
                        ),
                      )
                    : ListView.builder(
                        itemBuilder: (context, i) =>
                            buildChatMessages(_response.chatItems[i]!),
                        itemCount: _response.chatItems.length,
                        shrinkWrap: true,
                        physics: const AlwaysScrollableScrollPhysics(),
                        padding: const EdgeInsets.only(top: 10, bottom: 60),
                        reverse: true,
                      ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Padding(
                    padding:
                        const EdgeInsets.only(left: 6, right: 6, bottom: 3),
                    child: typingSection(width),
                  ),
                ),
              ],
            )
          : loadingWidgetMaker(),
    );
  }

  Widget typingSection(double width) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 2.0),
      child: Container(
        width: width,
        decoration:
            boxDecorationRoundedWithShadow(10, backgroundColor: opPrimaryColor),
        padding: const EdgeInsets.only(top: 8.0, bottom: 8.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            //Icon(Icons.insert_emoticon, color: appStore.textPrimaryColor),
            5.width,
            Expanded(
              child: TextFormField(
                controller: messageCont,
                // autofocus: true,
                maxLines: null,
                keyboardType: TextInputType.multiline,
                style: TextStyle(
                    color: appStore.textPrimaryColor,
                    fontSize: fontSizeMedium,
                    fontFamily: fontRegular),
                decoration: InputDecoration(
                  hintText: language!.lblTypeYourMessage,
                  filled: true,
                  fillColor: appStore.isDarkModeOn ? cardDarkColor : white,
                  contentPadding: const EdgeInsets.all(5.0),
                  enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: const BorderSide(
                          color: editTextBackground, width: 0.0)),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                    borderSide:
                        const BorderSide(color: editTextBackground, width: 0.0),
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: const Icon(
                Icons.send,
                size: 30,
                color: white,
              ).onTap(() {
                if (!messageCont.text.isEmptyOrNull) {
                  sendMessage();
                } else {
                  toast(language!.lblPleaseTypAMessageFirst);
                }
              }),
            )
          ],
        ),
      ),
    );
  }

  Widget buildChatMessages(ChatItem model) {
    if (model.from.isEmptyOrNull) {
      return Container(
        margin: const EdgeInsets.only(right: 3, bottom: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisAlignment: MainAxisAlignment.end,
          children: <Widget>[
            Container(
              padding: const EdgeInsets.all(10),
              width: MediaQuery.of(context).size.width * 0.45,
              decoration: const BoxDecoration(
                  color: opPrimaryColor,
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(15),
                      topLeft: Radius.circular(15),
                      bottomLeft: Radius.circular(15))),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    language!.lblYou,
                    style:
                        const TextStyle(fontSize: fontSizeSmall, color: white),
                  ),
                  Text(model.message!,
                      style: const TextStyle(
                          color: white,
                          fontSize: fontSizeMedium,
                          overflow: TextOverflow.visible))
                ],
              ),
            ),
            RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                      text: model.createdAt,
                      style: const TextStyle(
                          fontSize: fontSizeSmall, color: textSecondaryColor)),
                ],
              ),
            ),
          ],
        ),
      );
    } else {
      return Container(
        margin: const EdgeInsets.only(left: 3, bottom: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color:
                    appStore.isDarkModeOn ? cardDarkColor : opDarkWidgetColor,
                borderRadius: const BorderRadius.only(
                    topRight: Radius.circular(15),
                    bottomRight: Radius.circular(15),
                    topLeft: Radius.circular(15)),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    model.from!,
                    style:
                        const TextStyle(fontSize: fontSizeSmall, color: white),
                  ),
                  Text(model.message!,
                      style: const TextStyle(
                          color: white,
                          fontSize: fontSizeMedium,
                          overflow: TextOverflow.visible))
                ],
              ),
            ),
            RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                      text: model.createdAt,
                      style: const TextStyle(
                          fontSize: fontSizeSmall, color: textSecondaryColor)),
                ],
              ),
            )
          ],
        ),
      );
    }
  }
}
