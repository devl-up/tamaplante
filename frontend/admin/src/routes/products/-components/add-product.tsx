import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  getGetApiV1ProductsQueryKey,
  usePostApiV1Products,
} from "../../../api/types";
import { z } from "zod";
import { Button, Flex, NumberInput, TextInput } from "@mantine/core";
import { handleProblemDetailsError } from "../../../utils/error-utils.ts";
import { useQueryClient } from "@tanstack/react-query";

interface AddProductProps {
  readonly pageIndex: number;
  readonly pageSize: number;
}

const schema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  price: z.number().gte(0),
});

type Schema = z.infer<typeof schema>;

const AddProduct = ({ pageIndex, pageSize }: AddProductProps) => {
  const queryClient = useQueryClient();

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
      onSuccess: async () => {
        form.reset();
        await queryClient.refetchQueries({
          queryKey: getGetApiV1ProductsQueryKey({ pageIndex, pageSize }),
        });
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
        <Button type="submit">Add</Button>
      </Flex>
    </form>
  );
};

export default AddProduct;
