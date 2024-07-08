import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Buffer } from 'buffer';
import { from, Observable, Subscription, take } from 'rxjs';
import { ChangeType } from 'src/app/modules/changes/changes.component';
import { phoneValidator, requiredValidator } from 'src/app/modules/form-field/validators/validators';
import { InfoDialogComponent } from 'src/app/modules/info-dialog/info-dialog.component';
import { MetadataDialogComponent } from 'src/app/modules/metadata/metadata-dialog/metadata-dialog.component';
import { PolicyComponentServiceType } from 'src/app/modules/policies/policy-component-types.enum';
import { SidenavSetting } from 'src/app/modules/sidenav/sidenav.component';
import { UserGrantContext } from 'src/app/modules/user-grants/user-grants-datasource';
import { WarnDialogComponent } from 'src/app/modules/warn-dialog/warn-dialog.component';
import { Metadata } from 'src/app/proto/generated/zitadel/metadata_pb';
import { LoginPolicy } from 'src/app/proto/generated/zitadel/policy_pb';
import { Email, Gender, Phone, Profile, User, UserState } from 'src/app/proto/generated/zitadel/user_pb';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Breadcrumb, BreadcrumbService, BreadcrumbType } from 'src/app/services/breadcrumb.service';
import { GrpcAuthService } from 'src/app/services/grpc-auth.service';
import { ManagementService } from 'src/app/services/mgmt.service';
import { ToastService } from 'src/app/services/toast.service';
import { formatPhone } from 'src/app/utils/formatPhone';
import { EditDialogComponent, EditDialogType } from './edit-dialog/edit-dialog.component';
import { LanguagesService } from '../../../../services/languages.service';

@Component({
  selector: 'cnsl-auth-user-detail',
  templateUrl: './auth-user-detail.component.html',
  styleUrls: ['./auth-user-detail.component.scss'],
})
export class AuthUserDetailComponent implements OnDestroy {
  public user?: User.AsObject;
  public genders: Gender[] = [Gender.GENDER_MALE, Gender.GENDER_FEMALE, Gender.GENDER_DIVERSE];

  private subscription: Subscription = new Subscription();

  public loading: boolean = false;
  public loadingMetadata: boolean = false;

  public ChangeType: any = ChangeType;
  public userLoginMustBeDomain: boolean = false;
  public UserState: any = UserState;

  public USERGRANTCONTEXT: UserGrantContext = UserGrantContext.AUTHUSER;
  public refreshChanges$: EventEmitter<void> = new EventEmitter();

  public metadata: Metadata.AsObject[] = [];

  public settingsList: SidenavSetting[] = [
    { id: 'general', i18nKey: 'USER.SETTINGS.GENERAL' },
    { id: 'security', i18nKey: 'USER.SETTINGS.SECURITY' },
    { id: 'idp', i18nKey: 'USER.SETTINGS.IDP' },
    { id: 'grants', i18nKey: 'USER.SETTINGS.USERGRANTS' },
    { id: 'memberships', i18nKey: 'USER.SETTINGS.MEMBERSHIPS' },
    {
      id: 'metadata',
      i18nKey: 'USER.SETTINGS.METADATA',
      requiredRoles: { [PolicyComponentServiceType.MGMT]: ['user.read'] },
    },
  ];
  public currentSetting: string | undefined = this.settingsList[0].id;
  public loginPolicy?: LoginPolicy.AsObject;
  private savedLanguage?: string;

  constructor(
    public translate: TranslateService,
    private toast: ToastService,
    public userService: GrpcAuthService,
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private mgmt: ManagementService,
    private breadcrumbService: BreadcrumbService,
    private mediaMatcher: MediaMatcher,
    private _location: Location,
    activatedRoute: ActivatedRoute,
    public langSvc: LanguagesService,
  ) {
    activatedRoute.queryParams.pipe(take(1)).subscribe((params: Params) => {
      const { id } = params;
      if (id) {
        this.cleanupTranslation();
        this.currentSetting = id;
      }
    });

    const mediaq: string = '(max-width: 500px)';
    const small = this.mediaMatcher.matchMedia(mediaq).matches;
    if (small) {
      this.changeSelection(small);
    }
    this.mediaMatcher.matchMedia(mediaq).onchange = (small) => {
      this.changeSelection(small.matches);
    };

    this.loading = true;
    this.refreshUser();

    this.userService.getMyLoginPolicy().then((policy) => {
      if (policy.policy) {
        this.loginPolicy = policy.policy;
      }
    });
  }

  private changeSelection(small: boolean): void {
    this.cleanupTranslation();
    if (small) {
      this.currentSetting = undefined;
    } else {
      this.currentSetting = this.currentSetting === undefined ? this.settingsList[0].id : this.currentSetting;
    }
  }

