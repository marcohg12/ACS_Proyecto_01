import { IDBPublication } from "./IDBPublication";
import { Publication as PublicationModel } from "../../models/Publication";

class DBPublicationStub implements IDBPublication {
    publications: PublicationModel[]
  
    constructor() {
      this.publications = [];
      this.resetPublications();
    }

    private isValidPublication(publication: any): boolean {
      return (
        publication &&
        typeof publication.getCategoryID === 'function' &&
        typeof publication.getDescription === 'function' &&
        typeof publication.getTags === 'function' &&
        Array.isArray(publication.getTags())
      );
    }

    async setPublications(publications: []){
      this.publications = publications
    }

    async resetPublications(){
      const publication1 = new PublicationModel('category1', new Date(), 'description1', 'photo1', ['tag1', 'tag2'], 'publication1');
      const publication2 = new PublicationModel('category2', new Date(), 'description2', 'photo2', ['tag3', 'tag4'], 'publication2');
      publication1.setID('1')
      this.publications.push(publication1, publication2);

      for (let i = 1; i <= 100; i++) {
        const publication = new PublicationModel(
          `category${i}`,
          new Date(),
          `Description ${i}`,
          `photo${i}.jpg`,
          [`tag${i}`],
          `publication${i}`
        );
        this.publications.push(publication);
      }
    }

    async getPublication(publicationId: string): Promise<PublicationModel | null> {
      const publication = this.publications.find(publication => publication.getID() === publicationId);
      return publication || null;
    }
    
    async getPublications(): Promise<PublicationModel[]> {
      if (this.publications.length === 0){
        return null
      }else{
      return this.publications;
      }
    }
    
    async getPublicationsByCategory(categoryId: string): Promise<PublicationModel[] | null> {
      const publicationsInCategory = this.publications.filter(publication => publication.categoryId === categoryId);
      if (publicationsInCategory.length === 0) {
        return null;
      }
      return publicationsInCategory;
    }
    
    async getPublicationsByTags(tags: string[]): Promise<PublicationModel[]> {
      const publicationsWithTags = this.publications.filter(publication => {
          return tags.every(tag => publication.tags.includes(tag));
      });
      if (publicationsWithTags.length === 0) {
          return null;
      }
      return publicationsWithTags;
    }
    
    async registerPublication(publicationToRegister: PublicationModel): Promise<string | null> {
      if (!this.isValidPublication(publicationToRegister)) {
          return null;
      }
  
      this.publications.push(publicationToRegister);
      return "fakePublicationId";
    }
    
      async updatePublication(publicationToUpdate: PublicationModel): Promise<string> {
        if (!this.isValidPublication(publicationToUpdate)) {
          return null;
        } 
        return "fakePublicationId";    
      }
    
      async deletePublication(publicationId: string): Promise<string> {
        const index = this.publications.findIndex(publication => publication.getID() === publicationId);
        if (index !== -1) {
          this.publications.splice(index, 1);
          return publicationId;
        } else {
          return null;
        }
      }

}

export default DBPublicationStub;