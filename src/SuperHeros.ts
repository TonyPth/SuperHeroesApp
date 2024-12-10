// SuperHeros.ts
export class SuperHeros {
    id: number;
    name: string;
    idApi: number;
    slug: string ;
    constructor(id: number, name: string, idApi: number, slug: string) {
        this.id = id;
        this.name = name;
        this.idApi = idApi;
        this.slug = slug;
    }
}