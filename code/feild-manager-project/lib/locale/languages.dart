import 'package:flutter/material.dart';

abstract class BaseLanguage {
  static BaseLanguage of(BuildContext context) =>
      Localizations.of<BaseLanguage>(context, BaseLanguage)!;

  //Long words

  String get lblDoYouWantToLogoutFromTheApp;

  String get lblAreYouSureYouWantToDelete;

  String get lblLanguageChanged;

  String get lblLoggedOutSuccessfully;

  String get lblCommentsIsRequired;

  String get lblVerificationFailedPleaseTryAgain;

  String get lblThisDeviceIsNotRegisteredClickOnRegisterToAddItToYourAccount;

  String
      get lblThisDeviceIsAlreadyRegisteredWithOtherAccountPleaseContactAdministrator;

  String get lblEnterYourPhoneNumberToSendAnOTP;

  String
      get lblWeHaveSendA4DigitVerificationCodeToYourPhonePleaseEnterTheCodeBelowTtoVerifyItsYou;

  String get lblPasswordSuccessfullyChanged;

  String get lblPleaseAllowAllTheTimeInSettings;

  String get lblPleaseEnableAllowAllTheTimeInSettings;

  String get lblPleaseEnablePhysicalActivityPermissionInSettings;

  String get lblToEnableAutomaticAttendance;

  String get lblToTrackTheDistanceTravelled;

  String get lblToMarkClientVisits;

  String get lblToProcessTheSalary;

  String
      get lblLocationWillBeTrackedTnTheBackgroundAndAlsoEvenWhenTheAppIsClosedOrNotInUse;

  String
      get lblImportantGiveLocationAccuracyToPreciseAndAllowAllTheTimeSoThatTheAppCanFunctionProperly;

  String get lblCollectsPhysicalActivityData;

  String get lblToCheckTheDeviceStateToEnableTrackingWhenTravelling;

  String get lblYourAccountIsBanned;

  String get lblEnableAutoStart;

  String get lblFollowTheStepsAndEnableTheAutoStartOfThisApp;

  String get lblYourDeviceHasAdditionalBatteryOptimization;

  String
      get lblFollowTheStepsAndDisableTheOptimizationsToAllowSmoothFunctioningOfThisApp;

  String get lblAreYouSureYouWantToCheckOut;

  String get lblLoadingPleaseWait;

  String get lblPleaseSetUpYourTouchId;

  String get lblPleaseReEnableYourTouchId;

  String get lblAuthenticateWithFingerprintOrPasswordToProceed;

  String get lblFingerprintOrPinVerificationIsRequiredForCheckInAndOut;

  String get lblCityIsRequired;

  String get lblAddressIsRequired;

  String get lblPleasePickALocation;

  String get lblContactPersonNameIsRequired;

  String get lblPhoneNumberIsRequired;

  String get lblNameIsRequired;

  String get lblClientAdded;

  String get lblRemarksIsRequired;

  String get lblAmountIsRequired;

  String get lblSomethingWentWrongWhileUploadingTheFile;

  String get lblPleaseAllowMotionTracking;

  String get lblTrackingStartedAt;

  String get lblActivityCount;

  String get lblLocationCount;

  String get lblLastLocation;

  String get lblRefresh;

  String get lblDeviceStatusUpdateInterval;

  String get lblBackgroundServiceStatus;

  String get lblBackgroundLocationTracker;

  String get lblDeviceStatus;

  String get lblRunning;

  String get lblStopped;

  String get lblRefreshAppConfiguration;

  String get lblSettingsRefreshed;

  //Ends

  String get lblEnterValidDate;

  String get lblEnterDateInValidRange;

  String get lblYouCannotSelectOlderDates;

  String get lblLeaveTo;

  String get lblPleaseTryAgainLater;

  String get lblPleaseTryAgain;

  String get lblLeaveFrom;

  String get lblChoose;

  String get lblFromDate;

  String get lblClaimed;

  String get lblYou;

  String get lblYourAccountIsActive;

  String get lblBanned;

  String get lblYouReBanned;

  String get lblKindlyContactAdministrator;

  String get lblPleaseTypAMessageFirst;

  String get lblOpenSecuritySettings;

  String get lblFingerprintAuthentication;

  String get lblCancel;

  String get lblTodayAttendance;

  String get lblNotifications;

  String get lblRegisterNow;

  String get lblSun;

  String get lblMon;

  String get lblTue;

  String get lblWed;

