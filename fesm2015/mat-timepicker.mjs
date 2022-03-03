import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output, Inject, Directive, Optional, Self, HostBinding, HostListener, NgModule } from '@angular/core';
import * as i5 from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import * as i2$1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3 from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1 from '@angular/forms';
import * as i3$1 from '@angular/cdk/a11y';
import * as i4$1 from '@angular/cdk/platform';
import * as i6 from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

function twoDigits(n) {
    return n < 10 ? `0${n}` : `${n}`;
}
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function convertHoursForMode(hour, mode) {
    const isPm = hour >= 12;
    if (mode === '24h') {
        return { hour, isPm };
    }
    else if (hour === 0 || hour === 12) {
        return { hour: 12, isPm };
    }
    else if (hour < 12) {
        return { hour, isPm };
    }
    return { hour: hour - 12, isPm };
}
function mod(a, b) {
    return a - Math.floor(a / b) * b;
}
function getShortestAngle(from, to) {
    const difference = to - from;
    return from + mod(difference + 180, 360) - 180;
}
function isDateInRange(minDate, maxDate, current) {
    const unixCurrentDate = +current;
    return (!minDate || +minDate <= unixCurrentDate) && (!maxDate || unixCurrentDate <= +maxDate);
}
function isTimeInRange(minDate, maxDate, current) {
    if (minDate instanceof Date) {
        const newMinDate = new Date();
        newMinDate.setHours(minDate.getHours());
        newMinDate.setMinutes(minDate.getMinutes());
        newMinDate.setSeconds(0);
        newMinDate.setMilliseconds(0);
        minDate = newMinDate;
    }
    if (maxDate instanceof Date) {
        const newMaxDate = new Date();
        newMaxDate.setHours(maxDate.getHours());
        newMaxDate.setMinutes(maxDate.getMinutes());
        newMaxDate.setSeconds(0);
        newMaxDate.setMilliseconds(0);
        maxDate = newMaxDate;
    }
    if (current instanceof Date) {
        const newCurrent = new Date();
        newCurrent.setHours(current.getHours());
        newCurrent.setMinutes(current.getMinutes());
        newCurrent.setSeconds(0);
        newCurrent.setMilliseconds(0);
        current = newCurrent;
    }
    const unixCurrentDate = +current;
    return (!minDate || +minDate <= unixCurrentDate) && (!maxDate || unixCurrentDate <= +maxDate);
}
// used when generating the allowed maps
function isAllowed(hour, minutes, minDate, maxDate, clockMode, selectedMeridiem) {
    if (hour > 24 || hour < 0 || minutes > 60 || minutes < 0) {
        return false;
    }
    if (!minDate && !maxDate) {
        return true;
    }
    if (clockMode === '12h') {
        if (hour === 12 && selectedMeridiem === 'AM') {
            hour = 0;
        }
        if (hour > 12) {
            hour -= 12;
        }
    }
    const checkDate = new Date();
    checkDate.setHours(hour);
    checkDate.setMinutes(minutes);
    checkDate.setSeconds(0);
    checkDate.setMilliseconds(0);
    return isDateInRange(minDate, maxDate, checkDate);
}
// used by the clock component to visually disable the not allowed values
function getIsAvailabeFn(allowed12HourMap, allowed24HourMap, mode) {
    return (value, viewType, isPm, h) => {
        const isHourCheck = viewType === 'hours';
        const [hour, minutes] = isHourCheck ? [value, null] : [h, value];
        if (mode === '12h') {
            if (!allowed12HourMap) {
                return true;
            }
            const meridiem = isPm ? 'pm' : 'am';
            if (isHourCheck) {
                return !!Object.values(allowed12HourMap[meridiem][hour]).find(v => v === true);
            }
            return allowed12HourMap[meridiem][hour][minutes];
        }
        if (!allowed24HourMap) {
            return true;
        }
        if (isHourCheck) {
            return !!Object.values(allowed24HourMap[hour]).find(v => v === true);
        }
        return allowed24HourMap[hour][minutes];
    };
}

