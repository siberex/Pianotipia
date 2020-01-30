import {css, customElement, html, property, LitElement} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';

export const enum KeyName {
    C,
    Db,
    D,
    Eb,
    E,
    F,
    Gb,
    G,
    Ab,
    A,
    Bb,
    B,
}

const indexMap: Map<KeyName, Array<string>> = new Map([
    [KeyName.C, ['c', 'b#', 'b♯', 'bs']],
    [KeyName.Db, ['d♭', 'c♯', 'cs', 'c#', 'db']],
    [KeyName.D, ['d']],
    [KeyName.Eb, ['e♭', 'd♯', 'ds', 'd#', 'eb']],
    [KeyName.E, ['e', 'fb', 'f♭']],
    [KeyName.F, ['f', 'e#', 'e♯', 'es']],
    [KeyName.Gb, ['g♭', 'f♯', 'fs', 'f#', 'gb']],
    [KeyName.G, ['g']],
    [KeyName.Ab, ['a♭', 'g♯', 'gs', 'g#', 'ab']],
    [KeyName.A, ['a']],
    [KeyName.Bb, ['b♭', 'a♯', 'as', 'a#', 'bb']],
    [KeyName.B, ['b', 'cb', 'c♭']],
]);

const blackKeysMap: Map<KeyName, boolean> = new Map([
    [KeyName.Db, true],
    [KeyName.Eb, true],
    [KeyName.Gb, true],
    [KeyName.Ab, true],
    [KeyName.Bb, true],
]);

/**
 * Normalize key index within octave (-5 → 0, 13 → 1, 4 → 4)
 *
 * @fixme add unit tests
 * @param index
 */
export function normalizeIndex(index: number): KeyName {
    const indexList = [...Array(12).keys()];
    if (index < 0) {
        return KeyName.C;
    }
    return indexList[index % 12];
}

/**
 * Normalize key name and return it’s index within octave:
 * 'd#' → 3, 'Ab' → 8, 'D4' → 2, 'b♭' → 10, 'F♯2' → 5, 'z GB.' → 6
 *
 * @fixme add unit tests
 * @param note
 */
export function fromName(note: string): KeyName | undefined {
    const disallowedChars = new RegExp('[^a-g♭s♯#]');

    const noteMap: Record<string, KeyName> = {};

    for (const [keyIndex, keyNames] of indexMap) {
        keyNames.map(v => {
            noteMap[v] = keyIndex;
        });
    }

    const normalizedInput = note
        .toString()
        .normalize('NFC')
        .trim()
        .toLowerCase()
        .replace(disallowedChars, '')
        .substring(0, 2);

    return noteMap[normalizedInput];
}

/**
 * Convert key index within octave to key name
 *
 * @fixme add unit tests
 * @param key
 */
export function toName(key: KeyName): string {
    const names = indexMap.get(key);
    return names && names.length ? names[0].toUpperCase() : '';
}

export interface Key {
    index: KeyName;
    pressed?: boolean;
    standalone?: boolean;
}

@customElement('piano-key')
export class PianoKey extends LitElement implements Key {
    @property({
        type: Number,
        converter: {
            fromAttribute: (value: string) => fromName(value),
            toAttribute: (value: KeyName) => toName(value),
        },
        attribute: 'name',
    })
    index = KeyName.C;

    @property({type: Boolean})
    pressed = false;

    /**
     * Flag to render stand-alone full-size white keys, located at the end of the keyboard.
     * Or, in rare cases, at the start of it (like on Yamaha P-121, Casio WK-6600 or Nord Stage 3 Compact).
     */
    @property({type: Boolean})
    standalone = false;

    constructor() {
        super();

        this.index = 0;
    }

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
            letter-spacing: -3px;
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
        const classes = {
            pressed: this.pressed,
            standalone: this.standalone,
            black: false,
        };

        if (blackKeysMap.has(this.index)) {
            classes['black'] = true;
        }

        return html`
            <div class=${classMap(classes)}>
                <span>${toName(this.index)}</span>
            </div>
        `;
    }
}
