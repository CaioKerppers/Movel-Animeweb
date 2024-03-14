export class Anime {
    private _id: string;
    private _temporadas: number;
    private _nome: string;
    private _datalancamento: Date;
    private _episodios: number;
    private _estudio: string;
    private _downloadURL: any;
    private _uid!: string;
  
    constructor(nome: string, estudio: string, datalancamento: Date, temporadas: number, episodios: number) {
      this._nome = nome;
      this._estudio = estudio;
      this._datalancamento = datalancamento;
      this._temporadas = temporadas;
      this._episodios = episodios;
    }
  
    get id(): string {
      return this._id;
    }
    set id(value: string) {
      this._id = value;
    }
  
    get temporadas(): number {
      return this._temporadas;
    }
    set temporadas(value: number) {
      this._temporadas = value;
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
  
    get downloadURL(): any {
      return this._downloadURL;
    }
    set downloadURL(downloadURL: any) {
      this._downloadURL = downloadURL;
    }
  
    get uid(): string {
      return this._uid;
    }
    set uid(uid: string) {
      this._uid = uid;
    }
  }
  