export enum FriendStatus {
  DISABLED = 0,
  NORMAL = 1,
  ILLEGAL = 2,
  OUT_OF_CONTACT = 3,
}

export const friendStatus: Record<FriendStatus | number, string> = {
  [FriendStatus.DISABLED]: 'DISABLED',
  [FriendStatus.NORMAL]: 'NORMAL',
  [FriendStatus.ILLEGAL]: 'ILLEGAL',
  [FriendStatus.OUT_OF_CONTACT]: 'OUT OF CONTACT',
}

export const friendStatusOptions: LabelValue<number>[] = Object.entries(friendStatus).map(([k, v]) => ({
  label: v,
  value: Number(k),
}))
