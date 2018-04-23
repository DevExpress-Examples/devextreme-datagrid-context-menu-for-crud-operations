/*! 
* DevExtreme (Gauges)
* Version: 14.1.4
* Build date: Jun 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: https://www.devexpress.com/Support/EULAs/DevExtreme.xml
*/

"use strict";
if (!DevExpress.MOD_VIZ_GAUGES) {
    if (!DevExpress.MOD_VIZ_CORE)
        throw Error('Required module is not referenced: viz-core');
    /*! Module viz-gauges, file namespaces.js */
    (function(DX) {
        DX.viz.gauges = {__internals: {
                circularNeedles: {},
                circularMarkers: {},
                linearNeedles: {},
                linearMarkers: {}
            }};
        DX.viz.gauges.__tests = {}
    })(DevExpress);
    /*! Module viz-gauges, file factory.js */
    (function(DX, $, undefined) {
        var internals = DX.viz.gauges.__internals,
            circularNeedles = internals.circularNeedles,
            circularMarkers = internals.circularMarkers,
            linearNeedles = internals.linearNeedles,
            linearMarkers = internals.linearMarkers;
        var _String = window.String,
            _isString = DX.utils.isString;
        DX.viz.gauges.__factory = {
            createCircularValueIndicator: function(type) {
                var indicatorType = circularNeedles.RectangleNeedle;
                switch (_String(type).toLowerCase()) {
                    case'rectangleneedle':
                    case'rectangle':
                        indicatorType = circularNeedles.RectangleNeedle;
                        break;
                    case'triangleneedle':
                    case'triangle':
                        indicatorType = circularNeedles.TriangleNeedle;
                        break;
                    case'twocolorneedle':
                    case'twocolorrectangle':
                        indicatorType = circularNeedles.TwoColorRectangleNeedle;
                        break;
                    case'rangebar':
                        indicatorType = internals.CircularRangeBar;
                        break
                }
                return new indicatorType
            },
            createLinearValueIndicator: function(type) {
                var indicatorType = internals.LinearRangeBar;
                switch (_String(type).toLowerCase()) {
                    case'rectangle':
                        indicatorType = linearNeedles.RectangleNeedle;
                        break;
                    case'rhombus':
                        indicatorType = linearNeedles.RhombusNeedle;
                        break;
                    case'circle':
                        indicatorType = linearNeedles.CircleNeedle;
                        break;
                    case'rangebar':
                        indicatorType = internals.LinearRangeBar;
                        break
                }
                return new indicatorType
            },
            createCircularSubvalueIndicator: function(type) {
                var indicatorType = circularMarkers.TriangleMarker;
                switch (_String(type).toLowerCase()) {
                    case'trianglemarker':
                    case'triangle':
                        indicatorType = circularMarkers.TriangleMarker;
                        break;
                    case'textcloud':
                        indicatorType = circularMarkers.TextCloudMarker;
                        break
                }
                return new indicatorType
            },
            createLinearSubvalueIndicator: function(type) {
                var indicatorType = linearMarkers.TriangleMarker;
                switch (_String(type).toLowerCase()) {
                    case'trianglemarker':
                    case'triangle':
                        indicatorType = linearMarkers.TriangleMarker;
                        break;
                    case'textcloud':
                        indicatorType = linearMarkers.TextCloudMarker;
                        break
                }
                return new indicatorType
            },
            createCircularValueIndicatorInHardMode: function(type) {
                var indicatorType = null;
                switch (_String(type).toLowerCase()) {
                    case'rectangleneedle':
                        indicatorType = circularNeedles.RectangleNeedle;
                        break;
                    case'triangleneedle':
                        indicatorType = circularNeedles.TriangleNeedle;
                        break;
                    case'twocolorneedle':
                        indicatorType = circularNeedles.TwoColorRectangleNeedle;
                        break;
                    case'rangebar':
                        indicatorType = internals.CircularRangeBar;
                        break;
                    case'trianglemarker':
                        indicatorType = circularMarkers.TriangleMarker;
                        break;
                    case'textcloud':
                        indicatorType = circularMarkers.TextCloudMarker;
                        break
                }
                return indicatorType ? new indicatorType : null
            },
            createLinearValueIndicatorInHardMode: function(type) {
                var indicatorType = null;
                switch (_String(type).toLowerCase()) {
                    case'rectangle':
                        indicatorType = linearNeedles.RectangleNeedle;
                        break;
                    case'rhombus':
                        indicatorType = linearNeedles.RhombusNeedle;
                        break;
                    case'circle':
                        indicatorType = linearNeedles.CircleNeedle;
                        break;
                    case'rangebar':
                        indicatorType = internals.LinearRangeBar;
                        break;
                    case'trianglemarker':
                        indicatorType = linearMarkers.TriangleMarker;
                        break;
                    case'textcloud':
                        indicatorType = linearMarkers.TextCloudMarker;
                        break
                }
                return indicatorType ? new indicatorType : null
            },
            createCircularNeedle: function(type) {
                if (_isString(type))
                    switch (type.toLowerCase()) {
                        case'rectangleneedle':
                        case'rectangle':
                            return new circularNeedles.RectangleNeedle;
                        case'twocolorneedle':
                        case'twocolorrectangle':
                            return new circularNeedles.TwoColorRectangleNeedle;
                        case'triangleneedle':
                        case'triangle':
                            return new circularNeedles.TriangleNeedle;
                        case'rangebar':
                            return new internals.CircularRangeBar
                    }
                return undefined
            },
            createLinearNeedle: function(type) {
                if (_isString(type))
                    switch (type.toLowerCase()) {
                        case'rectangle':
                            return new linearNeedles.RectangleNeedle;
                        case'rhombus':
                            return new linearNeedles.RhombusNeedle;
                        case'circle':
                            return new linearNeedles.CircleNeedle;
                        case'rangebar':
                            return new internals.LinearRangeBar
                    }
                return undefined
            },
            createCircularMarker: function(type) {
                if (_isString(type))
                    switch (type.toLowerCase()) {
                        case'trianglemarker':
                        case'triangle':
                            return new circularMarkers.TriangleMarker;
                        case'textcloud':
                            return new circularMarkers.TextCloudMarker
                    }
                return undefined
            },
            createLinearMarker: function(type) {
                if (_isString(type))
                    switch (type.toLowerCase()) {
                        case'trianglemarker':
                        case'triangle':
                            return new linearMarkers.TriangleMarker;
                        case'textcloud':
                            return new linearMarkers.TextCloudMarker
                    }
                return undefined
            },
            createCircularRangeBar: function() {
                return new internals.CircularRangeBar
            },
            createLinearRangeBar: function() {
                return new internals.LinearRangeBar
            },
            createCircularScale: function() {
                return new internals.CircularScale
            },
            createLinearScale: function() {
                return new internals.LinearScale
            },
            createCircularRangeContainer: function() {
                return new internals.CircularRangeContainer
            },
            createLinearRangeContainer: function() {
                return new internals.LinearRangeContainer
            },
            createTitle: function() {
                return new internals.Title
            },
            createIndicator: function() {
                return internals.Indicator && new internals.Indicator || null
            },
            createLayoutManager: function() {
                return new internals.LayoutManager
            },
            createThemeManager: function(options) {
                return new internals.ThemeManager(options)
            },
            createTracker: function(parameters) {
                return new internals.Tracker(parameters)
            }
        };
        var _isFunction = DX.utils.isFunction,
            _String = window.String,
            _extend = $.extend;
        var _formatHelper = DX.formatHelper;
        internals.formatValue = function(value, options, extra) {
            options = options || {};
            var text = _formatHelper.format(value, options.format, options.precision),
                context;
            if (_isFunction(options.customizeText)) {
                var context = _extend({
                        value: value,
                        valueText: text
                    }, extra);
                return _String(options.customizeText.call(context, context))
            }
            return text
        };
        internals.getSampleText = function(translator, options) {
            var text1 = internals.formatValue(translator.getDomainStart(), options),
                text2 = internals.formatValue(translator.getDomainEnd(), options);
            return text1.length >= text2.length ? text1 : text2
        }
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file scale.js */
    (function(DX, $, undefined) {
        var formatHelper = DX.formatHelper;
        var getCosAndSin = DX.utils.getCosAndSin,
            normalizeAngle = DX.utils.normalizeAngle,
            convertAngleToRendererSpace = DX.utils.convertAngleToRendererSpace,
            isDefined = DX.utils.isDefined,
            isString = DX.utils.isString,
            isFunction = DX.utils.isFunction,
            isArray = DX.utils.isArray,
            isNaN = window.isNaN,
            Number = window.Number,
            String = window.String,
            max = Math.max,
            min = Math.min,
            abs = Math.abs,
            atan = Math.atan,
            acos = Math.acos,
            ceil = Math.ceil,
            $extend = $.extend,
            $map = $.map;
        var PI = Math.PI;
        var _tickProvider = DX.viz.core.tickProvider;
        function binarySearch(x, list) {
            var a = 0,
                b = list.length - 1,
                flag = list[a] - list[b] < 0,
                c,
                k = -1;
            if (list[a] === x)
                k = a;
            if (list[b] === x)
                k = b;
            while (k < 0 && a <= b) {
                c = ~~((a + b) / 2);
                if (list[c] === x)
                    k = c;
                else if (list[c] - x < 0 === flag)
                    a = c + 1;
                else
                    b = c - 1
            }
            return k
        }
        DX.viz.gauges.__internals.BaseScale = DX.Class.inherit({
            setup: function(parameters) {
                var that = this;
                DX.utils.debug.assertParam(parameters.renderer, '"renderer" is not passed');
                DX.utils.debug.assertParam(parameters.translator, '"translator" is not passed');
                DX.utils.debug.assertParam(parameters.owner, '"owner" is not passed');
                that._renderer = parameters.renderer;
                that._translator = parameters.translator;
                that._owner = parameters.owner;
                that._rootElement = that._renderer.createGroup({'class': 'dxg-scale'});
                that._majorTicks = that._renderer.createGroup({'class': 'dxg-major-ticks'}).append(that._rootElement);
                that._minorTicks = that._renderer.createGroup({'class': 'dxg-minor-ticks'}).append(that._rootElement);
                that._labels = that._renderer.createGroup({'class': 'dxg-labels'}).append(that._rootElement);
                that._options = {};
                return that
            },
            dispose: function() {
                var that = this;
                delete that._renderer;
                delete that._translator;
                delete that._owner;
                delete that._rootElement;
                delete that._majorTicks;
                delete that._minorTicks;
                delete that._labels;
                delete that._options;
                return that
            },
            init: function(options) {
                var that = this;
                $extend(true, that._options, options);
                that._options.majorTick || (that._options.majorTick = {});
                that._options.minorTick || (that._options.minorTick = {});
                if (options && options.majorTick && isDefined(options.majorTick.customTickValues))
                    that._options.majorTick.customTickValues = isArray(options.majorTick.customTickValues) ? options.majorTick.customTickValues.slice(0) : null;
                if (options && options.minorTick && isDefined(options.minorTick.customTickValues))
                    that._options.minorTick.customTickValues = isArray(options.minorTick.customTickValues) ? options.minorTick.customTickValues.slice(0) : null;
                delete that._processed;
                return that
            },
            _getCustomValues: function(values, compare) {
                var translator = this._translator,
                    result = [];
                if (isArray(values)) {
                    result = $map(values, function(x) {
                        return !isNaN(translator.translate(x)) ? Number(x) : null
                    }).sort(compare);
                    result = $map(result, function(x, i) {
                        return x !== result[i - 1] ? x : null
                    })
                }
                return result
            },
            _generateTicks: function() {
                var that = this,
                    translator = that._translator,
                    gridSpacingFactor = that._getGridSpacingFactor(),
                    majorTicksOptions = {
                        tickInterval: that._options.majorTick.tickInterval > 0 ? Number(that._options.majorTick.tickInterval) : undefined,
                        gridSpacingFactor: gridSpacingFactor.majorTicks,
                        numberMultipliers: [1, 2, 5]
                    },
                    minorTicksOptions = {
                        tickInterval: that._options.minorTick.tickInterval > 0 ? Number(that._options.minorTick.tickInterval) : undefined,
                        gridSpacingFactor: gridSpacingFactor.minorTicks,
                        numberMultipliers: [1, 2, 5]
                    };
                if (that._options.majorTick.useTicksAutoArrangement) {
                    majorTicksOptions.useTicksAutoArrangement = true;
                    majorTicksOptions.renderer = that._renderer;
                    majorTicksOptions.translator = translator;
                    majorTicksOptions.getCustomAutoArrangementStep = function(values) {
                        return that._getCuttingFactor(values.length, {
                                width: that._textWidth,
                                height: that._textHeight
                            })
                    }
                }
                var result = _tickProvider.getFullTicks(translator.getDomainStart(), translator.getDomainEnd(), that._getScreenDelta(), majorTicksOptions, minorTicksOptions);
                that = translator = majorTicksOptions = minorTicksOptions = null;
                return result
            },
            _getTicks: function() {
                var that = this,
                    options = that._options,
                    translator = that._translator,
                    compareCallback = translator.getDomainStart() < translator.getDomainEnd() ? function(x, y) {
                        return x - y
                    } : function(x, y) {
                        return y - x
                    },
                    info = that._generateTicks(),
                    majorValues,
                    minorValues,
                    customMajorValues,
                    customMinorValues,
                    list;
                majorValues = options.majorTick.showCalculatedTicks ? info.majorTicks : [];
                customMajorValues = that._getCustomValues(options.majorTick.customTickValues, compareCallback);
                customMajorValues = $map(customMajorValues, function(value) {
                    return binarySearch(value, majorValues) === -1 ? value : null
                });
                minorValues = options.minorTick.showCalculatedTicks ? info.minorTicks : [];
                minorValues = $map(minorValues, function(value) {
                    return binarySearch(value, customMajorValues) === -1 ? value : null
                });
                customMinorValues = that._getCustomValues(options.minorTick.customTickValues, compareCallback);
                list = majorValues.concat(minorValues, customMajorValues).sort(compareCallback);
                customMinorValues = $map(customMinorValues, function(value) {
                    return binarySearch(value, list) === -1 ? value : null
                });
                return {
                        major: $map(majorValues.concat(customMajorValues), function(value) {
                            return {
                                    value: value,
                                    position: translator.translate(value)
                                }
                        }),
                        minor: $map(minorValues.concat(customMinorValues), function(value) {
                            return {
                                    value: value,
                                    position: translator.translate(value)
                                }
                        })
                    }
            },
            _renderContent: function(ticks) {
                var that = this,
                    options = that._options,
                    i,
                    ii,
                    item,
                    points,
                    element,
                    textPosition,
                    textValue;
                if (that._majorTickLength && that._majorTickWidth) {
                    that._majorTicks.applySettings({fill: isString(options.majorTick.color) ? options.majorTick.color : 'none'});
                    points = that._getTickPoints(that._majorTickLength, that._majorTickWidth);
                    i = 0;
                    ii = ticks.major.length;
                    options.hideFirstTick === true && ++i;
                    options.hideLastTick === true && --ii;
                    for (; i < ii; ++i) {
                        item = ticks.major[i];
                        element = that._renderer.createArea(points);
                        that._moveTick(element, item);
                        element.append(that._majorTicks)
                    }
                }
                if (that._minorTickLength && that._minorTickWidth) {
                    that._minorTicks.applySettings({fill: isString(options.minorTick.color) ? options.minorTick.color : 'none'});
                    points = that._getTickPoints(that._minorTickLength, that._minorTickWidth);
                    for (i = 0, ii = ticks.minor.length; i < ii; ++i) {
                        item = ticks.minor[i];
                        element = that._renderer.createArea(points);
                        that._moveTick(element, item);
                        element.append(that._minorTicks)
                    }
                }
                if (that._textIndent) {
                    that._labels.applySettings({
                        align: that._getLabelAlign(that._textIndent),
                        font: options.label.font
                    });
                    textPosition = that._getLabelPosition(that._majorTickLength || 0, that._textIndent);
                    i = 0;
                    ii = ticks.major.length;
                    options.hideFirstLabel === true && ++i;
                    options.hideLastLabel === true && --ii;
                    for (; i < ii; ++i) {
                        item = ticks.major[i];
                        textValue = that._formatValue(item.value);
                        points = that._getLabelOptions(textValue, textPosition, that._textIndent, item);
                        that._renderer.createText(textValue, points.x, points.y + that._textVerticalOffset).append(that._labels)
                    }
                }
            },
            _processOptions: function() {
                var that = this,
                    options = that._options;
                if (that._processed)
                    return;
                that._processed = true;
                that._setupOrientation();
                that._majorTickLength = that._majorTickWidth = that._minorTickLength = that._minorTickWidth = that._textIndent = 0;
                if (options.majorTick.visible) {
                    if (options.majorTick.length > 0)
                        that._majorTickLength = Number(options.majorTick.length);
                    if (options.majorTick.width > 0)
                        that._majorTickWidth = Number(options.majorTick.width)
                }
                if (options.minorTick.visible) {
                    if (options.minorTick.length > 0)
                        that._minorTickLength = Number(options.minorTick.length);
                    if (options.minorTick.width > 0)
                        that._minorTickWidth = Number(options.minorTick.width)
                }
                if (options.label.visible)
                    if (Number(options.label.indentFromTick) !== 0) {
                        that._textIndent = Number(options.label.indentFromTick);
                        that._measureText()
                    }
            },
            clean: function() {
                var that = this;
                that._rootElement.detach();
                that._majorTicks.clear();
                that._minorTicks.clear();
                that._labels.clear();
                that._rendered = false;
                return that
            },
            render: function() {
                var that = this;
                that._processOptions();
                if (that._isVisible()) {
                    that._rendered = true;
                    that._rootElement.append(that._owner);
                    var ticks = that._getTicks();
                    that._renderContent(ticks)
                }
                return that
            },
            _formatValue: function(value) {
                var labelOptions = this._options.label,
                    result = formatHelper.format(value, labelOptions.format, labelOptions.precision);
                if (isFunction(labelOptions.customizeText)) {
                    result = {
                        value: value,
                        valueText: result
                    };
                    result = String(labelOptions.customizeText.call(result, result))
                }
                return result
            },
            _getSampleText: function() {
                var that = this,
                    start = that._translator.getDomainStart(),
                    end = that._translator.getDomainEnd(),
                    texts = [],
                    i,
                    ii,
                    text,
                    maxLength = 0,
                    maxText = '';
                var ticks = _tickProvider.getTicks({
                        min: start,
                        max: end,
                        tickInterval: that._options.majorTick.tickInterval > 0 ? Number(that._options.majorTick.tickInterval) : undefined,
                        screenDelta: that._options.approximateScreenDelta,
                        gridSpacingFactor: that._getGridSpacingFactor().majorTicks
                    });
                for (i = 0, ii = ticks.length; i < ii; ++i) {
                    text = that._formatValue(ticks[i]);
                    text.length > maxLength && (maxText = text) && (maxLength = text.length)
                }
                return maxText
            },
            _measureText: function() {
                var that = this,
                    value = that._getSampleText(),
                    text = that._renderer.createText(value, 0, 0, {font: that._options.label.font}).append(that._labels),
                    bbox;
                that._rendered || that._rootElement.append(that._owner);
                bbox = text.getBBox();
                that._rendered || that._rootElement.detach();
                text.remove();
                that._textVerticalOffset = -bbox.y - bbox.height / 2;
                that._textWidth = bbox.width;
                that._textHeight = bbox.height;
                that._textLength = value.length
            }
        });
        function getBasedAngle(startAngle, endAngle) {
            var startDelta,
                endDelta,
                tmp;
            if (startAngle > endAngle) {
                tmp = endAngle;
                endAngle = startAngle;
                startAngle = tmp
            }
            startDelta = 0 <= startAngle && startAngle <= 180 ? abs(90 - startAngle) : abs(270 - startAngle);
            startDelta = startAngle < 90 && 90 < endAngle || startAngle < 270 && 270 < endAngle ? 0 : startDelta;
            endDelta = 0 < endAngle && endAngle < 180 ? abs(90 - endAngle) : abs(270 - endAngle);
            return startDelta < endDelta ? startDelta : endDelta
        }
        DX.viz.gauges.__internals.CircularScale = DX.viz.gauges.__internals.BaseScale.inherit({
            _getGridSpacingFactor: function() {
                return {
                        majorTicks: 17,
                        minorTicks: 5
                    }
            },
            _getScreenDelta: function() {
                var that = this;
                return (that._translator.getCodomainStart() - that._translator.getCodomainEnd()) * that._options.radius * PI / 180
            },
            _getCuttingFactor: function(ticksCount, maxLabelSize) {
                var that = this,
                    options = that._options,
                    startAngle = that._translator.getCodomainStart(),
                    endAngle = that._translator.getCodomainEnd(),
                    radius = that._getLabelPosition(that._majorTickLength || 0, that._textIndent),
                    baseAngle = getBasedAngle(normalizeAngle(startAngle), normalizeAngle(endAngle)),
                    baseAngleCosSin = getCosAndSin(baseAngle),
                    degreesPerTick = (startAngle - endAngle) / ticksCount,
                    minAngleBetweenTicks,
                    widthBasedAngle,
                    tanOfWidthBasedAngle,
                    heightBasedAngle,
                    cosOfHeightBasedAngle,
                    cuttingBackFactor = 1;
                tanOfWidthBasedAngle = (baseAngleCosSin.sin * radius + maxLabelSize.width) / (baseAngleCosSin.cos * radius);
                widthBasedAngle = abs(baseAngle - atan(tanOfWidthBasedAngle) * 180 / PI);
                cosOfHeightBasedAngle = baseAngleCosSin.cos - maxLabelSize.height / radius;
                heightBasedAngle = -1 > cosOfHeightBasedAngle || cosOfHeightBasedAngle > 1 ? 90 : abs(baseAngle - acos(cosOfHeightBasedAngle) * 180 / PI);
                minAngleBetweenTicks = widthBasedAngle < heightBasedAngle ? widthBasedAngle : heightBasedAngle;
                if (degreesPerTick < minAngleBetweenTicks)
                    cuttingBackFactor = ceil(minAngleBetweenTicks / degreesPerTick);
                return max(1, cuttingBackFactor)
            },
            _setupOrientation: function() {
                var that = this,
                    inner = 0,
                    outer = 0;
                switch (that._options.orientation) {
                    case'inside':
                        inner = 1;
                        break;
                    case'center':
                        inner = outer = 0.5;
                        break;
                    default:
                        outer = 1;
                        break
                }
                that._inner = inner;
                that._outer = outer
            },
            _getTickPoints: function(length, width) {
                var options = this._options,
                    x1 = options.x - width / 2,
                    x2 = options.x + width / 2,
                    y1 = options.y - options.radius - length * this._outer,
                    y2 = options.y - options.radius + length * this._inner;
                return [x1, y1, x2, y1, x2, y2, x1, y2]
            },
            _moveTick: function(element, tick) {
                element.rotate(convertAngleToRendererSpace(tick.position), this._options.x, this._options.y)
            },
            _getLabelPosition: function(tickLength, textIndent) {
                return this._options.radius + tickLength * (textIndent >= 0 ? this._outer : -this._inner) + textIndent
            },
            _getLabelAlign: function() {
                return 'center'
            },
            _getLabelOptions: function(textValue, textPosition, textIndent, tick) {
                var that = this,
                    options = that._options,
                    cossin = getCosAndSin(tick.position),
                    x = options.x + cossin.cos * textPosition,
                    y = options.y - cossin.sin * textPosition,
                    dx = cossin.cos * (textValue.length / that._textLength) * that._textWidth / 2,
                    dy = cossin.sin * that._textHeight / 2;
                if (textIndent > 0) {
                    x += dx;
                    y -= dy
                }
                else {
                    x -= dx;
                    y += dy
                }
                return {
                        x: x,
                        y: y
                    }
            },
            _isVisible: function() {
                var that = this,
                    length = that._majorTickLength || 0,
                    r = that._options.radius,
                    inner = r - that._inner * length,
                    outer = r + that._outer * length;
                return inner > 0 && outer > inner
            },
            measure: function() {
                var that = this,
                    options = that._options,
                    result = {
                        min: options.radius,
                        max: options.radius
                    };
                that._processOptions();
                if (that._majorTickLength) {
                    result.min -= that._inner * that._majorTickLength;
                    result.max += that._outer * that._majorTickLength
                }
                if (that._textIndent) {
                    if (that._textIndent >= 0) {
                        result.horizontalOffset = that._textIndent + that._textWidth;
                        result.verticalOffset = that._textIndent + that._textHeight
                    }
                    else {
                        result.horizontalOffset = 0;
                        result.verticalOffset = 0;
                        result.min += that._textIndent - max(that._textWidth, that._textHeight)
                    }
                    result.inverseHorizontalOffset = that._textWidth / 2;
                    result.inverseVerticalOffset = that._textHeight / 2
                }
                return result
            }
        });
        DX.viz.gauges.__internals.LinearScale = DX.viz.gauges.__internals.BaseScale.inherit({
            _getGridSpacingFactor: function() {
                return {
                        majorTicks: 25,
                        minorTicks: 5
                    }
            },
            _getScreenDelta: function() {
                return abs(this._translator.getCodomainEnd() - this._translator.getCodomainStart())
            },
            _getCuttingFactor: function(ticksCount, maxLabelSize) {
                var that = this,
                    labelSize = that._vertical ? maxLabelSize.height : maxLabelSize.width,
                    screenSize = abs(that._translator.getCodomainEnd() - that._translator.getCodomainStart());
                return max(1, ceil(ticksCount * labelSize / (screenSize + labelSize)))
            },
            _setupOrientation: function() {
                var that = this,
                    inner = 0,
                    outer = 0;
                that._vertical = that._options.orientation === 'vertical';
                if (that._vertical)
                    switch (that._options.horizontalOrientation) {
                        case'left':
                            inner = 1;
                            break;
                        case'center':
                            inner = outer = 0.5;
                            break;
                        default:
                            outer = 1;
                            break
                    }
                else
                    switch (that._options.verticalOrientation) {
                        case'top':
                            inner = 1;
                            break;
                        case'middle':
                            inner = outer = 0.5;
                            break;
                        default:
                            outer = 1;
                            break
                    }
                that._inner = inner;
                that._outer = outer
            },
            _getTickPoints: function(length, width) {
                var options = this._options,
                    x1,
                    x2,
                    y1,
                    y2;
                if (this._vertical) {
                    x1 = options.x - length * this._inner;
                    x2 = options.x + length * this._outer;
                    y1 = -width / 2;
                    y2 = width / 2
                }
                else {
                    x1 = -width / 2;
                    x2 = width / 2;
                    y1 = options.y - length * this._inner;
                    y2 = options.y + length * this._outer
                }
                return [x1, y1, x2, y1, x2, y2, x1, y2]
            },
            _moveTick: function(element, tick) {
                var options = this._options,
                    x = 0,
                    y = 0;
                if (this._vertical)
                    y = tick.position;
                else
                    x = tick.position;
                element.move(x, y)
            },
            _getLabelPosition: function(tickLength, textIndent) {
                var options = this._options,
                    position = tickLength * (textIndent >= 0 ? this._outer : -this._inner) + textIndent;
                if (this._vertical)
                    position += options.x;
                else
                    position += options.y + (textIndent >= 0 ? 1 : -1) * this._textVerticalOffset;
                return position
            },
            _getLabelAlign: function(textIndent) {
                return this._vertical ? textIndent > 0 ? 'left' : 'right' : 'center'
            },
            _getLabelOptions: function(textValue, textPosition, textIndent, tick) {
                var x,
                    y;
                if (this._vertical) {
                    x = textPosition;
                    y = tick.position
                }
                else {
                    x = tick.position;
                    y = textPosition
                }
                return {
                        x: x,
                        y: y
                    }
            },
            _isVisible: function() {
                return true
            },
            measure: function() {
                var that = this,
                    options = that._options,
                    result;
                that._processOptions();
                if (that._vertical) {
                    result = {
                        min: options.x,
                        max: options.x
                    };
                    if (that._majorTickLength) {
                        result.min -= that._inner * that._majorTickLength;
                        result.max += that._outer * that._majorTickLength
                    }
                    if (that._textIndent) {
                        if (that._textIndent >= 0)
                            result.max += that._textIndent + that._textWidth;
                        else
                            result.min += that._textIndent - that._textWidth;
                        result.indent = that._textHeight / 2
                    }
                }
                else {
                    result = {
                        min: options.y,
                        max: options.y
                    };
                    if (that._majorTickLength) {
                        result.min -= that._inner * that._majorTickLength;
                        result.max += that._outer * that._majorTickLength
                    }
                    if (that._textIndent) {
                        if (that._textIndent >= 0)
                            result.max += that._textIndent + that._textHeight;
                        else
                            result.min += that._textIndent - that._textHeight;
                        result.indent = that._textWidth / 2
                    }
                }
                return result
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file baseIndicator.js */
    (function(DX, $, undefined) {
        var isFinite = window.isFinite,
            Number = window.Number,
            $extend = $.extend;
        DX.viz.gauges.__internals.BaseIndicator = DX.Class.inherit({
            setup: function(parameters) {
                var that = this;
                that._renderer = parameters.renderer;
                that._translator = parameters.translator;
                that._owner = parameters.owner;
                that._tracker = parameters.tracker;
                that._className = parameters.className;
                that._options = {};
                that._rootElement = that._createRoot();
                return that
            },
            dispose: function() {
                var that = this;
                that._renderer = that._owner = that._translator = that._tracker = that._options = that._rootElement = null;
                return that
            },
            init: function(options) {
                $extend(true, this._options, options);
                return this
            },
            _setupAnimation: function() {
                var that = this;
                if (that._options.animation) {
                    that._animation || (that._animation = {step: function(pos) {
                            that._actualValue = that._animation.start + that._animation.delta * pos;
                            that._actualPosition = that._translator.translate(that._actualValue);
                            that._move()
                        }});
                    that._animation.duration = that._options.animation.duration > 0 ? Number(that._options.animation.duration) : 0;
                    that._animation.easing = that._options.animation.easing
                }
                else
                    delete that._animation
            },
            _runAnimation: function(value) {
                var that = this,
                    animation = that._animation;
                animation.start = that._actualValue;
                animation.delta = value - that._actualValue;
                that._rootElement.animate({_: 0}, {
                    step: animation.step,
                    duration: animation.duration,
                    easing: animation.easing
                })
            },
            _createRoot: function() {
                return this._renderer.createGroup({'class': this._className})
            },
            _createTracker: function() {
                return this._renderer.createArea()
            },
            _getTrackerSettings: function(){},
            clean: function() {
                var that = this;
                that._animation && that._rootElement.stopAnimation() && (that._animation = null);
                that._rootElement.detach();
                that._rootElement.clear();
                that._visible = false;
                that._clear();
                if (that._trackerElement) {
                    that._tracker.detach(that._trackerElement);
                    that._trackerElement = null
                }
                return that
            },
            render: function() {
                var that = this;
                that._actualValue = that._currentValue = that._translator.adjust(that._options.currentValue);
                that._actualPosition = that._translator.translate(that._actualValue);
                that._visible = that._isVisible();
                if (that._visible) {
                    that._setupAnimation();
                    that._rootElement.applySettings({fill: that._options.color});
                    that._rootElement.append(that._owner);
                    that._render();
                    that._trackerElement = that._trackerElement || that._createTracker();
                    that._trackerElement.applySettings(that._getTrackerSettings());
                    that._tracker.attach(that._trackerElement, that, that._trackerInfo);
                    that._move()
                }
                return that
            },
            update: function(options) {
                this.init(options);
                this._update();
                return this
            },
            _update: $.noop,
            value: function(arg, _noAnimation) {
                var that = this,
                    val;
                if (arguments.length) {
                    val = that._translator.adjust(arg);
                    if (that._currentValue !== val && isFinite(val)) {
                        that._currentValue = val;
                        if (that._visible)
                            if (that._animation && !_noAnimation)
                                that._runAnimation(val);
                            else {
                                that._actualValue = val;
                                that._actualPosition = that._translator.translate(val);
                                that._move()
                            }
                    }
                    return that
                }
                return that._currentValue
            },
            _isVisible: function() {
                throw new Error('_isVisible - not implemented');
            },
            _render: function() {
                throw new Error('_render - not implemented');
            },
            _clear: function() {
                throw new Error('_clear - not implemented');
            },
            _move: function() {
                throw new Error('_move - not implemented');
            },
            getCurrentValue: function() {
                return this.value()
            },
            setCurrentValue: function(value) {
                return this.value(value)
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file baseMarker.js */
    (function(DX, undefined) {
        var TextCloud = DX.viz.core.TextCloud;
        var formatValue = DX.viz.gauges.__internals.formatValue,
            getSampleText = DX.viz.gauges.__internals.getSampleText;
        DX.viz.gauges.__internals.BaseTextCloudMarker = DX.viz.gauges.__internals.BaseIndicator.inherit({
            _move: function() {
                var that = this,
                    bbox,
                    info = new TextCloud,
                    textCloudOptions = that._getTextCloudOptions();
                that._text.applySettings({text: formatValue(that._actualValue, that._options.text)});
                bbox = that._text.getBBox();
                info.setup({
                    x: textCloudOptions.x,
                    y: textCloudOptions.y,
                    textWidth: bbox.width,
                    textHeight: bbox.height,
                    horMargin: that._options.horizontalOffset,
                    verMargin: that._options.verticalOffset,
                    tailLength: that._options.arrowLength,
                    type: textCloudOptions.type
                });
                that._text.applySettings({
                    x: info.cx(),
                    y: info.cy() + that._textVerticalOffset
                });
                that._cloud.applySettings({points: info.points()});
                that._trackerElement && that._trackerElement.applySettings({points: info.points()})
            },
            _measureText: function() {
                var that = this,
                    root,
                    text,
                    bbox;
                if (!that._textVerticalOffset) {
                    root = that._createRoot().append(that._owner);
                    text = that._renderer.createText(getSampleText(that._translator, that._options.text), 0, 0, {
                        align: 'center',
                        font: that._options.text.font
                    }).append(root);
                    bbox = text.getBBox();
                    root.remove();
                    that._textVerticalOffset = -bbox.y - bbox.height / 2;
                    that._textWidth = bbox.width;
                    that._textHeight = bbox.height;
                    that._textFullWidth = that._textWidth + 2 * that._options.horizontalOffset;
                    that._textFullHeight = that._textHeight + 2 * that._options.verticalOffset
                }
            },
            _render: function() {
                var that = this;
                that._measureText();
                that._cloud = that._cloud || that._renderer.createArea().append(that._rootElement);
                that._text = that._text || that._renderer.createText().append(that._rootElement);
                that._text.applySettings({
                    align: 'center',
                    font: that._options.text.font
                })
            },
            _clear: function() {
                delete this._cloud;
                delete this._text
            },
            getTooltipParameters: function() {
                var position = this._getTextCloudOptions();
                return {
                        x: position.x,
                        y: position.y,
                        value: this._currentValue,
                        color: this._options.color
                    }
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file baseRangeBar.js */
    (function(DX, $, undefined) {
        var $extend = $.extend;
        var formatValue = DX.viz.gauges.__internals.formatValue,
            getSampleText = DX.viz.gauges.__internals.getSampleText;
        DX.viz.gauges.__internals.BaseRangeBar = DX.viz.gauges.__internals.BaseIndicator.inherit({
            _measureText: function() {
                var that = this,
                    root,
                    text,
                    bbox;
                that._hasText = that._isTextVisible();
                if (that._hasText && !that._textVerticalOffset) {
                    root = that._createRoot().append(that._owner);
                    text = that._renderer.createText(getSampleText(that._translator, that._options.text), 0, 0, {
                        'class': 'dxg-text',
                        align: 'center',
                        font: that._options.text.font
                    }).append(root);
                    bbox = text.getBBox();
                    root.remove();
                    that._textVerticalOffset = -bbox.y - bbox.height / 2;
                    that._textWidth = bbox.width;
                    that._textHeight = bbox.height
                }
            },
            _move: function() {
                var that = this;
                that._updateBarItemsPositions();
                if (that._hasText) {
                    that._text.applySettings({text: formatValue(that._actualValue, that._options.text)});
                    that._updateTextPosition();
                    that._updateLinePosition()
                }
            },
            _updateBarItems: function() {
                var that = this,
                    options = that._options,
                    backgroundColor,
                    spaceColor;
                that._setBarSides();
                that._startPosition = that._translator.translate(that._translator.getDomainStart());
                that._endPosition = that._translator.translate(that._translator.getDomainEnd());
                that._basePosition = that._translator.translate(options.baseValue);
                that._space = that._getSpace();
                backgroundColor = options.backgroundColor || 'none';
                if (backgroundColor !== 'none' && that._space > 0)
                    spaceColor = options.containerBackgroundColor || 'none';
                else {
                    that._space = 0;
                    spaceColor = 'none'
                }
                that._backItem1.applySettings({fill: backgroundColor});
                that._backItem2.applySettings({fill: backgroundColor});
                that._spaceItem1.applySettings({fill: spaceColor});
                that._spaceItem2.applySettings({fill: spaceColor})
            },
            _getSpace: function() {
                return 0
            },
            _updateTextItems: function() {
                var that = this;
                if (that._hasText) {
                    that._line = that._line || that._renderer.createPath([], {'class': 'dxg-main-bar'}).append(that._rootElement);
                    that._text = that._text || that._renderer.createText('', 0, 0, {'class': 'dxg-text'}).append(that._rootElement);
                    that._text.applySettings({
                        align: that._getTextAlign(),
                        font: that._getFontOptions()
                    });
                    that._setTextItemsSides()
                }
                else {
                    if (that._line) {
                        that._line.remove();
                        delete that._line
                    }
                    if (that._text) {
                        that._text.remove();
                        delete that._text
                    }
                }
            },
            _isTextVisible: function() {
                return false
            },
            _getTextAlign: function() {
                return 'center'
            },
            _getFontOptions: function() {
                var options = this._options,
                    font = options.text.font;
                if (!font || !font.color)
                    font = $extend({}, font, {color: options.color});
                return font
            },
            _updateBarItemsPositions: function() {
                var that = this,
                    positions = that._getPositions();
                that._backItem1.applySettings(that._buildItemSettings(positions.start, positions.back1));
                that._backItem2.applySettings(that._buildItemSettings(positions.back2, positions.end));
                that._spaceItem1.applySettings(that._buildItemSettings(positions.back1, positions.main1));
                that._spaceItem2.applySettings(that._buildItemSettings(positions.main2, positions.back2));
                that._mainItem.applySettings(that._buildItemSettings(positions.main1, positions.main2));
                that._trackerElement && that._trackerElement.applySettings(that._buildItemSettings(positions.main1, positions.main2))
            },
            _render: function() {
                var that = this;
                that._measureText();
                if (!that._backItem1) {
                    that._backItem1 = that._createBarItem();
                    that._backItem1.applySettings({'class': 'dxg-back-bar'})
                }
                if (!that._backItem2) {
                    that._backItem2 = that._createBarItem();
                    that._backItem2.applySettings({'class': 'dxg-back-bar'})
                }
                if (!that._spaceItem1) {
                    that._spaceItem1 = that._createBarItem();
                    that._spaceItem1.applySettings({'class': 'dxg-space-bar'})
                }
                if (!that._spaceItem2) {
                    that._spaceItem2 = that._createBarItem();
                    that._spaceItem2.applySettings({'class': 'dxg-space-bar'})
                }
                if (!that._mainItem) {
                    that._mainItem = that._createBarItem();
                    that._mainItem.applySettings({'class': 'dxg-main-bar'})
                }
                that._updateBarItems();
                that._updateTextItems()
            },
            _clear: function() {
                var that = this;
                delete that._backItem1;
                delete that._backItem2;
                delete that._spaceItem1;
                delete that._spaceItem2;
                delete that._mainItem;
                delete that._hasText;
                delete that._line;
                delete that._text
            },
            _update: function() {
                this._render();
                this._move();
                this._rootElement.applySettings({fill: this._options.color})
            },
            getTooltipParameters: function() {
                var position = this._getTooltipPosition();
                return {
                        x: position.x,
                        y: position.y,
                        value: this._currentValue,
                        color: this._options.color,
                        offset: 0
                    }
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file circularNeedle.js */
    (function(DX, undefined) {
        var circularNeedles = DX.viz.gauges.__internals.circularNeedles;
        var _Number = Number;
        circularNeedles.SimpleIndicator = DX.viz.gauges.__internals.BaseIndicator.inherit({
            _move: function() {
                var that = this,
                    options = that._options,
                    angle = DX.utils.convertAngleToRendererSpace(that._actualPosition);
                that._rootElement.rotate(angle, options.x, options.y);
                that._trackerElement && that._trackerElement.rotate(angle, options.x, options.y)
            },
            _isVisible: function() {
                var options = this._options;
                return options.width > 0 && options.radius - options.indentFromCenter > 0
            },
            _getTrackerSettings: function() {
                var options = this._options,
                    x = options.x,
                    y = options.y - (options.radius + _Number(options.indentFromCenter)) / 2,
                    width = options.width / 2,
                    length = (options.radius - _Number(options.indentFromCenter)) / 2;
                width > 10 || (width = 10);
                length > 10 || (length = 10);
                return {points: [x - width, y - length, x - width, y + length, x + width, y + length, x + width, y - length]}
            },
            _renderSpindle: function() {
                var that = this,
                    options = that._options,
                    gapSize;
                if (options.spindleSize > 0) {
                    gapSize = _Number(options.spindleGapSize) || 0;
                    if (gapSize > 0)
                        gapSize = gapSize <= options.spindleSize ? gapSize : _Number(options.spindleSize);
                    that._spindleOuter = that._spindleOuter || that._renderer.createCircle().append(that._rootElement);
                    that._spindleInner = that._spindleInner || that._renderer.createCircle().append(that._rootElement);
                    that._spindleOuter.applySettings({
                        'class': 'dxg-spindle-border',
                        cx: options.x,
                        cy: options.y,
                        r: options.spindleSize / 2
                    });
                    that._spindleInner.applySettings({
                        'class': 'dxg-spindle-hole',
                        cx: options.x,
                        cy: options.y,
                        r: gapSize / 2,
                        fill: options.containerBackgroundColor
                    })
                }
                else
                    that._clearSpindle()
            },
            _render: function() {
                var that = this,
                    options = that._options;
                that._renderPointer();
                that._renderSpindle()
            },
            _clearSpindle: function() {
                delete this._spindleOuter;
                delete this._spindleInner
            },
            _clearPointer: function() {
                delete this._element
            },
            _clear: function() {
                this._clearPointer();
                this._clearSpindle()
            },
            measure: function() {
                var options = this._options,
                    result = {max: options.radius};
                if (options.indentFromCenter < 0)
                    result.inverseHorizontalOffset = result.inverseVerticalOffset = -options.indentFromCenter;
                return result
            },
            getTooltipParameters: function() {
                var options = this._options,
                    cossin = DX.utils.getCosAndSin(this._actualPosition),
                    r = (options.radius + _Number(options.indentFromCenter)) / 2;
                return {
                        x: options.x + cossin.cos * r,
                        y: options.y - cossin.sin * r,
                        value: this._currentValue,
                        color: options.color,
                        offset: options.width / 2
                    }
            }
        });
        circularNeedles.RectangleNeedle = circularNeedles.SimpleIndicator.inherit({_renderPointer: function() {
                var that = this,
                    options = that._options,
                    y2 = options.y - options.radius,
                    y1 = options.y - _Number(options.indentFromCenter),
                    x1 = options.x - options.width / 2,
                    x2 = x1 + _Number(options.width);
                that._element = that._element || that._renderer.createArea().append(that._rootElement);
                that._element.applySettings({points: [x1, y1, x1, y2, x2, y2, x2, y1]})
            }});
        circularNeedles.TriangleNeedle = circularNeedles.SimpleIndicator.inherit({_renderPointer: function() {
                var that = this,
                    options = that._options,
                    y2 = options.y - options.radius,
                    y1 = options.y - _Number(options.indentFromCenter),
                    x1 = options.x - options.width / 2,
                    x2 = options.x + options.width / 2;
                that._element = that._element || that._renderer.createArea().append(that._rootElement);
                that._element.applySettings({points: [x1, y1, options.x, y2, x2, y1]})
            }});
        circularNeedles.TwoColorRectangleNeedle = circularNeedles.SimpleIndicator.inherit({
            _renderPointer: function() {
                var that = this,
                    options = that._options,
                    x1 = options.x - options.width / 2,
                    x2 = options.x + options.width / 2,
                    y4 = options.y - options.radius,
                    y1 = options.y - _Number(options.indentFromCenter),
                    fraction = _Number(options.secondFraction) || 0,
                    y2,
                    y3;
                if (fraction >= 1)
                    y2 = y3 = y1;
                else if (fraction <= 0)
                    y2 = y3 = y2;
                else {
                    y3 = y4 + (y1 - y4) * fraction;
                    y2 = y3 + options.space
                }
                that._firstElement = that._firstElement || that._renderer.createArea().append(that._rootElement);
                that._spaceElement = that._spaceElement || that._renderer.createArea().append(that._rootElement);
                that._secondElement = that._secondElement || that._renderer.createArea().append(that._rootElement);
                that._firstElement.applySettings({points: [x1, y1, x1, y2, x2, y2, x2, y1]});
                that._spaceElement.applySettings({
                    points: [x1, y2, x1, y3, x2, y3, x2, y2],
                    'class': 'dxg-hole',
                    fill: options.containerBackgroundColor
                });
                that._secondElement.applySettings({
                    points: [x1, y3, x1, y4, x2, y4, x2, y3],
                    'class': 'dxg-part',
                    fill: options.secondColor
                })
            },
            _clearPointer: function() {
                delete this._firstElement;
                delete this._secondElement;
                delete this._spaceElement
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file linearNeedle.js */
    (function(DX, undefined) {
        var linearNeedles = DX.viz.gauges.__internals.linearNeedles;
        var _Number = Number;
        linearNeedles.SimpleIndicator = DX.viz.gauges.__internals.BaseIndicator.inherit({
            _move: function() {
                var that = this,
                    delta = that._actualPosition - that._zeroPosition;
                that._rootElement.move(that._vertical ? 0 : delta, that._vertical ? delta : 0);
                that._trackerElement && that._trackerElement.move(that._vertical ? 0 : delta, that._vertical ? delta : 0)
            },
            _isVisible: function() {
                var options = this._options;
                return options.length > 0 && options.width > 0
            },
            _getTrackerSettings: function() {
                var options = this._options,
                    x1,
                    x2,
                    y1,
                    y2,
                    width = options.width / 2,
                    length = options.length / 2,
                    p = this._zeroPosition;
                width > 10 || (width = 10);
                length > 10 || (length = 10);
                if (this._vertical) {
                    x1 = options.x - length;
                    x2 = options.x + length;
                    y1 = p + width;
                    y2 = p - width
                }
                else {
                    x1 = p - width;
                    x2 = p + width;
                    y1 = options.y + length;
                    y2 = options.y - length
                }
                return {points: [x1, y1, x1, y2, x2, y2, x2, y1]}
            },
            _render: function() {
                var that = this;
                that._zeroPosition = that._translator.getCodomainStart()
            },
            _clear: function() {
                delete this._element
            },
            init: function(options) {
                var that = this;
                that.callBase(options);
                that._vertical = that._options.orientation === 'vertical';
                return that
            },
            measure: function() {
                var options = this._options,
                    p = this._vertical ? options.x : options.y;
                return {
                        min: p - options.length / 2,
                        max: p + options.length / 2
                    }
            },
            getTooltipParameters: function() {
                var that = this,
                    options = that._options,
                    p = that._actualPosition,
                    parameters = {
                        x: p,
                        y: p,
                        value: that._currentValue,
                        color: options.color,
                        offset: options.width / 2
                    };
                that._vertical ? parameters.x = options.x : parameters.y = options.y;
                return parameters
            }
        });
        linearNeedles.RectangleNeedle = linearNeedles.SimpleIndicator.inherit({_render: function() {
                var that = this,
                    options = that._options,
                    p,
                    x1,
                    x2,
                    y1,
                    y2;
                that.callBase();
                p = that._zeroPosition;
                if (that._vertical) {
                    x1 = options.x - options.length / 2;
                    x2 = options.x + options.length / 2;
                    y1 = p + options.width / 2;
                    y2 = p - options.width / 2
                }
                else {
                    x1 = p - options.width / 2;
                    x2 = p + options.width / 2;
                    y1 = options.y + options.length / 2;
                    y2 = options.y - options.length / 2
                }
                that._element = that._element || that._renderer.createArea().append(that._rootElement);
                that._element.applySettings({points: [x1, y1, x1, y2, x2, y2, x2, y1]})
            }});
        linearNeedles.RhombusNeedle = linearNeedles.SimpleIndicator.inherit({_render: function() {
                var that = this,
                    options = that._options,
                    x,
                    y,
                    dx,
                    dy;
                that.callBase();
                if (that._vertical) {
                    x = options.x;
                    y = that._zeroPosition;
                    dx = options.length / 2 || 0;
                    dy = options.width / 2 || 0
                }
                else {
                    x = that._zeroPosition;
                    y = options.y;
                    dx = options.width / 2 || 0;
                    dy = options.length / 2 || 0
                }
                that._element = that._element || that._renderer.createArea().append(that._rootElement);
                that._element.applySettings({points: [x - dx, y, x, y - dy, x + dx, y, x, y + dy]})
            }});
        linearNeedles.CircleNeedle = linearNeedles.SimpleIndicator.inherit({_render: function() {
                var that = this,
                    options = that._options,
                    x,
                    y,
                    r;
                that.callBase();
                if (that._vertical) {
                    x = options.x;
                    y = that._zeroPosition
                }
                else {
                    x = that._zeroPosition;
                    y = options.y
                }
                r = options.length / 2 || 0;
                that._element = that._element || that._renderer.createCircle().append(that._rootElement);
                that._element.applySettings({
                    cx: x,
                    cy: y,
                    r: r
                })
            }})
    })(DevExpress);
    /*! Module viz-gauges, file circularMarker.js */
    (function(DX, undefined) {
        var circularMarkers = DX.viz.gauges.__internals.circularMarkers;
        var _Number = Number;
        circularMarkers.TriangleMarker = DX.viz.gauges.__internals.circularNeedles.SimpleIndicator.inherit({
            _isVisible: function() {
                var options = this._options;
                return options.length > 0 && options.width > 0 && options.radius > 0
            },
            _render: function() {
                var that = this,
                    options = that._options,
                    x = options.x,
                    y1 = options.y - options.radius,
                    dx = options.width / 2 || 0,
                    y2 = y1 - _Number(options.length),
                    settings;
                that._element = that._element || that._renderer.createArea().append(that._rootElement);
                settings = {
                    points: [x, y1, x - dx, y2, x + dx, y2],
                    stroke: 'none',
                    strokeWidth: 0
                };
                if (options.space > 0) {
                    settings.strokeWidth = Math.min(options.space, options.width / 4) || 0;
                    settings.stroke = settings.strokeWidth > 0 ? options.containerBackgroundColor || 'none' : 'none'
                }
                that._element.applySettings(settings)
            },
            _clear: function() {
                delete this._element
            },
            _getTrackerSettings: function() {
                var options = this._options,
                    x = options.x,
                    y = options.y - options.radius - options.length / 2,
                    width = options.width / 2,
                    length = options.length / 2;
                width > 10 || (width = 10);
                length > 10 || (length = 10);
                return {points: [x - width, y - length, x - width, y + length, x + width, y + length, x + width, y - length]}
            },
            measure: function() {
                var options = this._options;
                return {
                        min: options.radius,
                        max: options.radius + (_Number(options.length) || 0)
                    }
            },
            getTooltipParameters: function() {
                var options = this._options,
                    cossin = DX.utils.getCosAndSin(this._actualPosition),
                    r = options.radius + options.length / 2,
                    parameters = this.callBase();
                parameters.x = options.x + cossin.cos * r;
                parameters.y = options.y - cossin.sin * r;
                parameters.offset = options.length / 2;
                return parameters
            }
        });
        circularMarkers.TextCloudMarker = DX.viz.gauges.__internals.BaseTextCloudMarker.inherit({
            _isVisible: function() {
                return this._options.radius > 0
            },
            _getTextCloudOptions: function() {
                var that = this,
                    cossin = DX.utils.getCosAndSin(that._actualPosition),
                    nangle = DX.utils.normalizeAngle(that._actualPosition);
                return {
                        x: that._options.x + cossin.cos * that._options.radius,
                        y: that._options.y - cossin.sin * that._options.radius,
                        type: nangle > 270 ? 'left-top' : nangle > 180 ? 'top-right' : nangle > 90 ? 'right-bottom' : 'bottom-left'
                    }
            },
            measure: function() {
                var that = this;
                that._measureText();
                return {
                        min: that._options.radius,
                        max: that._options.radius,
                        horizontalOffset: that._textFullWidth + (_Number(that._options.arrowLength) || 0),
                        verticalOffset: that._textFullHeight + (_Number(that._options.arrowLength) || 0)
                    }
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file linearMarker.js */
    (function(DX, undefined) {
        var linearMarkers = DX.viz.gauges.__internals.linearMarkers;
        var _Number = Number;
        linearMarkers.TriangleMarker = DX.viz.gauges.__internals.linearNeedles.SimpleIndicator.inherit({
            _render: function() {
                var that = this,
                    options = that._options,
                    x1,
                    x2,
                    y1,
                    y2,
                    settings = {
                        stroke: 'none',
                        strokeWidth: 0
                    };
                that.callBase();
                if (that._vertical) {
                    x1 = options.x;
                    y1 = that._zeroPosition;
                    x2 = x1 + _Number(that._inverted ? options.length : -options.length);
                    settings.points = [x1, y1, x2, y1 - options.width / 2, x2, y1 + options.width / 2]
                }
                else {
                    y1 = options.y;
                    x1 = that._zeroPosition;
                    y2 = y1 + _Number(that._inverted ? options.length : -options.length);
                    settings.points = [x1, y1, x1 - options.width / 2, y2, x1 + options.width / 2, y2]
                }
                if (options.space > 0) {
                    settings.strokeWidth = Math.min(options.space, options.width / 4) || 0;
                    settings.stroke = settings.strokeWidth > 0 ? options.containerBackgroundColor || 'none' : 'none'
                }
                that._element = that._element || that._renderer.createArea().append(that._rootElement);
                that._element.applySettings(settings)
            },
            _getTrackerSettings: function() {
                var that = this,
                    options = that._options,
                    width = options.width / 2,
                    length = _Number(options.length),
                    x1,
                    x2,
                    y1,
                    y2,
                    result;
                width > 10 || (width = 10);
                length > 20 || (length = 20);
                if (that._vertical) {
                    x1 = x2 = options.x;
                    x2 = x1 + (that._inverted ? length : -length);
                    y1 = that._zeroPosition + width;
                    y2 = that._zeroPosition - width;
                    result = [x1, y1, x2, y1, x2, y2, x1, y2]
                }
                else {
                    y1 = options.y;
                    y2 = y1 + (that._inverted ? length : -length);
                    x1 = that._zeroPosition - width;
                    x2 = that._zeroPosition + width;
                    result = [x1, y1, x1, y2, x2, y2, x2, y1]
                }
                return {points: result}
            },
            init: function(options) {
                var that = this;
                that.callBase(options);
                that._inverted = that._vertical ? that._options.horizontalOrientation === 'right' : that._options.verticalOrientation === 'bottom';
                return that
            },
            measure: function() {
                var that = this,
                    options = that._options,
                    length = _Number(options.length) || 0,
                    minbound,
                    maxbound;
                if (that._vertical) {
                    minbound = maxbound = options.x;
                    if (that._inverted)
                        maxbound = minbound + length;
                    else
                        minbound = maxbound - length
                }
                else {
                    minbound = maxbound = options.y;
                    if (that._inverted)
                        maxbound = minbound + length;
                    else
                        minbound = maxbound - length
                }
                return {
                        min: minbound,
                        max: maxbound,
                        indent: options.width / 2 || 0
                    }
            },
            getTooltipParameters: function() {
                var that = this,
                    options = that._options,
                    s = (that._inverted ? options.length : -options.length) / 2,
                    parameters = that.callBase();
                that._vertical ? parameters.x += s : parameters.y += s;
                parameters.offset = options.length / 2;
                return parameters
            }
        });
        linearMarkers.TextCloudMarker = DX.viz.gauges.__internals.BaseTextCloudMarker.inherit({
            _isVisible: function() {
                return true
            },
            _getTextCloudOptions: function() {
                var that = this,
                    x = that._actualPosition,
                    y = that._actualPosition,
                    type;
                if (that._vertical) {
                    x = that._options.x;
                    type = that._inverted ? 'top-left' : 'top-right'
                }
                else {
                    y = that._options.y;
                    type = that._inverted ? 'right-top' : 'right-bottom'
                }
                return {
                        x: x,
                        y: y,
                        type: type
                    }
            },
            init: function(options) {
                var that = this;
                that.callBase(options);
                that._vertical = that._options.orientation === 'vertical';
                that._inverted = that._vertical ? that._options.horizontalOrientation === 'right' : that._options.verticalOrientation === 'bottom';
                return that
            },
            measure: function() {
                var that = this,
                    options = that._options,
                    minbound,
                    maxbound,
                    arrowLength = _Number(options.arrowLength) || 0,
                    indent;
                that._measureText();
                if (that._vertical) {
                    indent = that._textFullHeight;
                    if (that._inverted) {
                        minbound = options.x;
                        maxbound = options.x + arrowLength + that._textFullWidth
                    }
                    else {
                        minbound = options.x - arrowLength - that._textFullWidth;
                        maxbound = options.x
                    }
                }
                else {
                    indent = that._textFullWidth;
                    if (that._inverted) {
                        minbound = options.y;
                        maxbound = options.y + arrowLength + that._textFullHeight
                    }
                    else {
                        minbound = options.y - arrowLength - that._textFullHeight;
                        maxbound = options.y
                    }
                }
                return {
                        min: minbound,
                        max: maxbound,
                        indent: indent
                    }
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file circularRangeBar.js */
    (function(DX, undefined) {
        var _Number = Number,
            getCosAndSin = DX.utils.getCosAndSin,
            convertAngleToRendererSpace = DX.utils.convertAngleToRendererSpace,
            max = Math.max,
            min = Math.min;
        DX.viz.gauges.__internals.CircularRangeBar = DX.viz.gauges.__internals.BaseRangeBar.inherit({
            _isVisible: function() {
                var options = this._options;
                return options.size > 0 && options.radius - options.size > 0
            },
            _createBarItem: function() {
                return this._renderer.createArc().append(this._rootElement)
            },
            _createTracker: function() {
                return this._renderer.createArc()
            },
            _setBarSides: function() {
                var that = this;
                that._maxSide = that._options.radius;
                that._minSide = that._maxSide - _Number(that._options.size)
            },
            _getSpace: function() {
                var options = this._options;
                return options.space > 0 ? options.space * 180 / options.radius / Math.PI : 0
            },
            _isTextVisible: function() {
                var options = this._options.text || {};
                return options.indent > 0
            },
            _setTextItemsSides: function() {
                var that = this,
                    options = that._options;
                that._lineFrom = options.y - options.radius;
                that._lineTo = that._lineFrom - _Number(options.text.indent);
                that._textRadius = options.radius + _Number(options.text.indent)
            },
            _getPositions: function() {
                var that = this,
                    basePosition = that._basePosition,
                    actualPosition = that._actualPosition,
                    mainPosition1,
                    mainPosition2;
                if (basePosition >= actualPosition) {
                    mainPosition1 = basePosition;
                    mainPosition2 = actualPosition
                }
                else {
                    mainPosition1 = actualPosition;
                    mainPosition2 = basePosition
                }
                return {
                        start: that._startPosition,
                        end: that._endPosition,
                        main1: mainPosition1,
                        main2: mainPosition2,
                        back1: min(mainPosition1 + that._space, that._startPosition),
                        back2: max(mainPosition2 - that._space, that._endPosition)
                    }
            },
            _buildItemSettings: function(from, to) {
                var that = this;
                return {
                        x: that._options.x,
                        y: that._options.y,
                        innerRadius: that._minSide,
                        outerRadius: that._maxSide,
                        startAngle: to,
                        endAngle: from
                    }
            },
            _updateTextPosition: function() {
                var that = this,
                    cossin = getCosAndSin(that._actualPosition),
                    x = that._options.x + that._textRadius * cossin.cos,
                    y = that._options.y - that._textRadius * cossin.sin;
                x += cossin.cos * that._textWidth * 0.6;
                y -= cossin.sin * that._textHeight * 0.6;
                that._text.applySettings({
                    x: x,
                    y: y + that._textVerticalOffset
                })
            },
            _updateLinePosition: function() {
                var that = this,
                    x = that._options.x,
                    x1,
                    x2;
                if (that._basePosition > that._actualPosition) {
                    x1 = x - 2;
                    x2 = x
                }
                else if (that._basePosition < that._actualPosition) {
                    x1 = x;
                    x2 = x + 2
                }
                else {
                    x1 = x - 1;
                    x2 = x + 1
                }
                that._line.applySettings({points: [x1, that._lineFrom, x1, that._lineTo, x2, that._lineTo, x2, that._lineFrom]});
                that._line.rotate(convertAngleToRendererSpace(that._actualPosition), x, that._options.y)
            },
            _getTooltipPosition: function() {
                var that = this,
                    cossin = getCosAndSin((that._basePosition + that._actualPosition) / 2),
                    r = (that._minSide + that._maxSide) / 2;
                return {
                        x: that._options.x + cossin.cos * r,
                        y: that._options.y - cossin.sin * r
                    }
            },
            measure: function() {
                var that = this,
                    options = that._options,
                    result = {
                        min: options.radius - (_Number(options.size) || 0),
                        max: options.radius
                    };
                that._measureText();
                if (that._hasText) {
                    result.max += _Number(options.text.indent);
                    result.horizontalOffset = that._textWidth;
                    result.verticalOffset = that._textHeight
                }
                return result
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file linearRangeBar.js */
    (function(DX, undefined) {
        var _Number = Number;
        DX.viz.gauges.__internals.LinearRangeBar = DX.viz.gauges.__internals.BaseRangeBar.inherit({
            _isVisible: function() {
                var options = this._options;
                return options.size > 0
            },
            init: function(options) {
                var that = this;
                that.callBase(options);
                that._vertical = that._options.orientation === 'vertical';
                that._inverted = that._vertical ? that._options.horizontalOrientation === 'right' : that._options.verticalOrientation === 'bottom';
                return that
            },
            _createBarItem: function() {
                return this._renderer.createArea().append(this._rootElement)
            },
            _createTracker: function() {
                return this._renderer.createArea()
            },
            _setBarSides: function() {
                var that = this,
                    options = that._options,
                    size = _Number(options.size),
                    minSide,
                    maxSide;
                if (that._vertical)
                    if (that._inverted) {
                        minSide = options.x;
                        maxSide = options.x + size
                    }
                    else {
                        minSide = options.x - size;
                        maxSide = options.x
                    }
                else if (that._inverted) {
                    minSide = options.y;
                    maxSide = options.y + size
                }
                else {
                    minSide = options.y - size;
                    maxSide = options.y
                }
                that._minSide = minSide;
                that._maxSide = maxSide;
                that._minBound = minSide;
                that._maxBound = maxSide
            },
            _getSpace: function() {
                var options = this._options;
                return options.space > 0 ? _Number(options.space) : 0
            },
            _isTextVisible: function() {
                var textOptions = this._options.text || {};
                return textOptions.indent > 0 || textOptions.indent < 0
            },
            _getTextAlign: function() {
                return this._vertical ? this._options.text.indent > 0 ? 'left' : 'right' : 'center'
            },
            _setTextItemsSides: function() {
                var that = this,
                    indent = _Number(that._options.text.indent);
                if (indent > 0) {
                    that._lineStart = that._maxSide;
                    that._lineEnd = that._maxSide + indent;
                    that._textPosition = that._lineEnd + (that._vertical ? 2 : that._textHeight / 2);
                    that._maxBound = that._textPosition + (that._vertical ? that._textWidth : that._textHeight / 2)
                }
                else if (indent < 0) {
                    that._lineStart = that._minSide;
                    that._lineEnd = that._minSide + indent;
                    that._textPosition = that._lineEnd - (that._vertical ? 2 : that._textHeight / 2);
                    that._minBound = that._textPosition - (that._vertical ? that._textWidth : that._textHeight / 2)
                }
            },
            _getPositions: function() {
                var that = this,
                    options = that._options,
                    startPosition = that._startPosition,
                    endPosition = that._endPosition,
                    space = that._space,
                    basePosition = that._basePosition,
                    actualPosition = that._actualPosition,
                    mainPosition1,
                    mainPosition2,
                    backPosition1,
                    backPosition2;
                if (startPosition < endPosition) {
                    if (basePosition < actualPosition) {
                        mainPosition1 = basePosition;
                        mainPosition2 = actualPosition
                    }
                    else {
                        mainPosition1 = actualPosition;
                        mainPosition2 = basePosition
                    }
                    backPosition1 = mainPosition1 - space;
                    backPosition2 = mainPosition2 + space
                }
                else {
                    if (basePosition > actualPosition) {
                        mainPosition1 = basePosition;
                        mainPosition2 = actualPosition
                    }
                    else {
                        mainPosition1 = actualPosition;
                        mainPosition2 = basePosition
                    }
                    backPosition1 = mainPosition1 + space;
                    backPosition2 = mainPosition2 - space
                }
                return {
                        start: startPosition,
                        end: endPosition,
                        main1: mainPosition1,
                        main2: mainPosition2,
                        back1: backPosition1,
                        back2: backPosition2
                    }
            },
            _buildItemSettings: function(from, to) {
                var that = this,
                    side1 = that._minSide,
                    side2 = that._maxSide;
                var points = that._vertical ? [side1, from, side1, to, side2, to, side2, from] : [from, side1, from, side2, to, side2, to, side1];
                return {points: points}
            },
            _updateTextPosition: function() {
                var that = this;
                that._text.applySettings(that._vertical ? {
                    x: that._textPosition,
                    y: that._actualPosition + that._textVerticalOffset
                } : {
                    x: that._actualPosition,
                    y: that._textPosition + that._textVerticalOffset
                })
            },
            _updateLinePosition: function() {
                var that = this,
                    actualPosition = that._actualPosition,
                    side1,
                    side2,
                    points;
                if (that._vertical) {
                    if (that._basePosition >= actualPosition) {
                        side1 = actualPosition;
                        side2 = actualPosition + 2
                    }
                    else {
                        side1 = actualPosition - 2;
                        side2 = actualPosition
                    }
                    points = [that._lineStart, side1, that._lineStart, side2, that._lineEnd, side2, that._lineEnd, side1]
                }
                else {
                    if (that._basePosition <= actualPosition) {
                        side1 = actualPosition - 2;
                        side2 = actualPosition
                    }
                    else {
                        side1 = actualPosition;
                        side2 = actualPosition + 2
                    }
                    points = [side1, that._lineStart, side1, that._lineEnd, side2, that._lineEnd, side2, that._lineStart]
                }
                that._line.applySettings({points: points})
            },
            _getTooltipPosition: function() {
                var that = this,
                    crossCenter = (that._minSide + that._maxSide) / 2,
                    alongCenter = (that._basePosition + that._actualPosition) / 2,
                    position = {};
                if (that._vertical)
                    position = {
                        x: crossCenter,
                        y: alongCenter
                    };
                else
                    position = {
                        x: alongCenter,
                        y: crossCenter
                    };
                return position
            },
            measure: function() {
                var that = this,
                    options = that._options,
                    size = _Number(options.size) || 0,
                    textIndent = _Number(options.text.indent),
                    minbound,
                    maxbound,
                    indent;
                that._measureText();
                if (that._vertical) {
                    minbound = maxbound = options.x;
                    if (that._inverted)
                        maxbound = maxbound + size;
                    else
                        minbound = minbound - size;
                    if (that._hasText) {
                        indent = that._textHeight / 2;
                        if (textIndent > 0)
                            maxbound += textIndent + that._textWidth;
                        if (textIndent < 0)
                            minbound += textIndent - that._textWidth
                    }
                }
                else {
                    minbound = maxbound = options.y;
                    if (that._inverted)
                        maxbound = maxbound + size;
                    else
                        minbound = minbound - size;
                    if (that._hasText) {
                        indent = that._textWidth / 2;
                        if (textIndent > 0)
                            maxbound += textIndent + that._textHeight;
                        if (textIndent < 0)
                            minbound += textIndent - that._textHeight
                    }
                }
                return {
                        min: minbound,
                        max: maxbound,
                        indent: indent
                    }
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file rangeContainer.js */
    (function(DX, $, undefined) {
        var isDefined = DX.utils.isDefined,
            isString = DX.utils.isString,
            isArray = DX.utils.isArray,
            Number = window.Number,
            isFinite = window.isFinite,
            max = Math.max,
            abs = Math.abs,
            $each = $.each,
            $map = $.map,
            $extend = $.extend;
        var _Palette = DX.viz.core.Palette;
        function subtractSegmentAsc(segmentStart, segmentEnd, otherStart, otherEnd) {
            var result;
            if (otherStart > segmentStart && otherEnd < segmentEnd)
                result = [{
                        start: segmentStart,
                        end: otherStart
                    }, {
                        start: otherEnd,
                        end: segmentEnd
                    }];
            else if (otherStart >= segmentEnd || otherEnd <= segmentStart)
                result = [{
                        start: segmentStart,
                        end: segmentEnd
                    }];
            else if (otherStart <= segmentStart && otherEnd >= segmentEnd)
                result = [];
            else if (otherStart > segmentStart)
                result = [{
                        start: segmentStart,
                        end: otherStart
                    }];
            else if (otherEnd < segmentEnd)
                result = [{
                        start: otherEnd,
                        end: segmentEnd
                    }];
            return result
        }
        function subtractSegmentDes(segmentStart, segmentEnd, otherStart, otherEnd) {
            var result;
            if (otherStart < segmentStart && otherEnd > segmentEnd)
                result = [{
                        start: segmentStart,
                        end: otherStart
                    }, {
                        start: otherEnd,
                        end: segmentEnd
                    }];
            else if (otherStart <= segmentEnd || otherEnd >= segmentStart)
                result = [{
                        start: segmentStart,
                        end: segmentEnd
                    }];
            else if (otherStart >= segmentStart && otherEnd <= segmentEnd)
                result = [];
            else if (otherStart < segmentStart)
                result = [{
                        start: segmentStart,
                        end: otherStart
                    }];
            else if (otherEnd > segmentEnd)
                result = [{
                        start: otherEnd,
                        end: segmentEnd
                    }];
            return result
        }
        function isNotEmptySegmentAsc(start, end, threshold) {
            return end - start >= threshold
        }
        function isNotEmptySegmentDes(start, end, threshold) {
            return start - end >= threshold
        }
        DX.viz.gauges.__internals.BaseRangeContainer = DX.Class.inherit({
            setup: function(parameters) {
                var that = this;
                DX.utils.debug.assertParam(parameters.renderer, '"renderer" is not passed');
                DX.utils.debug.assertParam(parameters.renderer, '"translator" is not passed');
                DX.utils.debug.assertParam(parameters.owner, '"owner" is not passed');
                that._renderer = parameters.renderer;
                that._translator = parameters.translator;
                that._owner = parameters.owner;
                that._rootElement = that._renderer.createGroup({'class': 'dxg-range-container'});
                that._options = {};
                return that
            },
            dispose: function() {
                var that = this;
                that._renderer = that._owner = that._translator = that._options = that._rootElement = null;
                return that
            },
            init: function(options) {
                var that = this;
                $extend(true, that._options, options);
                if (options && isDefined(options.ranges))
                    that._options.ranges = isArray(options.ranges) ? options.ranges.slice(0) : null;
                return that
            },
            _getRanges: function() {
                var that = this,
                    options = that._options,
                    translator = that._translator,
                    totalStart = translator.getDomainStart(),
                    totalEnd = translator.getDomainEnd(),
                    totalDelta = totalEnd - totalStart,
                    isNotEmptySegment = totalDelta >= 0 ? isNotEmptySegmentAsc : isNotEmptySegmentDes,
                    subtractSegment = totalDelta >= 0 ? subtractSegmentAsc : subtractSegmentDes,
                    list = [],
                    ranges = [],
                    backgroundRanges = [{
                            start: totalStart,
                            end: totalEnd
                        }],
                    threshold = abs(totalDelta) / 1E4,
                    palette = new _Palette(options.palette, {
                        type: 'indicatingSet',
                        theme: options.themeName
                    }),
                    backgroundColor = isString(options.backgroundColor) ? options.backgroundColor : 'none',
                    width = options.width || {},
                    startWidth = Number(width > 0 ? width : width.start),
                    endWidth = Number(width > 0 ? width : width.end),
                    deltaWidth = endWidth - startWidth;
                if (!options.ranges)
                    return null;
                if (!(startWidth >= 0 && endWidth >= 0 && startWidth + endWidth > 0))
                    return null;
                list = $map(options.ranges, function(rangeOptions, i) {
                    rangeOptions = rangeOptions || {};
                    var start = translator.adjust(rangeOptions.startValue),
                        end = translator.adjust(rangeOptions.endValue);
                    return isFinite(start) && isFinite(end) && isNotEmptySegment(start, end, threshold) ? {
                            start: start,
                            end: end,
                            color: rangeOptions.color,
                            classIndex: i
                        } : null
                });
                $each(list, function(i, item) {
                    var paletteColor = palette.getNextColor();
                    item.color = isString(item.color) && item.color || paletteColor || 'none';
                    item.className = 'dxg-range dxg-range-' + item.classIndex;
                    delete item.classIndex
                });
                $each(list, function(_, item) {
                    var i,
                        ii,
                        sub,
                        subs,
                        range,
                        newRanges = [],
                        newBackgroundRanges = [];
                    for (i = 0, ii = ranges.length; i < ii; ++i) {
                        range = ranges[i];
                        subs = subtractSegment(range.start, range.end, item.start, item.end);
                        (sub = subs[0]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub);
                        (sub = subs[1]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub)
                    }
                    newRanges.push(item);
                    ranges = newRanges;
                    for (i = 0, ii = backgroundRanges.length; i < ii; ++i) {
                        range = backgroundRanges[i];
                        subs = subtractSegment(range.start, range.end, item.start, item.end);
                        (sub = subs[0]) && newBackgroundRanges.push(sub);
                        (sub = subs[1]) && newBackgroundRanges.push(sub)
                    }
                    backgroundRanges = newBackgroundRanges
                });
                $each(backgroundRanges, function(_, range) {
                    range.color = backgroundColor;
                    range.className = 'dxg-range dxg-background-range';
                    ranges.push(range)
                });
                $each(ranges, function(_, range) {
                    range.startPosition = translator.translate(range.start);
                    range.endPosition = translator.translate(range.end);
                    range.startWidth = (range.start - totalStart) / totalDelta * deltaWidth + startWidth;
                    range.endWidth = (range.end - totalStart) / totalDelta * deltaWidth + startWidth
                });
                return ranges
            },
            _getRenderSettings: function() {
                throw new Error('_getRenderSettings - not implemented');
            },
            _createRange: function(settings) {
                throw new Error('_createRange - not implemented');
            },
            clean: function() {
                this._rootElement.detach();
                this._rootElement.clear();
                return this
            },
            render: function() {
                var that = this,
                    ranges,
                    settings;
                ranges = that._getRanges();
                settings = ranges ? that._getRenderSettings() : null;
                if (settings) {
                    that._rootElement.append(that._owner);
                    $each(ranges, function(_, range) {
                        var element = that._createRange(range, settings);
                        element.applySettings({
                            fill: range.color,
                            'class': range.className
                        });
                        element.append(that._rootElement)
                    })
                }
                return that
            }
        });
        DX.viz.gauges.__internals.CircularRangeContainer = DX.viz.gauges.__internals.BaseRangeContainer.inherit({
            _getRenderSettings: function() {
                var options = this._options,
                    r = options.radius,
                    inner = 0,
                    outer = 0,
                    width = options.width > 0 ? options.width : max(options.width.start, options.width.end);
                switch (options.orientation) {
                    case'inside':
                        inner = 1;
                        break;
                    case'outside':
                        outer = 1;
                        break;
                    case'center':
                        inner = outer = 0.5;
                        break;
                    default:
                        break
                }
                return (inner || outer) && r + outer * width > 0 && r - inner * width > 0 ? {
                        x: options.x,
                        y: options.y,
                        r: r,
                        inner: inner,
                        outer: outer
                    } : null
            },
            _createRange: function(range, settings) {
                var width = (range.startWidth + range.endWidth) / 2;
                return this._renderer.createArc(settings.x, settings.y, settings.r + settings.outer * width, settings.r - settings.inner * width, range.endPosition, range.startPosition)
            },
            measure: function() {
                var options = this._options,
                    radius = options.radius,
                    size = options.width || {},
                    result = null;
                size = Number(size) || max(size.start, size.end, 0) || 0;
                switch (options.orientation) {
                    case'inside':
                        result = {
                            min: radius - size,
                            max: radius
                        };
                        break;
                    case'outside':
                        result = {
                            min: radius,
                            max: radius + size
                        };
                        break;
                    case'center':
                        result = {
                            min: radius - size / 2,
                            max: radius + size / 2
                        };
                        break
                }
                return result
            }
        });
        DX.viz.gauges.__internals.LinearRangeContainer = DX.viz.gauges.__internals.BaseRangeContainer.inherit({
            _getRenderSettings: function() {
                var that = this,
                    options = that._options,
                    vertical,
                    position,
                    inner = 0,
                    outer = 0;
                if (options.orientation === 'vertical') {
                    position = options.x;
                    vertical = true;
                    switch (options.horizontalOrientation) {
                        case'left':
                            inner = 1;
                            break;
                        case'right':
                            outer = 1;
                            break;
                        case'center':
                            inner = outer = 0.5;
                            break;
                        default:
                            break
                    }
                }
                else {
                    position = options.y;
                    vertical = false;
                    switch (options.verticalOrientation) {
                        case'top':
                            inner = 1;
                            break;
                        case'bottom':
                            outer = 1;
                            break;
                        case'middle':
                            inner = outer = 0.5;
                            break;
                        default:
                            break
                    }
                }
                return inner || outer ? {
                        position: position,
                        vertical: vertical,
                        inner: inner,
                        outer: outer
                    } : null
            },
            _createRange: function(range, settings) {
                var inner = settings.inner,
                    outer = settings.outer,
                    position = settings.position,
                    points;
                if (settings.vertical)
                    points = [position - range.startWidth * inner, range.startPosition, position - range.endWidth * inner, range.endPosition, position + range.endWidth * outer, range.endPosition, position + range.startWidth * outer, range.startPosition];
                else
                    points = [range.startPosition, position + range.startWidth * outer, range.startPosition, position - range.startWidth * inner, range.endPosition, position - range.endWidth * inner, range.endPosition, position + range.endWidth * outer];
                return this._renderer.createArea(points)
            },
            measure: function() {
                var options = this._options,
                    size = options.width || {},
                    result = null;
                size = Number(size) || max(size.start, size.end, 0) || 0;
                if (options.orientation === 'vertical') {
                    result = {
                        min: options.x,
                        max: options.x
                    };
                    switch (options.horizontalOrientation) {
                        case'left':
                            result.min -= size;
                            break;
                        case'right':
                            result.max += size;
                            break;
                        case'center':
                            result.min -= size / 2;
                            result.max += size / 2;
                            break
                    }
                }
                else {
                    result = {
                        min: options.y,
                        max: options.y
                    };
                    switch (options.verticalOrientation) {
                        case'top':
                            result.min -= size;
                            break;
                        case'bottom':
                            result.max += size;
                            break;
                        case'middle':
                            result.min -= size / 2;
                            result.max += size / 2;
                            break
                    }
                }
                return result
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file title.js */
    (function(DX, $, undefined) {
        var Rectangle = DX.viz.core.Rectangle;
        var isString = DX.utils.isString,
            isDefined = DX.utils.isDefined,
            min = Math.min,
            max = Math.max,
            floor = Math.floor,
            ceil = Math.ceil,
            $extend = $.extend;
        DX.viz.gauges.__internals.Title = DX.Class.inherit({
            ctor: function() {
                this._options = {
                    title: {},
                    subtitle: {}
                }
            },
            _measureTexts: function() {
                var that = this,
                    mainBox = that._mainText ? that._mainText.getBBox() : null,
                    subBox = that._subText ? that._subText.getBBox() : null,
                    dy;
                that._location = {
                    x: 0,
                    y: 0
                };
                if (mainBox && subBox) {
                    that._subText.applySettings({y: ceil(-subBox.y)});
                    that._rect = new Rectangle({
                        left: floor(min(mainBox.x, subBox.x)),
                        right: ceil(max(mainBox.x + mainBox.width, subBox.x + subBox.width)),
                        top: floor(mainBox.y),
                        bottom: ceil(subBox.height)
                    })
                }
                else if (mainBox || subBox) {
                    mainBox = mainBox || subBox;
                    that._rect = new Rectangle({
                        left: floor(mainBox.x),
                        right: ceil(mainBox.x + mainBox.width),
                        top: floor(mainBox.y),
                        bottom: ceil(mainBox.y + mainBox.height)
                    })
                }
            },
            render: function(options) {
                var that = this;
                $extend(true, that._options, options);
                that._root = that._root || that._renderer.createGroup({
                    'class': 'dxg-title',
                    align: 'center'
                }).append(that._owner);
                if (isString(that._options.title.text)) {
                    that._mainText = that._mainText || that._renderer.createText().append(that._root);
                    that._mainText.applySettings({
                        x: 0,
                        y: 0,
                        font: that._options.title.font,
                        text: that._options.title.text
                    })
                }
                else {
                    that._mainText && that._mainText.remove();
                    delete that._mainText
                }
                if (isString(that._options.subtitle.text)) {
                    that._subText = that._subText || that._renderer.createText().append(that._root);
                    that._subText.applySettings({
                        x: 0,
                        y: 0,
                        font: that._options.subtitle.font,
                        text: that._options.subtitle.text
                    })
                }
                else {
                    that._subText && that._subText.remove();
                    delete that._subText
                }
                if (that._mainText || that._subText)
                    that._measureTexts();
                else {
                    that._root && that._root.remove();
                    delete that._root
                }
                return that
            },
            processTitleOptions: function(options) {
                if (isString(options))
                    return {text: options};
                else if (!isDefined(options))
                    return {text: null};
                else {
                    options = $extend({}, options);
                    options.layout = $extend({}, options.layout, {position: options.position});
                    return options
                }
            },
            processSubtitleOptions: function(options) {
                if (isString(options))
                    return {text: options};
                else if (!isDefined(options))
                    return {text: null};
                else
                    return $extend({}, options)
            },
            isVisible: function() {
                return !!(this._mainText || this._subText)
            },
            getBoundingRect: function() {
                return this._rect.clone()
            },
            getLayoutOptions: function() {
                return this._options.title.layout || {}
            },
            move: function(dx, dy) {
                var that = this;
                that._root.move(that._location.x += dx, that._location.y += dy);
                that._rect = that._rect.move(dx, dy);
                return that
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file layoutManager.js */
    (function(DX, undefined) {
        var min = Math.min,
            max = Math.max,
            isString = DX.utils.isString;
        var Rectangle = DX.viz.core.Rectangle;
        function parseLayoutOptions(options) {
            options = options || {};
            var parts = (isString(options) ? options : options.position || '').split('-');
            return {
                    primary: isString(parts[0]) ? parts[0].toLowerCase() : '',
                    secondary: isString(parts[1]) ? parts[1].toLowerCase() : '',
                    overlay: options.overlay > 0 ? Number(options.overlay) : 0
                }
        }
        DX.viz.gauges.__internals.LayoutManager = DX.Class.inherit({
            setRect: function(rect) {
                this._rect = rect.clone();
                return this
            },
            getRect: function() {
                return this._rect.clone()
            },
            applyLayout: function(rect, options) {
                var dx = 0,
                    dy = 0,
                    availableRect = this._rect,
                    resultRect = rect.clone(),
                    options_ = parseLayoutOptions(options),
                    delta = resultRect.height() - options_.overlay;
                switch (options_.primary) {
                    case'top':
                        if (delta >= 0) {
                            dy = availableRect.top - resultRect.top;
                            availableRect.top = min(availableRect.top + delta, availableRect.bottom)
                        }
                        else
                            dy = availableRect.top - resultRect.top - delta;
                        break;
                    case'bottom':
                        if (delta >= 0) {
                            dy = availableRect.bottom - resultRect.bottom;
                            availableRect.bottom = max(availableRect.bottom - delta, availableRect.top)
                        }
                        else
                            dy = availableRect.bottom - resultRect.bottom + delta;
                        break
                }
                switch (options_.secondary) {
                    case'':
                    case'center':
                        dx = availableRect.horizontalMiddle() - resultRect.horizontalMiddle();
                        break;
                    case'left':
                        dx = availableRect.left - resultRect.left;
                        break;
                    case'right':
                        dx = availableRect.right - resultRect.right;
                        break
                }
                resultRect = resultRect.move(dx, dy);
                return {
                        rect: resultRect,
                        dx: dx,
                        dy: dy
                    }
            },
            dock: function(rect, options) {
                var dx = 0,
                    dy = 0,
                    mainRect = this._rect,
                    resultRect = rect.clone(),
                    options_ = parseLayoutOptions(options);
                switch (options_.primary) {
                    case'top':
                        dy = mainRect.top - resultRect.bottom + options_.overlay;
                        mainRect.top -= resultRect.height();
                        break;
                    case'bottom':
                        dy = mainRect.bottom - resultRect.top - options_.overlay;
                        mainRect.bottom += resultRect.height();
                        break
                }
                resultRect = resultRect.move(dx, dy);
                return {
                        rect: resultRect,
                        dx: dx,
                        dy: dy
                    }
            },
            selectRectByAspectRatio: function(aspectRatio, margins) {
                var rect = this._rect.clone(),
                    selfAspectRatio,
                    width = 0,
                    height = 0;
                margins = margins || {};
                if (aspectRatio > 0) {
                    rect.left += margins.left || 0;
                    rect.right -= margins.right || 0;
                    rect.top += margins.top || 0;
                    rect.bottom -= margins.bottom || 0;
                    if (rect.width() > 0 && rect.height() > 0) {
                        selfAspectRatio = rect.height() / rect.width();
                        if (selfAspectRatio > 1)
                            aspectRatio < selfAspectRatio ? width = rect.width() : height = rect.height();
                        else
                            aspectRatio > selfAspectRatio ? height = rect.height() : width = rect.width();
                        width > 0 || (width = height / aspectRatio);
                        height > 0 || (height = width * aspectRatio);
                        width = (rect.width() - width) / 2;
                        height = (rect.height() - height) / 2;
                        rect.left += width;
                        rect.right -= width;
                        rect.top += height;
                        rect.bottom -= height
                    }
                    else {
                        rect.left = rect.right = rect.horizontalMiddle();
                        rect.top = rect.bottom = rect.verticalMiddle()
                    }
                }
                return rect
            },
            selectRectBySizes: function(sizes, margins) {
                var rect = this._rect.clone(),
                    step;
                margins = margins || {};
                if (sizes) {
                    rect.left += margins.left || 0;
                    rect.right -= margins.right || 0;
                    rect.top += margins.top || 0;
                    rect.bottom -= margins.bottom || 0;
                    if (sizes.width > 0) {
                        step = (rect.width() - sizes.width) / 2;
                        if (step > 0) {
                            rect.left += step;
                            rect.right -= step
                        }
                    }
                    if (sizes.height > 0) {
                        step = (rect.height() - sizes.height) / 2;
                        if (step > 0) {
                            rect.top += step;
                            rect.bottom -= step
                        }
                    }
                }
                return rect
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file themeManager.js */
    (function(DX, undefined) {
        DX.viz.gauges.__internals.ThemeManager = DX.viz.core.BaseThemeManager.inherit({
            _themeSection: 'gauge',
            _initializeTheme: function() {
                var that = this;
                that._initializeFont(that._theme.scale.label.font);
                that._initializeFont(that._theme.valueIndicator.rangebar.text.font);
                that._initializeFont(that._theme.subvalueIndicator.textcloud.text.font);
                that._initializeFont(that._theme.valueIndicators.rangebar.text.font);
                that._initializeFont(that._theme.valueIndicators.textcloud.text.font);
                that._initializeFont(that._theme.title.font);
                that._initializeFont(that._theme.subtitle.font);
                that._initializeFont(that._theme.tooltip.font);
                that._initializeFont(that._theme.indicator.text.font);
                that._initializeFont(that._theme.loadingIndicator.font)
            },
            getPartialTheme: function(name) {
                return this._theme[name] || {}
            }
        })
    })(DevExpress);
    /*! Module viz-gauges, file presetManager.js */
    /*! Module viz-gauges, file gauge.js */
    (function(DX, $, undefined) {
        var viz = DX.viz,
            factory = viz.gauges.__factory,
            chartFactory = viz.charts.factory,
            core = viz.core;
        var Rectangle = DX.viz.core.Rectangle;
        var _utils = DX.utils,
            isArray = _utils.isArray,
            isFunction = _utils.isFunction,
            isFinite = window.isFinite,
            Number = window.Number,
            String = window.String,
            setTimeout = window.setTimeout,
            $extend = $.extend,
            $each = $.each,
            $map = $.map,
            _noop = $.noop,
            core = DX.viz.core;
        var REDRAW_DELAY = 500;
        var OPTION_VALUE = 'value',
            OPTION_SUBVALUES = 'subvalues',
            OPTION_LOADINDICATOR = 'loadingIndicator';
        DX.viz.gauges.__internals.BASE_GAUGE_SETTINGS = {
            size: {
                width: undefined,
                height: undefined
            },
            margin: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            redrawOnResize: true,
            theme: undefined,
            title: {
                text: undefined,
                layout: {
                    position: 'top-center',
                    overlay: 0
                }
            },
            subtitle: {text: undefined},
            indicator: {
                hasPositiveMeaning: true,
                text: {
                    format: 'fixedPoint',
                    precision: 0,
                    customizeText: $.none,
                    useDefaultColor: false
                },
                layout: {
                    position: 'bottom-center',
                    overlay: 0
                }
            },
            tooltip: {
                enabled: false,
                format: undefined,
                precision: undefined,
                customizeText: undefined,
                customizeTooltip: undefined
            }
        };
        var DEFAULT_GAUGE_SETTINGS = {
                scale: {
                    majorTick: {
                        visible: true,
                        tickInterval: undefined,
                        length: 5,
                        width: 2,
                        showCalculatedTicks: true,
                        useTicksAutoArrangement: true,
                        customTickValues: []
                    },
                    minorTick: {
                        visible: false,
                        tickInterval: undefined,
                        length: 3,
                        width: 1,
                        showCalculatedTicks: true,
                        customTickValues: []
                    },
                    label: {
                        visible: true,
                        format: undefined,
                        precision: undefined,
                        customizeText: undefined
                    }
                },
                rangeContainer: {
                    offset: 0,
                    width: 5,
                    ranges: []
                },
                valueIndicator: {rangebar: {
                        baseValue: undefined,
                        space: 2,
                        size: 10,
                        text: {
                            indent: 0,
                            customizeText: undefined,
                            format: undefined,
                            precision: undefined
                        }
                    }},
                subvalueIndicator: {
                    trianglemarker: {
                        space: 2,
                        length: 14,
                        width: 13
                    },
                    triangle: {
                        space: 2,
                        length: 14,
                        width: 13
                    },
                    textcloud: {
                        arrowLength: 5,
                        horizontalOffset: 6,
                        verticalOffset: 3,
                        text: {
                            format: undefined,
                            precision: undefined,
                            customizeText: undefined
                        }
                    }
                },
                valueIndicators: {
                    rangebar: {
                        baseValue: undefined,
                        space: 2,
                        size: 10,
                        text: {
                            indent: 0,
                            customizeText: undefined,
                            format: undefined,
                            precision: undefined
                        }
                    },
                    trianglemarker: {
                        space: 2,
                        length: 14,
                        width: 13
                    },
                    textcloud: {
                        arrowLength: 5,
                        horizontalOffset: 6,
                        verticalOffset: 3,
                        text: {
                            format: undefined,
                            precision: undefined,
                            customizeText: undefined
                        }
                    }
                }
            };
        DX.viz.gauges.Gauge = core.BaseWidget.inherit({
            _themeManagerType: DX.viz.gauges.__internals.ThemeManager,
            _init: function() {
                var that = this;
                that._initRenderer();
                that._themeManager = new that._themeManagerType;
                that._translator = core.CoreFactory.createTranslator1D(0, 0, 0, 0);
                that._tracker = factory.createTracker({
                    renderer: that._renderer,
                    container: that._rootElement
                });
                that._layoutManager = factory.createLayoutManager();
                that._defaultSettings = that._getDefaultSettings();
                that._mainElements = [];
                that._externalElements = [];
                that._measureElements = [];
                that.callBase();
                that._selectMode()
            },
            _dispose: function() {
                var that = this;
                that.callBase.apply(that, arguments);
                that._scale && that._scale.dispose() && delete that._scale;
                that._rangeContainer && that._rangeContainer.dispose() && delete that._rangeContainer;
                that._disposeValueIndicators();
                that._tooltip && that._tooltip.dispose();
                delete that._tooltip;
                that._tooltipGroup && that._tooltipGroup.dispose();
                delete that._tooltipGroup;
                that._tracker.dispose() && delete that._tracker;
                that._disposeRenderer();
                that._themeManager.dispose() && delete that._themeManager;
                delete that._layoutManager;
                delete that._defaultSettings;
                delete that._mainElements;
                delete that._externalElements;
                delete that._measureElements;
                that._animationSettings = null;
                that._disposeLoadIndicator()
            },
            _disposeValueIndicators: function() {
                var that = this;
                that._valueIndicator && that._valueIndicator.dispose() && delete that._valueIndicator;
                that._subvalueIndicatorsSet && that._subvalueIndicatorsSet.dispose() && delete that._subvalueIndicatorsSet
            },
            _selectMode: function() {
                var that = this;
                if (that.option(OPTION_VALUE) === undefined && that.option(OPTION_SUBVALUES) === undefined)
                    if (that.option('needles') !== undefined || that.option('markers') !== undefined || that.option('rangeBars') !== undefined) {
                        that._value = that._subvalues = that.value = that.subvalues = _noop;
                        that._updateActiveElements = function() {
                            var noAnimation = this._noAnimation;
                            $each([].concat(this._needles || [], this._markers || [], this._rangeBars || []), function(_, pointer) {
                                pointer.value(pointer._options.value, noAnimation)
                            });
                            this._resizing || this.hideLoadingIndicator()
                        };
                        that._prepareValueIndicators = function() {
                            prepareObsoleteElements(this)
                        };
                        that._disposeValueIndicators = function() {
                            $each([].concat(this._needles || [], this._markers || [], this._rangeBars || []), function(_, pointer) {
                                pointer.dispose()
                            });
                            delete this._needles;
                            delete this._markers;
                            delete this._rangeBars
                        };
                        that._cleanValueIndicators = function() {
                            $each([].concat(this._needles || [], this._markers || [], this._rangeBars || []), function(_, pointer) {
                                pointer.clean()
                            })
                        };
                        that.needleValue = function(index, value) {
                            return accessPointerValue.call(this, this._needles, arguments)
                        };
                        that.markerValue = function(index, value) {
                            return accessPointerValue.call(this, this._markers, arguments)
                        };
                        that.rangeBarValue = function(index, value) {
                            return accessPointerValue.call(this, this._rangeBars, arguments)
                        }
                    }
                    else if (that.option('valueIndicators') !== undefined) {
                        that._value = that._subvalues = that.value = that.subvalues = _noop;
                        that._updateActiveElements = function() {
                            var noAnimation = this._noAnimation;
                            $each(this._valueIndicators, function(_, valueIndicator) {
                                valueIndicator.value(valueIndicator._options.value, noAnimation)
                            });
                            this._resizing || this.hideLoadingIndicator()
                        };
                        that._prepareValueIndicators = function() {
                            prepareValueIndicatorsInHardMode(this)
                        };
                        that._disposeValueIndicators = function() {
                            $each(this._valueIndicators, function(_, valueIndicator) {
                                valueIndicator.dispose()
                            });
                            delete this._valueIndicators
                        };
                        that._cleanValueIndicators = function() {
                            $each(this._valueIndicators, function(_, valueIndicator) {
                                valueIndicator.clean()
                            })
                        };
                        that.indicatorValue = function() {
                            return accessPointerValue.call(this, this._valueIndicators, arguments)
                        }
                    }
            },
            _initRenderer: function() {
                var that = this;
                that._canvas = {
                    width: 1,
                    height: 1,
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    marginBottom: 0
                };
                that._renderer = core.CoreFactory.createRenderer({
                    width: 1,
                    height: 1,
                    pathModified: that.option('pathModified'),
                    rtl: that.option('rtlEnabled')
                });
                that._rootElement = that._renderer.getRoot();
                that._rootElement.applySettings({'class': 'dxg ' + that._rootClass})
            },
            _disposeRenderer: function() {
                var that = this;
                that._renderer.killContainer();
                delete that._renderer;
                delete that._canvas;
                that._rootElement.remove();
                delete that._rootElement
            },
            _resize: function() {
                var that = this;
                if (that._updateCanvas()) {
                    that._resizing = that._noAnimation = true;
                    that._clean();
                    that._renderCore();
                    delete that._resizing
                }
            },
            _getDefaultSettings: function() {
                return $extend(true, {}, DX.viz.gauges.__internals.BASE_GAUGE_SETTINGS, DEFAULT_GAUGE_SETTINGS)
            },
            _setupAnimationSettings: function() {
                var that = this,
                    option = that.option('animation');
                that._animationSettings = null;
                if (option === undefined || option) {
                    if (option === undefined)
                        option = {
                            enabled: that.option('animationEnabled'),
                            duration: that.option('animationDuration')
                        };
                    option = $extend({
                        enabled: true,
                        duration: 1000,
                        easing: 'easeOutCubic'
                    }, option);
                    if (option.enabled && option.duration > 0)
                        that._animationSettings = {
                            duration: Number(option.duration),
                            easing: option.easing
                        }
                }
            },
            _getDefaultFormatOptions: function() {
                return _utils.getAppropriateFormat(this._area.startValue, this._area.endValue, this._getApproximateScreenRange())
            },
            _getCanvas: function() {
                var that = this,
                    size = that.option('size') || {},
                    margin = that.option('margin') || {},
                    defaultSize = that._getDefaultContainerSize(),
                    width = size.width >= 0 ? Number(size.width) : that._element().width(),
                    height = size.height >= 0 ? Number(size.height) : that._element().height(),
                    marginLeft = margin.left > 0 ? Number(margin.left) : 0,
                    marginTop = margin.top > 0 ? Number(margin.top) : 0,
                    marginRight = margin.right > 0 ? Number(margin.right) : 0,
                    marginBottom = margin.bottom > 0 ? Number(margin.bottom) : 0;
                if (!width && Number(size.width) !== 0)
                    width = defaultSize.width;
                if (!height && Number(size.height) !== 0)
                    height = defaultSize.height;
                if (marginLeft + marginRight >= width)
                    marginLeft = marginRight = 0;
                if (marginTop + marginBottom >= height)
                    marginTop = marginBottom = 0;
                return {
                        width: width,
                        height: height,
                        marginLeft: marginLeft,
                        marginTop: marginTop,
                        marginRight: marginRight,
                        marginBottom: marginBottom
                    }
            },
            _updateVisibility: function(canvas) {
                var that = this;
                if (canvas.width - canvas.marginLeft - canvas.marginRight >= 2 && canvas.height - canvas.marginTop - canvas.marginBottom >= 2 && that._element().is(':visible'))
                    return true;
                else {
                    that._incidentOccured('W2001', [that.NAME]);
                    return false
                }
            },
            _getArea: function() {
                var that = this,
                    scale = that.option('scale') || {},
                    area = {};
                area.startValue = isFinite(scale.startValue) ? Number(scale.startValue) : 0;
                area.endValue = isFinite(scale.endValue) ? Number(scale.endValue) : 100;
                area.baseValue = Math.min(area.startValue, area.endValue);
                that._setupArea(area);
                that._translator.setup({
                    codomainStart: area.startCoord,
                    codomainEnd: area.endCoord,
                    domainStart: area.startValue,
                    domainEnd: area.endValue
                });
                return area
            },
            _renderTitle: function() {
                var that = this,
                    titleOptions = that.option('title'),
                    subtitleOptions = that.option('subtitle');
                if (!that._title) {
                    that._title = factory.createTitle();
                    that._title._renderer = that._renderer;
                    that._title._owner = that._rootElement
                }
                titleOptions = $extend(true, {}, that._defaultSettings.title, that._themeManager.getPartialTheme('title'), that._title.processTitleOptions(titleOptions));
                subtitleOptions = $extend(true, {}, that._defaultSettings.subtitle, that._themeManager.getPartialTheme('subtitle'), that._title.processSubtitleOptions(subtitleOptions));
                that._title.render({
                    title: titleOptions,
                    subtitle: subtitleOptions
                });
                that._title.isVisible() && that._externalElements.push(that._title)
            },
            _renderDeltaIndicator: function() {
                var that = this,
                    options = that.option('indicator');
                if (!that._indicator) {
                    that._indicator = factory.createIndicator();
                    if (that._indicator) {
                        that._indicator._renderer = that._renderer;
                        that._indicator._owner = that._rootElement
                    }
                }
                if (that._indicator) {
                    options = $extend(true, {}, that._defaultSettings.indicator, that._themeManager.getPartialTheme('indicator'), options);
                    that._indicator.render(options);
                    that._indicator.isVisible() && that._externalElements.push(that._indicator)
                }
            },
            _getTooltipSettings: function(options) {
                return $.extend({}, options, {
                        text: {
                            font: options.font,
                            'class': 'dxg-text'
                        },
                        canvasWidth: this._rootRect.width(),
                        canvasHeight: this._rootRect.height()
                    })
            },
            _setTooltipCallBacks: function() {
                var that = this;
                var prepareCallback = function(target, info) {
                        var tooltipParameters = target.getTooltipParameters(),
                            formatObject = $extend({
                                value: tooltipParameters.value,
                                valueText: that._tooltip.formatValue(tooltipParameters.value),
                                color: tooltipParameters.color
                            }, info);
                        return that._tooltip.prepare(formatObject, {
                                x: tooltipParameters.x,
                                y: tooltipParameters.y,
                                offset: tooltipParameters.offset
                            })
                    };
                var showCallback = function() {
                        return that._tooltip.show()
                    };
                var hideCallback = function() {
                        return that._tooltip.hide()
                    };
                that._tracker.setCallbacks({
                    'tooltip-prepare': prepareCallback,
                    'tooltip-show': showCallback,
                    'tooltip-hide': hideCallback
                })
            },
            _renderTooltip: function() {
                var that = this,
                    options = $extend(true, {}, that._defaultSettings.tooltip, that._themeManager.getPartialTheme('tooltip'), that.option('tooltip'));
                options = that._getTooltipSettings(options);
                if (!that._tooltip) {
                    that._tooltipGroup = that._renderer.createGroup({'class': 'dxg-tooltip'});
                    that._tooltip = core.CoreFactory.createTooltip({}, that._tooltipGroup, that._renderer);
                    that._tooltip._tracker = this._tracker;
                    that._setTooltipCallBacks()
                }
                that._tooltip.update(options);
                that._tracker.setTooltipState(that._tooltip.enabled());
                that._tooltip.enabled() && that._tooltipGroup.append(that._rootElement)
            },
            _renderDebugInfo: function() {
                var that = this,
                    group = that._debugGroup || that._renderer.createGroup({'class': 'debug-info'}).append(),
                    rect;
                group.clear();
                rect = that._rootRect;
                that._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#000000',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group);
                rect = that._mainRect;
                that._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#0000FF',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group);
                rect = that._layoutManager.getRect();
                rect && that._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#FF0000',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group);
                rect = that._title && that._title.isVisible() ? that._title.getBoundingRect() : null;
                rect && that._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#00FF00',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group);
                rect = that._indicator && that._indicator.isVisible() ? that._indicator.getBoundingRect() : null;
                rect && that._renderer.createRect(rect.left, rect.top, rect.width(), rect.height(), 0, {
                    stroke: '#00FF00',
                    strokeWidth: 1,
                    fill: 'none'
                }).append(group)
            },
            _updateCanvas: function(force) {
                var currentCanvas = this._canvas,
                    newCanvas = this._getCanvas();
                if (!this._updateVisibility(newCanvas))
                    return false;
                if (newCanvas.width === currentCanvas.width && newCanvas.height === currentCanvas.height && !force)
                    return false;
                this._canvas = newCanvas;
                return true
            },
            _renderCore: function() {
                var that = this,
                    canvas = that._canvas;
                that._renderer.container || that._renderer.draw(that._element().get(0));
                that._renderer.resize(canvas.width, canvas.height);
                that._rootRect = new Rectangle({
                    left: canvas.marginLeft,
                    top: canvas.marginTop,
                    right: canvas.width - canvas.marginRight,
                    bottom: canvas.height - canvas.marginBottom
                });
                that._layoutManager.setRect(that._rootRect);
                that._mainRect = that._rootRect.clone();
                that._defaultFormatOptions = that._getDefaultFormatOptions();
                that._mainElements.length = 0;
                that._externalElements.length = 0;
                that._measureElements.length = 0;
                that._renderTitle();
                that._renderDeltaIndicator();
                that._externalElements.reverse();
                $each(that._externalElements, function(_, item) {
                    var layout = that._layoutManager.applyLayout(item.getBoundingRect(), item.getLayoutOptions());
                    item.move(layout.dx, layout.dy)
                });
                that._mainRect = that._layoutManager.getRect();
                that._prepareMainElements();
                $each(that._measureElements, function(_, element) {
                    that._updateElementPosition(element)
                });
                that._applyMainLayout();
                that._renderMainElements();
                $each(that._externalElements, function(_, item) {
                    var layout = that._layoutManager.dock(item.getBoundingRect(), item.getLayoutOptions());
                    item.move(layout.dx, layout.dy)
                });
                that._renderTooltip();
                that._tracker.activate();
                that._updateLoadIndicator(undefined, that._canvas.width, that._canvas.height);
                that._updateActiveElements();
                delete that._noAnimation;
                that.option('debugMode') === true && that._renderDebugInfo();
                that._debug_rendered && that._debug_rendered()
            },
            _updateIndicatorSettings: function(settings) {
                var that = this;
                settings.baseValue = isFinite(that._translator.translate(settings.baseValue)) ? Number(settings.baseValue) : that._area.baseValue;
                settings.currentValue = settings.baseValue;
                if (settings.text && !settings.text.format && !settings.text.precision) {
                    settings.text.format = that._defaultFormatOptions.format;
                    settings.text.precision = that._defaultFormatOptions.precision
                }
            },
            _prepareValueIndicatorSettings: function() {
                var that = this,
                    options = that.option('valueIndicator') || {},
                    defaultOptions = $extend(true, {}, that._defaultSettings.valueIndicator, that._themeManager.getPartialTheme('valueIndicator')),
                    type = String(options.type || defaultOptions.type).toLowerCase();
                that._valueIndicatorSettings = $extend(true, defaultOptions._default, defaultOptions[type], options, {
                    type: type,
                    animation: that._animationSettings,
                    containerBackgroundColor: that._containerBackgroundColor
                });
                that._updateIndicatorSettings(that._valueIndicatorSettings)
            },
            _prepareSubvalueIndicatorSettings: function() {
                var that = this,
                    options = that.option('subvalueIndicator') || {},
                    defaultOptions = $extend(true, {}, that._defaultSettings.subvalueIndicator, that._themeManager.getPartialTheme('subvalueIndicator')),
                    type = String(options.type || defaultOptions.type).toLowerCase();
                that._subvalueIndicatorSettings = $extend(true, defaultOptions._default, defaultOptions[type], options, {
                    type: type,
                    animation: that._animationSettings,
                    containerBackgroundColor: that._containerBackgroundColor
                });
                that._updateIndicatorSettings(that._subvalueIndicatorSettings)
            },
            _renderMainElements: function() {
                var that = this;
                that._translator.setup({
                    domainStart: that._area.startValue,
                    domainEnd: that._area.endValue,
                    codomainStart: that._area.startCoord,
                    codomainEnd: that._area.endCoord
                });
                $each(that._mainElements, function(_, element) {
                    that._updateElementPosition(element);
                    element.render()
                })
            },
            _clean: function() {
                var that = this;
                that._tracker.deactivate();
                that._tooltipGroup && that._tooltipGroup.detach();
                that._scale && that._scale.clean();
                that._rangeContainer && that._rangeContainer.clean();
                that._cleanValueIndicators()
            },
            _cleanValueIndicators: function() {
                this._valueIndicator && this._valueIndicator.clean();
                this._subvalueIndicatorsSet && this._subvalueIndicatorsSet.clean()
            },
            _render: function() {
                var that = this;
                that._themeManager.setTheme(that.option('theme'));
                that._setupAnimationSettings();
                that._area = that._getArea();
                that._containerBackgroundColor = that.option('containerBackgroundColor') || that._themeManager.getPartialTheme('containerBackgroundColor') || that._defaultSettings.containerBackgroundColor;
                if (that._updateCanvas(true))
                    that._renderCore();
                that._drawn()
            },
            _prepareMainElements: function() {
                this._prepareRangeContainer();
                this._prepareScale();
                this._prepareValueIndicators()
            },
            _prepareValueIndicators: function() {
                this._prepareValueIndicator();
                this._prepareSubvalueIndicators()
            },
            _updateActiveElements: function() {
                var that = this;
                that._value(that.option(OPTION_VALUE));
                that._subvalues(that.option(OPTION_SUBVALUES))
            },
            _prepareScale: function() {
                var that = this,
                    scale = that._scale;
                if (!scale) {
                    scale = that._scale = that._createScale();
                    scale.setup({
                        renderer: that._renderer,
                        translator: that._translator,
                        owner: that._rootElement
                    })
                }
                scale.init($extend(true, {}, that._defaultSettings.scale, that._themeManager.getPartialTheme('scale'), that.option('scale'), {
                    offset: 0,
                    approximateScreenDelta: that._getApproximateScreenRange()
                }));
                that._mainElements.push(scale);
                that._measureElements.push(scale)
            },
            _prepareRangeContainer: function() {
                var that = this,
                    rangeContainer = that._rangeContainer;
                if (!rangeContainer) {
                    rangeContainer = that._rangeContainer = that._createRangeContainer();
                    rangeContainer.setup({
                        renderer: that._renderer,
                        translator: that._translator,
                        owner: that._rootElement
                    })
                }
                rangeContainer.init($extend({}, that._defaultSettings.rangeContainer, that._themeManager.getPartialTheme('rangeContainer'), that.option('rangeContainer'), {themeName: that._themeManager.themeName()}));
                that._mainElements.push(rangeContainer);
                that._measureElements.push(rangeContainer)
            },
            _prepareValueIndicator: function() {
                var that = this,
                    indicator = that._valueIndicator,
                    currentValue;
                that._prepareValueIndicatorSettings();
                indicator && that._valueIndicatorType !== that._valueIndicatorSettings.type && indicator.dispose() && (indicator = null);
                that._valueIndicatorType = that._valueIndicatorSettings.type;
                if (!indicator) {
                    indicator = that._valueIndicator = that._createValueIndicator(that._valueIndicatorType);
                    if (indicator) {
                        indicator.setup({
                            renderer: that._renderer,
                            translator: that._translator,
                            owner: that._rootElement,
                            tracker: that._tracker,
                            className: 'dxg-value-indicator'
                        });
                        indicator._trackerInfo = {type: 'value-indicator'}
                    }
                }
                indicator.init(that._valueIndicatorSettings);
                that._mainElements.push(indicator);
                that._measureElements.push(indicator)
            },
            _prepareSubvalueIndicators: function() {
                var that = this,
                    subvalueIndicatorsSet = that._subvalueIndicatorsSet;
                if (!subvalueIndicatorsSet)
                    subvalueIndicatorsSet = that._subvalueIndicatorsSet = new DX.viz.gauges.__internals.ValueIndicatorsSet({
                        renderer: that._renderer,
                        translator: that._translator,
                        owner: that._rootElement,
                        tracker: that._tracker,
                        className: 'dxg-subvalue-indicators',
                        indicatorClassName: 'dxg-subvalue-indicator',
                        trackerType: 'subvalue-indicator',
                        createIndicator: function() {
                            return that._createSubvalueIndicator(that._subvalueIndicatorType)
                        }
                    });
                that._prepareSubvalueIndicatorSettings();
                var isRecreate = that._subvalueIndicatorSettings.type !== that._subvalueIndicatorType;
                that._subvalueIndicatorType = that._subvalueIndicatorSettings.type;
                if (that._createSubvalueIndicator(that._subvalueIndicatorType)) {
                    subvalueIndicatorsSet.setSettings(that._subvalueIndicatorSettings, that.option(OPTION_SUBVALUES)).prepare(isRecreate);
                    that._measureElements.push(subvalueIndicatorsSet);
                    that._mainElements.push(subvalueIndicatorsSet)
                }
            },
            _value: function(value) {
                var that = this;
                if (arguments.length) {
                    that._valueIndicator && that._valueIndicator.value(value, that._noAnimation);
                    that._resizing || that.hideLoadingIndicator();
                    return that
                }
                return that._valueIndicator ? that._valueIndicator.value() : that.option(OPTION_VALUE)
            },
            _subvalues: function(values) {
                var that = this;
                if (arguments.length) {
                    that._subvalueIndicatorsSet && that._subvalueIndicatorsSet.values(values, that._noAnimation);
                    that._resizing || that.hideLoadingIndicator();
                    return that
                }
                return that._subvalueIndicatorsSet ? that._subvalueIndicatorsSet.values() : that.option(OPTION_SUBVALUES)
            },
            _refresh: function() {
                var that = this,
                    callBase = that.callBase;
                that._endLoading(function() {
                    callBase.call(that)
                })
            },
            render: function(options) {
                options && options.animate !== undefined && !options.animate && (this._noAnimation = true);
                this._refresh();
                return this
            },
            value: function(arg) {
                var that = this;
                if (arguments.length) {
                    that._value(arg);
                    that.option(OPTION_VALUE, that._value());
                    return that
                }
                return that._value()
            },
            subvalues: function(arg) {
                var that = this;
                if (arguments.length) {
                    that._subvalues(arg);
                    that.option(OPTION_SUBVALUES, that._subvalues());
                    return that
                }
                return that._subvalues()
            },
            showLoadingIndicator: function() {
                this._showLoadIndicator($.extend(true, {}, this._themeManager.getPartialTheme('loadingIndicator'), this.option('loadingIndicator')), this._canvas || {})
            },
            _optionChanged: function(name, newValue, oldValue) {
                var that = this;
                switch (name) {
                    case OPTION_VALUE:
                        that._value(newValue);
                        that.option(OPTION_VALUE, that._value());
                        return null;
                    case OPTION_SUBVALUES:
                        that._subvalues(newValue);
                        that.option(OPTION_SUBVALUES, that._subvalues());
                        return null;
                    default:
                        return that.callBase.apply(that, arguments)
                }
            },
            _getLoadIndicatorOption: function() {
                return $extend(true, {}, this._themeManager.getPartialTheme(OPTION_LOADINDICATOR), this.option(OPTION_LOADINDICATOR))
            },
            _optionValuesEqual: function(name, oldValue, newValue) {
                switch (name) {
                    case OPTION_VALUE:
                        return oldValue === newValue;
                    case OPTION_SUBVALUES:
                        return compareArrays(oldValue, newValue);
                    default:
                        return this.callBase.apply(this, arguments)
                }
            },
            _getDefaultContainerSize: function() {
                throw new Error('_getDefaultContainerSize - not implemented');
            },
            _setupArea: function() {
                throw new Error('_setupArea - not implemented');
            },
            _applyMainLayout: function() {
                throw new Error('_applyMainLayout - not implemented');
            },
            _updateElementPosition: function(element) {
                throw new Error('_updateElementPosition - not implemented');
            },
            _createScale: function() {
                throw new Error('_createScale - not implemented');
            },
            _createRangeContainer: function() {
                throw new Error('_createRangeContainer - not implemented');
            },
            _createValueIndicator: function() {
                throw new Error('_createValueIndicator - not implemented');
            },
            _createSubvalueIndicator: function() {
                throw new Error('_createSubvalueIndicator - not implemented');
            },
            _getApproximateScreenRange: function() {
                throw new Error('_getApproximateScreenRange - not implemented');
            }
        });
        function prepareValueIndicatorsInHardMode(that) {
            var valueIndicators = that._valueIndicators || [],
                userOptions = that.option('valueIndicators'),
                optionList = [],
                i = 0,
                ii;
            for (ii = isArray(userOptions) ? userOptions.length : 0; i < ii; ++i)
                optionList.push(userOptions[i]);
            for (ii = valueIndicators.length; i < ii; ++i)
                optionList.push(null);
            var defaultSettings = that._defaultSettings.valueIndicators,
                themeSettings = that._themeManager.getPartialTheme('valueIndicators'),
                parameters = {
                    renderer: that._renderer,
                    owner: that._rootElement,
                    translator: that._translator,
                    tracker: that._tracker
                },
                newValueIndicators = [];
            $each(optionList, function(i, userSettings) {
                var valueIndicator = valueIndicators[i];
                if (!userSettings) {
                    valueIndicator && valueIndicator.dispose();
                    return
                }
                var type = String(userSettings.type || defaultSettings._type).toLowerCase();
                if (valueIndicator && type !== valueIndicator._options.type) {
                    valueIndicator.dispose();
                    valueIndicator = null
                }
                if (!valueIndicator) {
                    valueIndicator = that._createValueIndicatorInHardMode(type);
                    valueIndicator && valueIndicator.setup(parameters)
                }
                if (valueIndicator) {
                    var settings = $extend(true, {}, defaultSettings._default, defaultSettings[type], themeSettings._default, themeSettings[type], userSettings, {
                            type: type,
                            animation: that._animationSettings,
                            containerBackgroundColor: that._containerBackgroundColor
                        });
                    that._updateIndicatorSettings(settings);
                    valueIndicator.init(settings);
                    valueIndicator._trackerInfo = {index: i};
                    that._mainElements.push(valueIndicator);
                    that._measureElements.push(valueIndicator);
                    newValueIndicators.push(valueIndicator)
                }
            });
            that._valueIndicators = newValueIndicators
        }
        function prepareObsoleteElements(that) {
            prepareObsoletePointers(that, '_rangeBars', '_createRangeBar', {
                user: that.option('rangeBars'),
                common: that.option('commonRangeBarSettings'),
                _default: that._defaultSettings.valueIndicator,
                theme: that._themeManager.getPartialTheme('valueIndicator'),
                preset: {},
                type: 'rangebar',
                className: 'dxg-value-indicator'
            });
            prepareObsoletePointers(that, '_needles', '_createNeedle', {
                user: that.option('needles'),
                common: that.option('commonNeedleSettings'),
                _default: that._defaultSettings.valueIndicator,
                theme: that._themeManager.getPartialTheme('valueIndicator'),
                preset: that._getPreset().commonNeedleSettings,
                className: 'dxg-value-indicator'
            });
            prepareObsoletePointers(that, '_markers', '_createMarker', {
                user: that.option('markers'),
                common: that.option('commonMarkerSettings'),
                _default: that._defaultSettings.subvalueIndicator,
                theme: that._themeManager.getPartialTheme('subvalueIndicator'),
                preset: that._getPreset().commonMarkerSettings,
                className: 'dxg-subvalue-indicator'
            })
        }
        function prepareObsoletePointers(that, fieldName, methodName, options) {
            var pointers = that[fieldName] || [],
                userOptions = [],
                i = 0,
                ii;
            for (ii = isArray(options.user) ? options.user.length : 0; i < ii; ++i)
                userOptions.push(options.user[i]);
            for (ii = pointers.length; i < ii; ++i)
                userOptions.push(null);
            var defaultOption = options._default,
                themeOption = options.theme,
                presetOption = options.preset,
                commonOption = options.common || {},
                parameters = {
                    renderer: that._renderer,
                    owner: that._rootElement,
                    translator: that._translator,
                    tracker: that._tracker,
                    className: options.className
                },
                newPointers = [];
            $each(userOptions, function(i, pointerOption) {
                var pointer = pointers[i];
                if (!pointerOption) {
                    pointer && pointer.dispose();
                    return
                }
                var type = String(pointerOption.type || commonOption.type || presetOption.type || defaultOption.type).toLowerCase(),
                    settings;
                if (pointer && pointer._options.type !== type) {
                    pointer.dispose();
                    pointer = null
                }
                if (!pointer) {
                    pointer = that[methodName](type);
                    pointer.setup(parameters)
                }
                if (pointer) {
                    type = options.type || type;
                    settings = $extend(true, {}, defaultOption._default, defaultOption[type], themeOption._default, themeOption[type], commonOption, pointerOption),
                    delete settings.spindleSize;
                    settings.animation = that._animationSettings;
                    settings.containerBackgroundColor = that._containerBackgroundColor;
                    that._updateIndicatorSettings(settings);
                    pointer.init(settings);
                    that._mainElements.push(pointer);
                    that._measureElements.push(pointer);
                    newPointers.push(pointer)
                }
            });
            if (newPointers.length)
                that[fieldName] = newPointers;
            else
                delete that[fieldName]
        }
        function accessPointerValue(pointers, args) {
            var pointer = (pointers || [])[args[0]];
            if (args.length > 1) {
                pointer && pointer.value(args[1]);
                this._resizing || this.hideLoadingIndicator();
                return this
            }
            else
                return pointer ? pointer.value() : undefined
        }
        function compareArrays(array1, array2) {
            if (array1 === array2)
                return true;
            if (isArray(array1) && isArray(array2) && array1.length === array2.length) {
                for (var i = 0, ii = array1.length; i < ii; ++i)
                    if (array1[i] !== array2[i])
                        return false;
                return true
            }
            return false
        }
        DX.viz.gauges.__internals.ValueIndicatorsSet = DX.Class.inherit({
            ctor: function(parameters) {
                var that = this;
                that._parameters = parameters;
                that._createIndicator = that._parameters.createIndicator || _noop;
                that._root = that._parameters.renderer.createGroup({'class': that._parameters.className})
            },
            dispose: function() {
                var that = this;
                if (that._indicators)
                    $each(that._indicators, function(_, indicator) {
                        indicator.dispose()
                    });
                that._parameters = that._createIndicator = that._root = that._options = that._indicators = that._colorPalette = that._palette = null;
                return that
            },
            setSettings: function(indicatorSettings, data) {
                var that = this;
                that._indicatorSettings = indicatorSettings;
                that._enabled = data !== null && (isArray(data) || isFinite(data));
                that._options = {offset: indicatorSettings.offset};
                that._setPalette(indicatorSettings.palette);
                return that
            },
            init: function(indicatorPosition) {
                $extend(true, this._options, indicatorPosition);
                return this
            },
            prepare: function(isRecreate) {
                var that = this;
                if (that._enabled) {
                    that._root.append(that._parameters.owner);
                    that._indicatorParameters = that._indicatorParameters || {
                        renderer: that._parameters.renderer,
                        translator: that._parameters.translator,
                        owner: that._root,
                        tracker: that._parameters.tracker,
                        className: that._parameters.indicatorClassName
                    };
                    that._indicators = that._indicators || [];
                    if (that._createIndicator())
                        that._indicators = $map(that._indicators, function(indicator, i) {
                            if (isRecreate) {
                                indicator.dispose();
                                indicator = that._createIndicator();
                                indicator.setup(that._indicatorParameters);
                                indicator._trackerInfo = {
                                    type: that._parameters.trackerType,
                                    index: i
                                }
                            }
                            indicator.init(that._indicatorSettings);
                            return indicator
                        })
                }
                return that
            },
            measure: function() {
                var that = this,
                    indicator = that._createIndicator(),
                    result = null;
                if (indicator && that._enabled) {
                    indicator.setup(that._indicatorParameters).init(that._indicatorSettings).init(that._options);
                    result = indicator.measure();
                    indicator.clean().dispose()
                }
                return result
            },
            clean: function() {
                var that = this;
                that._root.detach();
                if (that._enabled)
                    $each(that._indicators, function(_, indicator) {
                        indicator.clean()
                    });
                return that
            },
            render: function() {
                var that = this;
                if (that._enabled) {
                    that._root.append(that._parameters.owner);
                    that._updatePalette(that._indicators.length);
                    $each(that._indicators, function(i, indicator) {
                        indicator.init(that._options).init(that._getIndicatorSettings(i)).render()
                    })
                }
                return that
            },
            _getIndicatorSettings: function(index) {
                var palette = this._colorPalette;
                if (palette)
                    return {color: palette[index]};
                else
                    return null
            },
            _setPalette: function(palette) {
                if (_utils.isDefined(palette))
                    this._palette = new core.Palette(palette);
                else
                    this._palette = null
            },
            _updatePalette: function(count) {
                var that = this,
                    palette = that._palette,
                    i;
                if (palette) {
                    palette.reset();
                    that._colorPalette = [];
                    for (i = 0; i < count; i++)
                        that._colorPalette.push(palette.getNextColor())
                }
                else
                    that._colorPalette = null
            },
            _adjustIndicatorsCount: function(count) {
                var that = this,
                    indicators = that._indicators,
                    i,
                    ii,
                    indicatorOptions,
                    indicator,
                    indicatorsLen = indicators.length,
                    palette = that._parameters.palette;
                if (indicatorsLen > count) {
                    for (i = count, ii = indicatorsLen; i < ii; ++i)
                        indicators[i].clean().dispose();
                    that._indicators = indicators.slice(0, count);
                    that._updatePalette(indicators.length)
                }
                else if (indicatorsLen < count) {
                    that._updatePalette(count);
                    for (i = indicatorsLen, ii = count; i < ii; ++i) {
                        indicator = that._createIndicator();
                        indicator.setup(that._indicatorParameters);
                        indicator._trackerInfo = {
                            type: that._parameters.trackerType,
                            index: i
                        };
                        indicator.init(that._indicatorSettings).init(that._options).init(that._getIndicatorSettings(i)).render();
                        indicators.push(indicator)
                    }
                }
            },
            values: function(arg, _noAnimation) {
                var that = this;
                if (!that._enabled)
                    return;
                if (arguments.length) {
                    if (!isArray(arg))
                        arg = isFinite(arg) ? [Number(arg)] : null;
                    if (arg) {
                        that._adjustIndicatorsCount(arg.length);
                        $each(that._indicators, function(i, indicator) {
                            indicator.value(arg[i], _noAnimation)
                        })
                    }
                    return that
                }
                return $map(that._indicators, function(indicator) {
                        return indicator.value()
                    })
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file circularGauge.js */
    (function(DX, $, undefined) {
        var factory = DX.viz.gauges.__factory;
        var isFinite = window.isFinite,
            Number = window.Number,
            normalizeAngle = DX.utils.normalizeAngle,
            getCosAndSin = DX.utils.getCosAndSin,
            abs = Math.abs,
            max = Math.max,
            min = Math.min,
            round = Math.round,
            slice = Array.prototype.slice,
            $extend = $.extend,
            $each = $.each;
        var PI = Math.PI;
        var DEFAULT_GAUGE_SETTINGS = {
                geometry: {
                    startAngle: 225,
                    endAngle: -45,
                    totalRadius: undefined
                },
                scale: {
                    orientation: 'outside',
                    label: {indentFromTick: 10}
                },
                rangeContainer: {orientation: 'outside'},
                valueIndicator: {
                    type: 'rectangleneedle',
                    _default: {
                        offset: 20,
                        indentFromCenter: 0,
                        width: 2,
                        spindleSize: 14,
                        spindleGapSize: 10
                    },
                    triangleneedle: {width: 4},
                    triangle: {width: 4},
                    twocolorneedle: {
                        space: 2,
                        secondFraction: 0.4
                    },
                    twocolorrectangle: {
                        space: 2,
                        secondFraction: 0.4
                    },
                    rangebar: {offset: 30}
                },
                subvalueIndicator: {
                    type: 'trianglemarker',
                    trianglemarker: {offset: 6},
                    triangle: {offset: 6},
                    textcloud: {offset: -6}
                },
                valueIndicators: {
                    _type: 'rectangleneedle',
                    _default: {
                        offset: 20,
                        indentFromCenter: 0,
                        width: 2,
                        spindleSize: 14,
                        spindleGapSize: 10
                    },
                    triangleneedle: {width: 4},
                    twocolorneedle: {
                        space: 2,
                        secondFraction: 0.4
                    },
                    rangebar: {offset: 30},
                    trianglemarker: {offset: 6},
                    textcloud: {offset: -6}
                }
            };
        function getSides(startAngle, endAngle) {
            var startCosSin = getCosAndSin(startAngle),
                endCosSin = getCosAndSin(endAngle),
                startCos = startCosSin.cos,
                startSin = startCosSin.sin,
                endCos = endCosSin.cos,
                endSin = endCosSin.sin;
            return {
                    left: startSin <= 0 && endSin >= 0 || startSin <= 0 && endSin <= 0 && startCos <= endCos || startSin >= 0 && endSin >= 0 && startCos >= endCos ? -1 : min(startCos, endCos, 0),
                    right: startSin >= 0 && endSin <= 0 || startSin >= 0 && endSin >= 0 && startCos >= endCos || startSin <= 0 && endSin <= 0 && startCos <= endCos ? 1 : max(startCos, endCos, 0),
                    up: startCos <= 0 && endCos >= 0 || startCos <= 0 && endCos <= 0 && startSin >= endSin || startCos >= 0 && endCos >= 0 && startSin <= endSin ? -1 : -max(startSin, endSin, 0),
                    down: startCos >= 0 && endCos <= 0 || startCos >= 0 && endCos >= 0 && startSin <= endSin || startCos <= 0 && endCos <= 0 && startSin >= endSin ? 1 : -min(startSin, endSin, 0)
                }
        }
        DX.viz.gauges.CircularGauge = DX.viz.gauges.Gauge.inherit({
            _rootClass: 'dxg-circular-gauge',
            _getDefaultSettings: function() {
                return $extend(true, this.callBase(), DEFAULT_GAUGE_SETTINGS)
            },
            _selectMode: function() {
                this.callBase.apply(this, arguments);
                if (typeof this.indicatorValue === 'function')
                    this._createValueIndicatorInHardMode = function(type) {
                        return factory.createCircularValueIndicatorInHardMode(type)
                    }
            },
            _setupArea: function(area) {
                var that = this,
                    geometry = that.option('geometry') || {},
                    startAngle = geometry.startAngle,
                    endAngle = geometry.endAngle,
                    centerAngle;
                startAngle = isFinite(startAngle) ? normalizeAngle(startAngle) : that._defaultSettings.geometry.startAngle;
                endAngle = isFinite(endAngle) ? normalizeAngle(endAngle) : that._defaultSettings.geometry.endAngle;
                if (abs(startAngle - endAngle) < 1) {
                    endAngle -= 360;
                    area.sides = {
                        left: -1,
                        up: -1,
                        right: 1,
                        down: 1
                    }
                }
                else {
                    startAngle < endAngle && (endAngle -= 360);
                    area.sides = getSides(startAngle, endAngle)
                }
                area.x = 0;
                area.y = 0;
                area.radius = 100;
                area.startCoord = startAngle;
                area.endCoord = endAngle;
                area.scaleRadius = geometry.scaleRadius > 0 ? Number(geometry.scaleRadius) : that._defaultSettings.geometry.scaleRadius
            },
            _measureMainElements: function() {
                var that = this,
                    maxRadius = 0,
                    minRadius = Infinity,
                    maxHorizontalOffset = 0,
                    maxVerticalOffset = 0,
                    maxInverseHorizontalOffset = 0,
                    maxInverseVerticalOffset = 0;
                $each(that._measureElements, function(_, x) {
                    var bounds = x.measure();
                    if (bounds) {
                        bounds.min > 0 && (minRadius = min(minRadius, bounds.min));
                        bounds.max > 0 && (maxRadius = max(maxRadius, bounds.max));
                        bounds.horizontalOffset > 0 && (maxHorizontalOffset = max(maxHorizontalOffset, bounds.max + bounds.horizontalOffset));
                        bounds.verticalOffset > 0 && (maxVerticalOffset = max(maxVerticalOffset, bounds.max + bounds.verticalOffset));
                        bounds.inverseHorizontalOffset > 0 && (maxInverseHorizontalOffset = max(maxInverseHorizontalOffset, bounds.inverseHorizontalOffset));
                        bounds.inverseVerticalOffset > 0 && (maxInverseVerticalOffset = max(maxInverseVerticalOffset, bounds.inverseVerticalOffset))
                    }
                });
                maxHorizontalOffset = max(maxHorizontalOffset - maxRadius, 0);
                maxVerticalOffset = max(maxVerticalOffset - maxRadius, 0);
                return {
                        minRadius: minRadius,
                        maxRadius: maxRadius,
                        horizontalMargin: maxHorizontalOffset,
                        verticalMargin: maxVerticalOffset,
                        inverseHorizontalMargin: maxInverseHorizontalOffset,
                        inverseVerticalMargin: maxInverseVerticalOffset
                    }
            },
            _applyMainLayout: function() {
                var that = this,
                    measurements = that._measureMainElements(),
                    area = that._area,
                    sides = area.sides,
                    margins = {
                        left: (sides.left < -0.1 ? measurements.horizontalMargin : measurements.inverseHorizontalMargin) || 0,
                        right: (sides.right > 0.1 ? measurements.horizontalMargin : measurements.inverseHorizontalMargin) || 0,
                        top: (sides.up < -0.1 ? measurements.verticalMargin : measurements.inverseVerticalMargin) || 0,
                        bottom: (sides.down > 0.1 ? measurements.verticalMargin : measurements.inverseVerticalMargin) || 0
                    },
                    rect = that._layoutManager.selectRectByAspectRatio((sides.down - sides.up) / (sides.right - sides.left), margins),
                    radius = min(rect.width() / (sides.right - sides.left), rect.height() / (sides.down - sides.up)),
                    x,
                    y;
                var scaler = (measurements.maxRadius - area.radius + area.scaleRadius) / radius;
                if (0 < scaler && scaler < 1) {
                    rect = rect.scale(scaler);
                    radius *= scaler
                }
                radius = radius - measurements.maxRadius + area.radius;
                x = rect.left - rect.width() * sides.left / (sides.right - sides.left);
                y = rect.top - rect.height() * sides.up / (sides.down - sides.up);
                area.x = round(x);
                area.y = round(y);
                area.radius = radius;
                rect.left -= margins.left;
                rect.right += margins.right;
                rect.top -= margins.top;
                rect.bottom += margins.bottom;
                that._layoutManager.setRect(rect)
            },
            _updateElementPosition: function(element) {
                var area = this._area;
                element.init({
                    x: area.x,
                    y: area.y,
                    radius: round(area.radius - (Number(element._options.offset) || 0))
                })
            },
            _createScale: function() {
                return factory.createCircularScale()
            },
            _createRangeContainer: function() {
                return factory.createCircularRangeContainer()
            },
            _createValueIndicator: function(type) {
                return factory.createCircularValueIndicator(type)
            },
            _createSubvalueIndicator: function(type) {
                return factory.createCircularSubvalueIndicator(type)
            },
            _getApproximateScreenRange: function() {
                var that = this,
                    area = that._area,
                    r = min(that._mainRect.width() / (area.sides.right - area.sides.left), that._mainRect.height() / (area.sides.down - area.sides.up));
                r > area.totalRadius && (r = area.totalRadius);
                r = 0.8 * r;
                return -that._translator.getCodomainRange() * r * PI / 180
            },
            _getDefaultContainerSize: function() {
                return {
                        width: 300,
                        height: 300
                    }
            },
            _getPreset: function() {
                var preset = this.option('preset'),
                    result;
                if (preset === 'preset2')
                    result = {
                        commonNeedleSettings: {type: 'twocolorrectangle'},
                        commonMarkerSettings: {type: 'triangle'}
                    };
                else if (preset === 'preset3')
                    result = {
                        commonNeedleSettings: {type: 'rectangle'},
                        commonMarkerSettings: {type: 'triangle'}
                    };
                else
                    result = {
                        commonNeedleSettings: {type: 'rectangle'},
                        commonMarkerSettings: {type: 'textcloud'}
                    };
                return result
            },
            _createNeedle: function(type) {
                return factory.createCircularNeedle(type)
            },
            _createMarker: function(type) {
                return factory.createCircularMarker(type)
            },
            _createRangeBar: function() {
                return factory.createCircularRangeBar()
            },
            _prepareMainElements: function() {
                this.callBase();
                this._prepareObsoleteSpindle()
            },
            _renderMainElements: function() {
                this.callBase();
                this._renderObsoleteSpindle()
            },
            _prepareObsoleteSpindle: function() {
                var that = this,
                    spindleOption = that.option('spindle') || {},
                    visible = that._needles && ('visible' in spindleOption ? !!spindleOption.visible : true);
                if (visible) {
                    var defaultOption = that._defaultSettings.valueIndicator._default,
                        size = spindleOption.size || defaultOption.spindleSize;
                    visible = size > 0
                }
                if (visible) {
                    var themeOption = that._themeManager.getPartialTheme('valueIndicator')._default,
                        gapSize = spindleOption.gapSize || defaultOption.spindleGapSize,
                        color = spindleOption.color || themeOption.color || defaultOption.color;
                    gapSize = gapSize <= size ? gapSize : size;
                    that._spindle = that._spindle || that._renderer.createGroup({'class': 'dxg-value-indicator'});
                    that._spindleOuter = that._spindleOuter || that._renderer.createCircle(0, 0, 0, {
                        'class': 'dxg-spindle-border',
                        stroke: 'none',
                        strokeWidth: 0
                    }).append(that._spindle);
                    that._spindleInner = that._spindleInner || that._renderer.createCircle(0, 0, 0, {
                        'class': 'dxg-spindle-hole',
                        stroke: 'none',
                        strokeWidth: 0
                    }).append(that._spindle);
                    that._spindleOuter.applySettings({
                        cx: that._area.x,
                        cy: that._area.y,
                        r: size / 2,
                        fill: color
                    });
                    that._spindleInner.applySettings({
                        cx: that._area.x,
                        cy: that._area.y,
                        r: gapSize / 2,
                        fill: that._containerBackgroundColor
                    })
                }
                else {
                    that._spindle && that._spindle.remove();
                    delete that._spindle;
                    delete that._spindleOuter;
                    delete that._spindleInner
                }
            },
            _renderObsoleteSpindle: function() {
                var that = this;
                if (that._spindle) {
                    that._spindleOuter.applySettings({
                        cx: that._area.x,
                        cy: that._area.y
                    });
                    that._spindleInner.applySettings({
                        cx: that._area.x,
                        cy: that._area.y
                    });
                    that._spindle.append(that._rootElement)
                }
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file linearGauge.js */
    (function(DX, $, undefined) {
        var factory = DX.viz.gauges.__factory;
        var max = Math.max,
            min = Math.min,
            round = Math.round,
            slice = Array.prototype.slice,
            $extend = $.extend,
            $each = $.each;
        var DEFAULT_GAUGE_SETTINGS = {
                geometry: {
                    orientation: 'horizontal',
                    totalSize: undefined
                },
                scale: {
                    horizontalOrientation: 'right',
                    verticalOrientation: 'bottom',
                    label: {indentFromTick: -10}
                },
                rangeContainer: {
                    horizontalOrientation: 'right',
                    verticalOrientation: 'bottom'
                },
                valueIndicator: {
                    type: 'rangebar',
                    _default: {
                        offset: 2.5,
                        length: 15,
                        width: 15
                    },
                    rectangle: {width: 10},
                    rangebar: {
                        offset: 10,
                        horizontalOrientation: 'right',
                        verticalOrientation: 'bottom'
                    }
                },
                subvalueIndicator: {
                    type: 'trianglemarker',
                    _default: {
                        offset: -1,
                        horizontalOrientation: 'left',
                        verticalOrientation: 'top'
                    }
                },
                valueIndicators: {
                    _type: 'rectangle',
                    _default: {
                        offset: 2.5,
                        length: 15,
                        width: 15
                    },
                    rectangle: {width: 10},
                    rangebar: {
                        offset: 10,
                        horizontalOrientation: 'right',
                        verticalOrientation: 'bottom'
                    },
                    trianglemarker: {
                        offset: -1,
                        horizontalOrientation: 'left',
                        verticalOrientation: 'top'
                    },
                    textcloud: {
                        offset: -1,
                        horizontalOrientation: 'left',
                        verticalOrientation: 'top'
                    }
                }
            };
        DX.viz.gauges.LinearGauge = DX.viz.gauges.Gauge.inherit({
            _rootClass: 'dxg-linear-gauge',
            _getDefaultSettings: function() {
                return $extend(true, this.callBase(), DEFAULT_GAUGE_SETTINGS)
            },
            _selectMode: function() {
                this.callBase.apply(this, arguments);
                if (typeof this.indicatorValue === 'function')
                    this._createValueIndicatorInHardMode = function(type) {
                        return factory.createLinearValueIndicatorInHardMode(type)
                    }
            },
            _setupArea: function(area) {
                var geometry = this.option('geometry') || {};
                area.vertical = geometry.orientation === 'vertical';
                area.x = 0;
                area.y = 0;
                area.startCoord = -100;
                area.endCoord = 100;
                area.scaleSize = geometry.scaleSize > 0 ? Number(geometry.scaleSize) : this._defaultSettings.geometry.scaleSize
            },
            _measureMainElements: function() {
                var that = this,
                    minBound = 1000,
                    maxBound = 0,
                    indent = 0;
                $each(that._measureElements, function(i, item) {
                    var bounds = item.measure();
                    if (bounds) {
                        maxBound = max(maxBound, bounds.max);
                        minBound = min(minBound, bounds.min);
                        bounds.indent > 0 && (indent = max(indent, bounds.indent))
                    }
                });
                return {
                        minBound: minBound,
                        maxBound: maxBound,
                        indent: indent
                    }
            },
            _applyMainLayout: function() {
                var that = this,
                    measurements = that._measureMainElements(),
                    area = that._area,
                    rect,
                    offset,
                    counterSize = area.scaleSize + 2 * measurements.indent;
                if (area.vertical) {
                    rect = that._layoutManager.selectRectBySizes({
                        width: measurements.maxBound - measurements.minBound,
                        height: counterSize
                    });
                    offset = rect.horizontalMiddle() - (measurements.minBound + measurements.maxBound) / 2;
                    area.startCoord = rect.bottom - measurements.indent;
                    area.endCoord = rect.top + measurements.indent;
                    area.x = round(area.x + offset)
                }
                else {
                    rect = that._layoutManager.selectRectBySizes({
                        height: measurements.maxBound - measurements.minBound,
                        width: counterSize
                    });
                    offset = rect.verticalMiddle() - (measurements.minBound + measurements.maxBound) / 2;
                    area.startCoord = rect.left + measurements.indent;
                    area.endCoord = rect.right - measurements.indent;
                    area.y = round(area.y + offset)
                }
                that._layoutManager.setRect(rect)
            },
            _updateElementPosition: function(element) {
                var area = this._area;
                element.init({
                    x: round(area.x + (Number(element._options.offset) || 0)),
                    y: round(area.y + (Number(element._options.offset) || 0)),
                    orientation: area.vertical ? 'vertical' : 'horizontal'
                })
            },
            _createScale: function() {
                return factory.createLinearScale()
            },
            _createRangeContainer: function() {
                return factory.createLinearRangeContainer()
            },
            _createValueIndicator: function(type) {
                return factory.createLinearValueIndicator(type)
            },
            _createSubvalueIndicator: function(type) {
                return factory.createLinearSubvalueIndicator(type)
            },
            _getApproximateScreenRange: function() {
                var that = this,
                    area = that._area,
                    s = area.vertical ? that._mainRect.height() : that._mainRect.width();
                s > area.totalSize && (s = area.totalSize);
                s = s * 0.8;
                return s
            },
            _getDefaultContainerSize: function() {
                var geometry = this.option('geometry') || {};
                if (geometry.orientation === 'vertical')
                    return {
                            width: 100,
                            height: 300
                        };
                else
                    return {
                            width: 300,
                            height: 100
                        }
            },
            _getPreset: function() {
                var preset = this.option('preset'),
                    result;
                if (preset === 'preset2')
                    result = {
                        commonNeedleSettings: {type: 'rhombus'},
                        commonMarkerSettings: {type: 'triangle'}
                    };
                else
                    result = {
                        commonNeedleSettings: {type: 'circle'},
                        commonMarkerSettings: {type: 'textcloud'}
                    };
                return result
            },
            _createNeedle: function(type) {
                return factory.createLinearNeedle(type)
            },
            _createMarker: function(type) {
                return factory.createLinearMarker(type)
            },
            _createRangeBar: function() {
                return factory.createLinearRangeBar()
            }
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file barGauge.js */
    (function(DX, $, undefined) {
        var PI = Math.PI,
            DEFAULT_WIDTH = 300,
            DEFAULT_HEIGHT = 300;
        var _Number = window.Number,
            _isFinite = window.isFinite,
            _abs = Math.abs,
            _round = Math.round,
            _floor = Math.floor,
            _min = Math.min,
            _max = Math.max,
            _isArray = DX.utils.isArray,
            _convertAngleToRendererSpace = DX.utils.convertAngleToRendererSpace,
            _getCosAndSin = DX.utils.getCosAndSin,
            _noop = $.noop,
            _extend = $.extend,
            _getSampleText = DX.viz.gauges.__internals.getSampleText,
            _formatValue = DX.viz.gauges.__internals.formatValue;
        var _Palette = DX.viz.core.Palette;
        var _setupArea = DX.viz.gauges.CircularGauge.prototype._setupArea,
            _applyMainLayout = DX.viz.gauges.CircularGauge.prototype._applyMainLayout;
        DX.viz.gauges.BarGauge = DX.viz.gauges.Gauge.inherit({
            _rootClass: 'dxbg-bar-gauge',
            _getDefaultSettings: function() {
                return {
                        redrawOnResize: true,
                        incidentOccured: _noop,
                        geometry: {
                            startAngle: 225,
                            endAngle: -45
                        }
                    }
            },
            _init: function() {
                var that = this;
                that.callBase.apply(that, arguments);
                that._barsGroup = that._renderer.createGroup({'class': 'dxbg-bars'});
                that._values = [];
                that._context = {
                    renderer: that._renderer,
                    translator: that._translator,
                    tracker: that._tracker,
                    group: that._barsGroup
                };
                that._animateStep = function(pos) {
                    var bars = that._bars,
                        i = 0,
                        ii = bars.length;
                    for (; i < ii; ++i)
                        bars[i].animate(pos)
                };
                that._animateComplete = function() {
                    var bars = that._bars,
                        i = 0,
                        ii = bars.length;
                    for (; i < ii; ++i)
                        bars[i].endAnimation()
                }
            },
            _dispose: function() {
                var that = this;
                that.callBase.apply(that, arguments);
                that._barsGroup = that._values = that._context = that._animateStep = that._animateComplete = null
            },
            _getCanvas: function() {
                var that = this,
                    size = that.option('size') || {},
                    width = _Number(size.width),
                    height = _Number(size.height);
                if (!(width >= 0) || !(height >= 0)) {
                    var element = that._element();
                    width = width >= 0 ? width : element.width() || DEFAULT_WIDTH;
                    height = height >= 0 ? height : element.height() || DEFAULT_HEIGHT;
                    that._renderer.resize(width, height);
                    width = element.width() === width ? width : DEFAULT_WIDTH;
                    height = element.height() === height ? height : DEFAULT_HEIGHT;
                    that._renderer.resize(width, height)
                }
                return {
                        width: width,
                        height: height,
                        marginLeft: 0,
                        marginTop: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }
            },
            _getArea: function() {
                var that = this,
                    area = {};
                area.startValue = _isFinite(area.startValue = that.option('startValue')) ? _Number(area.startValue) : 0;
                area.endValue = _isFinite(area.endValue = that.option('endValue')) ? _Number(area.endValue) : 100;
                _setupArea.call(that, area);
                delete area.scaleRadius;
                that._translator.setup({
                    domainStart: area.startValue,
                    domainEnd: area.endValue,
                    codomainStart: area.startCoord,
                    codomainEnd: area.endCoord
                });
                area.baseValue = _isFinite(that._translator.adjust(area.baseValue = that.option('baseValue'))) ? area.baseValue : area.startValue < area.endValue ? area.startValue : area.endValue;
                return area
            },
            _getApproximateScreenRange: function() {
                var that = this,
                    sides = that._area.sides,
                    width = that._mainRect.width() / (sides.right - sides.left),
                    height = that._mainRect.height() / (sides.down - sides.up),
                    r = width < height ? width : height;
                return -that._translator.getCodomainRange() * r * PI / 180
            },
            _setupAnimationSettings: function() {
                this.callBase();
                if (this._animationSettings)
                    _extend(this._animationSettings, {
                        step: this._animateStep,
                        complete: this._animateComplete
                    })
            },
            _clean: function() {
                var that = this;
                that._barsGroup.detach();
                that._animationSettings && that._barsGroup.stopAnimation();
                var i = 0,
                    ii = that._bars ? that._bars.length : 0;
                for (; i < ii; ++i)
                    that._bars[i].dispose();
                that._palette = that._bars = null;
                that.callBase.apply(that, arguments)
            },
            _measureMainElements: function() {
                var that = this,
                    measurements = {maxRadius: that._area.radius},
                    labelOptions = that.option('label');
                that._barsGroup.append(that._rootElement);
                that._context.textEnabled = labelOptions === undefined || labelOptions && (!('visible' in labelOptions) || labelOptions.visible);
                if (that._context.textEnabled) {
                    that._context.textColor = labelOptions && labelOptions.font && labelOptions.font.color || null;
                    labelOptions = _extend(true, {}, that._themeManager.theme().label, labelOptions);
                    that._context.formatOptions = {
                        format: labelOptions.format !== undefined || labelOptions.precision !== undefined ? labelOptions.format : that._defaultFormatOptions.format,
                        precision: labelOptions.format !== undefined || labelOptions.precision !== undefined ? labelOptions.precision : that._defaultFormatOptions.precision,
                        customizeText: labelOptions.customizeText
                    };
                    that._context.textOptions = {
                        font: _extend({}, that._themeManager.theme().label.font, labelOptions.font, {color: null}),
                        align: 'center'
                    };
                    that._textIndent = labelOptions.indent > 0 ? _Number(labelOptions.indent) : 0;
                    that._context.lineWidth = labelOptions.connectorWidth > 0 ? _Number(labelOptions.connectorWidth) : 0;
                    that._context.lineColor = labelOptions.connectorColor || null;
                    var text = that._renderer.createText(_getSampleText(that._translator, that._context.formatOptions), 0, 0, that._context.textOptions).append(that._barsGroup),
                        bbox = text.getBBox();
                    text.detach();
                    that._context.textVerticalOffset = -bbox.y - bbox.height / 2;
                    measurements.horizontalMargin = that._context.textWidth = bbox.width;
                    measurements.verticalMargin = that._context.textHeight = bbox.height
                }
                return measurements
            },
            _applyMainLayout: _applyMainLayout,
            _renderMainElements: function() {
                var that = this,
                    options = _extend({}, that._themeManager.theme(), that.option());
                that._palette = new _Palette(options.palette, {
                    stepHighlight: 50,
                    theme: that._themeManager.themeName()
                });
                var relativeInnerRadius = options.relativeInnerRadius > 0 && options.relativeInnerRadius < 1 ? _Number(options.relativeInnerRadius) : 0.1,
                    radius = that._area.radius;
                if (that._context.textEnabled) {
                    that._textIndent = _round(_min(that._textIndent, radius / 2));
                    radius -= that._textIndent
                }
                that._outerRadius = _round(radius);
                that._innerRadius = _round(radius * relativeInnerRadius);
                that._barSpacing = options.barSpacing > 0 ? _Number(options.barSpacing) : 0;
                _extend(that._context, {
                    backgroundColor: options.backgroundColor,
                    x: that._area.x,
                    y: that._area.y,
                    startAngle: that._area.startCoord,
                    endAngle: that._area.endCoord,
                    baseAngle: that._translator.translate(that._area.baseValue)
                });
                that._bars = [];
                that._updateValues(that.option('values'))
            },
            _setBarsCount: function(count) {
                var that = this,
                    i,
                    ii;
                if (that._bars.length > count) {
                    for (i = count, ii = that._bars.length; i < ii; ++i)
                        that._bars[i].dispose();
                    that._bars.splice(count, ii - count);
                    that._arrangeBars()
                }
                else if (that._bars.length < count) {
                    for (i = that._bars.length, ii = count; i < ii; ++i)
                        that._bars.push(new BarWrapper(i, that._context));
                    that._arrangeBars()
                }
                if (that._bars.length > 0) {
                    if (that._dummyBackground) {
                        that._dummyBackground.detach();
                        that._dummyBackground = null
                    }
                }
                else {
                    if (!that._dummyBackground)
                        that._dummyBackground = that._renderer.createArc().append(that._barsGroup);
                    that._dummyBackground.applySettings({
                        x: that._context.x,
                        y: that._context.y,
                        outerRadius: that._outerRadius,
                        innerRadius: that._innerRadius,
                        startAngle: that._context.endAngle,
                        endAngle: that._context.startAngle,
                        fill: that._context.backgroundColor
                    })
                }
            },
            _arrangeBars: function() {
                var that = this,
                    i = 0,
                    ii = that._bars.length,
                    radius = that._outerRadius - that._innerRadius;
                that._context.barSize = _max(_floor((radius - (ii - 1) * that._barSpacing) / ii), 1);
                var unitOffset = that._context.barSize + _round(_min((radius - ii * that._context.barSize) / (ii - 1), that._barSpacing));
                radius = that._outerRadius;
                that._context.textRadius = radius + that._textIndent;
                that._palette.reset();
                for (; i < ii; ++i, radius -= unitOffset)
                    that._bars[i].arrange({
                        color: that._palette.getNextColor(),
                        radius: radius
                    })
            },
            _updateBars: function() {
                var that = this,
                    i = 0,
                    ii = that._bars.length;
                for (; i < ii; ++i)
                    that._bars[i].setValue(that._values[i])
            },
            _animateBars: function() {
                var that = this,
                    i = 0,
                    ii = that._bars.length;
                if (ii > 0) {
                    for (; i < ii; ++i)
                        that._bars[i].beginAnimation(that._values[i]);
                    that._barsGroup.animate({_: 0}, that._animationSettings)
                }
            },
            _updateValues: function(values, noAnimation) {
                var that = this,
                    list = _isArray(values) && values || _isFinite(values) && [values] || [],
                    i = 0,
                    ii = list.length,
                    value;
                that._values = [];
                for (; i < ii; ++i) {
                    value = that._translator.adjust(list[i]);
                    _isFinite(value) && that._values.push(value)
                }
                that._animationSettings && that._barsGroup.stopAnimation();
                if (that._bars) {
                    that._setBarsCount(that._values.length);
                    if (that._animationSettings && !that._noAnimation)
                        that._animateBars();
                    else
                        that._updateBars()
                }
                if (!that._resizing) {
                    that.option('values', that._values);
                    that.hideLoadingIndicator()
                }
            },
            values: function(arg) {
                if (arg !== undefined) {
                    this._updateValues(arg);
                    return this
                }
                else
                    return this._values.slice(0)
            },
            _optionChanged: function(name, newValue, oldValue) {
                switch (name) {
                    case'values':
                        this._updateValues(newValue);
                        break;
                    default:
                        this.callBase.apply(this, arguments);
                        break
                }
            },
            _optionValuesEqual: function(name, oldValue, newValue) {
                switch (name) {
                    case'values':
                        return compareArrays(oldValue, newValue);
                    default:
                        return this.callBase.apply(this, arguments)
                }
            },
            _selectMode: _noop,
            _renderDeltaIndicator: _noop,
            _prepareMainElements: _noop,
            _updateElementPosition: _noop,
            _disposeValueIndicators: _noop,
            _cleanValueIndicators: _noop,
            _updateActiveElements: _noop,
            _updateIndicatorSettings: null,
            _prepareValueIndicatorSettings: null,
            _prepareSubvalueIndicatorSettings: null,
            _prepareScale: null,
            _prepareRangeContainer: null,
            _prepareValueIndicators: null,
            _prepareValueIndicator: null,
            _prepareSubvalueIndicators: null,
            _createScale: null,
            _createRangeContainer: null,
            _createSubvalueIndicator: null,
            _value: null,
            _subvalues: null,
            value: null,
            subvalues: null
        });
        DX.viz.gauges.BarGauge.prototype._themeManagerType = DX.viz.gauges.__internals.ThemeManager.inherit({
            _themeSection: 'barGauge',
            _initializeTheme: function() {
                var that = this;
                that._initializeFont(that._theme.label.font);
                that._initializeFont(that._theme.title.font);
                that._initializeFont(that._theme.tooltip.font);
                that._initializeFont(that._theme.loadingIndicator.font)
            }
        });
        function BarWrapper(index, context) {
            var that = this;
            that._context = context;
            that._background = context.renderer.createArc().append(context.group);
            that._background.applySettings({fill: context.backgroundColor});
            that._bar = context.renderer.createArc().append(context.group);
            if (context.textEnabled) {
                that._line = context.renderer.createPath([], {strokeWidth: context.lineWidth}).append(context.group);
                that._text = context.renderer.createText('', 0, 0, context.textOptions).append(context.group)
            }
            that._tracker = context.renderer.createArc();
            context.tracker.attach(that._tracker, that, {index: index});
            that._index = index;
            that._angle = context.baseAngle;
            that._settings = {
                x: context.x,
                y: context.y,
                startAngle: context.baseAngle,
                endAngle: context.baseAngle
            }
        }
        _extend(BarWrapper.prototype, {
            dispose: function() {
                var that = this;
                that._background.detach();
                that._bar.detach();
                if (that._context.textEnabled) {
                    that._line.detach();
                    that._text.detach()
                }
                that._context.tracker.detach(that._tracker);
                that._context = that._settings = that._background = that._bar = that._line = that._text = that._tracker = null;
                return that
            },
            arrange: function(options) {
                var that = this;
                that._settings.outerRadius = options.radius;
                that._settings.innerRadius = options.radius - that._context.barSize;
                that._background.applySettings(_extend({}, that._settings, {
                    startAngle: that._context.endAngle,
                    endAngle: that._context.startAngle
                }));
                that._bar.applySettings(that._settings);
                that._tracker.applySettings(that._settings);
                that._color = options.color;
                that._bar.applySettings({fill: options.color});
                if (that._context.textEnabled) {
                    that._line.applySettings({
                        points: [that._context.x, that._context.y - that._settings.innerRadius, that._context.x, that._context.y - that._context.textRadius],
                        stroke: that._context.lineColor || options.color
                    });
                    that._text.applySettings({font: {color: that._context.textColor || options.color}})
                }
                return that
            },
            getTooltipParameters: function() {
                var that = this,
                    cossin = _getCosAndSin((that._angle + that._context.baseAngle) / 2);
                return {
                        x: _round(that._context.x + (that._settings.outerRadius + that._settings.innerRadius) / 2 * cossin.cos),
                        y: _round(that._context.y - (that._settings.outerRadius + that._settings.innerRadius) / 2 * cossin.sin),
                        offset: 0,
                        color: that._color,
                        value: that._value
                    }
            },
            setAngle: function(angle) {
                var that = this;
                that._angle = angle;
                setAngles(that._settings, that._context.baseAngle, that._angle);
                that._bar.applySettings(that._settings);
                that._tracker.applySettings(that._settings);
                if (that._context.textEnabled) {
                    that._line.rotate(_convertAngleToRendererSpace(that._angle), that._context.x, that._context.y);
                    var cossin = _getCosAndSin(that._angle);
                    that._text.applySettings({
                        text: _formatValue(that._value, that._context.formatOptions, {index: that._index}),
                        x: that._context.x + (that._context.textRadius + that._context.textWidth * 0.6) * cossin.cos,
                        y: that._context.y - (that._context.textRadius + that._context.textHeight * 0.6) * cossin.sin + that._context.textVerticalOffset
                    })
                }
                return that
            },
            setValue: function(value) {
                this._value = value;
                return this.setAngle(this._context.translator.translate(value))
            },
            beginAnimation: function(value) {
                var that = this;
                that._value = value;
                var angle = that._context.translator.translate(value);
                if (!compareFloats(that._angle, angle)) {
                    that._start = that._angle;
                    that._delta = angle - that._angle;
                    that._tracker.applySettings({visibility: 'hidden'});
                    if (that._context.textEnabled) {
                        that._line.applySettings({visibility: 'hidden'});
                        that._text.applySettings({visibility: 'hidden'})
                    }
                }
                else
                    that.animate = _noop
            },
            animate: function(pos) {
                var that = this;
                that._angle = that._start + that._delta * pos;
                setAngles(that._settings, that._context.baseAngle, that._angle);
                that._bar.applySettings(that._settings)
            },
            endAnimation: function() {
                var that = this;
                if (that._delta !== undefined) {
                    if (compareFloats(that._angle, that._start + that._delta)) {
                        that._tracker.applySettings({visibility: null});
                        if (that._context.textEnabled) {
                            that._line.applySettings({visibility: null});
                            that._text.applySettings({visibility: null})
                        }
                        that.setAngle(that._angle)
                    }
                }
                else
                    delete that.animate;
                delete that._start;
                delete that._delta
            }
        });
        function setAngles(target, angle1, angle2) {
            target.startAngle = angle1 < angle2 ? angle1 : angle2;
            target.endAngle = angle1 < angle2 ? angle2 : angle1
        }
        function compareFloats(value1, value2) {
            return _abs(value1 - value2) < 0.0001
        }
        function compareArrays(array1, array2) {
            if (array1 === array2)
                return true;
            if (_isArray(array1) && _isArray(array2) && array1.length === array2.length) {
                for (var i = 0, ii = array1.length; i < ii; ++i)
                    if (!compareFloats(array1[i], array2[i]))
                        return false;
                return true
            }
            return false
        }
        DX.registerComponent('dxBarGauge', DX.viz.gauges.BarGauge)
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file tracker.js */
    (function(DX, $, undefined) {
        var _setTimeout = window.setTimeout,
            _clearTimeout = window.clearTimeout,
            _extend = $.extend,
            _abs = Math.abs;
        var TOOLTIP_SHOW_DELAY = 300,
            TOOLTIP_HIDE_DELAY = 300,
            TOOLTIP_TOUCH_SHOW_DELAY = 400,
            TOOLTIP_TOUCH_HIDE_DELAY = 300;
        DX.viz.gauges.__internals.Tracker = DX.Class.inherit({
            ctor: function(parameters) {
                DX.utils.debug.assertParam(parameters, 'parameters');
                DX.utils.debug.assertParam(parameters.renderer, 'parameters.renderer');
                DX.utils.debug.assertParam(parameters.container, 'parameters.container');
                var that = this;
                that._container = parameters.container;
                that._element = parameters.renderer.createGroup({
                    'class': 'dxg-tracker',
                    stroke: 'none',
                    strokeWidth: 0,
                    fill: '#000000',
                    opacity: 0.0001
                });
                that._showTooltipCallback = function() {
                    that._showTooltipTimeout = null;
                    var target = that._tooltipEvent.target;
                    that._targetEvent = null;
                    if (that._tooltipTarget !== target) {
                        that._tooltipTarget = target;
                        that._callbacks['tooltip-show']()
                    }
                };
                that._hideTooltipCallback = function() {
                    that._hideTooltipTimeout = null;
                    that._targetEvent = null;
                    if (that._tooltipTarget) {
                        that._callbacks['tooltip-hide']();
                        that._tooltipTarget = null
                    }
                };
                that._dispose = function() {
                    that._showTooltipCallback = that._hideTooltipCallback = that._dispose = null
                };
                that._DEBUG_showTooltipTimeoutSet = that._DEBUG_showTooltipTimeoutCleared = that._DEBUG_hideTooltipTimeoutSet = that._DEBUG_hideTooltipTimeoutCleared = 0
            },
            dispose: function() {
                var that = this;
                that._dispose();
                that.deactivate();
                that._element.off();
                that._container = that._element = that._context = that._callbacks = null;
                return that
            },
            activate: function() {
                this._element.append(this._container);
                return this
            },
            deactivate: function() {
                this._element.detach();
                this._element.clear();
                return this
            },
            attach: function(element, target, info) {
                element.data({
                    target: target,
                    info: info
                });
                element.append(this._element);
                return this
            },
            detach: function(element) {
                element.detach();
                element.removeData();
                return this
            },
            setTooltipState: function(state) {
                var that = this,
                    data;
                that._element.off(tooltipMouseEvents).off(tooltipTouchEvents);
                if (state) {
                    data = {tracker: that};
                    that._element.on(tooltipMouseEvents, data).on(tooltipTouchEvents, data)
                }
                return that
            },
            setCallbacks: function(callbacks) {
                this._callbacks = callbacks;
                return this
            },
            _showTooltip: function(event, delay) {
                var that = this,
                    data = $(event.target).data();
                if (that._tooltipTarget === event.target || that._callbacks['tooltip-prepare'](data.target, data.info)) {
                    that._hideTooltipTimeout && ++that._DEBUG_hideTooltipTimeoutCleared;
                    _clearTimeout(that._hideTooltipTimeout);
                    that._hideTooltipTimeout = null;
                    _clearTimeout(that._showTooltipTimeout);
                    that._tooltipEvent = event;
                    ++that._DEBUG_showTooltipTimeoutSet;
                    that._showTooltipTimeout = _setTimeout(that._showTooltipCallback, delay)
                }
            },
            _hideTooltip: function(delay) {
                var that = this;
                that._showTooltipTimeout && ++that._DEBUG_showTooltipTimeoutCleared;
                _clearTimeout(that._showTooltipTimeout);
                that._showTooltipTimeout = null;
                _clearTimeout(that._hideTooltipTimeout);
                ++that._DEBUG_hideTooltipTimeoutSet;
                that._hideTooltipTimeout = _setTimeout(that._hideTooltipCallback, delay)
            }
        });
        var tooltipMouseEvents = {
                'mouseover.gauge-tooltip': handleTooltipMouseOver,
                'mouseout.gauge-tooltip': handleTooltipMouseOut
            };
        var tooltipMouseMoveEvents = {'mousemove.gauge-tooltip': handleTooltipMouseMove};
        var tooltipTouchEvents = {'touchstart.gauge-tooltip': handleTooltipTouchStart};
        function handleTooltipMouseOver(event) {
            var tracker = event.data.tracker;
            tracker._x = event.pageX;
            tracker._y = event.pageY;
            tracker._element.off(tooltipMouseMoveEvents).on(tooltipMouseMoveEvents, event.data);
            tracker._showTooltip(event, TOOLTIP_SHOW_DELAY)
        }
        function handleTooltipMouseMove(event) {
            var tracker = event.data.tracker;
            if (tracker._showTooltipTimeout && _abs(event.pageX - tracker._x) > 4 || _abs(event.pageY - tracker._y) > 4) {
                tracker._x = event.pageX;
                tracker._y = event.pageY;
                tracker._showTooltip(event, TOOLTIP_SHOW_DELAY)
            }
        }
        function handleTooltipMouseOut(event) {
            var tracker = event.data.tracker;
            tracker._element.off(tooltipMouseMoveEvents);
            tracker._hideTooltip(TOOLTIP_HIDE_DELAY)
        }
        var active_touch_tooltip_tracker = null;
        DX.viz.gauges.__internals.Tracker._DEBUG_reset = function() {
            active_touch_tooltip_tracker = null
        };
        function handleTooltipTouchStart(event) {
            event.preventDefault();
            var tracker = active_touch_tooltip_tracker;
            if (tracker && tracker !== event.data.tracker)
                tracker._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
            tracker = active_touch_tooltip_tracker = event.data.tracker;
            tracker._showTooltip(event, TOOLTIP_TOUCH_SHOW_DELAY);
            tracker._touch = true
        }
        function handleTooltipDocumentTouchStart(event) {
            var tracker = active_touch_tooltip_tracker;
            if (tracker) {
                if (!tracker._touch) {
                    tracker._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
                    active_touch_tooltip_tracker = null
                }
                tracker._touch = null
            }
        }
        function handleTooltipDocumentTouchEnd(event) {
            var tracker = active_touch_tooltip_tracker;
            if (tracker)
                if (tracker._showTooltipTimeout) {
                    tracker._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
                    active_touch_tooltip_tracker = null
                }
        }
        $(window.document).on({
            'touchstart.gauge-tooltip': handleTooltipDocumentTouchStart,
            'touchend.gauge-tooltip': handleTooltipDocumentTouchEnd
        })
    })(DevExpress, jQuery);
    /*! Module viz-gauges, file dxCircularGauge.js */
    (function(DX, undefined) {
        DX.registerComponent("dxCircularGauge", DX.viz.gauges.CircularGauge)
    })(DevExpress);
    /*! Module viz-gauges, file dxLinearGauge.js */
    (function(DX, undefined) {
        DX.registerComponent("dxLinearGauge", DX.viz.gauges.LinearGauge)
    })(DevExpress);
    DevExpress.MOD_VIZ_GAUGES = true
}