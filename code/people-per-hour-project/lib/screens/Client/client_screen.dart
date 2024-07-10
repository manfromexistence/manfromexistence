import 'package:fieldmanager_hrms_flutter/dialog/client_details_dialog.dart';
import 'package:fieldmanager_hrms_flutter/main.dart';
import 'package:fieldmanager_hrms_flutter/models/Client/client_model.dart';
import 'package:fieldmanager_hrms_flutter/screens/Client/Widget/client_card_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../utils/app_colors.dart';
import '../../utils/app_widgets.dart';
import 'add_client_screen.dart';
import 'client_store.dart';

class ClientScreen extends StatefulWidget {
  const ClientScreen({Key? key}) : super(key: key);

  @override
  State<ClientScreen> createState() => _ClientScreenState();
}

class _ClientScreenState extends State<ClientScreen> {
  final ClientStore _store = ClientStore();

  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    await _store.init();
  }

  @override
  void dispose() {
    _store.pagingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: true
          ? RefreshIndicator(
              onRefresh: () => Future.sync(
                () => _store.pagingController.refresh(),
              ),
              child: PagedListView(
                pagingController: _store.pagingController,
                builderDelegate: PagedChildBuilderDelegate<ClientModel>(
                  itemBuilder: (context, item, index) => ClientCardWidget(
                      client: item,
                      index: index,
                      onTap: (BuildContext context) {
                        showInDialog(
                          context,
                          builder: (_) => ClientDetails(client: item),
                          shape: buildRoundedCorner(radius: 16),
                        );
                      }),
                ),
              ),
            )
          : Observer(
              builder: (_) => !_store.isLoading
                  ? _store.clients.isNotEmpty
                      ? ListView.builder(
                          itemCount: _store.clients.length,
                          physics: const AlwaysScrollableScrollPhysics(),
                          padding: const EdgeInsets.only(left: 8, right: 8),
                          scrollDirection: Axis.vertical,
                          shrinkWrap: true,
                          itemBuilder: (BuildContext context, int index) {
                            return Card(
                              elevation: 3,
                              color: Colors.green.shade600,
                              shape: buildRoundedCorner(radius: 16),
                              child: InkWell(
                                borderRadius: const BorderRadius.all(
                                  Radius.circular(16),
                                ),
                                onTap: () {
                                  showInDialog(
                                    context,
                                    builder: (_) => ClientDetails(
                                        client: _store.clients[index]),
                                    shape: buildRoundedCorner(radius: 16),
                                  );
                                },
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: <Widget>[
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              left: 16, right: 16, top: 8),
                                          child: Text(
                                            _store.clients[index].name!,
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                            style: primaryTextStyle(
                                                color: white, size: 17),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.only(
                                              left: 16, right: 16, top: 8),
                                          child: Text(
                                            _store.clients[index].phoneNumber!,
                                            maxLines: 2,
                                            overflow: TextOverflow.ellipsis,
                                            style: primaryTextStyle(
                                                color: white, size: 13),
                                          ),
                                        ),
                                      ],
                                    ),
                                    const Divider(),
                                    Padding(
                                      padding: const EdgeInsets.only(
                                          top: 10,
                                          left: 15,
                                          right: 15,
                                          bottom: 5),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: <Widget>[
                                          Text(
                                            _store.clients[index]
                                                    .contactPerson ??
                                                '',
                                            style: secondaryTextStyle(
                                                color: white, size: 16),
                                          ),
                                          Text(
                                            _store.clients[index].city
                                                .toString(),
                                            style: secondaryTextStyle(
                                                color: white, size: 16),
                                          ),
                                        ],
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            );
                          })
                      : Center(
                          child: Text(language!.lblNoRequests),
                        )
                  : SingleChildScrollView(
                      child: Column(
                        children: List.generate(10, (index) {
                          return buildShimmer(90, context.width())
                              .paddingOnly(left: 10, right: 10);
                        }),
                      ),
                    ),
            ),
      floatingActionButton: FloatingActionButton(
        elevation: 5,
        backgroundColor: opPrimaryColor,
        child: const Icon(
          Icons.add,
          color: white,
        ),
        onPressed: () async {
          await const AddClientScreen().launch(context);
          init();
        },
      ),
    );
  }

  Widget clientCard(ClientModel client) {
    return Card(
      elevation: 3,
      color: Colors.green.shade600,
      shape: buildRoundedCorner(radius: 16),
      child: InkWell(
        borderRadius: const BorderRadius.all(
          Radius.circular(16),
        ),
        onTap: () {
          showInDialog(
            context,
            builder: (_) => ClientDetails(client: client),
            shape: buildRoundedCorner(radius: 16),
          );
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 16, right: 16, top: 8),
                  child: Text(
                    client.name!,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: primaryTextStyle(color: white, size: 17),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 16, right: 16, top: 8),
                  child: Text(
                    client.phoneNumber!,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: primaryTextStyle(color: white, size: 13),
                  ),
                ),
              ],
            ),
            const Divider(),
            Padding(
              padding: const EdgeInsets.only(
                  top: 10, left: 15, right: 15, bottom: 5),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    client.contactPerson ?? '',
                    style: secondaryTextStyle(color: white, size: 16),
                  ),
                  Text(
                    client.city.toString(),
                    style: secondaryTextStyle(color: white, size: 16),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