function ClockComponent_ng_container_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainerStart(0);
        i0.ɵɵtext(1, "\u00B7");
        i0.ɵɵelementContainerEnd();
    }
}
function ClockComponent_ng_container_7_ng_container_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainerStart(0);
        i0.ɵɵtext(1, "\u00B7");
        i0.ɵɵelementContainerEnd();
    }
}
const _c0$1 = function (a0, a1) { return { "selected": a0, "disabled": a1 }; };
function ClockComponent_ng_container_7_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainerStart(0);
        i0.ɵɵelementStart(1, "button", 8);
        i0.ɵɵtemplate(2, ClockComponent_ng_container_7_ng_container_2_Template, 2, 0, "ng-container", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementContainerEnd();
    }
    if (rf & 2) {
        const digit_r4 = ctx.$implicit;
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("transform", "translate(" + digit_r4.translateX + "px, " + digit_r4.translateY + "px)");
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c0$1, ctx_r1.formattedValue === digit_r4.display || digit_r4.display === 0 && ctx_r1.formattedValue === 0, !ctx_r1.isAvailable(digit_r4.display === 60 ? 0 : digit_r4.display)));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", digit_r4.display % 5 !== 0);
    }
}
function ClockComponent_ng_container_8_ng_template_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵtext(0);
    }
    if (rf & 2) {
        const digit_r6 = i0.ɵɵnextContext().$implicit;
        i0.ɵɵtextInterpolate(digit_r6.display);
    }
}
function ClockComponent_ng_container_8_ng_template_4_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵtext(0);
    }
    if (rf & 2) {
        const digit_r6 = i0.ɵɵnextContext().$implicit;
        i0.ɵɵtextInterpolate(digit_r6.display === 60 ? "00" : digit_r6.display);
    }
}
function ClockComponent_ng_container_8_ng_container_6_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainer(0);
    }
}
function ClockComponent_ng_container_8_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainerStart(0);
        i0.ɵɵelementStart(1, "button", 9);
        i0.ɵɵtemplate(2, ClockComponent_ng_container_8_ng_template_2_Template, 1, 1, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(4, ClockComponent_ng_container_8_ng_template_4_Template, 1, 1, "ng-template", null, 11, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(6, ClockComponent_ng_container_8_ng_container_6_Template, 1, 0, "ng-container", 12);
        i0.ɵɵelementEnd();
        i0.ɵɵelementContainerEnd();
    }
    if (rf & 2) {
        const digit_r6 = ctx.$implicit;
        const _r7 = i0.ɵɵreference(3);
        const _r9 = i0.ɵɵreference(5);
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("transform", "translate(" + digit_r6.translateX + "px, " + digit_r6.translateY + "px)");
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(6, _c0$1, ctx_r2.formattedValue === digit_r6.display || digit_r6.display === 60 && ctx_r2.formattedValue === 0, !ctx_r2.isAvailable(digit_r6.display === 60 ? 0 : digit_r6.display)));
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("ngIf", ctx_r2.viewType === "minutes")("ngIfThen", _r9)("ngIfElse", _r7);
    }
}
function ClockComponent_ng_container_9_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainerStart(0);
        i0.ɵɵelementStart(1, "button", 13);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementContainerEnd();
    }
    if (rf & 2) {
        const digit_r14 = ctx.$implicit;
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("transform", "translate(" + digit_r14.translateX + "px, " + digit_r14.translateY + "px)");
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c0$1, ctx_r3.formattedValue === digit_r14.display || digit_r14.display === 24 && ctx_r3.formattedValue === 0, !ctx_r3.isAvailable(digit_r14.display === 24 ? 0 : digit_r14.display)));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", digit_r14.display === 24 ? "00" : digit_r14.display, " ");
    }
}
const _c1$1 = function (a0, a1) { return { "small-pointer": a0, "animated-pointer": a1 }; };
const _c2 = function (a0) { return { "outer-dot-odd": a0 }; };
class ClockComponent {
    constructor() {
        this.color = 'primary';
        this.changeEvent = new EventEmitter();
        this.unavailableSelection = new EventEmitter();
        this.invalidMeridiem = new EventEmitter();
        this.invalidSelection = new EventEmitter();
        this.clearInvalidMeridiem = new EventEmitter();
        this.allowed12HourMap = null;
        this.allowed24HourMap = null;
        this.isFormattedValueAllowed = true;
        this.meridiem = null;
        this.touching = false;
        this.numbers = [];
        this.secondaryNumbers = [];
        this.minuteDots = [];
        this.invalidMeridiemEmitted = true;
        this.handleTouchMove = (e) => {
            e.preventDefault(); // prevent scrolling behind the clock on iOS
            const rect = e.target.getBoundingClientRect();
            this.movePointer(e.changedTouches[0].clientX - rect.left, e.changedTouches[0].clientY - rect.top);
        };
    }
    initIsAllowedFn() {
        if (!this.allowed12HourMap && !this.allowed24HourMap) {
            return;
        }
        this.isAvailableFn = getIsAvailabeFn(this.allowed12HourMap, this.allowed24HourMap, this.mode);
    }
    isAvailable(value) {
        return this.isAvailableFn ? this.isAvailableFn(value, this.viewType, this.isPm, this.formattedHours) : true;
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.allowed12HourMap ||
            simpleChanges.allowed24HourMap ||
            (simpleChanges.mode && !simpleChanges.mode.firstChange)) {
            this.initIsAllowedFn();
        }
        this.calculateAngule();
        this.setNumbers();
        this.meridiem = this.isPm ? 'PM' : 'AM';
        if (simpleChanges.formattedValue && (this.allowed12HourMap || this.allowed24HourMap)) {
            this.isFormattedValueAllowed = this.isAvailable(this.formattedValue);
        }
        const isSelectedTimeAvailable = (this.isAvailableFn) ?
            // when calling isAvailableFn here we should always set the viewType to minutes because we want to check the hours and the minutes
            this.isAvailableFn(this.minutes, 'minutes', this.isPm, this.formattedHours) : true;
        // if (this.mode === '24h' && this.viewType === 'minutes' && this.isAvailableFn) {
        //   const areMinitesAvailable = this.isAvailableFn(this.minutes, 'minutes', this.isPm, this.formattedHours);
        //   if (!areMinitesAvailable) {
        //     if (this.minDate && this.minDate.getMinutes() > this.minutes) {
        //       setTimeout(() => { this.changeEvent.emit({ value: this.minDate.getMinutes(), type: 'minutes' }); });
        //     } else {
        //       setTimeout(() => { this.changeEvent.emit({ value: this.maxDate.getMinutes(), type: 'minutes' }); });
        //     }
        //   }
        // }
        if (isSelectedTimeAvailable && this.invalidMeridiemEmitted) {
            this.clearInvalidMeridiem.emit();
            this.invalidMeridiemEmitted = false;
        }
        this.invalidSelection.emit(!isSelectedTimeAvailable);
    }
    calculateAngule() {
        this.angle = this.getPointerAngle(this.formattedValue, this.viewType);
    }
    setNumbers() {
        if (this.viewType === 'hours') {
            if (this.mode === '12h') {
                const meridiem = this.isPm ? 'pm' : 'am';
                const isAllowedFn = this.allowed12HourMap ? num => this.allowed12HourMap[meridiem][num + 1][0] : undefined;
                this.numbers = this.getNumbers(12, { size: 256 }, isAllowedFn);
                this.secondaryNumbers = [];
                this.minuteDots = [];
            }
            else if (this.mode === '24h') {
                const isAllowedFn = this.allowed24HourMap ? num => this.allowed24HourMap[num][0] : undefined;
                this.numbers = this.getNumbers(12, { size: 256 }, isAllowedFn);
                this.secondaryNumbers = this.getNumbers(12, { size: 256 - 64, start: 13 }, isAllowedFn);
                this.minuteDots = [];
            }
        }
        else {
            const meridiem = this.isPm ? 'pm' : 'am';
            const isAllowedFn = !!this.allowed12HourMap ? num => this.allowed12HourMap[meridiem][this.formattedHours][num] :
                !!this.allowed24HourMap ? num => this.allowed24HourMap[this.formattedHours][num] : undefined;
            this.numbers = this.getNumbers(12, { size: 256, start: 5, step: 5 }, isAllowedFn);
            this.minuteDots = this.getNumbers(60, { size: 256, start: 13 }).map(digit => {
                if (digit.display <= 59) {
                    digit.allowed = isAllowedFn ? isAllowedFn(digit.display) : true;
                    return digit;
                }
                digit.display = digit.display - 60;
                digit.allowed = isAllowedFn ? isAllowedFn(digit.display) : true;
                return digit;
            });
            this.secondaryNumbers = [];
        }
    }
    disableAnimatedPointer() {
        this.touching = true;
    }
    enableAnimatedPointer() {
        this.touching = false;
    }
    handleTouchEnd(e) {
        this.handleTouchMove(e);
        this.enableAnimatedPointer();
    }
    handleMouseMove(e) {
        // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
        if ((e.buttons === 1 || e.which === 1) && this.touching) {
            const rect = e.target.getBoundingClientRect();
            this.movePointer(e.clientX - rect.left, e.clientY - rect.top);
        }
    }
    handleClick(e) {
        const rect = e.target.getBoundingClientRect();
        this.movePointer(e.clientX - rect.left, e.clientY - rect.top);
    }
    movePointer(x, y) {
        const value = this.getPointerValue(x, y, 256);
        if (!this.isAvailable(value)) {
            this.unavailableSelection.emit();
            return;
        }
        if (value !== this.formattedValue) {
            this.changeEvent.emit({ value, type: this.viewType });
            if (this.viewType !== 'minutes') {
                if (!this.isAvailable(value)) {
                    if (this.minDate && this.isAvailable(value)) {
                        this.changeEvent.emit({ value: this.minDate.getMinutes(), type: 'minutes' });
                    }
                    else if (this.maxDate && this.isAvailable(value)) {
                        this.changeEvent.emit({ value: this.maxDate.getMinutes(), type: 'minutes' });
                    }
                }
            }
        }
    }
    getNumbers(count, { size, start = 1, step = 1 }, isAllowedFn) {
        return Array.apply(null, Array(count)).map((_, i) => ({
            display: i * step + start,
            translateX: (size / 2 - 20) * Math.cos(2 * Math.PI * (i - 2) / count),
            translateY: (size / 2 - 20) * Math.sin(2 * Math.PI * (i - 2) / count),
            allowed: isAllowedFn ? isAllowedFn(i) : true
        }));
    }
    getPointerAngle(value, mode) {
        if (this.viewType === 'hours') {
            return this.mode === '12h' ? 360 / 12 * (value - 3) : 360 / 12 * (value % 12 - 3);
        }
        return 360 / 60 * (value - 15);
    }
    getPointerValue(x, y, size) {
        let value;
        let angle = Math.atan2(size / 2 - x, size / 2 - y) / Math.PI * 180;
        if (angle < 0) {
            angle = 360 + angle;
        }
        if (this.viewType === 'hours') {
            if (this.mode === '12h') {
                value = 12 - Math.round(angle * 12 / 360);
                return value === 0 ? 12 : value;
            }
            const radius = Math.sqrt(Math.pow(size / 2 - x, 2) + Math.pow(size / 2 - y, 2));
            value = 12 - Math.round(angle * 12 / 360);
            if (value === 0) {
                value = 12;
            }
            if (radius < size / 2 - 32) {
                value = value === 12 ? 0 : value + 12;
            }
            return value;
        }
        value = Math.round(60 - 60 * angle / 360);
        return value === 60 ? 0 : value;
    }
}
ClockComponent.ɵfac = function ClockComponent_Factory(t) { return new (t || ClockComponent)(); };
ClockComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ClockComponent, selectors: [["mat-clock"]], inputs: { mode: "mode", viewType: "viewType", color: "color", formattedValue: "formattedValue", minDate: "minDate", maxDate: "maxDate", isPm: "isPm", formattedHours: "formattedHours", minutes: "minutes", allowed12HourMap: "allowed12HourMap", allowed24HourMap: "allowed24HourMap" }, outputs: { changeEvent: "changeEvent", unavailableSelection: "unavailableSelection", invalidMeridiem: "invalidMeridiem", invalidSelection: "invalidSelection", clearInvalidMeridiem: "clearInvalidMeridiem" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 16, consts: [[1, "root"], [1, "circle", 3, "touchmove", "mousemove", "touchstart", "mousedown", "touchend", "mouseup", "click"], [1, "pointer-container", 3, "ngClass"], ["mat-mini-fab", "", 1, "inner-dot", 3, "color"], [1, "pointer", 3, "color"], ["mat-mini-fab", "", 1, "outer-dot", 3, "color", "ngClass"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "number", "minute-dot", 3, "ngClass"], [1, "number", 3, "ngClass"], ["hoursTemplate", ""], ["minutesTemplate", ""], [4, "ngIf", "ngIfThen", "ngIfElse"], [1, "number", "small-number", 3, "ngClass"]], template: function ClockComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵlistener("touchmove", function ClockComponent_Template_div_touchmove_1_listener($event) { return ctx.handleTouchMove($event); })("mousemove", function ClockComponent_Template_div_mousemove_1_listener($event) { return ctx.handleMouseMove($event); })("touchstart", function ClockComponent_Template_div_touchstart_1_listener() { return ctx.disableAnimatedPointer(); })("mousedown", function ClockComponent_Template_div_mousedown_1_listener() { return ctx.disableAnimatedPointer(); })("touchend", function ClockComponent_Template_div_touchend_1_listener($event) { return ctx.handleTouchEnd($event); })("mouseup", function ClockComponent_Template_div_mouseup_1_listener() { return ctx.enableAnimatedPointer(); })("click", function ClockComponent_Template_div_click_1_listener($event) { return ctx.handleClick($event); });
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵelement(3, "button", 3);
            i0.ɵɵelementStart(4, "mat-toolbar", 4)(5, "button", 5);
            i0.ɵɵtemplate(6, ClockComponent_ng_container_6_Template, 2, 0, "ng-container", 6);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(7, ClockComponent_ng_container_7_Template, 3, 7, "ng-container", 7);
            i0.ɵɵtemplate(8, ClockComponent_ng_container_8_Template, 7, 9, "ng-container", 7);
            i0.ɵɵtemplate(9, ClockComponent_ng_container_9_Template, 3, 7, "ng-container", 7);
            i0.ɵɵelementEnd()();
        }
        if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("transform", "rotate(" + ctx.angle + "deg)");
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(11, _c1$1, ctx.mode === "24h" && ctx.viewType === "hours" && (ctx.formattedValue === 0 || ctx.formattedValue > 12), !ctx.touching));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("color", ctx.color);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("color", ctx.color);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("color", ctx.color)("ngClass", i0.ɵɵpureFunction1(14, _c2, ctx.viewType === "minutes" && ctx.formattedValue % 5 !== 0));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.viewType === "minutes" && ctx.formattedValue % 5 !== 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.minuteDots);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.numbers);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.secondaryNumbers);
        }
    }, directives: [i4.NgClass, i2.MatButton, i3.MatToolbar, i4.NgIf, i4.NgForOf], styles: [".root[_ngcontent-%COMP%]{width:256px;height:256px;cursor:default}.circle[_ngcontent-%COMP%]{width:256px;height:256px;border-radius:50%;position:relative;background:#ededed;cursor:pointer}.number[_ngcontent-%COMP%]{width:32px;height:32px;border:0px;left:calc(50% - 16px);top:calc(50% - 16px);position:absolute;text-align:center;line-height:32px;cursor:pointer;font-size:14px;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;display:flex;align-items:center;justify-content:center;flex-direction:column;background-color:transparent!important;background:transparent!important;box-shadow:0 -1px 5px -200px #000!important;-webkit-box-shadow:0px -1px 5px -200px black!important;-moz-box-shadow:0px -1px 5px -200px black!important}.number.disabled[_ngcontent-%COMP%]{color:#0101011a}.number[_ngcontent-%COMP%]:not(.selected):not(.disabled){color:#000000de}.number[_ngcontent-%COMP%]:not(.disabled).minute-dot{color:#010101b3}.number[_ngcontent-%COMP%]:not(.disabled).minute-dot.selected{color:transparent}.small-number[_ngcontent-%COMP%]{font-size:12px}.small-number[_ngcontent-%COMP%]:not(.selected):not(.disabled){color:#000000ab}.pointer-container[_ngcontent-%COMP%]{width:calc(50% - 20px);height:2;position:absolute;left:50%;top:calc(50% - 1px);transform-origin:left center;pointer-events:none}.pointer-container.disabled[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{background-color:transparent}.pointer[_ngcontent-%COMP%]{height:1px}.animated-pointer[_ngcontent-%COMP%]{transition:all .2s ease-out}.small-pointer[_ngcontent-%COMP%]{width:calc(50% - 52px)}.inner-dot[_ngcontent-%COMP%]{position:absolute;top:-3px;left:-4px;width:8px;height:8px;border-radius:50%;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}.outer-dot[_ngcontent-%COMP%]{width:32px;height:32px;position:absolute;right:-16px;border-radius:50%;box-sizing:content-box;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}.outer-dot-odd[_ngcontent-%COMP%]{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-direction:column;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}"], changeDetection: 0 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClockComponent, [{
            type: Component,
            args: [{ selector: 'mat-clock', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"root\">\r\n  <div class=\"circle\" (touchmove)=\"handleTouchMove($event)\" (mousemove)=\"handleMouseMove($event)\"\r\n    (touchstart)=\"disableAnimatedPointer()\" (mousedown)=\"disableAnimatedPointer()\" (touchend)=\"handleTouchEnd($event)\"\r\n    (mouseup)=\"enableAnimatedPointer()\" (click)=\"handleClick($event)\">\r\n    <div class=\"pointer-container\"\r\n      [ngClass]=\"{ 'small-pointer': mode === '24h' && viewType === 'hours' && (formattedValue === 0 || formattedValue > 12), 'animated-pointer': !touching }\"\r\n      [style.transform]=\"'rotate(' + angle + 'deg)'\">\r\n      <button mat-mini-fab [color]=\"color\" class=\"inner-dot\"></button>\r\n      <mat-toolbar [color]=\"color\" class=\"pointer\">\r\n        <button mat-mini-fab [color]=\"color\" class=\"outer-dot\"\r\n          [ngClass]=\" { 'outer-dot-odd': viewType === 'minutes' && formattedValue % 5 !== 0 }\">\r\n          <ng-container *ngIf=\"viewType === 'minutes' && formattedValue % 5 !== 0\">\u00B7</ng-container>\r\n        </button>\r\n      </mat-toolbar>\r\n    </div>\r\n    <ng-container *ngFor=\"let digit of minuteDots;\">\r\n      <button class=\"number minute-dot\"\r\n        [ngClass]=\"{ 'selected': formattedValue === digit.display || (digit.display === 0 && formattedValue === 0), 'disabled': !isAvailable(digit.display === 60 ? 0 : digit.display)}\"\r\n        [style.transform]=\"'translate(' + digit.translateX + 'px, ' + digit.translateY + 'px)'\">\r\n        <ng-container *ngIf=\"digit.display % 5 !== 0\">\u00B7</ng-container>\r\n      </button>\r\n    </ng-container>\r\n    <ng-container *ngFor=\"let digit of numbers;\">\r\n      <button class=\"number\"\r\n        [ngClass]=\"{ 'selected': formattedValue === digit.display || (digit.display === 60 && formattedValue === 0), 'disabled': !isAvailable(digit.display === 60 ? 0 : digit.display)}\"\r\n        [style.transform]=\"'translate(' + digit.translateX + 'px, ' + digit.translateY + 'px)'\">\r\n        <ng-template #hoursTemplate>{{ digit.display }}</ng-template>\r\n        <ng-template #minutesTemplate>{{ digit.display === 60 ? '00' : digit.display }}</ng-template>\r\n        <ng-container *ngIf=\"viewType === 'minutes' then minutesTemplate else hoursTemplate;\"></ng-container>\r\n      </button>\r\n\r\n    </ng-container>\r\n    <ng-container *ngFor=\"let digit of secondaryNumbers;\">\r\n      <button class=\"number small-number\"\r\n        [ngClass]=\"{ 'selected': formattedValue === digit.display || (digit.display === 24 && formattedValue === 0), 'disabled': !isAvailable(digit.display === 24 ? 0 : digit.display)}\"\r\n        [style.transform]=\"'translate(' + digit.translateX + 'px, ' + digit.translateY + 'px)'\">\r\n        {{ digit.display === 24 ? '00' : digit.display }}\r\n      </button>\r\n\r\n    </ng-container>\r\n  </div>", styles: [".root{width:256px;height:256px;cursor:default}.circle{width:256px;height:256px;border-radius:50%;position:relative;background:#ededed;cursor:pointer}.number{width:32px;height:32px;border:0px;left:calc(50% - 16px);top:calc(50% - 16px);position:absolute;text-align:center;line-height:32px;cursor:pointer;font-size:14px;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;display:flex;align-items:center;justify-content:center;flex-direction:column;background-color:transparent!important;background:transparent!important;box-shadow:0 -1px 5px -200px #000!important;-webkit-box-shadow:0px -1px 5px -200px black!important;-moz-box-shadow:0px -1px 5px -200px black!important}.number.disabled{color:#0101011a}.number:not(.selected):not(.disabled){color:#000000de}.number:not(.disabled).minute-dot{color:#010101b3}.number:not(.disabled).minute-dot.selected{color:transparent}.small-number{font-size:12px}.small-number:not(.selected):not(.disabled){color:#000000ab}.pointer-container{width:calc(50% - 20px);height:2;position:absolute;left:50%;top:calc(50% - 1px);transform-origin:left center;pointer-events:none}.pointer-container.disabled *{background-color:transparent}.pointer{height:1px}.animated-pointer{transition:all .2s ease-out}.small-pointer{width:calc(50% - 52px)}.inner-dot{position:absolute;top:-3px;left:-4px;width:8px;height:8px;border-radius:50%;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}.outer-dot{width:32px;height:32px;position:absolute;right:-16px;border-radius:50%;box-sizing:content-box;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}.outer-dot-odd{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-direction:column;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}\n"] }]
        }], null, { mode: [{
                type: Input
            }], viewType: [{
                type: Input
            }], color: [{
                type: Input
            }], formattedValue: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], isPm: [{
                type: Input
            }], formattedHours: [{
                type: Input
            }], minutes: [{
                type: Input
            }], changeEvent: [{
                type: Output
            }], unavailableSelection: [{
                type: Output
            }], invalidMeridiem: [{
                type: Output
            }], invalidSelection: [{
                type: Output
            }], clearInvalidMeridiem: [{
                type: Output
            }], allowed12HourMap: [{
                type: Input
            }], allowed24HourMap: [{
                type: Input
            }] });
})();

