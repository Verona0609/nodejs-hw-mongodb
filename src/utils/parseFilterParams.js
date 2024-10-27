function parseValue(value) {
  if (typeof value !== "string") {
    return undefined;
  }

  if (value.toLowerCase() === "true") {
    return true;
  }
  if (value.toLowerCase() === "false") {
    return false;
  }

  return undefined;
}

export function parseFilterParams(query) {
  const { type, isFavourite } = query;

  console.log("Type parameter:", type);
  const parsedType = parseValue(type);
  const parsedIsFavourite = parseValue(isFavourite);
  console.log("Parsed Type:", parsedType);
  console.log("Parsed isFavourite:", parsedIsFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
}
