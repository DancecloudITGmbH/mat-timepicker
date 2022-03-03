import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { getIsAvailabeFn } from '../util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/toolbar";
function ClockComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "\u00B7");
    i0.ɵɵelementContainerEnd();
} }
function ClockComponent_ng_container_7_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1, "\u00B7");
    i0.ɵɵelementContainerEnd();
} }
const _c0 = function (a0, a1) { return { "selected": a0, "disabled": a1 }; };
function ClockComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 8);
    i0.ɵɵtemplate(2, ClockComponent_ng_container_7_ng_container_2_Template, 2, 0, "ng-container", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const digit_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("transform", "translate(" + digit_r4.translateX + "px, " + digit_r4.translateY + "px)");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c0, ctx_r1.formattedValue === digit_r4.display || digit_r4.display === 0 && ctx_r1.formattedValue === 0, !ctx_r1.isAvailable(digit_r4.display === 60 ? 0 : digit_r4.display)));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", digit_r4.display % 5 !== 0);
} }
function ClockComponent_ng_container_8_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const digit_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate(digit_r6.display);
} }
function ClockComponent_ng_container_8_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const digit_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate(digit_r6.display === 60 ? "00" : digit_r6.display);
} }
function ClockComponent_ng_container_8_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ClockComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 9);
    i0.ɵɵtemplate(2, ClockComponent_ng_container_8_ng_template_2_Template, 1, 1, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵtemplate(4, ClockComponent_ng_container_8_ng_template_4_Template, 1, 1, "ng-template", null, 11, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵtemplate(6, ClockComponent_ng_container_8_ng_container_6_Template, 1, 0, "ng-container", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const digit_r6 = ctx.$implicit;
    const _r7 = i0.ɵɵreference(3);
    const _r9 = i0.ɵɵreference(5);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("transform", "translate(" + digit_r6.translateX + "px, " + digit_r6.translateY + "px)");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(6, _c0, ctx_r2.formattedValue === digit_r6.display || digit_r6.display === 60 && ctx_r2.formattedValue === 0, !ctx_r2.isAvailable(digit_r6.display === 60 ? 0 : digit_r6.display)));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.viewType === "minutes")("ngIfThen", _r9)("ngIfElse", _r7);
} }
function ClockComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "button", 13);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const digit_r14 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("transform", "translate(" + digit_r14.translateX + "px, " + digit_r14.translateY + "px)");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(4, _c0, ctx_r3.formattedValue === digit_r14.display || digit_r14.display === 24 && ctx_r3.formattedValue === 0, !ctx_r3.isAvailable(digit_r14.display === 24 ? 0 : digit_r14.display)));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", digit_r14.display === 24 ? "00" : digit_r14.display, " ");
} }
const _c1 = function (a0, a1) { return { "small-pointer": a0, "animated-pointer": a1 }; };
const _c2 = function (a0) { return { "outer-dot-odd": a0 }; };
export class ClockComponent {
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
ClockComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ClockComponent, selectors: [["mat-clock"]], inputs: { mode: "mode", viewType: "viewType", color: "color", formattedValue: "formattedValue", minDate: "minDate", maxDate: "maxDate", isPm: "isPm", formattedHours: "formattedHours", minutes: "minutes", allowed12HourMap: "allowed12HourMap", allowed24HourMap: "allowed24HourMap" }, outputs: { changeEvent: "changeEvent", unavailableSelection: "unavailableSelection", invalidMeridiem: "invalidMeridiem", invalidSelection: "invalidSelection", clearInvalidMeridiem: "clearInvalidMeridiem" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 16, consts: [[1, "root"], [1, "circle", 3, "touchmove", "mousemove", "touchstart", "mousedown", "touchend", "mouseup", "click"], [1, "pointer-container", 3, "ngClass"], ["mat-mini-fab", "", 1, "inner-dot", 3, "color"], [1, "pointer", 3, "color"], ["mat-mini-fab", "", 1, "outer-dot", 3, "color", "ngClass"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "number", "minute-dot", 3, "ngClass"], [1, "number", 3, "ngClass"], ["hoursTemplate", ""], ["minutesTemplate", ""], [4, "ngIf", "ngIfThen", "ngIfElse"], [1, "number", "small-number", 3, "ngClass"]], template: function ClockComponent_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵstyleProp("transform", "rotate(" + ctx.angle + "deg)");
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(11, _c1, ctx.mode === "24h" && ctx.viewType === "hours" && (ctx.formattedValue === 0 || ctx.formattedValue > 12), !ctx.touching));
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
    } }, directives: [i1.NgClass, i2.MatButton, i3.MatToolbar, i1.NgIf, i1.NgForOf], styles: [".root[_ngcontent-%COMP%]{width:256px;height:256px;cursor:default}.circle[_ngcontent-%COMP%]{width:256px;height:256px;border-radius:50%;position:relative;background:#ededed;cursor:pointer}.number[_ngcontent-%COMP%]{width:32px;height:32px;border:0px;left:calc(50% - 16px);top:calc(50% - 16px);position:absolute;text-align:center;line-height:32px;cursor:pointer;font-size:14px;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;display:flex;align-items:center;justify-content:center;flex-direction:column;background-color:transparent!important;background:transparent!important;box-shadow:0 -1px 5px -200px #000!important;-webkit-box-shadow:0px -1px 5px -200px black!important;-moz-box-shadow:0px -1px 5px -200px black!important}.number.disabled[_ngcontent-%COMP%]{color:#0101011a}.number[_ngcontent-%COMP%]:not(.selected):not(.disabled){color:#000000de}.number[_ngcontent-%COMP%]:not(.disabled).minute-dot{color:#010101b3}.number[_ngcontent-%COMP%]:not(.disabled).minute-dot.selected{color:transparent}.small-number[_ngcontent-%COMP%]{font-size:12px}.small-number[_ngcontent-%COMP%]:not(.selected):not(.disabled){color:#000000ab}.pointer-container[_ngcontent-%COMP%]{width:calc(50% - 20px);height:2;position:absolute;left:50%;top:calc(50% - 1px);transform-origin:left center;pointer-events:none}.pointer-container.disabled[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{background-color:transparent}.pointer[_ngcontent-%COMP%]{height:1px}.animated-pointer[_ngcontent-%COMP%]{transition:all .2s ease-out}.small-pointer[_ngcontent-%COMP%]{width:calc(50% - 52px)}.inner-dot[_ngcontent-%COMP%]{position:absolute;top:-3px;left:-4px;width:8px;height:8px;border-radius:50%;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}.outer-dot[_ngcontent-%COMP%]{width:32px;height:32px;position:absolute;right:-16px;border-radius:50%;box-sizing:content-box;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}.outer-dot-odd[_ngcontent-%COMP%]{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-direction:column;box-shadow:0 3px 5px -1px #0000,0 6px 10px #0000,0 1px 18px #0000!important;-webkit-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important;-moz-box-shadow:0px 3px 5px -1px rgba(0,0,0,0),0px 6px 10px 0px rgba(0,0,0,0),0px 1px 18px 0px rgba(0,0,0,0)!important}"], changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ClockComponent, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0LXRpbWVwaWNrZXIvc3JjL2xpYi9jbG9jay9jbG9jay5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXQtdGltZXBpY2tlci9zcmMvbGliL2Nsb2NrL2Nsb2NrLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFILE9BQU8sRUFBYSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7OztJQ1MzQyw2QkFBeUU7SUFBQSxzQkFBQztJQUFBLDBCQUFlOzs7SUFRM0YsNkJBQThDO0lBQUEsc0JBQUM7SUFBQSwwQkFBZTs7OztJQUpsRSw2QkFBZ0Q7SUFDOUMsaUNBRTBGO0lBQ3hGLGdHQUE4RDtJQUNoRSxpQkFBUztJQUNYLDBCQUFlOzs7O0lBSFgsZUFBdUY7SUFBdkYsc0dBQXVGO0lBRHZGLDhOQUFnTDtJQUVqSyxlQUE2QjtJQUE3QixpREFBNkI7OztJQU9oQixZQUFtQjs7O0lBQW5CLHNDQUFtQjs7O0lBQ2pCLFlBQWlEOzs7SUFBakQsdUVBQWlEOzs7SUFDL0Usd0JBQXFHOzs7SUFOekcsNkJBQTZDO0lBQzNDLGlDQUUwRjtJQUN4RixnSUFBNkQ7SUFDN0QsZ0lBQTZGO0lBQzdGLGlHQUFxRztJQUN2RyxpQkFBUztJQUVYLDBCQUFlOzs7Ozs7SUFOWCxlQUF1RjtJQUF2RixzR0FBdUY7SUFEdkYsK05BQWlMO0lBSWxLLGVBQTZCO0lBQTdCLG9EQUE2QixpQkFBQSxpQkFBQTs7O0lBSWhELDZCQUFzRDtJQUNwRCxrQ0FFMEY7SUFDeEYsWUFDRjtJQUFBLGlCQUFTO0lBRVgsMEJBQWU7Ozs7SUFKWCxlQUF1RjtJQUF2Rix3R0FB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O2tCQUF4QixNQUFNO1lBQ0csZ0JBQWdCO2tCQUF6QixNQUFNO1lBQ0csb0JBQW9CO2tCQUE3QixNQUFNO1lBRUUsZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xvY2tWaWV3VHlwZSwgQ2xvY2tOdW1iZXIsIElUaW1lRGF0YSwgQ2xvY2tNb2RlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy1hbmQtdHlwZXMnO1xyXG5pbXBvcnQgeyBpc0FsbG93ZWQsIGdldElzQXZhaWxhYmVGbiB9IGZyb20gJy4uL3V0aWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ21hdC1jbG9jaycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Nsb2NrLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jbG9jay5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDbG9ja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gIEBJbnB1dCgpIG1vZGU6IENsb2NrTW9kZTtcclxuICBASW5wdXQoKSB2aWV3VHlwZTogQ2xvY2tWaWV3VHlwZTtcclxuICBASW5wdXQoKSBjb2xvciA9ICdwcmltYXJ5JztcclxuICBASW5wdXQoKSBmb3JtYXR0ZWRWYWx1ZTogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIG1pbkRhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZTtcclxuICBASW5wdXQoKSBpc1BtOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGZvcm1hdHRlZEhvdXJzOiBudW1iZXI7XHJcbiAgQElucHV0KCkgbWludXRlczogbnVtYmVyO1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2VFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgdW5hdmFpbGFibGVTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIGludmFsaWRNZXJpZGllbTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgaW52YWxpZFNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgY2xlYXJJbnZhbGlkTWVyaWRpZW06IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBJbnB1dCgpIGFsbG93ZWQxMkhvdXJNYXAgPSBudWxsO1xyXG4gIEBJbnB1dCgpIGFsbG93ZWQyNEhvdXJNYXAgPSBudWxsO1xyXG5cclxuICBpc0Zvcm1hdHRlZFZhbHVlQWxsb3dlZCA9IHRydWU7XHJcblxyXG4gIGlzQXZhaWxhYmxlRm46IFJldHVyblR5cGU8dHlwZW9mIGdldElzQXZhaWxhYmVGbj47XHJcblxyXG4gIG1lcmlkaWVtID0gbnVsbDtcclxuICB0b3VjaGluZyA9IGZhbHNlO1xyXG4gIGFuZ2xlOiBudW1iZXI7XHJcbiAgbnVtYmVyczogQ2xvY2tOdW1iZXJbXSA9IFtdO1xyXG4gIHNlY29uZGFyeU51bWJlcnM6IENsb2NrTnVtYmVyW10gPSBbXTtcclxuICBtaW51dGVEb3RzOiBDbG9ja051bWJlcltdID0gW107XHJcbiAgaW52YWxpZE1lcmlkaWVtRW1pdHRlZCA9IHRydWU7XHJcblxyXG4gIGluaXRJc0FsbG93ZWRGbigpIHtcclxuICAgIGlmICghdGhpcy5hbGxvd2VkMTJIb3VyTWFwICYmICF0aGlzLmFsbG93ZWQyNEhvdXJNYXApIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLmlzQXZhaWxhYmxlRm4gPSBnZXRJc0F2YWlsYWJlRm4odGhpcy5hbGxvd2VkMTJIb3VyTWFwLCB0aGlzLmFsbG93ZWQyNEhvdXJNYXAsIHRoaXMubW9kZSk7XHJcbiAgfVxyXG5cclxuICBpc0F2YWlsYWJsZSh2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNBdmFpbGFibGVGbiA/IHRoaXMuaXNBdmFpbGFibGVGbih2YWx1ZSwgdGhpcy52aWV3VHlwZSwgdGhpcy5pc1BtLCB0aGlzLmZvcm1hdHRlZEhvdXJzKSA6IHRydWU7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBzaW1wbGVDaGFuZ2VzLmFsbG93ZWQxMkhvdXJNYXAgfHxcclxuICAgICAgc2ltcGxlQ2hhbmdlcy5hbGxvd2VkMjRIb3VyTWFwIHx8XHJcbiAgICAgIChzaW1wbGVDaGFuZ2VzLm1vZGUgJiYgIXNpbXBsZUNoYW5nZXMubW9kZS5maXJzdENoYW5nZSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmluaXRJc0FsbG93ZWRGbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2FsY3VsYXRlQW5ndWxlKCk7XHJcbiAgICB0aGlzLnNldE51bWJlcnMoKTtcclxuICAgIHRoaXMubWVyaWRpZW0gPSB0aGlzLmlzUG0gPyAnUE0nIDogJ0FNJztcclxuXHJcbiAgICBpZiAoc2ltcGxlQ2hhbmdlcy5mb3JtYXR0ZWRWYWx1ZSAmJiAodGhpcy5hbGxvd2VkMTJIb3VyTWFwIHx8IHRoaXMuYWxsb3dlZDI0SG91ck1hcCkpIHtcclxuICAgICAgdGhpcy5pc0Zvcm1hdHRlZFZhbHVlQWxsb3dlZCA9IHRoaXMuaXNBdmFpbGFibGUodGhpcy5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNTZWxlY3RlZFRpbWVBdmFpbGFibGUgPSAodGhpcy5pc0F2YWlsYWJsZUZuKSA/XHJcbiAgICAgIC8vIHdoZW4gY2FsbGluZyBpc0F2YWlsYWJsZUZuIGhlcmUgd2Ugc2hvdWxkIGFsd2F5cyBzZXQgdGhlIHZpZXdUeXBlIHRvIG1pbnV0ZXMgYmVjYXVzZSB3ZSB3YW50IHRvIGNoZWNrIHRoZSBob3VycyBhbmQgdGhlIG1pbnV0ZXNcclxuICAgICAgdGhpcy5pc0F2YWlsYWJsZUZuKHRoaXMubWludXRlcywgJ21pbnV0ZXMnLCB0aGlzLmlzUG0sIHRoaXMuZm9ybWF0dGVkSG91cnMpIDogdHJ1ZTtcclxuXHJcbiAgICAvLyBpZiAodGhpcy5tb2RlID09PSAnMjRoJyAmJiB0aGlzLnZpZXdUeXBlID09PSAnbWludXRlcycgJiYgdGhpcy5pc0F2YWlsYWJsZUZuKSB7XHJcbiAgICAvLyAgIGNvbnN0IGFyZU1pbml0ZXNBdmFpbGFibGUgPSB0aGlzLmlzQXZhaWxhYmxlRm4odGhpcy5taW51dGVzLCAnbWludXRlcycsIHRoaXMuaXNQbSwgdGhpcy5mb3JtYXR0ZWRIb3Vycyk7XHJcbiAgICAvLyAgIGlmICghYXJlTWluaXRlc0F2YWlsYWJsZSkge1xyXG4gICAgLy8gICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGhpcy5taW5EYXRlLmdldE1pbnV0ZXMoKSA+IHRoaXMubWludXRlcykge1xyXG4gICAgLy8gICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuY2hhbmdlRXZlbnQuZW1pdCh7IHZhbHVlOiB0aGlzLm1pbkRhdGUuZ2V0TWludXRlcygpLCB0eXBlOiAnbWludXRlcycgfSk7IH0pO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5jaGFuZ2VFdmVudC5lbWl0KHsgdmFsdWU6IHRoaXMubWF4RGF0ZS5nZXRNaW51dGVzKCksIHR5cGU6ICdtaW51dGVzJyB9KTsgfSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgaWYgKGlzU2VsZWN0ZWRUaW1lQXZhaWxhYmxlICYmIHRoaXMuaW52YWxpZE1lcmlkaWVtRW1pdHRlZCkge1xyXG4gICAgICB0aGlzLmNsZWFySW52YWxpZE1lcmlkaWVtLmVtaXQoKTtcclxuICAgICAgdGhpcy5pbnZhbGlkTWVyaWRpZW1FbWl0dGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbnZhbGlkU2VsZWN0aW9uLmVtaXQoIWlzU2VsZWN0ZWRUaW1lQXZhaWxhYmxlKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZUFuZ3VsZSgpIHtcclxuICAgIHRoaXMuYW5nbGUgPSB0aGlzLmdldFBvaW50ZXJBbmdsZSh0aGlzLmZvcm1hdHRlZFZhbHVlLCB0aGlzLnZpZXdUeXBlKTtcclxuICB9XHJcblxyXG4gIHNldE51bWJlcnMoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3VHlwZSA9PT0gJ2hvdXJzJykge1xyXG4gICAgICBpZiAodGhpcy5tb2RlID09PSAnMTJoJykge1xyXG4gICAgICAgIGNvbnN0IG1lcmlkaWVtID0gdGhpcy5pc1BtID8gJ3BtJyA6ICdhbSc7XHJcbiAgICAgICAgY29uc3QgaXNBbGxvd2VkRm4gPSB0aGlzLmFsbG93ZWQxMkhvdXJNYXAgPyBudW0gPT4gdGhpcy5hbGxvd2VkMTJIb3VyTWFwW21lcmlkaWVtXVtudW0gKyAxXVswXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLm51bWJlcnMgPSB0aGlzLmdldE51bWJlcnMoMTIsIHsgc2l6ZTogMjU2IH0sIGlzQWxsb3dlZEZuKTtcclxuICAgICAgICB0aGlzLnNlY29uZGFyeU51bWJlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLm1pbnV0ZURvdHMgPSBbXTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICcyNGgnKSB7XHJcbiAgICAgICAgY29uc3QgaXNBbGxvd2VkRm4gPSB0aGlzLmFsbG93ZWQyNEhvdXJNYXAgPyBudW0gPT4gdGhpcy5hbGxvd2VkMjRIb3VyTWFwW251bV1bMF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5udW1iZXJzID0gdGhpcy5nZXROdW1iZXJzKDEyLCB7IHNpemU6IDI1NiB9LCBpc0FsbG93ZWRGbik7XHJcbiAgICAgICAgdGhpcy5zZWNvbmRhcnlOdW1iZXJzID0gdGhpcy5nZXROdW1iZXJzKDEyLCB7IHNpemU6IDI1NiAtIDY0LCBzdGFydDogMTMgfSwgaXNBbGxvd2VkRm4pO1xyXG4gICAgICAgIHRoaXMubWludXRlRG90cyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBtZXJpZGllbSA9IHRoaXMuaXNQbSA/ICdwbScgOiAnYW0nO1xyXG4gICAgICBjb25zdCBpc0FsbG93ZWRGbiA9XHJcbiAgICAgICAgISF0aGlzLmFsbG93ZWQxMkhvdXJNYXAgPyBudW0gPT4gdGhpcy5hbGxvd2VkMTJIb3VyTWFwW21lcmlkaWVtXVt0aGlzLmZvcm1hdHRlZEhvdXJzXVtudW1dIDpcclxuICAgICAgICAgICEhdGhpcy5hbGxvd2VkMjRIb3VyTWFwID8gbnVtID0+IHRoaXMuYWxsb3dlZDI0SG91ck1hcFt0aGlzLmZvcm1hdHRlZEhvdXJzXVtudW1dIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgdGhpcy5udW1iZXJzID0gdGhpcy5nZXROdW1iZXJzKDEyLCB7IHNpemU6IDI1Niwgc3RhcnQ6IDUsIHN0ZXA6IDUgfSwgaXNBbGxvd2VkRm4pO1xyXG4gICAgICB0aGlzLm1pbnV0ZURvdHMgPSB0aGlzLmdldE51bWJlcnMoNjAsIHsgc2l6ZTogMjU2LCBzdGFydDogMTMgfSkubWFwKGRpZ2l0ID0+IHtcclxuICAgICAgICBpZiAoZGlnaXQuZGlzcGxheSA8PSA1OSkge1xyXG4gICAgICAgICAgZGlnaXQuYWxsb3dlZCA9IGlzQWxsb3dlZEZuID8gaXNBbGxvd2VkRm4oZGlnaXQuZGlzcGxheSkgOiB0cnVlO1xyXG4gICAgICAgICAgcmV0dXJuIGRpZ2l0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaWdpdC5kaXNwbGF5ID0gZGlnaXQuZGlzcGxheSAtIDYwO1xyXG4gICAgICAgIGRpZ2l0LmFsbG93ZWQgPSBpc0FsbG93ZWRGbiA/IGlzQWxsb3dlZEZuKGRpZ2l0LmRpc3BsYXkpIDogdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZGlnaXQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNlY29uZGFyeU51bWJlcnMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc2FibGVBbmltYXRlZFBvaW50ZXIoKSB7XHJcbiAgICB0aGlzLnRvdWNoaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGVuYWJsZUFuaW1hdGVkUG9pbnRlcigpIHtcclxuICAgIHRoaXMudG91Y2hpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVRvdWNoTW92ZSA9IChlOiBhbnkpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBzY3JvbGxpbmcgYmVoaW5kIHRoZSBjbG9jayBvbiBpT1NcclxuICAgIGNvbnN0IHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHRoaXMubW92ZVBvaW50ZXIoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSByZWN0LnRvcCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVUb3VjaEVuZChlOiBhbnkpIHtcclxuICAgIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKGUpO1xyXG4gICAgdGhpcy5lbmFibGVBbmltYXRlZFBvaW50ZXIoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZU1vdXNlTW92ZShlOiBhbnkpIHtcclxuICAgIC8vIE1vdXNlRXZlbnQud2hpY2ggaXMgZGVwcmVjYXRlZCwgYnV0IE1vdXNlRXZlbnQuYnV0dG9ucyBpcyBub3Qgc3VwcG9ydGVkIGluIFNhZmFyaVxyXG4gICAgaWYgKChlLmJ1dHRvbnMgPT09IDEgfHwgZS53aGljaCA9PT0gMSkgJiYgdGhpcy50b3VjaGluZykge1xyXG4gICAgICBjb25zdCByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHRoaXMubW92ZVBvaW50ZXIoZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDbGljayhlOiBhbnkpIHtcclxuICAgIGNvbnN0IHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIHRoaXMubW92ZVBvaW50ZXIoZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCBlLmNsaWVudFkgLSByZWN0LnRvcCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlUG9pbnRlcih4LCB5KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0UG9pbnRlclZhbHVlKHgsIHksIDI1Nik7XHJcbiAgICBpZiAoIXRoaXMuaXNBdmFpbGFibGUodmFsdWUpKSB7XHJcbiAgICAgIHRoaXMudW5hdmFpbGFibGVTZWxlY3Rpb24uZW1pdCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuZm9ybWF0dGVkVmFsdWUpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VFdmVudC5lbWl0KHsgdmFsdWUsIHR5cGU6IHRoaXMudmlld1R5cGUgfSk7XHJcbiAgICAgIGlmICh0aGlzLnZpZXdUeXBlICE9PSAnbWludXRlcycpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNBdmFpbGFibGUodmFsdWUpKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIHRoaXMuaXNBdmFpbGFibGUodmFsdWUpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VFdmVudC5lbWl0KHsgdmFsdWU6IHRoaXMubWluRGF0ZS5nZXRNaW51dGVzKCksIHR5cGU6ICdtaW51dGVzJyB9KTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhEYXRlICYmIHRoaXMuaXNBdmFpbGFibGUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRXZlbnQuZW1pdCh7IHZhbHVlOiB0aGlzLm1heERhdGUuZ2V0TWludXRlcygpLCB0eXBlOiAnbWludXRlcycgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXROdW1iZXJzKGNvdW50LCB7IHNpemUsIHN0YXJ0ID0gMSwgc3RlcCA9IDEgfSwgaXNBbGxvd2VkRm4/OiAobnVtOiBudW1iZXIpID0+IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiBBcnJheS5hcHBseShudWxsLCBBcnJheShjb3VudCkpLm1hcCgoXywgaSkgPT4gKHtcclxuICAgICAgZGlzcGxheTogaSAqIHN0ZXAgKyBzdGFydCxcclxuICAgICAgdHJhbnNsYXRlWDogKHNpemUgLyAyIC0gMjApICogTWF0aC5jb3MoMiAqIE1hdGguUEkgKiAoaSAtIDIpIC8gY291bnQpLFxyXG4gICAgICB0cmFuc2xhdGVZOiAoc2l6ZSAvIDIgLSAyMCkgKiBNYXRoLnNpbigyICogTWF0aC5QSSAqIChpIC0gMikgLyBjb3VudCksXHJcbiAgICAgIGFsbG93ZWQ6IGlzQWxsb3dlZEZuID8gaXNBbGxvd2VkRm4oaSkgOiB0cnVlXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBnZXRQb2ludGVyQW5nbGUodmFsdWUsIG1vZGU6IENsb2NrVmlld1R5cGUpIHtcclxuICAgIGlmICh0aGlzLnZpZXdUeXBlID09PSAnaG91cnMnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09ICcxMmgnID8gMzYwIC8gMTIgKiAodmFsdWUgLSAzKSA6IDM2MCAvIDEyICogKHZhbHVlICUgMTIgLSAzKTtcclxuICAgIH1cclxuICAgIHJldHVybiAzNjAgLyA2MCAqICh2YWx1ZSAtIDE1KTtcclxuICB9XHJcblxyXG4gIGdldFBvaW50ZXJWYWx1ZSh4LCB5LCBzaXplKSB7XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBsZXQgYW5nbGUgPSBNYXRoLmF0YW4yKHNpemUgLyAyIC0geCwgc2l6ZSAvIDIgLSB5KSAvIE1hdGguUEkgKiAxODA7XHJcbiAgICBpZiAoYW5nbGUgPCAwKSB7XHJcbiAgICAgIGFuZ2xlID0gMzYwICsgYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudmlld1R5cGUgPT09ICdob3VycycpIHtcclxuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJzEyaCcpIHtcclxuICAgICAgICB2YWx1ZSA9IDEyIC0gTWF0aC5yb3VuZChhbmdsZSAqIDEyIC8gMzYwKTtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IDAgPyAxMiA6IHZhbHVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYWRpdXMgPSBNYXRoLnNxcnQoTWF0aC5wb3coc2l6ZSAvIDIgLSB4LCAyKSArIE1hdGgucG93KHNpemUgLyAyIC0geSwgMikpO1xyXG4gICAgICB2YWx1ZSA9IDEyIC0gTWF0aC5yb3VuZChhbmdsZSAqIDEyIC8gMzYwKTtcclxuICAgICAgaWYgKHZhbHVlID09PSAwKSB7IHZhbHVlID0gMTI7IH1cclxuICAgICAgaWYgKHJhZGl1cyA8IHNpemUgLyAyIC0gMzIpIHsgdmFsdWUgPSB2YWx1ZSA9PT0gMTIgPyAwIDogdmFsdWUgKyAxMjsgfVxyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlID0gTWF0aC5yb3VuZCg2MCAtIDYwICogYW5nbGUgLyAzNjApO1xyXG4gICAgcmV0dXJuIHZhbHVlID09PSA2MCA/IDAgOiB2YWx1ZTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cInJvb3RcIj5cclxuICA8ZGl2IGNsYXNzPVwiY2lyY2xlXCIgKHRvdWNobW92ZSk9XCJoYW5kbGVUb3VjaE1vdmUoJGV2ZW50KVwiIChtb3VzZW1vdmUpPVwiaGFuZGxlTW91c2VNb3ZlKCRldmVudClcIlxyXG4gICAgKHRvdWNoc3RhcnQpPVwiZGlzYWJsZUFuaW1hdGVkUG9pbnRlcigpXCIgKG1vdXNlZG93bik9XCJkaXNhYmxlQW5pbWF0ZWRQb2ludGVyKClcIiAodG91Y2hlbmQpPVwiaGFuZGxlVG91Y2hFbmQoJGV2ZW50KVwiXHJcbiAgICAobW91c2V1cCk9XCJlbmFibGVBbmltYXRlZFBvaW50ZXIoKVwiIChjbGljayk9XCJoYW5kbGVDbGljaygkZXZlbnQpXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicG9pbnRlci1jb250YWluZXJcIlxyXG4gICAgICBbbmdDbGFzc109XCJ7ICdzbWFsbC1wb2ludGVyJzogbW9kZSA9PT0gJzI0aCcgJiYgdmlld1R5cGUgPT09ICdob3VycycgJiYgKGZvcm1hdHRlZFZhbHVlID09PSAwIHx8IGZvcm1hdHRlZFZhbHVlID4gMTIpLCAnYW5pbWF0ZWQtcG9pbnRlcic6ICF0b3VjaGluZyB9XCJcclxuICAgICAgW3N0eWxlLnRyYW5zZm9ybV09XCIncm90YXRlKCcgKyBhbmdsZSArICdkZWcpJ1wiPlxyXG4gICAgICA8YnV0dG9uIG1hdC1taW5pLWZhYiBbY29sb3JdPVwiY29sb3JcIiBjbGFzcz1cImlubmVyLWRvdFwiPjwvYnV0dG9uPlxyXG4gICAgICA8bWF0LXRvb2xiYXIgW2NvbG9yXT1cImNvbG9yXCIgY2xhc3M9XCJwb2ludGVyXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBtYXQtbWluaS1mYWIgW2NvbG9yXT1cImNvbG9yXCIgY2xhc3M9XCJvdXRlci1kb3RcIlxyXG4gICAgICAgICAgW25nQ2xhc3NdPVwiIHsgJ291dGVyLWRvdC1vZGQnOiB2aWV3VHlwZSA9PT0gJ21pbnV0ZXMnICYmIGZvcm1hdHRlZFZhbHVlICUgNSAhPT0gMCB9XCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidmlld1R5cGUgPT09ICdtaW51dGVzJyAmJiBmb3JtYXR0ZWRWYWx1ZSAlIDUgIT09IDBcIj7CtzwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L21hdC10b29sYmFyPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBkaWdpdCBvZiBtaW51dGVEb3RzO1wiPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwibnVtYmVyIG1pbnV0ZS1kb3RcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgJ3NlbGVjdGVkJzogZm9ybWF0dGVkVmFsdWUgPT09IGRpZ2l0LmRpc3BsYXkgfHwgKGRpZ2l0LmRpc3BsYXkgPT09IDAgJiYgZm9ybWF0dGVkVmFsdWUgPT09IDApLCAnZGlzYWJsZWQnOiAhaXNBdmFpbGFibGUoZGlnaXQuZGlzcGxheSA9PT0gNjAgPyAwIDogZGlnaXQuZGlzcGxheSl9XCJcclxuICAgICAgICBbc3R5bGUudHJhbnNmb3JtXT1cIid0cmFuc2xhdGUoJyArIGRpZ2l0LnRyYW5zbGF0ZVggKyAncHgsICcgKyBkaWdpdC50cmFuc2xhdGVZICsgJ3B4KSdcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlnaXQuZGlzcGxheSAlIDUgIT09IDBcIj7CtzwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZGlnaXQgb2YgbnVtYmVycztcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cIm51bWJlclwiXHJcbiAgICAgICAgW25nQ2xhc3NdPVwieyAnc2VsZWN0ZWQnOiBmb3JtYXR0ZWRWYWx1ZSA9PT0gZGlnaXQuZGlzcGxheSB8fCAoZGlnaXQuZGlzcGxheSA9PT0gNjAgJiYgZm9ybWF0dGVkVmFsdWUgPT09IDApLCAnZGlzYWJsZWQnOiAhaXNBdmFpbGFibGUoZGlnaXQuZGlzcGxheSA9PT0gNjAgPyAwIDogZGlnaXQuZGlzcGxheSl9XCJcclxuICAgICAgICBbc3R5bGUudHJhbnNmb3JtXT1cIid0cmFuc2xhdGUoJyArIGRpZ2l0LnRyYW5zbGF0ZVggKyAncHgsICcgKyBkaWdpdC50cmFuc2xhdGVZICsgJ3B4KSdcIj5cclxuICAgICAgICA8bmctdGVtcGxhdGUgI2hvdXJzVGVtcGxhdGU+e3sgZGlnaXQuZGlzcGxheSB9fTwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlICNtaW51dGVzVGVtcGxhdGU+e3sgZGlnaXQuZGlzcGxheSA9PT0gNjAgPyAnMDAnIDogZGlnaXQuZGlzcGxheSB9fTwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdUeXBlID09PSAnbWludXRlcycgdGhlbiBtaW51dGVzVGVtcGxhdGUgZWxzZSBob3Vyc1RlbXBsYXRlO1wiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGRpZ2l0IG9mIHNlY29uZGFyeU51bWJlcnM7XCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJudW1iZXIgc21hbGwtbnVtYmVyXCJcclxuICAgICAgICBbbmdDbGFzc109XCJ7ICdzZWxlY3RlZCc6IGZvcm1hdHRlZFZhbHVlID09PSBkaWdpdC5kaXNwbGF5IHx8IChkaWdpdC5kaXNwbGF5ID09PSAyNCAmJiBmb3JtYXR0ZWRWYWx1ZSA9PT0gMCksICdkaXNhYmxlZCc6ICFpc0F2YWlsYWJsZShkaWdpdC5kaXNwbGF5ID09PSAyNCA/IDAgOiBkaWdpdC5kaXNwbGF5KX1cIlxyXG4gICAgICAgIFtzdHlsZS50cmFuc2Zvcm1dPVwiJ3RyYW5zbGF0ZSgnICsgZGlnaXQudHJhbnNsYXRlWCArICdweCwgJyArIGRpZ2l0LnRyYW5zbGF0ZVkgKyAncHgpJ1wiPlxyXG4gICAgICAgIHt7IGRpZ2l0LmRpc3BsYXkgPT09IDI0ID8gJzAwJyA6IGRpZ2l0LmRpc3BsYXkgfX1cclxuICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgPC9kaXY+Il19