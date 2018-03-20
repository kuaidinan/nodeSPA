'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const wechat_1 = require("./wechat");
const participant_1 = require("./participant");
exports.default = (app) => {
    app.use('/api/participant', participant_1.default);
    app.use('/api/wechat', wechat_1.default);
};
//# sourceMappingURL=index.js.map