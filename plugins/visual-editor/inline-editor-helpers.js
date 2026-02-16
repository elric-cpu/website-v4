import * as t from "@babel/types";

export const EDITABLE_HTML_TAGS = [
  "a",
  "Button",
  "button",
  "p",
  "span",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "label",
  "Label",
  "img",
];

export const parseEditId = (editId) => {
  const parts = editId.split(":");

  if (parts.length < 3) {
    return null;
  }

  const column = parseInt(parts.at(-1), 10);
  const line = parseInt(parts.at(-2), 10);
  const filePath = parts.slice(0, -2).join(":");

  if (!filePath || Number.isNaN(line) || Number.isNaN(column)) {
    return null;
  }

  return { filePath, line, column };
};

export const checkTagNameEditable = (openingElementNode, editableTagsList) => {
  if (!openingElementNode || !openingElementNode.name) return false;
  const nameNode = openingElementNode.name;

  if (
    nameNode.type === "JSXIdentifier" &&
    editableTagsList.includes(nameNode.name)
  ) {
    return true;
  }

  if (
    nameNode.type === "JSXMemberExpression" &&
    nameNode.property &&
    nameNode.property.type === "JSXIdentifier" &&
    editableTagsList.includes(nameNode.property.name)
  ) {
    return true;
  }

  return false;
};

export const validateImageSrc = (openingNode) => {
  if (
    !openingNode ||
    !openingNode.name ||
    (openingNode.name.name !== "img" &&
      openingNode.name.property?.name !== "img")
  ) {
    return { isValid: true, reason: null };
  }

  const hasPropsSpread = openingNode.attributes.some(
    (attr) =>
      t.isJSXSpreadAttribute(attr) &&
      attr.argument &&
      t.isIdentifier(attr.argument) &&
      attr.argument.name === "props",
  );

  if (hasPropsSpread) {
    return { isValid: false, reason: "props-spread" };
  }

  const srcAttr = openingNode.attributes.find(
    (attr) => t.isJSXAttribute(attr) && attr.name && attr.name.name === "src",
  );

  if (!srcAttr) {
    return { isValid: false, reason: "missing-src" };
  }

  if (!t.isStringLiteral(srcAttr.value)) {
    return { isValid: false, reason: "dynamic-src" };
  }

  if (!srcAttr.value.value || srcAttr.value.value.trim() === "") {
    return { isValid: false, reason: "empty-src" };
  }

  return { isValid: true, reason: null };
};
