export interface APIKeys {
    clientId: string;
    clientApplicationId: string;
}

export interface Track {
    title: string;
    ID: string;
    permalinkURL: string;
    userID: string;
    likesCount: number;
    repostsCount: number;
    artworkURL: string;
    genre: string;
    tagList: string[];
    labelName: string;
}

export interface LikesBatch {
    collection: any[];
    next_href: string;
    query_urn: any;
}
