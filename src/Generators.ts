function fibonacci(nn: number): number[] {
    if (nn === 1) return [1];
    if (nn === 2) return [1, 1];

    const items: number[] = [1, 1];
    while (items.length < nn) {
        items.push(items[items.length - 2] + items[items.length - 1]);
    }
    return items;
}

it('should print first 10 Fibonacci numbers', () => {
    fibonacci(10).forEach(fib => console.log(fib));
});




function* fibonacciGenerator(): IterableIterator<number> {
    let a = 1;
    let b = 1;
    for (let i = 0; i < 20; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

it('should print first 10 Fibonacci numbers - generator', () => {
    const gen = fibonacciGenerator();
    for (let i = 0; i < 30; i++) {
        console.log(gen.next().value);
    }
});
