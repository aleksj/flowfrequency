import { BeatPattern, Notes, MusicGeneratorOptions } from './types';

export class MusicGenerator {
    private context: AudioContext;
    private masterVolume: GainNode;
    private drumBus: GainNode;
    private delay: DelayNode;
    private feedback: GainNode;
    private delayAmountGain: GainNode;
    
    private tempo: number;
    private flag: number;
    private currentNotes: number[];
    private currentNoteIndex: number;
    private isPlaying: boolean;

    // Sound parameters
    private attackTime: number;
    private sustainLevel: number;
    private releaseTime: number;
    private noteLength: number;
    private vibratoSpeed: number;
    private vibratoAmount: number;
    private waveform: OscillatorType;

    private readonly notes: Notes = {
        "C4": 261.63, "Db4": 277.18, "D4": 293.66,
        "Eb4": 311.13, "E4": 329.63, "F4": 349.23,
        "Gb4": 369.99, "G4": 392.00, "Ab4": 415.30,
        "A4": 440, "Bb4": 466.16, "B4": 493.88,
        "C5": 523.25
    };

    private readonly beatPattern: BeatPattern[] = [
        { kick: true,  snare: false, hiHat: false },
        { kick: false, snare: false, hiHat: true  },
        { kick: false, snare: true,  hiHat: false },
        { kick: false, snare: false, hiHat: true  },
        { kick: true,  snare: false, hiHat: false },
        { kick: false, snare: false, hiHat: true  },
        { kick: false, snare: true,  hiHat: false },
        { kick: false, snare: false, hiHat: true  },
    ];

    constructor(options: MusicGeneratorOptions = {}) {
        const {
            tempo = 120.0,
            flag = 3,
            masterVolume = 0.2,
            attackTime = 0.3,
            sustainLevel = 0.8,
            releaseTime = 0.3,
            noteLength = 1,
            vibratoSpeed = 10,
            vibratoAmount = 0,
            waveform = 'sine'
        } = options;

        // Initialize audio context
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Setup audio nodes
        this.masterVolume = this.context.createGain();
        this.masterVolume.connect(this.context.destination);
        this.masterVolume.gain.value = masterVolume;

        this.drumBus = this.context.createGain();
        this.drumBus.connect(this.masterVolume);
        this.drumBus.gain.value = 10.5;

        // Setup delay effect
        this.delay = this.context.createDelay();
        this.feedback = this.context.createGain();
        this.delayAmountGain = this.context.createGain();

        this.delayAmountGain.connect(this.delay);
        this.delay.connect(this.feedback);
        this.feedback.connect(this.delay);
        this.delay.connect(this.masterVolume);

        this.delay.delayTime.value = 0;
        this.delayAmountGain.gain.value = 0;
        this.feedback.gain.value = 0;

        // Initialize parameters
        this.tempo = tempo;
        this.flag = flag;
        this.attackTime = attackTime;
        this.sustainLevel = sustainLevel;
        this.releaseTime = releaseTime;
        this.noteLength = noteLength;
        this.vibratoSpeed = vibratoSpeed;
        this.vibratoAmount = vibratoAmount;
        this.waveform = waveform;

        this.currentNotes = this.getNotesByFlag(flag);
        this.currentNoteIndex = 0;
        this.isPlaying = false;
    }

    private getNotesByFlag(flag: number): number[] {
        switch (flag) {
            case 0: return [2, 5, 9, 7, 4, 7, 5, 4];
            case 1: return [2, 7, 9, 4, 7, 5, 4, 0];
            case 2: return [0, 4, 7, 9, 7, 5, 4, 2];
            default: return [2, 4, 5, 7, 9, 7, 4, 2];
        }
    }

    private getFrequency(noteIndex: number): number {
        const noteValues = Object.values(this.notes);
        return noteValues[noteIndex] || 261.63; // Default to C4
    }

    private nextNote(): void {
        this.currentNoteIndex = (this.currentNoteIndex + 1) % 8;
    }

