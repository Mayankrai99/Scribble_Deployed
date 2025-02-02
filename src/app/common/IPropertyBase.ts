export interface IPropertyBase {
  id: number;
  name: string;
  propertyType: string;
  price: number;
  fType: string;
  bhk: number;
  builtArea: number;
  city: string;
  readyToMove: boolean;
  image?: string;
  security: number;
  maintenance: number;
  carpetArea: number;
  floor: number;
  totalFloor: number;
  address: string;
  landmark: string;
  possessionDate: Date | null;
  ageOfProperty: number;
  gatedCommunity: number; // 0 or 1
}

export interface IArticleBase {
  id: number;
  name: string;

  dateOfPublish?: Date;

  authorId?: number | undefined;
  author?: any;
  
}
