import { ProblemDetails } from "../api/types";
import { ErrorType } from "../api/mutator/custom-instance.ts";
import { notifications } from "@mantine/notifications";

export const handleProblemDetailsError = (e: ErrorType<ProblemDetails>) => {
  const error = e.response?.data;
  if (!error || error.status !== 400) return;

  notifications.show({
    color: "red",
    title: "Oops !",
    message: error.detail,
  });
};
