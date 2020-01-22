import {
    customElement,
    html,
    property,
    LitElement,
} from 'lit-element';
import {PianoKey} from './piano-key';

@customElement('piano-board')
export class PianoBoard extends LitElement {
    /**
     * Number of keys on keyboard.
     */
    @property()
    numKeys = 88;

    render() {
        return html`<piano-key></piano-key>`;
    }
}
