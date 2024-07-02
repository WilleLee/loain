export interface MainCharacter {
  name: string;
  image: string;
  level: number;
  className: string;
  expeditionLevel: number;
  title: string;
  guildName: string;
  stats: { type: string; value: string }[];
  serverName: string;
  itemAvgLevel: number;
  equipment: { type: string; name: string; grade: string; icon: string }[];
  engraving: { name: string; description: string; icon: string }[];
  card: {
    cards: {
      awakeCount: number;
      awakeTotal: number;
      name: string;
      grade: string;
      icon: string;
      slot: number;
    }[];
    effects: {
      cardSlots: number[];
      index: number;
      items: { name: string; description: string }[];
    }[];
  };
  gems: {
    grade: string;
    icon: string;
    level: number;
    name: string;
    slot: number;
  }[];
}

export interface LostarkNotice {
  title: string;
  link: string;
  type: string;
  date: string;
}

export interface LoainNotice {
  title: string;
  noticeId: string;
  date: string;
}
