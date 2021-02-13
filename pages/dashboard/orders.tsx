import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  ResourceList,
  TextStyle,
  ResourceItem,
  Scrollable,
} from "@shopify/polaris";

import DashboardLayout from "../../components/layout-dashboard";
import Product from "../../server/models/product";

const Orders: React.FC = () => {
  const [selectedItems /*, setSelectedItems*/] = useState<string[]>([]);

  const resourceName = {
    singular: "customer",
    plural: "customers",
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
      <Page fullWidth title="Orders">
        <Layout>
          <Layout.Section>
            <Card title="List" sectioned>
              <Card.Section>
                <TextStyle variation="subdued">List of all orders</TextStyle>
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

export default Orders;
