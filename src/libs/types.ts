

//////////////////////////////////////////////////////niveau 0

export type Tcomics = {
  count: number,
  limit: number,
  results: Tcomic[]
}

export type Tcharacters = {
  count: number, 
  limit: 100, 
  results: Tcharacter[]
}

//////////////////////////////////////////////////////niveau1

export type Tcomic = {
  _id: string, 
  title: string, 
  description: string,
  thumbnail: Tthumbnail,
  __v: number
}

export type Tcharacter = {
  _id: string, 
  name: string, 
  description: string,
  thumbnail: Tthumbnail,
  comics: string[]
  __v: number
}

//////////////////////////////////////////////////////niveau2

export type Tthumbnail = {
  path: string,
  extention: string
};


