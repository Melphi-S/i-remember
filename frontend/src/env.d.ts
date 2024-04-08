/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_AVATAR_URL: string;
    readonly VITE_CONTACT_EMAIL: string;
    readonly VITE_CONTACT_TELEGRAM: string;
    readonly VITE_CONTACT_GITHUB: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