  public navigateBack(): void {
    this._location.back();
  }

  refreshUser(): void {
    this.refreshChanges$.emit();
    this.userService
      .getMyUser()
      .then((resp) => {
        if (resp.user) {
          this.user = resp.user;

          this.loadMetadata();

          this.breadcrumbService.setBreadcrumb([
            new Breadcrumb({
              type: BreadcrumbType.AUTHUSER,
              name: this.user.human?.profile?.displayName,
              routerLink: ['/users', 'me'],
            }),
          ]);
        }
        this.savedLanguage = resp.user?.human?.profile?.preferredLanguage;
        this.loading = false;
      })
      .catch((error) => {
        this.toast.showError(error);
        this.loading = false;
      });
  }

  public ngOnDestroy(): void {
    this.cleanupTranslation();
    this.subscription.unsubscribe();
  }

  public settingChanged(): void {
    this.cleanupTranslation();
  }

  private cleanupTranslation(): void {
    if (this?.savedLanguage) {
      this.translate.use(this?.savedLanguage);
    } else {
      this.translate.use(this.translate.defaultLang);
    }
  }

  public changeUsername(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        confirmKey: 'ACTIONS.CHANGE',
        cancelKey: 'ACTIONS.CANCEL',
        labelKey: 'ACTIONS.NEWVALUE',
        titleKey: 'USER.PROFILE.CHANGEUSERNAME_TITLE',
        descriptionKey: 'USER.PROFILE.CHANGEUSERNAME_DESC',
        value: this.user?.userName,
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((resp: { value: string }) => {
      if (resp && resp.value && resp.value !== this.user?.userName) {
        this.userService
          .updateMyUserName(resp.value)
          .then(() => {
            this.toast.showInfo('USER.TOAST.USERNAMECHANGED', true);
            this.refreshUser();
          })
          .catch((error) => {
            this.toast.showError(error);
          });
      }
    });
  }

  public saveProfile(profileData: Profile.AsObject): void {
    if (this.user?.human) {
      this.user.human.profile = profileData;

      this.userService
        .updateMyProfile(
          this.user.human.profile?.firstName,
          this.user.human.profile?.lastName,
          this.user.human.profile?.nickName,
          this.user.human.profile?.displayName,
          this.user.human.profile?.preferredLanguage,
          this.user.human.profile?.gender,
        )
        .then(() => {
          this.toast.showInfo('USER.TOAST.SAVED', true);
          this.savedLanguage = this.user?.human?.profile?.preferredLanguage;
          this.refreshChanges$.emit();
        })
        .catch((error) => {
          this.toast.showError(error);
        });
    }
  }

  public saveEmail(email: string): void {
    this.userService
      .setMyEmail(email)
      .then(() => {
        this.toast.showInfo('USER.TOAST.EMAILSAVED', true);
        if (this.user?.human) {
          const mailToSet = new Email();
          mailToSet.setEmail(email);
          this.user.human.email = mailToSet.toObject();
          this.refreshUser();
        }
      })
      .catch((error) => {
        this.toast.showError(error);
      });
  }

  public enteredPhoneCode(code: string): void {
    this.userService
      .verifyMyPhone(code)
      .then(() => {
        this.toast.showInfo('USER.TOAST.PHONESAVED', true);
        this.refreshUser();
        this.promptSetupforSMSOTP();
      })
      .catch((error) => {
        this.toast.showError(error);
      });
  }

