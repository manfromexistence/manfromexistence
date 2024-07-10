import 'package:background_location_tracker/background_location_tracker.dart';
import 'package:nb_utils/nb_utils.dart';

class Repo {
  static Repo? _instance;

  Repo._();

  factory Repo() => _instance ??= Repo._();

  Future<void> update(BackgroundLocationUpdateData data) async {
    await LocationDao().saveLocation(data);
  }
}

class LocationDao {
  static const _latKey = 'latitude';
  static const _lonKey = 'longitude';
  static const _countKey = 'loccount';

  static LocationDao? _instance;

  LocationDao._();

  factory LocationDao() => _instance ??= LocationDao._();

  SharedPreferences? _prefs;

  Future<SharedPreferences> get prefs async =>
      _prefs ??= await SharedPreferences.getInstance();

  Future<void> saveLocation(BackgroundLocationUpdateData data) async {
    await (await prefs).setDouble(_latKey, data.lat);
    await (await prefs).setDouble(_lonKey, data.lon);
    await (await prefs).setInt(_countKey, await getCount());
  }

  Future<int> getCount() async {
    final prefs = await this.prefs;
    await prefs.reload();
    final count = prefs.getInt(_countKey);
    if (count == null) {
      return 0;
    } else {
      return count + 1;
    }
  }
}
