import { Publication as PublicationModel } from "../models/Publication";

export interface IPublicationDAO {
  getPublication(publicationId: string): Promise<any>;
  getPublications(): Promise<any[]>;
  getPublicationsByCategory(categoryId: string): Promise<any[]>;
  getPublicationsByTags(tags: string[]): Promise<any[]>;
  registerPublication(publicationToRegister: PublicationModel): Promise<any>;
  updatePublication(publicationToUpdate: PublicationModel): Promise<any>;
  deletePublication(publicationId: string): Promise<any>;
}