function MatTimepickerComponentDialogComponent_ng_template_0_Template(rf, ctx) {
    if (rf & 1) {
        const _r12 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "button", 14);
        i0.ɵɵlistener("click", function MatTimepickerComponentDialogComponent_ng_template_0_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.cancelClickHandler(); });
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r1 = i0.ɵɵnextContext();
        i0.ɵɵproperty("color", ctx_r1.color);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r1.cancelLabel);
    }
}
function MatTimepickerComponentDialogComponent_ng_template_2_Template(rf, ctx) {
    if (rf & 1) {
        const _r14 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "button", 15);
        i0.ɵɵlistener("click", function MatTimepickerComponentDialogComponent_ng_template_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.okClickHandler(); });
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    }
    if (rf & 2) {
        const ctx_r3 = i0.ɵɵnextContext();
        i0.ɵɵproperty("disabled", ctx_r3.invalidSelection)("color", ctx_r3.color);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx_r3.okLabel);
    }
}
function MatTimepickerComponentDialogComponent_ng_container_15_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainer(0);
    }
}
function MatTimepickerComponentDialogComponent_ng_template_16_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "div", 4);
    }
}
const _c0 = function (a0) { return { "select": a0 }; };
function MatTimepickerComponentDialogComponent_ng_template_18_Template(rf, ctx) {
    if (rf & 1) {
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
    }
    if (rf & 2) {
        const ctx_r8 = i0.ɵɵnextContext();
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, ctx_r8.isPm));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, ctx_r8.postMeridiemAbbreviation));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, !ctx_r8.isPm));
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, ctx_r8.anteMeridiemAbbreviation));
    }
}
function MatTimepickerComponentDialogComponent_ng_container_23_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainer(0);
    }
}
function MatTimepickerComponentDialogComponent_ng_container_24_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelementContainer(0);
    }
}
const _c1 = function (a0, a1) { return { label: a0, $implicit: a1 }; };
class MatTimepickerComponentDialogComponent {
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
MatTimepickerComponentDialogComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MatTimepickerComponentDialogComponent, selectors: [["mat-timepicker-dialog"]], outputs: { changeEvent: "changeEvent", okClickEvent: "okClickEvent", cancelClickEvent: "cancelClickEvent" }, decls: 25, vars: 33, consts: [["defaultCancelButtonTemplate", ""], ["defaultOkButtonTemplate", ""], [1, "root"], [1, "header", 3, "color"], [1, "placeholder"], [1, "time-frame"], [1, "time", "fixed-font-size", 3, "ngClass", "click"], [1, "fixed-font-size"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["normal", ""], ["ampm", ""], [1, "body"], [3, "allowed12HourMap", "allowed24HourMap", "minDate", "maxDate", "color", "viewType", "mode", "formattedHours", "minutes", "formattedValue", "isPm", "changeEvent", "unavailableSelection", "invalidMeridiem", "mouseup", "clearInvalidMeridiem", "touchend", "invalidSelection"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["mat-button", "", 3, "color", "click"], ["mat-button", "", 3, "disabled", "color", "click"], [1, "ampm"], [1, "time", 3, "ngClass", "click"]], template: function MatTimepickerComponentDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
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
        }
        if (rf & 2) {
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
        }
    }, directives: [i2.MatButton, i2$1.MatDialogContent, i3.MatToolbar, i4.NgClass, i4.NgIf, ClockComponent, i2$1.MatDialogActions, i4.NgTemplateOutlet], pipes: [i4.UpperCasePipe], styles: ["mat-dialog-content[_ngcontent-%COMP%]{min-height:395px;padding:0;margin-top:-24px;overflow:hidden}mat-dialog-actions[_ngcontent-%COMP%]{justify-content:flex-end;margin-right:-8px;margin-left:-8px}.root[_ngcontent-%COMP%]{min-width:282px}.header[_ngcontent-%COMP%]{border-top-left-radius:2px;border-top-right-radius:2px;padding:20px 0;line-height:58px;font-size:58px;display:flex;justify-content:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;height:98px}.header[_ngcontent-%COMP%]   .fixed-font-size[_ngcontent-%COMP%]{font-size:58px}.header[_ngcontent-%COMP%]   .time-frame[_ngcontent-%COMP%]{height:60px}.time[_ngcontent-%COMP%]{transition:all .2s ease-out;cursor:pointer}.time[_ngcontent-%COMP%]:not(.select){opacity:.6}.placeholder[_ngcontent-%COMP%]{flex:1}.ampm[_ngcontent-%COMP%]{display:flex;flex-direction:column-reverse;flex:1;font-size:14px;line-height:20px;margin-left:16px;font-weight:700px}.select[_ngcontent-%COMP%]{color:#fff}.body[_ngcontent-%COMP%]{padding:24px 16px 20px;display:flex;justify-content:center}"] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatTimepickerComponentDialogComponent, [{
            type: Component,
            args: [{ selector: 'mat-timepicker-dialog', template: "<ng-template #defaultCancelButtonTemplate>\r\n  <button mat-button [color]=\"color\" (click)=\"cancelClickHandler()\">{{cancelLabel}}</button>\r\n</ng-template>\r\n<ng-template #defaultOkButtonTemplate>\r\n  <button mat-button [disabled]=\"invalidSelection\" [color]=\"color\" (click)=\"okClickHandler()\">{{okLabel}}</button>\r\n</ng-template>\r\n\r\n<mat-dialog-content>\r\n  <div class=\"root\">\r\n    <mat-toolbar [color]=\"color\" class=\"header\">\r\n      <div class=\"placeholder\"></div>\r\n      <div class=\"time-frame\">\r\n        <span class=\"time fixed-font-size\" [ngClass]=\"{'select': this.viewType === 'hours' && 'active' }\"\r\n          (click)=\"editHours()\">\r\n          {{ twoDigits(formattedHours) }}\r\n        </span>\r\n        <span class=\"fixed-font-size\">:</span>\r\n        <span class=\"time fixed-font-size\" [ngClass]=\"{ 'select': this.viewType === 'minutes' && 'active' }\"\r\n          (click)=\"editMinutes()\">\r\n          {{ twoDigits(minutes) }}\r\n        </span>\r\n      </div>\r\n      <ng-container *ngIf=\"mode === '12h' then ampm else normal\"></ng-container>\r\n      <ng-template #normal>\r\n        <div class=\"placeholder\"></div>\r\n      </ng-template>\r\n      <ng-template #ampm>\r\n        <div class=\"ampm\">\r\n          <span class=\"time\" [ngClass]=\"{ 'select': isPm }\" (click)=\"setPm()\">{{postMeridiemAbbreviation | uppercase\r\n            }}</span>\r\n          <span class=\"time\" [ngClass]=\"{ 'select': !isPm }\" (click)=\"setAm()\">{{anteMeridiemAbbreviation | uppercase\r\n            }}</span>\r\n        </div>\r\n      </ng-template>\r\n    </mat-toolbar>\r\n    <div class=\"body\">\r\n      <mat-clock [allowed12HourMap]=\"allowed12HourMap\" [allowed24HourMap]=\"allowed24HourMap\" [minDate]=\"minDate\"\r\n        [maxDate]=\"maxDate\" [color]=\"color\" [viewType]=\"viewType\" [mode]=\"mode\" [formattedHours]=\"formattedHours\"\r\n        [minutes]=\"minutes\" (changeEvent)=\"handleClockChange($event)\"\r\n        (unavailableSelection)=\"handleUnavailableSelection()\"\r\n        [formattedValue]=\"viewType === 'minutes' ? minutes : formattedHours\" [isPm]=\"isPm\"\r\n        (invalidMeridiem)=\"invalidMeridiem()\" (mouseup)=\"handleClockChangeDone($event)\"\r\n        (clearInvalidMeridiem)=\"clearInvalidMeridiem()\" (touchend)=\"handleClockChangeDone($event)\"\r\n        (invalidSelection)=\"invalidSelectionHandler($event)\"></mat-clock>\r\n    </div>\r\n  </div>\r\n</mat-dialog-content>\r\n<mat-dialog-actions>\r\n  <ng-container\r\n    *ngTemplateOutlet=\"cancelButtonTemplate || defaultCancelButtonTemplate; context: { label: cancelLabel, $implicit: cancelClickHandler }\">\r\n  </ng-container>\r\n  <ng-container\r\n    *ngTemplateOutlet=\"okButtonTemplate || defaultOkButtonTemplate; context: { label: okLabel, $implicit: okClickHandler }\">\r\n  </ng-container>\r\n</mat-dialog-actions>", styles: ["mat-dialog-content{min-height:395px;padding:0;margin-top:-24px;overflow:hidden}mat-dialog-actions{justify-content:flex-end;margin-right:-8px;margin-left:-8px}.root{min-width:282px}.header{border-top-left-radius:2px;border-top-right-radius:2px;padding:20px 0;line-height:58px;font-size:58px;display:flex;justify-content:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;height:98px}.header .fixed-font-size{font-size:58px}.header .time-frame{height:60px}.time{transition:all .2s ease-out;cursor:pointer}.time:not(.select){opacity:.6}.placeholder{flex:1}.ampm{display:flex;flex-direction:column-reverse;flex:1;font-size:14px;line-height:20px;margin-left:16px;font-weight:700px}.select{color:#fff}.body{padding:24px 16px 20px;display:flex;justify-content:center}\n"] }]
        }], function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [MAT_DIALOG_DATA]
                    }] }];
    }, { changeEvent: [{
                type: Output
            }], okClickEvent: [{
                type: Output
            }], cancelClickEvent: [{
                type: Output
            }] });
})();

