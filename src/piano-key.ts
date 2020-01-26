import {
    css,
    customElement,
    html,
    property,
    LitElement,
} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';

export enum KeyName {C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B}

const blackKeysMap: Map<string, boolean> = new Map([
    [KeyName[KeyName.Db], true],
    [KeyName[KeyName.Eb], true],
    [KeyName[KeyName.Gb], true],
    [KeyName[KeyName.Ab], true],
    [KeyName[KeyName.Bb], true],
]);

export interface Key {
    name: string;
    pressed?: boolean;
    standalone?: boolean;
}

@customElement('piano-key')
export class PianoKey extends LitElement implements Key {

    @property({type: String})
    name = KeyName[KeyName.C];

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
            display: block;
            float: left;
            position: relative;
        }
        div {
            width: 18px;
            height: 100px;
            color: black;
            background-color: white;
            border: solid 1px gray;
            z-index: 1;
        }
        .black {
            position: absolute;
            height: 50px;
            left: -9px;
            color: white;
            background-color: black;
            z-index: 2;
        }
        span {
            position: absolute;
            bottom: 2px;
            left: 0;
            right: 0;
            font-size: 10px;
            text-align: center;
        }
    `;

    render() {
        const classes = {pressed: this.pressed, standalone: this.standalone, black: false};

        if ( blackKeysMap.has(this.name) ) {
            classes['black'] = true;
        }

        return html`<div class=${classMap(classes)}><span>${this.name}</span></div>`;
    }
}
