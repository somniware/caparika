import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  Card,
  ResourceList,
  TextStyle,
  ResourceItem,
  Scrollable,
  ResourceListSelectedItems,
} from "@shopify/polaris";

import DashboardLayout from "../../components/layout-dashboard";
import { useStore } from "../../hooks-store/store";
import { Order } from "@prisma/client";

const Orders: React.FC = () => {
  const [state] = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedItems, setSelectedItems] = useState<ResourceListSelectedItems>(
    []
  );

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (state as { token: string }).token,
        },
      });

      if (result.status === 200) {
        const orders = (await result.json()) as Order[];
        setOrders(orders);
      }
    })();
  }, []);

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const promotedBulkActions = [
    {
      content: "Delete",
      onAction: async () => {
        const selItems =
          selectedItems === "All"
            ? orders.map((item) => item.id.toString())
            : selectedItems;

        for (const id of selItems) {
          const result = await fetch(`/api/orders/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (state as { token: string }).token,
            },
          });

          if (result.status === 200) {
            setOrders(orders.filter((item) => item.id !== +id));
          }
        }

        setSelectedItems([]);
      },
    },
  ];

  const renderItem = (item: Order) => {
    const { id, creatorId } = item;

    return (
      <ResourceItem id={id.toString()} onClick={() => {}}>
        <h3>
          <TextStyle variation="strong">{creatorId}</TextStyle>
        </h3>
        <div>
          <TextStyle variation="subdued">{creatorId}</TextStyle>
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
                    items={orders}
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

export default Orders;
