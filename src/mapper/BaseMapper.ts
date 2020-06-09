export interface BaseMapper<S, R> {
    convert(vo: S): R;
    revert(dto: R): S;
}