import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  ResourceList,
  TextStyle,
  ResourceItem,
  TextField,
  FormLayout,
  Select,
  Caption,
  Scrollable,
  Button,
  Form,
} from "@shopify/polaris";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import GeneralLayout from "../components/layout-general";
import Product from "../server/models/product";

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

const home = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    alert(
      data.firstName +
        " " +
        data.lastName +
        " " +
        data.email +
        " " +
        data.gender
    );
  };

  const [selectedItems /*, setSelectedItems*/] = useState([]);

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const items: Product[] = [
    {
      id: 101,
      name: "Mae Jemison",
      price: 0.99,
    },
    {
      id: 201,
      // url: 'customers/256',
      name: "Ellen Ochoa",
      price: 9.99,
    },
  ];

  const renderItem = (item: Product) => {
    const { id, name, price } = item;

    return (
      <ResourceItem id={id.toString()} url="https://google.com">
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{price}</div>
      </ResourceItem>
    );
  };

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return (
    <GeneralLayout>
      <Page fullWidth title="Ordering">
        <Layout>
          <Layout.Section oneHalf>
            <Card title="Customer data" sectioned>
              <Card.Section>
                <TextStyle variation="subdued">
                  Enter your data please
                </TextStyle>
              </Card.Section>
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
                      render={({ onChange, value }) => (
                        <Select
                          label="Gender"
                          onChange={onChange}
                          options={options}
                          value={value}
                        />
                      )}
                    />
                    <Button submit>Submit</Button>
                  </FormLayout>
                </Form>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section oneHalf>
            <Card title="Products" sectioned>
              <Card.Section>
                <TextStyle variation="subdued">
                  Choose your products please
                </TextStyle>
              </Card.Section>
              <Card.Section>
                <Scrollable>
                  <ResourceList
                    resourceName={resourceName}
                    items={items}
                    renderItem={renderItem}
                    selectedItems={selectedItems}
                    // onSelectionChange={setSelectedItems}
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

export default home;
