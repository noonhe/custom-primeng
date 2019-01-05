import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimengComponentsModule} from '../primeng-components.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomTableComponent, CustomTableBody, CustomScrollableView, CustomSortableColumn, CustomSortIcon, CustomSelectableRow, CustomSelectableRowDblClick, CustomContextMenuRow, CustomRowToggler, CustomResizableColumn, CustomReorderableColumn, CustomEditableColumn, CustomCellEditor, CustomTableRadioButton, CustomTableCheckbox, CustomTableHeaderCheckbox, CustomReorderableRow } from './table/table.component';

@NgModule({
  declarations: [
    CustomTableComponent , 
    CustomTableBody , 
    CustomScrollableView , 
    CustomSortableColumn ,
    CustomSortIcon,
    CustomSelectableRow,
    CustomSelectableRowDblClick,
    CustomContextMenuRow,
    CustomRowToggler,
    CustomResizableColumn,
    CustomReorderableColumn,
    CustomEditableColumn,
    CustomCellEditor,
    CustomTableRadioButton,
    CustomTableCheckbox,
    CustomTableHeaderCheckbox,
    CustomReorderableRow ],
  imports: [
    CommonModule,
    PrimengComponentsModule,
    FormsModule,
    BrowserModule,
  ],
  exports:[
    CustomTableComponent,
    CustomTableBody , 
    CustomScrollableView , 
    CustomSortableColumn ,
    CustomSortIcon,
    CustomSelectableRow,
    CustomSelectableRowDblClick,
    CustomContextMenuRow,
    CustomRowToggler,
    CustomResizableColumn,
    CustomReorderableColumn,
    CustomEditableColumn,
    CustomCellEditor,
    CustomTableRadioButton,
    CustomTableCheckbox,
    CustomTableHeaderCheckbox,
    CustomReorderableRow],
})
export class CustomPrimengComponentsModule { }
