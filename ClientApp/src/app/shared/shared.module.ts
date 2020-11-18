import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { AllMaterialModules } from '../material-module';

@NgModule({
    imports: [
        CommonModule,
        AllMaterialModules,
        FlexLayoutModule,
    ],
    exports: [
        AllMaterialModules,
        FlexLayoutModule,
        SuccessDialogComponent,
        ErrorDialogComponent
    ],
    declarations: [SuccessDialogComponent, ErrorDialogComponent],
    entryComponents: [
        SuccessDialogComponent,
        ErrorDialogComponent
    ]
})
export class SharedModule { }
