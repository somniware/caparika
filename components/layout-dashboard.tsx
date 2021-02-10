import {
  ReactNode,
  useState,
  useCallback
} from 'react';
import {
  Frame,
  TopBar,
  IconableAction,
} from '@shopify/polaris';
import { ArrowLeftMinor } from '@shopify/polaris-icons';
import Head from 'next/head';

interface Props  { 
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );

  const userMenuActions: { items: IconableAction[] }[] = [
    { items: [{
        content: 'Logout',
        url: '/auth/logout'
      }]
    },
    { items: [{
        content: 'Back',
        url: '/',
        icon: ArrowLeftMinor,
        
      }]
    }
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

  const topBarMarkup = (
    <TopBar
      userMenu={userMenuMarkup}
    />
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="/css/main.css" />
        <meta
          name="description"
          content="Showcase application for Caparika"
        />
      </Head>
      <Frame
        topBar={topBarMarkup}
        // navigation={navigationMarkup}
      >
        {children}
      </Frame>
    </>
  );
}

export default DashboardLayout;