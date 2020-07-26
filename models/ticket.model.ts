export class Ticket {
    constructor(
      public id: number, 
      public ticket: string,
      public attended: boolean,
      public desk?: number 
      ) {}
  }