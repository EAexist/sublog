'use server'

import { deleteGoogleAccount as deleteGoogleAccountApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function deleteGoogleAccount(googleSubject: string) {
    'use server'
    try {
        console.debug('Calling deleteGoogleAccount API with subject:', googleSubject);
        const response = await deleteGoogleAccountApi(googleSubject)
        if (!response.error && response.data) {
            // appUser = response.data as AppUserResponse;
        }
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }

    revalidatePath('/appUsers')
}