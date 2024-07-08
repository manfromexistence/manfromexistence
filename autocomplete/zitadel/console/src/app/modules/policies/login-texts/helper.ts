import { SetCustomLoginTextsRequest as AdminSetCustomLoginTextsRequest } from 'src/app/proto/generated/zitadel/admin_pb';
import { SetCustomLoginTextsRequest } from 'src/app/proto/generated/zitadel/management_pb';
import {
  EmailVerificationDoneScreenText,
  EmailVerificationScreenText,
  ExternalRegistrationUserOverviewScreenText,
  ExternalUserNotFoundScreenText,
  FooterText,
  InitializeUserDoneScreenText,
  InitializeUserScreenText,
  InitMFADoneScreenText,
  InitMFAOTPScreenText,
  InitMFAPromptScreenText,
  InitMFAU2FScreenText,
  InitPasswordDoneScreenText,
  InitPasswordScreenText,
  LinkingUserDoneScreenText,
  LinkingUserPromptScreenText,
  LoginScreenText,
  LogoutDoneScreenText,
  MFAProvidersText,
  PasswordChangeDoneScreenText,
  PasswordChangeScreenText,
  PasswordlessPromptScreenText,
  PasswordlessRegistrationDoneScreenText,
  PasswordlessRegistrationScreenText,
  PasswordlessScreenText,
  PasswordResetDoneScreenText,
  PasswordScreenText,
  RegistrationOptionScreenText,
  RegistrationOrgScreenText,
  RegistrationUserScreenText,
  SelectAccountScreenText,
  SuccessLoginScreenText,
  UsernameChangeDoneScreenText,
  UsernameChangeScreenText,
  VerifyMFAOTPScreenText,
  VerifyMFAU2FScreenText,
} from 'src/app/proto/generated/zitadel/text_pb';

type Req = AdminSetCustomLoginTextsRequest | SetCustomLoginTextsRequest;
type Map = AdminSetCustomLoginTextsRequest.AsObject | SetCustomLoginTextsRequest.AsObject;

