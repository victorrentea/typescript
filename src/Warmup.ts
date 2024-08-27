interface R {
    x: number;
}

class One {
    private two: Two;

    constructor(two: Two) {
        this.two = two;
    }

    f(): number {
        return 2 * this.two.g({x: 3}, "a");
    }

    h(): number {
        return this.two.g({x: 3}, "a"); // 0 instead of 1 inside it
    }
}
class Two {
    private readonly MIN_DAYS_PER_WEEK = 1;

    g(r: R, name: string): number {
        const b = 2;
        this.extracted(b);
        return this.MIN_DAYS_PER_WEEK + b + r.x;
    }

    private extracted(b: number) {
        console.log("b=" + b);
    }

    unknown(): void {
        console.log("b=" + 987);
    }
}
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
//    - Remove a param by making it useless -> ALt-Enter/quick fix
//    - Change Signature 'g': add 1 param with default as 1st arg
//    - Extract Interface 'Two'->ITwo; - Inline to Anonymous Class to destroy interface
//    - Rename 'g' -> 'h' by Shift-F6 or just edit>Alt-Enter>Rename
//    - Preview method/class: Ctrl-Shift-I
//    - Quickfix for->stream
//    - Change inspection severity & highlighting
//       * Download "aggressive_refactoring.xml" from https://victorrentea.ro
//       and import it in Settings>Editor>Inspections
