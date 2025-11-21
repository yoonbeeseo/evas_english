import { ComponentProps, Fragment, ReactNode } from "react";
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
  withLine,
  href,
  ...props
}: ComponentProps<"ul"> & {
  data?: any[];
  Component: (props: ListItemProps) => ReactNode;
  emptyMessage?: string;
  withLine?: boolean;
  href?: string;
}) => (
  <ul
    {...props}
    className={twMerge("grid gap-2", withLine && "gap-0", props?.className)}
  >
    {!data || data.length === 0 ? (
      <AdminComponent.Link href={href ?? "modal/lesson"}>
        {emptyMessage ?? "Nothing in the array"}
      </AdminComponent.Link>
    ) : (
      data?.map((item, index) =>
        withLine ? (
          <Fragment key={index}>
            <Component index={index} item={item} />
            {index < data.length - 1 && <div className="line" />}
          </Fragment>
        ) : (
          <Component key={index} index={index} item={item} />
        )
      )
    )}
    {props?.children}
  </ul>
);

AdminComponent.List = List;

export default AdminComponent;
