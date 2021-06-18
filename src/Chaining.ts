class QueryBuilder {
    private collection: string;
    private pageNumber: number = 1;
    private itemsPerPage: number = 100;
    private orderByFields: string[] = [];

    from(collection: string): void {
        this.collection = collection;
    }

    page(number: number, itemsPerPage: number = 100): void {
        this.pageNumber = number;
        this.itemsPerPage = itemsPerPage;
    }

    orderBy(...fields: string[]): void {
        this.orderByFields = fields;
    }

    build()/*: Query*/ {
        // ...
    }
}

// ...

const queryBuilder = new QueryBuilder();
queryBuilder.from('users');
queryBuilder.page(1, 100);
queryBuilder.orderBy('firstName', 'lastName');

const query = queryBuilder.build();