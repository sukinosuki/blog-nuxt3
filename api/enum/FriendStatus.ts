export enum FriendStatus {
  DISABLED = 0,
  NORMAL = 1,
  ILLEGAL = 2,
  OUT_OF_CONTACT = 3,
}

export const friendStatus: Record<FriendStatus | number, string> = {
  [FriendStatus.DISABLED]: '禁止',
  [FriendStatus.NORMAL]: '正常',
  [FriendStatus.ILLEGAL]: '不合规',
  [FriendStatus.OUT_OF_CONTACT]: '已失联',
}

export const friendStatusOptions: LabelValue<number>[] = Object.entries(friendStatus).map(([k, v]) => ({
  label: v,
  value: Number(k),
}))
