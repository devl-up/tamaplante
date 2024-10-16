import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { usePostApiV1Products } from "../../../api/types";
import { z } from "zod";
import { Button, Flex, Modal, NumberInput, TextInput } from "@mantine/core";
import { handleProblemDetailsError } from "../../../utils/error-utils.ts";

interface AddProductProps {
  readonly opened: boolean;
  readonly onClose: () => void;
  readonly onSave: () => void;
}

const schema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  price: z.number().gte(0),
});

type Schema = z.infer<typeof schema>;

const AddProduct = ({ opened, onClose, onSave }: AddProductProps) => {
  const form = useForm<Schema>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      price: 0,
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

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({
      data: {
        ...values,
        id: crypto.randomUUID(),
      },
    });
  });

  return (
    <Modal opened={opened} onClose={onClose} title={"Add Product"}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" align="flex-start" gap="sm">
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

export default AddProduct;
