'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const participant_1 = require("./participant");
const wechat_1 = require("./wechat");
const auth_1 = require("../controller/wechat/auth");
exports.default = (app) => {
    app.use('/auth', auth_1.default);
    app.use('/api/participant', participant_1.default);
    app.use('/api/wechat', wechat_1.default);
};
//# sourceMappingURL=index.js.map