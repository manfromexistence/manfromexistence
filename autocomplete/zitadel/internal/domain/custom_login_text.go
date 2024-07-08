package domain

import (
	"golang.org/x/text/language"

	"github.com/zitadel/zitadel/internal/eventstore/v1/models"
)

const (
	LoginCustomText = "Login"

	LoginKeyLogin                          = "Login."
	LoginKeyLoginTitle                     = LoginKeyLogin + "Title"
	LoginKeyLoginDescription               = LoginKeyLogin + "Description"
	LoginKeyLoginTitleLinkingProcess       = LoginKeyLogin + "TitleLinking"
	LoginKeyLoginDescriptionLinkingProcess = LoginKeyLogin + "DescriptionLinking"
	LoginKeyLoginNameLabel                 = LoginKeyLogin + "LoginNameLabel"
	LoginKeyLoginUsernamePlaceHolder       = LoginKeyLogin + "UsernamePlaceHolder"
	LoginKeyLoginLoginnamePlaceHolder      = LoginKeyLogin + "LoginnamePlaceHolder"
	LoginKeyLoginRegisterButtonText        = LoginKeyLogin + "RegisterButtonText"
	LoginKeyLoginNextButtonText            = LoginKeyLogin + "NextButtonText"
	LoginKeyLoginExternalUserDescription   = LoginKeyLogin + "ExternalUserDescription"
	LoginKeyLoginUserMustBeMemberOfOrg     = LoginKeyLogin + "MustBeMemberOfOrg"

	LoginKeySelectAccount                          = "SelectAccount."
	LoginKeySelectAccountTitle                     = LoginKeySelectAccount + "Title"
	LoginKeySelectAccountDescription               = LoginKeySelectAccount + "Description"
	LoginKeySelectAccountTitleLinkingProcess       = LoginKeySelectAccount + "TitleLinking"
	LoginKeySelectAccountDescriptionLinkingProcess = LoginKeySelectAccount + "DescriptionLinking"
	LoginKeySelectAccountOtherUser                 = LoginKeySelectAccount + "OtherUser"
	LoginKeySelectAccountSessionStateActive        = LoginKeySelectAccount + "SessionState0"
	LoginKeySelectAccountSessionStateInactive      = LoginKeySelectAccount + "SessionState1"
	LoginKeySelectAccountUserMustBeMemberOfOrg     = LoginKeySelectAccount + "MustBeMemberOfOrg"

	LoginKeyPassword               = "Password."
	LoginKeyPasswordTitle          = LoginKeyPassword + "Title"
	LoginKeyPasswordDescription    = LoginKeyPassword + "Description"
	LoginKeyPasswordLabel          = LoginKeyPassword + "PasswordLabel"
	LoginKeyPasswordMinLength      = LoginKeyPassword + "MinLength"
	LoginKeyPasswordHasUppercase   = LoginKeyPassword + "HasUppercase"
	LoginKeyPasswordHasLowercase   = LoginKeyPassword + "HasLowercase"
	LoginKeyPasswordHasNumber      = LoginKeyPassword + "HasNumber"
	LoginKeyPasswordHasSymbol      = LoginKeyPassword + "HasSymbol"
	LoginKeyPasswordConfirmation   = LoginKeyPassword + "Confirmation"
	LoginKeyPasswordResetLinkText  = LoginKeyPassword + "ResetLinkText"
	LoginKeyPasswordBackButtonText = LoginKeyPassword + "BackButtonText"
	LoginKeyPasswordNextButtonText = LoginKeyPassword + "NextButtonText"

	LoginKeyUsernameChange                 = "UsernameChange."
	LoginKeyUsernameChangeTitle            = LoginKeyUsernameChange + "Title"
	LoginKeyUsernameChangeDescription      = LoginKeyUsernameChange + "Description"
	LoginKeyUsernameChangeUsernameLabel    = LoginKeyUsernameChange + "UsernameLabel"
	LoginKeyUsernameChangeCancelButtonText = LoginKeyUsernameChange + "CancelButtonText"
	LoginKeyUsernameChangeNextButtonText   = LoginKeyUsernameChange + "NextButtonText"

	LoginKeyUsernameChangeDone               = "UsernameChangeDone."
	LoginKeyUsernameChangeDoneTitle          = LoginKeyUsernameChangeDone + "Title"
	LoginKeyUsernameChangeDoneDescription    = LoginKeyUsernameChangeDone + "Description"
	LoginKeyUsernameChangeDoneNextButtonText = LoginKeyUsernameChangeDone + "NextButtonText"

	LoginKeyInitPassword                        = "InitPassword."
	LoginKeyInitPasswordTitle                   = LoginKeyInitPassword + "Title"
	LoginKeyInitPasswordDescription             = LoginKeyInitPassword + "Description"
	LoginKeyInitPasswordCodeLabel               = LoginKeyInitPassword + "CodeLabel"
	LoginKeyInitPasswordNewPasswordLabel        = LoginKeyInitPassword + "NewPasswordLabel"
	LoginKeyInitPasswordNewPasswordConfirmLabel = LoginKeyInitPassword + "NewPasswordConfirmLabel"
	LoginKeyInitPasswordNextButtonText          = LoginKeyInitPassword + "NextButtonText"
	LoginKeyInitPasswordResendButtonText        = LoginKeyInitPassword + "ResendButtonText"

	LoginKeyInitPasswordDone                 = "InitPasswordDone."
	LoginKeyInitPasswordDoneTitle            = LoginKeyInitPasswordDone + "Title"
	LoginKeyInitPasswordDoneDescription      = LoginKeyInitPasswordDone + "Description"
	LoginKeyInitPasswordDoneNextButtonText   = LoginKeyInitPasswordDone + "NextButtonText"
	LoginKeyInitPasswordDoneCancelButtonText = LoginKeyInitPasswordDone + "CancelButtonText"

	LoginKeyEmailVerification                 = "EmailVerification."
	LoginKeyEmailVerificationTitle            = LoginKeyEmailVerification + "Title"
	LoginKeyEmailVerificationDescription      = LoginKeyEmailVerification + "Description"
	LoginKeyEmailVerificationCodeLabel        = LoginKeyEmailVerification + "CodeLabel"
	LoginKeyEmailVerificationNextButtonText   = LoginKeyEmailVerification + "NextButtonText"
	LoginKeyEmailVerificationResendButtonText = LoginKeyEmailVerification + "ResendButtonText"

	LoginKeyEmailVerificationDone                 = "EmailVerificationDone."
	LoginKeyEmailVerificationDoneTitle            = LoginKeyEmailVerificationDone + "Title"
	LoginKeyEmailVerificationDoneDescription      = LoginKeyEmailVerificationDone + "Description"
	LoginKeyEmailVerificationDoneNextButtonText   = LoginKeyEmailVerificationDone + "NextButtonText"
	LoginKeyEmailVerificationDoneCancelButtonText = LoginKeyEmailVerificationDone + "CancelButtonText"
	LoginKeyEmailVerificationDoneLoginButtonText  = LoginKeyEmailVerificationDone + "LoginButtonText"

	LoginKeyInitializeUser                        = "InitUser."
	LoginKeyInitializeUserTitle                   = LoginKeyInitializeUser + "Title"
	LoginKeyInitializeUserDescription             = LoginKeyInitializeUser + "Description"
	LoginKeyInitializeUserCodeLabel               = LoginKeyInitializeUser + "CodeLabel"
	LoginKeyInitializeUserNewPasswordLabel        = LoginKeyInitializeUser + "NewPasswordLabel"
	LoginKeyInitializeUserNewPasswordConfirmLabel = LoginKeyInitializeUser + "NewPasswordConfirm"
	LoginKeyInitializeUserResendButtonText        = LoginKeyInitializeUser + "ResendButtonText"
	LoginKeyInitializeUserNextButtonText          = LoginKeyInitializeUser + "NextButtonText"

	LoginKeyInitUserDone                 = "InitUserDone."
	LoginKeyInitUserDoneTitle            = LoginKeyInitUserDone + "Title"
	LoginKeyInitUserDoneDescription      = LoginKeyInitUserDone + "Description"
	LoginKeyInitUserDoneCancelButtonText = LoginKeyInitUserDone + "CancelButtonText"
	LoginKeyInitUserDoneNextButtonText   = LoginKeyInitUserDone + "NextButtonText"

	LoginKeyInitMFAPrompt               = "InitMFAPrompt."
	LoginKeyInitMFAPromptTitle          = LoginKeyInitMFAPrompt + "Title"
	LoginKeyInitMFAPromptDescription    = LoginKeyInitMFAPrompt + "Description"
	LoginKeyInitMFAPromptOTPOption      = LoginKeyInitMFAPrompt + "Provider0"
	LoginKeyInitMFAPromptU2FOption      = LoginKeyInitMFAPrompt + "Provider1"
	LoginKeyInitMFAPromptSkipButtonText = LoginKeyInitMFAPrompt + "SkipButtonText"
	LoginKeyInitMFAPromptNextButtonText = LoginKeyInitMFAPrompt + "NextButtonText"

	LoginKeyInitMFAOTP                 = "InitMFAOTP."
	LoginKeyInitMFAOTPTitle            = LoginKeyInitMFAOTP + "Title"
	LoginKeyInitMFAOTPDescription      = LoginKeyInitMFAOTP + "Description"
	LoginKeyInitMFAOTPDescriptionOTP   = LoginKeyInitMFAOTP + "OTPDescription"
	LoginKeyInitMFAOTPSecretLabel      = LoginKeyInitMFAOTP + "SecretLabel"
	LoginKeyInitMFAOTPCodeLabel        = LoginKeyInitMFAOTP + "CodeLabel"
	LoginKeyInitMFAOTPNextButtonText   = LoginKeyInitMFAOTP + "NextButtonText"
	LoginKeyInitMFAOTPCancelButtonText = LoginKeyInitMFAOTP + "CancelButtonText"

	LoginKeyInitMFAU2F                        = "InitMFAU2F."
	LoginKeyInitMFAU2FTitle                   = LoginKeyInitMFAU2F + "Title"
	LoginKeyInitMFAU2FDescription             = LoginKeyInitMFAU2F + "Description"
	LoginKeyInitMFAU2FTokenNameLabel          = LoginKeyInitMFAU2F + "TokenNameLabel"
	LoginKeyInitMFAU2FNotSupported            = LoginKeyInitMFAU2F + "NotSupported"
	LoginKeyInitMFAU2FRegisterTokenButtonText = LoginKeyInitMFAU2F + "RegisterTokenButtonText"
	LoginKeyInitMFAU2FErrorRetry              = LoginKeyInitMFAU2F + "ErrorRetry"

	LoginKeyInitMFADone                 = "InitMFADone."
	LoginKeyInitMFADoneTitle            = LoginKeyInitMFADone + "Title"
	LoginKeyInitMFADoneDescription      = LoginKeyInitMFADone + "Description"
	LoginKeyInitMFADoneCancelButtonText = LoginKeyInitMFADone + "CancelButtonText"
	LoginKeyInitMFADoneNextButtonText   = LoginKeyInitMFADone + "NextButtonText"

	LoginKeyMFAProviders            = "MFAProvider."
	LoginKeyMFAProvidersChooseOther = LoginKeyMFAProviders + "ChooseOther"
	LoginKeyMFAProvidersOTP         = LoginKeyMFAProviders + "Provider0"
	LoginKeyMFAProvidersU2F         = LoginKeyMFAProviders + "Provider1"

	LoginKeyVerifyMFAOTP               = "VerifyMFAOTP."
	LoginKeyVerifyMFAOTPTitle          = LoginKeyVerifyMFAOTP + "Title"
	LoginKeyVerifyMFAOTPDescription    = LoginKeyVerifyMFAOTP + "Description"
	LoginKeyVerifyMFAOTPCodeLabel      = LoginKeyVerifyMFAOTP + "CodeLabel"
	LoginKeyVerifyMFAOTPNextButtonText = LoginKeyVerifyMFAOTP + "NextButtonText"

	LoginKeyVerifyMFAU2F                  = "VerifyMFAU2F."
	LoginKeyVerifyMFAU2FTitle             = LoginKeyVerifyMFAU2F + "Title"
	LoginKeyVerifyMFAU2FDescription       = LoginKeyVerifyMFAU2F + "Description"
	LoginKeyVerifyMFAU2FNotSupported      = LoginKeyVerifyMFAU2F + "NotSupported"
	LoginKeyVerifyMFAU2FValidateTokenText = LoginKeyVerifyMFAU2F + "ValidateTokenButtonText"
	LoginKeyVerifyMFAU2FErrorRetry        = LoginKeyVerifyMFAU2F + "ErrorRetry"

	LoginKeyPasswordless                        = "Passwordless."
	LoginKeyPasswordlessTitle                   = LoginKeyPasswordless + "Title"
	LoginKeyPasswordlessDescription             = LoginKeyPasswordless + "Description"
	LoginKeyPasswordlessLoginWithPwButtonText   = LoginKeyPasswordless + "LoginWithPwButtonText"
	LoginKeyPasswordlessValidateTokenButtonText = LoginKeyPasswordless + "ValidateTokenButtonText"
	LoginKeyPasswordlessNotSupported            = LoginKeyPasswordless + "NotSupported"
	LoginKeyPasswordlessErrorRetry              = LoginKeyPasswordless + "ErrorRetry"

	LoginKeyPasswordlessPrompt                       = "PasswordlessPrompt."
	LoginKeyPasswordlessPromptTitle                  = LoginKeyPasswordlessPrompt + "Title"
	LoginKeyPasswordlessPromptDescription            = LoginKeyPasswordlessPrompt + "Description"
	LoginKeyPasswordlessPromptDescriptionInit        = LoginKeyPasswordlessPrompt + "DescriptionInit"
	LoginKeyPasswordlessPromptPasswordlessButtonText = LoginKeyPasswordlessPrompt + "PasswordlessButtonText"
	LoginKeyPasswordlessPromptNextButtonText         = LoginKeyPasswordlessPrompt + "NextButtonText"
	LoginKeyPasswordlessPromptSkipButtonText         = LoginKeyPasswordlessPrompt + "SkipButtonText"

	LoginKeyPasswordlessRegistration                        = "PasswordlessRegistration."
	LoginKeyPasswordlessRegistrationTitle                   = LoginKeyPasswordlessRegistration + "Title"
	LoginKeyPasswordlessRegistrationDescription             = LoginKeyPasswordlessRegistration + "Description"
	LoginKeyPasswordlessRegistrationRegisterTokenButtonText = LoginKeyPasswordlessRegistration + "RegisterTokenButtonText"
	LoginKeyPasswordlessRegistrationTokenNameLabel          = LoginKeyPasswordlessRegistration + "TokenNameLabel"
	LoginKeyPasswordlessRegistrationNotSupported            = LoginKeyPasswordlessRegistration + "NotSupported"
	LoginKeyPasswordlessRegistrationErrorRetry              = LoginKeyPasswordlessRegistration + "ErrorRetry"

	LoginKeyPasswordlessRegistrationDone                 = "PasswordlessRegistrationDone."
	LoginKeyPasswordlessRegistrationDoneTitle            = LoginKeyPasswordlessRegistrationDone + "Title"
	LoginKeyPasswordlessRegistrationDoneDescription      = LoginKeyPasswordlessRegistrationDone + "Description"
	LoginKeyPasswordlessRegistrationDoneDescriptionClose = LoginKeyPasswordlessRegistrationDone + "DescriptionClose"
	LoginKeyPasswordlessRegistrationDoneNextButtonText   = LoginKeyPasswordlessRegistrationDone + "NextButtonText"
	LoginKeyPasswordlessRegistrationDoneCancelButtonText = LoginKeyPasswordlessRegistrationDone + "CancelButtonText"

	LoginKeyPasswordChange                        = "PasswordChange."
	LoginKeyPasswordChangeTitle                   = LoginKeyPasswordChange + "Title"
	LoginKeyPasswordChangeDescription             = LoginKeyPasswordChange + "Description"
	LoginKeyPasswordChangeOldPasswordLabel        = LoginKeyPasswordChange + "OldPasswordLabel"
	LoginKeyPasswordChangeNewPasswordLabel        = LoginKeyPasswordChange + "NewPasswordLabel"
	LoginKeyPasswordChangeNewPasswordConfirmLabel = LoginKeyPasswordChange + "NewPasswordConfirmLabel"
	LoginKeyPasswordChangeCancelButtonText        = LoginKeyPasswordChange + "CancelButtonText"
	LoginKeyPasswordChangeNextButtonText          = LoginKeyPasswordChange + "NextButtonText"

	LoginKeyPasswordChangeDone               = "PasswordChangeDone."
	LoginKeyPasswordChangeDoneTitle          = LoginKeyPasswordChangeDone + "Title"
	LoginKeyPasswordChangeDoneDescription    = LoginKeyPasswordChangeDone + "Description"
	LoginKeyPasswordChangeDoneNextButtonText = LoginKeyPasswordChangeDone + "NextButtonText"

	LoginKeyPasswordResetDone               = "PasswordResetDone."
	LoginKeyPasswordResetDoneTitle          = LoginKeyPasswordResetDone + "Title"
	LoginKeyPasswordResetDoneDescription    = LoginKeyPasswordResetDone + "Description"
	LoginKeyPasswordResetDoneNextButtonText = LoginKeyPasswordResetDone + "NextButtonText"

	LoginKeyRegistrationOption                         = "RegisterOption."
	LoginKeyRegistrationOptionTitle                    = LoginKeyRegistrationOption + "Title"
	LoginKeyRegistrationOptionDescription              = LoginKeyRegistrationOption + "Description"
	LoginKeyRegistrationOptionUserNameButtonText       = LoginKeyRegistrationOption + "RegisterUsernamePasswordButtonText"
	LoginKeyRegistrationOptionExternalLoginDescription = LoginKeyRegistrationOption + "ExternalLoginDescription"
	LoginKeyRegistrationOptionLoginButtonText          = LoginKeyRegistrationOption + "LoginButtonText"

	LoginKeyRegistrationUser                       = "RegistrationUser."
	LoginKeyRegistrationUserTitle                  = LoginKeyRegistrationUser + "Title"
	LoginKeyRegistrationUserDescription            = LoginKeyRegistrationUser + "Description"
	LoginKeyRegistrationUserDescriptionOrgRegister = LoginKeyRegistrationUser + "DescriptionOrgRegister"
	LoginKeyRegistrationUserFirstnameLabel         = LoginKeyRegistrationUser + "FirstnameLabel"
	LoginKeyRegistrationUserLastnameLabel          = LoginKeyRegistrationUser + "LastnameLabel"
	LoginKeyRegistrationUserEmailLabel             = LoginKeyRegistrationUser + "EmailLabel"
	LoginKeyRegistrationUserUsernameLabel          = LoginKeyRegistrationUser + "UsernameLabel"
	LoginKeyRegistrationUserLanguageLabel          = LoginKeyRegistrationUser + "LanguageLabel"
	LoginKeyRegistrationUserGenderLabel            = LoginKeyRegistrationUser + "GenderLabel"
	LoginKeyRegistrationUserPasswordLabel          = LoginKeyRegistrationUser + "PasswordLabel"
	LoginKeyRegistrationUserPasswordConfirmLabel   = LoginKeyRegistrationUser + "PasswordConfirmLabel"
	LoginKeyRegistrationUserTOSAndPrivacyLabel     = LoginKeyRegistrationUser + "TosAndPrivacyLabel"
	LoginKeyRegistrationUserTOSConfirm             = LoginKeyRegistrationUser + "TosConfirm"
	LoginKeyRegistrationUserTOSLinkText            = LoginKeyRegistrationUser + "TosLinkText"
	LoginKeyRegistrationUserPrivacyConfirm         = LoginKeyRegistrationUser + "PrivacyConfirm"
	LoginKeyRegistrationUserPrivacyLinkText        = LoginKeyRegistrationUser + "PrivacyLinkText"
	LoginKeyRegistrationUserNextButtonText         = LoginKeyRegistrationUser + "NextButtonText"
	LoginKeyRegistrationUserBackButtonText         = LoginKeyRegistrationUser + "BackButtonText"

	LoginKeyExternalRegistrationUserOverview                   = "ExternalRegistrationUserOverview."
	LoginKeyExternalRegistrationUserOverviewTitle              = LoginKeyExternalRegistrationUserOverview + "Title"
	LoginKeyExternalRegistrationUserOverviewDescription        = LoginKeyExternalRegistrationUserOverview + "Description"
	LoginKeyExternalRegistrationUserOverviewEmailLabel         = LoginKeyExternalRegistrationUserOverview + "EmailLabel"
	LoginKeyExternalRegistrationUserOverviewUsernameLabel      = LoginKeyExternalRegistrationUserOverview + "UsernameLabel"
	LoginKeyExternalRegistrationUserOverviewFirstnameLabel     = LoginKeyExternalRegistrationUserOverview + "FirstnameLabel"
	LoginKeyExternalRegistrationUserOverviewLastnameLabel      = LoginKeyExternalRegistrationUserOverview + "LastnameLabel"
	LoginKeyExternalRegistrationUserOverviewNicknameLabel      = LoginKeyExternalRegistrationUserOverview + "NicknameLabel"
	LoginKeyExternalRegistrationUserOverviewPhoneLabel         = LoginKeyExternalRegistrationUserOverview + "PhoneLabel"
	LoginKeyExternalRegistrationUserOverviewLanguageLabel      = LoginKeyExternalRegistrationUserOverview + "LanguageLabel"
	LoginKeyExternalRegistrationUserOverviewTOSAndPrivacyLabel = LoginKeyExternalRegistrationUserOverview + "TosAndPrivacyLabel"
	LoginKeyExternalRegistrationUserOverviewTOSConfirm         = LoginKeyExternalRegistrationUserOverview + "TosConfirm"
	LoginKeyExternalRegistrationUserOverviewTOSLinkText        = LoginKeyExternalRegistrationUserOverview + "TosLinkText"
	LoginKeyExternalRegistrationUserOverviewPrivacyConfirm     = LoginKeyExternalRegistrationUserOverview + "PrivacyConfirm"
	LoginKeyExternalRegistrationUserOverviewPrivacyLinkText    = LoginKeyExternalRegistrationUserOverview + "PrivacyLinkText"
	LoginKeyExternalRegistrationUserOverviewBackButtonText     = LoginKeyExternalRegistrationUserOverview + "BackButtonText"
	LoginKeyExternalRegistrationUserOverviewNextButtonText     = LoginKeyExternalRegistrationUserOverview + "NextButtonText"

	LoginKeyRegistrationOrg                 = "RegistrationOrg."
	LoginKeyRegisterOrgTitle                = LoginKeyRegistrationOrg + "Title"
	LoginKeyRegisterOrgDescription          = LoginKeyRegistrationOrg + "Description"
	LoginKeyRegisterOrgOrgNameLabel         = LoginKeyRegistrationOrg + "OrgNameLabel"
	LoginKeyRegisterOrgFirstnameLabel       = LoginKeyRegistrationOrg + "FirstnameLabel"
	LoginKeyRegisterOrgLastnameLabel        = LoginKeyRegistrationOrg + "LastnameLabel"
	LoginKeyRegisterOrgUsernameLabel        = LoginKeyRegistrationOrg + "UsernameLabel"
	LoginKeyRegisterOrgEmailLabel           = LoginKeyRegistrationOrg + "EmailLabel"
	LoginKeyRegisterOrgPasswordLabel        = LoginKeyRegistrationOrg + "PasswordLabel"
	LoginKeyRegisterOrgPasswordConfirmLabel = LoginKeyRegistrationOrg + "PasswordConfirmLabel"
	LoginKeyRegisterOrgTOSAndPrivacyLabel   = LoginKeyRegistrationOrg + "TosAndPrivacyLabel"
	LoginKeyRegisterOrgTOSConfirm           = LoginKeyRegistrationOrg + "TosConfirm"
	LoginKeyRegisterOrgTOSLinkText          = LoginKeyRegistrationOrg + "TosLinkText"
	LoginKeyRegisterOrgPrivacyConfirm       = LoginKeyRegistrationOrg + "PrivacyConfirm"
	LoginKeyRegisterOrgPrivacyLinkText      = LoginKeyRegistrationOrg + "PrivacyLinkText"
	LoginKeyRegisterOrgSaveButtonText       = LoginKeyRegistrationOrg + "SaveButtonText"
	LoginKeyRegisterOrgBackButtonText       = LoginKeyRegistrationOrg + "BackButtonText"

	LoginKeyLinkingUserPrompt                = "LinkingUserPrompt."
	LoginKeyLinkingUserPromptTitle           = LoginKeyLinkingUserPrompt + "Title"
	LoginKeyLinkingUserPromptDescription     = LoginKeyLinkingUserPrompt + "Description"
	LoginKeyLinkingUserPromptLinkButtonText  = LoginKeyLinkingUserPrompt + "LinkButtonText"
	LoginKeyLinkingUserPromptOtherButtonText = LoginKeyLinkingUserPrompt + "OtherButtonText"

	LoginKeyLinkingUserDone                 = "LinkingUsersDone."
	LoginKeyLinkingUserDoneTitle            = LoginKeyLinkingUserDone + "Title"
	LoginKeyLinkingUserDoneDescription      = LoginKeyLinkingUserDone + "Description"
	LoginKeyLinkingUserDoneCancelButtonText = LoginKeyLinkingUserDone + "CancelButtonText"
	LoginKeyLinkingUserDoneNextButtonText   = LoginKeyLinkingUserDone + "NextButtonText"

	LoginKeyExternalNotFound                       = "ExternalNotFound."
	LoginKeyExternalNotFoundTitle                  = LoginKeyExternalNotFound + "Title"
	LoginKeyExternalNotFoundDescription            = LoginKeyExternalNotFound + "Description"
	LoginKeyExternalNotFoundLinkButtonText         = LoginKeyExternalNotFound + "LinkButtonText"
	LoginKeyExternalNotFoundAutoRegisterButtonText = LoginKeyExternalNotFound + "AutoRegisterButtonText"
	LoginKeyExternalNotFoundTOSAndPrivacyLabel     = LoginKeyExternalNotFound + "TosAndPrivacyLabel"
	LoginKeyExternalNotFoundTOSConfirm             = LoginKeyExternalNotFound + "TosConfirm"
	LoginKeyExternalNotFoundTOSLinkText            = LoginKeyExternalNotFound + "TosLinkText"
	LoginKeyExternalNotFoundPrivacyConfirm         = LoginKeyExternalNotFound + "PrivacyConfirm"
	LoginKeyExternalNotFoundPrivacyLinkText        = LoginKeyExternalNotFound + "PrivacyLinkText"

	LoginKeySuccessLogin                        = "LoginSuccess."
	LoginKeySuccessLoginTitle                   = LoginKeySuccessLogin + "Title"
	LoginKeySuccessLoginAutoRedirectDescription = LoginKeySuccessLogin + "AutoRedirectDescription"
	LoginKeySuccessLoginRedirectedDescription   = LoginKeySuccessLogin + "RedirectedDescription"
	LoginKeySuccessLoginNextButtonText          = LoginKeySuccessLogin + "NextButtonText"

	LoginKeyLogoutDone                = "LogoutDone."
	LoginKeyLogoutDoneTitle           = LoginKeyLogoutDone + "Title"
	LoginKeyLogoutDoneDescription     = LoginKeyLogoutDone + "Description"
	LoginKeyLogoutDoneLoginButtonText = LoginKeyLogoutDone + "LoginButtonText"

	LoginKeyFooter              = "Footer."
	LoginKeyFooterTOS           = LoginKeyFooter + "Tos"
	LoginKeyFooterPrivacyPolicy = LoginKeyFooter + "PrivacyPolicy"
	LoginKeyFooterHelp          = LoginKeyFooter + "Help"
	LoginKeyFooterSupportEmail  = LoginKeyFooter + "SupportEmail"
)

