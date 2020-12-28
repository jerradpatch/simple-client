"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MConfig = /** @class */ (function () {
    function MConfig(env) {
        if (env.BASE_API_URL)
            this.baseAPiUrl = env.BASE_API_URL;
        else
            throw new Error('BASE_API_URL must be defined');
    }
    return MConfig;
}());
exports.MConfig = MConfig;
//# sourceMappingURL=MConfig.js.map