import {
    customElement,
    html,
    property,
    LitElement,
} from 'lit-element';
import {Key, KeyName} from './piano-key';

export interface Octave {
    index: number;
    start: number;
    length: number;
    keys: Key[];
}

@customElement('piano-octave')
export class PianoOctave extends LitElement implements Octave {

    /**
     * Octave position on the keyboard.
     */
    @property({type: Number})
    index = 0;

    /**
     * Starting note of octave (provided as key index).
     * Indices are starting at 0 (note C).
     * To start octave at Gb, start = 6.
     */
    @property({type: Number})
    start = 0;

    /**
     * Number of key in the octave (12 by default).
     */
    @property({type: Number})
    length = 12;

    @property({type: Array})
    keys: Key[];

    constructor() {
        super();

        // Sanity checks
        if (this.index < 0) {
            this.index = 0;
        }

        if (this.start >= this.length || this.start < 0) {
            this.start = 0;
        }

        if (this.length < 0 || this.length > 12) {
            this.length = 0;
        }


        this.keys = [...Array(this.length).keys()].map(
            i => ({
                name: KeyName[i + this.start % this.length],
                pressed: false
            })
        );
    }

    render() {
        return html`<piano-key></piano-key>`;
    }
}