type CustomLoginText struct {
	models.ObjectRoot

	State     PolicyState
	Default   bool
	Language  language.Tag
	IsDefault bool

	SelectAccount                    SelectAccountScreenText
	Login                            LoginScreenText
	Password                         PasswordScreenText
	UsernameChange                   UsernameChangeScreenText
	UsernameChangeDone               UsernameChangeDoneScreenText
	InitPassword                     InitPasswordScreenText
	InitPasswordDone                 InitPasswordDoneScreenText
	EmailVerification                EmailVerificationScreenText
	EmailVerificationDone            EmailVerificationDoneScreenText
	InitUser                         InitializeUserScreenText
	InitUserDone                     InitializeUserDoneScreenText
	InitMFAPrompt                    InitMFAPromptScreenText
	InitMFAOTP                       InitMFAOTPScreenText
	InitMFAU2F                       InitMFAU2FScreenText
	InitMFADone                      InitMFADoneScreenText
	MFAProvider                      MFAProvidersText
	VerifyMFAOTP                     VerifyMFAOTPScreenText
	VerifyMFAU2F                     VerifyMFAU2FScreenText
	Passwordless                     PasswordlessScreenText
	PasswordlessPrompt               PasswordlessPromptScreenText
	PasswordlessRegistration         PasswordlessRegistrationScreenText
	PasswordlessRegistrationDone     PasswordlessRegistrationDoneScreenText
	PasswordChange                   PasswordChangeScreenText
	PasswordChangeDone               PasswordChangeDoneScreenText
	PasswordResetDone                PasswordResetDoneScreenText
	RegisterOption                   RegistrationOptionScreenText
	RegistrationUser                 RegistrationUserScreenText
	ExternalRegistrationUserOverview ExternalRegistrationUserOverviewScreenText
	RegistrationOrg                  RegistrationOrgScreenText
	LinkingUserPrompt                LinkingUserPromptScreenText
	LinkingUsersDone                 LinkingUserDoneScreenText
	ExternalNotFound                 ExternalUserNotFoundScreenText
	LoginSuccess                     SuccessLoginScreenText
	LogoutDone                       LogoutDoneScreenText
	Footer                           FooterText
}

