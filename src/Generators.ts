function fibonacci(n: number): number[] {
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const items: number[] = [0, 1];
    while (items.length < n) {
        items.push(items[items.length - 2] + items[items.length - 1]);
    }

    return items;
}

function printFib(n: number) {
    fibonacci(n).forEach(fib => console.log(fib));
}

// Print first 10 Fibonacci numbers.
printFib(10);

// TODO function* fibonacci(): IterableIterator<number>
 // todo for <n

// TODO itiriri(fibonacci())
//   .take(10)
//   .forEach(fib => console.log(fib));