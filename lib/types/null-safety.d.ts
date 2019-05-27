declare type Getter<TSource, TResult> = (source: TSource) => TResult;
/**
 * プロパティへの`null-safety`かつ`undefined-safety`かつ`type-safety`かつ連続的
 * なアクセスをサポートするクラスです。ただし、適切なジェネリック型変数を得るた
 * めに、TypeScriptのコンパイラーオプション（`strict`もしくは少なくとも`strictNullChecks`）
 * を指定する必要があります。
 * @example
 * const title = NullSafety.start(new JSDOM(html).window.document)
 *   .next(o => o.querySelector('#title'))
 *   .next(o => o.textContent, 'title-unfetched')
 *   .result();
 */
export default class NullSafety<TSource> {
    static start<TSource>(source: TSource | null | undefined): NullSafety<TSource>;
    private source;
    constructor(source: TSource | null | undefined);
    /**
     * 与えられたGetter関数を使って元の値から次の値を取得し、次の`NullSafety`イン
     * スタンスを作成します。ただし、元の値が`undefined`もしくは`null`の場合には
     * 元の値をそのまま次の値とします。また、元の値もしくは次の値が`undefined`も
     * しくは`null`である場合、代替の値`altResult`が指定されていればその値を次の
     * 値とします。
     */
    next<TResult>(getter: Getter<TSource, TResult | null | undefined>, altResult?: TResult): NullSafety<TResult>;
    /**
     * 与えられたGetter関数を使って元の値から次の値を取得し、次の`NullSafety`イン
     * スタンスを作成します。`nextWithAny`においては、元の値が`undefined`もしくは
     * `null`である場合でも、それらを元の値としてGetter関数から次の値を取得としま
     * す。また、元の値もしくは次の値が`undefined`もしくは`null`である場合、代替
     * の値`altResult`が指定されていればその値を次の値とします。
     */
    nextWithAny<TResult>(getter: Getter<TSource | null | undefined, TResult | null | undefined>, altResult?: TResult): NullSafety<TResult>;
    /**
     * 保持している値を返します
     */
    result(): TSource | null | undefined;
    /**
     * 保持している値を返します。ただし、値が`null`または`undefined`の場合には、
     * 与えられた代替の値`altResult`を返します。
     */
    resultAlty(altResult: TSource): TSource;
}
export {};