func (m *CustomLoginText) IsValid(supportedLanguages []language.Tag) error {
	if err := LanguageIsDefined(m.Language); err != nil {
		return err
	}
	return LanguagesAreSupported(supportedLanguages, m.Language)
}

type SelectAccountScreenText struct {
	Title              string
	Description        string
	TitleLinking       string
	DescriptionLinking string
	OtherUser          string
	SessionState0      string //active
	SessionState1      string //inactive
	MustBeMemberOfOrg  string
}

type LoginScreenText struct {
	Title                   string
	Description             string
	TitleLinking            string
	DescriptionLinking      string
	LoginNameLabel          string
	UsernamePlaceholder     string
	LoginnamePlaceholder    string
	RegisterButtonText      string
	NextButtonText          string
	ExternalUserDescription string
	MustBeMemberOfOrg       string
}

type PasswordScreenText struct {
	Title          string
	Description    string
	PasswordLabel  string
	ResetLinkText  string
	BackButtonText string
	NextButtonText string
	MinLength      string
	HasUppercase   string
	HasLowercase   string
	HasNumber      string
	HasSymbol      string
	Confirmation   string
}

type UsernameChangeScreenText struct {
	Title            string
	Description      string
	UsernameLabel    string
	CancelButtonText string
	NextButtonText   string
}

