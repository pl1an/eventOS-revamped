

export interface Tag {
    id: string;
    name: string;
    color: string; // hex color code
}

export interface Commitment {
    id: string;
    title: string;
    description: string;
    time:{
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        duration: number; // duration in minutes
    };
    tags: Tag[];
    type: "event" | "task" | "purchase";
    completed?: boolean; // only for tasks
    price?: number; // only for purchases
}


