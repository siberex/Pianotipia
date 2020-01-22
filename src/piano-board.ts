import {
    customElement,
    html,
    property,
    LitElement,
} from 'lit-element';

@customElement('piano-board')
export class PianoBoard extends LitElement {
    /**
     * Number of keys on keyboard.
     */
    @property()
    numKeys = 88;

    render() {
        return html`<div></div>`;
    }
}
