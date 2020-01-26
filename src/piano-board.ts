import {
    customElement,
    html,
    property,
    LitElement,
    TemplateResult,
} from 'lit-element';
import "./piano-octave";

@customElement('piano-board')
export class PianoBoard extends LitElement {

    /**
     * Number of keys on the keyboard.
     */
    @property({type: Number})
    numKeys = 88;

    /**
     * Number of octaves on the keyboard.
     */
    @property({type: Number})
    numOctaves = 0;

    constructor() {
        super();

        if (this.numOctaves <= 0) {
            this.numOctaves = Math.round(this.numKeys / 12);
        }
    }

    render() {
        // noinspection JSMismatchedCollectionQueryUpdate
        const octaves: TemplateResult[] = [];
        for (let i = 0; i < this.numOctaves; i++) {
            octaves.push(html`<piano-octave .index=${i}></piano-octave>`);
        }

        return html`<div>${octaves}</div>`;
    }
}
