import createHttpErrors from "http-errors";

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false }); //повернння всіх помилок одразу
    console.log({ result });

    if (typeof result.error !== "undefined") {
      return next(
        createHttpErrors(
          400,
          result.error.details.map((err) => err.message).join(", ")
        )
      );
    }

    next();
  };
}
