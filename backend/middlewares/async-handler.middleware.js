export const asyncHandler = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    if (process.env.NODE_ENV === "development")
      return console.log(
        `Error from ${controller.name} at ${
          (error.stack || "").split("\n", 2)[1]
        } ` + error.message
      );

    next(error);
  }
};
