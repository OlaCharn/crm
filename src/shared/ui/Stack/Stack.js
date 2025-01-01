import { getStyles } from "../../lib/getStyles";
import styles from "./Stack.module.scss";

export const Stack = ({
  as: Component = "div", // any tag
  children,
  className,
  justify = "justifyCenter", //center, Between, end
  align = "alignCenter", //center, end
  direction = "row", //column, row, rowRevers
  max,
  gap, //8, 16, 24, 32, 54
  style,
}) => {
  const mapGap = {
    8: "gap8",
    16: "gap16",
    24: "gap24",
    32: "gap32",
    54: "gap54",
    104: "gap104",
  };

  const mode = {
    [styles.max]: max,
  };

  const additional = [
    className,
    styles[justify],
    styles[align],
    styles[direction],
    gap && styles[mapGap[gap]],
  ];


  return (
    <Component
      className={getStyles(styles.flex, mode, additional)}
      style={style}
    >
      {children}
    </Component>
  );
};
