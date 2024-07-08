import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CopyToClipboardModule } from 'src/app/directives/copy-to-clipboard/copy-to-clipboard.module';
import { CardModule } from 'src/app/modules/card/card.module';
import { InfoSectionModule } from 'src/app/modules/info-section/info-section.module';
import { InputModule } from 'src/app/modules/input/input.module';
import { PaginatorModule } from 'src/app/modules/paginator/paginator.module';
import { RefreshTableModule } from 'src/app/modules/refresh-table/refresh-table.module';
import { TableActionsModule } from 'src/app/modules/table-actions/table-actions.module';
import { HasRolePipeModule } from 'src/app/pipes/has-role-pipe/has-role-pipe.module';
import { LocalizedDatePipeModule } from 'src/app/pipes/localized-date-pipe/localized-date-pipe.module';
import { TimestampToDatePipeModule } from 'src/app/pipes/timestamp-to-date-pipe/timestamp-to-date-pipe.module';

import { IamViewsComponent } from './iam-views.component';

@NgModule({
  declarations: [IamViewsComponent],
  imports: [
    CommonModule,
    TableActionsModule,
    MatIconModule,
    CardModule,
    HasRolePipeModule,
    MatButtonModule,
    CopyToClipboardModule,
    InputModule,
    TranslateModule,
    InfoSectionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    RefreshTableModule,
    PaginatorModule,
    TimestampToDatePipeModule,
    LocalizedDatePipeModule,
    MatTableModule,
    MatSortModule,
  ],
  exports: [IamViewsComponent],
})
export default class IamViewsModule {}
