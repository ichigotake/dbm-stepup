import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MaterialModule, MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import { HttpModule } from '@angular/http';
import { Music, MusicFilter, MusicLevel, FolderFilter } from './music';
import { MusicLoader } from './music-loader';
import { ChangelogDialog } from './changelog-dialog.component';
import '../../public/css/styles.css';

@Component({
  selector: 'app-content',
  providers: [
    MusicLoader,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app-theme.scss', './app.component.css'],
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    ChangelogDialog,
  ],
})
export class AppComponent {

  dialogRef: MdDialogRef<ChangelogDialog>;

  errorMessage: string;
  folders = ["-", "F", "E", "D", "C", "B", "A"];
  musics: Music[];
  filter: MusicFilter;

  constructor (
    private musicLoader: MusicLoader,
    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef) {
      this.filter = new MusicFilter();
    this.refresh();
  }

  changeLevel(value: string) {
    this.filter.level = MusicLevel.fetch(value);
    this.refresh();
  }

  changeFolder(value: string) {
    this.filter.folder = FolderFilter.fetch(value);
    this.refresh();
  }

  refresh() {
    this.musics = this.musicLoader.search(this.filter);
  }

  showChangelog() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ChangelogDialog, config);
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }

}
