"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const TestAppGoogleLoginButton = () => {
    const t = useTranslations('components.TestAppGoogleLoginButton');
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    // const [showGoogleLoginDialog, setShowGoogleLoginDialog] = useState(false);
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Google Forms expects application/x-www-form-urlencoded
        const formData = new URLSearchParams();
        formData.append('entry.530285518', email);
        try {
            await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdHpEWFq-lLloWWREHU1PLYcS3R74eYuSELWEzSWs-_jRXY0A/formResponse', {
                method: 'POST',
                mode: 'no-cors', // Crucial: Google Forms won't return CORS headers
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString(),
            });
            setShowSuccessDialog(true);
            setIsOpen(false);
            setEmail('');
        } catch (err) {
            console.error('Submission failed', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessDialog(false);
    };

    const handleGoogleLoginClose = () => {
        setShowGoogleLogin(false);
    };

    const handleContinueToLogin = () => {
        setIsOpen(false);
        setShowGoogleLogin(true);
    };

    return (
        <>
            <Button
                onClick={handleButtonClick}
                size={"fullW"}
                variant={"outline"}
            >
                <Play />
                {t('title')}
            </Button>

            {/* Initial Approval Request Dialog */}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('dialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            {t('dialog.description')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Option 1: Submit email for whitelist via Google Form */}
                        <Field>
                            <FieldLabel htmlFor="gmail">{t('dialog.submitLabel')}</FieldLabel>
                            <FieldContent>
                                <form onSubmit={handleFormSubmit} className="flex gap-2">
                                    <InputGroup className="flex-1">
                                        <InputGroupInput
                                            id="gmail"
                                            type="text"
                                            required
                                            value={email}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                            placeholder={t('dialog.placeholder')}
                                            disabled={isSubmitting}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            {t('dialog.suffix')}
                                        </InputGroupAddon>
                                    </InputGroup>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="min-w-[120px]"
                                    >
                                        {isSubmitting ? t('dialog.submitting') : t('dialog.register')}
                                    </Button>
                                </form>
                                <FieldDescription>
                                    {t('dialog.fieldDescription')}
                                </FieldDescription>
                            </FieldContent>
                        </Field>

                        {/* <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or</span>
                            </div>
                        </div> */}

                        {/* <Field>
                            <FieldLabel htmlFor="gmail">I've</FieldLabel>
                            <FieldContent>
                                <Button>
                                    Sign In With Google
                                </Button>
                                <GoogleLoginButton />
                            </FieldContent>
                        </Field> */}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleContinueToLogin}>
                            {t('dialog.continueToLogin')}
                        </AlertDialogAction>
                        <AlertDialogCancel>{t('dialog.cancel')}</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            {/* Google Login Dialog */}
            <AlertDialog open={showGoogleLogin} onOpenChange={handleGoogleLoginClose}>
                <AlertDialogContent className="w-fit">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('loginDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                            {t('loginDialog.description')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <GoogleLoginButton />
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('loginDialog.close')}</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Success Dialog */}
            <AlertDialog open={showSuccessDialog} onOpenChange={handleSuccessClose}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('successDialog.title')}</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-3">
                            {t('successDialog.description')}
                            <br />
                            <br />
                            {t.rich('successDialog.instruction', {
                                span: (chunks) => <span className="font-bold">{chunks}</span>,
                            })}
                            <br />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {/* <p className="text-sm text-foreground">
                        Please check "Invitation to test Sublog" email from Google Cloud in your email inbox. You must click accept to enable access.
                    </p> */}
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleSuccessClose}>
                            {t('successDialog.ok')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
