import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapsAddressResultModel {
  LatLng latlng;
  String address;

  MapsAddressResultModel({required this.latlng, required this.address});
}
