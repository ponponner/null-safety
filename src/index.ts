type Getter<TSource, TResult> = (source: TSource) => TResult;

// Notice:
//   引数`source`やメンバ`promise`の型について`null`共用型になっている部分があるのは、
// 前のノードから得られる値が`null`であった場合それをそのまま今のノードの値として渡す
// ことがあるため。
export default class NullSafe<TSource> {
  public static start<TSource>(source: TSource): NullSafe<TSource> {
    return new NullSafe(source);
  }

  private source: TSource | null;

  public constructor(source: TSource | null) {
    this.source = source;
  }

  /**
   * 次の値をもつ`NullSafe`オブジェクトを返します。ただし、元の値が`null`もしく
   * は`undefined`の場合には、次の値の取得をスキップし、代わりに`null`を格納し
   * て返します。
   */
  public next<TResult>(
    getter: Getter<TSource, TResult | undefined | null>,
    altResult?: TResult
  ): NullSafe<TResult> {
    // 次の値を取得する
    const result: TResult | undefined | null =
      this.source === null ? null : getter(this.source);
    // 次の値をチェックする
    let checkedResult: TResult | null = result === undefined ? null : result;
    if (checkedResult === null) {
      if (this.source !== null) {
        console.trace('値の取得に失敗しました。');
      }
      if (altResult !== undefined) {
        checkedResult = altResult;
      }
    }
    // 値をNullSafeにラップする
    return new NullSafe<TResult>(checkedResult);
  }
  /**
   * 次の値をもつ`NullSafe`オブジェクトを返します。ただし、元の値が`null`もしく
   * は`undefined`の場合でも、次の値の取得を行います。
   */
  public nextWithAny<TResult>(
    getter: Getter<TSource | null, TResult | undefined | null>,
    altResult?: TResult
  ): NullSafe<TResult> {
    // 次の値を取得する
    const result: TResult | undefined | null = getter(this.source);
    // 次の値をチェックする
    let checkedResult: TResult | null = result === undefined ? null : result;
    if (checkedResult === null) {
      if (this.source !== null) {
        console.trace('値の取得に失敗しました。');
      }
      if (altResult !== undefined) {
        checkedResult = altResult;
      }
    }
    // 値をNullSafeにラップする
    return new NullSafe<TResult>(checkedResult);
  }

  public result(): TSource | null {
    return this.source;
  }
  public resultAlty(altResult: TSource): TSource {
    if (this.source != null) {
      return this.source;
    } else {
      return altResult;
    }
  }
}
