interface R {
    x: number;
}

class One {
    private two: Two;

    constructor(two: Two) {
        this.two = two;
    }

    f(): number {
        return 2 * this.two.g({x: 3});
    }
}

const ANSWER_OF_LIFE = 42;

class Two {
    g(r: R): number {
        const b = 2;
        console.log("b=" + b);
        return 1 + b + r.x;
    }
    unknown(): void {
        console.log("b=" + ANSWER_OF_LIFE);
    }
}

console.log("WOW:" + new Two().g({x: 1}))

function badOld(t: Two) { // any stops the IDE to track types and methods/attrs bound to them
    return t.g({x: 1});
}

console.log("BAD:" + badOld(new Two()))
// TODO: Practice Refactoring
//  * How to?
//    - Right-click > Refactor
//    - Ctrl-Alt-Shift-T/^T to
//    - Keys: [Ctrl-Alt / Opt-Cmd] + [V]ariable/[M]ethod/[P]arameter/i[N]line
//  * What? // after every action undo/revert to start clean
//    - Inline[N] Variable 'b'
//    - Extract [V]ariable '1', '3 * two.g()'
//    - Extract [M]ethod 'System.out..'
//    - Inline[N] Method 'g'
//    - Extract [P]arameter '1', 'r.x()'
//    - Inline[N] Parameter 'c'
//    - Change Signature 'g': add 1 param with default as 1st arg
//    - Extract Interface 'Two'->ITwo; - Inline to Anonymous Class to destroy interface
//    - Rename 'g' -> 'h' by Shift-F6 or just edit>Alt-Enter>Rename
//    - Move Method 'g' into R
//    - Preview method/class: Ctrl-Shift-I
//    - Quickfix for->stream
//    - Change inspection severity & highlighting
//       * Download "aggressive_refactoring.xml" from https://victorrentea.ro
//       and import it in Settings>Editor>Inspections
