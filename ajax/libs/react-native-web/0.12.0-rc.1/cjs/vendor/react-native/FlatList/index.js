/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

var _deepDiffer = _interopRequireDefault(require("../deepDiffer"));

var React = _interopRequireWildcard(require("react"));

var _StyleSheet = _interopRequireDefault(require("../../../exports/StyleSheet"));

var _View = _interopRequireDefault(require("../../../exports/View"));

var _VirtualizedList = _interopRequireDefault(require("../VirtualizedList"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = _objectSpread({}, _VirtualizedList.default.defaultProps, {
  numColumns: 1,

  /**
   * Enabling this prop on Android greatly improves scrolling performance with no known issues.
   * The alternative is that scrolling on Android is unusably bad. Enabling it on iOS has a few
   * known issues.
   */
  removeClippedSubviews: false
});

/**
 * A performant interface for rendering simple, flat lists, supporting the most handy features:
 *
 *  - Fully cross-platform.
 *  - Optional horizontal mode.
 *  - Configurable viewability callbacks.
 *  - Header support.
 *  - Footer support.
 *  - Separator support.
 *  - Pull to Refresh.
 *  - Scroll loading.
 *  - ScrollToIndex support.
 *
 * If you need section support, use [`<SectionList>`](docs/sectionlist.html).
 *
 * Minimal Example:
 *
 *     <FlatList
 *       data={[{key: 'a'}, {key: 'b'}]}
 *       renderItem={({item}) => <Text>{item.key}</Text>}
 *     />
 *
 * More complex, multi-select example demonstrating `PureComponent` usage for perf optimization and avoiding bugs.
 *
 * - By binding the `onPressItem` handler, the props will remain `===` and `PureComponent` will
 *   prevent wasteful re-renders unless the actual `id`, `selected`, or `title` props change, even
 *   if the components rendered in `MyListItem` did not have such optimizations.
 * - By passing `extraData={this.state}` to `FlatList` we make sure `FlatList` itself will re-render
 *   when the `state.selected` changes. Without setting this prop, `FlatList` would not know it
 *   needs to re-render any items because it is also a `PureComponent` and the prop comparison will
 *   not show any changes.
 * - `keyExtractor` tells the list to use the `id`s for the react keys instead of the default `key` property.
 *
 *
 *     class MyListItem extends React.PureComponent {
 *       _onPress = () => {
 *         this.props.onPressItem(this.props.id);
 *       };
 *
 *       render() {
 *         const textColor = this.props.selected ? "red" : "black";
 *         return (
 *           <TouchableOpacity onPress={this._onPress}>
 *             <View>
 *               <Text style={{ color: textColor }}>
 *                 {this.props.title}
 *               </Text>
 *             </View>
 *           </TouchableOpacity>
 *         );
 *       }
 *     }
 *
 *     class MultiSelectList extends React.PureComponent {
 *       state = {selected: (new Map(): Map<string, boolean>)};
 *
 *       _keyExtractor = (item, index) => item.id;
 *
 *       _onPressItem = (id: string) => {
 *         // updater functions are preferred for transactional updates
 *         this.setState((state) => {
 *           // copy the map rather than modifying state.
 *           const selected = new Map(state.selected);
 *           selected.set(id, !selected.get(id)); // toggle
 *           return {selected};
 *         });
 *       };
 *
 *       _renderItem = ({item}) => (
 *         <MyListItem
 *           id={item.id}
 *           onPressItem={this._onPressItem}
 *           selected={!!this.state.selected.get(item.id)}
 *           title={item.title}
 *         />
 *       );
 *
 *       render() {
 *         return (
 *           <FlatList
 *             data={this.props.data}
 *             extraData={this.state}
 *             keyExtractor={this._keyExtractor}
 *             renderItem={this._renderItem}
 *           />
 *         );
 *       }
 *     }
 *
 * This is a convenience wrapper around [`<VirtualizedList>`](docs/virtualizedlist.html),
 * and thus inherits its props (as well as those of `ScrollView`) that aren't explicitly listed
 * here, along with the following caveats:
 *
 * - Internal state is not preserved when content scrolls out of the render window. Make sure all
 *   your data is captured in the item data or external stores like Flux, Redux, or Relay.
 * - This is a `PureComponent` which means that it will not re-render if `props` remain shallow-
 *   equal. Make sure that everything your `renderItem` function depends on is passed as a prop
 *   (e.g. `extraData`) that is not `===` after updates, otherwise your UI may not update on
 *   changes. This includes the `data` prop and parent component state.
 * - In order to constrain memory and enable smooth scrolling, content is rendered asynchronously
 *   offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see
 *   blank content. This is a tradeoff that can be adjusted to suit the needs of each application,
 *   and we are working on improving it behind the scenes.
 * - By default, the list looks for a `key` prop on each item and uses that for the React key.
 *   Alternatively, you can provide a custom `keyExtractor` prop.
 *
 * Also inherits [ScrollView Props](docs/scrollview.html#props), unless it is nested in another FlatList of same orientation.
 */
var FlatList =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(FlatList, _React$PureComponent);

  var _proto = FlatList.prototype;

  /**
   * Scrolls to the end of the content. May be janky without `getItemLayout` prop.
   */
  _proto.scrollToEnd = function scrollToEnd(params) {
    if (this._listRef) {
      this._listRef.scrollToEnd(params);
    }
  }
  /**
   * Scrolls to the item at the specified index such that it is positioned in the viewable area
   * such that `viewPosition` 0 places it at the top, 1 at the bottom, and 0.5 centered in the
   * middle. `viewOffset` is a fixed number of pixels to offset the final target position.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  ;

  _proto.scrollToIndex = function scrollToIndex(params) {
    if (this._listRef) {
      this._listRef.scrollToIndex(params);
    }
  }
  /**
   * Requires linear scan through data - use `scrollToIndex` instead if possible.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  ;

  _proto.scrollToItem = function scrollToItem(params) {
    if (this._listRef) {
      this._listRef.scrollToItem(params);
    }
  }
  /**
   * Scroll to a specific content pixel offset in the list.
   *
   * Check out [scrollToOffset](docs/virtualizedlist.html#scrolltooffset) of VirtualizedList
   */
  ;

  _proto.scrollToOffset = function scrollToOffset(params) {
    if (this._listRef) {
      this._listRef.scrollToOffset(params);
    }
  }
  /**
   * Tells the list an interaction has occurred, which should trigger viewability calculations, e.g.
   * if `waitForInteractions` is true and the user has not scrolled. This is typically called by
   * taps on items or by navigation actions.
   */
  ;

  _proto.recordInteraction = function recordInteraction() {
    if (this._listRef) {
      this._listRef.recordInteraction();
    }
  }
  /**
   * Displays the scroll indicators momentarily.
   *
   * @platform ios
   */
  ;

  _proto.flashScrollIndicators = function flashScrollIndicators() {
    if (this._listRef) {
      this._listRef.flashScrollIndicators();
    }
  }
  /**
   * Provides a handle to the underlying scroll responder.
   */
  ;

  _proto.getScrollResponder = function getScrollResponder() {
    if (this._listRef) {
      return this._listRef.getScrollResponder();
    }
  };

  _proto.getScrollableNode = function getScrollableNode() {
    if (this._listRef) {
      return this._listRef.getScrollableNode();
    }
  };

  _proto.setNativeProps = function setNativeProps(props) {
    if (this._listRef) {
      this._listRef.setNativeProps(props);
    }
  };

  function FlatList(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this._virtualizedListPairs = [];

    _this._captureRef = function (ref) {
      _this._listRef = ref;
    };

    _this._getItem = function (data, index) {
      var numColumns = _this.props.numColumns;

      if (numColumns > 1) {
        var ret = [];

        for (var kk = 0; kk < numColumns; kk++) {
          var _item = data[index * numColumns + kk];

          if (_item != null) {
            ret.push(_item);
          }
        }

        return ret;
      } else {
        return data[index];
      }
    };

    _this._getItemCount = function (data) {
      return data ? Math.ceil(data.length / _this.props.numColumns) : 0;
    };

    _this._keyExtractor = function (items, index) {
      var _this$props = _this.props,
          keyExtractor = _this$props.keyExtractor,
          numColumns = _this$props.numColumns;

      if (numColumns > 1) {
        (0, _invariant.default)(Array.isArray(items), 'FlatList: Encountered internal consistency error, expected each item to consist of an ' + 'array with 1-%s columns; instead, received a single item.', numColumns);
        return items.map(function (it, kk) {
          return keyExtractor(it, index * numColumns + kk);
        }).join(':');
      } else {
        /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
         * error found when Flow v0.63 was deployed. To see the error delete this
         * comment and run Flow. */
        return keyExtractor(items, index);
      }
    };

    _this._renderItem = function (info) {
      var _this$props2 = _this.props,
          renderItem = _this$props2.renderItem,
          numColumns = _this$props2.numColumns,
          columnWrapperStyle = _this$props2.columnWrapperStyle;

      if (numColumns > 1) {
        var _item2 = info.item,
            _index = info.index;
        (0, _invariant.default)(Array.isArray(_item2), 'Expected array of items with numColumns > 1');
        return React.createElement(_View.default, {
          style: _StyleSheet.default.compose(styles.row, columnWrapperStyle)
        }, _item2.map(function (it, kk) {
          var element = renderItem({
            item: it,
            index: _index * numColumns + kk,
            separators: info.separators
          });
          return element != null ? React.createElement(React.Fragment, {
            key: kk
          }, element) : null;
        }));
      } else {
        return renderItem(info);
      }
    };

    _this._checkProps(_this.props);

    if (_this.props.viewabilityConfigCallbackPairs) {
      _this._virtualizedListPairs = _this.props.viewabilityConfigCallbackPairs.map(function (pair) {
        return {
          viewabilityConfig: pair.viewabilityConfig,
          onViewableItemsChanged: _this._createOnViewableItemsChanged(pair.onViewableItemsChanged)
        };
      });
    } else if (_this.props.onViewableItemsChanged) {
      /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
       * error found when Flow v0.63 was deployed. To see the error delete this
       * comment and run Flow. */
      _this._virtualizedListPairs.push({
        viewabilityConfig: _this.props.viewabilityConfig,
        onViewableItemsChanged: _this._createOnViewableItemsChanged(_this.props.onViewableItemsChanged)
      });
    }

    return _this;
  }

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    (0, _invariant.default)(prevProps.numColumns === this.props.numColumns, 'Changing numColumns on the fly is not supported. Change the key prop on FlatList when ' + 'changing the number of columns to force a fresh render of the component.');
    (0, _invariant.default)(prevProps.onViewableItemsChanged === this.props.onViewableItemsChanged, 'Changing onViewableItemsChanged on the fly is not supported');
    (0, _invariant.default)(!(0, _deepDiffer.default)(prevProps.viewabilityConfig, this.props.viewabilityConfig), 'Changing viewabilityConfig on the fly is not supported');
    (0, _invariant.default)(prevProps.viewabilityConfigCallbackPairs === this.props.viewabilityConfigCallbackPairs, 'Changing viewabilityConfigCallbackPairs on the fly is not supported');

    this._checkProps(this.props);
  };

  _proto._checkProps = function _checkProps(props) {
    var getItem = props.getItem,
        getItemCount = props.getItemCount,
        horizontal = props.horizontal,
        numColumns = props.numColumns,
        columnWrapperStyle = props.columnWrapperStyle,
        onViewableItemsChanged = props.onViewableItemsChanged,
        viewabilityConfigCallbackPairs = props.viewabilityConfigCallbackPairs;
    (0, _invariant.default)(!getItem && !getItemCount, 'FlatList does not support custom data formats.');

    if (numColumns > 1) {
      (0, _invariant.default)(!horizontal, 'numColumns does not support horizontal.');
    } else {
      (0, _invariant.default)(!columnWrapperStyle, 'columnWrapperStyle not supported for single column lists');
    }

    (0, _invariant.default)(!(onViewableItemsChanged && viewabilityConfigCallbackPairs), 'FlatList does not support setting both onViewableItemsChanged and ' + 'viewabilityConfigCallbackPairs.');
  };

  _proto._pushMultiColumnViewable = function _pushMultiColumnViewable(arr, v) {
    var _this$props3 = this.props,
        numColumns = _this$props3.numColumns,
        keyExtractor = _this$props3.keyExtractor;
    v.item.forEach(function (item, ii) {
      (0, _invariant.default)(v.index != null, 'Missing index!');
      var index = v.index * numColumns + ii;
      arr.push(_objectSpread({}, v, {
        item: item,
        key: keyExtractor(item, index),
        index: index
      }));
    });
  };

  _proto._createOnViewableItemsChanged = function _createOnViewableItemsChanged(onViewableItemsChanged) {
    var _this2 = this;

    return function (info) {
      var numColumns = _this2.props.numColumns;

      if (onViewableItemsChanged) {
        if (numColumns > 1) {
          var changed = [];
          var viewableItems = [];
          info.viewableItems.forEach(function (v) {
            return _this2._pushMultiColumnViewable(viewableItems, v);
          });
          info.changed.forEach(function (v) {
            return _this2._pushMultiColumnViewable(changed, v);
          });
          onViewableItemsChanged({
            viewableItems: viewableItems,
            changed: changed
          });
        } else {
          onViewableItemsChanged(info);
        }
      }
    };
  };

  _proto.render = function render() {
    return React.createElement(_VirtualizedList.default, _extends({}, this.props, {
      renderItem: this._renderItem,
      getItem: this._getItem,
      getItemCount: this._getItemCount,
      keyExtractor: this._keyExtractor,
      ref: this._captureRef,
      viewabilityConfigCallbackPairs: this._virtualizedListPairs
    }));
  };

  return FlatList;
}(React.PureComponent);

FlatList.defaultProps = defaultProps;

var styles = _StyleSheet.default.create({
  row: {
    flexDirection: 'row'
  }
});

var _default = FlatList;
exports.default = _default;
module.exports = exports.default;