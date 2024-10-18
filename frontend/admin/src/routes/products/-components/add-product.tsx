import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useGetApiV1Tags, usePostApiV1Products } from "../../../api/types";
import { z } from "zod";
import {
  Button,
  Flex,
  MultiSelect,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { handleProblemDetailsError } from "../../../utils/error-utils.ts";

interface AddProductProps {
  readonly onClose: () => void;
  readonly onSave: () => void;
}

const schema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  price: z.number().gte(0),
  tagIds: z.array(z.string().uuid()),
});

type Schema = z.infer<typeof schema>;

const AddProduct = ({ onClose, onSave }: AddProductProps) => {
  const form = useForm<Schema>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      price: 0,
      tagIds: [],
    },
    validate: zodResolver(schema),
  });

  const { mutateAsync } = usePostApiV1Products({
    mutation: {
      onError: handleProblemDetailsError,
      onSuccess: () => {
        form.reset();
        onSave();
        onClose();
      },
    },
  });

  const tagsQuery = useGetApiV1Tags();

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
        <TextInput
          {...form.getInputProps("description")}
          key={form.key("description")}
          label="Description"
          withAsterisk
          placeholder="Choose a description"
        />
        <NumberInput
          {...form.getInputProps("price")}
          key={form.key("price")}
          label="Price"
          withAsterisk
          placeholder="Choose a price"
          decimalScale={2}
          min={0}
        />
        <MultiSelect
          {...form.getInputProps("tagIds")}
          key={form.key("tagIds")}
          data={
            tagsQuery.data?.tags.map((t) => ({
              value: t.id,
              label: t.name,
            })) ?? []
          }
          label="Tags"
          placeholder="Choose some tags"
          searchable
          clearable
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

export default AddProduct;