  String get lblThu;

  String get lblFri;

  String get lblSat;

  String get lblVerified;

  String get lblSearchByAddress;

  String get lblAllSet;

  String get lblActivityAccess;

  String get lblCollectsLocationData;

  String get lblNewPassword;

  String get lblPasswordIsRequired;

  String get lblSendOTP;

  String get lblVerifyOTP;

  String get lblChange;

  String get lblInvalidPassword;

  String get lblExpenseType;

  String get lblNoMessages;

  String get lblTypeYourMessage;

  String get lblPickAddress;

  String get lblConfirm;

  String get lblSearchHere;

  String get lblCheckOut;

  String get lblVerifyIdentity;

  String get lblScanYourFingerprintToCheckIn;

  String get lblAreYouSureYouWantToCheckIn;

  String get lblAllDoneForToday;

  String get lblClient;

  String get lblVerificationFailed;

  String get lblVerificationPending;

  String get lblYourDeviceVerificationIsPending;

  String get lblNewDevice;

  String get lblVisits;

  String get lblImageIsRequired;

  String get lblSubmittedSuccessfully;

  String get lblToday;

  String get lblExpenseStatus;

  String get lblAttendanceInAt;

  String get lblAttendanceOutAt;

  String get lblNoRequests;

  String get lblPrivacyPolicy;

  String get lblLeave;

  String get lblChangeLanguage;

  //Login
  String get lblLogin;

  String get lblSignIn;

  String get lblSignOut;

  String get lblUserName;

  String get lblPassword;

  String get lblRememberMe;

  String get lblForgotPassword;

  String get lblVerification;

  String get lblAccount;

  String get lblDarkMode;

  String get lblNotification;

  String get lblArabic;

  String get lblEnglish;
  //Other

  String get lblDocumentation;

  String get lblChangeLog;

  String get lblShareApp;

  String get lblRateUs;

  String get lblSettings;

  String get lblLanguage;

  String get lblSupportLanguage;

  String get lblDefaultTheme;

  String get lblDashboard;

  String get lblSetupConfiguration;

  String get lblVersionHistory;

  String get lblShareWithFriends;

  String get lblRateGooglePlayStore;

  String get lblContactUs;

  String get lblGetInTouchWithUs;

  String get lblAboutUs;

  String get lblVersion;

  String get lblAboutUsDescription;

  String get lblHome;

  String get lblAttendanceStatus;

  String get lblCheckInToBegin;

  String get lblCheckIn;

  String get lblExpense;

  String get lblCreateExpense;

  String get lblDate;

  String get lblLeaveType;

  String get lblAmount;

  String get lblRemarks;

  String get lblChooseImage;

  String get lblSubmit;

  String get lblGoodMorning;

  String get lblName;

  String get lblTodayDate;

  String get lblShift;

  String get lblAttendanceInformation;

  String get lblKM;

  String get lblDays;

  String get lblPresent;

  String get lblHalfDay;

  String get lblAbsent;

  String get lblWeeklyOff;

  String get lblOnLeave;

  String get lblAvailableLeave;

  String get lblDistance;

  String get lblTravelled;

  String get lblApproved;

  String get lblPending;

  String get lblRejected;

  String get lblLeaveRequest;

  String get lblFrom;

  String get lblTo;

  String get lblNoRequest;

  String get lblComments;

  String get lblClients;

  String get lblCreateClient;

  String get lblEmail;

  String get lblPhoneNumber;

  String get lblContactPerson;

  String get lblAddress;

  String get lblCity;

  String get lblLogout;

  String get lblClickToAddImage;

  String get lblUsername;

  String get lblByLoggingInYouAreAgreedToThePrivacyPolicy;

  String get lblClickHereToReadPrivacyPolicy;

  String get lblDeviceVerification;

  String get lblVerificationCompleted;

  String get lblYourDeviceVerificationIsSuccessfullyCompleted;

  String get lblOk;

  String get lblWelcomeBack;

  String get lblLocationAccess;

  String get lblVerifying;

  String get lblPleaseWait;

  String get lblEnablePermission;

  String get lblLogOut;

  String get lblConfirmation;

  String get lblYes;

  String get lblNo;

  String get lblSuccessfullyCheckIn;

  String get lblMarkVisit;

  String get lblVisitHistory;

  String get lblRequestSuccessfullySubmitted;

  String get lblChats;

  String get lblSuccessfullyCheckOut;

  String get lblHoldOn;

  String get lblNote;
}
