import { Coord } from './coord.model';

export class City {
  constructor(
    public id: number,
    public name: string,
    public state: string,
    public country: string,
    public coord: Coord
  ) {}
}
