import 'dart:convert';
import 'dart:developer';

import 'package:fieldmanager_hrms_flutter/utils/app_constants.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;

class MapHelper {
  Future<String?> getAddress(LatLng? location) async {
    try {
      final endpoint =
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.latitude},${location?.longitude}'
          '&key=$mapsKey&language=en';

      final response = jsonDecode((await http.get(
        Uri.parse(endpoint),
      ))
          .body);

      return response['results'][0]['formatted_address'];
      /*  setState(() {

      _shortName =
            response['results'][0]['address_components'][1]['long_name'];
      }); */
    } catch (e) {
      log('Unable to get address$e');
    }
    return null;
  }
}
