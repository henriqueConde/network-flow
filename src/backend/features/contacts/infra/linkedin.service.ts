import { env } from '@/backend/core/config/env';
import { z } from 'zod';

/**
 * LinkedIn API response schema based on the provided JSON structure.
 */
const LinkedInContactSnapshot = z.object({
    Company: z.string().optional(),
    Position: z.string().optional(),
    'First Name': z.string().optional(),
    'Last Name': z.string().optional(),
    'Connected On': z.string().optional(),
    URL: z.string().optional(),
    'Email Address': z.string().optional(),
});

const LinkedInResponse = z.object({
    paging: z.object({
        start: z.number(),
        count: z.number(),
        total: z.number(),
        links: z.array(z.unknown()),
    }),
    elements: z.array(
        z.object({
            snapshotData: z.array(LinkedInContactSnapshot),
        })
    ),
});

export type LinkedInContact = z.infer<typeof LinkedInContactSnapshot>;

/**
 * Service for interacting with LinkedIn API.
 */
export async function fetchLinkedInContacts(): Promise<LinkedInContact[]> {
    // Validate environment variables are loaded
    if (!env.LINKEDIN_API_BASE || !env.LINKEDIN_VERSION || !env.LINKEDIN_ACCESS_TOKEN) {
        const missing = [];
        if (!env.LINKEDIN_API_BASE) missing.push('LINKEDIN_API_BASE');
        if (!env.LINKEDIN_VERSION) missing.push('LINKEDIN_VERSION');
        if (!env.LINKEDIN_ACCESS_TOKEN) missing.push('LINKEDIN_ACCESS_TOKEN');
        throw new Error(`LinkedIn API environment variables are not configured. Missing: ${missing.join(', ')}. Please check your .env.local file.`);
    }

    // LinkedIn API endpoint for member snapshot data (connections)
    // Based on: GET /rest/memberSnapshotData?q=criteria&domain=CONNECTIONS
    // Ensure base URL doesn't have trailing slash
    let baseUrl = env.LINKEDIN_API_BASE.replace(/\/$/, '');

    // If base URL already includes /rest, don't add it again
    // Otherwise, add /rest to the base URL
    let endpointPath = '/rest/memberSnapshotData';
    if (baseUrl.endsWith('/rest')) {
        endpointPath = '/memberSnapshotData';
    }

    const url = `${baseUrl}${endpointPath}?q=criteria&domain=CONNECTIONS`;

    console.log('[LinkedIn Service] Environment check:');
    console.log('  - LINKEDIN_API_BASE:', env.LINKEDIN_API_BASE);
    console.log('  - LINKEDIN_VERSION:', env.LINKEDIN_VERSION);
    console.log('  - LINKEDIN_ACCESS_TOKEN:', env.LINKEDIN_ACCESS_TOKEN ? `***${env.LINKEDIN_ACCESS_TOKEN.slice(-4)}` : 'MISSING');
    console.log('[LinkedIn Service] Making request to:', url);
    console.log('[LinkedIn Service] Headers:', {
        'Linkedin-Version': env.LINKEDIN_VERSION,
        'X-RestLi-Protocol-Version': '2.0.0',
        'Authorization': 'Bearer ***' + env.LINKEDIN_ACCESS_TOKEN.slice(-4),
    });

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${env.LINKEDIN_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'Linkedin-Version': env.LINKEDIN_VERSION, // Note: lowercase 'i' in Linkedin
            'X-RestLi-Protocol-Version': '2.0.0',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`LinkedIn API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const parsed = LinkedInResponse.parse(data);

    // Extract all contacts from all elements
    const contacts: LinkedInContact[] = [];
    for (const element of parsed.elements) {
        contacts.push(...element.snapshotData);
    }

    return contacts;
}

