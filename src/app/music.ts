
export class Music {
    level: number;
    folder: string;
    title: string;

    constructor(level: number, folder: string, title: string) {
        this.folder = folder;
        this.level = level;
        this.title = title;
    }
}

export class MusicFilter {
  level = MusicLevel.ALL;
  folder = FolderFilter.ALL;
}

export class MusicLevel {
  static fetch(value: String) {
    if (value === "all") {
      return MusicLevel.ALL;
    }
    let v = +value;
    for (var i in MusicLevel.LIST) {
      let level = MusicLevel.LIST[i];
      if (v === level) {
        return level;
      }
    }
    return null;
  }
}

type MusicLevelValue = "all" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export namespace MusicLevel {
  export const ALL: MusicLevelValue = "all";
  export const LEVEL_1: MusicLevelValue = 1;
  export const LEVEL_2: MusicLevelValue = 2;
  export const LEVEL_3: MusicLevelValue = 3;
  export const LEVEL_4: MusicLevelValue = 4;
  export const LEVEL_5: MusicLevelValue = 5;
  export const LEVEL_6: MusicLevelValue = 6;
  export const LEVEL_7: MusicLevelValue = 7;
  export const LEVEL_8: MusicLevelValue = 8;
  export const LEVEL_9: MusicLevelValue = 9;
  export const LEVEL_10: MusicLevelValue = 10;
  export const LEVEL_11: MusicLevelValue = 11;
  export const LEVEL_12: MusicLevelValue = 12;
  export const LIST = [
    ALL,
    LEVEL_1,
    LEVEL_2,
    LEVEL_3,
    LEVEL_4,
    LEVEL_5,
    LEVEL_6,
    LEVEL_7,
    LEVEL_8,
    LEVEL_9,
    LEVEL_10,
    LEVEL_11,
    LEVEL_12,
  ];
}

export class FolderFilter {
  static fetch(value: String) {
    if (value === "all") {
      return FolderFilter.ALL;
    }
    for (var i in FolderFilter.LIST) {
      let folder = FolderFilter.LIST[i];
      if (value === folder) {
        return folder;
      }
    }
   return null;
  }
}
type FolderValue = "all" | "-" | "F" | "E" | "D" | "C" | "B" | "A";
export namespace FolderFilter {
  export const ALL: FolderValue = "all";
  export const FOLDER_NONE: FolderValue = "-";
  export const FOLDER_F: FolderValue = "F";
  export const FOLDER_E: FolderValue = "E";
  export const FOLDER_D: FolderValue = "D";
  export const FOLDER_C: FolderValue = "C";
  export const FOLDER_B: FolderValue = "B";
  export const FOLDER_A: FolderValue = "A";
  export const LIST = [
    FOLDER_NONE,
    FOLDER_F,
    FOLDER_E,
    FOLDER_D,
    FOLDER_C,
    FOLDER_B,
    FOLDER_A,
  ];
}
