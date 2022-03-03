import { ClockViewType, ClockMode } from './interfaces-and-types';
export declare function twoDigits(n: any): string;
export declare function addDays(date: Date, days: number): Date;
export declare function convertHoursForMode(hour: number, mode: ClockMode): {
    hour: number;
    isPm: boolean;
};
export declare function getShortestAngle(from: any, to: any): number;
export declare function isDateInRange(minDate: Date, maxDate: Date, current: Date): boolean;
export declare function isTimeInRange(minDate: Date, maxDate: Date, current: Date): boolean;
export declare function isAllowed(hour: number, minutes: number, minDate: Date, maxDate: Date, clockMode: ClockMode, selectedMeridiem?: 'AM' | 'PM'): boolean;
export declare function getIsAvailabeFn(allowed12HourMap: any, allowed24HourMap: any, mode: ClockMode): (value: number, viewType: ClockViewType, isPm: boolean, h?: number) => any;
