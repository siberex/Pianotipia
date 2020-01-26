import {
    css,
    customElement,
    html,
    property,
    LitElement,
} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';

export enum KeyName {C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B}

export interface Key {
    name: string;
    pressed?: boolean;
    standalone?: boolean;
}

@customElement('piano-key')
export class PianoKey extends LitElement implements Key {

    @property({type: String})
    name = 'C';

    @property({type: Boolean})
    pressed = false;

    /**
     * Flag to render stand-alone full-size white keys, located at the end of the keyboard.
     * Or, in rare cases, at the start of it (like on Yamaha P-121, Casio WK-6600 or Nord Stage 3 Compact).
     */
    @property({type: Boolean})
    standalone = false;

    static styles = css`
        :host {
            display: inline-block;
            width: 15px;
            height: 100px;
            border: solid 1px gray;
            font-size: 10px;
            padding: 2px;
            margin: 0;
        }
    `;

    render() {
        const classes = {pressed: this.pressed, standalone: this.standalone};

        return html`<span class=${classMap(classes)}>${this.name}</span>`;
    }
}
