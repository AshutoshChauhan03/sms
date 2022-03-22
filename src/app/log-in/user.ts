export class User {
  constructor(
    public id: string | null = null,
    public password: string | null = null,
    public adminStatus: boolean = false,
  ) {}
}
