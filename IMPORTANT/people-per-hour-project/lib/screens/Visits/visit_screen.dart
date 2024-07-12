import 'dart:io';

import 'package:fieldmanager_hrms_flutter/Widgets/button_widget.dart';
import 'package:fieldmanager_hrms_flutter/screens/Visits/visit_store.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_colors.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:image_picker/image_picker.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../models/Client/client_model.dart';
import '../Client/add_client_screen.dart';

class VisitScreen extends StatefulWidget {
  const VisitScreen({Key? key}) : super(key: key);

  @override
  State<VisitScreen> createState() => _VisitScreenState();
}

class _VisitScreenState extends State<VisitScreen> {
  final VisitStore _store = VisitStore();

  final ImagePicker _picker = ImagePicker();

  final _formKey = GlobalKey<FormState>();

  File? file;
  String fileName = '', filePath = '';

  final _clientCont = TextEditingController();
  final _clientNode = FocusNode();

  final _remarksCont = TextEditingController();
  final _remarksNode = FocusNode();
  @override
  void initState() {
    super.initState();
    init();
  }

  init() async {
    _store.init();
  }

  Future pickFile() async {
    hideKeyboard(context);
    // Capture a photo
    final XFile? photo =
        await _picker.pickImage(source: ImageSource.camera, imageQuality: 65);
    if (photo != null) {
      filePath = photo.path;
      file = File(photo.path);
    }
    setState(() {});
  }

  void removeFile() {
    filePath = '';
    file = null;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblVisits),
      body: Observer(
        builder: (_) => !_store.isLoading
            ? !_store.isClientsExists
                ? Center(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text('To mark visits please add client'),
                        10.height,
                        button('Add Client',
                            onTap: () =>
                                const AddClientScreen().launch(context))
                      ],
                    ),
                  )
                : SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          children: [
                            TextFormField(
                              controller: _clientCont,
                              focusNode: _clientNode,
                              onTap: () async {
                                hideKeyboard(context);
                                var result = await showSearch(
                                  context: context,
                                  // delegate to customize the search bar
                                  delegate: CustomSearchDelegate(),
                                );
                                init();
                                result as ClientModel;
                                _store.selectedClient = result;
                                _clientCont.text = result.name!;
                              },
                              style: primaryTextStyle(),
                              decoration: editTextDecoration(
                                  Icons.people, _store.clientLabel),
                              cursorColor:
                                  appStore.isDarkModeOn ? white : blackColor,
                            ),
                            10.height,
                            file != null
                                ? Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Card(
                                        color: opPrimaryColor,
                                        elevation: 5,
                                        child: Padding(
                                          padding: const EdgeInsets.all(8.0),
                                          child: Image.file(
                                            file!,
                                            height: 200,
                                          ),
                                        ),
                                      ),
                                      Column(
                                        children: [
                                          Card(
                                            elevation: 5,
                                            shape:
                                                buildRoundedCorner(radius: 50),
                                            color: opPrimaryColor,
                                            child: IconButton(
                                              color: white,
                                              onPressed: () {
                                                pickFile();
                                              },
                                              icon: const Icon(
                                                Icons.change_circle,
                                                size: 30,
                                              ),
                                            ),
                                          ),
                                          Card(
                                            elevation: 5,
                                            shape:
                                                buildRoundedCorner(radius: 50),
                                            color: Colors.red,
                                            child: IconButton(
                                              color: white,
                                              onPressed: () {
                                                removeFile();
                                              },
                                              icon: const Icon(
                                                Icons.delete,
                                                size: 30,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  )
                                : Card(
                                    elevation: 2,
                                    child: Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: [
                                          Text(
                                            language!.lblClickToAddImage,
                                            style: primaryTextStyle(
                                                color:
                                                    appStore.textPrimaryColor),
                                          ),
                                          Card(
                                            elevation: 5,
                                            shape:
                                                buildRoundedCorner(radius: 50),
                                            color: opPrimaryColor,
                                            child: IconButton(
                                              color: white,
                                              onPressed: () {
                                                pickFile();
                                              },
                                              icon: const Icon(
                                                Icons.image,
                                                size: 30,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ).onTap(() => pickFile()),
                            10.height,
                            TextFormField(
                              controller: _remarksCont,
                              focusNode: _remarksNode,
                              style: primaryTextStyle(),
                              decoration: editTextDecoration(
                                  Icons.receipt, language!.lblRemarks),
                              cursorColor:
                                  appStore.isDarkModeOn ? white : blackColor,
                              keyboardType: TextInputType.name,
                              validator: (s) {
                                if (s!.trim().isEmpty) {
                                  return language!.lblCommentsIsRequired;
                                }
                                return null;
                              },
                            ),
                            10.height,
                            button(language!.lblSubmit, onTap: () async {
                              if (filePath.isEmptyOrNull) {
                                toast(language!.lblImageIsRequired);
                                return;
                              }
                              if (_formKey.currentState!.validate()) {
                                var result = await _store.submit(
                                    filePath, _remarksCont.text, '0');
                                if (result) {
                                  toast(language!.lblSubmittedSuccessfully);
                                  if (!mounted) return;
                                  finish(context);
                                }
                              }
                            }),
                          ],
                        ),
                      ),
                    ),
                  )
            : loadingWidgetMaker(),
      ),
    );
  }
}

class CustomSearchDelegate extends SearchDelegate {
  List<ClientModel> resultList = [];

  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
        onPressed: () {
          query = '';
        },
        icon: const Icon(Icons.clear).onTap(() => finish(context)),
      ),
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
      onPressed: () {
        close(context, null);
      },
      icon: const Icon(Icons.arrow_back),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return Container();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    List<ClientModel> listToShow = [];
    if (query.isNotEmpty) {
      loadData(query);
    } else {
      resultList = [];
    }
    listToShow = resultList;
    return ListView.builder(
      itemCount: listToShow.length,
      itemBuilder: (context, index) {
        var result = listToShow[index];
        //.onTap(() => {finish(context, result)})
        return InkWell(
          onTap: () => finish(context, result),
          child: ListTile(
            title: Text(result.name!),
            trailing: Text(result.city!),
            subtitle: Text(result.phoneNumber!),
          ),
        );
      },
    );
  }

  void loadData(String query) async {
    var result = await apiRepo.searchClients(query);
    resultList = result;
  }
}
