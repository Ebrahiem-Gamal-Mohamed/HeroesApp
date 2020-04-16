import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { InputSwitchModule } from "primeng/inputswitch";
import { DialogModule } from "primeng/dialog";

import { EmptyComponent } from "./_components/empty/empty.component";
import { FastAccessComponent } from "./_components/fast-access/fast-access.component";
import { HeaderComponent } from "./_components/header/header.component";
import { NgbdSortableHeader } from "./_directives/sortable.directive";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InputSwitchModule,
    DialogModule
  ],
  declarations: [
    EmptyComponent,
    FastAccessComponent,
    HeaderComponent,
    NgbdSortableHeader
  ],
  exports: [
    NgbModule,
    InputSwitchModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    EmptyComponent,
    FastAccessComponent,
    HeaderComponent,
    NgbdSortableHeader
  ],
  providers: [],
  entryComponents: [FastAccessComponent]
})
export class SharedModule {}
