export interface Pokemon {
  name: string;
  types: TypeSlot[];
  stats: StatSlot[];
}

export interface TypeSlot {
  slot: number;
  type: TypePokemon;
}

export interface TypePokemon {
  name: string;
  url: string;
}

export interface StatSlot {
  base_stat: number;
  effort: number;
  stat: StatDetail;
}

export interface StatDetail {
  name: string;
  url: string;
}