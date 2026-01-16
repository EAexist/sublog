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
    id: z.string(),
    canAnalyzeSubscription: z.boolean(),
    websiteUrl: z.string().optional(),
    displayName: z.string(),
    logoDevSuffix: z.string().optional()
})

export const SubscriptionSchema = z.object({
    id: z.string().nullish(),
    serviceProvider: ServiceProviderSchema,
    registeredSince: z.coerce.date().nullish(),
    hasSubscribedNewsletterOrAd: z.boolean(),
    subscribedSince: z.coerce.date().nullish(),
    isNotSureIfSubscriptionIsOngoing: z.boolean(),
})

export const AccountReportSchema = z.object({
    subscriptions: z.array(SubscriptionSchema),
    googleAccount: GoogleAccountSchema,
})

export const SubscriptionReportSchema = z.object({
    accountReports: z.array(AccountReportSchema),
    analyzedAt: z.coerce.date().nullish()
});

export const ReportUpdateEligibilitySchema = z.object({
    canUpdate: z.coerce.boolean(),
    analyzedAt: z.coerce.date().nullish(),
    availableSince: z.coerce.date().nullish()
});

export type AppUser = z.infer<typeof AppUserSchema>;
export type AccountReportSchema = z.infer<typeof AccountReportSchema>;

export type SubscriptionReport = z.infer<typeof SubscriptionReportSchema>;
export type ServiceProvider = z.infer<typeof ServiceProviderSchema>;
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type GoogleAccount = z.infer<typeof GoogleAccountSchema>;
export type ReportUpdateEligibility = z.infer<typeof ReportUpdateEligibilitySchema>;

// // Helper to map to UI-friendly format
// export function mapToReport(data: ReportDTO) {
//     return {
//         id: data.report_id,
//         value: data.total_value,
//         date: new Date(data.generated_at).toLocaleDateString(),
//     };
// }