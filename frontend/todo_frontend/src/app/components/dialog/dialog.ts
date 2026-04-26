import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    standalone: true,
    selector: 'app-dialog',
    imports: [MatDialogContent, MatDialogActions],
    templateUrl: './dialog.html',
    styleUrl: './dialog.css',
})
export class Dialog {
    constructor(private dialogRef: MatDialogRef<Dialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}