class MatTimepickerDirective {
    constructor(ngControl, dialog, renderer, zone, fm, elRef, ngZone, 
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
    _platform, 
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
    _parentForm, 
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
    _matFormFiled, 
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
    _parentFormGroup, 
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
    _defaultErrorStateMatcher) {
        this.ngControl = ngControl;
        this.dialog = dialog;
        this.renderer = renderer;
        this.zone = zone;
        this.fm = fm;
        this.elRef = elRef;
        this.ngZone = ngZone;
        this._platform = _platform;
        this._parentForm = _parentForm;
        this._matFormFiled = _matFormFiled;
        this._parentFormGroup = _parentFormGroup;
        // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
        this._errorState = false;
        // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
        this._disabled = false;
        // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
        this._readonly = false;
        this.isAlive = new Subject();
        this.stateChanges = new Subject();
        // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
        this._uid = `mat-time-picker-${MatTimepickerDirective.nextId++}`;
        this.describedBy = '';
        // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
        this._required = false;
        this.focused = false;
        this.allowed24HourMap = null;
        this.allowed12HourMap = null;
        this.isInputFocused = false;
        /* Use a custom template for the ok button */
        this.okButtonTemplate = null;
        /* Use a custom template for the cancel button */
        this.cancelButtonTemplate = null;
        /** Override the label of the ok button. */
        this.okLabel = 'Ok';
        /** Override the label of the cancel button. */
        this.cancelLabel = 'Cancel';
        /** Override the ante meridiem abbreviation. */
        this.anteMeridiemAbbreviation = 'am';
        /** Override the post meridiem abbreviation. */
        this.postMeridiemAbbreviation = 'pm';
        /** Sets the clock mode, 12-hour or 24-hour clocks are supported. */
        this.mode = '24h';
        this.color = 'primary';
        this.disableDialogOpenOnClick = false;
        this.strict = true;
        this.controlType = 'angular-material-timepicker';
        this.listeners = [];
        // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
        this._skipValueChangeEmission = true;
        this.combination = [];
        this.timeChange = new EventEmitter();
        this.invalidInput = new EventEmitter();
        this.clickHandler = (e) => {
            if ((this.modalRef && this.modalRef.componentInstance.isClosing) || this.disabled || this.disableDialogOpenOnClick) {
                return;
            }
            if (!this.modalRef && !this.disableDialogOpenOnClick) {
                this.showDialog();
            }
        };
        this.handleChange = (newValue) => {
            if (!(newValue instanceof Date)) {
                return;
            }
            const v = this.value instanceof Date ? new Date(this.value.getTime()) : new Date();
            v.setHours(newValue.getHours());
            v.setMinutes(newValue.getMinutes());
            v.setSeconds(0);
            v.setMilliseconds(0);
            this.currentValue = v;
        };
        this.handleOk = (value) => {
            if (!this.currentValue && value) {
                this.currentValue = value;
            }
            if (this.onChangeFn) {
                this.onChangeFn(this.currentValue);
            }
            this.value = this.currentValue;
            this.modalRef.close();
        };
        this.handleCancel = () => {
            this.modalRef.close();
        };
        this.id = this.id;
        this.errorStateMatcher = _defaultErrorStateMatcher;
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
        if (_platform.IOS) {
            ngZone.runOutsideAngular(() => {
                elRef.nativeElement.addEventListener('keyup', (event) => {
                    const el = event.target;
                    if (!el.value && !el.selectionStart && !el.selectionEnd) {
                        // Note: Just setting `0, 0` doesn't fix the issue. Setting
                        // `1, 1` fixes it for the first time that you type text and
                        // then hold delete. Toggling to `1, 1` and then back to
                        // `0, 0` seems to completely fix it.
                        el.setSelectionRange(1, 1);
                        el.setSelectionRange(0, 0);
                    }
                });
            });
        }
        this._isServer = !this._platform.isBrowser;
    }
    get errorState() {
        const oldState = this._errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this.ngControl ? this.ngControl.control : null;
        const newState = this.errorStateMatcher ? this.errorStateMatcher.isErrorState(control, parent) : oldState;
        if (newState !== oldState) {
            this._errorState = newState;
            this.stateChanges.next();
        }
        return newState;
    }
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    get id() { return this._id; }
    set id(value) { this._id = value || this._uid; }
    get readonly() { return this._readonly; }
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }
    get shouldLabelFloat() { return this.focused || !this.empty; }
    get required() {
        return this._required;
    }
    set required(req) {
        this._required = coerceBooleanProperty(req);
        this.stateChanges.next();
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(plh) {
        this._placeholder = plh;
        this.stateChanges.next();
    }
    set value(value) {
        if (value === this._value) {
            return;
        }
        this._value = value;
        if (!value) {
            this._formattedValueString = null;
            this.setInputElementValue('');
            this.currentValue = value;
            return;
        }
        const { hour, isPm } = convertHoursForMode(value.getHours(), this.mode);
        this._isPm = isPm;
        this._formattedValueString = this.mode === '12h' ?
            `${hour}:${twoDigits(value.getMinutes())} ${isPm ? this.postMeridiemAbbreviation : this.anteMeridiemAbbreviation}` :
            `${twoDigits(value.getHours())}:${twoDigits(value.getMinutes())}`;
        if (!this.isInputFocused) {
            this.setInputElementValue(this.formattedValueString);
        }
        this.currentValue = value;
        this.stateChanges.next();
        if (this._skipValueChangeEmission) {
            return;
        }
        this.timeChange.emit(this.currentValue);
    }
    get value() { return this._value; }
    get isPm() { return this._isPm; }
    get empty() {
        return !(this.currentValue instanceof Date);
    }
    get formattedValueString() { return this._formattedValueString; }
    inputHandler() {
        let value = this.elRef.nativeElement.value;
        const length = value.length;
        if (length === 0) {
            this.writeValue(null, true);
            if (this.onChangeFn) {
                this.onChangeFn(null);
            }
            return;
        }
        const meridiemResult = value.match(/am|pm/i);
        let meridiem = null;
        if (meridiemResult) {
            value = value.replace(meridiemResult[0], '');
            [meridiem] = meridiemResult;
        }
        const valueHasColumn = value.includes(':');
        let [hours, minutes] = length === 1 ? [value, 0] :
            length === 2 && !valueHasColumn ? [value, 0] : valueHasColumn ? value.split(':') : value.split(/(\d\d)/).filter(v => v);
        hours = +hours;
        if (/\s/.test(minutes)) {
            let other;
            [minutes, other] = minutes.split(/\s/);
            if (other === 'pm' && !isNaN(hours) && hours < 12) {
                hours += 12;
            }
        }
        minutes = +minutes;
        if (isNaN(hours) || isNaN(minutes)) {
            this.writeValue(null, true);
            return;
        }
        if (hours < 12 && meridiem && meridiem.toLowerCase() === 'pm') {
            hours += 12;
        }
        else if (hours >= 12 && meridiem && meridiem.toLowerCase() === 'am') {
            hours -= 12;
        }
        if (this.mode === '12h' && +hours < 0) {
            hours = '0';
        }
        else {
            if (+hours > 24) {
                hours = '24';
            }
            else if (+hours < 0) {
                hours = '0';
            }
        }
        if (+minutes > 59) {
            minutes = '59';
        }
        else if (+minutes < 0) {
            minutes = '0';
        }
        const d = this.value ? new Date(this.value.getTime()) : new Date();
        d.setHours(+hours);
        d.setMinutes(+minutes);
        d.setSeconds(0);
        d.setMilliseconds(0);
        const isValueInRange = isDateInRange(this.minDate, this.maxDate, d);
        if (!isValueInRange) {
            this.invalidInput.emit();
        }
        this.writeValue(d, true);
        if (this.onChangeFn) {
            this.onChangeFn(d);
        }
    }
    keydownHandler(event) {
        if (event.metaKey || event.ctrlKey || event.altKey) {
            this.combination = this.combination.concat(event.code);
            return;
        }
        if (!/^[0-9a-zA-Z\s]{0,1}$/.test(event.key)) {
            return;
        }
        const target = event.target;
        const tValue = target.value;
        const value = `${tValue.slice(0, target.selectionStart)}${event.key}${tValue.slice(target.selectionEnd)}`;
        if (value.match(this.pattern) || this.combination.length > 0) {
            return true;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
    }
    keyupHandler(event) {
        this.combination = this.combination.filter(v => v !== event.code);
    }
    focusHandler() {
        this.isInputFocused = true;
    }
    focusoutHandler() {
        this.isInputFocused = false;
        this.setInputElementValue(this.formattedValueString);
        if (this.onTouchedFn && !this.modalRef) {
            this.onTouchedFn();
        }
    }
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    onContainerClick(event) {
        if (event.target.tagName.toLowerCase() !== 'input') {
            this.elRef.nativeElement.focus();
        }
    }
    setInputElementValue(value) {
        if (value === null || value === undefined) {
            value = '';
        }
        Promise.resolve().then(() => {
            this.zone.runOutsideAngular(() => {
                this.renderer.setProperty(this.elRef.nativeElement, 'value', value);
            });
        });
    }
    validate() {
        if (this.currentValue === null || this.currentValue === undefined) {
            return null;
        }
        const isValueInRange = this.strict ?
            isDateInRange(this.minDate, this.maxDate, this.currentValue) :
            isTimeInRange(this.minDate, this.maxDate, this.currentValue);
        return isValueInRange ? null : { dateRange: true };
    }
    ngAfterViewInit() {
        this.listeners.push(this.renderer.listen(this._matFormFiled ? this._matFormFiled._elementRef.nativeElement : this.elRef.nativeElement, 'click', this.clickHandler));
    }
    ngOnInit() {
        if (this._platform.isBrowser) {
            this.fm.monitor(this.elRef.nativeElement, true).subscribe(origin => {
                this.focused = !!origin;
                this.stateChanges.next();
            });
        }
        const hasMaxDate = !!this.maxDate;
        const hasMinDate = !!this.minDate;
        if (hasMinDate || hasMaxDate) {
            if (hasMinDate) {
                this.minDate.setSeconds(0);
                this.minDate.setMilliseconds(0);
            }
            if (hasMaxDate) {
                this.maxDate.setSeconds(0);
                this.maxDate.setMilliseconds(0);
            }
            Promise.resolve().then(() => this.generateAllowedMap());
            if (!this.ngControl._rawValidators.find(v => v === this)) {
                this.ngControl.control.setValidators(this.ngControl._rawValidators.concat(this));
                this.ngControl.control.updateValueAndValidity();
            }
        }
        this._skipValueChangeEmission = false;
    }
    generateAllowedMap() {
        const isStrictMode = this.strict && this.value instanceof Date;
        if (this.mode === '24h') {
            this.allowed24HourMap = {};
            for (let h = 0; h < 24; h++) {
                for (let m = 0; m < 60; m++) {
                    const hourMap = this.allowed24HourMap[h] || {};
                    if (isStrictMode) {
                        const currentDate = new Date(this.value.getTime());
                        currentDate.setHours(h);
                        currentDate.setMinutes(m);
                        currentDate.setSeconds(0);
                        currentDate.setMilliseconds(0);
                        hourMap[m] = isDateInRange(this.minDate, this.maxDate, currentDate);
                    }
                    else {
                        hourMap[m] = isAllowed(h, m, this.minDate, this.maxDate, '24h');
                    }
                    this.allowed24HourMap[h] = hourMap;
                }
            }
        }
        else {
            this.allowed12HourMap = { am: {}, pm: {} };
            for (let h = 0; h < 24; h++) {
                const meridiem = h < 12 ? 'am' : 'pm';
                for (let m = 0; m < 60; m++) {
                    const hour = (h > 12 ? h - 12 : h === 0 ? 12 : h);
                    const hourMap = this.allowed12HourMap[meridiem][hour] || {};
                    if (isStrictMode) {
                        const currentDate = new Date(this.value.getTime());
                        currentDate.setHours(h);
                        currentDate.setMinutes(m);
                        currentDate.setSeconds(0);
                        currentDate.setMilliseconds(0);
                        hourMap[m] = isDateInRange(this.minDate, this.maxDate, currentDate);
                    }
                    else {
                        hourMap[m] = isAllowed(h, m, this.minDate, this.maxDate, '24h');
                    }
                    this.allowed12HourMap[meridiem][hour] = hourMap;
                }
            }
        }
    }
    ngOnChanges(simpleChanges) {
        this.pattern = this.mode === '24h' ? /^[0-9]{1,2}:?([0-9]{1,2})?$/ : /^[0-9]{1,2}:?([0-9]{1,2})?\s?(a|p)?m?$/;
        if ((simpleChanges.minDate && !simpleChanges.minDate.isFirstChange() &&
            +simpleChanges.minDate.currentValue !== simpleChanges.minDate.previousValue) ||
            (simpleChanges.maxDate && !simpleChanges.maxDate.isFirstChange() &&
                +simpleChanges.maxDate.currentValue !== simpleChanges.maxDate.previousValue) ||
            (simpleChanges.disableLimitBase && !simpleChanges.disableLimitBase.isFirstChange() &&
                +simpleChanges.disableLimitBase.currentValue !== simpleChanges.disableLimitBase.previousValue)) {
            this.generateAllowedMap();
            this.ngControl.control.updateValueAndValidity();
        }
        if (!this.modalRef || !this.modalRef.componentInstance) {
            return;
        }
        this.modalRef.componentInstance.data = {
            mode: this.mode,
            value: this.currentValue,
            okLabel: this.okLabel,
            cancelLabel: this.cancelLabel,
            okButtonTemplate: this.okButtonTemplate,
            cancelButtonTemplate: this.cancelButtonTemplate,
            anteMeridiemAbbreviation: this.anteMeridiemAbbreviation,
            postMeridiemAbbreviation: this.postMeridiemAbbreviation,
            color: this.color,
            isPm: this.isPm,
            minDate: this.minDate,
            maxDate: this.maxDate,
            allowed12HourMap: this.allowed12HourMap,
            allowed24HourMap: this.allowed24HourMap,
        };
    }
    checkValidity(value) {
        if (!value) {
            return false;
        }
        const hour = value.getHours();
        const minutes = value.getMinutes();
        const meridiem = this.isPm ? 'PM' : 'AM';
        return isAllowed(hour, minutes, this.minDate, this.maxDate, this.mode, meridiem);
    }
    writeValue(value, isInnerCall = false) {
        if (!isInnerCall) {
            this._skipValueChangeEmission = true;
            Promise.resolve().then(() => this._skipValueChangeEmission = false);
        }
        if (value) {
            value.setSeconds(0);
            value.setMilliseconds(0);
        }
        if (+this.value !== +value) {
            this.value = value;
        }
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedFn = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    showDialog() {
        if (this.disabled) {
            return;
        }
        this.isInputFocused = false;
        this.modalRef = this.dialog.open(MatTimepickerComponentDialogComponent, {
            autoFocus: false,
            data: {
                mode: this.mode,
                value: this.currentValue,
                okLabel: this.okLabel,
                cancelLabel: this.cancelLabel,
                okButtonTemplate: this.okButtonTemplate,
                cancelButtonTemplate: this.cancelButtonTemplate,
                anteMeridiemAbbreviation: this.anteMeridiemAbbreviation,
                postMeridiemAbbreviation: this.postMeridiemAbbreviation,
                color: this.color,
                isPm: this.isPm,
                minDate: this.minDate,
                maxDate: this.maxDate,
                allowed12HourMap: this.allowed12HourMap,
                allowed24HourMap: this.allowed24HourMap
            }
        });
        const instance = this.modalRef.componentInstance;
        instance.changeEvent.pipe(takeUntil(this.isAlive)).subscribe(this.handleChange);
        instance.okClickEvent.pipe(takeUntil(this.isAlive)).subscribe(this.handleOk);
        instance.cancelClickEvent.pipe(takeUntil(this.isAlive)).subscribe(this.handleCancel);
        this.modalRef.beforeClosed().pipe(first()).subscribe(() => instance.isClosing = true);
        this.modalRef.afterClosed().pipe(first()).subscribe(() => {
            if (this.onTouchedFn) {
                this.onTouchedFn();
            }
            this.modalRef = null;
            this.elRef.nativeElement.focus();
        });
        this.currentValue = this.value;
    }
    ngOnDestroy() {
        this.isAlive.next();
        this.isAlive.complete();
        this.stateChanges.complete();
        if (this._platform.isBrowser) {
            this.fm.stopMonitoring(this.elRef.nativeElement);
        }
        this.listeners.forEach(l => l());
    }
}
MatTimepickerDirective.nextId = 0;
MatTimepickerDirective.ɵfac = function MatTimepickerDirective_Factory(t) { return new (t || MatTimepickerDirective)(i0.ɵɵdirectiveInject(i1.NgControl, 10), i0.ɵɵdirectiveInject(i2$1.MatDialog), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i3$1.FocusMonitor), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i4$1.Platform), i0.ɵɵdirectiveInject(i1.NgForm, 8), i0.ɵɵdirectiveInject(i5.MatFormField, 8), i0.ɵɵdirectiveInject(i1.FormGroupDirective, 8), i0.ɵɵdirectiveInject(i6.ErrorStateMatcher)); };
MatTimepickerDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: MatTimepickerDirective, selectors: [["input", "matTimepicker", ""]], hostAttrs: [1, "mat-input-element", "mat-form-field-autofill-control"], hostVars: 12, hostBindings: function MatTimepickerDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵlistener("input", function MatTimepickerDirective_input_HostBindingHandler() { return ctx.inputHandler(); })("keydown", function MatTimepickerDirective_keydown_HostBindingHandler($event) { return ctx.keydownHandler($event); })("keyup", function MatTimepickerDirective_keyup_HostBindingHandler($event) { return ctx.keyupHandler($event); })("focus", function MatTimepickerDirective_focus_HostBindingHandler() { return ctx.focusHandler(); })("focusout", function MatTimepickerDirective_focusout_HostBindingHandler() { return ctx.focusoutHandler(); });
        }
        if (rf & 2) {
            i0.ɵɵhostProperty("disabled", ctx.disabled)("required", ctx.required);
            i0.ɵɵattribute("id", ctx.id)("placeholder", ctx.placeholder)("readonly", ctx.readonly || null)("aria-invalid", ctx.errorState)("aria-required", ctx.required.toString())("aria-describedby", ctx.describedBy);
            i0.ɵɵclassProp("mat-input-server", ctx._isServer)("floating", ctx.shouldLabelFloat);
        }
    }, inputs: { disabled: "disabled", id: "id", readonly: "readonly", errorStateMatcher: "errorStateMatcher", required: "required", placeholder: "placeholder", okButtonTemplate: "okButtonTemplate", cancelButtonTemplate: "cancelButtonTemplate", okLabel: "okLabel", cancelLabel: "cancelLabel", anteMeridiemAbbreviation: "anteMeridiemAbbreviation", postMeridiemAbbreviation: "postMeridiemAbbreviation", mode: "mode", color: "color", disableDialogOpenOnClick: "disableDialogOpenOnClick", strict: "strict", minDate: "minDate", maxDate: "maxDate", value: "value" }, outputs: { timeChange: "timeChange", invalidInput: "invalidInput" }, exportAs: ["matTimepicker"], features: [i0.ɵɵProvidersFeature([
            { provide: MatFormFieldControl, useExisting: MatTimepickerDirective }
        ]), i0.ɵɵNgOnChangesFeature] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatTimepickerDirective, [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: 'input[matTimepicker]',
                    providers: [
                        { provide: MatFormFieldControl, useExisting: MatTimepickerDirective }
                    ],
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        /**
                         * @breaking-change 8.0.0 remove .mat-form-field-autofill-control in favor of AutofillMonitor.
                         */
                        // eslint-disable-next-line quote-props
                        'class': 'mat-input-element mat-form-field-autofill-control',
                        '[class.mat-input-server]': '_isServer',
                        // Native input properties that are overwritten by Angular inputs need to be synced with
                        // the native input element. Otherwise property bindings for those don't work.
                        '[attr.id]': 'id',
                        '[attr.placeholder]': 'placeholder',
                        '[disabled]': 'disabled',
                        '[required]': 'required',
                        '[attr.readonly]': 'readonly || null',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-required]': 'required.toString()',
                    },
                    exportAs: 'matTimepicker'
                }]
        }], function () {
        return [{ type: i1.NgControl, decorators: [{
                        type: Optional
                    }, {
                        type: Self
                    }] }, { type: i2$1.MatDialog }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i3$1.FocusMonitor }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i4$1.Platform }, { type: i1.NgForm, decorators: [{
                        type: Optional
                    }] }, { type: i5.MatFormField, decorators: [{
                        type: Optional
                    }] }, { type: i1.FormGroupDirective, decorators: [{
                        type: Optional
                    }] }, { type: i6.ErrorStateMatcher }];
    }, { disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], readonly: [{
                type: Input
            }], shouldLabelFloat: [{
                type: HostBinding,
                args: ['class.floating']
            }], describedBy: [{
                type: HostBinding,
                args: ['attr.aria-describedby']
            }], errorStateMatcher: [{
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], okButtonTemplate: [{
                type: Input
            }], cancelButtonTemplate: [{
                type: Input
            }], okLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], anteMeridiemAbbreviation: [{
                type: Input
            }], postMeridiemAbbreviation: [{
                type: Input
            }], mode: [{
                type: Input
            }], color: [{
                type: Input
            }], disableDialogOpenOnClick: [{
                type: Input
            }], strict: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], value: [{
                type: Input
            }], timeChange: [{
                type: Output
            }], invalidInput: [{
                type: Output
            }], inputHandler: [{
                type: HostListener,
                args: ['input']
            }], keydownHandler: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], keyupHandler: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }], focusHandler: [{
                type: HostListener,
                args: ['focus']
            }], focusoutHandler: [{
                type: HostListener,
                args: ['focusout']
            }] });
})();

