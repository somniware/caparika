import { Page, EmptyState, Layout, Card } from "@shopify/polaris";
import Head from "next/head";

import GeneralLayout from "../components/layout-general";

const Success: React.FC = () => {
  return (
    <>
      <Head>
        <title>Successful ordering</title>
      </Head>
      <GeneralLayout>
        <Page>
          <Layout>
            <Layout.Section>
              <Card>
                <Card.Section>
                  <EmptyState
                    heading="The order has been successfully created!"
                    image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                  ></EmptyState>
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </GeneralLayout>
    </>
  );
};

export default Success;
