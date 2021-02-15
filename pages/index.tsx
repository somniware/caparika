import { useState, useEffect } from "react";
import {
  Page,
  Layout,
  Card,
  ResourceList,
  TextStyle,
  TextField,
  FormLayout,
  ResourceListSelectedItems,
  Select,
  Caption,
  Scrollable,
  Button,
  Form,
} from "@shopify/polaris";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dynamic from "next/dynamic";
const DynamicResourceItem = dynamic(
  () => import("../components/dynamic-resource-item"),
  { ssr: false }
);

import GeneralLayout from "../components/layout-general";
import { Product } from "@prisma/client";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

const schema = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  gender: yup.string().required(),
});

const Home: React.FC = () => {
  const { control, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [products, setProducts] = useState<Product[]>([]);

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
      const result = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          gender: data.gender,
          productIds:
            selectedItems === "All"
              ? products.map((item) => item.id.toString())
              : selectedItems,
        }),
      });

      if (result.status === 422) {
        throw new Error("Validation failed.");
      }
      if (result.status !== 200) {
        throw new Error("Creating an order failed!");
      }

      const resultData = await result.json();
      console.log("pre");
      reset();
      console.log("posle");
      setSelectedItems([]);
      console.log(resultData.message);
    } catch (err) {
      // dispatch("LOGOUT");
    }
  };

  const [
    selectedItems,
    setSelectedItems,
  ] = useState<ResourceListSelectedItems>();

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const renderItem = (item: Product) => {
    const { id, name, price } = item;

    // const toggleItem = (id: string) => {
    // if (selectedItems?.includes(id)){
    //   setSelectedItems(selectedItems.);
    //   return;
    // }

    // setSelectedItems(selectedItems?.concat(id));
    //     };

    return (
      <DynamicResourceItem id={id.toString()} onClick={() => {}}>
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{price}</div>
      </DynamicResourceItem>
    );
  };

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return (
    <GeneralLayout>
      <Page fullWidth title="Order form">
        <Layout>
          <Layout.Section>
            <Card title="Make your order" sectioned>
              <Card.Section>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <FormLayout>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          type="text"
                          label="First Name"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <Caption>{errors.firstName?.message}</Caption>

                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          type="text"
                          label="Last Name"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <Caption>{errors.lastName?.message}</Caption>

                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          type="email"
                          label="Email"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <Caption>{errors.email?.message}</Caption>

                    <Controller
                      name="gender"
                      control={control}
                      //options={options}
                      defaultValue="male"
                      render={({ onChange, value }) => (
                        <Select
                          label="Gender"
                          onChange={onChange}
                          options={options}
                          value={value}
                        />
                      )}
                    />
                    <Button submit fullWidth>
                      Submit
                    </Button>
                  </FormLayout>
                </Form>
              </Card.Section>
              <Card.Section>
                <Scrollable>
                  <ResourceList
                    resourceName={resourceName}
                    items={products}
                    renderItem={renderItem}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    idForItem={(item) => item.id.toString()}
                    selectable
                  />
                </Scrollable>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </GeneralLayout>
  );
};

export default Home;
