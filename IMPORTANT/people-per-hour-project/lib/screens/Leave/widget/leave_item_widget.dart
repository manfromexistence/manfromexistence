import 'package:fieldmanager_hrms_flutter/models/leave_request_model.dart';
import 'package:flutter/material.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../../utils/app_widgets.dart';

class LeaveItemWidget extends StatelessWidget {
  final int index;
  final LeaveRequestModel model;
  final Function(BuildContext) deleteAction;
  const LeaveItemWidget(
      {super.key,
      required this.index,
      required this.model,
      required this.deleteAction});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onLongPress: () {
        deleteAction(context);
      },
      child: Card(
        elevation: 5,
        shape: buildCardCorner(),
        color: model.status.toString().toLowerCase() == 'approved'
            ? Colors.green.shade400
            : model.status.toString().toLowerCase() == 'rejected'
                ? Colors.red.shade400
                : Colors.orange.shade400,
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
                    model.leaveType!,
                    style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 20,
                        color: Colors.white),
                  ),
                  Text(
                    'Applied On: ${model.createdOn}',
                    style: secondaryTextStyle(color: white),
                  ),
                  const SizedBox(height: 15),
                  Text(
                    'Duration:',
                    style: boldTextStyle(color: white),
                  ),
                  Text(
                    '${model.fromDate} to ${model.toDate}',
                    style: secondaryTextStyle(color: white),
                  ),
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
                              model.status.toString(),
                              style: TextStyle(
                                  fontSize: 15,
                                  color: model.status
                                              .toString()
                                              .toLowerCase() ==
                                          'approved'
                                      ? Colors.green.shade300
                                      : model.status.toString().toLowerCase() ==
                                              'rejected'
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
      ),
    );
  }
}
