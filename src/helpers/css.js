import {StyleSheet, css} from 'aphrodite';

export const getClassNamesFromStyles = (styles) => {
  const stylesheet = StyleSheet.create(styles);
  const classNames = {};

  Object.keys(styles).map(selector => {
    classNames[selector] = css(stylesheet[selector])
  });

  return classNames;
}
