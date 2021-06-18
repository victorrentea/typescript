bigUglyMethod(1, 5);
bigUglyMethod(2, 4);
bigUglyMethod(3, 3);
bigUglyMethod(4, 2);
bigUglyMethod(5, 1);

// TODO From my use-case #323, I call it too, to do more within:
bigUglyMethod(2, 1);


function bigUglyMethod(b: number, a: number) {

  console.log("Complex Logic 1 " + a + " and " + b);
  console.log("Complex Logic 2 " + a);
  console.log("Complex Logic 3 " + a);

  console.log("More Complex Logic " + b);
  console.log("More Complex Logic " + b);
  console.log("More Complex Logic " + b);
}

// ============== "BOSS" LEVEL: Deeply nested functions are a lot harder to break down =================


function bossLevel(stuff: boolean, fluff: boolean, tasks: Task[]) {
  let index = 0;
  let j = tasks.length;
  console.log("Logic1");
  let taskIds = [];
  if (stuff) {
    console.log("Logic2");
    if (fluff) {
      console.log("Logic3");
      for (let task of tasks) {
        console.log("Logic4: Validate " + task);
        task.running = true;

        taskIds.push(task.id);

        // TODO When **I** call this method, I want this to run HERE, too:
        // console.log("My Logic: " + task);

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
