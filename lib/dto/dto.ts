import {z} from 'zod';


export const GoogleAccountSchema = z.object({
    name: z.string(),
    email: z.string(),
})
export const AppUserSchema = z.object(
    {
        name: z.string(),
        googleAccounts: z.array(GoogleAccountSchema)
    })

export const ServiceProviderSchema = z.object({
    displayName: z.string(),
    canAnalyzePayment: z.boolean(),
    websiteUrl: z.string().optional(),
    logoDevSuffix: z.string().optional()
})

export const SubscriptionSchema = z.object({
    serviceProvider: ServiceProviderSchema,
    registeredSince: z.coerce.date().nullish(),
    hasSubscribedNewsletterOrAd: z.boolean(),
    paidSince: z.coerce.date().nullish(),
    isNotSureIfPaymentIsOngoing: z.boolean(),
})

export const AccountReportSchema = z.object({
    subscriptions: z.array(SubscriptionSchema),
    googleAccount: GoogleAccountSchema,
})

export const SubscriptionReportSchema = z.object({
    accountReports: z.array(AccountReportSchema),
    analyzedAt: z.coerce.date().nullish()
});

export type AppUserType = z.infer<typeof AppUserSchema>;
export type AccountReportSchemaType = z.infer<typeof AccountReportSchema>;

export type SubscriptionReportType = z.infer<typeof SubscriptionReportSchema>;
export type ServiceProviderType = z.infer<typeof ServiceProviderSchema>;
export type SubscriptionType = z.infer<typeof SubscriptionSchema>;
export type GoogleAccountType = z.infer<typeof GoogleAccountSchema>;

// // Helper to map to UI-friendly format
// export function mapToReport(data: ReportDTO) {
//     return {
//         id: data.report_id,
//         value: data.total_value,
//         date: new Date(data.generated_at).toLocaleDateString(),
//     };
// }