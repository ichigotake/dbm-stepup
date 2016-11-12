import { Music, MusicFilter, MusicLevel, FolderFilter } from './music';
import { Level6 } from './musics/musics-level-6';
import { Level7 } from './musics/musics-level-7';

export class MusicLoader {

    musics: Music[] = []

    search(filter: MusicFilter): Music[] {
        return this.allMusic()
            .filter((music) => {
                if (filter.level == MusicLevel.ALL) {
                    return true;
                }
                return filter.level === music.level
            })
            .filter((music) => {
                if (filter.folder == FolderFilter.ALL) {
                    return true;
                }
                return filter.folder === music.folder;
            });
    }

    private allMusic(): Music[] {
        if (this.musics.length === 0) {
            this.musics = [].concat(
                new Level6().musics,
                new Level7().musics,
            );
        }
        return this.musics;
    }

}
