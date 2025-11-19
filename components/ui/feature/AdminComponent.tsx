import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { BackButton, LinkButton } from "./AdminButtons";

const AdminComponent = (props: ComponentProps<"div">) => {
  return <div {...props} className={twMerge("container", props?.className)} />;
};

const Title = (props: ComponentProps<"h1">) => (
  <h1 {...props} className={twMerge("bold", props?.className)} />
);

AdminComponent.Title = Title;

AdminComponent.Back = BackButton;
AdminComponent.Link = LinkButton;

const List = ({
  data,
  Component,
  emptyMessage,
  ...props
}: ComponentProps<"ul"> & {
  data?: any[];
  Component: (props: ListItemProps) => ReactNode;
  emptyMessage?: string;
}) => (
  <ul {...props} className={twMerge("grid gap-2", props?.className)}>
    {data &&
      (data.length > 0 ? (
        data?.map((item, index) => (
          <Component key={index} index={index} item={item} />
        ))
      ) : (
        <h1>{emptyMessage ?? "Nothing in the array"}</h1>
      ))}
    {props?.children}
  </ul>
);

AdminComponent.List = List;

export default AdminComponent;
