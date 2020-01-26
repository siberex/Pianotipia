import {
    customElement,
    html,
    property,
    LitElement,
} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
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

        // Total number of octaves usually does not exceed 11 (for 122-key organ)
        if (this.index < 0 || this.index > 10) {
            this.index = 0;
        }

        if (this.length < 1 || this.length > 12) {
            this.length = 12;
        }

        if (this.start < 0 || this.start > 11) {
            this.start = 0;
        }

        // Octave starting at note A will contain 3 keys total
        if (this.start > 0) {
            this.length = 12 - this.start;
        }

        this.keys = [...Array(this.length).keys()].map(
            i => ({
                name: KeyName[i + this.start % 12],
                pressed: false,
                standalone: this.length == 1
            })
        );
    }

    render() {
        return html`
            ${repeat(this.keys, (key: Key) => key.name, (key: Key) => html`
                <piano-key .name=${key.name} .pressed=${key.pressed} .standalone=${key.standalone as boolean}></piano-key>
            `)}
        `;
    }
}
