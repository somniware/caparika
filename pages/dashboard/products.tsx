import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  Card,
  ResourceList,
  TextStyle,
  ResourceItem,
  TextField,
  ResourceListSelectedItems,
  FormLayout,
  Caption,
  Scrollable,
  Button,
  Form,
} from "@shopify/polaris";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DashboardLayout from "../../components/layout-dashboard";
import { useStore } from "../../hooks-store/store";
import { Product } from "@prisma/client";

interface IFormInputs {
  name: string;
  price: number;
}

const schema = yup.object().shape({
  name: yup.string().trim().required("Name is required."),
  price: yup.number().required("Price is required."),
});

const Products: React.FC = () => {
  const { control, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [state] = useStore();

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        const products = (await result.json()) as Product[];
        setProducts(products);
      }
    })();
  }, []);

  const onSubmit = async (data: IFormInputs) => {
    try {
      const result = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (state as { token: string }).token,
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
        }),
      });

      if (result.status === 422) {
        throw new Error("Validation failed.");
      }
      if (result.status !== 201) {
        throw new Error("Creating a product failed!");
      }

      reset();
      const resultData = await result.json();
      setProducts([resultData.product, ...products]);
    } catch (err) {
      //dispatch("LOGOUT");
    }
  };

  const [selectedItems, setSelectedItems] = useState<ResourceListSelectedItems>(
    []
  );

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const promotedBulkActions = [
    {
      content: "Delete",
      onAction: async () => {
        const selItems =
          selectedItems === "All"
            ? products.map((item) => item.id.toString())
            : selectedItems;

        for (const id of selItems) {
          const result = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (state as { token: string }).token,
            },
          });

          if (result.status === 200) {
            setProducts(products.filter((item) => item.id !== +id));
          }
        }

        setSelectedItems([]);
      },
    },
  ];

  const renderItem = (item: Product) => {
    const { id, name, price } = item;

    return (
      <ResourceItem id={id.toString()} onClick={() => {}}>
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>
          <TextStyle variation="subdued">{price}</TextStyle>
        </div>
      </ResourceItem>
    );
  };

  return (
    <DashboardLayout>
      <Page fullWidth title="Products">
        <Layout>
          <Layout.Section>
            <Card title="New" sectioned>
              <Card.Section>
                <TextStyle variation="subdued">
                  Enter product data please
                </TextStyle>
              </Card.Section>
              <Card.Section>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormLayout>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          type="text"
                          label="Name"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <Caption>{errors.name?.message}</Caption>

                    <Controller
                      name="price"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          type="text"
                          label="Price"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <Caption>{errors.price?.message}</Caption>

                    <Button submit>Submit</Button>
                  </FormLayout>
                </Form>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card title="List" sectioned>
              <Card.Section>
                <TextStyle variation="subdued">List of all products</TextStyle>
              </Card.Section>
              <Card.Section>
                <Scrollable>
                  <ResourceList
                    resourceName={resourceName}
                    items={products}
                    renderItem={renderItem}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    promotedBulkActions={promotedBulkActions}
                    idForItem={(item) => item.id.toString()}
                    selectable
                  />
                </Scrollable>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </DashboardLayout>
  );
};

export default Products;
