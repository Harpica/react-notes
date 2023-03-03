import { ReactiveState } from "../utils/hooks/useReactive.hook";

export type AppDisplay = "List" | "Grid" | "Hidden";

export class AppVM {
  public appDisplay: ReactiveState<AppDisplay>;
  constructor(appDisplay: ReactiveState<AppDisplay>) {
    this.appDisplay = appDisplay;
  }
  getAllNotes() {}
}
