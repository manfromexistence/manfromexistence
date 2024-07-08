import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { HasRoleModule } from 'src/app/directives/has-role/has-role.module';
import { DetailLayoutModule } from 'src/app/modules/detail-layout/detail-layout.module';
import { MembersTableModule } from 'src/app/modules/members-table/members-table.module';
import { HasRolePipeModule } from 'src/app/pipes/has-role-pipe/has-role-pipe.module';

import { ActionKeysModule } from '../action-keys/action-keys.module';
import { MemberCreateDialogModule } from '../add-member-dialog/member-create-dialog.module';
import { ProjectMembersRoutingModule } from './project-members-routing.module';
import { ProjectMembersComponent } from './project-members.component';

@NgModule({
  declarations: [ProjectMembersComponent],
  imports: [
    ProjectMembersRoutingModule,
    CommonModule,
    HasRoleModule,
    MatButtonModule,
    MatIconModule,
    ActionKeysModule,
    MatTooltipModule,
    TranslateModule,
    DetailLayoutModule,
    MatDialogModule,
    MembersTableModule,
    HasRolePipeModule,
    MemberCreateDialogModule,
  ],
})
export default class ProjectMembersModule {}
