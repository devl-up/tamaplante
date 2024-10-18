import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  CatalogTagsQueriesGetTagsDto,
  usePutApiV1Tags,
} from "../../../api/types";
import { z } from "zod";
import { Button, Flex, Modal, TextInput } from "@mantine/core";
import { handleProblemDetailsError } from "../../../utils/error-utils.ts";

interface EditTagProps {
  readonly tag: CatalogTagsQueriesGetTagsDto;
  readonly opened: boolean;
  readonly onClose: () => void;
  readonly onSave: () => void;
}

const schema = z.object({
  name: z.string().min(1).max(20),
});

type Schema = z.infer<typeof schema>;

const EditTag = ({ tag, opened, onClose, onSave }: EditTagProps) => {
  const form = useForm<Schema>({
    mode: "uncontrolled",
    initialValues: {
      name: tag.name,
    },
    validate: zodResolver(schema),
  });

  const { mutateAsync } = usePutApiV1Tags({
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
        id: tag.id,
      },
    });
  });

  return (
    <Modal opened={opened} onClose={onClose} title={"Edit Tag"}>
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
            <Button type="submit">Save</Button>
            <Button type="button" variant="default" onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditTag;