type UsernameChangeDoneScreenText struct {
	Title          string
	Description    string
	NextButtonText string
}

type InitPasswordScreenText struct {
	Title                   string
	Description             string
	CodeLabel               string
	NewPasswordLabel        string
	NewPasswordConfirmLabel string
	NextButtonText          string
	ResendButtonText        string
}

type InitPasswordDoneScreenText struct {
	Title            string
	Description      string
	NextButtonText   string
	CancelButtonText string
}

type EmailVerificationScreenText struct {
	Title            string
	Description      string
	CodeLabel        string
	NextButtonText   string
	ResendButtonText string
}

type EmailVerificationDoneScreenText struct {
	Title            string
	Description      string
	NextButtonText   string
	CancelButtonText string
	LoginButtonText  string
}

type InitializeUserScreenText struct {
	Title                   string
	Description             string
	CodeLabel               string
	NewPasswordLabel        string
	NewPasswordConfirmLabel string
	ResendButtonText        string
	NextButtonText          string
}

type InitializeUserDoneScreenText struct {
	Title            string
	Description      string
	CancelButtonText string
	NextButtonText   string
}

type InitMFAPromptScreenText struct {
	Title          string
	Description    string
	Provider0      string //OTP
	Provider1      string //U2F
	SkipButtonText string
	NextButtonText string
}

