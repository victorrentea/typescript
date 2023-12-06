class QueryBuilder {
    constructor() {
        this.pageNumber = 1;
        this.itemsPerPage = 100;
        this.orderByFields = [];
    }
    from(collection) {
        this.collection = collection;
        return this;
    }
    page(number, itemsPerPage = 100) {
        this.pageNumber = number;
        this.itemsPerPage = itemsPerPage;
        return this;
    }
    orderBy(...fields) {
        this.orderByFields = fields;
        return this;
    }
    build() {
        // ...
    }
}
// ...
const queryBuilder = new QueryBuilder();
function ff(queryBuilder) {
    queryBuilder.from('users')
        .page(1, 100)
        .orderBy('firstName', 'lastName');
}
ff(queryBuilder);
const query = queryBuilder.build();
