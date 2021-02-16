import {CSSProperties} from "@material-ui/styles";

export const nonDraggable: CSSProperties = {
  '-moz-user-drag': 'none',
  '-webkit-user-drag': 'none',
  '-khtml-user-drag': 'none',
  '-o-user-drag': 'none',
  'user-drag': 'none',
};

export const nonSelectable: CSSProperties = {
  '-moz-user-select': 'none',
  '-webkit-user-select': 'none',
  '-khtml-user-select': 'none',
  '-o-user-select': 'none',
  'user-select': 'none',
};