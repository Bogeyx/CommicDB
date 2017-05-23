export class Comic {
    /*[Key]*/
    public Id: number;
    /*[Required]*/
    public Name: string;
    /*[Required]*/
    public Discription: string;
    /*[Required]*/
    public Author: string;
    /*[Required]*/
    public Release: Date;
    public Lists: ListComicRelation[];
    public Tags: TagComicRelation[];
}

export class User {
    /*[Key]*/
    public Username: string;
    /*[Required]*/
    public Password: string;
    /*[Required]*/
    public Email: string;
    public Options: string;
    /*[Required]*/
    public RegistrationDate: Date;
    public Lists: List[];
}

export class Tag {
    /*[Key]*/
    public Name: string;
    public Comics: TagComicRelation[];
    public Lists: TagListRelation[];
}

export class List {
    /*[Key]*/
    public Id: number;
    /*[Required]*/
    public UserName: string;
    public ParentId: number;
    /*[Required]*/
    public Name: string;
    public User: User;
    public Parent: List;
    public SubLists: List[];
    public Comics: ListComicRelation[];
    public Tags: TagListRelation[];
}

export class ListComicRelation {
    public ComicId: number;
    public ListId: number;
    public Comic: Comic;
    public List: List;
}
export class TagComicRelation {
    public ComicId: number;
    /*[Required]*/
    public TagName: string;
    public Tag: Tag;
    public Comic: Comic;
}
export class TagListRelation {
    public ListId: number;
    /*[Required]*/
    public TagName: string;
    public Tag: Tag;
    public List: List;
}