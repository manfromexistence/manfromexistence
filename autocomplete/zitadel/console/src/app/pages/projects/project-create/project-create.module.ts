import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CreateLayoutModule } from 'src/app/modules/create-layout/create-layout.module';
import { InputModule } from 'src/app/modules/input/input.module';

import { ProjectCreateRoutingModule } from './project-create-routing.module';
import { ProjectCreateComponent } from './project-create.component';

@NgModule({
  declarations: [ProjectCreateComponent],
  imports: [
    A11yModule,
    ProjectCreateRoutingModule,
    CommonModule,
    FormsModule,
    CreateLayoutModule,
    InputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
})
export default class ProjectCreateModule {}
