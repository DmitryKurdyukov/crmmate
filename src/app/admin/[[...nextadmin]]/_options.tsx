import { NextAdminOptions } from "@premieroctet/next-admin";
import DatePicker from "~/app/_components/date-picker";

export const options: NextAdminOptions = {
    basePath: "/admin",
    title: "⚡️ Sketch",
    model: {
        User: {
            toString: (user) => `${user.name} (${user.email})`,
            permissions: ["edit", "delete", "create"],
            title: "Users",
            icon: "UsersIcon",
            aliases: {
                id: "ID",
                name: "Full name",
            },
            list: {
                // exports: {
                //     format: "CSV",
                //     url: "/api/users/export",
                // },
                display: ["name"],
                search: ["name"],
                filters: [
                    //   {
                    //     name: "is Admin",
                    //     active: false,
                    //     value: {
                    //       role: {
                    //         equals: "ADMIN",
                    //       },
                    //     },
                    //   },
                ],
            },
            edit: {
                display: [
                    "name",
                    "password"
                    //   {
                    //     title: "Email is mandatory",
                    //     id: "email-notice",
                    //     description: "You must add an email from now on",
                    //   } as const,
                    //   "posts",
                ],
                styles: {
                    _form: "grid-cols-3 gap-4 md:grid-cols-4",
                    id: "col-span-2 row-start-1",
                    name: "col-span-2 row-start-1",
                    "email-notice": "col-span-4 row-start-3",
                    email: "col-span-4 md:col-span-2 row-start-4",
                    posts: "col-span-4 md:col-span-2 row-start-5",
                    role: "col-span-4 md:col-span-2 row-start-6",
                    birthDate: "col-span-3 row-start-7",
                    avatar: "col-span-4 row-start-8",
                    metadata: "col-span-4 row-start-9",
                },
                fields: {
                    name: {
                        required: true,
                    },
                    password: {
                        required: true,
                    },

                    //   email: {
                    //     validate: (email) => email.includes("@") || "form.user.email.error",
                    //     helperText: "Must be a valid email address",
                    //     tooltip: "Make sure to include the @",
                    //   },
                    //   birthDate: {
                    //     input: <DatePicker />,
                    //   },
                    //   avatar: {
                    //     format: "file",
                    //     handler: {
                    //       /*
                    //        * Include your own upload handler here,
                    //        * for example you can upload the file to an S3 bucket.
                    //        * Make sure to return a string.
                    //        */
                    //       upload: async (buffer, infos) => {
                    //         return "https://www.gravatar.com/avatar/00000000000000000000000000000000";
                    //       },
                    //     },
                    //   },
                    //   metadata: {
                    //     format: "json",
                    //     validate: (value) => {
                    //       try {
                    //         if (!value) {
                    //           return true;
                    //         }
                    //         JSON.parse(value as string);
                    //         return true;
                    //       } catch {
                    //         return "Invalid JSON";
                    //       }
                    //     },
                    //   },
                },
            },
            //   actions: [
            //     {
            //       title: "actions.user.email.title",
            //       action: async (...args) => {
            //         "use server";
            //         const { submitEmail } = await import("./actions/nextadmin");
            //         await submitEmail(...args);
            //       },
            //       successMessage: "actions.user.email.success",
            //       errorMessage: "actions.user.email.error",
            //     },
            //   ],
        },
        Report: {
            toString: (report) => `${report.countryId} ${report.leads} ${report.ftd}`,
            title: "Reports",
            icon: "NewspaperIcon",
            permissions: ["edit", "delete", "create"],
            list: {
                exports: [
                    { format: "CSV", url: "/api/reports/export?format=csv" },
                    { format: "JSON", url: "/api/reports/export?format=json" },
                ],
                display: ["country", "funnel", "leads", "nbt", "ftd", "created_at", "sended_date", "isNetwork"],
                search: ["title", "content"],
                fields: {
                    country: {
                        formatter: (country) => {
                            return <strong>{country.name}</strong>;
                        },
                    },
                    funnel: {
                        formatter: (funnel) => {
                            return <strong>{funnel.name}</strong>;
                        },
                    },
                    isNetwork: {
                        formatter: (value: boolean) => {
                            return value ? "Yes" : "No";
                        },
                    },
                    created_at: {
                        formatter: (date, context) => {
                            return new Date(date as unknown as string)
                                ?.toLocaleString(context?.locale)
                                .split(/[\s,]+/)[0];
                        },
                    },
                    sended_date: {
                        formatter: (date, context) => {
                            return new Date(date as unknown as string)
                                ?.toLocaleString(context?.locale)
                                .split(/[\s,]+/)[0];
                        },
                    },
                },
            },
            edit: {
                fields: {
                    created_at: {
                        input: <DatePicker />,
                    },
                    sended_date: {
                        input: <DatePicker />,
                    },
                    country: {
                        relationOptionFormatter: (country) => {
                            return `${country.name} ${country.code}`;
                        },
                        display: "list",
                        // orderField: "order",
                        relationshipSearchField: "category",
                    },
                    funnel: {
                        relationOptionFormatter: (funnel) => {
                            return `${funnel.name}`;
                        },
                        display: "list",
                        // orderField: "order",
                        relationshipSearchField: "category",
                    },
                },
                display: [
                    "id",
                    "country",
                    "leads",
                    "ftd",
                    "nbt",
                    "invalid",
                    "created_at", 
                    "sended_date",
                    "isNetwork",
                    "funnel"
                ],
            },
        },
        Country: {
          title: "Countries",
          icon: "InboxStackIcon",
          toString: (country) => `${country.name}`,
          list: {
            display: ["name", "code"],
          },
          edit: {
            display: ["name", "code"],
          },
        },
        Funnel: {
            title: "Funnels",
            icon: "InboxStackIcon",
            toString: (funnel) => `${funnel.name}`,
            list: {
              display: ["name"],
            },
            edit: {
              display: ["name"],
            },
          },
  
    },
    pages: {
        // "/custom": {
        //   title: "Custom page",
        //   icon: "PresentationChartBarIcon",
        // },
    },
    // sidebar: {
    //     groups: [
    //         {
    //             title: "Users",
    //             models: ["user"],
    //         },
    //         {
    //             title: "Reports",
    //             models: ["report"],
    //         },
    //     ],
    // },
    externalLinks: [
        {
            label: "Documentation",
            url: "https://next-admin.js.org",
        },
    ],
    defaultColorScheme: "dark",
};