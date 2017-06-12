export class Comic {
    /*[Key]*/
    public id: number;
    /*[Required]*/
    public name: string;
    /*[Required]*/
    public discription: string;
    /*[Required]*/
    public author: string;
    /*[Required]*/
    public release: Date;
    /*[NavigationProperty]*/
    public lists: ListComicRelation[];
    /*[NavigationProperty]*/
    public tags: TagComicRelation[];
}

export class User {
    /*[Key]*/
    public username: string;
    /*[Required]*/
    public password: string;
    /*[Required]*/
    public email: string;
    public options: string;
    /*[Required]*/
    public registrationDate: Date;
    /*[NavigationProperty]*/
    public lists: List[];
}

export class Tag {
    /*[Key]*/
    public name: string;
    /*[NavigationProperty]*/
    public comics: TagComicRelation[];
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
    public comic: Comic;
    /*[NavigationProperty]*/
    public list: List;
}
export class TagComicRelation {
    public comicId: number;
    /*[Required]*/
    public tagName: string;
    /*[NavigationProperty]*/
    public tag: Tag;
    /*[NavigationProperty]*/
    public comic: Comic;
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
    public description: string;
    public imageUrl: string;
    public name: string;
    public puplisher: string;
    public issueIds: number[];
}