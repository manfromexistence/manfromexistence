import 'package:fieldmanager_hrms_flutter/components/dashboard/greeting_component.dart';
import 'package:fieldmanager_hrms_flutter/components/dashboard/live_attendance_component.dart';
import 'package:fieldmanager_hrms_flutter/components/dashboard/shifts_component.dart';
import 'package:fieldmanager_hrms_flutter/main.dart';
import 'package:fieldmanager_hrms_flutter/utils/app_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../components/dashboard/attendanceInfoComponent.dart';
import '../../components/dashboard/distance_travelled_component.dart';
import '../../components/dashboard/expense_info_component.dart';
import 'DashboardStore.dart';

class DashboardScreen extends StatefulWidget {
  static String tag = '/DashboardScreen';
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final DashboardStore _store = DashboardStore();

  @override
  void initState() {
    super.initState();
    init();
  }

  void init() async {
    _store.getData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const GreetingComponent(),
            Observer(
                builder: (_) => Column(
                      children: [
                        _store.isLoading
                            ? buildShimmer(90, context.width())
                            : ShiftsComponent(
                                scheduleTime:
                                    _store.dashboardModel.scheduleTime!,
                                scheduleWeeks:
                                    _store.dashboardModel.scheduleWeeks!),
                        7.height,
                        Observer(
                            builder: (_) => appStore.getCurrentStatus!.status !=
                                        null &&
                                    appStore.getCurrentStatus!.status != "new"
                                ? _store.isLoading
                                    ? buildShimmer(90, context.width())
                                    : Column(
                                        children: [
                                          const LiveAttendanceComponent(),
                                          7.height,
                                        ],
                                      )
                                : Container()),
                        SizedBox(
                          height: 150,
                          child: Row(
                            children: [
                              _store.isLoading
                                  ? buildShimmer(132, 120)
                                  : DistanceTravelledComponent(
                                      travelled:
                                          _store.dashboardModel.travelled ??
                                              '0'),
                              _store.isLoading
                                  ? buildShimmer(132, context.width() - 142)
                                  : ExpenseInfoComponent(
                                      approved:
                                          _store.dashboardModel.approved ?? 0,
                                      pending:
                                          _store.dashboardModel.pending ?? 0,
                                      rejected:
                                          _store.dashboardModel.rejected ?? 0)
                            ],
                          ),
                        ),
                        7.height,
                        _store.isLoading
                            ? buildShimmer(
                                context.height() - 40, context.width())
                            : AttendanceInfoComponent(
                                presentDays:
                                    _store.dashboardModel.presentDays ?? 0,
                                halfDays: _store.dashboardModel.halfDays ?? 0,
                                absentDays:
                                    _store.dashboardModel.absentDays ?? 0,
                                weekOffDays:
                                    _store.dashboardModel.weekOffDays ?? 0,
                                onLeaveDays:
                                    _store.dashboardModel.onLeaveDays ?? 0,
                                availableLeaveCount:
                                    _store.dashboardModel.availableLeaveCount ??
                                        0),
                        7.height,
                      ],
                    ))
          ],
        ),
      ),
    ));
  }
}