type InitMFAOTPScreenText struct {
	Title            string
	Description      string
	OTPDescription   string
	SecretLabel      string
	CodeLabel        string
	NextButtonText   string
	CancelButtonText string
}

type InitMFAU2FScreenText struct {
	Title                   string
	Description             string
	TokenNameLabel          string
	RegisterTokenButtonText string
	NotSupported            string
	ErrorRetry              string
}

type InitMFADoneScreenText struct {
	Title            string
	Description      string
	CancelButtonText string
	NextButtonText   string
}

type MFAProvidersText struct {
	ChooseOther string
	Provider0   string //OTP
	Provider1   string //U2F
}

type VerifyMFAOTPScreenText struct {
	Title          string
	Description    string
	CodeLabel      string
	NextButtonText string
}

type VerifyMFAU2FScreenText struct {
	Title                   string
	Description             string
	ValidateTokenButtonText string
	NotSupported            string
	ErrorRetry              string
}

type PasswordlessScreenText struct {
	Title                   string
	Description             string
	LoginWithPwButtonText   string
	ValidateTokenButtonText string
	NotSupported            string
	ErrorRetry              string
}

type PasswordChangeScreenText struct {
	Title                   string
	Description             string
	OldPasswordLabel        string
	NewPasswordLabel        string
	NewPasswordConfirmLabel string
	CancelButtonText        string
	NextButtonText          string
}

