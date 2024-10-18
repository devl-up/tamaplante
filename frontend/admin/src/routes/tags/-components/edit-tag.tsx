import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  CatalogTagsQueriesGetTagsDto,
  usePutApiV1Tags,
} from "../../../api/types";
import { z } from "zod";
import { Button, Flex, TextInput } from "@mantine/core";
import { handleProblemDetailsError } from "../../../utils/error-utils.ts";
import { useEffect } from "react";

interface EditTagProps {
  readonly tag?: CatalogTagsQueriesGetTagsDto;
  readonly onClose: () => void;
  readonly onSave: () => void;
}

const schema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(20),
});

type Schema = z.infer<typeof schema>;

const EditTag = ({ tag, onClose, onSave }: EditTagProps) => {
  const { setValues, ...form } = useForm<Schema>({
    mode: "uncontrolled",
    initialValues: {
      id: "",
      name: "",
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
      },
    });
  });

  useEffect(() => {
    if (tag) {
      setValues({ ...tag });
    }
  }, [setValues, tag]);

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
          <Button type="submit">Save</Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default EditTag;
