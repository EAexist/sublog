import { GoogleLoginButton } from "@/components/shared/GoogleLoginButton";
import { Container } from "@/components/ui/container";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { getAppUser } from "@/lib/api";
import { ensureMsw } from "@/lib/msw";
import { DefaultLayout } from "@/templates/DefaultLayout";
import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GoogleAccount, GoogleAccountItem } from "./_components/GoogleAccountItem";

type AppUserResponse = {
    id: string;
    name: string;
    googleAccounts: GoogleAccount[];
};

type Props = {
    params: Promise<{ locale: string }>;
};

const SettingsPage = async ({ params }: Props) => {

    await ensureMsw();

    const t = await getTranslations("settings");

    let appUser: AppUserResponse | null = null;
    try {
        const response = await getAppUser();
        if (!response.error && response.data) {
            appUser = response.data as AppUserResponse;
        }
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }

    return (
        <DefaultLayout>
            <h1 className="text-xl font-semibold px-5 pt-4">{t("title")}</h1>
            <Container>
                {/* Page Header */}

                {/* <Separator className="my-8" /> */}

                {/* User Profile Section */}
                {/* <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-primary" />
                                    <h2 className="text-xl font-semibold">Profile Information</h2>
                                </div>
                                <p className="text-sm text-muted-foreground">Your account details and personal information</p>
                            </div>

                            <div className="rounded-xl border bg-card p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">User ID</label>
                                        <div className="text-sm font-mono bg-muted px-3 py-2 rounded-md">
                                            {appUser?.id || "N/A"}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                                        <div className="text-sm px-3 py-2 rounded-md border">
                                            {appUser?.name || "N/A"}
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Connected Accounts</p>
                                        <p className="text-xs text-muted-foreground">Google accounts linked to your profile</p>
                                    </div>
                                    <div className="text-sm font-semibold text-primary">
                                        {appUser?.googleAccounts.length || 0} accounts
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8" /> */}

                <Separator className="my-2" />
                {/* Google Accounts Section */}
                <Section
                    className="py-4 gap-4"
                >
                    <h2 className="text-lg font-medium">{t("googleAccounts.title")}</h2>

                    {appUser?.googleAccounts && appUser.googleAccounts.length > 0 ? (
                        <ul className="grid grid-cols-1 gap-4">
                            {appUser.googleAccounts.map((account, index) => (
                                <li key={index}>
                                    <GoogleAccountItem
                                        account={account}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Empty className="border border-solid">
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Mail className="h-6 w-6" />
                                </EmptyMedia>
                                <EmptyTitle>{t("googleAccounts.noAccounts")}</EmptyTitle>
                                <EmptyDescription>{t("googleAccounts.connectPrompt")}</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    )}
                </Section>

                <Separator className="my-2" />

                {/* Add Google Account Section */}
                <Section
                    className="py-4 gap-4">
                    <div className="py-4 flex flex-col gap-4">
                        <h2 className="text-lg font-medium">{t("addAccount.title")}</h2>
                        <div className="max-w-md">
                            <GoogleLoginButton />
                        </div>
                    </div>
                </Section>
            </Container>
        </DefaultLayout >
    );
};

export default SettingsPage;
