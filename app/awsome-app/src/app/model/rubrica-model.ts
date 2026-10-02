export enum AttributeType {
  puntuable,
  booleano,
  informativo
}


export interface Category {
  id: string;
  description: string;
}

export interface Dimension {
  id: string;
  name: string;
  numOfCriteria: number;
  weight: number;
}

export interface Attribute {
  id: string;
  name: string;
  question: string;
  type: AttributeType;
  weight?: number;
  mandatory: boolean;
  /** La nota no se asigna a mano, la calcula la app (la de coste). */
  calculated?: boolean;
  values?: AttributeValue[];
}

export interface AttributeValue {
  value: number;
  description: string;
}