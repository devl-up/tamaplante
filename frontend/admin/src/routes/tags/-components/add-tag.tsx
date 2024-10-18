import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { usePostApiV1Tags } from "../../../api/types";
import { z } from "zod";
import { Button, Flex, TextInput } from "@mantine/core";
import { handleProblemDetailsError } from "../../../utils/error-utils.ts";

interface AddTagProps {
  readonly onClose: () => void;
  readonly onSave: () => void;
}

const schema = z.object({
  name: z.string().min(1).max(20),
});

type Schema = z.infer<typeof schema>;

const AddTag = ({ onClose, onSave }: AddTagProps) => {
  const form = useForm<Schema>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: zodResolver(schema),
  });

  const { mutateAsync } = usePostApiV1Tags({
    mutation: {
      onError: handleProblemDetailsError,
      onSuccess: () => {
        form.reset();
        onSave();
        onClose();
      },
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({
      data: {
        ...values,
        id: crypto.randomUUID(),
      },
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" align="stretch" gap="sm">
        <TextInput
          {...form.getInputProps("name")}
          key={form.key("name")}
          label="Name"
          withAsterisk
          placeholder="Choose a name"
        />
        <Flex gap="xs" justify="flex-end">
          <Button type="button" variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default AddTag;
