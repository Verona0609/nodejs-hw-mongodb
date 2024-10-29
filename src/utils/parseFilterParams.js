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
  const parsedType = typeof type === "string" ? type : undefined;

  const parsedIsFavourite = parseValue(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
}
