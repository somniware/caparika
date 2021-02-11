import { Page, EmptyState, Layout, Card } from "@shopify/polaris";

import DashboardLayout from "../../components/layout-dashboard";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <EmptyState
                  heading="Welcome to Dashboard!"
                  action={{
                    content: "Learn more",
                    url: "https://help.shopify.com",
                  }}
                  image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                ></EmptyState>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </DashboardLayout>
  );
};

export default Dashboard;
