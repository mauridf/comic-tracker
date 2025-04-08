export interface Team {
    id: number;
    comicVineId: number;
    aliases?: string;
    countOfIssueAppearances?: number;
    countOfTeamMembers?: number;
    deck?: string;
    description?: string;
    firstAppearedInIssue?: string;
    imageUrl?: string;
    name: string;
    publisherName?: string;
    siteDetailUrl?: string;
}

export interface ComicVineTeam {
    id: number;
    name: string;
    aliases?: string;
    count_of_isssue_appearances?: number;
    count_of_team_members?: number;
    deck?: string;
    description?: string;
    first_appeared_in_issue?: { name: string; issue_number: string };
    image?: { original_url: string };
    publisher?: { name: string };
    site_detail_url?: string;
}