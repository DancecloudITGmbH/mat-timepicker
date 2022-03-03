import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock/clock.component';
import { MatTimepickerComponentDialogComponent } from './timepicker-dialog/timepicker-dialog.component';
import { MatTimepickerDirective } from './timepicker.directive';
import * as i0 from "@angular/core";
export class MatTimepickerModule {
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MatTimepickerModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MatTimepickerModule, { declarations: [ClockComponent,
        MatTimepickerDirective,
        MatTimepickerComponentDialogComponent], imports: [CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule], exports: [MatTimepickerDirective] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXRpbWVwaWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0LXRpbWVwaWNrZXIvc3JjL2xpYi9tYXQtdGltZXBpY2tlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN4RyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUF1QmhFLE1BQU0sT0FBTyxtQkFBbUI7O3NGQUFuQixtQkFBbUI7cUVBQW5CLG1CQUFtQjt5RUFmckI7WUFDUCxZQUFZO1lBQ1osZUFBZTtZQUNmLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGNBQWM7U0FDZjt1RkFRVSxtQkFBbUI7Y0FyQi9CLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxzQkFBc0I7b0JBQ3RCLHFDQUFxQztpQkFDdEM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixjQUFjO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxzQkFBc0I7aUJBQ3ZCO2dCQUNELGVBQWUsRUFBRTtvQkFDZixxQ0FBcUM7aUJBQ3RDO2FBQ0Y7O3dGQUNZLG1CQUFtQixtQkFuQjVCLGNBQWM7UUFDZCxzQkFBc0I7UUFDdEIscUNBQXFDLGFBR3JDLFlBQVk7UUFDWixlQUFlO1FBQ2YsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixhQUFhO1FBQ2IsY0FBYyxhQUdkLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE1hdFRvb2xiYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcclxuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xyXG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcclxuXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENsb2NrQ29tcG9uZW50IH0gZnJvbSAnLi9jbG9jay9jbG9jay5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRUaW1lcGlja2VyQ29tcG9uZW50RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLWRpYWxvZy90aW1lcGlja2VyLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRUaW1lcGlja2VyRGlyZWN0aXZlIH0gZnJvbSAnLi90aW1lcGlja2VyLmRpcmVjdGl2ZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQ2xvY2tDb21wb25lbnQsXHJcbiAgICBNYXRUaW1lcGlja2VyRGlyZWN0aXZlLFxyXG4gICAgTWF0VGltZXBpY2tlckNvbXBvbmVudERpYWxvZ0NvbXBvbmVudFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTWF0VGltZXBpY2tlckRpcmVjdGl2ZVxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBNYXRUaW1lcGlja2VyQ29tcG9uZW50RGlhbG9nQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0VGltZXBpY2tlck1vZHVsZSB7IH1cclxuIl19