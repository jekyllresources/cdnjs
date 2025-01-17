"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var globals_1 = require("../globals");
var ops_1 = require("../ops/ops");
var optimizer_1 = require("./optimizer");
var AdadeltaOptimizer = (function (_super) {
    __extends(AdadeltaOptimizer, _super);
    function AdadeltaOptimizer(learningRate, rho, epsilon) {
        if (epsilon === void 0) { epsilon = 1e-8; }
        var _this = _super.call(this) || this;
        _this.accumulatedGrads = {};
        _this.accumulatedUpdates = {};
        _this.c = globals_1.keep(ops_1.scalar(-learningRate));
        _this.epsilon = globals_1.keep(ops_1.scalar(epsilon));
        _this.rho = globals_1.keep(ops_1.scalar(rho));
        _this.oneMinusRho = globals_1.keep(ops_1.scalar(1 - rho));
        return _this;
    }
    AdadeltaOptimizer.prototype.applyGradients = function (variableGradients) {
        var _this = this;
        var _loop_1 = function (variableName) {
            var value = environment_1.ENV.engine.registeredVariables[variableName];
            if (this_1.accumulatedGrads[variableName] == null) {
                var trainable_1 = false;
                globals_1.tidy(function () {
                    _this.accumulatedGrads[variableName] =
                        ops_1.zerosLike(value).variable(trainable_1);
                });
            }
            if (this_1.accumulatedUpdates[variableName] == null) {
                var trainable_2 = false;
                globals_1.tidy(function () {
                    _this.accumulatedUpdates[variableName] =
                        ops_1.zerosLike(value).variable(trainable_2);
                });
            }
            var gradient = variableGradients[variableName];
            var accumulatedGrad = this_1.accumulatedGrads[variableName];
            var accumulatedUpdate = this_1.accumulatedUpdates[variableName];
            globals_1.tidy(function () {
                var newAccumulatedGrad = _this.rho.mul(accumulatedGrad)
                    .add(_this.oneMinusRho.mul(gradient.square()));
                var updates = accumulatedUpdate.add(_this.epsilon)
                    .sqrt()
                    .div(accumulatedGrad.add(_this.epsilon).sqrt())
                    .mul(gradient);
                var newAccumulatedUpdate = _this.rho.mul(accumulatedUpdate)
                    .add(_this.oneMinusRho.mul(updates.square()));
                _this.accumulatedGrads[variableName].assign(newAccumulatedGrad);
                _this.accumulatedUpdates[variableName].assign(newAccumulatedUpdate);
                var newValue = _this.c.mul(updates).add(value);
                value.assign(newValue);
            });
        };
        var this_1 = this;
        for (var variableName in variableGradients) {
            _loop_1(variableName);
        }
    };
    AdadeltaOptimizer.prototype.dispose = function () {
        var _this = this;
        this.c.dispose();
        this.epsilon.dispose();
        this.rho.dispose();
        this.oneMinusRho.dispose();
        if (this.accumulatedUpdates != null) {
            Object.keys(this.accumulatedUpdates)
                .forEach(function (name) { return _this.accumulatedUpdates[name].dispose(); });
            Object.keys(this.accumulatedGrads)
                .forEach(function (name) { return _this.accumulatedGrads[name].dispose(); });
        }
    };
    return AdadeltaOptimizer;
}(optimizer_1.Optimizer));
exports.AdadeltaOptimizer = AdadeltaOptimizer;
