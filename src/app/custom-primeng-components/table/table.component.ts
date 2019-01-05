import { Component, ElementRef, NgZone, Directive , OnInit  , TemplateRef , Input} from '@angular/core';
import {Column} from 'primeng/components/common/shared';
import { CommonModule } from '@angular/common';
import {
    Table,
    TableService,
    TableBody,
    ScrollableView,
    SortableColumn,
    SortIcon,
    SelectableRow,
    SelectableRowDblClick,
    ContextMenuRow,
    RowToggler,
    ResizableColumn,
    ReorderableColumn,
    EditableColumn,
    CellEditor,
    TableRadioButton,
    TableCheckbox,
    TableHeaderCheckbox,
    ReorderableRow
} from 'primeng/components/table/table';
import { DomHandler } from 'primeng/components/dom/domhandler';
import { ObjectUtils } from 'primeng/components/utils/objectutils';
import { Subject, Subscription } from 'rxjs';
@Component({
    selector: 'app-custom-table',
    template: `
        <div #container [ngStyle]="style" [class]="styleClass"
            [ngClass]="{'ui-table ui-widget': true, 'ui-table-responsive': responsive, 'ui-table-resizable': resizableColumns,
                'ui-table-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),
                'ui-table-hoverable-rows': (rowHover||selectionMode), 'ui-table-auto-layout': autoLayout}">
            <div class="ui-table-loading ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-table-loading-content" *ngIf="loading">
                <i [class]="'ui-table-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="captionTemplate" class="ui-table-caption ui-widget-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>

            <div class="ui-table-wrapper" *ngIf="!scrollable">
                <table #table [ngClass]="tableStyleClass" [ngStyle]="tableStyle">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="ui-table-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tfoot class="ui-table-tfoot">
                        <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                    <tbody class="ui-table-tbody" [cpTableBody]="columns" [cpTableBodyTemplate]="bodyTemplate">
                    </tbody>
                </table>
            </div>

            <div class="ui-table-scrollable-wrapper" *ngIf="scrollable">
               <div class="ui-table-scrollable-view ui-table-frozen-view" *ngIf="frozenColumns||frozenBodyTemplate" [cpScrollableView]="frozenColumns" [frozen]="true" [ngStyle]="{width: frozenWidth}" [scrollHeight]="scrollHeight"></div>
               <div class="ui-table-scrollable-view" [cpScrollableView]="columns" [frozen]="false" [scrollHeight]="scrollHeight" [ngStyle]="{left: frozenWidth, width: 'calc(100% - '+frozenWidth+')'}"></div>
            </div>

            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div *ngIf="summaryTemplate" class="ui-table-summary ui-widget-header">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="ui-column-resizer-helper ui-state-highlight" style="display:none" *ngIf="resizableColumns"></div>

            <span #reorderIndicatorUp class="pi pi-arrow-down ui-table-reorder-indicator-up" style="display:none" *ngIf="reorderableColumns"></span>
            <span #reorderIndicatorDown class="pi pi-arrow-up ui-table-reorder-indicator-down" style="display:none" *ngIf="reorderableColumns"></span>
        </div>
    `,
    providers: [DomHandler, ObjectUtils, TableService, Table]
})
export class CustomTableComponent extends Table {

    constructor(public el: ElementRef,
        public domHandler: DomHandler,
        public objectUtils: ObjectUtils,
        public zone: NgZone,
        public tableService: TableService) {
        super(el, domHandler, objectUtils, zone, tableService);
    }

}

@Component({
    selector: '[cpTableBody]',
    template: `
    {{dt}}
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData)}"></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty()">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: {$implicit: columns}"></ng-container>
        </ng-container>
    `
})
export class CustomTableBody extends TableBody{
    @Input("cpTableBody") columns: Column[];

    @Input("cpTableBodyTemplate") template: TemplateRef<any>;
    constructor(public dt: CustomTableComponent) {
        super(dt);
    }
}

@Component({
    selector: '[cpScrollableView]',
    template: `
        <div #scrollHeader class="ui-table-scrollable-header ui-widget-header">
            <div #scrollHeaderBox class="ui-table-scrollable-header-box">
                <table class="ui-table-scrollable-header-table" [ngClass]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="ui-table-thead">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="ui-table-tbody">
                        <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.frozenValue" [ngForTrackBy]="dt.rowTrackBy">
                            <ng-container *ngTemplateOutlet="dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                        </ng-template>
                    </tbody>
                </table>
            </div>
        </div>
        <div #scrollBody class="ui-table-scrollable-body">
            <table #scrollTable [ngClass]="{'ui-table-scrollable-body-table': true, 'ui-table-virtual-table': dt.virtualScroll}" [class]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                <tbody class="ui-table-tbody" [cpTableBody]="columns" [cpTableBodyTemplate]="frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate"></tbody>
            </table>
            <div #virtualScroller class="ui-table-virtual-scroller"></div>
        </div>
        <div #scrollFooter *ngIf="dt.footerTemplate" class="ui-table-scrollable-footer ui-widget-header">
            <div #scrollFooterBox class="ui-table-scrollable-footer-box">
                <table class="ui-table-scrollable-footer-table" [ngClass]="dt.tableStyleClass" [ngStyle]="dt.tableStyle">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tfoot class="ui-table-tfoot">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
            </div>
        </div>
    `
})
export class CustomScrollableView extends ScrollableView {
    @Input("cpScrollableView") columns: Column[];
    constructor(public dt: CustomTableComponent, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) {
        super(dt, el, domHandler, zone);
    }
}

