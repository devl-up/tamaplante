import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  useGetApiV1ProductsId,
  useGetApiV1Tags,
  usePutApiV1Products,
} from "../../../api/types";
import { z } from "zod";
import {
  Button,
  Flex,
  MultiSelect,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { handleProblemDetailsError } from "../../../utils/error-utils.ts";
import { useEffect } from "react";
import { sortAlphabetically } from "../../../utils/sort-utils.ts";

interface EditProductProps {
  readonly id?: string;
  readonly onClose: () => void;
  readonly onSave: () => void;
}

const schema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  price: z.number().gte(0),
  tagIds: z.array(z.string().uuid()),
});

type Schema = z.infer<typeof schema>;

const EditProduct = ({ id, onClose, onSave }: EditProductProps) => {
  const { setValues, ...form } = useForm<Schema>({
    mode: "uncontrolled",
    initialValues: {
      id: "",
      name: "",
      price: 0,
      description: "",
      tagIds: [],
    },
    validate: zodResolver(schema),
  });

  const { mutateAsync } = usePutApiV1Products({
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

  const getProductQuery = useGetApiV1ProductsId(id ?? "", {
    query: { enabled: !!id },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({
      data: {
        ...values,
      },
    });
  });

  useEffect(() => {
    if (getProductQuery.data) {
      setValues({
        id: getProductQuery.data.id,
        name: getProductQuery.data.name,
        price: getProductQuery.data.price,
        description: getProductQuery.data.description,
        tagIds: getProductQuery.data.tags
          .sort(sortAlphabetically((x) => x.name))
          .map((t) => t.id),
      });
    }
  }, [setValues, getProductQuery.data]);

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
          <Button type="submit">Save</Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default EditProduct;
