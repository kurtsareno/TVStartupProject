import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule], // ✅ Import required modules
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete <strong>{{ data.movieTitle }}</strong>?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
    <button mat-raised-button color="warn" (click)="onConfirm()">Delete</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </mat-dialog-actions>
  `,
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movieTitle: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}