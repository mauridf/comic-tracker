export interface Character {
    id: number;
    comicVineId: number;
    aliases?: string;
    birth?: string;
    countOfIssueAppearances?: number;
    deck?: string;
    description?: string;
    firstAppearedInIssue?: string;
    gender?: string;
    imageUrl?: string;
    name: string;
    origin?: string;
    publisherName?: string;
    realName?: string;
    siteDetailUrl?: string;
}

export interface ComicVineCharacter {
    id: number;
    name: string;
    aliases?: string;
    birth?: string;
    count_of_issue_appearances?: number;
    deck?: string;
    description?: string;
    first_appeared_in_issue?: { name: string; issue_number: string };
    gender?: string;
    image?: { original_url: string };
    origin?: { name: string };
    publisher?: { name: string };
    real_name?: string;
    site_detail_url?: string;
}