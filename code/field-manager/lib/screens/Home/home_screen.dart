import 'dart:async';

import 'package:fieldmanager_hrms_flutter/main.dart';
import 'package:fieldmanager_hrms_flutter/screens/Visits/visit_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:local_auth/local_auth.dart';
import 'package:location/location.dart';
import 'package:nb_utils/nb_utils.dart';
import 'package:local_auth_android/local_auth_android.dart';
import 'package:local_auth_ios/local_auth_ios.dart';
import '../../utils/app_colors.dart';
import '../../utils/app_constants.dart';
import '../../utils/app_images.dart';
import '../../utils/app_widgets.dart';
import 'home_store.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final HomeStore _store = HomeStore();
  final LocalAuthentication auth = LocalAuthentication();
  bool fingerPrint = false;
  bool authorized = false, _isAuthenticating = false;
  final LatLng _initialCameraPosition = const LatLng(20.5937, 78.9629);

  late LocationData _currentPosition;
  late GoogleMapController _controller;
  List<Marker> markers = [];
  var mMapType = MapType.normal;
  late String _darkMapStyle;
  late String _lightMapStyle;

  var now = DateTime.now();

  @override
  void initState() {
    super.initState();
    init();
    _loadMapStyles();
  }

  void init() async {
    _store.getData();
    _getAvailableBiometrics();
  }

  @override
  void dispose() {
    _controller.dispose();
    _store.locationSubscription.cancel();
    super.dispose();
  }

  updateMarkers(Set<Marker> markers) {
    this.markers = markers.toList();
  }

  Future<void> _getAvailableBiometrics() async {
    List<BiometricType> availableBiometrics =
        await auth.getAvailableBiometrics();
    try {
      fingerPrint = availableBiometrics.contains(BiometricType.fingerprint);
      setState(() {});
    } on PlatformException catch (e) {
      log(e);
    }
  }

  Future _authenticate() async {
    bool authenticated = false;
    try {
      setState(() {
        _isAuthenticating = true;
      });

      authenticated = await auth.authenticate(
          localizedReason: language!.lblScanYourFingerprintToCheckIn,

          authMessages: const<AuthMessages> [
            IOSAuthMessages(
              cancelButton: 'cancel',
              goToSettingsButton: 'Settings',
              goToSettingsDescription: 'Please set up your Touch ID.',
              lockOut: 'Please re-enable your Touch ID',
            ),
            AndroidAuthMessages(
                signInTitle: 'Fingerprint Authentication',
                //fingerprintRequiredTitle: "Connect to Login",
                cancelButton: 'Cancel',
                goToSettingsButton: 'Settings',
                goToSettingsDescription: 'Please set up your Touch ID.',
                biometricRequiredTitle:
                'Authenticate with fingerprint or password to proceed'
              //fingerprintSuccess: "Authentication Successfully authenticated",
            ),]
      );
      authorized = authenticated;

      setState(() {
        _isAuthenticating = false;
      });
    } on PlatformException catch (e) {
      log('Auth error$e');
    }
    if (!mounted) return false;

    setState(() {
      authorized = authenticated;
    });
  }

  void _onMapCreated(GoogleMapController controller) {
    _controller = controller;
    _setMapStyle();
    _store.locationSubscription =
        _store.locationService.onLocationChanged.listen((l) {
      _controller.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(target: LatLng(l.latitude!, l.longitude!), zoom: 15),
        ),
      );
    });
  }

  void getLocation() async {
    bool serviceEnabled;
    PermissionStatus permissionGranted;

    serviceEnabled = await _store.locationService.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await _store.locationService.requestService();
      if (!serviceEnabled) {
        return;
      }
    }

    permissionGranted = await _store.locationService.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await _store.locationService.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        return;
      }
    }

    _currentPosition = await _store.locationService.getLocation();
    _controller.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(
            target:
                LatLng(_currentPosition.latitude!, _currentPosition.longitude!),
            zoom: 15),
      ),
    );
  }

  Future _loadMapStyles() async {
    _darkMapStyle = await rootBundle.loadString('assets/map_styles/dark.json');
    _lightMapStyle =
        await rootBundle.loadString('assets/map_styles/light.json');
  }

  Future _setMapStyle() async {
    if (appStore.isDarkModeOn) {
      await _controller.setMapStyle(_darkMapStyle);
    } else {
      await _controller.setMapStyle(_lightMapStyle);
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.width;
    return Container(
      color: appStore.scaffoldBackground,
      child: Column(
        children: [
          SizedBox(
            height: screenHeight * 0.5,
            child: GoogleMap(
              initialCameraPosition:
                  CameraPosition(target: _initialCameraPosition),
              mapType: MapType.normal,
              minMaxZoomPreference: const MinMaxZoomPreference(0, 16),
              onMapCreated: _onMapCreated,
              myLocationEnabled: true,
              myLocationButtonEnabled: false,
              zoomControlsEnabled: false,
            ),
          ),
          SingleChildScrollView(
            child: Column(
              children: [
                Card(
                  shape: buildRoundedCorner(radius: 10),
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Observer(builder: (_) {
                          if (appStore.getCurrentStatus == null) {
                            return loadingWidgetMaker();
                          }
                          if (appStore.getCurrentStatus!.status != 'new') {
                            return Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Attendance Status',
                                  style: boldTextStyle(color: appColorPrimary),
                                ),
                                Text(
                                  'In at: ${appStore.getCurrentStatus!.checkInAt!.toString()}',
                                  style: secondaryTextStyle(),
                                ),
                                !appStore.getCurrentStatus!.checkOutAt
                                        .isEmptyOrNull
                                    ? Text(
                                        'Out at: ${appStore.getCurrentStatus!.checkInAt!.toString()}',
                                        style: secondaryTextStyle(),
                                      )
                                    : Container()
                              ],
                            );
                          }

                          return const Text('Check in to begin the day');
                        }),
                        AppButton(
                            color: opPrimaryColor,
                            textColor: Colors.white,
                            width: 40,
                            shapeBorder: buildButtonCorner(),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  'Check In',
                                  style: primaryTextStyle(color: white),
                                ),
                                5.width,
                                const Icon(Icons.login, color: white),
                              ],
                            ),
                            onTap: () async {})
                      ],
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Card(
                      shape: buildRoundedCorner(),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: SizedBox(
                          height: 80,
                          child: Row(
                            children: [
                              Image.asset(
                                appDistanceTravelledImg,
                                width: 55,
                              ),
                              5.width,
                              Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Distance Travelled',
                                    style:
                                        boldTextStyle(color: appColorPrimary),
                                  ),
                                  Text(
                                    '10 ${getStringAsync(appDistanceUnitPref)}',
                                    style: primaryTextStyle(
                                        color: appStore.textPrimaryColor),
                                  )
                                ],
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                    Card(
                      shape: buildRoundedCorner(),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: SizedBox(
                          height: 80,
                          width: 100,
                          child: Column(
                            children: [
                              const Icon(
                                Icons.add_a_photo_outlined,
                                size: 52,
                              ),
                              3.height,
                              Text(
                                'Add Visit',
                                style: primaryTextStyle(
                                    color: appColorPrimary, size: 15),
                              )
                            ],
                          ),
                        ),
                      ),
                    ).onTap(() => const VisitScreen().launch(context))
                  ],
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
