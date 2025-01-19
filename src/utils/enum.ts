export enum Entity {
  Event = "event",
  Visitor = "visitor",
  ActivityLogs = "activityLogs",
}

export enum ActivityLogsType {
  JoinUser = "join-user",
  MusicAdd = "music-add",
  MusicVote = "music-vote",
}

export enum EmitType {
  NewActivity = "new-activity",
}
