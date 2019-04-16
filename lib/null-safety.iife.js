var RollupTypeScriptBabel = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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
  var NullSafety =
  /*#__PURE__*/
  function () {
    function NullSafety(source) {
      _classCallCheck(this, NullSafety);

      this.source = source;
    }

    _createClass(NullSafety, [{
      key: "next",

      /**
       * 与えられたGetter関数を使って元の値から次の値を取得し、次の`NullSafety`イン
       * スタンスを作成します。ただし、元の値が`undefined`もしくは`null`の場合には
       * 元の値をそのまま次の値とします。また、元の値もしくは次の値が`undefined`も
       * しくは`null`である場合、代替の値`altResult`が指定されていればその値を次の
       * 値とします。
       */
      value: function next(getter, altResult) {
        // Getter関数から次の値を取得する
        var result;
        result = this.source === undefined || this.source === null ? this.source : getter(this.source); // 場合によっては代替の値を次の値とする

        if ((result === undefined || result === null) && altResult !== undefined) {
          result = altResult;
        } // 次の値を`NullSafety`にラップして返す


        return new NullSafety(result);
      }
      /**
       * 与えられたGetter関数を使って元の値から次の値を取得し、次の`NullSafety`イン
       * スタンスを作成します。`nextWithAny`においては、元の値が`undefined`もしくは
       * `null`である場合でも、それらを元の値としてGetter関数から次の値を取得としま
       * す。また、元の値もしくは次の値が`undefined`もしくは`null`である場合、代替
       * の値`altResult`が指定されていればその値を次の値とします。
       */

    }, {
      key: "nextWithAny",
      value: function nextWithAny(getter, altResult) {
        // Getter関数から次の値を取得する
        var result;
        result = getter(this.source); // 場合によっては代替の値を次の値とする

        if ((result === undefined || result === null) && altResult !== undefined) {
          result = altResult;
        } // 次の値を`NullSafety`にラップして返す


        return new NullSafety(result);
      }
      /**
       * 保持している値を返します
       */

    }, {
      key: "result",
      value: function result() {
        return this.source;
      }
      /**
       * 保持している値を返します。ただし、値が`null`または`undefined`の場合には、
       * 与えられた代替の値`altResult`を返します。
       */

    }, {
      key: "resultAlty",
      value: function resultAlty(altResult) {
        if (this.source !== null && this.source !== undefined) {
          return this.source;
        } else {
          return altResult;
        }
      }
    }], [{
      key: "start",
      value: function start(source) {
        return new NullSafety(source);
      }
    }]);

    return NullSafety;
  }();

  exports.NullSafety = NullSafety;

  return exports;

}({}));
