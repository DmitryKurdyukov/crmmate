import {
    deleteItem,
    searchResource,
    submitFormAction,
  } from "./_actions/nextadmin";
  import { options } from "./_options";
  import schema from "prisma/json-schema/json-schema.json";
  import { NextAdmin } from "@premieroctet/next-admin";
  import { getPropsFromParams } from "@premieroctet/next-admin/dist/appRouter";
  import { Metadata, Viewport } from "next";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
  
  export const viewport: Viewport = {
    initialScale: 1,
    width: "device-width",
  };
  
  export const metadata: Metadata = {
    icons: "/assets/logo.svg",
  };
  
  export default async function AdminPage({
    params,
    searchParams,
  }: {
    params: { [key: string]: string[] | string };
    searchParams: { [key: string]: string | string[] | undefined } | undefined;
  }) {
    const session = await getServerAuthSession();

     
    if (!session) {
        redirect('/')
    }

    const props = await getPropsFromParams({
      params: params.nextadmin as string[],
      searchParams,
      options,
      prisma: db,
      schema,
      action: submitFormAction,
      deleteAction: deleteItem,
    //   getMessages: () =>
    //     getMessages({ locale: params.locale as string }).then(
    //       (messages) => messages.admin as Record<string, string>
    //     ),
      locale: params.locale as string,
      searchPaginatedResourceAction: searchResource,
    });
    
  
    return (
      <NextAdmin
        {...props}
        locale={params.locale as string}
        user={{
          data: session.user,
          logoutUrl: "/",
        }}
      />
    );
  }