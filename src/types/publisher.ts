export interface Publisher {
    id: number;
    comicVineId: number;
    aliases?: string;
    deck?: string;
    imageUrl?: string;
    locationAddress?: string;
    locationCity?: string;
    locationState?: string;
    name: string;
    siteDetailUrl?: string;
}

export interface ComicVinePublisher {
    id: number;
    name: string;
    aliases?: string;
    deck?: string;
    image?: { original_url: string };
    location_address?: string;
    location_city?: string;
    location_state?: string;
    site_detail_url?: string;
}