class MatTimepickerModule {
}
MatTimepickerModule.ɵfac = function MatTimepickerModule_Factory(t) { return new (t || MatTimepickerModule)(); };
MatTimepickerModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: MatTimepickerModule });
MatTimepickerModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            CommonModule,
            MatDialogModule,
            MatButtonModule,
            MatToolbarModule,
            MatIconModule,
            MatInputModule
        ]] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatTimepickerModule, [{
            type: NgModule,
            args: [{
                    declarations: [
                        ClockComponent,
                        MatTimepickerDirective,
                        MatTimepickerComponentDialogComponent
                    ],
                    imports: [
                        CommonModule,
                        MatDialogModule,
                        MatButtonModule,
                        MatToolbarModule,
                        MatIconModule,
                        MatInputModule
                    ],
                    exports: [
                        MatTimepickerDirective
                    ],
                    entryComponents: [
                        MatTimepickerComponentDialogComponent
                    ]
                }]
        }], null, null);
})();
(function () {
    (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MatTimepickerModule, { declarations: [ClockComponent,
            MatTimepickerDirective,
            MatTimepickerComponentDialogComponent], imports: [CommonModule,
            MatDialogModule,
            MatButtonModule,
            MatToolbarModule,
            MatIconModule,
            MatInputModule], exports: [MatTimepickerDirective] });
})();

/*
 * Public API Surface of mat-timepicker
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MatTimepickerDirective, MatTimepickerModule };
//# sourceMappingURL=mat-timepicker.mjs.map
