import {
    css,
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
    pressed: string[];
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
     * @fixme change to string
     */
    @property({type: Number})
    start = 0;

    /**
     * Number of keys in the octave (12 by default).
     */
    @property({type: Number})
    length = 12;

    @property({type: Array})
    pressed: string[] = [];

    @property({attribute: false})
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

        // @fixme normalize names
        const pressedMap: Map<string, boolean> = new Map( this.pressed.map(v => [v, true]) );

        this.keys = [...Array(this.length).keys()].map(i => {
            const name = KeyName[i + this.start % 12];
            const key: Key = {name};
            if (this.length == 1) {
                key.standalone = true;
            }
            if ( pressedMap.has(name) ) {
                key.pressed = true;
            }
            return key;
        });
    }


    static styles = css`
        :host {
            display: inline-block;
            margin-top: 10px;
        }
        span {
            position: absolute;            
            font-size: 10px;
            margin-left: 2px;
        }
    `;

    render() {
        return html`
            <span>${this.index + 1}</span>
            ${repeat(this.keys, (key: Key) => key.name, (key: Key) => html`
                <piano-key name=${key.name} ?pressed=${key.pressed as boolean} ?standalone=${key.standalone as boolean}></piano-key>
            `)}
        `;
    }
}