type PasswordChangeDoneScreenText struct {
	Title          string
	Description    string
	NextButtonText string
}

type PasswordResetDoneScreenText struct {
	Title          string
	Description    string
	NextButtonText string
}

type RegistrationOptionScreenText struct {
	Title                              string
	Description                        string
	RegisterUsernamePasswordButtonText string
	ExternalLoginDescription           string
	LoginButtonText                    string
}

type RegistrationUserScreenText struct {
	Title                  string
	Description            string
	DescriptionOrgRegister string
	FirstnameLabel         string
	LastnameLabel          string
	EmailLabel             string
	UsernameLabel          string
	LanguageLabel          string
	GenderLabel            string
	PasswordLabel          string
	PasswordConfirmLabel   string
	TOSAndPrivacyLabel     string
	TOSConfirm             string
	TOSLinkText            string
	PrivacyConfirm         string
	PrivacyLinkText        string
	NextButtonText         string
	BackButtonText         string
}

type ExternalRegistrationUserOverviewScreenText struct {
	Title              string
	Description        string
	EmailLabel         string
	UsernameLabel      string
	FirstnameLabel     string
	LastnameLabel      string
	NicknameLabel      string
	LanguageLabel      string
	PhoneLabel         string
	TOSAndPrivacyLabel string
	TOSConfirm         string
	TOSLinkText        string
	PrivacyConfirm     string
	PrivacyLinkText    string
	BackButtonText     string
	NextButtonText     string
}

