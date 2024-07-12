import 'package:fieldmanager_hrms_flutter/models/Client/client_model.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../../Utils/app_widgets.dart';

class ClientCardWidget extends StatelessWidget {
  final int index;
  final ClientModel client;
  final Function(BuildContext) onTap;
  const ClientCardWidget(
      {super.key,
      required this.client,
      required this.index,
      required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      shape: buildCardCorner(),
      color: Colors.green.shade400,
      child: Padding(
        padding: const EdgeInsets.all(15.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  client.name!,
                  style: const TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 20,
                      color: Colors.white),
                ),
                const SizedBox(height: 10),
                Text(
                  'City: ${client.city}',
                  style: secondaryTextStyle(color: white),
                ),
                const SizedBox(height: 3),
                Text(
                  'Contact Person: ${client.contactPerson}',
                  style: secondaryTextStyle(color: white),
                ),
                const SizedBox(height: 3),
                Text(
                  'Email: ${client.email}',
                  style: secondaryTextStyle(color: white),
                ),
                const SizedBox(height: 15),
                /* Row(
                  children: [
                    Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Claimed:',
                          style: boldTextStyle(color: white),
                        ),
                        Text(
                          '${getStringAsync(appCurrencySymbolPref)}',
                          style: secondaryTextStyle(color: white),
                        ),
                      ],
                    ),
                    10.width,
                    Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Approved:',
                          style: boldTextStyle(color: white),
                        ),
                        Text(
                          '${getStringAsync(appCurrencySymbolPref)}',
                          style: secondaryTextStyle(color: white),
                        ),
                      ],
                    ),
                  ],
                )*/
              ],
            ),
            Column(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.all(
                    Radius.circular(5.0),
                  ),
                  child: Container(
                    decoration: const BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.all(
                        Radius.circular(5.0),
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(5, 5, 5, 5),
                      child: Row(
                        children: [
                          Text(
                            client.status.toString(),
                            style: TextStyle(
                                fontSize: 15,
                                color: client.status.toString().toLowerCase() ==
                                        'active'
                                    ? Colors.green.shade300
                                    : client.status.toString().toLowerCase() ==
                                            'inactive'
                                        ? Colors.red.shade300
                                        : Colors.orange.shade300,
                                fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    ).onTap(() => onTap(context));
  }
}
