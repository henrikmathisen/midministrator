export interface PagingModel<T> {
    (arg: T): T;
    size: number;
    items: Array<T>;
}
