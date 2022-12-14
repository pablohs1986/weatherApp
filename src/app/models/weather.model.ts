export class Weather {
  constructor(
    public id: number,
    public description: string,
    public main: string,
    public icon: string,
    public temp: number,
    public tempMax: number,
    public tempMin: number,
    public feelsLike: number,
    public humidity: number,
    public pressure: number
  ) {}
}