@Directive({
    selector: '[pcSortableColumn]',
    host: {
        '[class.ui-sortable-column]': 'isEnabled()',
        '[class.ui-state-highlight]': 'sorted',
        '[attr.tabindex]': 'isEnabled() ? "0" : null'
    }
})
export class CustomSortableColumn extends SortableColumn {

    constructor(public dt: CustomTableComponent, public domHandler: DomHandler) {
        super(dt, domHandler);
    }

}

@Component({
    selector: 'p-sortIcon',
    template: `
        <i class="ui-sortable-column-icon pi pi-fw" [ngClass]="{'pi-sort-up': sortOrder === 1, 'pi-sort-down': sortOrder === -1, 'pi-sort': sortOrder === 0}"></i>
    `
})
export class CustomSortIcon extends SortIcon {
    constructor(public dt: CustomTableComponent) {
        super(dt)
    }
}


@Directive({
    selector: '[pSelectableRow]',
    host: {
        '[class.ui-selectable-row]': 'isEnabled()',
        '[class.ui-state-highlight]': 'selected',
        '[attr.tabindex]': 'isEnabled() ? 0 : undefined',
    }
})
export class CustomSelectableRow extends SelectableRow {

    constructor(public dt: CustomTableComponent, public domHandler: DomHandler, public tableService: TableService) {
        super(dt, domHandler, tableService);
    }

}


@Directive({
    selector: '[pSelectableRowDblClick]',
    host: {
        '[class.ui-state-highlight]': 'selected'
    }
})
export class CustomSelectableRowDblClick extends SelectableRowDblClick {

    constructor(public dt: CustomTableComponent, public domHandler: DomHandler, public tableService: TableService) {
        super(dt, domHandler, tableService);
    }
}


@Directive({
    selector: '[pContextMenuRow]',
    host: {
        '[class.ui-contextmenu-selected]': 'selected'
    }
})
export class CustomContextMenuRow extends ContextMenuRow {

    constructor(public dt: CustomTableComponent, public tableService: TableService) {
        super(dt, tableService);
    }
}

@Directive({
    selector: '[pRowToggler]'
})
export class CustomRowToggler extends RowToggler {
    constructor(public dt: CustomTableComponent) {
        super(dt);
    }
}

@Directive({
    selector: '[pResizableColumn]'
})
export class CustomResizableColumn extends ResizableColumn  {

    constructor(public dt: CustomTableComponent, public el: ElementRef, public domHandler : DomHandler , public zone: NgZone) { 
        super(dt , el , domHandler , zone)
    }
}


@Directive({
    selector: '[pReorderableColumn]'
})
export class CustomReorderableColumn extends ReorderableColumn  {
    constructor(public dt: CustomTableComponent, public el: ElementRef, public domHandler : DomHandler, public zone: NgZone) { 
        super(dt, el , domHandler , zone)
    }
}

@Directive({
    selector: '[pEditableColumn]'
})
export class CustomEditableColumn extends EditableColumn  {

    constructor(public dt: CustomTableComponent, public el: ElementRef, public domHandler : DomHandler , public zone: NgZone) {
        super(dt , el , domHandler , zone)
    }
}

@Component({
    selector: 'p-cellEditor',
    template: `
        <ng-container *ngIf="dt.editingCell && dt.editingCell === editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!dt.editingCell || dt.editingCell !== editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `
})
export class CustomCellEditor extends CellEditor {
    constructor(public dt: CustomTableComponent, public editableColumn: EditableColumn) { 
        super(dt , editableColumn);
    }
}


@Component({
    selector: 'p-tableRadioButton',
    template: `
        <div class="ui-radiobutton ui-widget" (click)="onClick($event)">
            <div class="ui-helper-hidden-accessible">
                <input type="radio" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled">
            </div>
            <div #box [ngClass]="{'ui-radiobutton-box ui-widget ui-state-default':true,
                'ui-state-active':checked, 'ui-state-disabled':disabled}">
                <span class="ui-radiobutton-icon ui-clickable" [ngClass]="{'pi pi-circle-on':checked}"></span>
            </div>
        </div>
    `
})
export class CustomTableRadioButton extends TableRadioButton  {
    constructor(public dt: CustomTableComponent, public domHandler : DomHandler ,public tableService: TableService) {
        super(dt , domHandler , tableService)
    }
}


@Component({
    selector: 'p-tableCheckbox',
    template: `
        <div class="ui-chkbox ui-widget" (click)="onClick($event)">
            <div class="ui-helper-hidden-accessible">
                <input type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled">
            </div>
            <div #box [ngClass]="{'ui-chkbox-box ui-widget ui-state-default':true,
                'ui-state-active':checked, 'ui-state-disabled':disabled}">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `
})
export class CustomTableCheckbox extends TableCheckbox {
    constructor(public dt: CustomTableComponent, public domHandler : DomHandler, public tableService: TableService) {
        super(dt , domHandler , tableService);
    }
}

@Component({
    selector: 'p-tableHeaderCheckbox',
    template: `
        <div class="ui-chkbox ui-widget" (click)="onClick($event, cb.checked)">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="isDisabled()">
            </div>
            <div #box [ngClass]="{'ui-chkbox-box ui-widget ui-state-default':true,
                'ui-state-active':checked, 'ui-state-disabled': isDisabled()}">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `
})
export class CustomTableHeaderCheckbox extends TableHeaderCheckbox  {
    constructor(public dt: CustomTableComponent, public domHandler : DomHandler, public tableService: TableService) {
        super(dt , domHandler , tableService)
    }
}

@Directive({
    selector: '[pReorderableRow]'
})
export class CustomReorderableRow extends ReorderableRow  {

    constructor(public dt: CustomTableComponent, public el: ElementRef, public domHandler : DomHandler, public zone: NgZone) {
        super(dt , el , domHandler , zone)
    }
}