class QueryBuilder {
    private collection: string;
    private pageNumber: number = 1;
    private itemsPerPage: number = 100;
    private orderByFields: string[] = [];

    from(collection: string): this {
        this.collection = collection;
        return this;
    }

    page(number: number, itemsPerPage: number = 100): this {
        this.pageNumber = number;
        this.itemsPerPage = itemsPerPage;
        return this;
    }

    orderBy(...fields: string[]): this {
        this.orderByFields = fields;
        return this;
    }

    build()/*: Query*/ {
        // ...
    }
}

// ...

const queryBuilder = new QueryBuilder();

function ff(queryBuilder:QueryBuilder) {
    queryBuilder.from('users')
        .page(1, 100)
        .orderBy('firstName', 'lastName');
}

ff(queryBuilder);

const query = queryBuilder.build();