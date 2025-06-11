import creditCardType from 'credit-card-type';
import {ICardDto} from "@/data-contracts.ts";

export const formatCardByPan = (pan: string) => {
  if (!pan || pan?.length == 0) return "";
  const cardInfo = creditCardType(pan);
  return `На карту ${cardInfo[0]?.niceType} ${pan}`;
};

export const formatCard = (card: ICardDto) => {
  const cardInfo = creditCardType(card?.pan);

  const exp =
    card?.expDate.substring(0, 2) + "/" + card?.expDate.substring(2);
  return `${cardInfo[0]?.niceType ?? ''} ${card?.pan}`;
};
