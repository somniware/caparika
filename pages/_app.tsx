import React from 'react';
import Link from 'next/link';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/dist/styles.css';

interface Props {
    Component: React.FC<any>;
    pageProps: any[];
}

const App = ({ Component, pageProps } : Props) => {
  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

  const CustomLinkComponent = ({children, url = '', external, ...rest}:
                               {children?: React.ReactNode, url: string, external?: boolean | undefined }) => {
    if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
      return (
        <a href={url}
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={url}>
        <a {...rest}>
          {children}
        </a>
      </Link>
    );
  };

  return (
      <AppProvider
        i18n={enTranslations}
        linkComponent={CustomLinkComponent}
      >
        <Component {...pageProps} />
      </AppProvider>
    );
}

export default App;