export function mapRequestValues(map: Partial<Map>, req: Req): Req {
  const r0 = new EmailVerificationDoneScreenText();
  r0.setCancelButtonText(map.emailVerificationDoneText?.cancelButtonText ?? '');
  r0.setDescription(map.emailVerificationDoneText?.description ?? '');
  r0.setLoginButtonText(map.emailVerificationDoneText?.loginButtonText ?? '');
  r0.setNextButtonText(map.emailVerificationDoneText?.nextButtonText ?? '');
  r0.setTitle(map.emailVerificationDoneText?.title ?? '');
  req.setEmailVerificationDoneText(r0);

  const r1 = new EmailVerificationScreenText();
  r1.setCodeLabel(map.emailVerificationText?.codeLabel ?? '');
  r1.setDescription(map.emailVerificationText?.description ?? '');
  r1.setNextButtonText(map.emailVerificationText?.nextButtonText ?? '');
  r1.setResendButtonText(map.emailVerificationText?.resendButtonText ?? '');
  r1.setTitle(map.emailVerificationText?.title ?? '');
  req.setEmailVerificationText(r1);

  const r2 = new ExternalUserNotFoundScreenText();
  r2.setAutoRegisterButtonText(map.externalUserNotFoundText?.autoRegisterButtonText ?? '');
  r2.setDescription(map.externalUserNotFoundText?.description ?? '');
  r2.setLinkButtonText(map.externalUserNotFoundText?.linkButtonText ?? '');
  r2.setTitle(map.externalUserNotFoundText?.title ?? '');
  r2.setTosAndPrivacyLabel(map.externalUserNotFoundText?.tosAndPrivacyLabel ?? '');
  r2.setTosConfirm(map.externalUserNotFoundText?.tosConfirm ?? '');
  r2.setPrivacyConfirm(map.externalUserNotFoundText?.privacyConfirm ?? '');
  r2.setTosLinkText(map.externalUserNotFoundText?.tosLinkText ?? '');
  r2.setPrivacyLinkText(map.externalUserNotFoundText?.privacyLinkText ?? '');
  req.setExternalUserNotFoundText(r2);

  const r3 = new FooterText();
  r3.setHelp(map.footerText?.help ?? '');
  r3.setPrivacyPolicy(map.footerText?.privacyPolicy ?? '');
  r3.setTos(map.footerText?.tos ?? '');
  r3.setSupportEmail(map.footerText?.supportEmail ?? '');
  req.setFooterText(r3);

  const r4 = new InitMFADoneScreenText();
  r4.setCancelButtonText(map.initMfaDoneText?.cancelButtonText ?? '');
  r4.setDescription(map.initMfaDoneText?.description ?? '');
  r4.setNextButtonText(map.initMfaDoneText?.nextButtonText ?? '');
  r4.setTitle(map.initMfaDoneText?.title ?? '');
  req.setInitMfaDoneText(r4);

  const r5 = new InitMFAOTPScreenText();
  r5.setCancelButtonText(map.initMfaOtpText?.cancelButtonText ?? '');
  r5.setCodeLabel(map.initMfaOtpText?.codeLabel ?? '');
  r5.setDescription(map.initMfaOtpText?.description ?? '');
  r5.setDescriptionOtp(map.initMfaOtpText?.descriptionOtp ?? '');
  r5.setNextButtonText(map.initMfaOtpText?.nextButtonText ?? '');
  r5.setSecretLabel(map.initMfaOtpText?.secretLabel ?? '');
  r5.setTitle(map.initMfaOtpText?.title ?? '');
  req.setInitMfaOtpText(r5);

  const r6 = new InitMFAPromptScreenText();
  r6.setDescription(map.initMfaPromptText?.description ?? '');
  r6.setNextButtonText(map.initMfaPromptText?.nextButtonText ?? '');
  r6.setOtpOption(map.initMfaPromptText?.otpOption ?? '');
  r6.setSkipButtonText(map.initMfaPromptText?.skipButtonText ?? '');
  r6.setTitle(map.initMfaPromptText?.title ?? '');
  r6.setU2fOption(map.initMfaPromptText?.u2fOption ?? '');
  req.setInitMfaPromptText(r6);

  const r7 = new InitMFAU2FScreenText();
  r7.setDescription(map.initMfaU2fText?.description ?? '');
  r7.setErrorRetry(map.initMfaU2fText?.errorRetry ?? '');
  r7.setNotSupported(map.initMfaU2fText?.notSupported ?? '');
  r7.setRegisterTokenButtonText(map.initMfaU2fText?.registerTokenButtonText ?? '');
  r7.setTitle(map.initMfaU2fText?.title ?? '');
  r7.setTokenNameLabel(map.initMfaU2fText?.tokenNameLabel ?? '');
  req.setInitMfaU2fText(r7);

  const r8 = new InitPasswordDoneScreenText();
  r8.setCancelButtonText(map.initPasswordDoneText?.cancelButtonText ?? '');
  r8.setDescription(map.initPasswordDoneText?.description ?? '');
  r8.setNextButtonText(map.initPasswordDoneText?.nextButtonText ?? '');
  r8.setTitle(map.initPasswordDoneText?.title ?? '');
  req.setInitPasswordDoneText(r8);

  const r9 = new InitPasswordScreenText();
  r9.setCodeLabel(map.initPasswordText?.codeLabel ?? '');
  r9.setDescription(map.initPasswordText?.description ?? '');
  r9.setNewPasswordConfirmLabel(map.initPasswordText?.newPasswordConfirmLabel ?? '');
  r9.setNewPasswordLabel(map.initPasswordText?.newPasswordLabel ?? '');
  r9.setNextButtonText(map.initPasswordText?.nextButtonText ?? '');
  r9.setResendButtonText(map.initPasswordText?.resendButtonText ?? '');
  r9.setTitle(map.initPasswordText?.title ?? '');
  req.setInitPasswordText(r9);

  const r10 = new InitializeUserDoneScreenText();
  r10.setCancelButtonText(map.initializeDoneText?.cancelButtonText ?? '');
  r10.setDescription(map.initializeDoneText?.description ?? '');
  r10.setNextButtonText(map.initializeDoneText?.nextButtonText ?? '');
  r10.setTitle(map.initializeDoneText?.title ?? '');
  req.setInitializeDoneText(r10);

  const r11 = new InitializeUserScreenText();
  r11.setCodeLabel(map.initializeUserText?.codeLabel ?? '');
  r11.setDescription(map.initializeUserText?.description ?? '');
  r11.setNewPasswordConfirmLabel(map.initializeUserText?.newPasswordConfirmLabel ?? '');
  r11.setNewPasswordLabel(map.initializeUserText?.newPasswordLabel ?? '');
  r11.setNextButtonText(map.initializeUserText?.nextButtonText ?? '');
  r11.setResendButtonText(map.initializeUserText?.resendButtonText ?? '');
  r11.setTitle(map.initializeUserText?.title ?? '');

  req.setInitializeUserText(r11);

  const r12 = new LinkingUserDoneScreenText();
  r12.setCancelButtonText(map.linkingUserDoneText?.cancelButtonText ?? '');
  r12.setDescription(map.linkingUserDoneText?.description ?? '');
  r12.setNextButtonText(map.linkingUserDoneText?.nextButtonText ?? '');
  r12.setTitle(map.linkingUserDoneText?.title ?? '');
  req.setLinkingUserDoneText(r12);

  const r13 = new LoginScreenText();
  r13.setDescription(map.loginText?.description ?? '');
  r13.setDescriptionLinkingProcess(map.loginText?.descriptionLinkingProcess ?? '');
  r13.setExternalUserDescription(map.loginText?.externalUserDescription ?? '');
  r13.setLoginNameLabel(map.loginText?.loginNameLabel ?? '');
  r13.setLoginNamePlaceholder(map.loginText?.loginNamePlaceholder ?? '');
  r13.setNextButtonText(map.loginText?.nextButtonText ?? '');
  r13.setRegisterButtonText(map.loginText?.registerButtonText ?? '');
  r13.setTitle(map.loginText?.title ?? '');
  r13.setTitleLinkingProcess(map.loginText?.titleLinkingProcess ?? '');
  r13.setUserMustBeMemberOfOrg(map.loginText?.userMustBeMemberOfOrg ?? '');
  r13.setUserNamePlaceholder(map.loginText?.userNamePlaceholder ?? '');
  req.setLoginText(r13);

  const r14 = new LogoutDoneScreenText();
  r14.setDescription(map.logoutText?.description ?? '');
  r14.setLoginButtonText(map.logoutText?.loginButtonText ?? '');
  r14.setTitle(map.logoutText?.title ?? '');
  req.setLogoutText(r14);

  const r15 = new MFAProvidersText();
  r15.setChooseOther(map.mfaProvidersText?.chooseOther ?? '');
  r15.setOtp(map.mfaProvidersText?.otp ?? '');
  r15.setU2f(map.mfaProvidersText?.u2f ?? '');
  req.setMfaProvidersText(r15);

  const r16 = new PasswordChangeDoneScreenText();
  r16.setDescription(map.passwordChangeDoneText?.description ?? '');
  r16.setNextButtonText(map.passwordChangeDoneText?.nextButtonText ?? '');
  r16.setTitle(map.passwordChangeDoneText?.title ?? '');
  req.setPasswordChangeDoneText(r16);

  const r17 = new PasswordChangeScreenText();
  r17.setDescription(map.passwordChangeText?.description ?? '');
  r17.setNextButtonText(map.passwordChangeText?.nextButtonText ?? '');
  r17.setTitle(map.passwordChangeText?.title ?? '');
  r17.setNewPasswordLabel(map.passwordChangeText?.newPasswordLabel ?? '');
  r17.setNewPasswordConfirmLabel(map.passwordChangeText?.newPasswordConfirmLabel ?? '');
  r17.setCancelButtonText(map.passwordChangeText?.cancelButtonText ?? '');
  r17.setOldPasswordLabel(map.passwordChangeText?.oldPasswordLabel ?? '');
  req.setPasswordChangeText(r17);

  const r18 = new PasswordResetDoneScreenText();
  r18.setDescription(map.passwordResetDoneText?.description ?? '');
  r18.setNextButtonText(map.passwordResetDoneText?.nextButtonText ?? '');
  r18.setTitle(map.passwordResetDoneText?.title ?? '');
  req.setPasswordResetDoneText(r18);

  const r19 = new PasswordScreenText();
  r19.setBackButtonText(map.passwordText?.backButtonText ?? '');
  r19.setConfirmation(map.passwordText?.confirmation ?? '');
  r19.setDescription(map.passwordText?.description ?? '');
  r19.setHasLowercase(map.passwordText?.hasLowercase ?? '');
  r19.setHasNumber(map.passwordText?.hasNumber ?? '');
  r19.setHasSymbol(map.passwordText?.hasSymbol ?? '');
  r19.setHasUppercase(map.passwordText?.hasUppercase ?? '');
  r19.setMinLength(map.passwordText?.minLength ?? '');
  r19.setNextButtonText(map.passwordText?.nextButtonText ?? '');
  r19.setPasswordLabel(map.passwordText?.passwordLabel ?? '');
  r19.setResetLinkText(map.passwordText?.resetLinkText ?? '');
  r19.setTitle(map.passwordText?.title ?? '');
  req.setPasswordText(r19);

  const r20 = new PasswordlessScreenText();
  r20.setDescription(map.passwordlessText?.description ?? '');
  r20.setErrorRetry(map.passwordlessText?.errorRetry ?? '');
  r20.setLoginWithPwButtonText(map.passwordlessText?.loginWithPwButtonText ?? '');
  r20.setNotSupported(map.passwordlessText?.notSupported ?? '');
  r20.setTitle(map.passwordlessText?.title ?? '');
  r20.setValidateTokenButtonText(map.passwordlessText?.validateTokenButtonText ?? '');
  req.setPasswordlessText(r20);

  const r21 = new RegistrationOptionScreenText();
  r21.setDescription(map.registrationOptionText?.description ?? '');
  r21.setExternalLoginDescription(map.registrationOptionText?.externalLoginDescription ?? '');
  r21.setTitle(map.registrationOptionText?.title ?? '');
  r21.setUserNameButtonText(map.registrationOptionText?.userNameButtonText ?? '');
  r21.setLoginButtonText(map.registrationOptionText?.loginButtonText ?? '');
  req.setRegistrationOptionText(r21);

  const r22 = new RegistrationOrgScreenText();
  r22.setDescription(map.registrationOrgText?.description ?? '');
  r22.setEmailLabel(map.registrationOrgText?.emailLabel ?? '');
  r22.setFirstnameLabel(map.registrationOrgText?.firstnameLabel ?? '');
  r22.setLastnameLabel(map.registrationOrgText?.lastnameLabel ?? '');
  r22.setOrgnameLabel(map.registrationOrgText?.orgnameLabel ?? '');
  r22.setPasswordConfirmLabel(map.registrationOrgText?.passwordConfirmLabel ?? '');
  r22.setPasswordLabel(map.registrationOrgText?.passwordLabel ?? '');
  r22.setPrivacyConfirm(map.registrationOrgText?.privacyConfirm ?? '');
  r22.setPrivacyLinkText(map.registrationOrgText?.privacyLinkText ?? '');
  r22.setSaveButtonText(map.registrationOrgText?.saveButtonText ?? '');
  r22.setTitle(map.registrationOrgText?.title ?? '');
  r22.setTosAndPrivacyLabel(map.registrationOrgText?.tosAndPrivacyLabel ?? '');
  r22.setTosConfirm(map.registrationOrgText?.tosConfirm ?? '');
  r22.setPrivacyConfirm(map.registrationOrgText?.privacyConfirm ?? '');
  r22.setTosLinkText(map.registrationOrgText?.tosLinkText ?? '');
  r22.setUsernameLabel(map.registrationOrgText?.usernameLabel ?? '');
  req.setRegistrationOrgText(r22);

  const r23 = new RegistrationUserScreenText();
  r23.setBackButtonText(map.registrationUserText?.backButtonText ?? '');
  r23.setDescription(map.registrationUserText?.description ?? '');
  r23.setDescriptionOrgRegister(map.registrationUserText?.descriptionOrgRegister ?? '');
  r23.setEmailLabel(map.registrationUserText?.emailLabel ?? '');
  r23.setFirstnameLabel(map.registrationUserText?.firstnameLabel ?? '');
  r23.setGenderLabel(map.registrationUserText?.genderLabel ?? '');
  r23.setLanguageLabel(map.registrationUserText?.languageLabel ?? '');
  r23.setLastnameLabel(map.registrationUserText?.lastnameLabel ?? '');
  r23.setNextButtonText(map.registrationUserText?.nextButtonText ?? '');
  r23.setPasswordConfirmLabel(map.registrationUserText?.passwordConfirmLabel ?? '');
  r23.setPasswordLabel(map.registrationUserText?.passwordLabel ?? '');
  r23.setTosConfirm(map.registrationUserText?.tosConfirm ?? '');
  r23.setPrivacyConfirm(map.registrationUserText?.privacyConfirm ?? '');
  r23.setTosLinkText(map.registrationUserText?.tosLinkText ?? '');
  r23.setPrivacyLinkText(map.registrationUserText?.privacyLinkText ?? '');
  r23.setTitle(map.registrationUserText?.title ?? '');
  r23.setTosAndPrivacyLabel(map.registrationUserText?.tosAndPrivacyLabel ?? '');
  r23.setTosConfirm(map.registrationUserText?.tosConfirm ?? '');
  r23.setUsernameLabel(map.registrationUserText?.usernameLabel ?? '');
  req.setRegistrationUserText(r23);

  const r24 = new SelectAccountScreenText();
  r24.setDescription(map.selectAccountText?.description ?? '');
  r24.setDescriptionLinkingProcess(map.selectAccountText?.descriptionLinkingProcess ?? '');
  r24.setOtherUser(map.selectAccountText?.otherUser ?? '');
  r24.setSessionStateActive(map.selectAccountText?.sessionStateActive ?? '');
  r24.setSessionStateInactive(map.selectAccountText?.sessionStateInactive ?? '');
  r24.setTitle(map.selectAccountText?.title ?? '');
  r24.setTitleLinkingProcess(map.selectAccountText?.titleLinkingProcess ?? '');
  r24.setUserMustBeMemberOfOrg(map.selectAccountText?.userMustBeMemberOfOrg ?? '');
  req.setSelectAccountText(r24);

  const r25 = new SuccessLoginScreenText();
  r25.setAutoRedirectDescription(map.successLoginText?.autoRedirectDescription ?? '');
  r25.setNextButtonText(map.successLoginText?.nextButtonText ?? '');
  r25.setRedirectedDescription(map.successLoginText?.redirectedDescription ?? '');
  r25.setTitle(map.successLoginText?.title ?? '');
  req.setSuccessLoginText(r25);

  const r26 = new UsernameChangeDoneScreenText();
  r26.setDescription(map.usernameChangeDoneText?.description ?? '');
  r26.setNextButtonText(map.usernameChangeDoneText?.nextButtonText ?? '');
  r26.setTitle(map.usernameChangeDoneText?.title ?? '');
  req.setUsernameChangeDoneText(r26);

  const r27 = new UsernameChangeScreenText();
  r27.setCancelButtonText(map.usernameChangeText?.cancelButtonText ?? '');
  r27.setDescription(map.usernameChangeText?.description ?? '');
  r27.setNextButtonText(map.usernameChangeText?.nextButtonText ?? '');
  r27.setTitle(map.usernameChangeText?.title ?? '');
  r27.setUsernameLabel(map.usernameChangeText?.usernameLabel ?? '');
  req.setUsernameChangeText(r27);

  const r28 = new VerifyMFAOTPScreenText();
  r28.setCodeLabel(map.verifyMfaOtpText?.codeLabel ?? '');
  r28.setDescription(map.verifyMfaOtpText?.description ?? '');
  r28.setNextButtonText(map.verifyMfaOtpText?.nextButtonText ?? '');
  r28.setTitle(map.verifyMfaOtpText?.title ?? '');
  req.setVerifyMfaOtpText(r28);

  const r29 = new VerifyMFAU2FScreenText();
  r29.setDescription(map.verifyMfaU2fText?.description ?? '');
  r29.setErrorRetry(map.verifyMfaU2fText?.errorRetry ?? '');
  r29.setNotSupported(map.verifyMfaU2fText?.notSupported ?? '');
  r29.setTitle(map.verifyMfaU2fText?.title ?? '');
  r29.setValidateTokenText(map.verifyMfaU2fText?.validateTokenText ?? '');
  req.setVerifyMfaU2fText(r29);

  const r30 = new PasswordlessPromptScreenText();
  r30.setDescription(map.passwordlessPromptText?.description ?? '');
  r30.setDescriptionInit(map.passwordlessPromptText?.descriptionInit ?? '');
  r30.setNextButtonText(map.passwordlessPromptText?.nextButtonText ?? '');
  r30.setPasswordlessButtonText(map.passwordlessPromptText?.passwordlessButtonText ?? '');
  r30.setSkipButtonText(map.passwordlessPromptText?.skipButtonText ?? '');
  r30.setTitle(map.passwordlessPromptText?.title ?? '');
  req.setPasswordlessPromptText(r30);

  const r31 = new PasswordlessRegistrationDoneScreenText();
  r31.setDescription(map.passwordlessRegistrationDoneText?.description ?? '');
  r31.setDescriptionClose(map.passwordlessRegistrationDoneText?.descriptionClose ?? '');
  r31.setNextButtonText(map.passwordlessRegistrationDoneText?.nextButtonText ?? '');
  r31.setTitle(map.passwordlessRegistrationDoneText?.title ?? '');
  r31.setCancelButtonText(map.passwordlessRegistrationDoneText?.cancelButtonText ?? '');
  req.setPasswordlessRegistrationDoneText(r31);

  const r32 = new PasswordlessRegistrationScreenText();
  r32.setDescription(map.passwordlessRegistrationText?.description ?? '');
  r32.setErrorRetry(map.passwordlessRegistrationText?.errorRetry ?? '');
  r32.setNotSupported(map.passwordlessRegistrationText?.notSupported ?? '');
  r32.setRegisterTokenButtonText(map.passwordlessRegistrationText?.registerTokenButtonText ?? '');
  r32.setTitle(map.passwordlessRegistrationText?.title ?? '');
  r32.setTokenNameLabel(map.passwordlessRegistrationText?.tokenNameLabel ?? '');
  req.setPasswordlessRegistrationText(r32);

  const r33 = new PasswordlessScreenText();
  r33.setDescription(map.passwordlessText?.description ?? '');
  r33.setErrorRetry(map.passwordlessText?.errorRetry ?? '');
  r33.setLoginWithPwButtonText(map.passwordlessText?.loginWithPwButtonText ?? '');
  r33.setNotSupported(map.passwordlessText?.notSupported ?? '');
  r33.setTitle(map.passwordlessText?.title ?? '');
  r33.setValidateTokenButtonText(map.passwordlessText?.validateTokenButtonText ?? '');
  req.setPasswordlessText(r33);

  const r34 = new ExternalRegistrationUserOverviewScreenText();
  r34.setBackButtonText(map.externalRegistrationUserOverviewText?.backButtonText ?? '');
  r34.setDescription(map.externalRegistrationUserOverviewText?.description ?? '');
  r34.setEmailLabel(map.externalRegistrationUserOverviewText?.emailLabel ?? '');
  r34.setFirstnameLabel(map.externalRegistrationUserOverviewText?.firstnameLabel ?? '');
  r34.setLanguageLabel(map.externalRegistrationUserOverviewText?.languageLabel ?? '');
  r34.setLastnameLabel(map.externalRegistrationUserOverviewText?.lastnameLabel ?? '');
  r34.setNextButtonText(map.externalRegistrationUserOverviewText?.nextButtonText ?? '');
  r34.setNicknameLabel(map.externalRegistrationUserOverviewText?.nicknameLabel ?? '');
  r34.setPhoneLabel(map.externalRegistrationUserOverviewText?.phoneLabel ?? '');
  r34.setPrivacyLinkText(map.externalRegistrationUserOverviewText?.privacyLinkText ?? '');
  r34.setTitle(map.externalRegistrationUserOverviewText?.title ?? '');
  r34.setTosAndPrivacyLabel(map.externalRegistrationUserOverviewText?.tosAndPrivacyLabel ?? '');
  r34.setTosConfirm(map.externalRegistrationUserOverviewText?.tosConfirm ?? '');
  r34.setPrivacyConfirm(map.externalRegistrationUserOverviewText?.privacyConfirm ?? '');
  r34.setTosLinkText(map.externalRegistrationUserOverviewText?.tosLinkText ?? '');
  r34.setUsernameLabel(map.externalRegistrationUserOverviewText?.usernameLabel ?? '');
  req.setExternalRegistrationUserOverviewText(r34);

  const r35 = new LinkingUserPromptScreenText();
  r35.setTitle(map.linkingUserPromptText?.title ?? '');
  r35.setDescription(map.linkingUserPromptText?.description ?? '');
  r35.setLinkButtonText(map.linkingUserPromptText?.linkButtonText ?? '');
  r35.setOtherButtonText(map.linkingUserPromptText?.otherButtonText ?? '');
  req.setLinkingUserPromptText(r35);

  return req;
}
