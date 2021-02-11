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
  Caption,
  Scrollable,
  Button,
  Form,
} from "@shopify/polaris";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import DashboardLayout from "../../components/layout-dashboard";
import Product from "../../server/models/product";

interface IFormInputs {
  name: string;
  price: number;
}

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  price: yup.number().required(),
});

const products = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {
    alert(data.name + " " + data.price);
  };

  const [selectedItems /*, setSelectedItems*/] = useState<string[]>([]);

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

  const promotedBulkActions = [
    {
      content: "Delete",
      onAction: () => console.log("Todo: implement bulk delete"),
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
                    items={items}
                    renderItem={renderItem}
                    selectedItems={selectedItems}
                    //onSelectionChange={(value) => setSelectedItems()}
                    promotedBulkActions={promotedBulkActions}
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

export default products;
