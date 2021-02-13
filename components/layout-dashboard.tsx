import { ReactNode, useState, useCallback, Redirect } from "react";
import { Frame, TopBar, IconableAction, Navigation } from "@shopify/polaris";
import {
  OrdersMajor,
  ProductsMajor,
  CustomersMajor,
} from "@shopify/polaris-icons";
import Head from "next/head";
import Router from "next/router";

import { useStore } from "../hooks-store/store";

interface Props {
  children: ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const [state, dispatch] = useStore();

  if (!(state as { isAuth: boolean }).isAuth) {
    Router.push("/");
  }

  const userMenuActions: { items: IconableAction[] }[] = [
    {
      items: [
        {
          content: "Logout",
          onAction: () => {
            dispatch("LOGOUT");
            Router.push("/");
          },
        },
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Dashboard"
      initials="U"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: "/dashboard/products",
            label: "Products",
            icon: ProductsMajor,
          },
          {
            url: "/dashboard/orders",
            label: "Orders",
            icon: OrdersMajor,
            // badge: '15',
          },
          {
            url: "/dashboard/customers",
            label: "Customers",
            icon: CustomersMajor,
          },
        ]}
      />
    </Navigation>
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Showcase application for Caparika" />
      </Head>
      <Frame topBar={topBarMarkup} navigation={navigationMarkup}>
        {children}
      </Frame>
    </>
  );
};

export default DashboardLayout;
