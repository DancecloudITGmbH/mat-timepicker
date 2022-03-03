import { Directive, EventEmitter, Input, Optional, HostBinding, Self, Output, HostListener } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { twoDigits, convertHoursForMode, isAllowed, isDateInRange, isTimeInRange } from './util';
import { MatTimepickerComponentDialogComponent } from './timepicker-dialog/timepicker-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/cdk/a11y";
import * as i4 from "@angular/cdk/platform";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/core";
export class MatTimepickerDirective {
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
MatTimepickerDirective.ɵfac = function MatTimepickerDirective_Factory(t) { return new (t || MatTimepickerDirective)(i0.ɵɵdirectiveInject(i1.NgControl, 10), i0.ɵɵdirectiveInject(i2.MatDialog), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i3.FocusMonitor), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i4.Platform), i0.ɵɵdirectiveInject(i1.NgForm, 8), i0.ɵɵdirectiveInject(i5.MatFormField, 8), i0.ɵɵdirectiveInject(i1.FormGroupDirective, 8), i0.ɵɵdirectiveInject(i6.ErrorStateMatcher)); };
MatTimepickerDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: MatTimepickerDirective, selectors: [["input", "matTimepicker", ""]], hostAttrs: [1, "mat-input-element", "mat-form-field-autofill-control"], hostVars: 12, hostBindings: function MatTimepickerDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("input", function MatTimepickerDirective_input_HostBindingHandler() { return ctx.inputHandler(); })("keydown", function MatTimepickerDirective_keydown_HostBindingHandler($event) { return ctx.keydownHandler($event); })("keyup", function MatTimepickerDirective_keyup_HostBindingHandler($event) { return ctx.keyupHandler($event); })("focus", function MatTimepickerDirective_focus_HostBindingHandler() { return ctx.focusHandler(); })("focusout", function MatTimepickerDirective_focusout_HostBindingHandler() { return ctx.focusoutHandler(); });
    } if (rf & 2) {
        i0.ɵɵhostProperty("disabled", ctx.disabled)("required", ctx.required);
        i0.ɵɵattribute("id", ctx.id)("placeholder", ctx.placeholder)("readonly", ctx.readonly || null)("aria-invalid", ctx.errorState)("aria-required", ctx.required.toString())("aria-describedby", ctx.describedBy);
        i0.ɵɵclassProp("mat-input-server", ctx._isServer)("floating", ctx.shouldLabelFloat);
    } }, inputs: { disabled: "disabled", id: "id", readonly: "readonly", errorStateMatcher: "errorStateMatcher", required: "required", placeholder: "placeholder", okButtonTemplate: "okButtonTemplate", cancelButtonTemplate: "cancelButtonTemplate", okLabel: "okLabel", cancelLabel: "cancelLabel", anteMeridiemAbbreviation: "anteMeridiemAbbreviation", postMeridiemAbbreviation: "postMeridiemAbbreviation", mode: "mode", color: "color", disableDialogOpenOnClick: "disableDialogOpenOnClick", strict: "strict", minDate: "minDate", maxDate: "maxDate", value: "value" }, outputs: { timeChange: "timeChange", invalidInput: "invalidInput" }, exportAs: ["matTimepicker"], features: [i0.ɵɵProvidersFeature([
            { provide: MatFormFieldControl, useExisting: MatTimepickerDirective }
        ]), i0.ɵɵNgOnChangesFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatTimepickerDirective, [{
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
    }], function () { return [{ type: i1.NgControl, decorators: [{
                type: Optional
            }, {
                type: Self
            }] }, { type: i2.MatDialog }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i3.FocusMonitor }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i4.Platform }, { type: i1.NgForm, decorators: [{
                type: Optional
            }] }, { type: i5.MatFormField, decorators: [{
                type: Optional
            }] }, { type: i1.FormGroupDirective, decorators: [{
                type: Optional
            }] }, { type: i6.ErrorStateMatcher }]; }, { disabled: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXQtdGltZXBpY2tlci9zcmMvbGliL3RpbWVwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFNTCxRQUFRLEVBR1IsV0FBVyxFQUNYLElBQUksRUFDSixNQUFNLEVBQ04sWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBZ0IsTUFBTSw4QkFBOEIsQ0FBQztBQUVqRixPQUFPLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7QUFtQzlELE1BQU0sT0FBTyxzQkFBc0I7SUFzUmpDLFlBQzZCLFNBQW9CLEVBQ3hDLE1BQWlCLEVBQ2hCLFFBQW1CLEVBQ25CLElBQVksRUFDWixFQUFnQixFQUNoQixLQUE4QixFQUM5QixNQUFjO0lBQ3RCLDJHQUEyRztJQUNqRyxTQUFtQjtJQUM3QiwyR0FBMkc7SUFDdkYsV0FBbUI7SUFDdkMsMkdBQTJHO0lBQ3ZGLGFBQTJCO0lBQy9DLDJHQUEyRztJQUN2RixnQkFBb0M7SUFDeEQsOEdBQThHO0lBQzlHLHlCQUE0QztRQWhCakIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLGFBQVEs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UUFBUTs7c0JBRVIsUUFBUTt3REF0UVAsUUFBUTtrQkFEWCxLQUFLO1lBb0JPLEVBQUU7a0JBQWQsS0FBSztZQUtPLFFBQVE7a0JBQXBCLEtBQUs7WUFVNkIsZ0JBQWdCO2tCQUFsRCxXQUFXO21CQUFDLGdCQUFnQjtZQUNTLFdBQVc7a0JBQWhELFdBQVc7bUJBQUMsdUJBQXVCO1lBRTNCLGlCQUFpQjtrQkFBekIsS0FBSztZQUVPLFFBQVE7a0JBQXBCLEtBQUs7WUFXTyxXQUFXO2tCQUF2QixLQUFLO1lBbUJHLGdCQUFnQjtrQkFBeEIsS0FBSztZQUVHLG9CQUFvQjtrQkFBNUIsS0FBSztZQUdHLE9BQU87a0JBQWYsS0FBSztZQUVHLFdBQVc7a0JBQW5CLEtBQUs7WUFFRyx3QkFBd0I7a0JBQWhDLEtBQUs7WUFFRyx3QkFBd0I7a0JBQWhDLEtBQUs7WUFHRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyx3QkFBd0I7a0JBQWhDLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFNRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFZTyxLQUFLO2tCQUFqQixLQUFLO1lBeUNJLFVBQVU7a0JBQW5CLE1BQU07WUFDRyxZQUFZO2tCQUFyQixNQUFNO1lBRWdCLFlBQVk7a0JBQWxDLFlBQVk7bUJBQUMsT0FBTztZQXNFZ0IsY0FBYztrQkFBbEQsWUFBWTttQkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFjQSxZQUFZO2tCQUE5QyxZQUFZO21CQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUlWLFlBQVk7a0JBQWxDLFlBQVk7bUJBQUMsT0FBTztZQUlLLGVBQWU7a0JBQXhDLFlBQVk7bUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0Zvcm0sIE5nQ29udHJvbCwgRm9ybUdyb3VwRGlyZWN0aXZlLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgT25Jbml0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBFbGVtZW50UmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBSZW5kZXJlcjIsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBOZ1pvbmUsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgU2VsZixcclxuICBPdXRwdXQsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkQ29udHJvbCwgTWF0Rm9ybUZpZWxkIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XHJcbmltcG9ydCB7IENsb2NrTW9kZSwgSUFsbG93ZWQyNEhvdXJNYXAsIElBbGxvd2VkMTJIb3VyTWFwIH0gZnJvbSAnLi9pbnRlcmZhY2VzLWFuZC10eXBlcyc7XHJcbmltcG9ydCB7IHR3b0RpZ2l0cywgY29udmVydEhvdXJzRm9yTW9kZSwgaXNBbGxvd2VkLCBpc0RhdGVJblJhbmdlLCBpc1RpbWVJblJhbmdlIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IHsgTWF0VGltZXBpY2tlckNvbXBvbmVudERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vdGltZXBpY2tlci1kaWFsb2cvdGltZXBpY2tlci1kaWFsb2cuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwsIGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XHJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7IEVycm9yU3RhdGVNYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWF0VGltZXBpY2tlckJ1dHRvblRlbXBsYXRlQ29udGV4dCB7XHJcbiAgJGltcGxpY2l0OiAoKSA9PiB2b2lkO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdpbnB1dFttYXRUaW1lcGlja2VyXScsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IE1hdEZvcm1GaWVsZENvbnRyb2wsIHVzZUV4aXN0aW5nOiBNYXRUaW1lcGlja2VyRGlyZWN0aXZlIH1cclxuICBdLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHtcclxuICAgIC8qKlxyXG4gICAgICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMCByZW1vdmUgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2wgaW4gZmF2b3Igb2YgQXV0b2ZpbGxNb25pdG9yLlxyXG4gICAgICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcXVvdGUtcHJvcHNcclxuICAgICdjbGFzcyc6ICdtYXQtaW5wdXQtZWxlbWVudCBtYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sJyxcclxuICAgICdbY2xhc3MubWF0LWlucHV0LXNlcnZlcl0nOiAnX2lzU2VydmVyJyxcclxuICAgIC8vIE5hdGl2ZSBpbnB1dCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG92ZXJ3cml0dGVuIGJ5IEFuZ3VsYXIgaW5wdXRzIG5lZWQgdG8gYmUgc3luY2VkIHdpdGhcclxuICAgIC8vIHRoZSBuYXRpdmUgaW5wdXQgZWxlbWVudC4gT3RoZXJ3aXNlIHByb3BlcnR5IGJpbmRpbmdzIGZvciB0aG9zZSBkb24ndCB3b3JrLlxyXG4gICAgJ1thdHRyLmlkXSc6ICdpZCcsXHJcbiAgICAnW2F0dHIucGxhY2Vob2xkZXJdJzogJ3BsYWNlaG9sZGVyJyxcclxuICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICdbcmVxdWlyZWRdJzogJ3JlcXVpcmVkJyxcclxuICAgICdbYXR0ci5yZWFkb25seV0nOiAncmVhZG9ubHkgfHwgbnVsbCcsXHJcbiAgICAnW2F0dHIuYXJpYS1pbnZhbGlkXSc6ICdlcnJvclN0YXRlJyxcclxuICAgICdbYXR0ci5hcmlhLXJlcXVpcmVkXSc6ICdyZXF1aXJlZC50b1N0cmluZygpJyxcclxuICB9LFxyXG4gIGV4cG9ydEFzOiAnbWF0VGltZXBpY2tlcidcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdFRpbWVwaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50c1xyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgTWF0Rm9ybUZpZWxkQ29udHJvbDxhbnk+XHJcbntcclxuICBzdGF0aWMgbmV4dElkID0gMDtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBiZWluZyByZW5kZXJlZCBvbiB0aGUgc2VydmVyLiAqL1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcmVhZG9ubHkgX2lzU2VydmVyOiBib29sZWFuO1xyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gIF9lcnJvclN0YXRlID0gZmFsc2U7XHJcbiAgZ2V0IGVycm9yU3RhdGUoKSB7XHJcbiAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuX2Vycm9yU3RhdGU7XHJcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLl9wYXJlbnRGb3JtR3JvdXAgfHwgdGhpcy5fcGFyZW50Rm9ybTtcclxuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLm5nQ29udHJvbCA/IHRoaXMubmdDb250cm9sLmNvbnRyb2wgYXMgRm9ybUNvbnRyb2wgOiBudWxsO1xyXG4gICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmVycm9yU3RhdGVNYXRjaGVyID8gdGhpcy5lcnJvclN0YXRlTWF0Y2hlci5pc0Vycm9yU3RhdGUoY29udHJvbCwgcGFyZW50KSA6IG9sZFN0YXRlO1xyXG5cclxuICAgIGlmIChuZXdTdGF0ZSAhPT0gb2xkU3RhdGUpIHtcclxuICAgICAgdGhpcy5fZXJyb3JTdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ld1N0YXRlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgJiYgdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubmdDb250cm9sLmRpc2FibGVkO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuXHJcbiAgICAvLyBCcm93c2VycyBtYXkgbm90IGZpcmUgdGhlIGJsdXIgZXZlbnQgaWYgdGhlIGlucHV0IGlzIGRpc2FibGVkIHRvbyBxdWlja2x5LlxyXG4gICAgLy8gUmVzZXQgZnJvbSBoZXJlIHRvIGVuc3VyZSB0aGF0IHRoZSBlbGVtZW50IGRvZXNuJ3QgYmVjb21lIHN0dWNrLlxyXG4gICAgaWYgKHRoaXMuZm9jdXNlZCkge1xyXG4gICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gIHByb3RlY3RlZCBfZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nKSB7IHRoaXMuX2lkID0gdmFsdWUgfHwgdGhpcy5fdWlkOyB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICBwcm90ZWN0ZWQgX2lkOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGdldCByZWFkb25seSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlYWRvbmx5OyB9XHJcbiAgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcHJpdmF0ZSBfcmVhZG9ubHkgPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBpc0FsaXZlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICBwcm90ZWN0ZWQgX3VpZCA9IGBtYXQtdGltZS1waWNrZXItJHtNYXRUaW1lcGlja2VyRGlyZWN0aXZlLm5leHRJZCsrfWA7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mbG9hdGluZycpIGdldCBzaG91bGRMYWJlbEZsb2F0KCkgeyByZXR1cm4gdGhpcy5mb2N1c2VkIHx8ICF0aGlzLmVtcHR5OyB9XHJcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGVzY3JpYmVkYnknKSBkZXNjcmliZWRCeSA9ICcnO1xyXG5cclxuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XHJcblxyXG4gIEBJbnB1dCgpIGdldCByZXF1aXJlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcclxuICB9XHJcblxyXG4gIHNldCByZXF1aXJlZChyZXEpIHtcclxuICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlcSk7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgfVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcHJpdmF0ZSBfcmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KCkgZ2V0IHBsYWNlaG9sZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xyXG4gIH1cclxuICBzZXQgcGxhY2Vob2xkZXIocGxoKSB7XHJcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHBsaDtcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICBwcml2YXRlIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICBmb2N1c2VkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBwYXR0ZXJuOiBSZWdFeHA7XHJcblxyXG4gIHByaXZhdGUgYWxsb3dlZDI0SG91ck1hcDogSUFsbG93ZWQyNEhvdXJNYXAgPSBudWxsO1xyXG4gIHByaXZhdGUgYWxsb3dlZDEySG91ck1hcDogSUFsbG93ZWQxMkhvdXJNYXAgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGlzSW5wdXRGb2N1c2VkID0gZmFsc2U7XHJcblxyXG4gIC8qIFVzZSBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIG9rIGJ1dHRvbiAqL1xyXG4gIEBJbnB1dCgpIG9rQnV0dG9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPE1hdFRpbWVwaWNrZXJCdXR0b25UZW1wbGF0ZUNvbnRleHQ+IHwgbnVsbCA9IG51bGw7XHJcbiAgLyogVXNlIGEgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgY2FuY2VsIGJ1dHRvbiAqL1xyXG4gIEBJbnB1dCgpIGNhbmNlbEJ1dHRvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxNYXRUaW1lcGlja2VyQnV0dG9uVGVtcGxhdGVDb250ZXh0PiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKiogT3ZlcnJpZGUgdGhlIGxhYmVsIG9mIHRoZSBvayBidXR0b24uICovXHJcbiAgQElucHV0KCkgb2tMYWJlbCA9ICdPayc7XHJcbiAgLyoqIE92ZXJyaWRlIHRoZSBsYWJlbCBvZiB0aGUgY2FuY2VsIGJ1dHRvbi4gKi9cclxuICBASW5wdXQoKSBjYW5jZWxMYWJlbCA9ICdDYW5jZWwnO1xyXG4gIC8qKiBPdmVycmlkZSB0aGUgYW50ZSBtZXJpZGllbSBhYmJyZXZpYXRpb24uICovXHJcbiAgQElucHV0KCkgYW50ZU1lcmlkaWVtQWJicmV2aWF0aW9uID0gJ2FtJztcclxuICAvKiogT3ZlcnJpZGUgdGhlIHBvc3QgbWVyaWRpZW0gYWJicmV2aWF0aW9uLiAqL1xyXG4gIEBJbnB1dCgpIHBvc3RNZXJpZGllbUFiYnJldmlhdGlvbiA9ICdwbSc7XHJcblxyXG4gIC8qKiBTZXRzIHRoZSBjbG9jayBtb2RlLCAxMi1ob3VyIG9yIDI0LWhvdXIgY2xvY2tzIGFyZSBzdXBwb3J0ZWQuICovXHJcbiAgQElucHV0KCkgbW9kZTogQ2xvY2tNb2RlID0gJzI0aCc7XHJcbiAgQElucHV0KCkgY29sb3IgPSAncHJpbWFyeSc7XHJcbiAgQElucHV0KCkgZGlzYWJsZURpYWxvZ09wZW5PbkNsaWNrID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc3RyaWN0ID0gdHJ1ZTtcclxuXHJcbiAgY29udHJvbFR5cGUgPSAnYW5ndWxhci1tYXRlcmlhbC10aW1lcGlja2VyJztcclxuXHJcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6ICgoKSA9PiB2b2lkKVtdID0gW107XHJcblxyXG4gIEBJbnB1dCgpIG1pbkRhdGU6IERhdGU7XHJcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZTtcclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICBwcml2YXRlIF9pc1BtOiBib29sZWFuO1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcHJpdmF0ZSBfdmFsdWU6IERhdGU7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICBwcml2YXRlIF9mb3JtYXR0ZWRWYWx1ZVN0cmluZzogc3RyaW5nO1xyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gIHByaXZhdGUgX3NraXBWYWx1ZUNoYW5nZUVtaXNzaW9uID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KCkgc2V0IHZhbHVlKHZhbHVlOiBEYXRlKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHRoaXMuX3ZhbHVlKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgdGhpcy5fZm9ybWF0dGVkVmFsdWVTdHJpbmcgPSBudWxsO1xyXG4gICAgICB0aGlzLnNldElucHV0RWxlbWVudFZhbHVlKCcnKTtcclxuICAgICAgdGhpcy5jdXJyZW50VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgaG91ciwgaXNQbSB9ID0gY29udmVydEhvdXJzRm9yTW9kZSh2YWx1ZS5nZXRIb3VycygpLCB0aGlzLm1vZGUpO1xyXG4gICAgdGhpcy5faXNQbSA9IGlzUG07XHJcbiAgICB0aGlzLl9mb3JtYXR0ZWRWYWx1ZVN0cmluZyA9IHRoaXMubW9kZSA9PT0gJzEyaCcgP1xyXG4gICAgICBgJHtob3VyfToke3R3b0RpZ2l0cyh2YWx1ZS5nZXRNaW51dGVzKCkpfSAke2lzUG0gPyB0aGlzLnBvc3RNZXJpZGllbUFiYnJldmlhdGlvbiA6IHRoaXMuYW50ZU1lcmlkaWVtQWJicmV2aWF0aW9ufWAgOlxyXG4gICAgICBgJHt0d29EaWdpdHModmFsdWUuZ2V0SG91cnMoKSl9OiR7dHdvRGlnaXRzKHZhbHVlLmdldE1pbnV0ZXMoKSl9YDtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNJbnB1dEZvY3VzZWQpIHsgdGhpcy5zZXRJbnB1dEVsZW1lbnRWYWx1ZSh0aGlzLmZvcm1hdHRlZFZhbHVlU3RyaW5nKTsgfVxyXG4gICAgdGhpcy5jdXJyZW50VmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5fc2tpcFZhbHVlQ2hhbmdlRW1pc3Npb24pIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnRpbWVDaGFuZ2UuZW1pdCh0aGlzLmN1cnJlbnRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxyXG5cclxuICBnZXQgaXNQbSgpIHsgcmV0dXJuIHRoaXMuX2lzUG07IH1cclxuXHJcbiAgZ2V0IGVtcHR5KCkge1xyXG4gICAgcmV0dXJuICEodGhpcy5jdXJyZW50VmFsdWUgaW5zdGFuY2VvZiBEYXRlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IGZvcm1hdHRlZFZhbHVlU3RyaW5nKCkgeyByZXR1cm4gdGhpcy5fZm9ybWF0dGVkVmFsdWVTdHJpbmc7IH1cclxuXHJcbiAgcHJpdmF0ZSBjdXJyZW50VmFsdWU6IERhdGU7XHJcbiAgcHJpdmF0ZSBtb2RhbFJlZjogTWF0RGlhbG9nUmVmPE1hdFRpbWVwaWNrZXJDb21wb25lbnREaWFsb2dDb21wb25lbnQ+O1xyXG5cclxuICBwcml2YXRlIG9uQ2hhbmdlRm46IGFueTtcclxuICBwcml2YXRlIG9uVG91Y2hlZEZuOiBhbnk7XHJcbiAgcHJpdmF0ZSBjb21iaW5hdGlvbjogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgQE91dHB1dCgpIHRpbWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIGludmFsaWRJbnB1dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnKSBpbnB1dEhhbmRsZXIoKSB7XHJcbiAgICBsZXQgdmFsdWUgPSAodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50IGFzIGFueSkudmFsdWUgYXMgc3RyaW5nO1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xyXG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLndyaXRlVmFsdWUobnVsbCwgdHJ1ZSk7XHJcbiAgICAgIGlmICh0aGlzLm9uQ2hhbmdlRm4pIHsgdGhpcy5vbkNoYW5nZUZuKG51bGwpOyB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtZXJpZGllbVJlc3VsdCA9IHZhbHVlLm1hdGNoKC9hbXxwbS9pKTtcclxuICAgIGxldCBtZXJpZGllbTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcbiAgICBpZiAobWVyaWRpZW1SZXN1bHQpIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKG1lcmlkaWVtUmVzdWx0WzBdLCAnJyk7XHJcbiAgICAgIFttZXJpZGllbV0gPSBtZXJpZGllbVJlc3VsdDtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbHVlSGFzQ29sdW1uID0gdmFsdWUuaW5jbHVkZXMoJzonKTtcclxuICAgIGxldCBbaG91cnMsIG1pbnV0ZXNdOiBhbnkgPSBsZW5ndGggPT09IDEgPyBbdmFsdWUsIDBdIDpcclxuICAgICAgbGVuZ3RoID09PSAyICYmICF2YWx1ZUhhc0NvbHVtbiA/IFt2YWx1ZSwgMF0gOiB2YWx1ZUhhc0NvbHVtbiA/IHZhbHVlLnNwbGl0KCc6JykgOiB2YWx1ZS5zcGxpdCgvKFxcZFxcZCkvKS5maWx0ZXIodiA9PiB2KTtcclxuXHJcbiAgICBob3VycyA9ICtob3VycztcclxuXHJcbiAgICBpZiAoL1xccy8udGVzdChtaW51dGVzKSkge1xyXG4gICAgICBsZXQgb3RoZXI7XHJcbiAgICAgIFttaW51dGVzLCBvdGhlcl0gPSBtaW51dGVzLnNwbGl0KC9cXHMvKTtcclxuICAgICAgaWYgKG90aGVyID09PSAncG0nICYmICFpc05hTihob3VycykgJiYgaG91cnMgPCAxMikgeyBob3VycyArPSAxMjsgfVxyXG4gICAgfVxyXG5cclxuICAgIG1pbnV0ZXMgPSArbWludXRlcztcclxuXHJcbiAgICBpZiAoaXNOYU4oaG91cnMpIHx8IGlzTmFOKG1pbnV0ZXMpKSB7XHJcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShudWxsLCB0cnVlKTsgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChob3VycyA8IDEyICYmIG1lcmlkaWVtICYmIG1lcmlkaWVtLnRvTG93ZXJDYXNlKCkgPT09ICdwbScpIHtcclxuICAgICAgaG91cnMgKz0gMTI7XHJcbiAgICB9IGVsc2UgaWYgKGhvdXJzID49IDEyICYmIG1lcmlkaWVtICYmIG1lcmlkaWVtLnRvTG93ZXJDYXNlKCkgPT09ICdhbScpIHtcclxuICAgICAgaG91cnMgLT0gMTI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJzEyaCcgJiYgK2hvdXJzIDwgMCkge1xyXG4gICAgICBob3VycyA9ICcwJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICgraG91cnMgPiAyNCkge1xyXG4gICAgICAgIGhvdXJzID0gJzI0JztcclxuICAgICAgfSBlbHNlIGlmICgraG91cnMgPCAwKSB7XHJcbiAgICAgICAgaG91cnMgPSAnMCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKCttaW51dGVzID4gNTkpIHtcclxuICAgICAgbWludXRlcyA9ICc1OSc7XHJcbiAgICB9IGVsc2UgaWYgKCttaW51dGVzIDwgMCkge1xyXG4gICAgICBtaW51dGVzID0gJzAnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGQgPSB0aGlzLnZhbHVlID8gbmV3IERhdGUodGhpcy52YWx1ZS5nZXRUaW1lKCkpIDogbmV3IERhdGUoKTtcclxuICAgIGQuc2V0SG91cnMoK2hvdXJzKTtcclxuICAgIGQuc2V0TWludXRlcygrbWludXRlcyk7XHJcbiAgICBkLnNldFNlY29uZHMoMCk7XHJcbiAgICBkLnNldE1pbGxpc2Vjb25kcygwKTtcclxuXHJcbiAgICBjb25zdCBpc1ZhbHVlSW5SYW5nZSA9IGlzRGF0ZUluUmFuZ2UodGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIGQpO1xyXG4gICAgaWYgKCFpc1ZhbHVlSW5SYW5nZSkgeyB0aGlzLmludmFsaWRJbnB1dC5lbWl0KCk7IH1cclxuXHJcblxyXG4gICAgdGhpcy53cml0ZVZhbHVlKGQsIHRydWUpO1xyXG4gICAgaWYgKHRoaXMub25DaGFuZ2VGbikgeyB0aGlzLm9uQ2hhbmdlRm4oZCk7IH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBrZXlkb3duSGFuZGxlcihldmVudDogYW55KSB7XHJcbiAgICBpZiAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LmFsdEtleSkge1xyXG4gICAgICB0aGlzLmNvbWJpbmF0aW9uID0gdGhpcy5jb21iaW5hdGlvbi5jb25jYXQoZXZlbnQuY29kZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghL15bMC05YS16QS1aXFxzXXswLDF9JC8udGVzdChldmVudC5rZXkpKSB7IHJldHVybjsgfVxyXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgY29uc3QgdFZhbHVlID0gdGFyZ2V0LnZhbHVlO1xyXG4gICAgY29uc3QgdmFsdWUgPSBgJHt0VmFsdWUuc2xpY2UoMCwgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0KX0ke2V2ZW50LmtleX0ke3RWYWx1ZS5zbGljZSh0YXJnZXQuc2VsZWN0aW9uRW5kKX1gO1xyXG4gICAgaWYgKHZhbHVlLm1hdGNoKHRoaXMucGF0dGVybikgfHwgdGhpcy5jb21iaW5hdGlvbi5sZW5ndGggPiAwKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcsIFsnJGV2ZW50J10pIGtleXVwSGFuZGxlcihldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmNvbWJpbmF0aW9uID0gdGhpcy5jb21iaW5hdGlvbi5maWx0ZXIodiA9PiB2ICE9PSBldmVudC5jb2RlKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJykgZm9jdXNIYW5kbGVyKCkge1xyXG4gICAgdGhpcy5pc0lucHV0Rm9jdXNlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcpIGZvY3Vzb3V0SGFuZGxlcigpIHtcclxuICAgIHRoaXMuaXNJbnB1dEZvY3VzZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0SW5wdXRFbGVtZW50VmFsdWUodGhpcy5mb3JtYXR0ZWRWYWx1ZVN0cmluZyk7XHJcbiAgICBpZiAodGhpcy5vblRvdWNoZWRGbiAmJiAhdGhpcy5tb2RhbFJlZikgeyB0aGlzLm9uVG91Y2hlZEZuKCk7IH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXHJcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgZm06IEZvY3VzTW9uaXRvcixcclxuICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgICBwcm90ZWN0ZWQgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfbWF0Rm9ybUZpbGVkOiBNYXRGb3JtRmllbGQsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfcGFyZW50Rm9ybUdyb3VwOiBGb3JtR3JvdXBEaXJlY3RpdmUsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLCBuby11bmRlcnNjb3JlLWRhbmdsZSwgaWQtYmxhY2tsaXN0LCBpZC1tYXRjaFxyXG4gICAgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXIsXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gdGhpcy5pZDtcclxuXHJcbiAgICB0aGlzLmVycm9yU3RhdGVNYXRjaGVyID0gX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcjtcclxuICAgIGlmICh0aGlzLm5nQ29udHJvbCAhPSBudWxsKSB7IHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzOyB9XHJcblxyXG4gICAgaWYgKF9wbGF0Zm9ybS5JT1MpIHtcclxuICAgICAgbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICBlbFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgIGlmICghZWwudmFsdWUgJiYgIWVsLnNlbGVjdGlvblN0YXJ0ICYmICFlbC5zZWxlY3Rpb25FbmQpIHtcclxuICAgICAgICAgICAgLy8gTm90ZTogSnVzdCBzZXR0aW5nIGAwLCAwYCBkb2Vzbid0IGZpeCB0aGUgaXNzdWUuIFNldHRpbmdcclxuICAgICAgICAgICAgLy8gYDEsIDFgIGZpeGVzIGl0IGZvciB0aGUgZmlyc3QgdGltZSB0aGF0IHlvdSB0eXBlIHRleHQgYW5kXHJcbiAgICAgICAgICAgIC8vIHRoZW4gaG9sZCBkZWxldGUuIFRvZ2dsaW5nIHRvIGAxLCAxYCBhbmQgdGhlbiBiYWNrIHRvXHJcbiAgICAgICAgICAgIC8vIGAwLCAwYCBzZWVtcyB0byBjb21wbGV0ZWx5IGZpeCBpdC5cclxuICAgICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2UoMSwgMSk7XHJcbiAgICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKDAsIDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pc1NlcnZlciA9ICF0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXI7XHJcbiAgfVxyXG5cclxuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XHJcbiAgICB0aGlzLmRlc2NyaWJlZEJ5ID0gaWRzLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIG9uQ29udGFpbmVyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2lucHV0Jykge1xyXG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldElucHV0RWxlbWVudFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7IHZhbHVlID0gJyc7IH1cclxuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmN1cnJlbnRWYWx1ZSA9PT0gbnVsbCB8fCB0aGlzLmN1cnJlbnRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgY29uc3QgaXNWYWx1ZUluUmFuZ2UgPSB0aGlzLnN0cmljdCA/XHJcbiAgICAgIGlzRGF0ZUluUmFuZ2UodGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIHRoaXMuY3VycmVudFZhbHVlKSA6XHJcbiAgICAgIGlzVGltZUluUmFuZ2UodGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIHRoaXMuY3VycmVudFZhbHVlKTtcclxuXHJcbiAgICByZXR1cm4gaXNWYWx1ZUluUmFuZ2UgPyBudWxsIDogeyBkYXRlUmFuZ2U6IHRydWUgfTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2goXHJcbiAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKFxyXG4gICAgICAgIHRoaXMuX21hdEZvcm1GaWxlZCA/IHRoaXMuX21hdEZvcm1GaWxlZC5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IDogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgLCAnY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjbGlja0hhbmRsZXIgPSAoZTogRm9jdXNFdmVudCkgPT4ge1xyXG4gICAgaWYgKCh0aGlzLm1vZGFsUmVmICYmIHRoaXMubW9kYWxSZWYuY29tcG9uZW50SW5zdGFuY2UuaXNDbG9zaW5nKSB8fCB0aGlzLmRpc2FibGVkIHx8IHRoaXMuZGlzYWJsZURpYWxvZ09wZW5PbkNsaWNrKSB7IHJldHVybjsgfVxyXG4gICAgaWYgKCF0aGlzLm1vZGFsUmVmICYmICF0aGlzLmRpc2FibGVEaWFsb2dPcGVuT25DbGljaykgeyB0aGlzLnNob3dEaWFsb2coKTsgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyKSB7XHJcbiAgICAgIHRoaXMuZm0ubW9uaXRvcih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIHRydWUpLnN1YnNjcmliZShvcmlnaW4gPT4ge1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZCA9ICEhb3JpZ2luO1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhc01heERhdGUgPSAhIXRoaXMubWF4RGF0ZTtcclxuICAgIGNvbnN0IGhhc01pbkRhdGUgPSAhIXRoaXMubWluRGF0ZTtcclxuXHJcbiAgICBpZiAoaGFzTWluRGF0ZSB8fCBoYXNNYXhEYXRlKSB7XHJcbiAgICAgIGlmIChoYXNNaW5EYXRlKSB7IHRoaXMubWluRGF0ZS5zZXRTZWNvbmRzKDApOyB0aGlzLm1pbkRhdGUuc2V0TWlsbGlzZWNvbmRzKDApOyB9XHJcbiAgICAgIGlmIChoYXNNYXhEYXRlKSB7IHRoaXMubWF4RGF0ZS5zZXRTZWNvbmRzKDApOyB0aGlzLm1heERhdGUuc2V0TWlsbGlzZWNvbmRzKDApOyB9XHJcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5nZW5lcmF0ZUFsbG93ZWRNYXAoKSk7XHJcblxyXG4gICAgICBpZiAoISh0aGlzLm5nQ29udHJvbCBhcyBhbnkpLl9yYXdWYWxpZGF0b3JzLmZpbmQodiA9PiB2ID09PSB0aGlzKSkge1xyXG4gICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wuc2V0VmFsaWRhdG9ycygoKHRoaXMubmdDb250cm9sIGFzIGFueSkuX3Jhd1ZhbGlkYXRvcnMgYXMgYW55W10pLmNvbmNhdCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9za2lwVmFsdWVDaGFuZ2VFbWlzc2lvbiA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVBbGxvd2VkTWFwKCkge1xyXG4gICAgY29uc3QgaXNTdHJpY3RNb2RlID0gdGhpcy5zdHJpY3QgJiYgdGhpcy52YWx1ZSBpbnN0YW5jZW9mIERhdGU7XHJcbiAgICBpZiAodGhpcy5tb2RlID09PSAnMjRoJykge1xyXG4gICAgICB0aGlzLmFsbG93ZWQyNEhvdXJNYXAgPSB7fTtcclxuICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCAyNDsgaCsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCA2MDsgbSsrKSB7XHJcbiAgICAgICAgICBjb25zdCBob3VyTWFwID0gdGhpcy5hbGxvd2VkMjRIb3VyTWFwW2hdIHx8IHt9O1xyXG4gICAgICAgICAgaWYgKGlzU3RyaWN0TW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgY3VycmVudERhdGUuc2V0SG91cnMoaCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLnNldE1pbnV0ZXMobSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLnNldFNlY29uZHMoMCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcclxuICAgICAgICAgICAgaG91ck1hcFttXSA9IGlzRGF0ZUluUmFuZ2UodGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIGN1cnJlbnREYXRlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhvdXJNYXBbbV0gPSBpc0FsbG93ZWQoaCwgbSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsICcyNGgnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWxsb3dlZDI0SG91ck1hcFtoXSA9IGhvdXJNYXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFsbG93ZWQxMkhvdXJNYXAgPSB7IGFtOiB7fSwgcG06IHt9IH07XHJcbiAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgMjQ7IGgrKykge1xyXG4gICAgICAgIGNvbnN0IG1lcmlkaWVtID0gaCA8IDEyID8gJ2FtJyA6ICdwbSc7XHJcbiAgICAgICAgZm9yIChsZXQgbSA9IDA7IG0gPCA2MDsgbSsrKSB7XHJcbiAgICAgICAgICBjb25zdCBob3VyID0gKGggPiAxMiA/IGggLSAxMiA6IGggPT09IDAgPyAxMiA6IGgpO1xyXG4gICAgICAgICAgY29uc3QgaG91ck1hcCA9IHRoaXMuYWxsb3dlZDEySG91ck1hcFttZXJpZGllbV1baG91cl0gfHwge307XHJcbiAgICAgICAgICBpZiAoaXNTdHJpY3RNb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUodGhpcy52YWx1ZS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5zZXRIb3VycyhoKTtcclxuICAgICAgICAgICAgY3VycmVudERhdGUuc2V0TWludXRlcyhtKTtcclxuICAgICAgICAgICAgY3VycmVudERhdGUuc2V0U2Vjb25kcygwKTtcclxuICAgICAgICAgICAgY3VycmVudERhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xyXG4gICAgICAgICAgICBob3VyTWFwW21dID0gaXNEYXRlSW5SYW5nZSh0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSwgY3VycmVudERhdGUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaG91ck1hcFttXSA9IGlzQWxsb3dlZChoLCBtLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSwgJzI0aCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hbGxvd2VkMTJIb3VyTWFwW21lcmlkaWVtXVtob3VyXSA9IGhvdXJNYXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcblxyXG4gICAgdGhpcy5wYXR0ZXJuID0gdGhpcy5tb2RlID09PSAnMjRoJyA/IC9eWzAtOV17MSwyfTo/KFswLTldezEsMn0pPyQvIDogL15bMC05XXsxLDJ9Oj8oWzAtOV17MSwyfSk/XFxzPyhhfHApP20/JC87XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoc2ltcGxlQ2hhbmdlcy5taW5EYXRlICYmICFzaW1wbGVDaGFuZ2VzLm1pbkRhdGUuaXNGaXJzdENoYW5nZSgpICYmXHJcbiAgICAgICAgK3NpbXBsZUNoYW5nZXMubWluRGF0ZS5jdXJyZW50VmFsdWUgIT09IHNpbXBsZUNoYW5nZXMubWluRGF0ZS5wcmV2aW91c1ZhbHVlKSB8fFxyXG4gICAgICAoc2ltcGxlQ2hhbmdlcy5tYXhEYXRlICYmICFzaW1wbGVDaGFuZ2VzLm1heERhdGUuaXNGaXJzdENoYW5nZSgpICYmXHJcbiAgICAgICAgK3NpbXBsZUNoYW5nZXMubWF4RGF0ZS5jdXJyZW50VmFsdWUgIT09IHNpbXBsZUNoYW5nZXMubWF4RGF0ZS5wcmV2aW91c1ZhbHVlKSB8fFxyXG4gICAgICAoc2ltcGxlQ2hhbmdlcy5kaXNhYmxlTGltaXRCYXNlICYmICFzaW1wbGVDaGFuZ2VzLmRpc2FibGVMaW1pdEJhc2UuaXNGaXJzdENoYW5nZSgpICYmXHJcbiAgICAgICAgK3NpbXBsZUNoYW5nZXMuZGlzYWJsZUxpbWl0QmFzZS5jdXJyZW50VmFsdWUgIT09IHNpbXBsZUNoYW5nZXMuZGlzYWJsZUxpbWl0QmFzZS5wcmV2aW91c1ZhbHVlKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuZ2VuZXJhdGVBbGxvd2VkTWFwKCk7XHJcbiAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5tb2RhbFJlZiB8fCAhdGhpcy5tb2RhbFJlZi5jb21wb25lbnRJbnN0YW5jZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLm1vZGFsUmVmLmNvbXBvbmVudEluc3RhbmNlLmRhdGEgPSB7XHJcbiAgICAgIG1vZGU6IHRoaXMubW9kZSxcclxuICAgICAgdmFsdWU6IHRoaXMuY3VycmVudFZhbHVlLFxyXG4gICAgICBva0xhYmVsOiB0aGlzLm9rTGFiZWwsXHJcbiAgICAgIGNhbmNlbExhYmVsOiB0aGlzLmNhbmNlbExhYmVsLFxyXG4gICAgICBva0J1dHRvblRlbXBsYXRlOiB0aGlzLm9rQnV0dG9uVGVtcGxhdGUsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRlbXBsYXRlOiB0aGlzLmNhbmNlbEJ1dHRvblRlbXBsYXRlLFxyXG4gICAgICBhbnRlTWVyaWRpZW1BYmJyZXZpYXRpb246IHRoaXMuYW50ZU1lcmlkaWVtQWJicmV2aWF0aW9uLFxyXG4gICAgICBwb3N0TWVyaWRpZW1BYmJyZXZpYXRpb246IHRoaXMucG9zdE1lcmlkaWVtQWJicmV2aWF0aW9uLFxyXG4gICAgICBjb2xvcjogdGhpcy5jb2xvcixcclxuICAgICAgaXNQbTogdGhpcy5pc1BtLFxyXG4gICAgICBtaW5EYXRlOiB0aGlzLm1pbkRhdGUsXHJcbiAgICAgIG1heERhdGU6IHRoaXMubWF4RGF0ZSxcclxuICAgICAgYWxsb3dlZDEySG91ck1hcDogdGhpcy5hbGxvd2VkMTJIb3VyTWFwLFxyXG4gICAgICBhbGxvd2VkMjRIb3VyTWFwOiB0aGlzLmFsbG93ZWQyNEhvdXJNYXAsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY2hlY2tWYWxpZGl0eSh2YWx1ZTogRGF0ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIGNvbnN0IGhvdXIgPSB2YWx1ZS5nZXRIb3VycygpO1xyXG4gICAgY29uc3QgbWludXRlcyA9IHZhbHVlLmdldE1pbnV0ZXMoKTtcclxuICAgIGNvbnN0IG1lcmlkaWVtID0gdGhpcy5pc1BtID8gJ1BNJyA6ICdBTSc7XHJcbiAgICByZXR1cm4gaXNBbGxvd2VkKGhvdXIsIG1pbnV0ZXMsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlLCB0aGlzLm1vZGUsIG1lcmlkaWVtKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IERhdGUsIGlzSW5uZXJDYWxsID0gZmFsc2UpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoIWlzSW5uZXJDYWxsKSB7XHJcbiAgICAgIHRoaXMuX3NraXBWYWx1ZUNoYW5nZUVtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLl9za2lwVmFsdWVDaGFuZ2VFbWlzc2lvbiA9IGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdmFsdWUuc2V0U2Vjb25kcygwKTtcclxuICAgICAgdmFsdWUuc2V0TWlsbGlzZWNvbmRzKDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgrdGhpcy52YWx1ZSAhPT0gK3ZhbHVlKSB7IHRoaXMudmFsdWUgPSB2YWx1ZTsgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlRm4gPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkRm4gPSBmbjtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgc2hvd0RpYWxvZygpIHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy5pc0lucHV0Rm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tb2RhbFJlZiA9IHRoaXMuZGlhbG9nLm9wZW4oTWF0VGltZXBpY2tlckNvbXBvbmVudERpYWxvZ0NvbXBvbmVudCwge1xyXG4gICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbW9kZTogdGhpcy5tb2RlLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgICBva0xhYmVsOiB0aGlzLm9rTGFiZWwsXHJcbiAgICAgICAgY2FuY2VsTGFiZWw6IHRoaXMuY2FuY2VsTGFiZWwsXHJcbiAgICAgICAgb2tCdXR0b25UZW1wbGF0ZTogdGhpcy5va0J1dHRvblRlbXBsYXRlLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRlbXBsYXRlOiB0aGlzLmNhbmNlbEJ1dHRvblRlbXBsYXRlLFxyXG4gICAgICAgIGFudGVNZXJpZGllbUFiYnJldmlhdGlvbjogdGhpcy5hbnRlTWVyaWRpZW1BYmJyZXZpYXRpb24sXHJcbiAgICAgICAgcG9zdE1lcmlkaWVtQWJicmV2aWF0aW9uOiB0aGlzLnBvc3RNZXJpZGllbUFiYnJldmlhdGlvbixcclxuICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcclxuICAgICAgICBpc1BtOiB0aGlzLmlzUG0sXHJcbiAgICAgICAgbWluRGF0ZTogdGhpcy5taW5EYXRlLFxyXG4gICAgICAgIG1heERhdGU6IHRoaXMubWF4RGF0ZSxcclxuICAgICAgICBhbGxvd2VkMTJIb3VyTWFwOiB0aGlzLmFsbG93ZWQxMkhvdXJNYXAsXHJcbiAgICAgICAgYWxsb3dlZDI0SG91ck1hcDogdGhpcy5hbGxvd2VkMjRIb3VyTWFwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLm1vZGFsUmVmLmNvbXBvbmVudEluc3RhbmNlO1xyXG4gICAgaW5zdGFuY2UuY2hhbmdlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5pc0FsaXZlKSkuc3Vic2NyaWJlKHRoaXMuaGFuZGxlQ2hhbmdlKTtcclxuICAgIGluc3RhbmNlLm9rQ2xpY2tFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLmlzQWxpdmUpKS5zdWJzY3JpYmUodGhpcy5oYW5kbGVPayk7XHJcbiAgICBpbnN0YW5jZS5jYW5jZWxDbGlja0V2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuaXNBbGl2ZSkpLnN1YnNjcmliZSh0aGlzLmhhbmRsZUNhbmNlbCk7XHJcbiAgICB0aGlzLm1vZGFsUmVmLmJlZm9yZUNsb3NlZCgpLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IGluc3RhbmNlLmlzQ2xvc2luZyA9IHRydWUpO1xyXG4gICAgdGhpcy5tb2RhbFJlZi5hZnRlckNsb3NlZCgpLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMub25Ub3VjaGVkRm4pIHsgdGhpcy5vblRvdWNoZWRGbigpOyB9XHJcbiAgICAgIHRoaXMubW9kYWxSZWYgPSBudWxsO1xyXG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY3VycmVudFZhbHVlID0gdGhpcy52YWx1ZSBhcyBEYXRlO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2hhbmdlID0gKG5ld1ZhbHVlKSA9PiB7XHJcbiAgICBpZiAoIShuZXdWYWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7IHJldHVybjsgfVxyXG4gICAgY29uc3QgdiA9IHRoaXMudmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gbmV3IERhdGUodGhpcy52YWx1ZS5nZXRUaW1lKCkpIDogbmV3IERhdGUoKTtcclxuICAgIHYuc2V0SG91cnMobmV3VmFsdWUuZ2V0SG91cnMoKSk7XHJcbiAgICB2LnNldE1pbnV0ZXMobmV3VmFsdWUuZ2V0TWludXRlcygpKTtcclxuICAgIHYuc2V0U2Vjb25kcygwKTtcclxuICAgIHYuc2V0TWlsbGlzZWNvbmRzKDApO1xyXG4gICAgdGhpcy5jdXJyZW50VmFsdWUgPSB2O1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlT2sgPSAodmFsdWUpID0+IHtcclxuICAgIGlmICghdGhpcy5jdXJyZW50VmFsdWUgJiYgdmFsdWUpIHsgdGhpcy5jdXJyZW50VmFsdWUgPSB2YWx1ZTsgfVxyXG4gICAgaWYgKHRoaXMub25DaGFuZ2VGbikgeyB0aGlzLm9uQ2hhbmdlRm4odGhpcy5jdXJyZW50VmFsdWUpOyB9XHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDYW5jZWwgPSAoKSA9PiB7XHJcbiAgICB0aGlzLm1vZGFsUmVmLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuaXNBbGl2ZS5uZXh0KCk7XHJcbiAgICB0aGlzLmlzQWxpdmUuY29tcGxldGUoKTtcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xyXG4gICAgICB0aGlzLmZtLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChsID0+IGwoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==