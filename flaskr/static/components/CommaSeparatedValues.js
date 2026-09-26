import { CommaSeparatedValue } from "./CommaSeparatedValue.js";
import { Div } from "./Div.js";
import { Label } from "./Label.js";
import { NestedSortableDiv } from "./NestedSortableDiv.js";


export function CommaSeparatedValues(...values) {
  const result = Div(
    Label('Comma Separated Values'),
    NestedSortableDiv(...values.map(CommaSeparatedValue))
  );
  result.classList.add('entries');
  return result;
}
