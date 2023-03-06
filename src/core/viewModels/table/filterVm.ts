type OperatorType =
  | "Equal"
  | "NotEqual"
  | "LessThan"
  | "LessThanEqual"
  | "GreaterThan"
  | "GreaterThanEqual"
  | "StartsWith"
  | "EndsWith"
  | "Contains"
  | "DoesNotContains";

type LogicType = "And" | "Or";

export class FilterVm {
  constructor(obj?: Partial<FilterVm>) {
    Object.assign(this, obj);
  }

  field: string = "";
  operator: OperatorType = "Equal";
  value!: string;
  // value: Record<string, unknown> = {};
  logic: LogicType = "And";
  filters!: Array<FilterVm>;
}
