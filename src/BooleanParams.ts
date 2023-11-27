bigUglyMethod(1, 5);
bigUglyMethod(2, 4);
bigUglyMethod(3, 3);
bigUglyMethod(4, 2);
bigUglyMethod(5, 1);

// TODO From my use-case #323, I call it too, to do more within:
bigUglyMethod323(2, 1);


function bigUglyMethod(b: number, a: number) {
  cow(a, b);
  donkey(b);
}

function bigUglyMethod323(b: number, a: number) {
  cow(a, b);
  console.log("More Complex Logic pt CR323 doar eu tre sa o rulez " + b);
  donkey(b);
}

function cow(a: number, b: number) {
  console.log("Complex Logic Cow 1 " + a + " and " + b);
  console.log("Complex Logic Cow 2 " + a);
  console.log("Complex Logic Cow 3 " + a);
}
function donkey(b: number) {
  console.log("More Complex Logic Donkey " + b);
  console.log("More Complex Logic Donkey " + b);
  console.log("More Complex Logic Donkey " + b);
}

// ============== "BOSS" LEVEL: Deeply nested functions are a lot harder to break down =================


function bossLevel(stuff: boolean, fluff: boolean, tasks: Task[]) {
  let index = 0;
  let j = tasks.length;
  console.log("Logic1");
  if (stuff) {
    console.log("Logic2");
    if (fluff) {
      console.log("Logic3");

      tasks.forEach(task => task.running = true);
      // for (let task of tasks) {
      //   task.running = true;
      // }

      // let taskIds = [];
      // tasks.forEach(task => {
      //   taskIds.push(task.id);
      // });
      const taskIds = tasks.map(task => task.id);// .filter().find().some().every();

      for (let task of tasks) {
        index++;
        console.log("Logic5 " + index + " on " + task.running);
      }
      console.log("Logic6 " + j);
      console.log("Task Ids: " + taskIds);
    } else {
      console.log("Logic7 " + tasks);
    }
  }
  console.log("Logic7");
}


class Task {
  id: number;
  running: boolean;
}
