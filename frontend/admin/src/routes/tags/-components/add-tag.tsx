import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { usePostApiV1Tags } from "../../../api/types";
import { z } from "zod";
import { Button, Flex, Modal, TextInput } from "@mantine/core";
import { handleProblemDetailsError } from "../../../utils/error-utils.ts";

interface AddTagProps {
  readonly opened: boolean;
  readonly onClose: () => void;
  readonly onSave: () => void;
}

const schema = z.object({
  name: z.string().min(1).max(20),
});

type Schema = z.infer<typeof schema>;

const AddTag = ({ opened, onClose, onSave }: AddTagProps) => {
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
    <Modal opened={opened} onClose={onClose} title={"Add Tag"}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" align="flex-start" gap="sm">
          <TextInput
            {...form.getInputProps("name")}
            key={form.key("name")}
            label="Name"
            withAsterisk
            placeholder="Choose a name"
          />
          <Flex gap="xs" justify="flex-end">
            <Button type="submit">Add</Button>
            <Button type="button" variant="default" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddTag;
