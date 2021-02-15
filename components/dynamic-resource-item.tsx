import { ReactNode } from "react";
import { ResourceItem } from "@shopify/polaris";

interface Props {
  children: ReactNode;
  id: string;
  onClick: (id?: string) => void;
}

const DynamicResourceItem: React.FC<Props> = ({ children, id, onClick }) => (
  <ResourceItem id={id} onClick={onClick}>
    {children}
  </ResourceItem>
);

export default DynamicResourceItem;
