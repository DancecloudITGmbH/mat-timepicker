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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXQtdGltZXBpY2tlci9zcmMvbGliL3RpbWVwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFNTCxRQUFRLEVBR1IsV0FBVyxFQUNYLElBQUksRUFDSixNQUFNLEVBQ04sWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBZ0IsTUFBTSw4QkFBOEIsQ0FBQztBQUVqRixPQUFPLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7QUFtQzlELE1BQU0sT0FBTyxzQkFBc0I7SUFzUmpDLFlBQzZCLFNBQW9CLEVBQ3hDLE1BQWlCLEVBQ2hCLFFBQW1CLEVBQ25CLElBQVksRUFDWixFQUFnQixFQUNoQixLQUE4QixFQUM5QixNQUFjO0lBQ3RCLDJHQUEyRztJQUNqRyxTQUFtQjtJQUM3QiwyR0FBMkc7SUFDdkYsV0FBbUI7SUFDdkMsMkdBQTJHO0lBQ3ZGLGFBQTJCO0lBQy9DLDJHQUEyRztJQUN2RixnQkFBb0M7SUFDeEQsOEdBQThHO0lBQzlHLHlCQUE0QztRQWhCakIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLGFBQVEs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QUFROztzQkFFUixRQUFRO3dEQXRRUCxRQUFRO2tCQURYLEtBQUs7WUFvQk8sRUFBRTtrQkFBZCxLQUFLO1lBS08sUUFBUTtrQkFBcEIsS0FBSztZQVU2QixnQkFBZ0I7a0JBQWxELFdBQVc7bUJBQUMsZ0JBQWdCO1lBQ1MsV0FBVztrQkFBaEQsV0FBVzttQkFBQyx1QkFBdUI7WUFFM0IsaUJBQWlCO2tCQUF6QixLQUFLO1lBRU8sUUFBUTtrQkFBcEIsS0FBSztZQVdPLFdBQVc7a0JBQXZCLEtBQUs7WUFtQkcsZ0JBQWdCO2tCQUF4QixLQUFLO1lBRUcsb0JBQW9CO2tCQUE1QixLQUFLO1lBR0csT0FBTztrQkFBZixLQUFLO1lBRUcsV0FBVztrQkFBbkIsS0FBSztZQUVHLHdCQUF3QjtrQkFBaEMsS0FBSztZQUVHLHdCQUF3QjtrQkFBaEMsS0FBSztZQUdHLElBQUk7a0JBQVosS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLHdCQUF3QjtrQkFBaEMsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQU1HLE9BQU87a0JBQWYsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQVlPLEtBQUs7a0JBQWpCLEtBQUs7WUF5Q0ksVUFBVTtrQkFBbkIsTUFBTTtZQUNHLFlBQVk7a0JBQXJCLE1BQU07WUFFZ0IsWUFBWTtrQkFBbEMsWUFBWTttQkFBQyxPQUFPO1lBc0VnQixjQUFjO2tCQUFsRCxZQUFZO21CQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQWNBLFlBQVk7a0JBQTlDLFlBQVk7bUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBSVYsWUFBWTtrQkFBbEMsWUFBWTttQkFBQyxPQUFPO1lBSUssZUFBZTtrQkFBeEMsWUFBWTttQkFBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nRm9ybSwgTmdDb250cm9sLCBGb3JtR3JvdXBEaXJlY3RpdmUsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBPbkluaXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFJlbmRlcmVyMixcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE5nWm9uZSxcclxuICBIb3N0QmluZGluZyxcclxuICBTZWxmLFxyXG4gIE91dHB1dCxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgVGVtcGxhdGVSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBNYXRGb3JtRmllbGRDb250cm9sLCBNYXRGb3JtRmllbGQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcclxuaW1wb3J0IHsgQ2xvY2tNb2RlLCBJQWxsb3dlZDI0SG91ck1hcCwgSUFsbG93ZWQxMkhvdXJNYXAgfSBmcm9tICcuL2ludGVyZmFjZXMtYW5kLXR5cGVzJztcclxuaW1wb3J0IHsgdHdvRGlnaXRzLCBjb252ZXJ0SG91cnNGb3JNb2RlLCBpc0FsbG93ZWQsIGlzRGF0ZUluUmFuZ2UsIGlzVGltZUluUmFuZ2UgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBNYXRUaW1lcGlja2VyQ29tcG9uZW50RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLWRpYWxvZy90aW1lcGlja2VyLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgRXJyb3JTdGF0ZU1hdGNoZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXRUaW1lcGlja2VyQnV0dG9uVGVtcGxhdGVDb250ZXh0IHtcclxuICAkaW1wbGljaXQ6ICgpID0+IHZvaWQ7XHJcbiAgbGFiZWw6IHN0cmluZztcclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcclxuICBzZWxlY3RvcjogJ2lucHV0W21hdFRpbWVwaWNrZXJdJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogTWF0Rm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1hdFRpbWVwaWNrZXJEaXJlY3RpdmUgfVxyXG4gIF0sXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbiAgaG9zdDoge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHJlbW92ZSAubWF0LWZvcm0tZmllbGQtYXV0b2ZpbGwtY29udHJvbCBpbiBmYXZvciBvZiBBdXRvZmlsbE1vbml0b3IuXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBxdW90ZS1wcm9wc1xyXG4gICAgJ2NsYXNzJzogJ21hdC1pbnB1dC1lbGVtZW50IG1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2wnLFxyXG4gICAgJ1tjbGFzcy5tYXQtaW5wdXQtc2VydmVyXSc6ICdfaXNTZXJ2ZXInLFxyXG4gICAgLy8gTmF0aXZlIGlucHV0IHByb3BlcnRpZXMgdGhhdCBhcmUgb3ZlcndyaXR0ZW4gYnkgQW5ndWxhciBpbnB1dHMgbmVlZCB0byBiZSBzeW5jZWQgd2l0aFxyXG4gICAgLy8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50LiBPdGhlcndpc2UgcHJvcGVydHkgYmluZGluZ3MgZm9yIHRob3NlIGRvbid0IHdvcmsuXHJcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcclxuICAgICdbYXR0ci5wbGFjZWhvbGRlcl0nOiAncGxhY2Vob2xkZXInLFxyXG4gICAgJ1tkaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgJ1tyZXF1aXJlZF0nOiAncmVxdWlyZWQnLFxyXG4gICAgJ1thdHRyLnJlYWRvbmx5XSc6ICdyZWFkb25seSB8fCBudWxsJyxcclxuICAgICdbYXR0ci5hcmlhLWludmFsaWRdJzogJ2Vycm9yU3RhdGUnLFxyXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkLnRvU3RyaW5nKCknLFxyXG4gIH0sXHJcbiAgZXhwb3J0QXM6ICdtYXRUaW1lcGlja2VyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0VGltZXBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBNYXRGb3JtRmllbGRDb250cm9sPGFueT5cclxue1xyXG4gIHN0YXRpYyBuZXh0SWQgPSAwO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IGlzIGJlaW5nIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXIuICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICByZWFkb25seSBfaXNTZXJ2ZXI6IGJvb2xlYW47XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgX2Vycm9yU3RhdGUgPSBmYWxzZTtcclxuICBnZXQgZXJyb3JTdGF0ZSgpIHtcclxuICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5fZXJyb3JTdGF0ZTtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuX3BhcmVudEZvcm1Hcm91cCB8fCB0aGlzLl9wYXJlbnRGb3JtO1xyXG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMubmdDb250cm9sID8gdGhpcy5uZ0NvbnRyb2wuY29udHJvbCBhcyBGb3JtQ29udHJvbCA6IG51bGw7XHJcbiAgICBjb25zdCBuZXdTdGF0ZSA9IHRoaXMuZXJyb3JTdGF0ZU1hdGNoZXIgPyB0aGlzLmVycm9yU3RhdGVNYXRjaGVyLmlzRXJyb3JTdGF0ZShjb250cm9sLCBwYXJlbnQpIDogb2xkU3RhdGU7XHJcblxyXG4gICAgaWYgKG5ld1N0YXRlICE9PSBvbGRTdGF0ZSkge1xyXG4gICAgICB0aGlzLl9lcnJvclN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3U3RhdGU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLm5nQ29udHJvbC5kaXNhYmxlZCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG5cclxuICAgIC8vIEJyb3dzZXJzIG1heSBub3QgZmlyZSB0aGUgYmx1ciBldmVudCBpZiB0aGUgaW5wdXQgaXMgZGlzYWJsZWQgdG9vIHF1aWNrbHkuXHJcbiAgICAvLyBSZXNldCBmcm9tIGhlcmUgdG8gZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgZG9lc24ndCBiZWNvbWUgc3R1Y2suXHJcbiAgICBpZiAodGhpcy5mb2N1c2VkKSB7XHJcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcHJvdGVjdGVkIF9kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy5faWQgPSB2YWx1ZSB8fCB0aGlzLl91aWQ7IH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cclxuICBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIGlzQWxpdmUgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gIHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcHJvdGVjdGVkIF91aWQgPSBgbWF0LXRpbWUtcGlja2VyLSR7TWF0VGltZXBpY2tlckRpcmVjdGl2ZS5uZXh0SWQrK31gO1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmxvYXRpbmcnKSBnZXQgc2hvdWxkTGFiZWxGbG9hdCgpIHsgcmV0dXJuIHRoaXMuZm9jdXNlZCB8fCAhdGhpcy5lbXB0eTsgfVxyXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRlc2NyaWJlZGJ5JykgZGVzY3JpYmVkQnkgPSAnJztcclxuXHJcbiAgQElucHV0KCkgZXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyO1xyXG5cclxuICBASW5wdXQoKSBnZXQgcmVxdWlyZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgcmVxdWlyZWQocmVxKSB7XHJcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZXEpO1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gIHByaXZhdGUgX3JlcXVpcmVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGdldCBwbGFjZWhvbGRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcclxuICB9XHJcbiAgc2V0IHBsYWNlaG9sZGVyKHBsaCkge1xyXG4gICAgdGhpcy5fcGxhY2Vob2xkZXIgPSBwbGg7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgfVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgZm9jdXNlZCA9IGZhbHNlO1xyXG4gIHByaXZhdGUgcGF0dGVybjogUmVnRXhwO1xyXG5cclxuICBwcml2YXRlIGFsbG93ZWQyNEhvdXJNYXA6IElBbGxvd2VkMjRIb3VyTWFwID0gbnVsbDtcclxuICBwcml2YXRlIGFsbG93ZWQxMkhvdXJNYXA6IElBbGxvd2VkMTJIb3VyTWFwID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBpc0lucHV0Rm9jdXNlZCA9IGZhbHNlO1xyXG5cclxuICAvKiBVc2UgYSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBvayBidXR0b24gKi9cclxuICBASW5wdXQoKSBva0J1dHRvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxNYXRUaW1lcGlja2VyQnV0dG9uVGVtcGxhdGVDb250ZXh0PiB8IG51bGwgPSBudWxsO1xyXG4gIC8qIFVzZSBhIGN1c3RvbSB0ZW1wbGF0ZSBmb3IgdGhlIGNhbmNlbCBidXR0b24gKi9cclxuICBASW5wdXQoKSBjYW5jZWxCdXR0b25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8TWF0VGltZXBpY2tlckJ1dHRvblRlbXBsYXRlQ29udGV4dD4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqIE92ZXJyaWRlIHRoZSBsYWJlbCBvZiB0aGUgb2sgYnV0dG9uLiAqL1xyXG4gIEBJbnB1dCgpIG9rTGFiZWwgPSAnT2snO1xyXG4gIC8qKiBPdmVycmlkZSB0aGUgbGFiZWwgb2YgdGhlIGNhbmNlbCBidXR0b24uICovXHJcbiAgQElucHV0KCkgY2FuY2VsTGFiZWwgPSAnQ2FuY2VsJztcclxuICAvKiogT3ZlcnJpZGUgdGhlIGFudGUgbWVyaWRpZW0gYWJicmV2aWF0aW9uLiAqL1xyXG4gIEBJbnB1dCgpIGFudGVNZXJpZGllbUFiYnJldmlhdGlvbiA9ICdhbSc7XHJcbiAgLyoqIE92ZXJyaWRlIHRoZSBwb3N0IG1lcmlkaWVtIGFiYnJldmlhdGlvbi4gKi9cclxuICBASW5wdXQoKSBwb3N0TWVyaWRpZW1BYmJyZXZpYXRpb24gPSAncG0nO1xyXG5cclxuICAvKiogU2V0cyB0aGUgY2xvY2sgbW9kZSwgMTItaG91ciBvciAyNC1ob3VyIGNsb2NrcyBhcmUgc3VwcG9ydGVkLiAqL1xyXG4gIEBJbnB1dCgpIG1vZGU6IENsb2NrTW9kZSA9ICcyNGgnO1xyXG4gIEBJbnB1dCgpIGNvbG9yID0gJ3ByaW1hcnknO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVEaWFsb2dPcGVuT25DbGljayA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHN0cmljdCA9IHRydWU7XHJcblxyXG4gIGNvbnRyb2xUeXBlID0gJ2FuZ3VsYXItbWF0ZXJpYWwtdGltZXBpY2tlcic7XHJcblxyXG4gIHByaXZhdGUgbGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKSBtaW5EYXRlOiBEYXRlO1xyXG4gIEBJbnB1dCgpIG1heERhdGU6IERhdGU7XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcHJpdmF0ZSBfaXNQbTogYm9vbGVhbjtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gIHByaXZhdGUgX3ZhbHVlOiBEYXRlO1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sbm8tdW5kZXJzY29yZS1kYW5nbGUsaWQtYmxhY2tsaXN0LGlkLW1hdGNoXHJcbiAgcHJpdmF0ZSBfZm9ybWF0dGVkVmFsdWVTdHJpbmc6IHN0cmluZztcclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICBwcml2YXRlIF9za2lwVmFsdWVDaGFuZ2VFbWlzc2lvbiA9IHRydWU7XHJcblxyXG4gIEBJbnB1dCgpIHNldCB2YWx1ZSh2YWx1ZTogRGF0ZSkge1xyXG4gICAgaWYgKHZhbHVlID09PSB0aGlzLl92YWx1ZSkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2Zvcm1hdHRlZFZhbHVlU3RyaW5nID0gbnVsbDtcclxuICAgICAgdGhpcy5zZXRJbnB1dEVsZW1lbnRWYWx1ZSgnJyk7XHJcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gdmFsdWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGhvdXIsIGlzUG0gfSA9IGNvbnZlcnRIb3Vyc0Zvck1vZGUodmFsdWUuZ2V0SG91cnMoKSwgdGhpcy5tb2RlKTtcclxuICAgIHRoaXMuX2lzUG0gPSBpc1BtO1xyXG4gICAgdGhpcy5fZm9ybWF0dGVkVmFsdWVTdHJpbmcgPSB0aGlzLm1vZGUgPT09ICcxMmgnID9cclxuICAgICAgYCR7aG91cn06JHt0d29EaWdpdHModmFsdWUuZ2V0TWludXRlcygpKX0gJHtpc1BtID8gdGhpcy5wb3N0TWVyaWRpZW1BYmJyZXZpYXRpb24gOiB0aGlzLmFudGVNZXJpZGllbUFiYnJldmlhdGlvbn1gIDpcclxuICAgICAgYCR7dHdvRGlnaXRzKHZhbHVlLmdldEhvdXJzKCkpfToke3R3b0RpZ2l0cyh2YWx1ZS5nZXRNaW51dGVzKCkpfWA7XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzSW5wdXRGb2N1c2VkKSB7IHRoaXMuc2V0SW5wdXRFbGVtZW50VmFsdWUodGhpcy5mb3JtYXR0ZWRWYWx1ZVN0cmluZyk7IH1cclxuICAgIHRoaXMuY3VycmVudFZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcblxyXG4gICAgaWYgKHRoaXMuX3NraXBWYWx1ZUNoYW5nZUVtaXNzaW9uKSB7IHJldHVybjsgfVxyXG4gICAgdGhpcy50aW1lQ2hhbmdlLmVtaXQodGhpcy5jdXJyZW50VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHZhbHVlKCkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cclxuXHJcbiAgZ2V0IGlzUG0oKSB7IHJldHVybiB0aGlzLl9pc1BtOyB9XHJcblxyXG4gIGdldCBlbXB0eSgpIHtcclxuICAgIHJldHVybiAhKHRoaXMuY3VycmVudFZhbHVlIGluc3RhbmNlb2YgRGF0ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBmb3JtYXR0ZWRWYWx1ZVN0cmluZygpIHsgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlZFZhbHVlU3RyaW5nOyB9XHJcblxyXG4gIHByaXZhdGUgY3VycmVudFZhbHVlOiBEYXRlO1xyXG4gIHByaXZhdGUgbW9kYWxSZWY6IE1hdERpYWxvZ1JlZjxNYXRUaW1lcGlja2VyQ29tcG9uZW50RGlhbG9nQ29tcG9uZW50PjtcclxuXHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUZuOiBhbnk7XHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRGbjogYW55O1xyXG4gIHByaXZhdGUgY29tYmluYXRpb246IHN0cmluZ1tdID0gW107XHJcblxyXG4gIEBPdXRwdXQoKSB0aW1lQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBpbnZhbGlkSW5wdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JykgaW5wdXRIYW5kbGVyKCkge1xyXG4gICAgbGV0IHZhbHVlID0gKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCBhcyBhbnkpLnZhbHVlIGFzIHN0cmluZztcclxuICAgIGNvbnN0IGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcclxuICAgIGlmIChsZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy53cml0ZVZhbHVlKG51bGwsIHRydWUpO1xyXG4gICAgICBpZiAodGhpcy5vbkNoYW5nZUZuKSB7IHRoaXMub25DaGFuZ2VGbihudWxsKTsgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWVyaWRpZW1SZXN1bHQgPSB2YWx1ZS5tYXRjaCgvYW18cG0vaSk7XHJcbiAgICBsZXQgbWVyaWRpZW06IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG4gICAgaWYgKG1lcmlkaWVtUmVzdWx0KSB7XHJcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShtZXJpZGllbVJlc3VsdFswXSwgJycpO1xyXG4gICAgICBbbWVyaWRpZW1dID0gbWVyaWRpZW1SZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWx1ZUhhc0NvbHVtbiA9IHZhbHVlLmluY2x1ZGVzKCc6Jyk7XHJcbiAgICBsZXQgW2hvdXJzLCBtaW51dGVzXTogYW55ID0gbGVuZ3RoID09PSAxID8gW3ZhbHVlLCAwXSA6XHJcbiAgICAgIGxlbmd0aCA9PT0gMiAmJiAhdmFsdWVIYXNDb2x1bW4gPyBbdmFsdWUsIDBdIDogdmFsdWVIYXNDb2x1bW4gPyB2YWx1ZS5zcGxpdCgnOicpIDogdmFsdWUuc3BsaXQoLyhcXGRcXGQpLykuZmlsdGVyKHYgPT4gdik7XHJcblxyXG4gICAgaG91cnMgPSAraG91cnM7XHJcblxyXG4gICAgaWYgKC9cXHMvLnRlc3QobWludXRlcykpIHtcclxuICAgICAgbGV0IG90aGVyO1xyXG4gICAgICBbbWludXRlcywgb3RoZXJdID0gbWludXRlcy5zcGxpdCgvXFxzLyk7XHJcbiAgICAgIGlmIChvdGhlciA9PT0gJ3BtJyAmJiAhaXNOYU4oaG91cnMpICYmIGhvdXJzIDwgMTIpIHsgaG91cnMgKz0gMTI7IH1cclxuICAgIH1cclxuXHJcbiAgICBtaW51dGVzID0gK21pbnV0ZXM7XHJcblxyXG4gICAgaWYgKGlzTmFOKGhvdXJzKSB8fCBpc05hTihtaW51dGVzKSkge1xyXG4gICAgICB0aGlzLndyaXRlVmFsdWUobnVsbCwgdHJ1ZSk7IHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaG91cnMgPCAxMiAmJiBtZXJpZGllbSAmJiBtZXJpZGllbS50b0xvd2VyQ2FzZSgpID09PSAncG0nKSB7XHJcbiAgICAgIGhvdXJzICs9IDEyO1xyXG4gICAgfSBlbHNlIGlmIChob3VycyA+PSAxMiAmJiBtZXJpZGllbSAmJiBtZXJpZGllbS50b0xvd2VyQ2FzZSgpID09PSAnYW0nKSB7XHJcbiAgICAgIGhvdXJzIC09IDEyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm1vZGUgPT09ICcxMmgnICYmICtob3VycyA8IDApIHtcclxuICAgICAgaG91cnMgPSAnMCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoK2hvdXJzID4gMjQpIHtcclxuICAgICAgICBob3VycyA9ICcyNCc7XHJcbiAgICAgIH0gZWxzZSBpZiAoK2hvdXJzIDwgMCkge1xyXG4gICAgICAgIGhvdXJzID0gJzAnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmICgrbWludXRlcyA+IDU5KSB7XHJcbiAgICAgIG1pbnV0ZXMgPSAnNTknO1xyXG4gICAgfSBlbHNlIGlmICgrbWludXRlcyA8IDApIHtcclxuICAgICAgbWludXRlcyA9ICcwJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkID0gdGhpcy52YWx1ZSA/IG5ldyBEYXRlKHRoaXMudmFsdWUuZ2V0VGltZSgpKSA6IG5ldyBEYXRlKCk7XHJcbiAgICBkLnNldEhvdXJzKCtob3Vycyk7XHJcbiAgICBkLnNldE1pbnV0ZXMoK21pbnV0ZXMpO1xyXG4gICAgZC5zZXRTZWNvbmRzKDApO1xyXG4gICAgZC5zZXRNaWxsaXNlY29uZHMoMCk7XHJcblxyXG4gICAgY29uc3QgaXNWYWx1ZUluUmFuZ2UgPSBpc0RhdGVJblJhbmdlKHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlLCBkKTtcclxuICAgIGlmICghaXNWYWx1ZUluUmFuZ2UpIHsgdGhpcy5pbnZhbGlkSW5wdXQuZW1pdCgpOyB9XHJcblxyXG5cclxuICAgIHRoaXMud3JpdGVWYWx1ZShkLCB0cnVlKTtcclxuICAgIGlmICh0aGlzLm9uQ2hhbmdlRm4pIHsgdGhpcy5vbkNoYW5nZUZuKGQpOyB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSkga2V5ZG93bkhhbmRsZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5hbHRLZXkpIHtcclxuICAgICAgdGhpcy5jb21iaW5hdGlvbiA9IHRoaXMuY29tYmluYXRpb24uY29uY2F0KGV2ZW50LmNvZGUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIS9eWzAtOWEtekEtWlxcc117MCwxfSQvLnRlc3QoZXZlbnQua2V5KSkgeyByZXR1cm47IH1cclxuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGNvbnN0IHRWYWx1ZSA9IHRhcmdldC52YWx1ZTtcclxuICAgIGNvbnN0IHZhbHVlID0gYCR7dFZhbHVlLnNsaWNlKDAsIHRhcmdldC5zZWxlY3Rpb25TdGFydCl9JHtldmVudC5rZXl9JHt0VmFsdWUuc2xpY2UodGFyZ2V0LnNlbGVjdGlvbkVuZCl9YDtcclxuICAgIGlmICh2YWx1ZS5tYXRjaCh0aGlzLnBhdHRlcm4pIHx8IHRoaXMuY29tYmluYXRpb24ubGVuZ3RoID4gMCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKSBrZXl1cEhhbmRsZXIoZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5jb21iaW5hdGlvbiA9IHRoaXMuY29tYmluYXRpb24uZmlsdGVyKHYgPT4gdiAhPT0gZXZlbnQuY29kZSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpIGZvY3VzSGFuZGxlcigpIHtcclxuICAgIHRoaXMuaXNJbnB1dEZvY3VzZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnKSBmb2N1c291dEhhbmRsZXIoKSB7XHJcbiAgICB0aGlzLmlzSW5wdXRGb2N1c2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNldElucHV0RWxlbWVudFZhbHVlKHRoaXMuZm9ybWF0dGVkVmFsdWVTdHJpbmcpO1xyXG4gICAgaWYgKHRoaXMub25Ub3VjaGVkRm4gJiYgIXRoaXMubW9kYWxSZWYpIHsgdGhpcy5vblRvdWNoZWRGbigpOyB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sLFxyXG4gICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGZtOiBGb2N1c01vbml0b3IsXHJcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gICAgcHJvdGVjdGVkIF9wbGF0Zm9ybTogUGxhdGZvcm0sXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLG5vLXVuZGVyc2NvcmUtZGFuZ2xlLGlkLWJsYWNrbGlzdCxpZC1tYXRjaFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfcGFyZW50Rm9ybTogTmdGb3JtLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX21hdEZvcm1GaWxlZDogTWF0Rm9ybUZpZWxkLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbixuby11bmRlcnNjb3JlLWRhbmdsZSxpZC1ibGFja2xpc3QsaWQtbWF0Y2hcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiwgbm8tdW5kZXJzY29yZS1kYW5nbGUsIGlkLWJsYWNrbGlzdCwgaWQtbWF0Y2hcclxuICAgIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxyXG4gICkge1xyXG4gICAgdGhpcy5pZCA9IHRoaXMuaWQ7XHJcblxyXG4gICAgdGhpcy5lcnJvclN0YXRlTWF0Y2hlciA9IF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI7XHJcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgIT0gbnVsbCkgeyB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpczsgfVxyXG5cclxuICAgIGlmIChfcGxhdGZvcm0uSU9TKSB7XHJcbiAgICAgIG5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgZWxSZWYubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICBpZiAoIWVsLnZhbHVlICYmICFlbC5zZWxlY3Rpb25TdGFydCAmJiAhZWwuc2VsZWN0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgIC8vIE5vdGU6IEp1c3Qgc2V0dGluZyBgMCwgMGAgZG9lc24ndCBmaXggdGhlIGlzc3VlLiBTZXR0aW5nXHJcbiAgICAgICAgICAgIC8vIGAxLCAxYCBmaXhlcyBpdCBmb3IgdGhlIGZpcnN0IHRpbWUgdGhhdCB5b3UgdHlwZSB0ZXh0IGFuZFxyXG4gICAgICAgICAgICAvLyB0aGVuIGhvbGQgZGVsZXRlLiBUb2dnbGluZyB0byBgMSwgMWAgYW5kIHRoZW4gYmFjayB0b1xyXG4gICAgICAgICAgICAvLyBgMCwgMGAgc2VlbXMgdG8gY29tcGxldGVseSBmaXggaXQuXHJcbiAgICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKDEsIDEpO1xyXG4gICAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faXNTZXJ2ZXIgPSAhdGhpcy5fcGxhdGZvcm0uaXNCcm93c2VyO1xyXG4gIH1cclxuXHJcbiAgc2V0RGVzY3JpYmVkQnlJZHMoaWRzOiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy5kZXNjcmliZWRCeSA9IGlkcy5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50KS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdpbnB1dCcpIHtcclxuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRJbnB1dEVsZW1lbnRWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgeyB2YWx1ZSA9ICcnOyB9XHJcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgdmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50VmFsdWUgPT09IG51bGwgfHwgdGhpcy5jdXJyZW50VmFsdWUgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gbnVsbDsgfVxyXG5cclxuICAgIGNvbnN0IGlzVmFsdWVJblJhbmdlID0gdGhpcy5zdHJpY3QgP1xyXG4gICAgICBpc0RhdGVJblJhbmdlKHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlLCB0aGlzLmN1cnJlbnRWYWx1ZSkgOlxyXG4gICAgICBpc1RpbWVJblJhbmdlKHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlLCB0aGlzLmN1cnJlbnRWYWx1ZSk7XHJcblxyXG4gICAgcmV0dXJuIGlzVmFsdWVJblJhbmdlID8gbnVsbCA6IHsgZGF0ZVJhbmdlOiB0cnVlIH07XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKFxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihcclxuICAgICAgICB0aGlzLl9tYXRGb3JtRmlsZWQgPyB0aGlzLl9tYXRGb3JtRmlsZWQuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCA6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudFxyXG4gICAgICAgICwgJ2NsaWNrJywgdGhpcy5jbGlja0hhbmRsZXIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2xpY2tIYW5kbGVyID0gKGU6IEZvY3VzRXZlbnQpID0+IHtcclxuICAgIGlmICgodGhpcy5tb2RhbFJlZiAmJiB0aGlzLm1vZGFsUmVmLmNvbXBvbmVudEluc3RhbmNlLmlzQ2xvc2luZykgfHwgdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVEaWFsb2dPcGVuT25DbGljaykgeyByZXR1cm47IH1cclxuICAgIGlmICghdGhpcy5tb2RhbFJlZiAmJiAhdGhpcy5kaXNhYmxlRGlhbG9nT3Blbk9uQ2xpY2spIHsgdGhpcy5zaG93RGlhbG9nKCk7IH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xyXG4gICAgICB0aGlzLmZtLm1vbml0b3IodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0cnVlKS5zdWJzY3JpYmUob3JpZ2luID0+IHtcclxuICAgICAgICB0aGlzLmZvY3VzZWQgPSAhIW9yaWdpbjtcclxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYXNNYXhEYXRlID0gISF0aGlzLm1heERhdGU7XHJcbiAgICBjb25zdCBoYXNNaW5EYXRlID0gISF0aGlzLm1pbkRhdGU7XHJcblxyXG4gICAgaWYgKGhhc01pbkRhdGUgfHwgaGFzTWF4RGF0ZSkge1xyXG4gICAgICBpZiAoaGFzTWluRGF0ZSkgeyB0aGlzLm1pbkRhdGUuc2V0U2Vjb25kcygwKTsgdGhpcy5taW5EYXRlLnNldE1pbGxpc2Vjb25kcygwKTsgfVxyXG4gICAgICBpZiAoaGFzTWF4RGF0ZSkgeyB0aGlzLm1heERhdGUuc2V0U2Vjb25kcygwKTsgdGhpcy5tYXhEYXRlLnNldE1pbGxpc2Vjb25kcygwKTsgfVxyXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMuZ2VuZXJhdGVBbGxvd2VkTWFwKCkpO1xyXG5cclxuICAgICAgaWYgKCEodGhpcy5uZ0NvbnRyb2wgYXMgYW55KS5fcmF3VmFsaWRhdG9ycy5maW5kKHYgPT4gdiA9PT0gdGhpcykpIHtcclxuICAgICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnNldFZhbGlkYXRvcnMoKCh0aGlzLm5nQ29udHJvbCBhcyBhbnkpLl9yYXdWYWxpZGF0b3JzIGFzIGFueVtdKS5jb25jYXQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2tpcFZhbHVlQ2hhbmdlRW1pc3Npb24gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlQWxsb3dlZE1hcCgpIHtcclxuICAgIGNvbnN0IGlzU3RyaWN0TW9kZSA9IHRoaXMuc3RyaWN0ICYmIHRoaXMudmFsdWUgaW5zdGFuY2VvZiBEYXRlO1xyXG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJzI0aCcpIHtcclxuICAgICAgdGhpcy5hbGxvd2VkMjRIb3VyTWFwID0ge307XHJcbiAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgMjQ7IGgrKykge1xyXG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgNjA7IG0rKykge1xyXG4gICAgICAgICAgY29uc3QgaG91ck1hcCA9IHRoaXMuYWxsb3dlZDI0SG91ck1hcFtoXSB8fCB7fTtcclxuICAgICAgICAgIGlmIChpc1N0cmljdE1vZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSh0aGlzLnZhbHVlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLnNldEhvdXJzKGgpO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5zZXRNaW51dGVzKG0pO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5zZXRTZWNvbmRzKDApO1xyXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XHJcbiAgICAgICAgICAgIGhvdXJNYXBbbV0gPSBpc0RhdGVJblJhbmdlKHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlLCBjdXJyZW50RGF0ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBob3VyTWFwW21dID0gaXNBbGxvd2VkKGgsIG0sIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlLCAnMjRoJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFsbG93ZWQyNEhvdXJNYXBbaF0gPSBob3VyTWFwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hbGxvd2VkMTJIb3VyTWFwID0geyBhbToge30sIHBtOiB7fSB9O1xyXG4gICAgICBmb3IgKGxldCBoID0gMDsgaCA8IDI0OyBoKyspIHtcclxuICAgICAgICBjb25zdCBtZXJpZGllbSA9IGggPCAxMiA/ICdhbScgOiAncG0nO1xyXG4gICAgICAgIGZvciAobGV0IG0gPSAwOyBtIDwgNjA7IG0rKykge1xyXG4gICAgICAgICAgY29uc3QgaG91ciA9IChoID4gMTIgPyBoIC0gMTIgOiBoID09PSAwID8gMTIgOiBoKTtcclxuICAgICAgICAgIGNvbnN0IGhvdXJNYXAgPSB0aGlzLmFsbG93ZWQxMkhvdXJNYXBbbWVyaWRpZW1dW2hvdXJdIHx8IHt9O1xyXG4gICAgICAgICAgaWYgKGlzU3RyaWN0TW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWUuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgY3VycmVudERhdGUuc2V0SG91cnMoaCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLnNldE1pbnV0ZXMobSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLnNldFNlY29uZHMoMCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcclxuICAgICAgICAgICAgaG91ck1hcFttXSA9IGlzRGF0ZUluUmFuZ2UodGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIGN1cnJlbnREYXRlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhvdXJNYXBbbV0gPSBpc0FsbG93ZWQoaCwgbSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsICcyNGgnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWxsb3dlZDEySG91ck1hcFttZXJpZGllbV1baG91cl0gPSBob3VyTWFwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IHRoaXMubW9kZSA9PT0gJzI0aCcgPyAvXlswLTldezEsMn06PyhbMC05XXsxLDJ9KT8kLyA6IC9eWzAtOV17MSwyfTo/KFswLTldezEsMn0pP1xccz8oYXxwKT9tPyQvO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgKHNpbXBsZUNoYW5nZXMubWluRGF0ZSAmJiAhc2ltcGxlQ2hhbmdlcy5taW5EYXRlLmlzRmlyc3RDaGFuZ2UoKSAmJlxyXG4gICAgICAgICtzaW1wbGVDaGFuZ2VzLm1pbkRhdGUuY3VycmVudFZhbHVlICE9PSBzaW1wbGVDaGFuZ2VzLm1pbkRhdGUucHJldmlvdXNWYWx1ZSkgfHxcclxuICAgICAgKHNpbXBsZUNoYW5nZXMubWF4RGF0ZSAmJiAhc2ltcGxlQ2hhbmdlcy5tYXhEYXRlLmlzRmlyc3RDaGFuZ2UoKSAmJlxyXG4gICAgICAgICtzaW1wbGVDaGFuZ2VzLm1heERhdGUuY3VycmVudFZhbHVlICE9PSBzaW1wbGVDaGFuZ2VzLm1heERhdGUucHJldmlvdXNWYWx1ZSkgfHxcclxuICAgICAgKHNpbXBsZUNoYW5nZXMuZGlzYWJsZUxpbWl0QmFzZSAmJiAhc2ltcGxlQ2hhbmdlcy5kaXNhYmxlTGltaXRCYXNlLmlzRmlyc3RDaGFuZ2UoKSAmJlxyXG4gICAgICAgICtzaW1wbGVDaGFuZ2VzLmRpc2FibGVMaW1pdEJhc2UuY3VycmVudFZhbHVlICE9PSBzaW1wbGVDaGFuZ2VzLmRpc2FibGVMaW1pdEJhc2UucHJldmlvdXNWYWx1ZSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLmdlbmVyYXRlQWxsb3dlZE1hcCgpO1xyXG4gICAgICB0aGlzLm5nQ29udHJvbC5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubW9kYWxSZWYgfHwgIXRoaXMubW9kYWxSZWYuY29tcG9uZW50SW5zdGFuY2UpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5tb2RhbFJlZi5jb21wb25lbnRJbnN0YW5jZS5kYXRhID0ge1xyXG4gICAgICBtb2RlOiB0aGlzLm1vZGUsXHJcbiAgICAgIHZhbHVlOiB0aGlzLmN1cnJlbnRWYWx1ZSxcclxuICAgICAgb2tMYWJlbDogdGhpcy5va0xhYmVsLFxyXG4gICAgICBjYW5jZWxMYWJlbDogdGhpcy5jYW5jZWxMYWJlbCxcclxuICAgICAgb2tCdXR0b25UZW1wbGF0ZTogdGhpcy5va0J1dHRvblRlbXBsYXRlLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZW1wbGF0ZTogdGhpcy5jYW5jZWxCdXR0b25UZW1wbGF0ZSxcclxuICAgICAgYW50ZU1lcmlkaWVtQWJicmV2aWF0aW9uOiB0aGlzLmFudGVNZXJpZGllbUFiYnJldmlhdGlvbixcclxuICAgICAgcG9zdE1lcmlkaWVtQWJicmV2aWF0aW9uOiB0aGlzLnBvc3RNZXJpZGllbUFiYnJldmlhdGlvbixcclxuICAgICAgY29sb3I6IHRoaXMuY29sb3IsXHJcbiAgICAgIGlzUG06IHRoaXMuaXNQbSxcclxuICAgICAgbWluRGF0ZTogdGhpcy5taW5EYXRlLFxyXG4gICAgICBtYXhEYXRlOiB0aGlzLm1heERhdGUsXHJcbiAgICAgIGFsbG93ZWQxMkhvdXJNYXA6IHRoaXMuYWxsb3dlZDEySG91ck1hcCxcclxuICAgICAgYWxsb3dlZDI0SG91ck1hcDogdGhpcy5hbGxvd2VkMjRIb3VyTWFwLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNoZWNrVmFsaWRpdHkodmFsdWU6IERhdGUpIHtcclxuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBjb25zdCBob3VyID0gdmFsdWUuZ2V0SG91cnMoKTtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSB2YWx1ZS5nZXRNaW51dGVzKCk7XHJcbiAgICBjb25zdCBtZXJpZGllbSA9IHRoaXMuaXNQbSA/ICdQTScgOiAnQU0nO1xyXG4gICAgcmV0dXJuIGlzQWxsb3dlZChob3VyLCBtaW51dGVzLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSwgdGhpcy5tb2RlLCBtZXJpZGllbSk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRlLCBpc0lubmVyQ2FsbCA9IGZhbHNlKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKCFpc0lubmVyQ2FsbCkge1xyXG4gICAgICB0aGlzLl9za2lwVmFsdWVDaGFuZ2VFbWlzc2lvbiA9IHRydWU7XHJcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5fc2tpcFZhbHVlQ2hhbmdlRW1pc3Npb24gPSBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHZhbHVlLnNldFNlY29uZHMoMCk7XHJcbiAgICAgIHZhbHVlLnNldE1pbGxpc2Vjb25kcygwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoK3RoaXMudmFsdWUgIT09ICt2YWx1ZSkgeyB0aGlzLnZhbHVlID0gdmFsdWU7IH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZUZuID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZEZuID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIHNob3dEaWFsb2coKSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuICAgIHRoaXMuaXNJbnB1dEZvY3VzZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubW9kYWxSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKE1hdFRpbWVwaWNrZXJDb21wb25lbnREaWFsb2dDb21wb25lbnQsIHtcclxuICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG1vZGU6IHRoaXMubW9kZSxcclxuICAgICAgICB2YWx1ZTogdGhpcy5jdXJyZW50VmFsdWUsXHJcbiAgICAgICAgb2tMYWJlbDogdGhpcy5va0xhYmVsLFxyXG4gICAgICAgIGNhbmNlbExhYmVsOiB0aGlzLmNhbmNlbExhYmVsLFxyXG4gICAgICAgIG9rQnV0dG9uVGVtcGxhdGU6IHRoaXMub2tCdXR0b25UZW1wbGF0ZSxcclxuICAgICAgICBjYW5jZWxCdXR0b25UZW1wbGF0ZTogdGhpcy5jYW5jZWxCdXR0b25UZW1wbGF0ZSxcclxuICAgICAgICBhbnRlTWVyaWRpZW1BYmJyZXZpYXRpb246IHRoaXMuYW50ZU1lcmlkaWVtQWJicmV2aWF0aW9uLFxyXG4gICAgICAgIHBvc3RNZXJpZGllbUFiYnJldmlhdGlvbjogdGhpcy5wb3N0TWVyaWRpZW1BYmJyZXZpYXRpb24sXHJcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXHJcbiAgICAgICAgaXNQbTogdGhpcy5pc1BtLFxyXG4gICAgICAgIG1pbkRhdGU6IHRoaXMubWluRGF0ZSxcclxuICAgICAgICBtYXhEYXRlOiB0aGlzLm1heERhdGUsXHJcbiAgICAgICAgYWxsb3dlZDEySG91ck1hcDogdGhpcy5hbGxvd2VkMTJIb3VyTWFwLFxyXG4gICAgICAgIGFsbG93ZWQyNEhvdXJNYXA6IHRoaXMuYWxsb3dlZDI0SG91ck1hcFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5tb2RhbFJlZi5jb21wb25lbnRJbnN0YW5jZTtcclxuICAgIGluc3RhbmNlLmNoYW5nZUV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuaXNBbGl2ZSkpLnN1YnNjcmliZSh0aGlzLmhhbmRsZUNoYW5nZSk7XHJcbiAgICBpbnN0YW5jZS5va0NsaWNrRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5pc0FsaXZlKSkuc3Vic2NyaWJlKHRoaXMuaGFuZGxlT2spO1xyXG4gICAgaW5zdGFuY2UuY2FuY2VsQ2xpY2tFdmVudC5waXBlKHRha2VVbnRpbCh0aGlzLmlzQWxpdmUpKS5zdWJzY3JpYmUodGhpcy5oYW5kbGVDYW5jZWwpO1xyXG4gICAgdGhpcy5tb2RhbFJlZi5iZWZvcmVDbG9zZWQoKS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiBpbnN0YW5jZS5pc0Nsb3NpbmcgPSB0cnVlKTtcclxuICAgIHRoaXMubW9kYWxSZWYuYWZ0ZXJDbG9zZWQoKS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm9uVG91Y2hlZEZuKSB7IHRoaXMub25Ub3VjaGVkRm4oKTsgfVxyXG4gICAgICB0aGlzLm1vZGFsUmVmID0gbnVsbDtcclxuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IHRoaXMudmFsdWUgYXMgRGF0ZTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUNoYW5nZSA9IChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgaWYgKCEobmV3VmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkgeyByZXR1cm47IH1cclxuICAgIGNvbnN0IHYgPSB0aGlzLnZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IG5ldyBEYXRlKHRoaXMudmFsdWUuZ2V0VGltZSgpKSA6IG5ldyBEYXRlKCk7XHJcbiAgICB2LnNldEhvdXJzKG5ld1ZhbHVlLmdldEhvdXJzKCkpO1xyXG4gICAgdi5zZXRNaW51dGVzKG5ld1ZhbHVlLmdldE1pbnV0ZXMoKSk7XHJcbiAgICB2LnNldFNlY29uZHMoMCk7XHJcbiAgICB2LnNldE1pbGxpc2Vjb25kcygwKTtcclxuICAgIHRoaXMuY3VycmVudFZhbHVlID0gdjtcclxuICB9XHJcblxyXG4gIGhhbmRsZU9rID0gKHZhbHVlKSA9PiB7XHJcbiAgICBpZiAoIXRoaXMuY3VycmVudFZhbHVlICYmIHZhbHVlKSB7IHRoaXMuY3VycmVudFZhbHVlID0gdmFsdWU7IH1cclxuICAgIGlmICh0aGlzLm9uQ2hhbmdlRm4pIHsgdGhpcy5vbkNoYW5nZUZuKHRoaXMuY3VycmVudFZhbHVlKTsgfVxyXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuY3VycmVudFZhbHVlO1xyXG4gICAgdGhpcy5tb2RhbFJlZi5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2FuY2VsID0gKCkgPT4ge1xyXG4gICAgdGhpcy5tb2RhbFJlZi5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmlzQWxpdmUubmV4dCgpO1xyXG4gICAgdGhpcy5pc0FsaXZlLmNvbXBsZXRlKCk7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcclxuICAgICAgdGhpcy5mbS5zdG9wTW9uaXRvcmluZyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKCkpO1xyXG4gIH1cclxufVxyXG4iXX0=