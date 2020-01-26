import {
    customElement,
    html,
    property,
    LitElement,
} from 'lit-element';

export enum KeyName {C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B}

export interface Key {
    name: string;
    pressed: boolean;
}

@customElement('piano-key')
export class PianoKey extends LitElement implements Key {

    @property({type: String})
    name = 'C';

    @property({type: Boolean})
    pressed = false;

    render() {
        return html`<strong>${this.name}</strong>`;
    }
}
