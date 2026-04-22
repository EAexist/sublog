import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function InitialSetupWizard() {
    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Subscription Killer</CardTitle>
                    <CardDescription>
                        Let's set up your dashboard by analyzing your email subscriptions
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                        <p>To get started, we'll need to:</p>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                            <li>Connect to your email account</li>
                            <li>Analyze your subscription emails</li>
                            <li>Create your personalized dashboard</li>
                        </ol>
                    </div>
                    <Button size="fullW" className="mt-6">
                        Start Email Analysis
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
