class Signal {
  constructor(
    public type: number,
    public note: number,
    public velocity: number
  ) {}
}

export type { Signal };
export default Signal;