type RegistrationOrgScreenText struct {
	Title                string
	Description          string
	OrgNameLabel         string
	FirstnameLabel       string
	LastnameLabel        string
	UsernameLabel        string
	EmailLabel           string
	PasswordLabel        string
	PasswordConfirmLabel string
	TOSAndPrivacyLabel   string
	TOSConfirm           string
	TOSLinkText          string
	PrivacyConfirm       string
	PrivacyLinkText      string
	SaveButtonText       string
}

type LinkingUserPromptScreenText struct {
	Title           string
	Description     string
	LinkButtonText  string
	OtherButtonText string
}

type LinkingUserDoneScreenText struct {
	Title            string
	Description      string
	CancelButtonText string
	NextButtonText   string
}

type ExternalUserNotFoundScreenText struct {
	Title                  string
	Description            string
	LinkButtonText         string
	AutoRegisterButtonText string
	TOSAndPrivacyLabel     string
	TOSConfirm             string
	TOSLinkText            string
	PrivacyConfirm         string
	PrivacyLinkText        string
}

type SuccessLoginScreenText struct {
	Title                   string
	AutoRedirectDescription string
	RedirectedDescription   string
	NextButtonText          string
}

type LogoutDoneScreenText struct {
	Title           string
	Description     string
	LoginButtonText string
}

type FooterText struct {
	TOS           string
	PrivacyPolicy string
	Help          string
	SupportEmail  string
}

type PasswordlessPromptScreenText struct {
	Title                  string
	Description            string
	DescriptionInit        string
	PasswordlessButtonText string
	NextButtonText         string
	SkipButtonText         string
}

type PasswordlessRegistrationScreenText struct {
	Title                   string
	Description             string
	RegisterTokenButtonText string
	TokenNameLabel          string
	NotSupported            string
	ErrorRetry              string
}

type PasswordlessRegistrationDoneScreenText struct {
	Title            string
	Description      string
	DescriptionClose string
	NextButtonText   string
	CancelButtonText string
}
