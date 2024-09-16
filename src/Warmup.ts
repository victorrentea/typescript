interface R {
    x: number;
}

class One {
    private two: Two;

    constructor(two: Two) {
        this.two = two;
    }

    f(): number {
        return 2 * this.two.g({x: 2}, "in_all_callers");
    }
}

export function h2o() {

}

export const hh2222 = (a: number, s: string, b: string) => console.log("hh")
// export const hh1111 = (a:number, s:string, b:string) => {
//     console.log("hh");
// }
h2o();
class Two {
    // BAD: breaking change! stopping clients to upgrade! to v2.0!
    // g(r: R, param: string, flag:boolean): number {

    // GOOD: non-breaking change
    g2(r: R, param: string, flag: boolean): void { // tyranny of majority
        //YES: put void: "explict is better than implicit" - Zen of Python
        //NO: let WebStorm figure it out
        // adding this still compiles return 2;
    }

    // GOOD: non-breaking change: allows smooth upgrade -> to v1.1!
    // equivalent to Java overload👇
    /** @deprecated use g2 instead */
    g(r: R, param: string, flag: boolean = false): number {
        const b = 2;
        console.log("b=" + b);
        return 1 + b + r.x;
    }
    unknown(): void {
        console.log("b=" + 987);
    }
}

new Two().g({x: 2}, "in_all_callers");

new One(new Two()).f();
new One(new Two()).f();
new One(new Two()).f();


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
