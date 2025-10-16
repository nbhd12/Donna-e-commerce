export interface Category {
  id?: number;
  name: string;
  description?: string;
  image?: string;
}

export default class CategoryModel {
  id?: number;
  name: string;
  description?: string;
  image?: string;

  constructor(
    name: string,
    description?: string,
    image?: string,
    id?: number
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.id = id;
  }

  static fromRow = (row: Category): CategoryModel => {
    return new CategoryModel(
      row.name,
      row.description,
      row.image,
      row.id
    );
  };

  serialize = (): Record<string, string | number | undefined> => {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
    };
  };

  getId = (): number | undefined => this.id;
  getName = (): string => this.name;
  getDescription = (): string | undefined => this.description;
  getImage = (): string | undefined => this.image;
}