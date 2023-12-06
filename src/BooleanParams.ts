bigUglyMethod(1, 5);
bigUglyMethod(2, 4);
bigUglyMethod(3, 3);
bigUglyMethod(4, 2);
bigUglyMethod(5, 1);

// TODO From my use-case #323, I call it too, to do more within:
bigUglyMethod323(2, 1);


function beforeLogic(a: number, b: number) {
    console.log("Complex Logic 1 " + a + " and " + b);
    console.log("Complex Logic 2 " + a);
    console.log("Complex Logic 3 " + a);


    console.log("Complex Logic 1 " + a + " and " + b);
    console.log("Complex Logic 2 " + a);
    console.log("Complex Logic 3 " + a);
}

function middleLogic(a: number) {
    console.log("Complex Logic 2 " + a);
    console.log("Complex Logic 3 " + a);
    console.log("Complex Logic 2 " + a);
    console.log("Complex Logic 3 " + a);
    console.log("Complex Logic 2 " + a);
    console.log("Complex Logic 3 " + a);
}

function endLogic(b: number) {
    console.log("More Complex Logic " + b);
    console.log("More Complex Logic " + b);
    console.log("More Complex Logic " + b);
    console.log("More Complex Logic " + b);
    console.log("More Complex Logic " + b);
    console.log("More Complex Logic " + b);
}

function bigUglyMethod(b: number, a: number) {
    beforeLogic(a, b);
    middleLogic(a);
    endLogic(b);
}

function bigUglyMethod323(b: number, a: number) {
    beforeLogic(a, b);
    console.log("Treaba mea1 " + a);
    middleLogic(a);
    console.log("Treaba mea2 " + a);
    endLogic(b);
}

// ============== "BOSS" LEVEL: Deeply nested functions are a lot harder to break down =================


function bossStart(tasks: Task[]) {
  console.log("Logic1");
  console.log("Logic2");
  console.log("Logic3");
  for (let task of tasks) {
    console.log("Logic4: Validate " + task);
    task.running = true;
  }
}

function bossEnd(tasks: Task[]) {
  let taskIds = tasks.map(t => t.id);
  let index = 0;
  for (let task of tasks) {
    index++;
    console.log("Logic5 " + index + " on " + task.running);
  }
  console.log("Logic6 " + tasks.length);
  console.log("Task Ids: " + taskIds);
  console.log("Logic7");
}

function bossLevelStuffFluff(tasks: Task[]) {
  bossStart(tasks);
  bossEnd(tasks);
}
function bossLevelStuffFluff323(tasks: Task[]) {
  bossStart(tasks);
  for (let task of tasks) {
      // TODO When **I** call this method, I want this to run HERE, too:
      console.log("My Logic: " + task);
  }
  bossEnd(tasks);
}

function bossLevelStuffNoFluff(tasks: Task[]) {
    console.log("Logic1");
    console.log("Logic2");
    console.log("Logic7 " + tasks);
    console.log("Logic7");
}

function bossLevelNoStuff() {
    console.log("Logic1");
    console.log("Logic7");
}


class Task {
    id: number;
    running: boolean;
}
