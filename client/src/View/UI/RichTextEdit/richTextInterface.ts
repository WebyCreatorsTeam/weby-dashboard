export interface IRichTextEdit {
    blogContext: IBlogContact
    setBlogContext: Function
}

export interface IBlogBody {
    value: string;
}

export interface IBlogContact {
    title: string;
    body: IBlogBody
}