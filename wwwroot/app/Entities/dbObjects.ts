export class User {
    /*[Key]*/
    public username: string;
    /*[Required]*/
    public password: string;
    /*[Required]*/
    public email: string;
    /*[Required]*/
    public name: string;
    /*[Required]*/
    public bDay: Date;
    public options: string;
    /*[Required]*/
    public registrationDate: Date;

    public formatedRegistrationDate: Date;
    public formatedBDay: Date;
    /*[NavigationProperty]*/
    public lists: List[];
    /*[NavigationProperty]*/
    public checkData: CheckData[];
}

export class Tag {
    /*[Key]*/
    public name: string;
    /*[NavigationProperty]*/
    public lists: TagListRelation[];
}

export class List {
    /*[Key]*/
    public id: number;
    /*[Required]*/
    public userName: string;
    public parentId: number;
    /*[Required]*/
    public name: string;
    /*[NavigationProperty]*/
    public user: User;
    /*[NavigationProperty]*/
    public parent: List;
    /*[NavigationProperty]*/
    public subLists: List[];
    /*[NavigationProperty]*/
    public comics: ListComicRelation[];
    /*[NavigationProperty]*/
    public tags: TagListRelation[];
}

export class ListComicRelation {
    public comicId: number;
    public listId: number;
    /*[NavigationProperty]*/
    public list: List;
}
export class TagListRelation {
    public listId: number;
    /*[Required]*/
    public tagName: string;
    /*[NavigationProperty]*/
    public tag: Tag;
    /*[NavigationProperty]*/
    public list: List;
}
export class CheckData {
    /*[Key]*/
    public id: number;
    /*[Required]*/
    public userName: string;
    /*[Required]*/
    public volumeId: number;
    /*[Required]*/
    public volumeName: number;
    /*[Required]*/
    public lastCount: number;
    /*[Required]*/
    public hasNew: boolean;
    /*[NavigationProperty]*/
    public user: User;
}


/* API */
export class SearchResult {
    public issues: Issue[];
    public volumes: Volume[];
}
export class Issue {
    public id: number;
    public aPIURL: string;
    public detailsURL: string;
    public release: Date;
    public formatedRelease: string;
    public issueNumber: number;
    public description: string;
    public imageUrl: string;
    public name: string;
    public volumeName: string;
    public volumeId: number;
}
export class Volume {
    public id: number;
    public aPIURL: string;
    public detailsURL: string;
    public startYear: number;
    public issueCount: number;
    public description: string;
    public imageUrl: string;
    public name: string;
    public puplisher: string;
    public issueIds: number[];
}