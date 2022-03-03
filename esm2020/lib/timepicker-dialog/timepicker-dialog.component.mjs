import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { twoDigits, convertHoursForMode } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/toolbar";
import * as i4 from "@angular/common";
import * as i5 from "../clock/clock.component";
function MatTimepickerComponentDialogComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function MatTimepickerComponentDialogComponent_ng_template_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.cancelClickHandler(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("color", ctx_r1.color);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.cancelLabel);
} }
function MatTimepickerComponentDialogComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function MatTimepickerComponentDialogComponent_ng_template_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.okClickHandler(); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.invalidSelection)("color", ctx_r3.color);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r3.okLabel);
} }
function MatTimepickerComponentDialogComponent_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function MatTimepickerComponentDialogComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 4);
} }
const _c0 = function (a0) { return { "select": a0 }; };
function MatTimepickerComponentDialogComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 16)(1, "span", 17);
    i0.ɵɵlistener("click", function MatTimepickerComponentDialogComponent_ng_template_18_Template_span_click_1_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(); return ctx_r15.setPm(); });
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "uppercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵlistener("click", function MatTimepickerComponentDialogComponent_ng_template_18_Template_span_click_4_listener() { i0.ɵɵrestoreView(_r16); const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.setAm(); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "uppercase");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, ctx_r8.isPm));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, ctx_r8.postMeridiemAbbreviation));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, !ctx_r8.isPm));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, ctx_r8.anteMeridiemAbbreviation));
} }
function MatTimepickerComponentDialogComponent_ng_container_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function MatTimepickerComponentDialogComponent_ng_container_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c1 = function (a0, a1) { return { label: a0, $implicit: a1 }; };
export class MatTimepickerComponentDialogComponent {
    constructor(data) {
        this.data = data;
        this.twoDigits = twoDigits;
        this.changeEvent = new EventEmitter();
        this.okClickEvent = new EventEmitter();
        this.cancelClickEvent = new EventEmitter();
        this.allowed24HourMap = null;
        this.allowed12HourMap = null;
        this.invalidSelection = false;
        this.viewType = 'hours';
        this.isPm = false;
        this.skipMinuteAutoSwitch = false;
        this.autoSwitchID = null;
        this.invalidMedianID = null;
        this.hasInvalidMeridiem = false;
        this.editHoursClicked = false;
        this.isClosing = false;
        this.okClickHandler = () => {
            if (this.hasInvalidMeridiem) {
                this.isPm = !this.isPm;
                this.hasInvalidMeridiem = false;
            }
            this.okClickEvent.emit(this.value);
        };
        this.cancelClickHandler = () => {
            this.cancelClickEvent.emit();
        };
        this.isPm = data.isPm;
        this.bindData(data);
        // keep this always at the bottom
        this.value = data.value;
    }
    set value(value) {
        value = value || this.minDate || this.maxDate || new Date();
        this.hours = value.getHours();
        this.minutes = value.getMinutes();
        this._value = value;
    }
    get value() { return this._value; }
    set hours(value) {
        this._hours = value;
        this._formattedHour = convertHoursForMode(this.hours, this.mode).hour;
    }
    get hours() { return this._hours; }
    get formattedHours() { return this._formattedHour; }
    bindData(data) {
        this.mode = data.mode;
        this.okLabel = data.okLabel;
        this.cancelLabel = data.cancelLabel;
        this.okButtonTemplate = data.okButtonTemplate;
        this.cancelButtonTemplate = data.cancelButtonTemplate;
        this.anteMeridiemAbbreviation = data.anteMeridiemAbbreviation;
        this.postMeridiemAbbreviation = data.postMeridiemAbbreviation;
        this.color = data.color;
        this.minDate = data.minDate;
        this.maxDate = data.maxDate;
        this.allowed12HourMap = data.allowed12HourMap;
        this.allowed24HourMap = data.allowed24HourMap;
    }
    ngDoCheck() { this.bindData(this.data); }
    handleClockChange({ value, type }) {
        const is24hoursAutoMeridiemChange = this.mode === '24h' && type === 'hours' && ((this.hours >= 12 && value < 12) || (this.hours < 12 && value >= 12));
        if ((this.hasInvalidMeridiem && this.mode === '12h') || is24hoursAutoMeridiemChange) {
            this.isPm = !this.isPm;
            this.hasInvalidMeridiem = false;
        }
        if ((type && type === 'hours') || (!type && this.viewType === 'hours')) {
            this.hours = value;
        }
        else if ((type && type === 'minutes') || (!type && this.viewType === 'minutes')) {
            this.minutes = value;
        }
        const newValue = new Date();
        const hours = this.isPm ? this.hours < 12 ? this.hours + 12 : this.hours : this.hours === 12 ? 0 : this.hours;
        newValue.setHours(hours);
        newValue.setMinutes(this.minutes);
        newValue.setSeconds(0);
        newValue.setMilliseconds(0);
        this.value = newValue;
        this.changeEvent.emit(newValue);
    }
    clearInvalidMeridiem() {
        this.hasInvalidMeridiem = false;
    }
    handleUnavailableSelection() {
        clearTimeout(this.autoSwitchID);
    }
    handleClockChangeDone(e) {
        e.preventDefault(); // prevent mouseUp after touchEnd
        if (this.viewType === 'hours' && !this.skipMinuteAutoSwitch) {
            this.autoSwitchID = setTimeout(() => {
                this.editMinutes();
                this.autoSwitchID = null;
            }, 300);
        }
    }
    editHours() {
        this.viewType = 'hours';
        this.editHoursClicked = true;
        setTimeout(() => { this.editHoursClicked = false; }, 0);
    }
    editMinutes() {
        if (this.hasInvalidMeridiem) {
            this.isPm = !this.isPm;
            this.hasInvalidMeridiem = false;
        }
        this.viewType = 'minutes';
    }
    invalidSelectionHandler(value) {
        this.invalidSelection = value;
    }
    invalidMeridiem() {
        if (this.viewType !== 'minutes' && this.editHoursClicked) {
            if (this.invalidMedianID) {
                return;
            }
            this.invalidMedianID = setTimeout(() => {
                this.isPm = !this.isPm;
                this.hasInvalidMeridiem = false;
            }, 0);
            return;
        }
        this.hasInvalidMeridiem = true;
    }
    meridiemChange(hours) {
        const changeData = {
            type: this.viewType,
            value: this.viewType === 'hours' ? hours : this.value.getMinutes()
        };
        this.handleClockChange(changeData);
    }
    setAm() {
        if (this.hours >= 12) {
            this.hours = this.hours - 12;
        }
        this.isPm = false;
        this.meridiemChange(this.hours);
    }
    setPm() {
        if (this.hours < 12) {
            this.hours = this.hours + 12;
        }
        this.isPm = true;
        this.meridiemChange(this.hours);
    }
}
MatTimepickerComponentDialogComponent.ɵfac = function MatTimepickerComponentDialogComponent_Factory(t) { return new (t || MatTimepickerComponentDialogComponent)(i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); };
MatTimepickerComponentDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MatTimepickerComponentDialogComponent, selectors: [["mat-timepicker-dialog"]], outputs: { changeEvent: "changeEvent", okClickEvent: "okClickEvent", cancelClickEvent: "cancelClickEvent" }, decls: 25, vars: 33, consts: [["defaultCancelButtonTemplate", ""], ["defaultOkButtonTemplate", ""], [1, "root"], [1, "header", 3, "color"], [1, "placeholder"], [1, "time-frame"], [1, "time", "fixed-font-size", 3, "ngClass", "click"], [1, "fixed-font-size"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["normal", ""], ["ampm", ""], [1, "body"], [3, "allowed12HourMap", "allowed24HourMap", "minDate", "maxDate", "color", "viewType", "mode", "formattedHours", "minutes", "formattedValue", "isPm", "changeEvent", "unavailableSelection", "invalidMeridiem", "mouseup", "clearInvalidMeridiem", "touchend", "invalidSelection"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["mat-button", "", 3, "color", "click"], ["mat-button", "", 3, "disabled", "color", "click"], [1, "ampm"], [1, "time", 3, "ngClass", "click"]], template: function MatTimepickerComponentDialogComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, MatTimepickerComponentDialogComponent_ng_template_0_Template, 2, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(2, MatTimepickerComponentDialogComponent_ng_template_2_Template, 2, 3, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementStart(4, "mat-dialog-content")(5, "div", 2)(6, "mat-toolbar", 3);
        i0.ɵɵelement(7, "div", 4);
        i0.ɵɵelementStart(8, "div", 5)(9, "span", 6);
        i0.ɵɵlistener("click", function MatTimepickerComponentDialogComponent_Template_span_click_9_listener() { return ctx.editHours(); });
        i0.ɵɵtext(10);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "span", 7);
        i0.ɵɵtext(12, ":");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(13, "span", 6);
        i0.ɵɵlistener("click", function MatTimepickerComponentDialogComponent_Template_span_click_13_listener() { return ctx.editMinutes(); });
        i0.ɵɵtext(14);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(15, MatTimepickerComponentDialogComponent_ng_container_15_Template, 1, 0, "ng-container", 8);
        i0.ɵɵtemplate(16, MatTimepickerComponentDialogComponent_ng_template_16_Template, 1, 0, "ng-template", null, 9, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(18, MatTimepickerComponentDialogComponent_ng_template_18_Template, 7, 12, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(20, "div", 11)(21, "mat-clock", 12);
        i0.ɵɵlistener("changeEvent", function MatTimepickerComponentDialogComponent_Template_mat_clock_changeEvent_21_listener($event) { return ctx.handleClockChange($event); })("unavailableSelection", function MatTimepickerComponentDialogComponent_Template_mat_clock_unavailableSelection_21_listener() { return ctx.handleUnavailableSelection(); })("invalidMeridiem", function MatTimepickerComponentDialogComponent_Template_mat_clock_invalidMeridiem_21_listener() { return ctx.invalidMeridiem(); })("mouseup", function MatTimepickerComponentDialogComponent_Template_mat_clock_mouseup_21_listener($event) { return ctx.handleClockChangeDone($event); })("clearInvalidMeridiem", function MatTimepickerComponentDialogComponent_Template_mat_clock_clearInvalidMeridiem_21_listener() { return ctx.clearInvalidMeridiem(); })("touchend", function MatTimepickerComponentDialogComponent_Template_mat_clock_touchend_21_listener($event) { return ctx.handleClockChangeDone($event); })("invalidSelection", function MatTimepickerComponentDialogComponent_Template_mat_clock_invalidSelection_21_listener($event) { return ctx.invalidSelectionHandler($event); });
        i0.ɵɵelementEnd()()()();
        i0.ɵɵelementStart(22, "mat-dialog-actions");
        i0.ɵɵtemplate(23, MatTimepickerComponentDialogComponent_ng_container_23_Template, 1, 0, "ng-container", 13);
        i0.ɵɵtemplate(24, MatTimepickerComponentDialogComponent_ng_container_24_Template, 1, 0, "ng-container", 13);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(1);
        const _r2 = i0.ɵɵreference(3);
        const _r5 = i0.ɵɵreference(17);
        const _r7 = i0.ɵɵreference(19);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("color", ctx.color);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(23, _c0, ctx.viewType === "hours" && "active"));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.twoDigits(ctx.formattedHours), " ");
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(25, _c0, ctx.viewType === "minutes" && "active"));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.twoDigits(ctx.minutes), " ");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.mode === "12h")("ngIfThen", _r7)("ngIfElse", _r5);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("allowed12HourMap", ctx.allowed12HourMap)("allowed24HourMap", ctx.allowed24HourMap)("minDate", ctx.minDate)("maxDate", ctx.maxDate)("color", ctx.color)("viewType", ctx.viewType)("mode", ctx.mode)("formattedHours", ctx.formattedHours)("minutes", ctx.minutes)("formattedValue", ctx.viewType === "minutes" ? ctx.minutes : ctx.formattedHours)("isPm", ctx.isPm);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.cancelButtonTemplate || _r0)("ngTemplateOutletContext", i0.ɵɵpureFunction2(27, _c1, ctx.cancelLabel, ctx.cancelClickHandler));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngTemplateOutlet", ctx.okButtonTemplate || _r2)("ngTemplateOutletContext", i0.ɵɵpureFunction2(30, _c1, ctx.okLabel, ctx.okClickHandler));
    } }, directives: [i1.MatButton, i2.MatDialogContent, i3.MatToolbar, i4.NgClass, i4.NgIf, i5.ClockComponent, i2.MatDialogActions, i4.NgTemplateOutlet], pipes: [i4.UpperCasePipe], styles: ["mat-dialog-content[_ngcontent-%COMP%]{min-height:395px;padding:0;margin-top:-24px;overflow:hidden}mat-dialog-actions[_ngcontent-%COMP%]{justify-content:flex-end;margin-right:-8px;margin-left:-8px}.root[_ngcontent-%COMP%]{min-width:282px}.header[_ngcontent-%COMP%]{border-top-left-radius:2px;border-top-right-radius:2px;padding:20px 0;line-height:58px;font-size:58px;display:flex;justify-content:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;height:98px}.header[_ngcontent-%COMP%]   .fixed-font-size[_ngcontent-%COMP%]{font-size:58px}.header[_ngcontent-%COMP%]   .time-frame[_ngcontent-%COMP%]{height:60px}.time[_ngcontent-%COMP%]{transition:all .2s ease-out;cursor:pointer}.time[_ngcontent-%COMP%]:not(.select){opacity:.6}.placeholder[_ngcontent-%COMP%]{flex:1}.ampm[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse;flex:1;font-size:14px;line-height:20px;margin-left:16px;font-weight:700px}.select[_ngcontent-%COMP%]{color:#fff}.body[_ngcontent-%COMP%]{padding:24px 16px 20px;display:flex;justify-content:center}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatTimepickerComponentDialogComponent, [{
        type: Component,
        args: [{ selector: 'mat-timepicker-dialog', template: "<ng-template #defaultCancelButtonTemplate>\r\n  <button mat-button [color]=\"color\" (click)=\"cancelClickHandler()\">{{cancelLabel}}</button>\r\n</ng-template>\r\n<ng-template #defaultOkButtonTemplate>\r\n  <button mat-button [disabled]=\"invalidSelection\" [color]=\"color\" (click)=\"okClickHandler()\">{{okLabel}}</button>\r\n</ng-template>\r\n\r\n<mat-dialog-content>\r\n  <div class=\"root\">\r\n    <mat-toolbar [color]=\"color\" class=\"header\">\r\n      <div class=\"placeholder\"></div>\r\n      <div class=\"time-frame\">\r\n        <span class=\"time fixed-font-size\" [ngClass]=\"{'select': this.viewType === 'hours' && 'active' }\"\r\n          (click)=\"editHours()\">\r\n          {{ twoDigits(formattedHours) }}\r\n        </span>\r\n        <span class=\"fixed-font-size\">:</span>\r\n        <span class=\"time fixed-font-size\" [ngClass]=\"{ 'select': this.viewType === 'minutes' && 'active' }\"\r\n          (click)=\"editMinutes()\">\r\n          {{ twoDigits(minutes) }}\r\n        </span>\r\n      </div>\r\n      <ng-container *ngIf=\"mode === '12h' then ampm else normal\"></ng-container>\r\n      <ng-template #normal>\r\n        <div class=\"placeholder\"></div>\r\n      </ng-template>\r\n      <ng-template #ampm>\r\n        <div class=\"ampm\">\r\n          <span class=\"time\" [ngClass]=\"{ 'select': isPm }\" (click)=\"setPm()\">{{postMeridiemAbbreviation | uppercase\r\n            }}</span>\r\n          <span class=\"time\" [ngClass]=\"{ 'select': !isPm }\" (click)=\"setAm()\">{{anteMeridiemAbbreviation | uppercase\r\n            }}</span>\r\n        </div>\r\n      </ng-template>\r\n    </mat-toolbar>\r\n    <div class=\"body\">\r\n      <mat-clock [allowed12HourMap]=\"allowed12HourMap\" [allowed24HourMap]=\"allowed24HourMap\" [minDate]=\"minDate\"\r\n        [maxDate]=\"maxDate\" [color]=\"color\" [viewType]=\"viewType\" [mode]=\"mode\" [formattedHours]=\"formattedHours\"\r\n        [minutes]=\"minutes\" (changeEvent)=\"handleClockChange($event)\"\r\n        (unavailableSelection)=\"handleUnavailableSelection()\"\r\n        [formattedValue]=\"viewType === 'minutes' ? minutes : formattedHours\" [isPm]=\"isPm\"\r\n        (invalidMeridiem)=\"invalidMeridiem()\" (mouseup)=\"handleClockChangeDone($event)\"\r\n        (clearInvalidMeridiem)=\"clearInvalidMeridiem()\" (touchend)=\"handleClockChangeDone($event)\"\r\n        (invalidSelection)=\"invalidSelectionHandler($event)\"></mat-clock>\r\n    </div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions>\r\n  <ng-container\r\n    *ngTemplateOutlet=\"cancelButtonTemplate || defaultCancelButtonTemplate; context: { label: cancelLabel, $implicit: cancelClickHandler }\">\r\n  </ng-container>\r\n  <ng-container\r\n    *ngTemplateOutlet=\"okButtonTemplate || defaultOkButtonTemplate; context: { label: okLabel, $implicit: okClickHandler }\">\r\n  </ng-container>\r\n</mat-dialog-actions>", styles: ["mat-dialog-content{min-height:395px;padding:0;margin-top:-24px;overflow:hidden}mat-dialog-actions{justify-content:flex-end;margin-right:-8px;margin-left:-8px}.root{min-width:282px}.header{border-top-left-radius:2px;border-top-right-radius:2px;padding:20px 0;line-height:58px;font-size:58px;display:flex;justify-content:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;height:98px}.header .fixed-font-size{font-size:58px}.header .time-frame{height:60px}.time{transition:all .2s ease-out;cursor:pointer}.time:not(.select){opacity:.6}.placeholder{flex:1}.ampm{display:flex;flex-direction:column-reverse;flex:1;font-size:14px;line-height:20px;margin-left:16px;font-weight:700px}.select{color:#fff}.body{padding:24px 16px 20px;display:flex;justify-content:center}\n"] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }]; }, { changeEvent: [{
            type: Output
        }], okClickEvent: [{
            type: Output
        }], cancelClickEvent: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0LXRpbWVwaWNrZXIvc3JjL2xpYi90aW1lcGlja2VyLWRpYWxvZy90aW1lcGlja2VyLWRpYWxvZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXQtdGltZXBpY2tlci9zcmMvbGliL3RpbWVwaWNrZXItZGlhbG9nL3RpbWVwaWNrZXItZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUU5RixPQUFPLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7SUNGdkQsa0NBQWtFO0lBQS9CLDRMQUFTLDRCQUFvQixJQUFDO0lBQUMsWUFBZTtJQUFBLGlCQUFTOzs7SUFBdkUsb0NBQWU7SUFBZ0MsZUFBZTtJQUFmLHdDQUFlOzs7O0lBR2pGLGtDQUE0RjtJQUEzQiw0TEFBUyx3QkFBZ0IsSUFBQztJQUFDLFlBQVc7SUFBQSxpQkFBUzs7O0lBQTdGLGtEQUE2Qix1QkFBQTtJQUE0QyxlQUFXO0lBQVgsb0NBQVc7OztJQWtCbkcsd0JBQTBFOzs7SUFFeEUseUJBQStCOzs7OztJQUcvQiwrQkFBa0IsZUFBQTtJQUNrQywyTEFBUyxlQUFPLElBQUM7SUFBQyxZQUNoRTs7SUFBQSxpQkFBTztJQUNYLGdDQUFxRTtJQUFsQiwyTEFBUyxlQUFPLElBQUM7SUFBQyxZQUNqRTs7SUFBQSxpQkFBTyxFQUFBOzs7SUFIUSxlQUE4QjtJQUE5QixpRUFBOEI7SUFBbUIsZUFDaEU7SUFEZ0UsMkVBQ2hFO0lBQ2UsZUFBK0I7SUFB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QStELHlGQUFBOzt1RkR4Q3ZELHFDQUFxQztjQU5qRCxTQUFTOzJCQUVFLHVCQUF1Qjs7c0JBaUZwQixNQUFNO3VCQUFDLGVBQWU7d0JBekV6QixXQUFXO2tCQUFwQixNQUFNO1lBQ0csWUFBWTtrQkFBckIsTUFBTTtZQUNHLGdCQUFnQjtrQkFBekIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIEluamVjdCwgRG9DaGVjaywgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xvY2tWaWV3VHlwZSwgQ2xvY2tNb2RlLCBJQWxsb3dlZDI0SG91ck1hcCwgSUFsbG93ZWQxMkhvdXJNYXAgfSBmcm9tICcuLi9pbnRlcmZhY2VzLWFuZC10eXBlcyc7XHJcbmltcG9ydCB7IHR3b0RpZ2l0cywgY29udmVydEhvdXJzRm9yTW9kZSB9IGZyb20gJy4uL3V0aWwnO1xyXG5pbXBvcnQgeyBNYXRUaW1lcGlja2VyQnV0dG9uVGVtcGxhdGVDb250ZXh0IH0gZnJvbSAnLi4vdGltZXBpY2tlci5kaXJlY3RpdmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ21hdC10aW1lcGlja2VyLWRpYWxvZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVwaWNrZXItZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aW1lcGlja2VyLWRpYWxvZy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRUaW1lcGlja2VyQ29tcG9uZW50RGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XHJcblxyXG4gIHR3b0RpZ2l0cyA9IHR3b0RpZ2l0cztcclxuXHJcbiAgQE91dHB1dCgpIGNoYW5nZUV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBva0NsaWNrRXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xyXG4gIEBPdXRwdXQoKSBjYW5jZWxDbGlja0V2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBhbGxvd2VkMjRIb3VyTWFwOiBJQWxsb3dlZDI0SG91ck1hcCA9IG51bGw7XHJcbiAgYWxsb3dlZDEySG91ck1hcDogSUFsbG93ZWQxMkhvdXJNYXAgPSBudWxsO1xyXG5cclxuICBpbnZhbGlkU2VsZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gIG9rTGFiZWw6IHN0cmluZztcclxuICBjYW5jZWxMYWJlbDogc3RyaW5nO1xyXG5cclxuICBva0J1dHRvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxNYXRUaW1lcGlja2VyQnV0dG9uVGVtcGxhdGVDb250ZXh0PjtcclxuICBjYW5jZWxCdXR0b25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8TWF0VGltZXBpY2tlckJ1dHRvblRlbXBsYXRlQ29udGV4dD47XHJcblxyXG4gIGFudGVNZXJpZGllbUFiYnJldmlhdGlvbjogc3RyaW5nO1xyXG4gIHBvc3RNZXJpZGllbUFiYnJldmlhdGlvbjogc3RyaW5nO1xyXG5cclxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xyXG4gICAgdmFsdWUgPSB2YWx1ZSB8fCB0aGlzLm1pbkRhdGUgfHwgdGhpcy5tYXhEYXRlIHx8IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLmhvdXJzID0gdmFsdWUuZ2V0SG91cnMoKTtcclxuICAgIHRoaXMubWludXRlcyA9IHZhbHVlLmdldE1pbnV0ZXMoKTtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxyXG5cclxuICBtb2RlOiBDbG9ja01vZGU7XHJcbiAgdmlld1R5cGU6IENsb2NrVmlld1R5cGUgPSAnaG91cnMnO1xyXG5cclxuICBtaW51dGVzOiBhbnk7XHJcbiAgY29sb3I6IHN0cmluZztcclxuICBpc1BtID0gZmFsc2U7XHJcbiAgc2tpcE1pbnV0ZUF1dG9Td2l0Y2ggPSBmYWxzZTtcclxuICBhdXRvU3dpdGNoSUQgPSBudWxsO1xyXG4gIGludmFsaWRNZWRpYW5JRCA9IG51bGw7XHJcbiAgaGFzSW52YWxpZE1lcmlkaWVtID0gZmFsc2U7XHJcbiAgZWRpdEhvdXJzQ2xpY2tlZCA9IGZhbHNlO1xyXG4gIGlzQ2xvc2luZyA9IGZhbHNlO1xyXG5cclxuICBtaW5EYXRlOiBEYXRlO1xyXG4gIG1heERhdGU6IERhdGU7XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgX2Zvcm1hdHRlZEhvdXI6IGFueTtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gIF9ob3VyczogYW55O1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBpZC1ibGFja2xpc3QsIGlkLW1hdGNoXHJcbiAgX3ZhbHVlOiBEYXRlO1xyXG5cclxuICBzZXQgaG91cnModmFsdWU6IGFueSkge1xyXG4gICAgdGhpcy5faG91cnMgPSB2YWx1ZTtcclxuICAgIHRoaXMuX2Zvcm1hdHRlZEhvdXIgPSBjb252ZXJ0SG91cnNGb3JNb2RlKHRoaXMuaG91cnMsIHRoaXMubW9kZSkuaG91cjtcclxuICB9XHJcbiAgZ2V0IGhvdXJzKCkgeyByZXR1cm4gdGhpcy5faG91cnM7IH1cclxuXHJcbiAgZ2V0IGZvcm1hdHRlZEhvdXJzKCkgeyByZXR1cm4gdGhpcy5fZm9ybWF0dGVkSG91cjsgfVxyXG5cclxuICBiaW5kRGF0YShkYXRhOiBhbnkpIHtcclxuICAgIHRoaXMubW9kZSA9IGRhdGEubW9kZTtcclxuICAgIHRoaXMub2tMYWJlbCA9IGRhdGEub2tMYWJlbDtcclxuICAgIHRoaXMuY2FuY2VsTGFiZWwgPSBkYXRhLmNhbmNlbExhYmVsO1xyXG4gICAgdGhpcy5va0J1dHRvblRlbXBsYXRlID0gZGF0YS5va0J1dHRvblRlbXBsYXRlO1xyXG4gICAgdGhpcy5jYW5jZWxCdXR0b25UZW1wbGF0ZSA9IGRhdGEuY2FuY2VsQnV0dG9uVGVtcGxhdGU7XHJcbiAgICB0aGlzLmFudGVNZXJpZGllbUFiYnJldmlhdGlvbiA9IGRhdGEuYW50ZU1lcmlkaWVtQWJicmV2aWF0aW9uO1xyXG4gICAgdGhpcy5wb3N0TWVyaWRpZW1BYmJyZXZpYXRpb24gPSBkYXRhLnBvc3RNZXJpZGllbUFiYnJldmlhdGlvbjtcclxuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yO1xyXG4gICAgdGhpcy5taW5EYXRlID0gZGF0YS5taW5EYXRlO1xyXG4gICAgdGhpcy5tYXhEYXRlID0gZGF0YS5tYXhEYXRlO1xyXG4gICAgdGhpcy5hbGxvd2VkMTJIb3VyTWFwID0gZGF0YS5hbGxvd2VkMTJIb3VyTWFwO1xyXG4gICAgdGhpcy5hbGxvd2VkMjRIb3VyTWFwID0gZGF0YS5hbGxvd2VkMjRIb3VyTWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhKSB7XHJcbiAgICB0aGlzLmlzUG0gPSBkYXRhLmlzUG07XHJcbiAgICB0aGlzLmJpbmREYXRhKGRhdGEpO1xyXG4gICAgLy8ga2VlcCB0aGlzIGFsd2F5cyBhdCB0aGUgYm90dG9tXHJcbiAgICB0aGlzLnZhbHVlID0gZGF0YS52YWx1ZTtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHsgdGhpcy5iaW5kRGF0YSh0aGlzLmRhdGEpOyB9XHJcblxyXG4gIGhhbmRsZUNsb2NrQ2hhbmdlKHsgdmFsdWUsIHR5cGUgfTogeyB2YWx1ZTogbnVtYmVyLCB0eXBlOiAnbWludXRlcycgfCAnaG91cnMnIH0pIHtcclxuICAgIGNvbnN0IGlzMjRob3Vyc0F1dG9NZXJpZGllbUNoYW5nZSA9IHRoaXMubW9kZSA9PT0gJzI0aCcgJiYgdHlwZSA9PT0gJ2hvdXJzJyAmJiAoXHJcbiAgICAgICh0aGlzLmhvdXJzID49IDEyICYmIHZhbHVlIDwgMTIpIHx8ICh0aGlzLmhvdXJzIDwgMTIgJiYgdmFsdWUgPj0gMTIpKTtcclxuICAgIGlmICgodGhpcy5oYXNJbnZhbGlkTWVyaWRpZW0gJiYgdGhpcy5tb2RlID09PSAnMTJoJykgfHwgaXMyNGhvdXJzQXV0b01lcmlkaWVtQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuaXNQbSA9ICF0aGlzLmlzUG07XHJcbiAgICAgIHRoaXMuaGFzSW52YWxpZE1lcmlkaWVtID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh0eXBlICYmIHR5cGUgPT09ICdob3VycycpIHx8ICghdHlwZSAmJiB0aGlzLnZpZXdUeXBlID09PSAnaG91cnMnKSkge1xyXG4gICAgICB0aGlzLmhvdXJzID0gdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKCh0eXBlICYmIHR5cGUgPT09ICdtaW51dGVzJykgfHwgKCF0eXBlICYmIHRoaXMudmlld1R5cGUgPT09ICdtaW51dGVzJykpIHtcclxuICAgICAgdGhpcy5taW51dGVzID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbmV3VmFsdWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgaG91cnMgPSB0aGlzLmlzUG0gPyB0aGlzLmhvdXJzIDwgMTIgPyB0aGlzLmhvdXJzICsgMTIgOiB0aGlzLmhvdXJzIDogdGhpcy5ob3VycyA9PT0gMTIgPyAwIDogdGhpcy5ob3VycztcclxuICAgIG5ld1ZhbHVlLnNldEhvdXJzKGhvdXJzKTtcclxuICAgIG5ld1ZhbHVlLnNldE1pbnV0ZXModGhpcy5taW51dGVzKTtcclxuICAgIG5ld1ZhbHVlLnNldFNlY29uZHMoMCk7XHJcbiAgICBuZXdWYWx1ZS5zZXRNaWxsaXNlY29uZHMoMCk7XHJcbiAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICB0aGlzLmNoYW5nZUV2ZW50LmVtaXQobmV3VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJJbnZhbGlkTWVyaWRpZW0oKSB7XHJcbiAgICB0aGlzLmhhc0ludmFsaWRNZXJpZGllbSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlVW5hdmFpbGFibGVTZWxlY3Rpb24oKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hdXRvU3dpdGNoSUQpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2xvY2tDaGFuZ2VEb25lKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBtb3VzZVVwIGFmdGVyIHRvdWNoRW5kXHJcblxyXG4gICAgaWYgKHRoaXMudmlld1R5cGUgPT09ICdob3VycycgJiYgIXRoaXMuc2tpcE1pbnV0ZUF1dG9Td2l0Y2gpIHtcclxuICAgICAgdGhpcy5hdXRvU3dpdGNoSUQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmVkaXRNaW51dGVzKCk7XHJcbiAgICAgICAgdGhpcy5hdXRvU3dpdGNoSUQgPSBudWxsO1xyXG4gICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWRpdEhvdXJzKCkge1xyXG4gICAgdGhpcy52aWV3VHlwZSA9ICdob3Vycyc7XHJcbiAgICB0aGlzLmVkaXRIb3Vyc0NsaWNrZWQgPSB0cnVlO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuZWRpdEhvdXJzQ2xpY2tlZCA9IGZhbHNlOyB9LCAwKTtcclxuICB9XHJcblxyXG4gIGVkaXRNaW51dGVzKCkge1xyXG4gICAgaWYgKHRoaXMuaGFzSW52YWxpZE1lcmlkaWVtKSB7XHJcbiAgICAgIHRoaXMuaXNQbSA9ICF0aGlzLmlzUG07XHJcbiAgICAgIHRoaXMuaGFzSW52YWxpZE1lcmlkaWVtID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpZXdUeXBlID0gJ21pbnV0ZXMnO1xyXG4gIH1cclxuXHJcbiAgaW52YWxpZFNlbGVjdGlvbkhhbmRsZXIodmFsdWUpIHtcclxuICAgIHRoaXMuaW52YWxpZFNlbGVjdGlvbiA9IHZhbHVlO1xyXG4gIH1cclxuXHJcblxyXG4gIGludmFsaWRNZXJpZGllbSgpIHtcclxuICAgIGlmICh0aGlzLnZpZXdUeXBlICE9PSAnbWludXRlcycgJiYgdGhpcy5lZGl0SG91cnNDbGlja2VkKSB7XHJcbiAgICAgIGlmICh0aGlzLmludmFsaWRNZWRpYW5JRCkgeyByZXR1cm47IH1cclxuICAgICAgdGhpcy5pbnZhbGlkTWVkaWFuSUQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzUG0gPSAhdGhpcy5pc1BtO1xyXG4gICAgICAgIHRoaXMuaGFzSW52YWxpZE1lcmlkaWVtID0gZmFsc2U7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmhhc0ludmFsaWRNZXJpZGllbSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBtZXJpZGllbUNoYW5nZShob3Vycykge1xyXG4gICAgY29uc3QgY2hhbmdlRGF0YSA9IHtcclxuICAgICAgdHlwZTogdGhpcy52aWV3VHlwZSxcclxuICAgICAgdmFsdWU6IHRoaXMudmlld1R5cGUgPT09ICdob3VycycgPyBob3VycyA6IHRoaXMudmFsdWUuZ2V0TWludXRlcygpXHJcbiAgICB9O1xyXG4gICAgdGhpcy5oYW5kbGVDbG9ja0NoYW5nZShjaGFuZ2VEYXRhKTtcclxuICB9XHJcblxyXG5cclxuICBzZXRBbSgpIHtcclxuICAgIGlmICh0aGlzLmhvdXJzID49IDEyKSB7XHJcbiAgICAgIHRoaXMuaG91cnMgPSB0aGlzLmhvdXJzIC0gMTI7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzUG0gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLm1lcmlkaWVtQ2hhbmdlKHRoaXMuaG91cnMpO1xyXG4gIH1cclxuXHJcbiAgc2V0UG0oKSB7XHJcbiAgICBpZiAodGhpcy5ob3VycyA8IDEyKSB7XHJcbiAgICAgIHRoaXMuaG91cnMgPSB0aGlzLmhvdXJzICsgMTI7XHJcbiAgICB9XHJcbiAgICB0aGlzLmlzUG0gPSB0cnVlO1xyXG4gICAgdGhpcy5tZXJpZGllbUNoYW5nZSh0aGlzLmhvdXJzKTtcclxuICB9XHJcblxyXG4gIG9rQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuaGFzSW52YWxpZE1lcmlkaWVtKSB7XHJcbiAgICAgIHRoaXMuaXNQbSA9ICF0aGlzLmlzUG07XHJcbiAgICAgIHRoaXMuaGFzSW52YWxpZE1lcmlkaWVtID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9rQ2xpY2tFdmVudC5lbWl0KHRoaXMudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsQ2xpY2tIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5jYW5jZWxDbGlja0V2ZW50LmVtaXQoKTtcclxuICB9XHJcblxyXG59XHJcbiIsIjxuZy10ZW1wbGF0ZSAjZGVmYXVsdENhbmNlbEJ1dHRvblRlbXBsYXRlPlxyXG4gIDxidXR0b24gbWF0LWJ1dHRvbiBbY29sb3JdPVwiY29sb3JcIiAoY2xpY2spPVwiY2FuY2VsQ2xpY2tIYW5kbGVyKClcIj57e2NhbmNlbExhYmVsfX08L2J1dHRvbj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNkZWZhdWx0T2tCdXR0b25UZW1wbGF0ZT5cclxuICA8YnV0dG9uIG1hdC1idXR0b24gW2Rpc2FibGVkXT1cImludmFsaWRTZWxlY3Rpb25cIiBbY29sb3JdPVwiY29sb3JcIiAoY2xpY2spPVwib2tDbGlja0hhbmRsZXIoKVwiPnt7b2tMYWJlbH19PC9idXR0b24+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48bWF0LWRpYWxvZy1jb250ZW50PlxyXG4gIDxkaXYgY2xhc3M9XCJyb290XCI+XHJcbiAgICA8bWF0LXRvb2xiYXIgW2NvbG9yXT1cImNvbG9yXCIgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBsYWNlaG9sZGVyXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLWZyYW1lXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aW1lIGZpeGVkLWZvbnQtc2l6ZVwiIFtuZ0NsYXNzXT1cInsnc2VsZWN0JzogdGhpcy52aWV3VHlwZSA9PT0gJ2hvdXJzJyAmJiAnYWN0aXZlJyB9XCJcclxuICAgICAgICAgIChjbGljayk9XCJlZGl0SG91cnMoKVwiPlxyXG4gICAgICAgICAge3sgdHdvRGlnaXRzKGZvcm1hdHRlZEhvdXJzKSB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImZpeGVkLWZvbnQtc2l6ZVwiPjo8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aW1lIGZpeGVkLWZvbnQtc2l6ZVwiIFtuZ0NsYXNzXT1cInsgJ3NlbGVjdCc6IHRoaXMudmlld1R5cGUgPT09ICdtaW51dGVzJyAmJiAnYWN0aXZlJyB9XCJcclxuICAgICAgICAgIChjbGljayk9XCJlZGl0TWludXRlcygpXCI+XHJcbiAgICAgICAgICB7eyB0d29EaWdpdHMobWludXRlcykgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kZSA9PT0gJzEyaCcgdGhlbiBhbXBtIGVsc2Ugbm9ybWFsXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZSAjbm9ybWFsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwbGFjZWhvbGRlclwiPjwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICA8bmctdGVtcGxhdGUgI2FtcG0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFtcG1cIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZVwiIFtuZ0NsYXNzXT1cInsgJ3NlbGVjdCc6IGlzUG0gfVwiIChjbGljayk9XCJzZXRQbSgpXCI+e3twb3N0TWVyaWRpZW1BYmJyZXZpYXRpb24gfCB1cHBlcmNhc2VcclxuICAgICAgICAgICAgfX08L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpbWVcIiBbbmdDbGFzc109XCJ7ICdzZWxlY3QnOiAhaXNQbSB9XCIgKGNsaWNrKT1cInNldEFtKClcIj57e2FudGVNZXJpZGllbUFiYnJldmlhdGlvbiB8IHVwcGVyY2FzZVxyXG4gICAgICAgICAgICB9fTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvbWF0LXRvb2xiYXI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYm9keVwiPlxyXG4gICAgICA8bWF0LWNsb2NrIFthbGxvd2VkMTJIb3VyTWFwXT1cImFsbG93ZWQxMkhvdXJNYXBcIiBbYWxsb3dlZDI0SG91ck1hcF09XCJhbGxvd2VkMjRIb3VyTWFwXCIgW21pbkRhdGVdPVwibWluRGF0ZVwiXHJcbiAgICAgICAgW21heERhdGVdPVwibWF4RGF0ZVwiIFtjb2xvcl09XCJjb2xvclwiIFt2aWV3VHlwZV09XCJ2aWV3VHlwZVwiIFttb2RlXT1cIm1vZGVcIiBbZm9ybWF0dGVkSG91cnNdPVwiZm9ybWF0dGVkSG91cnNcIlxyXG4gICAgICAgIFttaW51dGVzXT1cIm1pbnV0ZXNcIiAoY2hhbmdlRXZlbnQpPVwiaGFuZGxlQ2xvY2tDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgKHVuYXZhaWxhYmxlU2VsZWN0aW9uKT1cImhhbmRsZVVuYXZhaWxhYmxlU2VsZWN0aW9uKClcIlxyXG4gICAgICAgIFtmb3JtYXR0ZWRWYWx1ZV09XCJ2aWV3VHlwZSA9PT0gJ21pbnV0ZXMnID8gbWludXRlcyA6IGZvcm1hdHRlZEhvdXJzXCIgW2lzUG1dPVwiaXNQbVwiXHJcbiAgICAgICAgKGludmFsaWRNZXJpZGllbSk9XCJpbnZhbGlkTWVyaWRpZW0oKVwiIChtb3VzZXVwKT1cImhhbmRsZUNsb2NrQ2hhbmdlRG9uZSgkZXZlbnQpXCJcclxuICAgICAgICAoY2xlYXJJbnZhbGlkTWVyaWRpZW0pPVwiY2xlYXJJbnZhbGlkTWVyaWRpZW0oKVwiICh0b3VjaGVuZCk9XCJoYW5kbGVDbG9ja0NoYW5nZURvbmUoJGV2ZW50KVwiXHJcbiAgICAgICAgKGludmFsaWRTZWxlY3Rpb24pPVwiaW52YWxpZFNlbGVjdGlvbkhhbmRsZXIoJGV2ZW50KVwiPjwvbWF0LWNsb2NrPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvbWF0LWRpYWxvZy1jb250ZW50PlxyXG48bWF0LWRpYWxvZy1hY3Rpb25zPlxyXG4gIDxuZy1jb250YWluZXJcclxuICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FuY2VsQnV0dG9uVGVtcGxhdGUgfHwgZGVmYXVsdENhbmNlbEJ1dHRvblRlbXBsYXRlOyBjb250ZXh0OiB7IGxhYmVsOiBjYW5jZWxMYWJlbCwgJGltcGxpY2l0OiBjYW5jZWxDbGlja0hhbmRsZXIgfVwiPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG4gIDxuZy1jb250YWluZXJcclxuICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwib2tCdXR0b25UZW1wbGF0ZSB8fCBkZWZhdWx0T2tCdXR0b25UZW1wbGF0ZTsgY29udGV4dDogeyBsYWJlbDogb2tMYWJlbCwgJGltcGxpY2l0OiBva0NsaWNrSGFuZGxlciB9XCI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbWF0LWRpYWxvZy1hY3Rpb25zPiJdfQ==