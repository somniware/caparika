import { ReactNode } from "react";
import { ResourceItem } from "@shopify/polaris";

interface Props {
  children: ReactNode;
  id: string;
  url: string;
}

const DynamicResourceItem: React.FC<Props> = ({ children, id, url }) => (
  <ResourceItem id={id} url={url}>
    {children}
  </ResourceItem>
);

export default DynamicResourceItem;
