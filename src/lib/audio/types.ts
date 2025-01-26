export interface Notes {
    [key: string]: number;
}

export interface BeatPattern {
    kick: boolean;
    snare: boolean;
    hiHat: boolean;
}

export interface MusicGeneratorOptions {
    tempo?: number;
    flag?: number;
    masterVolume?: number;
    attackTime?: number;
    sustainLevel?: number;
    releaseTime?: number;
    noteLength?: number;
    vibratoSpeed?: number;
    vibratoAmount?: number;
    waveform?: OscillatorType;
}
