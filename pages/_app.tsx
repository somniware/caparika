import Link from "next/link";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/dist/styles.css";
import configureAuthStore from "../hooks-store/auth-store";
import type { AppProps } from "next/app";

configureAuthStore();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

  const CustomLinkComponent = ({
    children,
    url = "",
    external,
    ...rest
  }: {
    children?: React.ReactNode;
    url: string;
    external?: boolean | undefined;
    [x: string]: any;
  }) => {
    if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={url}>
        <a {...rest}>{children}</a>
      </Link>
    );
  };

  return (
    <AppProvider i18n={enTranslations} linkComponent={CustomLinkComponent}>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default App;
