import 'package:fieldmanager_hrms_flutter/Utils/app_widgets.dart';
import 'package:fieldmanager_hrms_flutter/main.dart';
import 'package:flutter/material.dart';

class VisitHistoryScreen extends StatefulWidget {
  const VisitHistoryScreen({super.key});

  @override
  State<VisitHistoryScreen> createState() => _VisitHistoryScreenState();
}

class _VisitHistoryScreenState extends State<VisitHistoryScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, language!.lblVisitHistory),
      body: const Center(
        child: Text('History'),
      ),
    );
  }
}
