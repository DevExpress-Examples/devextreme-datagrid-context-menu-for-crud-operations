/*! 
* DevExtreme (Vector Map)
* Version: 14.1.4
* Build date: Jun 11, 2014
*
* Copyright (c) 2012 - 2014 Developer Express Inc. ALL RIGHTS RESERVED
* EULA: https://www.devexpress.com/Support/EULAs/DevExtreme.xml
*/

"use strict";
if (!DevExpress.MOD_VIZ_VECTORMAP) {
    if (!DevExpress.MOD_VIZ_CORE)
        throw Error('Required module is not referenced: viz-core');
    /*! Module viz-vectormap, file map.js */
    (function(DX, $, undefined) {
        DX.viz.map = {};
        var _Number = window.Number,
            _isFunction = DX.utils.isFunction,
            _getRootOffset = DX.utils.getRootOffset;
        var DEFAULT_WIDTH = 800,
            DEFAULT_HEIGHT = 400;
        DX.viz.map.Map = DX.viz.core.BaseWidget.inherit({
            _init: function() {
                var that = this;
                that.callBase.apply(that, arguments);
                that.renderer = that._renderer = that._factory.createRenderer({
                    width: 1,
                    height: 1,
                    pathModified: that.option('pathModified'),
                    rtl: that.option('rtlEnabled')
                });
                that.renderer.draw(that._element().get(0));
                that._themeManager = that._factory.createThemeManager();
                that._projection = that._factory.createProjection();
                that._tracker = that._factory.createTracker();
                that._root = that._renderer.getRoot();
                that._root.applySettings({
                    'class': 'dxm',
                    stroke: 'none',
                    strokeWidth: 0,
                    fill: 'none',
                    align: 'center',
                    cursor: 'default',
                    style: {overflow: 'hidden'}
                });
                that._background = that._renderer.createRect(0, 0, 0, 0, 0, {'class': 'dxm-background'});
                that._tracker.attachRoot(that._root);
                that._tracker.setCallbacks(that, {
                    start: startCallback,
                    move: moveCallback,
                    end: endCallback,
                    zoom: zoomCallback,
                    'hover-on': hoverOnCallback,
                    'hover-off': hoverOffCallback,
                    click: clickCallback,
                    'tooltip-check': checkTooltipCallback,
                    'tooltip-show': showTooltipCallback,
                    'tooltip-move': moveTooltipCallback,
                    'tooltip-hide': hideTooltipCallback
                });
                that._areasManager = that._factory.createAreasManager({
                    container: that._root,
                    renderer: that._renderer,
                    projection: that._projection,
                    themeManager: that._themeManager,
                    tracker: that._tracker,
                    ready: function() {
                        that.hideLoadingIndicator()
                    }
                });
                that._areasManager.setData(that.option('mapData'));
                that._markersManager = that._factory.createMarkersManager({
                    container: that._root,
                    renderer: that._renderer,
                    projection: that._projection,
                    themeManager: that._themeManager,
                    tracker: that._tracker
                });
                that._markersManager.setData(that.option('markers'));
                that._controlBar = that._factory.createControlBar({
                    container: that._root,
                    renderer: that._renderer,
                    context: that,
                    resetCallback: controlResetCallback,
                    beginMoveCallback: controlBeginMoveCallback,
                    endMoveCallback: controlEndMoveCallback,
                    moveCallback: controlMoveCallback,
                    zoomCallback: controlZoomCallback
                });
                that._legend = that._factory.createLegend({
                    container: that._root,
                    renderer: that._renderer,
                    themeManager: that._themeManager
                });
                that._tooltip = that._factory.createTooltip({
                    container: that._root,
                    renderer: that._renderer,
                    tracker: that._tracker
                });
                that._projection.setBounds(that.option('bounds')).setMaxZoom(that.option('maxZoomFactor')).setZoom(that.option('zoomFactor')).setCenter(that.option('center'));
                that._themeManager.setTheme(that.option('theme'));
                that._themeManager.patchRtlSettings(that.option('rtlEnabled'));
                that._setClickCallback(that.option('click'));
                that._setCenterChangedCallback(that.option('centerChanged'));
                that._setZoomFactorChangedCallback(that.option('zoomFactorChanged'))
            },
            _dispose: function() {
                var that = this;
                that.callBase.apply(that, arguments);
                that._themeManager.dispose();
                that._tracker.detachRoot();
                that._areasManager.dispose();
                that._markersManager.dispose();
                that._controlBar.dispose();
                that._legend.dispose();
                that._tooltip.dispose();
                that._renderer.dispose();
                that._tracker.dispose();
                that._disposeLoadIndicator();
                that._renderer = that._themeManager = that._projection = that._tracker = that._root = that._background = that._areasManager = that._markersManager = that._controlBar = that._legend = that._tooltip = that._centerChangedCallback = that._zoomFactorChangedCallback = null
            },
            _adjustSize: function(force) {
                var that = this,
                    size = that.option('size') || {},
                    width = size.width >= 0 ? _Number(size.width) : that._element().width(),
                    height = size.height >= 0 ? _Number(size.height) : that._element().height(),
                    hidden = false;
                if (width === 0)
                    if (_Number(size.width) === 0)
                        hidden = true;
                    else
                        width = DEFAULT_WIDTH;
                if (height === 0)
                    if (_Number(size.height) === 0)
                        hidden = true;
                    else
                        height = DEFAULT_HEIGHT;
                if (hidden || !that._element().is(':visible')) {
                    that._incidentOccured("W2001", [that.NAME]);
                    that._width = that._height = 0;
                    return false
                }
                var needResize = that._width !== width || that._height !== height || force;
                if (needResize) {
                    that._width = width;
                    that._height = height;
                    that._renderer.resize(width, height);
                    that._projection.setSize(width, height);
                    that._applyTransform();
                    that._legend.applyLayout(width, height);
                    that._tooltip.setSize(width, height);
                    that._background.applySettings({
                        x: 0,
                        y: 0,
                        width: width,
                        height: height
                    });
                    that._updateLoadIndicator(undefined, width, height)
                }
                return needResize
            },
            _clean: function() {
                var that = this;
                that._background.detach();
                that._areasManager.clean();
                that._markersManager.clean();
                that._controlBar.clean();
                that._legend.clean();
                that._tooltip.clean();
                that._tracker.clean()
            },
            _render: function() {
                var that = this;
                if (!that._adjustSize(true))
                    return;
                that._tooltip.update(that._themeManager.getTooltipSettings(that.option('tooltip')));
                that._tracker.setOptions(that.option('interaction'), that._tooltip.enabled());
                that._controlBar.setZoomPartition(that._projection.getZoomScalePartition()).setZoom(that._projection.getScaledZoom()).setOptions(that._themeManager.getControlBarSettings(that.option('controlBar')), that.option('interaction'));
                that._background.applySettings(that._themeManager.getBackgroundSettings(that.option('background')));
                that._background.append(that._root);
                that._areasManager.render(that.option('areaSettings'));
                that._markersManager.render(that.option('markerSettings'));
                that._controlBar.render();
                that._legend.render(that._themeManager.getLegendSettings(that.option('legend')));
                that._tooltip.render();
                that._tracker.render();
                that._drawn()
            },
            _optionChanged: function(name, value) {
                var that = this;
                switch (name) {
                    case'theme':
                        that._themeManager.setTheme(value);
                        that._themeManager.patchRtlSettings(that.option('rtlEnabled'));
                        that._invalidate();
                        break;
                    case'click':
                        that._setClickCallback(value);
                        break;
                    case'centerChanged':
                        that._setCenterChangedCallback(value);
                        break;
                    case'zoomFactorChanged':
                        that._setZoomFactorChangedCallback(value);
                        break;
                    case'mapData':
                        that._areasManager.setData(value);
                        break;
                    case'markers':
                        that._markersManager.setData(value);
                        break;
                    case'bounds':
                        that._projection.setBounds(value);
                        that._invalidate();
                        break;
                    case'maxZoomFactor':
                        that._projection.setMaxZoom(value);
                        that._invalidate();
                        break;
                    case'zoomFactor':
                        that._updateZoomFactor(value);
                        break;
                    case'center':
                        that._updateCenter(value);
                        break;
                    default:
                        that.callBase.apply(that, arguments);
                        break
                }
            },
            _getLoadIndicatorOption: function() {
                return this._themeManager.getLoadIndicatorSettings(this.option('loadingIndicator'))
            },
            _setClickCallback: function(callback) {
                this._clickCallback = _isFunction(callback) ? callback : null
            },
            _setCenterChangedCallback: function(callback) {
                var that = this;
                that._centerChangedCallback = _isFunction(callback) ? function() {
                    that._centerChangedCallback && callback.call(that, that._projection.getCenter())
                } : null
            },
            _setZoomFactorChangedCallback: function(callback) {
                var that = this;
                that._zoomFactorChangedCallback = _isFunction(callback) ? function() {
                    that._zoomFactorChangedCallback && callback.call(that, that._projection.getZoom())
                } : null
            },
            _raiseClick: function(arg) {
                var that = this;
                that._clickCallback && setTimeout(function() {
                    that._clickCallback && that._clickCallback.call(that, arg)
                }, 0)
            },
            _raiseCenterChanged: function() {
                this._centerChangedCallback && setTimeout(this._centerChangedCallback, 0)
            },
            _raiseZoomFactorChanged: function() {
                this._zoomFactorChangedCallback && setTimeout(this._zoomFactorChangedCallback, 0)
            },
            _updateCenter: function(center, _noEvent) {
                this._projection.snapCenter().setCenter(center);
                if (this._projection.isCenterChanged()) {
                    this._applyTransform();
                    _noEvent || this._raiseCenterChanged()
                }
            },
            _updateZoomFactor: function(zoomFactor, _noEvent) {
                var that = this;
                that._projection.snapZoom().setZoom(zoomFactor);
                if (that._projection.isZoomChanged()) {
                    that._controlBar.setZoom(that._projection.getScaledZoom());
                    that._applyTransform(true);
                    _noEvent || that._raiseZoomFactorChanged()
                }
            },
            _updateViewport: function(viewport, _noEvent) {
                var that = this;
                that._projection.snapCenter().snapZoom().setViewport(viewport);
                that._applyTransform(that._projection.isZoomChanged());
                if (that._projection.isCenterChanged())
                    _noEvent || that._raiseCenterChanged();
                if (that._projection.isZoomChanged()) {
                    that._controlBar.setZoom(that._projection.getScaledZoom());
                    _noEvent || that._raiseZoomFactorChanged()
                }
            },
            _resize: function() {
                if (this._adjustSize()) {
                    this._applyTransform();
                    this._areasManager.redraw();
                    this._markersManager.redraw()
                }
            },
            _applyTransform: function(redraw) {
                var that = this,
                    transform = that._projection.getTransform();
                that._areasManager.transform(transform);
                that._markersManager.transform(transform);
                if (redraw) {
                    that._areasManager.redraw();
                    that._markersManager.redraw()
                }
            },
            _refresh: function() {
                var that = this,
                    callBase = that.callBase;
                that._endLoading(function() {
                    callBase.call(that)
                })
            },
            render: function(mode) {
                if (mode === 'resize')
                    this._resize();
                else
                    this._refresh();
                return this
            },
            getAreas: function() {
                return this._areasManager.getProxyItems()
            },
            getMarkers: function() {
                return this._markersManager.getProxyItems()
            },
            clearAreaSelection: function(_noEvent) {
                this._areasManager.clearSelection(_noEvent);
                return this
            },
            clearMarkerSelection: function(_noEvent) {
                this._markersManager.clearSelection(_noEvent);
                return this
            },
            clearSelection: function(_noEvent) {
                return this.clearAreaSelection(_noEvent).clearMarkerSelection(_noEvent)
            },
            center: function(value, _noEvent) {
                if (value === undefined)
                    return this._projection.getCenter();
                else {
                    this._updateCenter(value, _noEvent);
                    return this
                }
            },
            zoomFactor: function(value, _noEvent) {
                if (value === undefined)
                    return this._projection.getZoom();
                else {
                    this._updateZoomFactor(value, _noEvent);
                    return this
                }
            },
            viewport: function(value, _noEvent) {
                if (value === undefined)
                    return this._projection.getViewport();
                else {
                    this._updateViewport(value, _noEvent);
                    return this
                }
            },
            convertCoordinates: function(x, y) {
                return this._projection.fromScreenPointStrict(x, y)
            },
            showLoadingIndicator: function() {
                this._showLoadIndicator(this._themeManager.getLoadIndicatorSettings(this.option('loadingIndicator')), {
                    width: this._width,
                    height: this._height
                })
            },
            _factory: {
                createRenderer: function(options) {
                    return new DX.viz.renderers.Renderer(options)
                },
                createTooltip: function(parameters) {
                    return new Tooltip(parameters)
                },
                createLegend: function(parameters) {
                    return new Legend(parameters)
                }
            }
        });
        var Tooltip = DX.viz.core.Tooltip.inherit({
                ctor: function(parameters) {
                    var that = this;
                    that._container = parameters.container;
                    that._root = parameters.renderer.createGroup({'class': 'dxm-tooltip'});
                    that.callBase(null, that._root, parameters.renderer);
                    that._tracker = parameters.tracker;
                    that._enabled = false
                },
                dispose: function() {
                    var that = this;
                    that._container = that._root = that._tracker = null;
                    return that.callBase.apply(that, arguments)
                },
                clean: function() {
                    this._root.detach();
                    return this
                },
                render: function() {
                    this._root.append(this._container);
                    return this
                }
            });
        var Legend = DX.viz.core.Legend.inherit({
                ctor: function(parameters) {
                    var that = this;
                    that._container = parameters.container;
                    that._root = parameters.renderer.createGroup({'class': 'dxm-legend'});
                    that._themeManager = parameters.themeManager;
                    that.callBase(null, null, parameters.renderer, that._root)
                },
                dispose: function() {
                    var that = this;
                    that._container = that._root = that._themeManager = null;
                    return that.callBase.apply(that, arguments)
                },
                clean: function() {
                    this._root.detach();
                    return this
                },
                render: function(options) {
                    var that = this,
                        items = [],
                        i = 0,
                        ii = options.items ? options.items.length : 0;
                    for (; i < ii; ++i)
                        items.push(that._themeManager.getLegendItemSettings(options.items[i] || {}));
                    that.update(items, options);
                    that._root.append(that._container);
                    return that.applyLayout(that._size.width, that._size.height)
                },
                applyLayout: function(width, height) {
                    var that = this;
                    that.setSize({
                        width: width,
                        height: height
                    });
                    that.draw();
                    var layoutOptions = that.getLayoutOptions();
                    if (layoutOptions) {
                        var left,
                            top;
                        if (layoutOptions.horizontalAlignment === 'left')
                            left = layoutOptions.horizontalIndent;
                        else if (layoutOptions.horizontalAlignment === 'center')
                            left = width / 2 - layoutOptions._width / 2;
                        else
                            left = width - layoutOptions._width - layoutOptions.horizontalIndent;
                        if (layoutOptions.verticalAlignment === 'top')
                            top = layoutOptions.verticalIndent;
                        else
                            top = height - layoutOptions._height - layoutOptions.verticalIndent;
                        that.locate(left, top)
                    }
                    return that
                }
            });
        function setElementData($element, index) {
            $element.data('index', index)
        }
        function getElementData($element) {
            return $element.data('index')
        }
        DX.viz.map._utils = {
            getElementData: getElementData,
            setElementData: setElementData
        };
        function projectAreaDefault(dataItem) {
            return this._projection.projectArea(dataItem.coordinates)
        }
        function projectAreaGeoJson(dataItem) {
            if (dataItem.geometry) {
                var type = dataItem.geometry.type,
                    coordinates = dataItem.geometry.coordinates;
                if (coordinates && (type === 'Polygon' || type === 'MultiPolygon')) {
                    type === 'MultiPolygon' && (coordinates = [].concat.apply([], coordinates));
                    return this._projection.projectArea(coordinates)
                }
            }
            return []
        }
        function controlResetCallback() {
            var projection = this._projection;
            projection.snapCenter().snapZoom().setCenter(null).setZoom(null);
            this._applyTransform(projection.isZoomChanged());
            projection.isCenterChanged() && this._raiseCenterChanged();
            projection.isZoomChanged() && this._raiseZoomFactorChanged()
        }
        function controlBeginMoveCallback() {
            this._projection.snapCenter()
        }
        function controlEndMoveCallback() {
            this._projection.isCenterChanged() && this._raiseCenterChanged()
        }
        function controlMoveCallback(dx, dy) {
            this._projection.moveCenter(dx, dy);
            this._applyTransform()
        }
        function controlZoomCallback(zoom, x, y) {
            var that = this,
                keepPosition = x !== undefined && y !== undefined,
                coords,
                screenPosition;
            if (keepPosition) {
                screenPosition = _getRootOffset(that._renderer);
                screenPosition = [x - screenPosition.left, y - screenPosition.top];
                coords = that._projection.fromScreenPoint(screenPosition[0], screenPosition[1])
            }
            that._projection.snapZoom().setScaledZoom(zoom);
            if (that._projection.isZoomChanged()) {
                keepPosition && that._projection.snapCenter().setCenterByPoint(coords, screenPosition);
                that._applyTransform(true);
                that._raiseZoomFactorChanged();
                keepPosition && that._projection.isCenterChanged() && that._raiseCenterChanged()
            }
        }
        function startCallback(arg) {
            arg.data = (getElementData(arg.$target) || {}).index;
            this._controlBar.processStart(arg)
        }
        function moveCallback(arg) {
            arg.data = (getElementData(arg.$target) || {}).index;
            this._controlBar.processMove(arg)
        }
        function endCallback(arg) {
            arg.data = (getElementData(arg.$target) || {}).index;
            this._controlBar.processEnd(arg)
        }
        function zoomCallback(arg) {
            this._controlBar.processZoom(arg)
        }
        function hoverOnCallback(arg) {
            var data = getElementData(arg.$target) || {};
            switch (data.type) {
                case'area':
                    this._areasManager.hoverItem(data.index, true);
                    break;
                case'marker':
                    this._markersManager.hoverItem(data.index, true);
                    break;
                default:
                    DX.utils.debug.assert(false, 'Unknown hover-on category!');
                    break
            }
        }
        function hoverOffCallback(arg) {
            var data = getElementData(arg.$target) || {};
            switch (data.type) {
                case'area':
                    this._areasManager.hoverItem(data.index, false);
                    break;
                case'marker':
                    this._markersManager.hoverItem(data.index, false);
                    break;
                default:
                    DX.utils.debug.assert(false, 'Unknown hover-off category!');
                    break
            }
        }
        function clickCallback(arg) {
            var offset = _getRootOffset(this._renderer),
                data = getElementData(arg.$target) || {},
                $event = arg.$event;
            $event.x = arg.x - offset.left;
            $event.y = arg.y - offset.top;
            switch (data.type) {
                case'area':
                    this._areasManager.raiseClick(data.index, $event);
                    break;
                case'marker':
                    this._markersManager.raiseClick(data.index, $event);
                    break
            }
            this._raiseClick($event)
        }
        function checkTooltipCallback(arg) {
            var data = getElementData(arg.$target) || {},
                proxy;
            switch (data.type) {
                case'area':
                    proxy = this._areasManager.getProxyItem(data.index);
                    break;
                case'marker':
                    proxy = this._markersManager.getProxyItem(data.index);
                    break;
                default:
                    DX.utils.debug.assert(false, 'Unknown tooltip-check category!');
                    break
            }
            return this._tooltip.prepare(proxy, {offset: 12})
        }
        function showTooltipCallback() {
            this._tooltip.show()
        }
        function moveTooltipCallback(arg) {
            var offset = _getRootOffset(this._renderer);
            this._tooltip.move(arg.x - offset.left, arg.y - offset.top)
        }
        function hideTooltipCallback() {
            this._tooltip.hide()
        }
        DX.registerComponent('dxVectorMap', DX.viz.map.Map);
        DX.viz.map.sources = {};
        DX.viz.map._tests = {};
        DX.viz.map._tests.Legend = Legend;
        DX.viz.map._tests.Tooltip = Tooltip
    })(DevExpress, jQuery);
    /*! Module viz-vectormap, file projection.js */
    (function(DX, undefined) {
        var _Number = Number,
            _isFinite = isFinite,
            _min = Math.min,
            _max = Math.max,
            _abs = Math.abs,
            _tan = Math.tan,
            _atan = Math.atan,
            _exp = Math.exp,
            _round = Math.round,
            _ln = Math.log,
            _pow = Math.pow,
            _isArray = DX.utils.isArray,
            _buildPath = DX.viz.renderers.buildPath;
        var PI = Math.PI,
            QUARTER_PI = PI / 4,
            PI_TO_360 = PI / 360,
            TWO_TO_LN2 = 2 / Math.LN2;
        var DEFAULT_MIN_ZOOM = 1,
            DEFAULT_MAX_ZOOM = 1 << 8;
        var MERCATOR_MIN_LON = -180,
            MERCATOR_MAX_LON = 180,
            MERCATOR_MIN_LAT = -85.0511,
            MERCATOR_MAX_LAT = 85.0511;
        var mercator = {
                min: [MERCATOR_MIN_LON, MERCATOR_MIN_LAT],
                max: [MERCATOR_MAX_LON, MERCATOR_MAX_LAT],
                aspectRatio: 1,
                project: function(coordinates) {
                    var lon = coordinates[0],
                        lat = coordinates[1];
                    return [lon <= MERCATOR_MIN_LON ? -1 : lon >= MERCATOR_MAX_LON ? +1 : lon / 180, lat <= MERCATOR_MIN_LAT ? +1 : lat >= MERCATOR_MAX_LAT ? -1 : -_ln(_tan(QUARTER_PI + lat * PI_TO_360)) / PI]
                },
                unproject: function(coordinates) {
                    var x = coordinates[0],
                        y = coordinates[1];
                    return [x <= -1 ? MERCATOR_MIN_LON : x >= +1 ? MERCATOR_MAX_LON : 180 * x, y <= -1 ? MERCATOR_MAX_LAT : y >= +1 ? MERCATOR_MIN_LAT : (_atan(_exp(-PI * coordinates[1])) - QUARTER_PI) / PI_TO_360]
                }
            };
        var Projection = DX.Class.inherit({
                ctor: function() {
                    var that = this;
                    that.setBounds(null);
                    that._minZoom = DEFAULT_MIN_ZOOM;
                    that._maxZoom = DEFAULT_MAX_ZOOM;
                    that._zoom = that._minZoom
                },
                setSize: function(width, height) {
                    var that = this;
                    that._width = width;
                    that._height = height;
                    that._x0 = that._width / 2;
                    that._y0 = that._height / 2;
                    that._xradius = that._yradius = that._height / that._width < mercator.aspectRatio ? that._y0 : that._x0;
                    return that
                },
                _createBoundedProjectUnproject: function(k, x, y) {
                    this._minv = [k * (-1 - x) - 1, k * (-1 - y) - 1];
                    this._maxv = [k * (+1 - x) - 1, k * (+1 - y) - 1];
                    this._project = function(coordinates) {
                        var p = mercator.project(coordinates);
                        return [-1 + (p[0] - x) * k, -1 + (p[1] - y) * k]
                    };
                    this._unproject = function(coordinates) {
                        var p = [x + (coordinates[0] + 1) / k, y + (coordinates[1] + 1) / k];
                        return mercator.unproject(p)
                    }
                },
                setBounds: function(bounds) {
                    bounds = bounds || [];
                    var that = this,
                        _bounds = truncateQuad([pickNumber(bounds[0], bounds.minLon), pickNumber(bounds[1], bounds.maxLat), pickNumber(bounds[2], bounds.maxLon), pickNumber(bounds[3], bounds.minLat)], mercator.min, mercator.max),
                        p1 = mercator.project(_bounds[0]),
                        p2 = mercator.project(_bounds[1]),
                        delta = _max(_abs(p2[0] - p1[0]), _abs(p2[1] - p1[1]));
                    if (delta < 2) {
                        var xc = (p1[0] + p2[0]) / 2,
                            yc = (p1[1] + p2[1]) / 2;
                        that._minBound = mercator.unproject([xc - delta / 2, yc + delta / 2]);
                        that._maxBound = mercator.unproject([xc + delta / 2, yc - delta / 2]);
                        that._defaultCenter = mercator.unproject([xc, yc]);
                        that._createBoundedProjectUnproject(2 / delta, xc - delta / 2, yc - delta / 2)
                    }
                    else {
                        that._minBound = cloneVector(mercator.min);
                        that._maxBound = cloneVector(mercator.max);
                        that._minv = [-1, -1];
                        that._maxv = [+1, +1];
                        that._defaultCenter = mercator.unproject([0, 0]);
                        that._project = mercator.project;
                        that._unproject = mercator.unproject
                    }
                    return that.setCenter(that._defaultCenter)
                },
                _toScreen: function(coordinates) {
                    return [this._x0 + this._xradius * coordinates[0], this._y0 + this._yradius * coordinates[1]]
                },
                _fromScreen: function(coordinates) {
                    return [(coordinates[0] - this._x0) / this._xradius, (coordinates[1] - this._y0) / this._yradius]
                },
                _toTransformed: function(coordinates) {
                    return [coordinates[0] * this._zoom + this._dxcenter, coordinates[1] * this._zoom + this._dycenter, ]
                },
                _toTransformedFast: function(coordinates) {
                    return [coordinates[0] * this._zoom, coordinates[1] * this._zoom]
                },
                _fromTransformed: function(coordinates) {
                    return [(coordinates[0] - this._dxcenter) / this._zoom, (coordinates[1] - this._dycenter) / this._zoom]
                },
                _adjustCenter: function() {
                    var that = this,
                        center = that._project(that._center);
                    that._dxcenter = -center[0] * that._zoom;
                    that._dycenter = -center[1] * that._zoom
                },
                projectArea: function(coordinates) {
                    var i = 0,
                        ii = _isArray(coordinates) ? coordinates.length : 0,
                        subcoords,
                        j,
                        jj,
                        subresult,
                        result = [];
                    for (; i < ii; ++i) {
                        subcoords = coordinates[i];
                        subresult = [];
                        for (j = 0, jj = _isArray(subcoords) ? subcoords.length : 0; j < jj; ++j)
                            subresult.push(this._project(subcoords[j]));
                        result.push(subresult)
                    }
                    return result
                },
                projectPoint: function(coordinates) {
                    return coordinates ? this._project(coordinates) : []
                },
                getAreaCoordinates: function(data) {
                    var k = 0,
                        kk = data.length,
                        partialData,
                        i,
                        ii,
                        list = [],
                        partialPath,
                        point;
                    for (; k < kk; ++k) {
                        partialData = data[k];
                        partialPath = [];
                        for (i = 0, ii = partialData.length; i < ii; ++i) {
                            point = this._toScreen(this._toTransformedFast(partialData[i]));
                            partialPath.push(point[0], point[1])
                        }
                        list.push(_buildPath(partialPath))
                    }
                    return list.join(' ')
                },
                getPointCoordinates: function(data) {
                    var point = this._toScreen(this._toTransformedFast(data));
                    return {
                            x: _round(point[0]),
                            y: _round(point[1])
                        }
                },
                getZoom: function() {
                    return this._zoom
                },
                setZoom: function(zoom) {
                    var that = this;
                    that._zoom = truncate(zoom, that._minZoom, that._maxZoom, that._minZoom);
                    that._adjustCenter();
                    return that
                },
                getScaledZoom: function() {
                    return _round((this._scale.length - 1) * _ln(this._zoom) / _ln(this._maxZoom))
                },
                setScaledZoom: function(scaledZoom) {
                    return this.setZoom(this._scale[_round(scaledZoom)])
                },
                getZoomScalePartition: function() {
                    return this._scale.length - 1
                },
                _setupScaling: function() {
                    var that = this,
                        k = _round(TWO_TO_LN2 * _ln(that._maxZoom));
                    k = k > 4 ? k : 4;
                    var step = _pow(that._maxZoom, 1 / k),
                        zoom = that._minZoom,
                        i = 1;
                    that._scale = [zoom];
                    for (; i <= k; ++i)
                        that._scale.push(zoom *= step)
                },
                setMaxZoom: function(maxZoom) {
                    var that = this;
                    that._minZoom = DEFAULT_MIN_ZOOM;
                    that._maxZoom = truncate(maxZoom, that._minZoom, _Number.MAX_VALUE, DEFAULT_MAX_ZOOM);
                    that._setupScaling();
                    if (that._zoom > that._maxZoom)
                        that.setZoom(that._maxZoom);
                    return that
                },
                getMinZoom: function() {
                    return 1
                },
                getMaxZoom: function() {
                    return this._maxZoom
                },
                getCenter: function() {
                    return [this._center[0], this._center[1]]
                },
                setCenter: function(center) {
                    center = center || [];
                    var that = this;
                    that._center = [truncate(pickNumber(center[0], center.lon), that._minBound[0], that._maxBound[0], that._defaultCenter[0]), truncate(pickNumber(center[1], center.lat), that._minBound[1], that._maxBound[1], that._defaultCenter[1])];
                    that._adjustCenter();
                    return that
                },
                setCenterByPoint: function(coordinates, screenPosition) {
                    var that = this,
                        p = that._project(coordinates),
                        q = that._fromScreen(screenPosition);
                    return that.setCenter(that._unproject([-q[0] / that._zoom + p[0], -q[1] / that._zoom + p[1]]))
                },
                moveCenter: function(screenDx, screenDy) {
                    var that = this,
                        current = that._toScreen(that._toTransformed(that._project(that._center))),
                        center = that._unproject(that._fromTransformed(that._fromScreen([current[0] + screenDx, current[1] + screenDy])));
                    return that.setCenter(center)
                },
                getViewport: function() {
                    var p1 = this._unproject(this._fromTransformed([-1, -1])),
                        p2 = this._unproject(this._fromTransformed([+1, +1]));
                    return [p1[0], p1[1], p2[0], p2[1]]
                },
                setViewport: function(viewport) {
                    var that = this,
                        _viewport = truncateQuad(viewport || [], that._minBound, that._maxBound),
                        p1 = that._project(_viewport[0]),
                        p2 = that._project(_viewport[1]),
                        p10 = _min(p1[0], p2[0]),
                        p11 = _min(p1[1], p2[1]),
                        p20 = _max(p1[0], p2[0]),
                        p21 = _max(p1[1], p2[1]),
                        zoom = 2 / _max(p20 - p10, p21 - p11),
                        xcenter1 = -1 - zoom * p10,
                        xcenter2 = +1 - zoom * p20,
                        ycenter1 = -1 - zoom * p11,
                        ycenter2 = +1 - zoom * p21,
                        xcenter = p10 <= -1 ? xcenter2 : p20 >= +1 ? xcenter1 : (xcenter1 + xcenter2) / 2,
                        ycenter = p11 <= -1 ? ycenter2 : p21 >= +1 ? ycenter1 : (ycenter1 + ycenter2) / 2;
                    return that.setZoom(zoom).setCenter(that._unproject([-xcenter / zoom, -ycenter / zoom]))
                },
                getTransform: function() {
                    return {
                            translateX: this._dxcenter * this._xradius,
                            translateY: this._dycenter * this._yradius
                        }
                },
                fromScreenPoint: function(x, y) {
                    return this._unproject(this._fromTransformed(this._fromScreen([x, y])))
                },
                fromScreenPointStrict: function(x, y) {
                    var that = this,
                        p = that._fromTransformed(that._fromScreen([x, y])),
                        q = that._unproject(p);
                    return [p[0] >= that._minv[0] && p[0] <= that._maxv[0] ? q[0] : NaN, p[1] >= that._minv[1] && p[1] <= that._maxv[1] ? q[1] : NaN]
                },
                snapCenter: function() {
                    this._snappedCenter = this.getCenter();
                    return this
                },
                isCenterChanged: function() {
                    var center = this.getCenter();
                    return !floatsEqual(this._snappedCenter[0], center[0]) || !floatsEqual(this._snappedCenter[1], center[1])
                },
                snapZoom: function() {
                    this._snappedZoom = this.getZoom();
                    return this
                },
                isZoomChanged: function() {
                    return !floatsEqual(this._snappedZoom, this.getZoom())
                }
            });
        function floatsEqual(f1, f2) {
            return _abs(f1 - f2) < 1E-8
        }
        function cloneVector(point) {
            return point.slice()
        }
        function truncate(value, min, max, fallback) {
            var _value = _Number(value);
            if (_value < min)
                _value = min;
            else if (_value > max)
                _value = max;
            else if (!(min <= _value && _value <= max))
                _value = fallback;
            return _value
        }
        function truncateQuad(quad, min, max) {
            return [[truncate(quad[0], min[0], max[0], min[0]), truncate(quad[1], min[1], max[1], max[1]), ], [truncate(quad[2], min[0], max[0], max[0]), truncate(quad[3], min[1], max[1], min[1])]]
        }
        function pickNumber() {
            var i = 0,
                ii = arguments.length,
                value;
            for (; i < ii; ++i)
                if (_isFinite(value = _Number(arguments[i])))
                    return value;
            return NaN
        }
        DX.viz.map._tests.Projection = Projection;
        DX.viz.map.Map.prototype._factory.createProjection = function() {
            return new Projection
        }
    })(DevExpress);
    /*! Module viz-vectormap, file controlBar.js */
    (function(DX, undefined) {
        var _buildPath = DX.viz.renderers.buildPath,
            _setTimeout = setTimeout,
            _clearTimeout = clearTimeout,
            _round = Math.round,
            _pow = Math.pow,
            _ln = Math.log,
            _setElementData = DX.viz.map._utils.setElementData;
        var _LN2 = Math.LN2;
        var COMMAND_RESET = 'command-reset',
            COMMAND_MOVE_UP = 'command-move-up',
            COMMAND_MOVE_RIGHT = 'command-move-right',
            COMMAND_MOVE_DOWN = 'command-move-down',
            COMMAND_MOVE_LEFT = 'command-move-left',
            COMMAND_ZOOM_IN = 'command-zoom-in',
            COMMAND_ZOOM_OUT = 'command-zoom-out',
            COMMAND_ZOOM_DRAG = 'command-zoom-drag';
        var COMMAND_TO_TYPE_MAP = {};
        COMMAND_TO_TYPE_MAP[COMMAND_RESET] = ResetCommand;
        COMMAND_TO_TYPE_MAP[COMMAND_MOVE_UP] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_RIGHT] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_DOWN] = COMMAND_TO_TYPE_MAP[COMMAND_MOVE_LEFT] = MoveCommand;
        COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_IN] = COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_OUT] = ZoomCommand;
        COMMAND_TO_TYPE_MAP[COMMAND_ZOOM_DRAG] = ZoomDragCommand;
        var ControlBar = DX.Class.inherit({
                ctor: function(parameters) {
                    var that = this;
                    that._container = parameters.container;
                    that._createElements(parameters.renderer);
                    var context = parameters.context,
                        resetCallback = parameters.resetCallback,
                        beginMoveCallback = parameters.beginMoveCallback,
                        endMoveCallback = parameters.endMoveCallback,
                        moveCallback = parameters.moveCallback,
                        zoomCallback = parameters.zoomCallback;
                    parameters = null;
                    that._reset = function() {
                        resetCallback.call(context)
                    };
                    that._beginMove = function() {
                        beginMoveCallback.call(context)
                    };
                    that._endMove = function() {
                        endMoveCallback.call(context)
                    };
                    that._move = function(dx, dy) {
                        moveCallback.call(context, dx, dy)
                    };
                    that._zoom = function(zoom, x, y) {
                        zoomCallback.call(context, zoom, x, y)
                    };
                    that._dispose = function() {
                        this._reset = this._move = this._zoom = this._dispose = context = resetCallback = moveCallback = zoomCallback = null
                    }
                },
                _createElements: function(renderer) {
                    var that = this;
                    that._root = renderer.createGroup({'class': 'dxm-control-bar'});
                    that._buttonsGroup = renderer.createGroup({'class': 'dxm-control-buttons'}).append(that._root);
                    that._trackersGroup = renderer.createGroup({
                        stroke: 'none',
                        strokeWidth: 0,
                        fill: '#000000',
                        opacity: 0.0001,
                        cursor: 'pointer'
                    }).append(that._root);
                    var options = {
                            bigCircleSize: 58,
                            smallCircleSize: 28,
                            buttonSize: 10,
                            arrowButtonOffset: 20,
                            incdecButtonSize: 11,
                            incButtonOffset: 66,
                            decButtonOffset: 227,
                            sliderLineStartOffset: 88.5,
                            sliderLineEndOffset: 205.5,
                            sliderLength: 20,
                            sliderWidth: 8,
                            trackerGap: 4
                        };
                    that._createButtons(renderer, options);
                    that._createTrackers(renderer, options);
                    that._root.applySettings({
                        translateX: 50.5,
                        translateY: 50.5
                    })
                },
                _createButtons: function(renderer, options) {
                    var group = this._buttonsGroup,
                        size = options.buttonSize / 2,
                        offset1 = options.arrowButtonOffset - size,
                        offset2 = options.arrowButtonOffset,
                        incdecButtonSize = options.incdecButtonSize / 2;
                    renderer.createCircle(0, 0, options.bigCircleSize / 2).append(group);
                    renderer.createCircle(0, 0, size).append(group);
                    renderer.createPath([-size, -offset1, 0, -offset2, size, -offset1]).append(group);
                    renderer.createPath([offset1, -size, offset2, 0, offset1, size]).append(group);
                    renderer.createPath([size, offset1, 0, offset2, -size, offset1]).append(group);
                    renderer.createPath([-offset1, size, -offset2, 0, -offset1, -size]).append(group);
                    renderer.createCircle(0, options.incButtonOffset, options.smallCircleSize / 2).append(group);
                    renderer.createSimplePath({d: _buildPath([-incdecButtonSize, options.incButtonOffset, incdecButtonSize, options.incButtonOffset]) + ' ' + _buildPath([0, options.incButtonOffset - incdecButtonSize, 0, options.incButtonOffset + incdecButtonSize])}).append(group);
                    renderer.createCircle(0, options.decButtonOffset, options.smallCircleSize / 2).append(group);
                    renderer.createSimplePath({d: _buildPath([-incdecButtonSize, options.decButtonOffset, incdecButtonSize, options.decButtonOffset])}).append(group);
                    renderer.createSimplePath({d: _buildPath([0, options.sliderLineStartOffset, 0, options.sliderLineEndOffset])}).append(group);
                    this._zoomDrag = renderer.createRect(-options.sliderLength / 2, options.sliderLineEndOffset - options.sliderWidth / 2, options.sliderLength, options.sliderWidth).append(group);
                    this._sliderLineLength = options.sliderLineEndOffset - options.sliderLineStartOffset
                },
                _createTrackers: function(renderer, options) {
                    var group = this._trackersGroup,
                        size = _round((options.arrowButtonOffset - options.trackerGap) / 2),
                        offset1 = options.arrowButtonOffset - size,
                        offset2 = _round(_pow(options.bigCircleSize * options.bigCircleSize / 4 - size * size, 0.5)),
                        size2 = offset2 - offset1,
                        element;
                    element = renderer.createRect(-size, -size, size * 2, size * 2).append(group);
                    _setElementData(element.$element, {
                        index: COMMAND_RESET,
                        type: 'control-bar'
                    });
                    element = renderer.createRect(-size, -offset2, size * 2, size2).append(group);
                    _setElementData(element.$element, {
                        index: COMMAND_MOVE_UP,
                        type: 'control-bar'
                    });
                    element = renderer.createRect(offset1, -size, size2, size * 2).append(group);
                    _setElementData(element.$element, {
                        index: COMMAND_MOVE_RIGHT,
                        type: 'control-bar'
                    });
                    element = renderer.createRect(-size, offset1, size * 2, size2).append(group);
                    _setElementData(element.$element, {
                        index: COMMAND_MOVE_DOWN,
                        type: 'control-bar'
                    });
                    element = renderer.createRect(-offset2, -size, size2, size * 2).append(group);
                    _setElementData(element.$element, {
                        index: COMMAND_MOVE_LEFT,
                        type: 'control-bar'
                    });
                    element = renderer.createCircle(0, options.incButtonOffset, options.smallCircleSize / 2).append(group);
                    _setElementData(element.$element, {
                        index: COMMAND_ZOOM_IN,
                        type: 'control-bar'
                    });
                    element = renderer.createCircle(0, options.decButtonOffset, options.smallCircleSize / 2).append(group);
                    _setElementData(element.$element, {
                        index: COMMAND_ZOOM_OUT,
                        type: 'control-bar'
                    });
                    element = this._zoomDragCover = renderer.createRect(-options.sliderLength / 2, options.sliderLineEndOffset - options.sliderWidth / 2, options.sliderLength, options.sliderWidth).append(group);
                    _setElementData(element.$element, {
                        index: COMMAND_ZOOM_DRAG,
                        type: 'control-bar'
                    })
                },
                dispose: function() {
                    var that = this;
                    delete that._container;
                    that._dispose();
                    that._root.clear();
                    delete that._root;
                    delete that._buttonsGroup;
                    delete that._zoomDrag;
                    delete that._zoomDragCover;
                    return that
                },
                setZoomPartition: function(partition) {
                    this._zoomPartition = partition;
                    this._sliderUnitLength = this._sliderLineLength / partition;
                    return this
                },
                setZoom: function(zoom) {
                    this._adjustZoom(zoom);
                    return this
                },
                setOptions: function(options, interactionOptions) {
                    options = options || {};
                    interactionOptions = interactionOptions || {};
                    this._dragAndZoomEnabled = interactionOptions.dragAndZoomEnabled !== undefined ? !!interactionOptions.dragAndZoomEnabled : true;
                    this._enabled = this._dragAndZoomEnabled && (options.enabled !== undefined ? !!options.enabled : true);
                    this._buttonsGroup.applySettings(options.shape);
                    return this
                },
                clean: function() {
                    this._enabled && this._root.detach();
                    return this
                },
                render: function() {
                    this._enabled && this._root.append(this._container);
                    return this
                },
                _adjustZoom: function(zoom) {
                    var that = this;
                    that._zoomFactor = _round(zoom);
                    that._zoomFactor >= 0 || (that._zoomFactor = 0);
                    that._zoomFactor <= that._zoomPartition || (that._zoomFactor = that._zoomPartition);
                    var transform = {translateY: -that._zoomFactor * that._sliderUnitLength};
                    that._zoomDrag.applySettings(transform);
                    that._zoomDragCover.applySettings(transform)
                },
                _applyZoom: function(x, y) {
                    this._zoom(this._zoomFactor, x, y)
                },
                processStart: function(arg) {
                    if (this._dragAndZoomEnabled) {
                        var commandType = COMMAND_TO_TYPE_MAP[arg.data] || MoveScreenCommand;
                        this._command = new commandType(this, arg)
                    }
                    return this
                },
                processMove: function(arg) {
                    if (this._dragAndZoomEnabled)
                        this._command.update(arg);
                    return this
                },
                processEnd: function(arg) {
                    if (this._dragAndZoomEnabled)
                        this._command.finish(arg);
                    return this
                },
                processZoom: function(arg) {
                    var that = this,
                        zoomFactor;
                    if (that._dragAndZoomEnabled) {
                        if (arg.delta)
                            zoomFactor = arg.delta;
                        else if (arg.ratio)
                            zoomFactor = _ln(arg.ratio) / _LN2;
                        that._adjustZoom(that._zoomFactor + zoomFactor);
                        that._applyZoom(arg.x, arg.y)
                    }
                    return that
                }
            });
        function disposeCommand(command) {
            delete command._owner;
            command.update = function(){};
            command.finish = function(){}
        }
        function MoveScreenCommand(owner, arg) {
            this._owner = owner;
            this._x = arg.x;
            this._y = arg.y;
            this._owner._beginMove()
        }
        MoveScreenCommand.prototype.update = function(arg) {
            var that = this;
            that._owner._move(that._x - arg.x, that._y - arg.y);
            that._x = arg.x;
            that._y = arg.y
        };
        MoveScreenCommand.prototype.finish = function() {
            this._owner._endMove();
            disposeCommand(this)
        };
        function ResetCommand(owner, arg) {
            this._owner = owner;
            this._command = arg.data
        }
        ResetCommand.prototype.update = function(arg) {
            arg.data !== this._command && disposeCommand(this)
        };
        ResetCommand.prototype.finish = function() {
            this._owner._reset();
            this._owner._adjustZoom(0);
            disposeCommand(this)
        };
        function MoveCommand(owner, arg) {
            this._command = arg.data;
            var timeout = null,
                interval = 100,
                dx = 0,
                dy = 0;
            switch (this._command) {
                case COMMAND_MOVE_UP:
                    dy = -10;
                    break;
                case COMMAND_MOVE_RIGHT:
                    dx = 10;
                    break;
                case COMMAND_MOVE_DOWN:
                    dy = 10;
                    break;
                case COMMAND_MOVE_LEFT:
                    dx = -10;
                    break
            }
            function callback() {
                owner._move(dx, dy);
                timeout = _setTimeout(callback, interval)
            }
            this._stop = function() {
                _clearTimeout(timeout);
                owner._endMove();
                this._stop = owner = callback = null;
                return this
            };
            arg = null;
            owner._beginMove();
            callback()
        }
        MoveCommand.prototype.update = function(arg) {
            this._command !== arg.data && this.finish()
        };
        MoveCommand.prototype.finish = function() {
            disposeCommand(this._stop())
        };
        function ZoomCommand(owner, arg) {
            this._owner = owner;
            this._command = arg.data;
            var timeout = null,
                interval = 150,
                dzoom = this._command === COMMAND_ZOOM_IN ? 1 : -1;
            function callback() {
                owner._adjustZoom(owner._zoomFactor + dzoom);
                timeout = _setTimeout(callback, interval)
            }
            this._stop = function() {
                _clearTimeout(timeout);
                this._stop = owner = callback = null;
                return this
            };
            arg = null;
            callback()
        }
        ZoomCommand.prototype.update = function(arg) {
            this._command !== arg.data && this.finish()
        };
        ZoomCommand.prototype.finish = function() {
            this._owner._applyZoom();
            disposeCommand(this._stop())
        };
        function ZoomDragCommand(owner, arg) {
            this._owner = owner;
            this._zoomFactor = owner._zoomFactor;
            this._pos = arg.y
        }
        ZoomDragCommand.prototype.update = function(arg) {
            var owner = this._owner;
            owner._adjustZoom(this._zoomFactor + owner._zoomPartition * (this._pos - arg.y) / owner._sliderLineLength)
        };
        ZoomDragCommand.prototype.finish = function() {
            this._owner._applyZoom();
            disposeCommand(this)
        };
        DX.viz.map._tests.ControlBar = ControlBar;
        DX.viz.map.Map.prototype._factory.createControlBar = function(parameters) {
            return new ControlBar(parameters)
        }
    })(DevExpress);
    /*! Module viz-vectormap, file tracker.js */
    (function(DX, $, undefined) {
        var _addNamespace = DX.ui.events.addNamespace,
            _isTouchEvent = function(event) {
                var type = event.originalEvent.type,
                    pointerType = event.originalEvent.pointerType;
                return /^touch/.test(type) || /^MSPointer/.test(type) && pointerType !== 4 || /^pointer/.test(type) && pointerType !== 'mouse'
            },
            _abs = Math.abs,
            _sqrt = Math.sqrt,
            _now = $.now,
            _setTimeout = setTimeout,
            _clearTimeout = clearTimeout,
            _getElementData = DX.viz.map._utils.getElementData;
        var _document = $(document);
        var EVENT_NAMESPACE = 'dxVectorMap',
            EVENT_NAMES = {};
        var TOOLTIP_SHOW_DELAY = 300,
            TOOLTIP_HIDE_DELAY = 300,
            TOOLTIP_TOUCH_SHOW_DELAY = 400,
            TOOLTIP_TOUCH_HIDE_DELAY = 300;
        setupEvents();
        function setupEvents() {
            var wnd = window,
                isPointer = wnd.navigator.pointerEnabled,
                isMSPointer = wnd.navigator.msPointerEnabled,
                isTouch = 'ontouchstart' in wnd;
            switch (arguments[0]) {
                case'pointer':
                    isPointer = true;
                    isMSPointer = isTouch = false;
                    break;
                case'MSPointer':
                    isMSPointer = true;
                    isPointer = isTouch = false;
                    break;
                case'touch':
                    isTouch = true;
                    isPointer = isMSPointer = false;
                    break;
                case'mouse':
                    isPointer = isMSPointer = isTouch = false;
                    break
            }
            EVENT_NAMES.start = _addNamespace(isPointer ? 'pointerdown' : isMSPointer ? 'MSPointerDown' : isTouch ? 'touchstart mousedown' : 'mousedown', EVENT_NAMESPACE);
            EVENT_NAMES.move = _addNamespace(isPointer ? 'pointermove' : isMSPointer ? 'MSPointerMove' : isTouch ? 'touchmove mousemove' : 'mousemove', EVENT_NAMESPACE);
            EVENT_NAMES.end = _addNamespace(isPointer ? 'pointerup' : isMSPointer ? 'MSPointerUp' : isTouch ? 'touchend mouseup' : 'mouseup', EVENT_NAMESPACE);
            EVENT_NAMES.over = _addNamespace(isPointer ? 'pointerover' : isMSPointer ? 'MSPointerOver' : 'mouseover', EVENT_NAMESPACE);
            EVENT_NAMES.out = _addNamespace(isPointer ? 'pointerout' : isMSPointer ? 'MSPointerOut' : 'mouseout', EVENT_NAMESPACE);
            EVENT_NAMES.wheel = _addNamespace('mousewheel DOMMouseScroll', EVENT_NAMESPACE)
        }
        function getEventCoords(event) {
            var originalEvent = event.originalEvent,
                touch = originalEvent.touches ? originalEvent.touches[0] : {};
            return {
                    x: touch.pageX || originalEvent.pageX || event.pageX,
                    y: touch.pageY || originalEvent.pageY || event.pageY
                }
        }
        function getSecondTouchId(event) {
            return event.originalEvent.pointerId || 1
        }
        function getMultiTouchEventCoords(event, pointerId, index) {
            var originalEvent = event.originalEvent,
                target;
            if (originalEvent.pointerId !== undefined)
                target = !!index === (originalEvent.pointerId === pointerId) && originalEvent;
            else if (originalEvent.touches)
                target = originalEvent.touches[index];
            return target ? {
                    x: target.pageX,
                    y: target.pageY
                } : null
        }
        var EVENT_START = 'start',
            EVENT_MOVE = 'move',
            EVENT_END = 'end',
            EVENT_ZOOM = 'zoom',
            EVENT_HOVER_ON = 'hover-on',
            EVENT_HOVER_OFF = 'hover-off',
            EVENT_CLICK = 'click',
            EVENT_TOOLTIP_CHECK = 'tooltip-check',
            EVENT_TOOLTIP_SHOW = 'tooltip-show',
            EVENT_TOOLTIP_HIDE = 'tooltip-hide',
            EVENT_TOOLTIP_MOVE = 'tooltip-move';
        var Tracker = DX.Class.inherit({
                ctor: function() {
                    var that = this;
                    that._groups = {};
                    that._createCallbacks();
                    that.reset()
                },
                dispose: function() {
                    var that = this;
                    DX.utils.debug.assert(!that._root, 'Undetached root!');
                    DX.utils.debug.assert($.map(that._groups, function(item) {
                        return item
                    }).length === 0, 'Undetached groups!');
                    that._dispose();
                    that._groups = that._context = that._callbacks = null;
                    return that
                },
                reset: function() {
                    var that = this;
                    that._processEnd();
                    that._processHoverOff();
                    that._hideTooltipCore();
                    _clearTimeout(that._tooltip_showTimeout);
                    _clearTimeout(that._tooltip_hideTimeout);
                    that._touchLock = that._click_time = that._tooltip_showTimeout = that._tooltip_hideTimeout = null
                },
                _createCallbacks: function() {
                    var that = this;
                    that._rootEvents = {};
                    that._rootEvents[EVENT_NAMES.start] = function(event) {
                        var isTouch = _isTouchEvent(event);
                        if (isTouch && !that._touchEnabled)
                            return;
                        event.preventDefault();
                        if (!that._touchLock) {
                            that._processStart(event);
                            that._processClickStart(event);
                            isTouch && that._processTooltipRootTouchStart(event)
                        }
                        else {
                            that._zooming = true;
                            that._processZoomStart(event)
                        }
                        that._touchLock = isTouch
                    };
                    that._documentEventsMoveEnd = {};
                    that._documentEventsMoveEnd[EVENT_NAMES.move] = function(event) {
                        var isTouch = _isTouchEvent(event);
                        if (that._touchLock === isTouch)
                            if (!that._zooming)
                                that._processMove(event);
                            else
                                that._processZoomMove(event)
                    };
                    that._documentEventsMoveEnd[EVENT_NAMES.end] = function(event) {
                        var isTouch = _isTouchEvent(event);
                        if (that._touchLock === isTouch) {
                            that._touchLock = null;
                            if (that._zooming)
                                that._processZoomEnd(event);
                            that._processClickEnd(event);
                            that._processEnd(event);
                            that._zooming = null
                        }
                    };
                    that._rootEvents[EVENT_NAMES.wheel] = function(event) {
                        if (that._wheelEnabled) {
                            event.preventDefault();
                            that._processWheel(event)
                        }
                    };
                    that._groupEvents = {};
                    that._groupEvents[EVENT_NAMES.start] = function(event) {
                        var isTouch = _isTouchEvent(event);
                        if (isTouch && !that._touchEnabled)
                            return;
                        isTouch && that._processTooltipTouchStart(event)
                    };
                    that._groupEvents[EVENT_NAMES.over] = function(event) {
                        if (!that._touchLock && !_isTouchEvent(event)) {
                            if (that._hover_event && that._hover_event.target === event.target)
                                return;
                            that._processHoverOn(event);
                            that._processTooltipMouseOver(event)
                        }
                    };
                    that._groupEvents[EVENT_NAMES.out] = function(event) {
                        if (!that._touchLock && !_isTouchEvent(event)) {
                            if (_getElementData($(event.target)) === undefined)
                                return;
                            that._processHoverOff();
                            that._processTooltipMouseOut(event)
                        }
                    };
                    that._groupTooltipEventsMouseMove = {};
                    that._groupTooltipEventsMouseMove[EVENT_NAMES.move] = function(event) {
                        that._processTooltipMouseMove(event)
                    };
                    that._groupTooltipEventsTouchMoveEnd = {};
                    that._groupTooltipEventsTouchMoveEnd[EVENT_NAMES.move] = function(event) {
                        that._processTooltipTouchMove(event)
                    };
                    that._groupTooltipEventsTouchMoveEnd[EVENT_NAMES.end] = function(event) {
                        that._processTooltipTouchEnd(event)
                    };
                    that._showTooltipCallback = function() {
                        that._showTooltipCore()
                    };
                    that._hideTooltipCallback = function() {
                        that._hideTooltipCore()
                    };
                    that._dispose = function() {
                        var that = this;
                        that = that._dispose = that._rootEvents = that._documentEventsMoveEnd = that._groupEvents = that._groupTooltipEventsMouseMove = that._groupTooltipEventsTouchMoveEnd = that._showTooltipCallback = that._hideTooltipCallback = null
                    }
                },
                _processStart: function(event) {
                    var that = this,
                        coords = getEventCoords(event);
                    that._start_x = that._x = coords.x;
                    that._start_y = that._y = coords.y;
                    that._move_event = event;
                    that._callbacks[EVENT_START].call(that._context, {
                        $target: $(event.target),
                        x: that._x,
                        y: that._y
                    });
                    _document.off(that._documentEventsMoveEnd).on(that._documentEventsMoveEnd, event.data)
                },
                _processMove: function(event) {
                    var that = this,
                        coords = getEventCoords(event);
                    if (that._moving || _abs(that._start_x - coords.x) > 3 || _abs(that._start_y - coords.y) > 3) {
                        that._moving = true;
                        that._x = coords.x;
                        that._y = coords.y;
                        that._move_event = event;
                        that._callbacks[EVENT_MOVE].call(that._context, {
                            $target: $(event.target),
                            x: that._x,
                            y: that._y
                        })
                    }
                },
                _processEnd: function(event) {
                    var that = this;
                    _document.off(that._documentEventsMoveEnd);
                    event = event || that._move_event;
                    that._move_event && that._callbacks[EVENT_END].call(that._context, {
                        $target: $(event.target),
                        x: that._x,
                        y: that._y
                    });
                    that._moving = that._start_x = that._start_y = that._x = that._y = that._move_event = null
                },
                _processZoomStart: function(event) {
                    var that = this,
                        coords;
                    that._second_id = getSecondTouchId(event);
                    coords = getMultiTouchEventCoords(event, that._second_id, 0);
                    if (coords) {
                        that._start_x = that._x = coords.x;
                        that._start_y = that._y = coords.y
                    }
                    coords = getMultiTouchEventCoords(event, that._second_id, 1);
                    if (coords) {
                        that._second_start_x = that._second_x = coords.x;
                        that._second_start_y = that._second_y = coords.y
                    }
                },
                _processZoomMove: function(event) {
                    var that = this,
                        coords;
                    coords = getMultiTouchEventCoords(event, that._second_id, 0);
                    if (coords) {
                        that._x = coords.x;
                        that._y = coords.y
                    }
                    coords = getMultiTouchEventCoords(event, that._second_id, 1);
                    if (coords) {
                        that._second_x = coords.x;
                        that._second_y = coords.y
                    }
                },
                _processZoomEnd: function(event) {
                    var that = this,
                        startDistance = getDistance(that._start_x, that._start_y, that._second_start_x, that._second_start_y),
                        currentDistance = getDistance(that._x, that._y, that._second_x, that._second_y);
                    that._callbacks[EVENT_ZOOM].call(that._context, {
                        $target: $(event.target),
                        ratio: currentDistance / startDistance,
                        x: (that._start_x + that._second_start_x) / 2,
                        y: (that._start_y + that._second_start_y) / 2
                    });
                    that._start_x = that._start_y = that._x = that._y = that._second_start_x = that._second_start_y = that._second_id = that._second_x = that._second_y = null
                },
                _processWheel: function(event) {
                    var coords = getEventCoords(event),
                        delta = event.originalEvent.wheelDelta / 120 || event.originalEvent.detail / -3 || 0;
                    delta = 0 < delta && delta < +1 ? +1 : delta;
                    delta = 0 > delta && delta > -1 ? -1 : delta;
                    this._callbacks[EVENT_ZOOM].call(this._context, {
                        $target: $(event.target),
                        delta: delta,
                        x: coords.x,
                        y: coords.y
                    })
                },
                _processHoverOn: function(event) {
                    var that = this;
                    that._hover_event && that._callbacks[EVENT_HOVER_OFF].call(that._context, {
                        $target: $(that._hover_event.target),
                        category: that._hover_event.data.category
                    });
                    that._hover_event = event;
                    that._callbacks[EVENT_HOVER_ON].call(that._context, {
                        $target: $(that._hover_event.target),
                        category: that._hover_event.data.category
                    })
                },
                _processHoverOff: function(event) {
                    var that = this;
                    that._hover_event && that._callbacks[EVENT_HOVER_OFF].call(that._context, {
                        $target: $(that._hover_event.target),
                        category: that._hover_event.data.category
                    });
                    that._hover_event = null
                },
                _processClickStart: function(event) {
                    this._click_time = _now()
                },
                _processClickEnd: function(event) {
                    var that = this;
                    if (that._click_time && !that._moving && _now() - that._click_time <= 500)
                        that._callbacks[EVENT_CLICK].call(that._context, {
                            $target: $(event.target),
                            x: that._x,
                            y: that._y,
                            $event: event
                        });
                    that._click_time = null
                },
                _processTooltipMouseOver: function(event) {
                    var that = this;
                    if (that._tooltipEnabled && that._isTooltipAvailable(event)) {
                        var coords = getEventCoords(event);
                        that._tooltip_x = coords.x;
                        that._tooltip_y = coords.y;
                        event.data.container.off(that._groupTooltipEventsMouseMove).on(that._groupTooltipEventsMouseMove, event.data);
                        that._showTooltip(that._tooltip_target ? null : TOOLTIP_SHOW_DELAY)
                    }
                },
                _processTooltipMouseMove: function(event) {
                    var that = this;
                    if (that._isTooltipAvailable(event))
                        if (that._tooltip_target)
                            that._showTooltip();
                        else {
                            var coords = getEventCoords(event);
                            if (_abs(that._tooltip_x - coords.x) > 3 || _abs(that._tooltip_y - coords.y) > 3)
                                that._showTooltip(TOOLTIP_SHOW_DELAY)
                        }
                    else {
                        event.data.container.off(that._groupTooltipEventsMouseMove);
                        that._hideTooltip(TOOLTIP_HIDE_DELAY)
                    }
                },
                _processTooltipMouseOut: function(event) {
                    if (this._tooltipEnabled) {
                        event.data.container.off(this._groupTooltipEventsMouseMove);
                        this._hideTooltip(TOOLTIP_HIDE_DELAY)
                    }
                },
                _processTooltipTouchStart: function(event) {
                    var that = this;
                    if (that._tooltipEnabled && that._isTooltipAvailable(event)) {
                        that._showTooltip(TOOLTIP_TOUCH_SHOW_DELAY);
                        event.data.container.off(that._groupTooltipEventsTouchMoveEnd).on(that._groupTooltipEventsTouchMoveEnd, event.data);
                        that._skipTouchStart = true
                    }
                },
                _processTooltipRootTouchStart: function(event) {
                    if (!this._skipTouchStart)
                        this._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
                    this._skipTouchStart = null
                },
                _processTooltipTouchMove: function(event) {
                    if (this._moving) {
                        this._hideTooltip();
                        event.data.container.off(this._groupTooltipEventsTouchMoveEnd)
                    }
                },
                _processTooltipTouchEnd: function(event) {
                    if (this._tooltip_showTimeout)
                        this._hideTooltip(TOOLTIP_TOUCH_HIDE_DELAY);
                    event.data.container.off(this._groupTooltipEventsTouchMoveEnd)
                },
                _isTooltipAvailable: function(event) {
                    var that = this,
                        result = !that._moving;
                    if (result && (!that._tooltip_event || that._tooltip_event.target !== event.target))
                        result = that._callbacks[EVENT_TOOLTIP_CHECK].call(that._context, {
                            $target: $(event.target),
                            category: event.data.category
                        });
                    that._tooltip_event = event;
                    return result
                },
                _showTooltip: function(delay) {
                    var that = this;
                    _clearTimeout(that._tooltip_hideTimeout);
                    that._tooltip_hideTimeout = null;
                    _clearTimeout(that._tooltip_showTimeout);
                    if (delay > 0)
                        that._tooltip_showTimeout = _setTimeout(that._showTooltipCallback, delay);
                    else
                        that._showTooltipCallback()
                },
                _hideTooltip: function(delay) {
                    var that = this;
                    _clearTimeout(that._tooltip_showTimeout);
                    that._tooltip_showTimeout = null;
                    if (delay > 0)
                        that._tooltip_hideTimeout = that._tooltip_hideTimeout || _setTimeout(that._hideTooltipCallback, delay);
                    else {
                        _clearTimeout(that._tooltip_hideTimeout);
                        that._hideTooltipCallback()
                    }
                },
                _showTooltipCore: function() {
                    var that = this,
                        event = that._tooltip_event,
                        coords = getEventCoords(event);
                    if (!that._tooltip_target)
                        that._callbacks[EVENT_TOOLTIP_SHOW].call(that._context, {
                            $target: $(event.target),
                            category: event.data.category
                        });
                    that._tooltip_target = event.target;
                    that._callbacks[EVENT_TOOLTIP_MOVE].call(that._context, {
                        $target: $(that._tooltip_target),
                        category: event.data.category,
                        x: coords.x,
                        y: coords.y
                    });
                    that._tooltip_showTimeout = null
                },
                _hideTooltipCore: function() {
                    var that = this,
                        event = that._tooltip_event;
                    if (that._tooltip_target)
                        that._callbacks[EVENT_TOOLTIP_HIDE].call(that._context, {
                            $target: $(that._tooltip_target),
                            category: event.data.category
                        });
                    that._tooltip_target = that._tooltip_hideTimeout = that._tooltip_event = null
                },
                attachRoot: function(container) {
                    DX.utils.debug.assert(!this._root, 'Root is already attached!');
                    this._root = container;
                    return this
                },
                detachRoot: function() {
                    DX.utils.debug.assert(this._root, 'Root is not attached!');
                    this._root = null;
                    return this
                },
                attachGroup: function(category, container) {
                    DX.utils.debug.assert(!this._groups[category], 'Group category is already attached!');
                    this._groups[category] = container;
                    return this
                },
                detachGroup: function(category) {
                    DX.utils.debug.assert(this._groups[category], 'Group category is not attached!');
                    this._groups[category] = null;
                    return this
                },
                setCallbacks: function(context, callbacks) {
                    this._context = context;
                    this._callbacks = callbacks;
                    return this
                },
                setOptions: function(options, tooltipEnabled) {
                    options = options || {};
                    var that = this;
                    that._touchEnabled = 'touchEnabled' in options ? !!options.touchEnabled : true;
                    that._wheelEnabled = 'wheelEnabled' in options ? !!options.wheelEnabled : true;
                    that._tooltipEnabled = tooltipEnabled;
                    return that
                },
                render: function() {
                    var that = this;
                    if (that._touchEnabled) {
                        that._root.on(_addNamespace('MSHoldVisual', EVENT_NAMESPACE), function(event) {
                            event.preventDefault()
                        }).on(_addNamespace('contextmenu', EVENT_NAMESPACE), function(event) {
                            _isTouchEvent(event) && event.preventDefault()
                        });
                        that._root.applySettings({style: {
                                'touch-action': 'none',
                                '-ms-touch-action': 'none',
                                '-webkit-user-select': 'none'
                            }})
                    }
                    that._root.on(that._rootEvents, {container: that._root});
                    var category,
                        group;
                    for (category in that._groups) {
                        group = that._groups[category];
                        group && group.on(that._groupEvents, {
                            category: category,
                            container: group
                        })
                    }
                    return that
                },
                clean: function() {
                    var that = this;
                    if (that._touchEnabled)
                        that._root.applySettings({style: {
                                'touch-action': '',
                                '-ms-touch-action': '',
                                '-webkit-user-select': ''
                            }});
                    that._root.off('.' + EVENT_NAMESPACE);
                    _document.off(that._documentEventsMoveEnd);
                    var category,
                        group;
                    for (category in that._groups) {
                        group = that._groups[category];
                        group && group.off('.' + EVENT_NAMESPACE)
                    }
                    that.reset();
                    return that
                }
            });
        function getDistance(x1, y1, x2, y2) {
            return _sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
        }
        DX.viz.map._tests.Tracker = Tracker;
        DX.viz.map._tests._DEBUG_forceEventMode = function(mode) {
            setupEvents(mode)
        };
        DX.viz.map.Map.prototype._factory.createTracker = function() {
            return new Tracker
        }
    })(DevExpress, jQuery);
    /*! Module viz-vectormap, file themeManager.js */
    (function(DX, $, undefined) {
        var _Number = Number,
            _extend = $.extend,
            _each = $.each;
        var ThemeManager = DX.viz.core.BaseThemeManager.inherit({
                _themeSection: 'map',
                _initializeTheme: function() {
                    var that = this;
                    that._initializeFont(that._theme.marker.font);
                    that._initializeFont(that._theme.tooltip.font);
                    that._initializeFont(that._theme.legend.font);
                    that._initializeFont(that._theme.loadingIndicator.font)
                },
                dispose: function() {
                    var that = this;
                    that.callBase.apply(that, arguments);
                    that._areasPalette = that._markersPalette = null;
                    return that
                },
                getBackgroundSettings: function(options) {
                    var theme = this._theme.background,
                        merged = _extend({}, theme, options);
                    return {
                            strokeWidth: merged.borderWidth,
                            stroke: merged.borderColor,
                            fill: merged.color
                        }
                },
                getCommonAreaSettings: function(options) {
                    var settings = _extend({}, this._theme.area, options);
                    this._areasPalette = new DX.viz.core.GradientPalette(settings.palette, settings.paletteSize);
                    this._DEBUG_areasPalette = this._areasPalette;
                    return settings
                },
                getAreaSettings: function(commonSettings, options) {
                    options = options || {};
                    var settings = _extend({}, commonSettings, options);
                    settings.borderWidth = _Number(settings.borderWidth) || 0;
                    settings.borderColor = settings.borderColor || null;
                    if (options.color === undefined && options.paletteIndex >= 0)
                        settings.color = this._areasPalette.getColor(options.paletteIndex);
                    settings.color = settings.color || null;
                    settings.hoveredBorderWidth = _Number(settings.hoveredBorderWidth) || settings.borderWidth;
                    settings.hoveredBorderColor = settings.hoveredBorderColor || settings.borderColor;
                    settings.hoveredColor = settings.hoveredColor || settings.color;
                    settings.selectedBorderWidth = _Number(settings.selectedBorderWidth) || settings.borderWidth;
                    settings.selectedBorderColor = settings.selectedBorderColor || settings.borderColor;
                    settings.selectedColor = settings.selectedColor || settings.color;
                    return settings
                },
                getCommonMarkerSettings: function(options) {
                    options = options || {};
                    var theme = this._theme.marker,
                        allSettings = {};
                    _each(theme, function(name) {
                        if (name[0] === '#') {
                            var partialTheme = theme[name] || {},
                                partialOptions = options[name] || {},
                                settings = _extend({}, theme, partialTheme, options, partialOptions);
                            settings.font = _extend({}, theme.font, partialTheme.font, options.font, partialOptions.font);
                            allSettings[name.substr(1)] = settings
                        }
                    });
                    this._markersPalette = new DX.viz.core.Palette(options.palette || theme.palette, {
                        stepHighlight: 50,
                        theme: this.themeName()
                    });
                    this._DEBUG_markersPalette = this._markersPalette;
                    return allSettings
                },
                getMarkerSettings: function(commonSettings, options, type) {
                    options = options || {};
                    var common = commonSettings[type],
                        settings = _extend({}, common, options);
                    settings.font = _extend({}, common.font, options.font);
                    settings.borderWidth = _Number(settings.borderWidth) || 0;
                    settings.borderColor = settings.borderColor || null;
                    settings.color = settings.color || null;
                    settings.opacity = settings.opacity || null;
                    settings.hoveredBorderWidth = _Number(settings.hoveredBorderWidth) || settings.borderWidth;
                    settings.hoveredBorderColor = settings.hoveredBorderColor || settings.borderColor;
                    settings.hoveredColor = settings.hoveredColor || settings.color;
                    settings.hoveredOpacity = settings.hoveredOpacity || settings.opacity;
                    settings.selectedBorderWidth = _Number(settings.selectedBorderWidth) || settings.borderWidth;
                    settings.selectedBorderColor = settings.selectedBorderColor || settings.borderColor;
                    settings.selectedColor = settings.selectedColor || settings.color;
                    settings.selectedOpacity = settings.selectedOpacity || settings.opacity;
                    return settings
                },
                getMarkerColors: function(count) {
                    var i = 0,
                        colors = [];
                    for (; i < count; ++i)
                        colors.push(this._markersPalette.getNextColor());
                    this._markersPalette.reset();
                    return colors
                },
                getControlBarSettings: function(options) {
                    var theme = this._theme.controlBar,
                        merged = _extend({}, theme, options);
                    return _extend({}, options, {shape: {
                                strokeWidth: merged.borderWidth,
                                stroke: merged.borderColor,
                                fill: merged.color
                            }})
                },
                getLoadIndicatorSettings: function(options) {
                    var theme = this._theme.loadingIndicator;
                    return _extend(true, {}, theme, options)
                },
                getTooltipSettings: function(options) {
                    var theme = this._theme.tooltip,
                        merged = _extend({}, theme, options),
                        borderOptions = _extend({}, theme.border, options && options.border, options && !options.border && {color: options.borderColor});
                    return _extend({}, options, {
                            color: merged.color,
                            border: borderOptions,
                            text: {
                                strokeWidth: 0,
                                stroke: 'none',
                                fill: 'none',
                                font: _extend({}, theme.font, merged.font),
                                'class': 'dxm-tooltip-text'
                            },
                            arrowLength: merged.arrowLength,
                            paddingLeftRight: merged.paddingLeftRight,
                            paddingTopBottom: merged.paddingTopBottom,
                            opacity: merged.opacity,
                            shadow: _extend({}, theme.shadow, merged.shadow)
                        })
                },
                getLegendSettings: function(options) {
                    return _extend(true, {}, this._theme.legend, options)
                },
                getLegendItemSettings: function(item) {
                    var color = item.color;
                    if (color === undefined && item.paletteIndex >= 0)
                        color = this._areasPalette.getColor(item.paletteIndex);
                    return {
                            text: item.text,
                            color: color
                        }
                },
                patchRtlSettings: function(rtlEnabledOption) {
                    var theme = this._theme;
                    if (rtlEnabledOption || theme.rtlEnabled && rtlEnabledOption !== false)
                        $.extend(true, theme, theme._rtl)
                }
            });
        DX.viz.map._tests.ThemeManager = ThemeManager;
        DX.viz.map.Map.prototype._factory.createThemeManager = function() {
            return new ThemeManager
        }
    })(DevExpress, jQuery);
    /*! Module viz-vectormap, file mapItemsManager.js */
    (function(DX, $, undefined) {
        var _String = String,
            _isString = DX.utils.isString,
            _isArray = DX.utils.isArray,
            _isFunction = DX.utils.isFunction;
        var SELECTION_MODE_NONE = 'none',
            SELECTION_MODE_SINGLE = 'single',
            SELECTION_MODE_MULTIPLE = 'multiple';
        var MapItemsManager = DX.Class.inherit({
                _rootClass: null,
                _trackerCategory: null,
                ctor: function(parameters) {
                    var that = this;
                    that._container = parameters.container;
                    that._renderer = parameters.renderer;
                    that._projection = parameters.projection;
                    that._themeManager = parameters.themeManager;
                    that._tracker = parameters.tracker;
                    that._ready = parameters.ready;
                    that._root = that._renderer.createGroup({'class': that._rootClass});
                    that._tracker.attachGroup(that._trackerCategory, that._root);
                    that._items = []
                },
                dispose: function() {
                    var that = this;
                    that._tracker.detachGroup(that._trackerCategory);
                    that._container = that._renderer = that._projection = that._themeManager = that._tracker = that._ready = that._root = that._source = that._readyCallback = null;
                    return that
                },
                clean: function() {
                    var that = this;
                    that._rendered = false;
                    that._root.detach();
                    that._customizeCallback = that._clickCallback = that._selectionChangedCallback = null;
                    that._destroyItems();
                    return that
                },
                render: function(options) {
                    options = options || {};
                    var that = this;
                    that._rendered = true;
                    that._customizeCallback = _isFunction(options.customize) ? options.customize : null;
                    that._clickCallback = _isFunction(options.click) ? options.click : null;
                    that._selectionChangedCallback = _isFunction(options.selectionChanged) ? options.selectionChanged : null;
                    that._hoverEnabled = 'hoverEnabled' in options ? !!options.hoverEnabled : true;
                    var selectionMode = _String(options.selectionMode).toLowerCase();
                    that._selectionMode = selectionMode === SELECTION_MODE_NONE || selectionMode === SELECTION_MODE_SINGLE || selectionMode === SELECTION_MODE_MULTIPLE ? selectionMode : SELECTION_MODE_SINGLE;
                    that._root.append(that._container);
                    if (that._source !== null)
                        that._createItems();
                    return that
                },
                _destroyItems: function() {
                    var that = this,
                        items = that._items,
                        i = 0,
                        ii = items.length;
                    that._root.clear();
                    for (; i < ii; ++i)
                        items[i].dispose();
                    that._items = [];
                    that._selectedItems = null
                },
                _getDataItems: function(source) {
                    return source
                },
                _createItems: function() {
                    var that = this;
                    that._selectedItems = that._selectionMode === SELECTION_MODE_MULTIPLE ? {} : null;
                    var dataItems = that._getDataItems(that._source),
                        i = 0,
                        ii = _isArray(dataItems) ? dataItems.length : 0,
                        item,
                        state,
                        selectedList = [];
                    for (; i < ii; ++i) {
                        state = {index: i};
                        item = that._createItem(dataItems[i], state);
                        that._items.push(item);
                        if (state.selected)
                            selectedList.push(i)
                    }
                    if (that._selectionMode !== SELECTION_MODE_NONE && selectedList.length > 0) {
                        if (that._selectionMode === SELECTION_MODE_SINGLE)
                            selectedList = [selectedList[selectedList.length - 1]];
                        for (i = 0, ii = selectedList.length; i < ii; ++i)
                            that.selectItem(selectedList[i], true, true)
                    }
                    that._arrangeItems();
                    that._ready && that._ready()
                },
                _createItem: null,
                _arrangeItems: function(){},
                setData: function(data) {
                    var that = this;
                    that._source = null;
                    if (_isString(data))
                        $.getJSON(data).done(updateSource).fail(function(_0, _1, error) {
                            updateSource(error)
                        });
                    else
                        updateSource(data);
                    return that;
                    function updateSource(source) {
                        that._source = source || 0;
                        if (that._rendered) {
                            that._tracker.reset();
                            that._destroyItems();
                            that._createItems()
                        }
                    }
                },
                transform: function(transform) {
                    this._root.applySettings(transform);
                    return this
                },
                redraw: function() {
                    var items = this._items,
                        i = 0,
                        ii = items.length;
                    for (; i < ii; ++i)
                        items[i].locate();
                    return this
                },
                hoverItem: function(index, state) {
                    if (this._hoverEnabled)
                        this._items[index].setHovered(!!state);
                    return this
                },
                _raiseSelectionChanged: function(item) {
                    var that = this;
                    if (that._selectionChangedCallback)
                        setTimeout(function() {
                            that._selectionChangedCallback && that._selectionChangedCallback.call(item.proxy, item.proxy)
                        }, 0)
                },
                selectItem: function(index, state, noCallback) {
                    var that = this;
                    if (that._selectionMode === SELECTION_MODE_NONE)
                        return that;
                    var item = that._items[index],
                        previous = item.selected;
                    item.setSelected(!!state);
                    if (item.selected === previous)
                        return that;
                    if (!noCallback)
                        that._raiseSelectionChanged(item);
                    if (item.selected && that._selectionMode === SELECTION_MODE_SINGLE && that._selectedItems) {
                        that._selectedItems.setSelected(false);
                        if (!noCallback)
                            that._raiseSelectionChanged(that._selectedItems);
                        that._selectedItems = null
                    }
                    if (that._selectionMode === SELECTION_MODE_SINGLE)
                        that._selectedItems = item.selected ? item : null;
                    else if (item.selected)
                        that._selectedItems[index] = item;
                    else
                        delete that._selectedItems[index];
                    return that
                },
                clearSelection: function() {
                    var that = this;
                    if (that._selectionMode === SELECTION_MODE_NONE)
                        return that;
                    if (that._selectionMode === SELECTION_MODE_SINGLE) {
                        if (that._selectedItems) {
                            that._selectedItems.setSelected(false);
                            that._raiseSelectionChanged(that._selectedItems);
                            that._selectedItems = null
                        }
                    }
                    else {
                        var key,
                            value;
                        for (key in that._selectedItems) {
                            that._selectedItems[key].setSelected(false);
                            that._raiseSelectionChanged(that._selectedItems[key]);
                            delete that._selectedItems[key]
                        }
                    }
                    return that
                },
                raiseClick: function(index, $event) {
                    var that = this,
                        item = that._items[index];
                    if (that._clickCallback)
                        setTimeout(function() {
                            that._clickCallback && that._clickCallback.call(item.proxy, item.proxy, $event)
                        }, 0);
                    return that
                },
                getProxyItems: function() {
                    var items = this._items,
                        i = 0,
                        ii = items.length,
                        list = [];
                    for (; i < ii; ++i)
                        list.push(items[i].proxy);
                    return list
                },
                getProxyItem: function(index) {
                    return this._items[index].proxy
                }
            });
        DX.viz.map._tests.MapItemsManager = MapItemsManager;
        DX.viz.map.Map.prototype._factory.MapItemsManager = MapItemsManager
    })(DevExpress, jQuery);
    /*! Module viz-vectormap, file areasManager.js */
    (function(DX, $, undefined) {
        var _extend = $.extend;
        var AreasManager = DX.viz.map.Map.prototype._factory.MapItemsManager.inherit({
                _rootClass: 'dxm-areas',
                _trackerCategory: 'areas',
                dispose: function() {
                    this._project = this._getAttributes = null;
                    return this.callBase.apply(this, arguments)
                },
                clean: function() {
                    this._commonSettings = null;
                    return this.callBase.apply(this, arguments)
                },
                render: function(options) {
                    this._commonSettings = this._themeManager.getCommonAreaSettings(options || {});
                    return this.callBase.apply(this, arguments)
                },
                _getDataItems: function(source) {
                    if (source && source.type === 'FeatureCollection') {
                        source = source.features;
                        this._project = projectGeoJson;
                        this._getAttributes = getAttributesGeoJson
                    }
                    else {
                        this._project = projectDefault;
                        this._getAttributes = getAttributesDefault
                    }
                    return source
                },
                _DEBUG_stubAreaType: function(areaType) {
                    this._areaType = areaType
                },
                _createItem: function(dataItem, state) {
                    dataItem = dataItem || {};
                    var that = this,
                        style = (that._customizeCallback ? that._customizeCallback.call(dataItem, dataItem) : null) || {};
                    style = that._themeManager.getAreaSettings(that._commonSettings, style);
                    var coordinates = that._project(dataItem),
                        attributes = that._getAttributes(dataItem) || {},
                        area = new that._areaType(that, state.index, coordinates, attributes, style);
                    state.selected = attributes.isSelected || style.isSelected;
                    return area
                }
            });
        function projectDefault(dataItem) {
            return this._projection.projectArea(dataItem.coordinates)
        }
        function projectGeoJson(dataItem) {
            var coordinates;
            if (dataItem.geometry) {
                var type = dataItem.geometry.type;
                coordinates = dataItem.geometry.coordinates;
                if (coordinates && (type === 'Polygon' || type === 'MultiPolygon'))
                    type === 'MultiPolygon' && (coordinates = [].concat.apply([], coordinates))
            }
            return this._projection.projectArea(coordinates)
        }
        function getAttributesDefault(dataItem) {
            return dataItem.attributes
        }
        function getAttributesGeoJson(dataItem) {
            return dataItem.properties
        }
        var _noop = $.noop;
        function Area(manager, index, coordinates, attributes, style) {
            var that = this;
            that._manager = manager;
            that._index = index;
            that._coords = coordinates;
            that.hovered = that.selected = false;
            that._styles = {
                normal: {
                    'class': 'dxm-area',
                    stroke: style.borderColor,
                    strokeWidth: style.borderWidth,
                    fill: style.color
                },
                hovered: {
                    'class': 'dxm-area dxm-area-hovered',
                    stroke: style.hoveredBorderColor,
                    strokeWidth: style.hoveredBorderWidth,
                    fill: style.hoveredColor
                },
                selected: {
                    'class': 'dxm-area dxm-area-selected',
                    stroke: style.selectedBorderColor,
                    strokeWidth: style.selectedBorderWidth,
                    fill: style.selectedColor
                }
            };
            that._element = manager._renderer.createSimplePath(that._styles.normal).data('index', {
                index: index,
                type: 'area'
            }).append(manager._root);
            that.proxy = new AreaProxy(that, attributes);
            that.locate()
        }
        Area.prototype = {
            constructor: Area,
            dispose: function() {
                var that = this;
                that.proxy._dispose();
                that._manager = that._element = that.proxy = null;
                return that
            },
            locate: function() {
                this._element.applySettings({d: this._manager._projection.getAreaCoordinates(this._coords)});
                return this
            },
            setHovered: function(state) {
                var that = this;
                that.hovered = !!state;
                if (!that.selected)
                    that._element.applySettings(that._styles[that.hovered ? 'hovered' : 'normal'])[that.hovered ? 'toForeground' : 'toBackground']();
                return that
            },
            setSelected: function(state) {
                var that = this;
                that.selected = !!state;
                if (that.selected)
                    that._element.applySettings(that._styles.selected).toForeground();
                else
                    that.setHovered(that.hovered);
                return that
            }
        };
        AreasManager.prototype._areaType = Area;
        function AreaProxy(area, attributes) {
            var that = this;
            that.type = 'area';
            that.attribute = function(name) {
                return name !== undefined ? attributes[name] : _extend({}, attributes)
            };
            that.selected = function(state, _noEvent) {
                if (state !== undefined) {
                    if (area.selected !== !!state)
                        area._manager.selectItem(area._index, !!state, _noEvent);
                    return this
                }
                else
                    return area.selected
            };
            that._dispose = function() {
                area = attributes = that.attribute = that.selected = that._dispose = null
            }
        }
        DX.viz.map._tests.AreasManager = AreasManager;
        DX.viz.map._tests.Area = Area;
        DX.viz.map.Map.prototype._factory.createAreasManager = function(parameters) {
            return new AreasManager(parameters)
        }
    })(DevExpress, jQuery);
    /*! Module viz-vectormap, file markersManager.js */
    (function(DX, $, undefined) {
        var _Number = Number,
            _String = String,
            _isFinite = isFinite,
            _round = Math.round,
            _max = Math.max,
            _min = Math.min,
            _extend = $.extend,
            _isArray = DX.utils.isArray,
            _processCircleSettings = DX.viz.renderers.processCircleSettings;
        var CLASS_DEFAULT = 'dxm-marker',
            CLASS_HOVERED = 'dxm-marker dxm-marker-hovered',
            CLASS_SELECTED = 'dxm-marker dxm-marker-selected',
            TRACKER_SETTINGS = {
                stroke: 'none',
                strokeWidth: 0,
                fill: '#000000',
                opacity: 0.0001
            };
        var DEFAULT_MARKER_TYPE = 'dot',
            MARKER_TYPES = {};
        var MarkersManager = DX.viz.map.Map.prototype._factory.MapItemsManager.inherit({
                _rootClass: 'dxm-markers',
                _trackerCategory: 'markers',
                ctor: function() {
                    var that = this;
                    that.callBase.apply(that, arguments);
                    that._filter = that._renderer.createFilter('shadow').applySettings({
                        x: '-40%',
                        y: '-40%',
                        width: '180%',
                        height: '200%',
                        color: '#000000',
                        opacity: 0.2,
                        dx: 0,
                        dy: 1,
                        blur: 1
                    }).append()
                },
                dispose: function() {
                    this._filter.dispose();
                    this._filter = null;
                    return this.callBase.apply(this, arguments)
                },
                clean: function() {
                    var that = this;
                    that._commonSettings = null;
                    return that.callBase.apply(that, arguments)
                },
                render: function(options) {
                    var that = this;
                    that._commonSettings = that._themeManager.getCommonMarkerSettings(options);
                    that._commonType = parseMarkerType(options && options.type);
                    return that.callBase.apply(that, arguments)
                },
                _arrangeBubbles: function() {
                    var markers = this._items,
                        bubbles = [],
                        i,
                        ii = markers.length,
                        marker,
                        values = [];
                    for (i = 0; i < ii; ++i) {
                        marker = markers[i];
                        if (marker.type === 'bubble') {
                            bubbles.push(marker);
                            if (marker.value !== null)
                                values.push(marker.value)
                        }
                    }
                    var minValue = _min.apply(null, values),
                        maxValue = _max.apply(null, values),
                        deltaValue = maxValue - minValue || 1;
                    for (i = 0, ii = bubbles.length; i < ii; ++i) {
                        marker = bubbles[i];
                        marker.setSize(marker.value !== null ? (marker.value - minValue) / deltaValue : 0)
                    }
                },
                _createItem: function(dataItem, state) {
                    dataItem = dataItem || {};
                    var that = this,
                        style = _extend(dataItem.style || {}, that._customizeCallback ? that._customizeCallback.call(dataItem, dataItem) : null),
                        type = parseMarkerType(dataItem.type, that._commonType);
                    style = that._themeManager.getMarkerSettings(that._commonSettings, style, type);
                    dataItem = _extend({}, dataItem, {text: dataItem.text || style.text});
                    var marker = new MARKER_TYPES[type](that, state.index, dataItem, style);
                    state.selected = dataItem.isSelected || style.isSelected;
                    return marker
                },
                _arrangeItems: function() {
                    this._arrangeBubbles()
                },
                addMarker: function(dataItem) {
                    var that = this,
                        index = that._items.length,
                        marker = that._createItem(dataItem, index);
                    that._items.push(marker);
                    if (marker._selected)
                        that.selectItem(index, true, true);
                    that._arrangeItems();
                    return that
                }
            });
        var BaseMarker = DX.Class.inherit({
                ctor: function(manager, index, dataItem, style) {
                    var that = this;
                    that._manager = manager;
                    that._index = index;
                    that._data = {
                        index: index,
                        type: 'marker'
                    };
                    that._coords = that._manager._projection.projectPoint(dataItem.coordinates);
                    that._root = manager._renderer.createGroup({'class': CLASS_DEFAULT}).append(manager._root);
                    that.hovered = that.selected = false;
                    that._create(dataItem, style);
                    that._createText(dataItem, style);
                    that.locate();
                    that.proxy = new MarkerProxy(that, dataItem.coordinates || [], dataItem.attributes || {})
                },
                _create: null,
                _createText: function(dataItem, style) {
                    var that = this;
                    if (!dataItem.text)
                        return;
                    var rootbox = that._root.getBBox(),
                        text = that._manager._renderer.createText(dataItem.text, 0, 0, {
                            align: 'center',
                            font: style.font
                        }).append(that._root),
                        textBox = text.getBBox(),
                        x = _round(-textBox.x + rootbox.width / 2) + 2,
                        y = _round(-textBox.y - textBox.height / 2) - 1;
                    text.applySettings({
                        x: x,
                        y: y
                    });
                    that._manager._renderer.createRect(x + textBox.x - 1, y + textBox.y - 1, textBox.width + 2, textBox.height + 2, 0, TRACKER_SETTINGS).data('index', that._data).append(that._root)
                },
                dispose: function() {
                    var that = this;
                    that._root.detach();
                    that._destroy();
                    that._destroyText();
                    that.proxy._dispose();
                    that._manager = that._root = that._styles = that.proxy = null;
                    return that
                },
                _destroy: null,
                _destroyText: function(){},
                locate: function() {
                    var coords = this._manager._projection.getPointCoordinates(this._coords);
                    this._root.applySettings({
                        translateX: coords.x,
                        translateY: coords.y
                    });
                    return this
                },
                _setDefaultState: null,
                _setHoveredState: null,
                _setSelectedState: null,
                setHovered: function(state) {
                    var that = this;
                    that.hovered = !!state;
                    that.hovered && that._root.toForeground();
                    if (!that.selected)
                        if (that.hovered) {
                            that._root.applySettings({'class': CLASS_HOVERED});
                            that._setHoveredState()
                        }
                        else {
                            that._root.applySettings({'class': CLASS_DEFAULT});
                            that._setDefaultState()
                        }
                    return that
                },
                setSelected: function(state) {
                    var that = this;
                    that.selected = !!state;
                    if (that.selected) {
                        that._root.applySettings({'class': CLASS_SELECTED});
                        that._setSelectedState()
                    }
                    else
                        that.setHovered(that.hovered);
                    return that
                }
            });
        var DotMarker = BaseMarker.inherit({
                type: 'dot',
                _create: function(_, style) {
                    var that = this,
                        size = style.size > 0 ? _Number(style.size) : 0,
                        hoveredSize = size,
                        selectedSize = size + (style.selectedStep > 0 ? _Number(style.selectedStep) : 0),
                        hoveredBackSize = hoveredSize + (style.backStep > 0 ? _Number(style.backStep) : 0),
                        selectedBackSize = selectedSize + (style.backStep > 0 ? _Number(style.backStep) : 0),
                        settings = _processCircleSettings(0, 0, size, style.borderWidth);
                    that._dotDefault = {
                        cx: settings.cx,
                        cy: settings.cy,
                        r: settings.r,
                        stroke: style.borderColor,
                        strokeWidth: style.borderWidth,
                        fill: style.color,
                        filter: style.shadow ? that._manager._filter.ref : null
                    };
                    that._dotHovered = {
                        cx: settings.cx,
                        cy: settings.cy,
                        r: hoveredSize / 2,
                        stroke: style.hoveredBorderColor,
                        strokeWidth: style.hoveredBorderWidth,
                        fill: style.hoveredColor
                    };
                    that._dotSelected = {
                        cx: settings.cx,
                        cy: settings.cy,
                        r: selectedSize / 2,
                        stroke: style.selectedBorderColor,
                        strokeWidth: style.selectedBorderWidth,
                        fill: style.selectedColor
                    };
                    that._backDefault = {
                        cx: settings.cx,
                        cy: settings.cy,
                        r: settings.r,
                        stroke: 'none',
                        strokeWidth: 0,
                        fill: style.backColor,
                        opacity: style.backOpacity
                    };
                    that._backHovered = {
                        cx: settings.cx,
                        cy: settings.cy,
                        r: hoveredBackSize / 2,
                        stroke: 'none',
                        strokeWidth: 0,
                        fill: style.backColor,
                        opacity: style.backOpacity
                    };
                    that._backSelected = {
                        cx: settings.cx,
                        cy: settings.cy,
                        r: selectedBackSize / 2,
                        stroke: 'none',
                        strokeWidth: 0,
                        fill: style.backColor,
                        opacity: style.backOpacity
                    };
                    that._back = that._manager._renderer.createCircle().applySettings(that._backDefault).data('index', that._data).append(that._root);
                    that._dot = that._manager._renderer.createCircle().applySettings(that._dotDefault).data('index', that._data).append(that._root)
                },
                _destroy: function() {
                    this._back = this._dot = null
                },
                _setDefaultState: function() {
                    this._back.applySettings(this._backDefault);
                    this._dot.applySettings(this._dotDefault)
                },
                _setHoveredState: function() {
                    this._back.applySettings(this._backHovered);
                    this._dot.applySettings(this._dotHovered)
                },
                _setSelectedState: function() {
                    this._back.applySettings(this._backSelected);
                    this._dot.applySettings(this._dotSelected)
                }
            });
        var BubbleMarker = BaseMarker.inherit({
                type: 'bubble',
                _create: function(dataItem, style) {
                    var that = this;
                    that._minSize = style.minSize > 0 ? _Number(style.minSize) : 0;
                    that._maxSize = style.maxSize > that._minSize ? _Number(style.maxSize) : that._minSize;
                    that.value = _isFinite(dataItem.value) ? _Number(dataItem.value) : null;
                    that._default = {
                        stroke: style.borderColor,
                        strokeWidth: style.borderWidth,
                        fill: style.color,
                        opacity: style.opacity
                    };
                    that._hovered = {
                        stroke: style.hoveredBorderColor,
                        strokeWidth: style.hoveredBorderWidth,
                        fill: style.hoveredColor,
                        opacity: style.hoveredOpacity
                    };
                    that._selected = {
                        stroke: style.selectedBorderColor,
                        strokeWidth: style.selectedBorderWidth,
                        fill: style.selectedColor,
                        opacity: style.selectedOpacity
                    };
                    that._bubble = that._manager._renderer.createCircle(0, 0, style.maxSize / 2).applySettings(that._default).data('index', that._data).append(that._root)
                },
                _destroy: function() {
                    this._bubble = null
                },
                _setDefaultState: function() {
                    this._bubble.applySettings(this._default)
                },
                _setHoveredState: function() {
                    this._bubble.applySettings(this._hovered)
                },
                _setSelectedState: function() {
                    this._bubble.applySettings(this._selected)
                },
                setSize: function(ratio) {
                    var that = this,
                        settings = _processCircleSettings(0, 0, that._minSize + ratio * (that._maxSize - that._minSize), that._default.strokeWidth);
                    that._default.cx = that._hovered.cx = that._selected.cx = settings.cx;
                    that._default.cy = that._hovered.cy = that._selected.cy = settings.cy;
                    that._default.r = that._hovered.r = that._selected.r = settings.r;
                    that._bubble.applySettings(settings);
                    return that
                }
            });
        var PieMarker = BaseMarker.inherit({
                type: 'pie',
                _create: function(dataItem, style) {
                    var that = this,
                        settings = _processCircleSettings(0, 0, style.size > 0 ? _Number(style.size) : 0, style.borderWidth);
                    that._pieDefault = {opacity: style.opacity};
                    that._pieHovered = {opacity: style.hoveredOpacity};
                    that._pieSelected = {opacity: style.selectedOpacity};
                    that._borderDefault = {
                        stroke: style.borderColor,
                        strokeWidth: style.borderWidth
                    };
                    that._borderHovered = {
                        stroke: style.hoveredBorderColor,
                        strokeWidth: style.hoveredBorderWidth
                    };
                    that._borderSelected = {
                        stroke: style.selectedBorderColor,
                        strokeWidth: style.selectedBorderWidth
                    };
                    var renderer = that._manager._renderer,
                        i = 0,
                        ii = _isArray(dataItem.values) ? dataItem.values.length : 0,
                        values = [],
                        value,
                        sum = 0;
                    for (; i < ii; ++i) {
                        value = _Number(dataItem.values[i]);
                        if (_isFinite(value)) {
                            values.push(value);
                            sum += value
                        }
                    }
                    that._pie = renderer.createGroup(that._pieDefault);
                    var translator = new DX.viz.core.Translator1D(0, sum, 90, 450),
                        startAngle = translator.translate(0),
                        endAngle,
                        colors = that._manager._themeManager.getMarkerColors(values.length);
                    for (value = 0, i = 0, ii = values.length; i < ii; ++i) {
                        value += values[i];
                        endAngle = translator.translate(value);
                        renderer.createArc(settings.cx, settings.cy, settings.r, 0, startAngle, endAngle, {fill: colors[i]}).data('index', that._data).append(that._pie);
                        startAngle = endAngle
                    }
                    that._pie.append(that._root);
                    that._border = renderer.createCircle(settings.cx, settings.cy, settings.r, that._borderDefault).data('index', that._data).append(that._root)
                },
                _destroy: function() {
                    this._pie = this._border = null
                },
                _setDefaultState: function() {
                    this._pie.applySettings(this._pieDefault);
                    this._border.applySettings(this._borderDefault)
                },
                _setHoveredState: function() {
                    this._pie.applySettings(this._pieHovered);
                    this._border.applySettings(this._borderHovered)
                },
                _setSelectedState: function() {
                    this._pie.applySettings(this._pieSelected);
                    this._border.applySettings(this._borderSelected)
                }
            });
        var ImageMarker = BaseMarker.inherit({
                type: 'image',
                _create: function(dataItem, style) {
                    var that = this,
                        size = style.size > 0 ? _Number(style.size) : 0,
                        hoveredSize = size + (style.hoveredStep > 0 ? _Number(style.hoveredStep) : 0),
                        selectedSize = size + (style.selectedStep > 0 ? _Number(style.selectedStep) : 0);
                    that._default = {
                        x: -size / 2,
                        y: -size / 2,
                        width: size,
                        height: size
                    };
                    that._hovered = {
                        x: -hoveredSize / 2,
                        y: -hoveredSize / 2,
                        width: hoveredSize,
                        height: hoveredSize
                    };
                    that._selected = {
                        x: -selectedSize / 2,
                        y: -selectedSize / 2,
                        width: selectedSize,
                        height: selectedSize
                    };
                    that._image = that._manager._renderer.createImage().applySettings(that._default).applySettings({
                        href: dataItem.url,
                        location: 'center'
                    }).append(that._root);
                    that._tracker = that._manager._renderer.createRect().applySettings(that._default).applySettings(TRACKER_SETTINGS).data('index', that._data).append(that._root)
                },
                _destroy: function() {
                    this._image = this._tracker = null
                },
                _setDefaultState: function() {
                    this._image.applySettings(this._default);
                    this._tracker.applySettings(this._default)
                },
                _setHoveredState: function() {
                    this._image.applySettings(this._hovered);
                    this._tracker.applySettings(this._hovered)
                },
                _setSelectedState: function() {
                    this._image.applySettings(this._selected);
                    this._tracker.applySettings(this._selected)
                }
            });
        MARKER_TYPES['dot'] = DotMarker;
        MARKER_TYPES['bubble'] = BubbleMarker;
        MARKER_TYPES['pie'] = PieMarker;
        MARKER_TYPES['image'] = ImageMarker;
        function parseMarkerType(type, defaultType) {
            return MARKER_TYPES[type] && type || defaultType || DEFAULT_MARKER_TYPE
        }
        function MarkerProxy(marker, coordinates, attributes) {
            var that = this;
            that.type = 'marker';
            that.attribute = function(name) {
                return name !== undefined ? attributes[name] : _extend({}, attributes)
            };
            that.coordinates = function() {
                return [_Number(coordinates[0]), _Number(coordinates[1])]
            };
            that.selected = function(state, _noEvent) {
                if (state !== undefined) {
                    if (marker.selected !== !!state)
                        marker._manager.selectItem(marker._index, !!state, _noEvent);
                    return this
                }
                else
                    return marker.selected
            };
            that._dispose = function() {
                marker = attributes = that.attribute = that.selected = that._dispose = null
            }
        }
        var __originalDefaultMarkerType = DEFAULT_MARKER_TYPE,
            __originalMarkerTypes = $.extend({}, MARKER_TYPES);
        DX.viz.map._tests.stubMarkerTypes = function(markerTypes, defaultMarkerType) {
            DEFAULT_MARKER_TYPE = defaultMarkerType;
            MARKER_TYPES = markerTypes
        };
        DX.viz.map._tests.restoreMarkerTypes = function() {
            DEFAULT_MARKER_TYPE = __originalDefaultMarkerType;
            MARKER_TYPES = __originalMarkerTypes
        };
        DX.viz.map._tests.MarkersManager = MarkersManager;
        DX.viz.map._tests.BaseMarker = BaseMarker;
        DX.viz.map._tests.DotMarker = DotMarker;
        DX.viz.map._tests.BubbleMarker = BubbleMarker;
        DX.viz.map._tests.PieMarker = PieMarker;
        DX.viz.map._tests.ImageMarker = ImageMarker;
        DX.viz.map.Map.prototype._factory.createMarkersManager = function(parameters) {
            return new MarkersManager(parameters)
        }
    })(DevExpress, jQuery);
    DevExpress.MOD_VIZ_VECTORMAP = true
}