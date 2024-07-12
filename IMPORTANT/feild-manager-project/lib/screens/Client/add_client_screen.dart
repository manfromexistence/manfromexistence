import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../Widgets/button_widget.dart';
import '../../main.dart';
import '../../models/maps_address_result_model.dart';
import '../../utils/app_constants.dart';
import '../../utils/app_widgets.dart';
import '../Maps/map_screen.dart';
import 'client_store.dart';

class AddClientScreen extends StatefulWidget {
  const AddClientScreen({Key? key}) : super(key: key);

  @override
  State<AddClientScreen> createState() => _AddClientScreenState();
}

class _AddClientScreenState extends State<AddClientScreen> {
  final ClientStore _store = ClientStore();

  final _formKey = GlobalKey<FormState>();
  final nameCont = TextEditingController();
  final nameNode = FocusNode();
  final addressCont = TextEditingController();
  final addressNode = FocusNode();
  final phoneNumberCont = TextEditingController();
  final phoneNumberNode = FocusNode();
  final contactPersonCont = TextEditingController();
  final contactPersonNode = FocusNode();
  final emailCont = TextEditingController();
  final emailNode = FocusNode();
  final cityCont = TextEditingController();
  final cityNode = FocusNode();
  final remarksCont = TextEditingController();
  final remarksNode = FocusNode();

  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    await _store.getCurrentPosition();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblCreateClient),
      body: Observer(
        builder: (_) => !_store.isLoading
            ? Container(
                padding: const EdgeInsets.all(16),
                child: SingleChildScrollView(
                  child: Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        TextFormField(
                          controller: nameCont,
                          focusNode: nameNode,
                          style: primaryTextStyle(),
                          decoration: editTextDecoration(
                              Icons.person, language!.lblName),
                          cursorColor:
                              appStore.isDarkModeOn ? white : blackColor,
                          keyboardType: TextInputType.name,
                          validator: (s) {
                            if (s!.trim().isEmpty) {
                              return language!.lblNameIsRequired;
                            }
                            return null;
                          },
                        ),
                        10.height,
                        TextFormField(
                          controller: emailCont,
                          focusNode: emailNode,
                          style: primaryTextStyle(),
                          decoration: editTextDecoration(
                              Icons.mail, language!.lblEmail),
                          cursorColor:
                              appStore.isDarkModeOn ? white : blackColor,
                          keyboardType: TextInputType.emailAddress,
                          validator: (s) {
                            return null;
                          },
                        ),
                        10.height,
                        TextFormField(
                          controller: phoneNumberCont,
                          focusNode: phoneNumberNode,
                          style: primaryTextStyle(),
                          decoration: editTextDecoration(
                              Icons.phone, language!.lblPhoneNumber),
                          cursorColor:
                              appStore.isDarkModeOn ? white : blackColor,
                          keyboardType: TextInputType.phone,
                          validator: (s) {
                            if (s!.trim().isEmpty) {
                              return language!.lblPhoneNumberIsRequired;
                            }
                            return null;
                          },
                        ),
                        10.height,
                        TextFormField(
                          controller: contactPersonCont,
                          focusNode: contactPersonNode,
                          style: primaryTextStyle(),
                          decoration: editTextDecoration(
                              Icons.person, language!.lblContactPerson),
                          cursorColor:
                              appStore.isDarkModeOn ? white : blackColor,
                          keyboardType: TextInputType.name,
                          validator: (s) {
                            if (s!.trim().isEmpty) {
                              return language!.lblContactPersonNameIsRequired;
                            }
                            return null;
                          },
                        ),
                        10.height,
                        TextFormField(
                          controller: addressCont,
                          focusNode: addressNode,
                          style: primaryTextStyle(),
                          decoration: editTextDecoration(
                              Icons.location_city_outlined,
                              language!.lblAddress),
                          cursorColor:
                              appStore.isDarkModeOn ? white : blackColor,
                          keyboardType: TextInputType.streetAddress,
                          onTap: () async {
                            hideKeyboard(context);
                            MapsAddressResultModel result =
                                await showGoogleMapLocationPicker(
                              pinWidget: const Icon(
                                Icons.location_pin,
                                color: Colors.red,
                                size: 55,
                              ),
                              pinColor: Colors.blue,
                              context: context,
                              addressPlaceHolder:
                                  language!.lblPleasePickALocation,
                              addressTitle: "${language!.lblAddress}:",
                              apiKey: mapsKey,
                              appBarTitle: language!.lblPickAddress,
                              confirmButtonColor: Colors.blue,
                              confirmButtonText: language!.lblConfirm,
                              confirmButtonTextColor: Colors.black,
                              country: "in",
                              language: "en-us",
                              searchHint: language!.lblSearchHere,
                              initialLocation: LatLng(
                                  _store.currentPosition!.latitude,
                                  _store.currentPosition!.longitude),
                            );
                            addressCont.text = result.address;
                            _store.selectedLatLng = result.latlng;
                          },
                          validator: (s) {
                            if (s!.trim().isEmpty) {
                              return language!.lblAddressIsRequired;
                            }
                            return null;
                          },
                        ),
                        10.height,
                        TextFormField(
                          controller: cityCont,
                          focusNode: cityNode,
                          style: primaryTextStyle(),
                          decoration: editTextDecoration(
                              Icons.location_city_outlined, language!.lblCity),
                          cursorColor:
                              appStore.isDarkModeOn ? white : blackColor,
                          keyboardType: TextInputType.text,
                          validator: (s) {
                            if (s!.trim().isEmpty) {
                              return language!.lblCityIsRequired;
                            }
                            return null;
                          },
                        ),
                        10.height,
                        TextFormField(
                          controller: remarksCont,
                          focusNode: remarksNode,
                          style: primaryTextStyle(),
                          decoration: editTextDecoration(
                              Icons.receipt, language!.lblRemarks),
                          cursorColor:
                              appStore.isDarkModeOn ? white : blackColor,
                          keyboardType: TextInputType.name,
                          validator: (s) {
                            return null;
                          },
                        ),
                        10.height,
                        button(language!.lblSubmit, onTap: () async {
                          hideKeyboard(context);
                          if (_formKey.currentState!.validate()) {
                            var result = await _store.submitClient(
                                nameCont.text.trim(),
                                addressCont.text.trim(),
                                phoneNumberCont.text.trim(),
                                contactPersonCont.text.trim(),
                                emailCont.text.trim(),
                                cityCont.text.trim(),
                                remarksCont.text.trim(),
                                0.0,
                                0.0);
                            if (result) {
                              toast(language!.lblClientAdded);
                              if (!mounted) return;
                              finish(context);
                            }
                          }
                        })
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
