"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileResolver = void 0;
var rxjs_1 = require("rxjs");
var UserProfileResolver = /** @class */ (function () {
    function UserProfileResolver(dataService) {
        this.dataService = dataService;
    }
    UserProfileResolver.prototype.resolve = function (route, state) {
        var userId = route.params['id'];
        var user = {};
        this.dataService.getUser(userId).subscribe(function (resp) {
            user = resp.data[0];
        });
        return rxjs_1.of(user);
    };
    return UserProfileResolver;
}());
exports.UserProfileResolver = UserProfileResolver;
//# sourceMappingURL=user-profile.resolver.js.map