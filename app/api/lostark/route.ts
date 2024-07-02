import { errors } from "@/constants/errors";
import { fetcher } from "@libs/server/fetcher";
import { MainCharacter } from "@libs/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const CHARACTER_NAME = "슭틔";
    const LOA_TOKEN = process.env.TEST_LOA_TOKEN as string;

    const charactersReq = fetcher<LostarkCharacter[]>(
      "GET",
      `https://developer-lostark.game.onstove.com/characters/${CHARACTER_NAME}/siblings`,
      {
        headers: {
          Authorization: `Bearer ${LOA_TOKEN}`,
          Accept: "application/json",
        },
      },
    );

    const armoriesReq = fetcher<LostarkArmory>(
      "GET",
      `https://developer-lostark.game.onstove.com/armories/characters/${CHARACTER_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${LOA_TOKEN}`,
          Accept: "application/json",
        },
      },
    );

    const [
      { isSuccessful: charSuccess, data: charData },
      { isSuccessful: armSuccess, data: armData },
    ] = await Promise.all([charactersReq, armoriesReq]);

    if (!charSuccess || !charData || !armSuccess || !armData) {
      return NextResponse.json(
        {
          error: {
            message: "333",
            code: "333",
          },
        },
        { status: 500 },
      );
    }

    const characterNames = charData.map((char) => char.CharacterName);
    const mainCharacter: MainCharacter = {
      name: armData.ArmoryProfile.CharacterName,
      image: armData.ArmoryProfile.CharacterImage,
      level: armData.ArmoryProfile.CharacterLevel,
      className: armData.ArmoryProfile.CharacterClassName,
      expeditionLevel: armData.ArmoryProfile.ExpeditionLevel,
      title: armData.ArmoryProfile.Title,
      guildName: armData.ArmoryProfile.GuildName,
      stats: armData.ArmoryProfile.Stats.map((s) => ({
        type: s.Type,
        value: s.Value,
      })),
      serverName: armData.ArmoryProfile.ServerName,
      itemAvgLevel: armData.ArmoryProfile.ItemAvgLevel,
      equipment: armData.ArmoryEquipment.map((e) => ({
        type: e.Type,
        name: e.Name,
        grade: e.Grade,
        icon: e.Icon,
      })),
      engraving: armData.ArmoryEngraving.Effects.map((e) => ({
        name: e.Name,
        description: e.Description,
        icon: e.Icon,
      })),
      card: {
        cards: armData.ArmoryCard.Cards.map((c) => ({
          awakeCount: c.AwakeCount,
          awakeTotal: c.AwakeTotal,
          name: c.Name,
          grade: c.Grade,
          icon: c.Icon,
          slot: c.Slot,
        })),
        effects: armData.ArmoryCard.Effects.map((e) => ({
          cardSlots: e.CardSlots,
          index: e.Index,
          items: e.Items.map((i) => ({
            name: i.Name,
            description: i.Description,
          })),
        })),
      },
      gems: armData.ArmoryGem.Gems.map((g) => ({
        grade: g.Grade,
        icon: g.Icon,
        level: g.Level,
        name: g.Name,
        slot: g.Slot,
      })),
    };

    return NextResponse.json(
      {
        characters: characterNames,
        mainCharacter,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          message: errors.COMMON.SERVER.message,
          code: errors.COMMON.SERVER.code,
        },
      },
      {
        status: errors.COMMON.SERVER.status,
      },
    );
  }
}

type LostarkCharacter = {
  CharacterClassName: string;
  CharacterLevel: number;
  CharacterName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
  ServerName: string;
};

type LostarkArmoryCard = {
  Cards: LostarkCard[];
  Effects: LostarkEffect[];
};

type LostarkEffect = {
  CardSlots: number[];
  Index: number;
  Items: {
    Name: string;
    Description: string;
  }[];
};

type LostarkCard = {
  AwakeCount: number;
  AwakeTotal: number;
  Grade: string;
  Icon: string;
  Name: string;
  Slot: number;
  Tooltip: string;
};

type LostarkArmoryProfile = {
  CharacterImage: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ExpeditionLevel: number;
  Title: string;
  GuildName: string;
  Stats: { Type: string; Value: string }[];
  ServerName: string;
  ItemAvgLevel: number;
};

type LostarkArmoryEquipment = {
  Type: string;
  Name: string;
  Grade: string;
  Icon: string;
}[];

type LostarkArmoryEngraving = {
  Effects: { Name: string; Description: string; Icon: string }[];
};

type LostarkArmoryGem = {
  Gems: {
    Grade: string;
    Icon: string;
    Level: number;
    Name: string;
    Slot: number;
  }[];
};

type LostarkArmory = {
  ArmoryProfile: LostarkArmoryProfile;
  ArmoryEquipment: LostarkArmoryEquipment;
  ArmoryEngraving: LostarkArmoryEngraving;
  ArmoryCard: LostarkArmoryCard;
  ArmoryGem: LostarkArmoryGem;
};
