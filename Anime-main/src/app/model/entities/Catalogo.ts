export class Catalogo{
    private _id!: string;
    private _temporada: number;
    private _nome: string;
    private _datalancamento: Date;
    private _episodios: number;
    private _estudio: string;
    private _downloadURL: any; 
    
    constructor(nome : string, temporada: number, datalancamento: Date, episodios: number, estudio: string, id : string){
        this._datalancamento = datalancamento;
        this._episodios = episodios;
        this._nome = nome;
        this._temporada = temporada;
        this._estudio = estudio;   
        this._id = id;
    }

    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }

    get temporada(): number {
        return this._temporada;
    }
    set temporada(value: number) {
        this._temporada = value;
    }

    get nome(): string {
        return this._nome;
    }
    set nome(value: string) {
        this._nome = value;
    }

    get datalancamento(): Date {
        return this._datalancamento;
    }
    set datalancamento(value: Date) {
        this._datalancamento = value;
    }

    get episodios(): number {
        return this._episodios;
    }
    set episodios(value: number) {
        this._episodios = value;
    }

    get estudio(): string {
        return this._estudio;
    }
    set estudio(value: string) {
        this._estudio = value;
    }

    get downloadURL() : any{
        return this._downloadURL
    }

    set downloadURL(downloadURL : any){
        this._downloadURL = downloadURL;
    }


}

