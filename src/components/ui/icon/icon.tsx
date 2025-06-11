import {
  createElement,
  CSSProperties,
  FC,
  memo,
  MouseEventHandler,
} from "react";

import allIcons from "@components/ui/icon/allIcons.ts";
import { IconName } from "@components/ui/icon/types.ts";

interface IProps {
  id?: string;
  className?: string;
  name: IconName;
  size?: number;
  style?: CSSProperties;
  onClick?: MouseEventHandler<SVGElement>;
  onMouseOver?: MouseEventHandler<SVGElement>;
  onMouseOut?: MouseEventHandler<SVGElement>;
}

export const Icon: FC<IProps> = memo(
  ({
    id,
    name,
    size = 24,
    className = "",
    onClick,
    onMouseOut,
    onMouseOver,
    style,
  }) => {
    if (!allIcons[name]) return;
    return createElement(allIcons[name], {
      id,
      height: size,
      width: size,
      className,
      style,
      onClick,
      onMouseOut,
      onMouseOver,
    });
  },
);
