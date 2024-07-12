import 'package:fieldmanager_hrms_flutter/Utils/app_widgets.dart';
import 'package:flutter/material.dart';

class AboutAppScreen extends StatefulWidget {
  const AboutAppScreen({super.key});

  @override
  State<AboutAppScreen> createState() => _AboutAppScreenState();
}

class _AboutAppScreenState extends State<AboutAppScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(context, 'About App'),
      body: const Center(
        child: Text('Code with  love by CZ APP STUDIO'),
      ),
    );
  }
}
