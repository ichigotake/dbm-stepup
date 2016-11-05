import { Component } from '@angular/core';
import { MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-changelog-dialog',
  templateUrl: './changelog-dialog.component.html',
  styleUrls: ['./changelog-dialog.component.css'],
})
export class ChangelogDialog {
  constructor(public dialogRef: MdDialogRef<ChangelogDialog>) { }
}