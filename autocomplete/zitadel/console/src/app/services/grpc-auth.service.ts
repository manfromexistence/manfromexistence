import { Injectable } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, finalize, map, switchMap, timeout, withLatestFrom } from 'rxjs/operators';

import {
  AddMyAuthFactorOTPEmailRequest,
  AddMyAuthFactorOTPEmailResponse,
  AddMyAuthFactorOTPRequest,
  AddMyAuthFactorOTPResponse,
  AddMyAuthFactorOTPSMSRequest,
  AddMyAuthFactorOTPSMSResponse,
  AddMyAuthFactorU2FRequest,
  AddMyAuthFactorU2FResponse,
  AddMyPasswordlessLinkRequest,
  AddMyPasswordlessLinkResponse,
  AddMyPasswordlessRequest,
  AddMyPasswordlessResponse,
  GetMyEmailRequest,
  GetMyEmailResponse,
  GetMyLabelPolicyRequest,
  GetMyLoginPolicyRequest,
  GetMyLoginPolicyResponse,
  GetMyPasswordComplexityPolicyRequest,
  GetMyPasswordComplexityPolicyResponse,
  GetMyPhoneRequest,
  GetMyPhoneResponse,
  GetMyPrivacyPolicyRequest,
  GetMyPrivacyPolicyResponse,
  GetMyProfileRequest,
  GetMyProfileResponse,
  GetMyUserRequest,
  GetMyUserResponse,
  ListMyAuthFactorsRequest,
  ListMyAuthFactorsResponse,
  ListMyLinkedIDPsRequest,
  ListMyLinkedIDPsResponse,
  ListMyMembershipsRequest,
  ListMyMembershipsResponse,
  ListMyMetadataRequest,
  ListMyMetadataResponse,
  ListMyPasswordlessRequest,
  ListMyPasswordlessResponse,
  ListMyProjectOrgsRequest,
  ListMyProjectOrgsResponse,
  ListMyUserChangesRequest,
  ListMyUserChangesResponse,
  ListMyUserGrantsRequest,
  ListMyUserGrantsResponse,
  ListMyUserSessionsRequest,
  ListMyUserSessionsResponse,
  ListMyZitadelPermissionsRequest,
  ListMyZitadelPermissionsResponse,
  RemoveMyAuthFactorOTPEmailRequest,
  RemoveMyAuthFactorOTPEmailResponse,
  RemoveMyAuthFactorOTPRequest,
  RemoveMyAuthFactorOTPResponse,
  RemoveMyAuthFactorOTPSMSRequest,
  RemoveMyAuthFactorOTPSMSResponse,
  RemoveMyAuthFactorU2FRequest,
  RemoveMyAuthFactorU2FResponse,
  RemoveMyAvatarRequest,
  RemoveMyAvatarResponse,
  RemoveMyLinkedIDPRequest,
  RemoveMyLinkedIDPResponse,
  RemoveMyPasswordlessRequest,
  RemoveMyPasswordlessResponse,
  RemoveMyPhoneRequest,
  RemoveMyPhoneResponse,
  RemoveMyUserRequest,
  RemoveMyUserResponse,
  ResendMyEmailVerificationRequest,
  ResendMyEmailVerificationResponse,
  ResendMyPhoneVerificationRequest,
  ResendMyPhoneVerificationResponse,
  SendMyPasswordlessLinkRequest,
  SendMyPasswordlessLinkResponse,
  SetMyEmailRequest,
  SetMyEmailResponse,
  SetMyPhoneRequest,
  SetMyPhoneResponse,
  UpdateMyPasswordRequest,
  UpdateMyPasswordResponse,
  UpdateMyProfileRequest,
  UpdateMyProfileResponse,
  UpdateMyUserNameRequest,
  UpdateMyUserNameResponse,
  VerifyMyAuthFactorOTPRequest,
  VerifyMyAuthFactorOTPResponse,
  VerifyMyAuthFactorU2FRequest,
  VerifyMyAuthFactorU2FResponse,
  VerifyMyPasswordlessRequest,
  VerifyMyPasswordlessResponse,
  VerifyMyPhoneRequest,
  VerifyMyPhoneResponse,
} from '../proto/generated/zitadel/auth_pb';
import { ChangeQuery } from '../proto/generated/zitadel/change_pb';
import { MetadataQuery } from '../proto/generated/zitadel/metadata_pb';
import { ListQuery } from '../proto/generated/zitadel/object_pb';
import { Org, OrgFieldName, OrgQuery } from '../proto/generated/zitadel/org_pb';
import { LabelPolicy } from '../proto/generated/zitadel/policy_pb';
import { Gender, MembershipQuery, User, WebAuthNVerification } from '../proto/generated/zitadel/user_pb';
import { GrpcService } from './grpc.service';
import { StorageKey, StorageLocation, StorageService } from './storage.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class GrpcAuthService {
  private _activeOrgChanged: Subject<Org.AsObject | undefined> = new Subject();
  public user!: Observable<User.AsObject | undefined>;
  public userSubject: BehaviorSubject<User.AsObject | undefined> = new BehaviorSubject<User.AsObject | undefined>(undefined);
  private triggerPermissionsRefresh: Subject<void> = new Subject();
  public zitadelPermissions$: Observable<string[]> = this.triggerPermissionsRefresh.pipe(
    switchMap(() =>
      from(this.listMyZitadelPermissions()).pipe(
        map((rolesResp) => rolesResp.resultList),
        filter((roles) => !!roles.length),
        catchError((_) => {
          return of([]);
        }),
        distinctUntilChanged((a, b) => {
          return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
        }),
        finalize(() => {
          this.fetchedZitadelPermissions.next(true);
        }),
      ),
    ),
  );

  public labelpolicy$!: Observable<LabelPolicy.AsObject>;
  public labelpolicy: BehaviorSubject<LabelPolicy.AsObject | undefined> = new BehaviorSubject<
    LabelPolicy.AsObject | undefined
  >(undefined);
  labelPolicyLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public zitadelPermissions: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public readonly fetchedZitadelPermissions: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public cachedOrgs: BehaviorSubject<Org.AsObject[]> = new BehaviorSubject<Org.AsObject[]>([]);
  private cachedLabelPolicies: { [orgId: string]: LabelPolicy.AsObject } = {};

  constructor(
    private readonly grpcService: GrpcService,
    private oauthService: OAuthService,
    private storage: StorageService,
  ) {
    this.zitadelPermissions$.subscribe(this.zitadelPermissions);

    this.labelpolicy$ = this.activeOrgChanged.pipe(
      switchMap((org) => {
        this.labelPolicyLoading$.next(true);
        return from(this.getMyLabelPolicy(org ? org.id : ''));
      }),
      filter((policy) => !!policy),
    );

    this.labelpolicy$.subscribe({
      next: (policy) => {
        this.labelpolicy.next(policy);
        this.labelPolicyLoading$.next(false);
      },
      error: (error) => {
        console.error(error);
        this.labelPolicyLoading$.next(false);
      },
    });

    this.user = forkJoin([
      of(this.oauthService.getAccessToken()),
      this.oauthService.events.pipe(
        filter((e) => e.type === 'token_received'),
        timeout(this.oauthService.waitForTokenInMsec || 0),
        catchError((_) => of(null)), // timeout is not an error
        map((_) => this.oauthService.getAccessToken()),
      ),
    ]).pipe(
      filter((token) => (token ? true : false)),
      distinctUntilChanged(),
      switchMap(() => {
        return from(
          this.getMyUser().then((resp) => {
            return resp.user;
          }),
        );
      }),
      finalize(() => {
        this.loadPermissions();
      }),
    );

    this.user.subscribe(this.userSubject);

    this.activeOrgChanged.subscribe(() => {
      this.loadPermissions();
    });
  }

  public listMyMetadata(
    offset?: number,
    limit?: number,
    queryList?: MetadataQuery[],
  ): Promise<ListMyMetadataResponse.AsObject> {
    const req = new ListMyMetadataRequest();
    const metadata = new ListQuery();
    if (offset) {
      metadata.setOffset(offset);
    }
    if (limit) {
      metadata.setLimit(limit);
    }
    if (queryList) {
      req.setQueriesList(queryList);
    }
    return this.grpcService.auth.listMyMetadata(req, null).then((resp) => resp.toObject());
  }

  public async getActiveOrg(id?: string): Promise<Org.AsObject> {
    if (id) {
      const find = this.cachedOrgs.getValue().find((tmp) => tmp.id === id);
      if (find) {
        this.setActiveOrg(find);
        return Promise.resolve(find);
      } else {
        const orgs = (await this.listMyProjectOrgs(10, 0)).resultList;
        this.cachedOrgs.next(orgs);
        const toFind = orgs.find((tmp) => tmp.id === id);
        if (toFind) {
          this.setActiveOrg(toFind);
          return Promise.resolve(toFind);
        } else {
          return Promise.reject(new Error('requested organization not found'));
        }
      }
    } else {
      let orgs = this.cachedOrgs.getValue();
      if (orgs.length === 0) {
        orgs = (await this.listMyProjectOrgs()).resultList;
        this.cachedOrgs.next(orgs);
      }

      const org = this.storage.getItem<Org.AsObject>(StorageKey.organization, StorageLocation.local);
      if (org && orgs.find((tmp) => tmp.id === org.id)) {
        this.storage.setItem(StorageKey.organization, org, StorageLocation.session);
        this.setActiveOrg(org);
        return Promise.resolve(org);
      }

      if (orgs.length === 0) {
        this._activeOrgChanged.next(undefined);
        return Promise.reject(new Error('No organizations found!'));
      }
      const orgToSet = orgs.find((element) => element.id !== '0' && element.name !== '');

      if (orgToSet) {
        this.setActiveOrg(orgToSet);
        return Promise.resolve(orgToSet);
      }
      return Promise.resolve(orgs[0]);
    }
  }

  public get activeOrgChanged(): Observable<Org.AsObject | undefined> {
    return this._activeOrgChanged;
  }

  public setActiveOrg(org: Org.AsObject): void {
    // Set organization in localstorage to get the last used organization in a new tab
    this.storage.setItem(StorageKey.organization, org, StorageLocation.local);
    this.storage.setItem(StorageKey.organization, org, StorageLocation.session);
    this._activeOrgChanged.next(org);
  }

  private loadPermissions(): void {
    this.triggerPermissionsRefresh.next();
  }

  /**
   * returns true if user has one of the provided roles
   * @param roles roles of the user
   */
  public isAllowed(roles: string[] | RegExp[], requiresAll: boolean = false): Observable<boolean> {
    if (roles && roles.length > 0) {
      return this.fetchedZitadelPermissions.pipe(
        withLatestFrom(this.zitadelPermissions),
        filter(([hL, p]) => {
          return hL === true && !!p.length;
        }),
        map(([_, zroles]) => this.hasRoles(zroles, roles, requiresAll)),
        distinctUntilChanged(),
      );
    } else {
      return of(false);
    }
  }

  /**
   * filters objects based on roles
   * @param objects array of objects
   * @param mapper mapping function which maps to a string[] or Regexp[] of roles
   * @param requiresAll wheter all, or just a single roles is required to fulfill
   */
  public isAllowedMapper<T>(
    objects: T[],
    mapper: (attr: any) => string[] | RegExp[],
    requiresAll: boolean = false,
  ): Observable<T[]> {
    return this.fetchedZitadelPermissions.pipe(
      withLatestFrom(this.zitadelPermissions),
      filter(([hL, p]) => {
        return hL === true && !!p.length;
      }),
      map(([_, zroles]) => {
        return objects.filter((obj) => {
          const roles = mapper(obj);
          return this.hasRoles(zroles, roles, requiresAll);
        });
      }),
    );
  }

  /**
   * returns true if user has one of the provided roles
   * @param userRoles roles of the user
   * @param requestedRoles required roles for accessing the respective component
   * @param requiresAll true - if all regexes must match, false - if only one regex must match
   */
  public hasRoles(userRoles: string[], requestedRoles: string[] | RegExp[], requiresAll: boolean = false): boolean {
    const test = (reqRegexp: string | RegExp) =>
      userRoles.some((role) => {
        return new RegExp(reqRegexp).test(role);
      });

    const allCheck = requestedRoles.map(test).every((x) => !!x);
    const oneCheck = requestedRoles.some(test);

    return requiresAll ? allCheck : oneCheck;
  }

  public getMyProfile(): Promise<GetMyProfileResponse.AsObject> {
    return this.grpcService.auth.getMyProfile(new GetMyProfileRequest(), null).then((resp) => resp.toObject());
  }

  public getMyPasswordComplexityPolicy(): Promise<GetMyPasswordComplexityPolicyResponse.AsObject> {
    return this.grpcService.auth
      .getMyPasswordComplexityPolicy(new GetMyPasswordComplexityPolicyRequest(), null)
      .then((resp) => resp.toObject());
  }

  public loadMyUser(): void {
    from(this.getMyUser())
      .pipe(
        map((resp) => resp.user),
        catchError((_) => {
          return of(undefined);
        }),
      )
      .subscribe((user) => {
        this.userSubject.next(user);
      });
  }

  public getMyUser(): Promise<GetMyUserResponse.AsObject> {
    return this.grpcService.auth.getMyUser(new GetMyUserRequest(), null).then((resp) => resp.toObject());
  }

  public listMyMultiFactors(): Promise<ListMyAuthFactorsResponse.AsObject> {
    return this.grpcService.auth.listMyAuthFactors(new ListMyAuthFactorsRequest(), null).then((resp) => resp.toObject());
  }

  public async revalidateOrgs() {
    const orgs = (await this.listMyProjectOrgs()).resultList;
    this.cachedOrgs.next(orgs);
  }

  public listMyProjectOrgs(
    limit?: number,
    offset?: number,
    queryList?: OrgQuery[],
    sortingColumn?: OrgFieldName,
    sortingDirection?: SortDirection,
  ): Promise<ListMyProjectOrgsResponse.AsObject> {
    const req = new ListMyProjectOrgsRequest();
    const query = new ListQuery();
    if (offset) {
      query.setOffset(offset);
    }
    if (limit) {
      query.setLimit(limit);
    }
    if (queryList) {
      req.setQueriesList(queryList);
    }
    // if (sortingColumn) {
    //     req.setSortingColumn(sortingColumn);
    // }

    req.setQuery(query);

    return this.grpcService.auth.listMyProjectOrgs(req, null).then((resp) => resp.toObject());
  }

  public updateMyProfile(
    firstName?: string,
    lastName?: string,
    nickName?: string,
    displayName?: string,
    preferredLanguage?: string,
    gender?: Gender,
  ): Promise<UpdateMyProfileResponse.AsObject> {
    const req = new UpdateMyProfileRequest();
    if (firstName) {
      req.setFirstName(firstName);
    }
    if (lastName) {
      req.setLastName(lastName);
    }
    if (nickName) {
      req.setNickName(nickName);
    }
    if (displayName) {
      req.setDisplayName(displayName);
    }
    if (gender) {
      req.setGender(gender);
    }
    if (preferredLanguage) {
      req.setPreferredLanguage(preferredLanguage);
    }
    return this.grpcService.auth.updateMyProfile(req, null).then((resp) => resp.toObject());
  }

  public listMyUserSessions(): Promise<ListMyUserSessionsResponse.AsObject> {
    const req = new ListMyUserSessionsRequest();
    return this.grpcService.auth.listMyUserSessions(req, null).then((resp) => resp.toObject());
  }

  public listMyUserGrants(limit?: number, offset?: number, asc?: boolean): Promise<ListMyUserGrantsResponse.AsObject> {
    const req = new ListMyUserGrantsRequest();
    const query = new ListQuery();
    if (limit) {
      query.setLimit(limit);
    }
    if (offset) {
      query.setOffset(offset);
    }
    if (asc !== undefined) {
      query.setAsc(asc);
    }
    req.setQuery(query);
    return this.grpcService.auth.listMyUserGrants(req, null).then((resp) => resp.toObject());
  }

  public listMyMemberships(
    limit: number,
    offset: number,
    queryList?: MembershipQuery[],
  ): Promise<ListMyMembershipsResponse.AsObject> {
    const req = new ListMyMembershipsRequest();
    const metadata = new ListQuery();
    if (limit) {
      metadata.setLimit(limit);
    }
    if (offset) {
      metadata.setOffset(offset);
    }
    if (queryList) {
      req.setQueriesList(queryList);
    }
    req.setQuery(metadata);
    return this.grpcService.auth.listMyMemberships(req, null).then((resp) => resp.toObject());
  }

  public RemoveMyUser(): Promise<RemoveMyUserResponse.AsObject> {
    const req = new RemoveMyUserRequest();
    return this.grpcService.auth.removeMyUser(req, null).then((resp) => resp.toObject());
  }

  public getMyEmail(): Promise<GetMyEmailResponse.AsObject> {
    const req = new GetMyEmailRequest();
    return this.grpcService.auth.getMyEmail(req, null).then((resp) => resp.toObject());
  }

  public setMyEmail(email: string): Promise<SetMyEmailResponse.AsObject> {
    const req = new SetMyEmailRequest();
    req.setEmail(email);
    return this.grpcService.auth.setMyEmail(req, null).then((resp) => resp.toObject());
  }

  public resendMyEmailVerification(): Promise<ResendMyEmailVerificationResponse.AsObject> {
    const req = new ResendMyEmailVerificationRequest();
    return this.grpcService.auth.resendMyEmailVerification(req, null).then((resp) => resp.toObject());
  }

  public getMyLoginPolicy(): Promise<GetMyLoginPolicyResponse.AsObject> {
    const req = new GetMyLoginPolicyRequest();
    return this.grpcService.auth.getMyLoginPolicy(req, null).then((resp) => resp.toObject());
  }

  public removeMyPhone(): Promise<RemoveMyPhoneResponse.AsObject> {
    return this.grpcService.auth.removeMyPhone(new RemoveMyPhoneRequest(), null).then((resp) => resp.toObject());
  }

  public updateMyUserName(username: string): Promise<UpdateMyUserNameResponse.AsObject> {
    const req = new UpdateMyUserNameRequest();
    req.setUserName(username);
    return this.grpcService.auth.updateMyUserName(req, null).then((resp) => resp.toObject());
  }

  public listMyZitadelPermissions(): Promise<ListMyZitadelPermissionsResponse.AsObject> {
    return this.grpcService.auth
      .listMyZitadelPermissions(new ListMyZitadelPermissionsRequest(), null)
      .then((resp) => resp.toObject());
  }

  public getMyPhone(): Promise<GetMyPhoneResponse.AsObject> {
    return this.grpcService.auth.getMyPhone(new GetMyPhoneRequest(), null).then((resp) => resp.toObject());
  }

  public setMyPhone(phone: string): Promise<SetMyPhoneResponse.AsObject> {
    const req = new SetMyPhoneRequest();
    req.setPhone(phone);
    return this.grpcService.auth.setMyPhone(req, null).then((resp) => resp.toObject());
  }

  public resendMyPhoneVerification(): Promise<ResendMyPhoneVerificationResponse.AsObject> {
    const req = new ResendMyPhoneVerificationRequest();
    return this.grpcService.auth.resendMyPhoneVerification(req, null).then((resp) => resp.toObject());
  }

  public updateMyPassword(oldPassword: string, newPassword: string): Promise<UpdateMyPasswordResponse.AsObject> {
    const req = new UpdateMyPasswordRequest();
    req.setOldPassword(oldPassword);
    req.setNewPassword(newPassword);
    return this.grpcService.auth.updateMyPassword(req, null).then((resp) => resp.toObject());
  }

  public removeMyLinkedIDP(idpId: string, linkedUserId: string): Promise<RemoveMyLinkedIDPResponse.AsObject> {
    const req = new RemoveMyLinkedIDPRequest();
    req.setLinkedUserId(linkedUserId);
    req.setIdpId(idpId);
    return this.grpcService.auth.removeMyLinkedIDP(req, null).then((resp) => resp.toObject());
  }

  public removeMyAvatar(): Promise<RemoveMyAvatarResponse.AsObject> {
    const req = new RemoveMyAvatarRequest();
    return this.grpcService.auth.removeMyAvatar(req, null).then((resp) => resp.toObject());
  }

  public listMyLinkedIDPs(limit: number, offset: number): Promise<ListMyLinkedIDPsResponse.AsObject> {
    const req = new ListMyLinkedIDPsRequest();
    const metadata = new ListQuery();
    if (limit) {
      metadata.setLimit(limit);
    }
    if (offset) {
      metadata.setOffset(offset);
    }
    req.setQuery(metadata);
    return this.grpcService.auth.listMyLinkedIDPs(req, null).then((resp) => resp.toObject());
  }

  public addMyMultiFactorOTP(): Promise<AddMyAuthFactorOTPResponse.AsObject> {
    return this.grpcService.auth.addMyAuthFactorOTP(new AddMyAuthFactorOTPRequest(), null).then((resp) => resp.toObject());
  }

  public addMyAuthFactorOTPSMS(): Promise<AddMyAuthFactorOTPSMSResponse.AsObject> {
    return this.grpcService.auth
      .addMyAuthFactorOTPSMS(new AddMyAuthFactorOTPSMSRequest(), null)
      .then((resp) => resp.toObject());
  }

  public addMyAuthFactorOTPEmail(): Promise<AddMyAuthFactorOTPEmailResponse.AsObject> {
    return this.grpcService.auth
      .addMyAuthFactorOTPEmail(new AddMyAuthFactorOTPEmailRequest(), null)
      .then((resp) => resp.toObject());
  }

  public addMyMultiFactorU2F(): Promise<AddMyAuthFactorU2FResponse.AsObject> {
    return this.grpcService.auth.addMyAuthFactorU2F(new AddMyAuthFactorU2FRequest(), null).then((resp) => resp.toObject());
  }

  public removeMyMultiFactorU2F(tokenId: string): Promise<RemoveMyAuthFactorU2FResponse.AsObject> {
    const req = new RemoveMyAuthFactorU2FRequest();
    req.setTokenId(tokenId);
    return this.grpcService.auth.removeMyAuthFactorU2F(req, null).then((resp) => resp.toObject());
  }

  public verifyMyMultiFactorU2F(credential: string, tokenname: string): Promise<VerifyMyAuthFactorU2FResponse.AsObject> {
    const req = new VerifyMyAuthFactorU2FRequest();
    const verification = new WebAuthNVerification();
    verification.setPublicKeyCredential(credential);
    verification.setTokenName(tokenname);
    req.setVerification(verification);

    return this.grpcService.auth.verifyMyAuthFactorU2F(req, null).then((resp) => resp.toObject());
  }

  public listMyPasswordless(): Promise<ListMyPasswordlessResponse.AsObject> {
    return this.grpcService.auth.listMyPasswordless(new ListMyPasswordlessRequest(), null).then((resp) => resp.toObject());
  }

  public addMyPasswordless(): Promise<AddMyPasswordlessResponse.AsObject> {
    return this.grpcService.auth.addMyPasswordless(new AddMyPasswordlessRequest(), null).then((resp) => resp.toObject());
  }

  public removeMyPasswordless(tokenId: string): Promise<RemoveMyPasswordlessResponse.AsObject> {
    const req = new RemoveMyPasswordlessRequest();
    req.setTokenId(tokenId);
    return this.grpcService.auth.removeMyPasswordless(req, null).then((resp) => resp.toObject());
  }

  public verifyMyPasswordless(credential: string, tokenname: string): Promise<VerifyMyPasswordlessResponse.AsObject> {
    const req = new VerifyMyPasswordlessRequest();
    const verification = new WebAuthNVerification();
    verification.setTokenName(tokenname);
    verification.setPublicKeyCredential(credential);
    req.setVerification(verification);

    return this.grpcService.auth.verifyMyPasswordless(req, null).then((resp) => resp.toObject());
  }

  public sendMyPasswordlessLink(): Promise<SendMyPasswordlessLinkResponse.AsObject> {
    const req = new SendMyPasswordlessLinkRequest();
    return this.grpcService.auth.sendMyPasswordlessLink(req, null).then((resp) => resp.toObject());
  }

  public addMyPasswordlessLink(): Promise<AddMyPasswordlessLinkResponse.AsObject> {
    const req = new AddMyPasswordlessLinkRequest();
    return this.grpcService.auth.addMyPasswordlessLink(req, null).then((resp) => resp.toObject());
  }

  public removeMyMultiFactorOTP(): Promise<RemoveMyAuthFactorOTPResponse.AsObject> {
    return this.grpcService.auth
      .removeMyAuthFactorOTP(new RemoveMyAuthFactorOTPRequest(), null)
      .then((resp) => resp.toObject());
  }

  public removeMyAuthFactorOTPSMS(): Promise<RemoveMyAuthFactorOTPSMSResponse.AsObject> {
    return this.grpcService.auth
      .removeMyAuthFactorOTPSMS(new RemoveMyAuthFactorOTPSMSRequest(), null)
      .then((resp) => resp.toObject());
  }

  public removeMyAuthFactorOTPEmail(): Promise<RemoveMyAuthFactorOTPEmailResponse.AsObject> {
    return this.grpcService.auth
      .removeMyAuthFactorOTPEmail(new RemoveMyAuthFactorOTPEmailRequest(), null)
      .then((resp) => resp.toObject());
  }

  public verifyMyMultiFactorOTP(code: string): Promise<VerifyMyAuthFactorOTPResponse.AsObject> {
    const req = new VerifyMyAuthFactorOTPRequest();
    req.setCode(code);
    return this.grpcService.auth.verifyMyAuthFactorOTP(req, null).then((resp) => resp.toObject());
  }

  public verifyMyPhone(code: string): Promise<VerifyMyPhoneResponse.AsObject> {
    const req = new VerifyMyPhoneRequest();
    req.setCode(code);
    return this.grpcService.auth.verifyMyPhone(req, null).then((resp) => resp.toObject());
  }

  public listMyUserChanges(limit: number, sequence: number): Promise<ListMyUserChangesResponse.AsObject> {
    const req = new ListMyUserChangesRequest();
    const query = new ChangeQuery();

    if (limit) {
      query.setLimit(limit);
    }
    if (sequence) {
      query.setSequence(sequence);
    }
    req.setQuery(query);
    return this.grpcService.auth.listMyUserChanges(req, null).then((resp) => resp.toObject());
  }

  public getMyLabelPolicy(orgIdForCache?: string): Promise<LabelPolicy.AsObject> {
    if (orgIdForCache && this.cachedLabelPolicies[orgIdForCache]) {
      return Promise.resolve(this.cachedLabelPolicies[orgIdForCache]);
    } else {
      return this.grpcService.auth
        .getMyLabelPolicy(new GetMyLabelPolicyRequest(), null)
        .then((resp) => resp.toObject())
        .then((resp) => {
          if (resp.policy) {
            if (orgIdForCache) {
              this.cachedLabelPolicies[orgIdForCache] = resp.policy;
            }
            return Promise.resolve(resp.policy);
          } else {
            return Promise.reject();
          }
        });
    }
  }

  public getMyPrivacyPolicy(): Promise<GetMyPrivacyPolicyResponse.AsObject> {
    return this.grpcService.auth.getMyPrivacyPolicy(new GetMyPrivacyPolicyRequest(), null).then((resp) => resp.toObject());
  }
}
