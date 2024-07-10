import 'package:fieldmanager_hrms_flutter/main.dart';
import 'package:fieldmanager_hrms_flutter/models/Client/client_model.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobx/mobx.dart';

part 'visit_store.g.dart';

class VisitStore = VisitStoreBase with _$VisitStore;

abstract class VisitStoreBase with Store {
  @observable
  bool isLoading = false;

  Position? position;

  @observable
  String clientLabel = language!.lblClient;

  @observable
  bool isClientsExists = true;

  @observable
  ClientModel? selectedClient;

  Future<Position> _determinePosition() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Permissions are denied forever, handle appropriately.
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    return await Geolocator.getCurrentPosition();
  }

  Future init() async {
    isLoading = true;

    /* var result = await apiRepo.getClients();
    if (result.isNotEmpty) {
      isClientsExists = true;
      selectedClient = result.first;
    } else {
      isClientsExists = false;
    }*/

    isLoading = false;
  }

  @action
  Future<bool> submit(String filePath, String comments, String clientId) async {
    isLoading = true;

    Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);

    var address = true
        ? null
        : await mapHelper
            .getAddress(LatLng(position.latitude, position.longitude));

    var req = {
      "clientId": selectedClient!.id.toString(),
      "remarks": comments,
      "latitude": position.latitude.toString(),
      "longitude": position.longitude.toString(),
      "address": address ?? ""
    };

    var result = await apiRepo.createVisit(req, filePath);
    isLoading = false;
    return result;
  }
}
