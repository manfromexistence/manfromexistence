import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HasRoleModule } from 'src/app/directives/has-role/has-role.module';
import { UserGrantsModule } from 'src/app/modules/user-grants/user-grants.module';
import { HasRolePipeModule } from 'src/app/pipes/has-role-pipe/has-role-pipe.module';

import { GrantsRoutingModule } from './grants-routing.module';
import { GrantsComponent } from './grants.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GrantsComponent],
  imports: [
    CommonModule,
    GrantsRoutingModule,
    UserGrantsModule,
    TranslateModule,
    HasRoleModule,
    HasRolePipeModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export default class GrantsModule {}
