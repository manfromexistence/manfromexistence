import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:mobx/mobx.dart';
import 'package:nb_utils/nb_utils.dart';

import '../../main.dart';
import '../../models/Client/client_model.dart';

part 'client_store.g.dart';

class ClientStore = ClientStoreBase with _$ClientStore;

abstract class ClientStoreBase with Store {
  static const pageSize = 20;

  final PagingController<int, ClientModel> pagingController =
      PagingController(firstPageKey: 0);

  @observable
  bool isLoading = false;

  String? currentAddress;

  Position? currentPosition;

  List<ClientModel> clients = [];

  LatLng? selectedLatLng;

  init() {
    pagingController.addPageRequestListener((pageKey) {
      loadClients(pageKey);
    });
  }

  Future loadClients(int pageKey) async {
    isLoading = true;
    try {
      var result = await apiRepo.getClientsWithSkipTake(pageKey, pageSize);

      if (result != null) {
        clients = result.clients;
        final isLastPage = result.totalCount < pageSize;
        if (isLastPage) {
          pagingController.appendLastPage(clients);
        } else {
          final nextPageKey = pageKey + clients.length;
          pagingController.appendPage(clients, nextPageKey);
        }
      }
    } catch (e) {
      pagingController.error = e;
    }

    isLoading = false;
  }

  Future<void> getCurrentPosition() async {
    isLoading = true;
    await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high)
        .then((Position position) {
      currentPosition = position;
    }).catchError((e) {
      log(e);
    });

    isLoading = false;
  }

  Future<bool> submitClient(
      String name,
      String address,
      String phoneNumber,
      String contactPerson,
      String email,
      String city,
      String remarks,
      double lat,
      double lng) async {
    isLoading = true;

    Map req = {
      "name": name,
      "address": address,
      "phoneNumber": phoneNumber,
      "contactPerson": contactPerson,
      "email": email,
      "city": city,
      "latitude": selectedLatLng!.latitude,
      "longitude": selectedLatLng!.longitude,
      "remarks": remarks
    };
    var result = await apiRepo.createClient(req);

    isLoading = false;
    return result;
  }
}
