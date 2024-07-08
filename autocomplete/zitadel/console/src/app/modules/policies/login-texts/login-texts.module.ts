import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipeModule } from 'src/app/pipes/localized-date-pipe/localized-date-pipe.module';
import { TimestampToDatePipeModule } from 'src/app/pipes/timestamp-to-date-pipe/timestamp-to-date-pipe.module';

import { HasRoleModule } from '../../../directives/has-role/has-role.module';
import { DetailLayoutModule } from '../../../modules/detail-layout/detail-layout.module';
import { InputModule } from '../../../modules/input/input.module';
import { HasRolePipeModule } from '../../../pipes/has-role-pipe/has-role-pipe.module';
import { CardModule } from '../../card/card.module';
import { EditTextModule } from '../../edit-text/edit-text.module';
import { FormFieldModule } from '../../form-field/form-field.module';
import { InfoSectionModule } from '../../info-section/info-section.module';
import { WarnDialogModule } from '../../warn-dialog/warn-dialog.module';
import { LoginTextsRoutingModule } from './login-texts-routing.module';
import { LoginTextsComponent } from './login-texts.component';

@NgModule({
  declarations: [LoginTextsComponent],
  imports: [
    LoginTextsRoutingModule,
    MatSelectModule,
    CommonModule,
    InfoSectionModule,
    ReactiveFormsModule,
    FormsModule,
    InputModule,
    FormFieldModule,
    EditTextModule,
    MatButtonModule,
    MatIconModule,
    HasRoleModule,
    HasRolePipeModule,
    MatTooltipModule,
    TranslateModule,
    MatTooltipModule,
    DetailLayoutModule,
    MatProgressSpinnerModule,
    TextFieldModule,
    MatDialogModule,
    WarnDialogModule,
    CardModule,

    TimestampToDatePipeModule,
    LocalizedDatePipeModule,
  ],
  exports: [LoginTextsComponent],
})
export class LoginTextsPolicyModule {}