    private playCurrentNote(): void {
        const osc = this.context.createOscillator();
        const noteGain = this.context.createGain();

        // Envelope
        noteGain.gain.setValueAtTime(0, this.context.currentTime);
        noteGain.gain.linearRampToValueAtTime(
            this.sustainLevel,
            this.context.currentTime + this.noteLength * this.attackTime
        );
        noteGain.gain.setValueAtTime(
            this.sustainLevel,
            this.context.currentTime + this.noteLength - this.noteLength * this.releaseTime
        );
        noteGain.gain.linearRampToValueAtTime(0, this.context.currentTime + this.noteLength);

        // Vibrato
        if (this.vibratoAmount > 0) {
            const lfoGain = this.context.createGain();
            lfoGain.gain.setValueAtTime(this.vibratoAmount, 0);
            lfoGain.connect(osc.frequency);

            const lfo = this.context.createOscillator();
            lfo.frequency.setValueAtTime(this.vibratoSpeed, 0);
            lfo.start(this.context.currentTime);
            lfo.stop(this.context.currentTime + this.noteLength);
            lfo.connect(lfoGain);
        }

        osc.type = this.waveform;
        const noteFrequency = this.getFrequency(this.currentNotes[this.currentNoteIndex]);
        osc.frequency.setValueAtTime(noteFrequency, 0);
        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + this.noteLength);
        osc.connect(noteGain);

        noteGain.connect(this.masterVolume);
        noteGain.connect(this.delayAmountGain);
    }

    private playBeat(stepIndex: number): void {
        const pattern = this.beatPattern[stepIndex];
        if (pattern.kick) this.playKick();
        if (pattern.snare) this.playSnare();
        if (pattern.hiHat) this.playHiHat();
    }

    private playKick(): void {
        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.frequency.setValueAtTime(150, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.context.currentTime + 0.2);

        gain.gain.setValueAtTime(1, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.3);

        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(this.drumBus);

        osc.start(this.context.currentTime);
        osc.stop(this.context.currentTime + 0.3);
    }

    private playSnare(): void {
        const bufferSize = 2 * this.context.sampleRate;
        const noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const noise = this.context.createBufferSource();
        noise.buffer = noiseBuffer;

        const snareFilter = this.context.createBiquadFilter();
        snareFilter.type = 'bandpass';
        snareFilter.frequency.value = 1800;

        const gain = this.context.createGain();
        gain.gain.setValueAtTime(1, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.2);

        noise.connect(snareFilter);
        snareFilter.connect(gain);
        gain.connect(this.drumBus);

        noise.start(this.context.currentTime);
        noise.stop(this.context.currentTime + 0.2);
    }

    private playHiHat(): void {
        const bufferSize = 2 * this.context.sampleRate;
        const noiseBuffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const noise = this.context.createBufferSource();
        noise.buffer = noiseBuffer;

        const hiHatFilter = this.context.createBiquadFilter();
        hiHatFilter.type = 'highpass';
        hiHatFilter.frequency.value = 5000;

        const gain = this.context.createGain();
        gain.gain.setValueAtTime(0.5, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.05);

        noise.connect(hiHatFilter);
        hiHatFilter.connect(gain);
        gain.connect(this.drumBus);

        noise.start(this.context.currentTime);
        noise.stop(this.context.currentTime + 0.05);
    }

    private noteLoop(): void {
        if (!this.isPlaying) return;

        const secondsPerBeat = 60.0 / this.tempo;
        this.playCurrentNote();
        this.playBeat(this.currentNoteIndex);
        this.nextNote();

        setTimeout(() => this.noteLoop(), secondsPerBeat * 1000);
    }

    // Public API
    public start(): void {
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.noteLoop();
        }
    }

    public stop(): void {
        this.isPlaying = false;
    }

    public setTempo(newTempo: number): void {
        this.tempo = newTempo;
    }

    public setFlag(newFlag: number): void {
        this.flag = newFlag;
        this.currentNotes = this.getNotesByFlag(newFlag);
    }

    // Effect controls
    public setMasterVolume(volume: number): void {
        this.masterVolume.gain.value = volume;
    }

    public setDelayAmount(amount: number): void {
        this.delayAmountGain.gain.value = amount;
    }

    public setDelayTime(time: number): void {
        this.delay.delayTime.value = time;
    }

    public setFeedback(amount: number): void {
        this.feedback.gain.value = amount;
    }

    public setWaveform(type: OscillatorType): void {
        this.waveform = type;
    }

    public setVibratoSpeed(speed: number): void {
        this.vibratoSpeed = speed;
    }

    public setVibratoAmount(amount: number): void {
        this.vibratoAmount = amount;
    }

    public setNoteLength(length: number): void {
        this.noteLength = length;
    }

    public setAttackTime(time: number): void {
        this.attackTime = time;
    }

    public setReleaseTime(time: number): void {
        this.releaseTime = time;
    }
}
