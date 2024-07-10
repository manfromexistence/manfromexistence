class APIRoutes {
  // BaseUrl to change
  // !!! Do not change the port while local testing "http://{internal_ip}:44317/api/V1/" !!!
  // !!! For live deployment just paste the Url like this "https://{your_website_url}/api/V1/" !!!

  static const baseURL = "http://192.168.29.157:44317/api/V1/";

  static const profileURL = '${baseURL}UserProfiles/';

  static const loginURL = '${baseURL}login';

  static const forgotPasswordURL = '${baseURL}forgotPassword';

  static const resetPasswordURL = '${baseURL}resetPassword';

  static const changePasswordURL = '${baseURL}changePassword';

  static const verifyOTPURL = '${baseURL}verifyOTP';

  static const phoneNumberCheckURL = "${baseURL}checkPhoneNumber";

  static const userNameCheckURL = "${baseURL}checkUsername";

  static const getScheduleURL = '${baseURL}getSchedule';

  static const addMessagingTokenURL = '${baseURL}messagingToken';

  //Visits
  static const createVisitURL = '${baseURL}visit/create';

  //Settings
  static const getAppSettings = '${baseURL}settings/getAppSettings';

  //Dashboard
  static const getDashboardData = '${baseURL}getDashboardData';

  //Leave
  static const getLeaveTypesURL = '${baseURL}getLeaveTypes';
  static const addLeaveRequest = '${baseURL}createLeaveRequest';
  static const uploadLeaveDocument = '${baseURL}uploadLeaveDocument';
  static const getLeaveRequests = '${baseURL}getLeaveRequests';
  static const deleteLeaveRequest = '${baseURL}deleteLeaveRequest';

  //Device
  static const checkDevice = '${baseURL}checkDevice';
  static const registerDevice = '${baseURL}registerDevice';
  static const updateDeviceStatus = '${baseURL}updateDeviceStatus';

  //Attendance
  static const checkInOut = '${baseURL}attendance/checkInOut';
  static const updateAttendanceStatus = '${baseURL}attendance/statusUpdate';
  static const checkAttendanceStatus = '${baseURL}attendance/checkStatus';
  static const getAttendanceStatus =
      '${baseURL}attendance/getAttendanceHistory';

  //Chat
  static const postChat = '${baseURL}chat/postChat';
  static const getChats = '${baseURL}chat/getChats';

  //Expense
  static const getExpenseTypes = '${baseURL}expense/getExpenseTypes';
  static const addExpenseRequest = '${baseURL}expense/createExpenseRequest';
  static const deleteExpenseRequest = '${baseURL}expense/deleteExpenseRequest';
  static const getExpenseRequest = '${baseURL}expense/getExpenseRequests';
  static const uploadExpenseDocument =
      '${baseURL}expense/uploadExpenseDocument';

  //Client
  static const getClients = '${baseURL}client/getAllClients';
  static const clientsSearch = '${baseURL}client/search';
  static const addClient = '${baseURL}client/create';

  //SignBoard
  static const addSignBoardRequest = '${baseURL}signBoard/createRequest';
}
