import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { HasRoleModule } from 'src/app/directives/has-role/has-role.module';
import { DetailLayoutModule } from 'src/app/modules/detail-layout/detail-layout.module';
import { InputModule } from 'src/app/modules/input/input.module';
import { HasRolePipeModule } from 'src/app/pipes/has-role-pipe/has-role-pipe.module';

import { CardModule } from '../../card/card.module';
import { InfoSectionModule } from '../../info-section/info-section.module';
import { WarnDialogModule } from '../../warn-dialog/warn-dialog.module';
import { PasswordComplexityPolicyComponent } from './password-complexity-policy.component';

@NgModule({
  declarations: [PasswordComplexityPolicyComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputModule,
    MatButtonModule,
    MatIconModule,
    HasRoleModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule,
    HasRolePipeModule,
    TranslateModule,
    WarnDialogModule,
    DetailLayoutModule,
    CardModule,
    MatProgressSpinnerModule,
    InfoSectionModule,
  ],
  exports: [PasswordComplexityPolicyComponent],
})
export class PasswordComplexityPolicyModule {}
