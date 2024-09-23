import { IPropertyBase } from './IPropertyBase';

export class Property implements IPropertyBase {
  id!: number;
  name!: string;
  propertyType!: string;
  price!: number;
  fType!: string;
  bhk!: number;
  builtArea!: number;
  city!: string;
  readyToMove!: boolean;
  image?: string;
  security!: number;
  maintenance!: number;
  carpetArea!: number;
  floor!: number;
  totalFloor!: number;
  address!: string;
  landmark!: string;
  possessionDate!: Date | null;
  ageOfProperty!: number;
  gatedCommunity!: number; // 0 or 1
  propertyTypeId!: number;
  furnishingTypeId!: number;
  furnishingType!: string;
  address2?: string;
  CityId!: number;
  floorNo?: string;
  totalFloors?: string;
  age?: string;
  mainEntrance?: string;
  gated?: boolean;
  estPossessionOn?: string;
  photo?: string;
  description?: string;
  postedOn!: string;
  PostedBy!: string;
}
