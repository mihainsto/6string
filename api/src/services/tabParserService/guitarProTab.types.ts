export interface GuitarProTab {
  tracks: Track[];
  tempo: number;
  tempoName: string;
}

export interface Track {
  offset: number;
  measures: Measure[];
}

export interface Measure {
  start: number;
  voices: Voice[];
}

export interface Voice {
  beats: Beat[];
}

export interface Beat {
  duration: number;
  start: number;
  notes: Note[];
}

export interface Note {
  value: number;
  string: number;
}
