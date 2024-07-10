import 'package:fieldmanager_hrms_flutter/main.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_constants.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:url_launcher/url_launcher.dart';

import '../models/Client/client_model.dart';
import '../utils/app_colors.dart';
import '../utils/app_widgets.dart';

class ClientDetails extends StatefulWidget {
  final ClientModel client;
  const ClientDetails({Key? key, required this.client}) : super(key: key);

  @override
  State<ClientDetails> createState() => _ClientDetailsState();
}

class _ClientDetailsState extends State<ClientDetails> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            language!.lblName,
            style: boldTextStyle(),
          ),
          Text(widget.client.name.toString()),
          divider().paddingOnly(top: 5, bottom: 5),
          Text(
            language!.lblContactPerson,
            style: boldTextStyle(),
          ),
          Text(widget.client.contactPerson.toString()),
          divider().paddingOnly(top: 5, bottom: 5),
          Text(
            language!.lblPhoneNumber,
            style: boldTextStyle(),
          ),
          Text(widget.client.phoneNumber.toString()),
          divider().paddingOnly(top: 5, bottom: 5),
          Text(
            language!.lblEmail,
            style: boldTextStyle(),
          ),
          Text(widget.client.email.toString()),
          divider().paddingOnly(top: 5, bottom: 5),
          Text(
            language!.lblCity,
            style: boldTextStyle(),
          ),
          Text(widget.client.city.toString()),
          divider().paddingOnly(top: 5, bottom: 5),
          Text(
            'Status',
            style: boldTextStyle(),
          ),
          Text(widget.client.status.toString()),
          divider().paddingOnly(top: 5, bottom: 5),
          Text(
            'Created On',
            style: boldTextStyle(),
          ),
          Text(widget.client.createdAt.toString()),
          divider().paddingOnly(top: 5, bottom: 5),
          10.height,
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              AppButton(
                  color: opPrimaryColor,
                  textColor: Colors.white,
                  shapeBorder: buildButtonCorner(),
                  width: 30,
                  child: Row(
                    children: [
                      const Icon(
                        Icons.call,
                        color: white,
                      ),
                      5.width,
                      Text(
                        'Call now',
                        style: primaryTextStyle(color: white),
                      )
                    ],
                  ),
                  onTap: () {
                    launchUrl(Uri(
                        scheme: 'tel',
                        path:
                            '+${getStringAsync(appCountryPhoneCodePref)}${widget.client.phoneNumber}'));
                  }),
              AppButton(
                  color: opPrimaryColor,
                  textColor: Colors.white,
                  shapeBorder: buildButtonCorner(),
                  width: 30,
                  child: const Icon(
                    Icons.close,
                    color: white,
                  ),
                  onTap: () {
                    finish(context);
                  }),
            ],
          )
        ],
      ),
    );
  }
}
