import mongoose from "mongoose";
import { IPublicationDAO } from "./IPublicationDAO";
import { Publication as PublicationModel } from "../../models/Publication";

class PublicationDAOStub implements IPublicationDAO {
  private publications: any[] = []; // Aquí podrías agregar datos de prueba
  
  constructor() {
    // Datos de prueba iniciales
    this.publications = [
      {
        _id: "60d9fbbf2b7e4e3a5c8e4f5b",
        categoryId: "1234567890abcdef12345678",
        date: new Date(),
        description: "Test publication 1",
        photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5b.png",
        tags: ["test", "publication"],
        category: { _id: "1234567890abcdef12345678", name: "TestCategory" }
      },
      {
        _id: "60d9fbbf2b7e4e3a5c8e4f5c",
        categoryId: "1234567890abcdef12345678",
        date: new Date(),
        description: "Test publication 2",
        photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5c.png",
        tags: ["test", "publication2"],
        category: { _id: "1234567890abcdef12345678", name: "TestCategory" }
      },
      {
        _id: "60d9fbbf2b7e4e3a5c8e4f5d",
        categoryId: "1234567890abcdef12345678",
        date: new Date(),
        description: "Test publication 1",
        photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5b.png",
        tags: ["test", "publication"],
        category: { _id: "1234567890abcdef12345678", name: "TestCategory" }
      },
    ];
  }

  async getPublication(publicationId: string): Promise<any> {
    return this.publications.find(pub => pub._id === publicationId) || null;
  }

  async getPublications(): Promise<any[]> {
    return this.publications;
  }

  async getPublicationsByCategory(categoryId: string): Promise<any[]> {
    return this.publications.filter(pub => 
      pub.categoryId === categoryId || 
      (pub.category && pub.category.fatherCategory === categoryId)
    );
  }

  async getPublicationsByTags(tags: string[]): Promise<any[]> {
    return this.publications.filter(pub =>
      pub.tags.some((tag: string) => tags.includes(tag))
    );
  }

  async registerPublication(publicationToRegister: PublicationModel): Promise<any> {
    const newPublication = {
      _id: new mongoose.Types.ObjectId().toString(), // Genera un ID falso
      categoryId: publicationToRegister.getCategoryID(),
      date: new Date(),
      description: publicationToRegister.getDescription(),
      photo: "/photos/publications/temp.png",
      tags: publicationToRegister.getTags(),
      category: { _id: publicationToRegister.getCategoryID(), name: "TestCategory" }
    };
    this.publications.push(newPublication);
    // Simula la actualización de la ruta de la foto
    newPublication.photo = `/photos/publications/${newPublication._id}.png`;
    return newPublication._id;
  }

  async updatePublication(publicationToUpdate: PublicationModel): Promise<any> {
    // Simulación de la actualización en la base de datos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulación de la actualización exitosa
        resolve({ nModified: 1 });
      }, 1000); // Simular una operación asíncrona de 1 segundo
    });
  }

  async deletePublication(publicationId: string): Promise<any> {
    // Simulación de la eliminación en la base de datos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulación de la eliminación exitosa
        resolve({ nDeleted: 1 });
      }, 1000); // Simular una operación asíncrona de 1 segundo
    });
  }
}

export { PublicationDAOStub };
