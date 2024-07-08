import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { CreateLayoutComponent } from './create-layout.component';

@NgModule({
  declarations: [CreateLayoutComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslateModule, MatTooltipModule],
  exports: [CreateLayoutComponent],
})
export class CreateLayoutModule {}
