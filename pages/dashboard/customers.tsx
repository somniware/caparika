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
import { Customer } from "@prisma/client";

const Customers: React.FC = () => {
  const [state] = useStore();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (state as { token: string }).token,
        },
      });

      if (result.status === 200) {
        const customers = (await result.json()) as Customer[];
        setCustomers(customers);
      }
    })();
  }, []);

  const [selectedItems, setSelectedItems] = useState<ResourceListSelectedItems>(
    []
  );

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const promotedBulkActions = [
    {
      content: "Delete",
      onAction: async () => {
        const selItems =
          selectedItems === "All"
            ? customers.map((item) => item.id.toString())
            : selectedItems;

        for (const id of selItems) {
          const result = await fetch(`/api/customers/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (state as { token: string }).token,
            },
          });

          if (result.status === 200) {
            setCustomers((customers) =>
              customers.filter((item) => item.id !== +id)
            );
          }
        }

        setSelectedItems([]);
      },
    },
  ];

  const renderItem = (item: Customer) => {
    const { id, firstName, lastName, email, gender } = item;

    return (
      <ResourceItem id={id.toString()} onClick={() => {}}>
        <h3>
          <TextStyle variation="strong">{firstName + " " + lastName}</TextStyle>
        </h3>
        <div>
          <TextStyle variation="subdued">{email + " | " + gender}</TextStyle>
        </div>
      </ResourceItem>
    );
  };

  return (
    <DashboardLayout>
      <Page fullWidth title="Customers">
        <Layout>
          <Layout.Section>
            <Card title="List" sectioned>
              <Card.Section>
                <TextStyle variation="subdued">List of all customers</TextStyle>
              </Card.Section>
              <Card.Section>
                <Scrollable>
                  <ResourceList
                    resourceName={resourceName}
                    items={customers}
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

export default Customers;
