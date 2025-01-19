"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitType = exports.ActivityLogsType = exports.Entity = void 0;
var Entity;
(function (Entity) {
    Entity["Event"] = "event";
    Entity["Visitor"] = "visitor";
    Entity["ActivityLogs"] = "activityLogs";
})(Entity || (exports.Entity = Entity = {}));
var ActivityLogsType;
(function (ActivityLogsType) {
    ActivityLogsType["JoinUser"] = "join-user";
    ActivityLogsType["MusicAdd"] = "music-add";
    ActivityLogsType["MusicVote"] = "music-vote";
})(ActivityLogsType || (exports.ActivityLogsType = ActivityLogsType = {}));
var EmitType;
(function (EmitType) {
    EmitType["NewActivity"] = "new-activity";
})(EmitType || (exports.EmitType = EmitType = {}));