  public promptSetupforSMSOTP(): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        confirmKey: 'ACTIONS.CONTINUE',
        cancelKey: 'ACTIONS.CANCEL',
        titleKey: 'USER.MFA.OTPSMS',
        descriptionKey: 'USER.MFA.SETUPOTPSMSDESCRIPTION',
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.userService.addMyAuthFactorOTPSMS().then(() => {
          this.translate
            .get('USER.MFA.OTPSMSSUCCESS')
            .pipe(take(1))
            .subscribe((msg) => {
              this.toast.showInfo(msg);
            });
        });
      }
    });
  }

  public changedLanguage(language: string): void {
    this.translate.use(language);
  }

  public resendPhoneVerification(): void {
    this.userService
      .resendMyPhoneVerification()
      .then(() => {
        this.toast.showInfo('USER.TOAST.PHONEVERIFICATIONSENT', true);
        this.refreshChanges$.emit();
      })
      .catch((error) => {
        this.toast.showError(error);
      });
  }

  public resendEmailVerification(): void {
    this.userService
      .resendMyEmailVerification()
      .then(() => {
        this.toast.showInfo('USER.TOAST.EMAILVERIFICATIONSENT', true);
        this.refreshChanges$.emit();
      })
      .catch((error) => {
        this.toast.showError(error);
      });
  }

  public deletePhone(): void {
    this.userService
      .removeMyPhone()
      .then(() => {
        this.toast.showInfo('USER.TOAST.PHONEREMOVED', true);
        if (this.user?.human?.phone) {
          const phone = new Phone();
          this.user.human.phone = phone.toObject();
          this.refreshUser();
        }
      })
      .catch((error) => {
        this.toast.showError(error);
      });
  }

  public savePhone(phone: string): void {
    if (this.user?.human) {
      // Format phone before save (add +)
      const formattedPhone = formatPhone(phone);
      if (formattedPhone) {
        phone = formattedPhone.phone;
      }

      this.userService
        .setMyPhone(phone)
        .then(() => {
          this.toast.showInfo('USER.TOAST.PHONESAVED', true);
          if (this.user?.human) {
            const phoneToSet = new Phone();
            phoneToSet.setPhone(phone);
            this.user.human.phone = phoneToSet.toObject();
            this.refreshUser();
          }
        })
        .catch((error) => {
          this.toast.showError(error);
        });
    }
  }

  public openEditDialog(type: EditDialogType): void {
    switch (type) {
      case EditDialogType.PHONE:
        const dialogRefPhone = this.dialog.open(EditDialogComponent, {
          data: {
            confirmKey: 'ACTIONS.SAVE',
            cancelKey: 'ACTIONS.CANCEL',
            labelKey: 'USER.LOGINMETHODS.PHONE.EDITVALUE',
            titleKey: 'USER.LOGINMETHODS.PHONE.EDITTITLE',
            descriptionKey: 'USER.LOGINMETHODS.PHONE.EDITDESC',
            value: this.user?.human?.phone?.phone,
            type: type,
            validator: Validators.compose([phoneValidator, requiredValidator]),
          },
          width: '400px',
        });

        dialogRefPhone.afterClosed().subscribe((resp: { value: string; isVerified: boolean }) => {
          if (resp && resp.value) {
            this.savePhone(resp.value);
          }
        });
        break;
      case EditDialogType.EMAIL:
        const dialogRefEmail = this.dialog.open(EditDialogComponent, {
          data: {
            confirmKey: 'ACTIONS.SAVE',
            cancelKey: 'ACTIONS.CANCEL',
            labelKey: 'ACTIONS.NEWVALUE',
            titleKey: 'USER.LOGINMETHODS.EMAIL.EDITTITLE',
            descriptionKey: 'USER.LOGINMETHODS.EMAIL.EDITDESC',
            value: this.user?.human?.email?.email,
            type: type,
          },
          width: '400px',
        });

        dialogRefEmail.afterClosed().subscribe((resp: { value: string; isVerified: boolean }) => {
          if (resp && resp.value) {
            this.saveEmail(resp.value);
          }
        });
        break;
    }
  }

  public deleteAccount(): void {
    const dialogRef = this.dialog.open(WarnDialogComponent, {
      data: {
        confirmKey: 'USER.DIALOG.DELETE_BTN',
        cancelKey: 'ACTIONS.CANCEL',
        titleKey: 'USER.DIALOG.DELETE_TITLE',
        descriptionKey: 'USER.DIALOG.DELETE_AUTH_DESCRIPTION',
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.userService
          .RemoveMyUser()
          .then(() => {
            this.toast.showInfo('USER.PAGES.DELETEACCOUNT_SUCCESS', true);
            this.auth.signout();
          })
          .catch((error) => {
            this.toast.showError(error);
          });
      }
    });
  }

  public loadMetadata(): void {
    if (this.user) {
      this.userService.isAllowed(['user.read']).subscribe((allowed) => {
        if (allowed) {
          this.loadingMetadata = true;
          this.mgmt
            .listUserMetadata(this.user?.id ?? '')
            .then((resp) => {
              this.loadingMetadata = false;
              this.metadata = resp.resultList.map((md) => {
                return {
                  key: md.key,
                  value: Buffer.from(md.value as string, 'base64').toString('utf8'),
                };
              });
            })
            .catch((error) => {
              this.loadingMetadata = false;
              this.toast.showError(error);
            });
        }
      });
    }
  }

  public editMetadata(): void {
    if (this.user && this.user.id) {
      const setFcn = (key: string, value: string): Promise<any> =>
        this.mgmt.setUserMetadata(key, Buffer.from(value).toString('base64'), this.user?.id ?? '');
      const removeFcn = (key: string): Promise<any> => this.mgmt.removeUserMetadata(key, this.user?.id ?? '');

      const dialogRef = this.dialog.open(MetadataDialogComponent, {
        data: {
          metadata: this.metadata,
          setFcn: setFcn,
          removeFcn: removeFcn,
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.loadMetadata();
      });
    }
  }
}
