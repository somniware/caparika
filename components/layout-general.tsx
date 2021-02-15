import { ReactNode, useState, useCallback } from "react";
import { Frame, TopBar, IconableAction } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import Head from "next/head";

interface Props {
  children: ReactNode;
}

const GeneralLayout: React.FC<Props> = ({ children }) => {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const userMenuActions: { items: IconableAction[] }[] = [
    {
      items: [
        {
          content: "Login",
          url: "/auth/login",
        },
      ],
    },
    {
      items: [
        {
          content: "Signup",
          url: "/auth/signup",
        },
      ],
    },
    {
      items: [
        {
          content: "Back to ordering",
          url: "/",
          icon: ArrowLeftMinor,
        },
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Dashboard"
      initials="USR"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const topBarMarkup = <TopBar userMenu={userMenuMarkup} />;

  return (
    <>
      <Head>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Showcase application for Caparika" />
      </Head>
      <Frame topBar={topBarMarkup}>{children}</Frame>
    </>
  );
};

export default GeneralLayout;
