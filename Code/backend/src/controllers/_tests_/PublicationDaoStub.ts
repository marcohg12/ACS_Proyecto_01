import mongoose from "mongoose";
import { IPublicationDAO } from "../../interfaces/IPublicationDAO";
import { Publication as PublicationModel } from "../../models/Publication";

class PublicationDAOStub implements IPublicationDAO {
  private publications: any[] = [];

  constructor() {
    this.publications = [
      {
        _id: "60d9fbbf2b7e4e3a5c8e4f5b",
        categoryId: "1234567890abcdef12345678",
        date: new Date(),
        description: "Test publication 1",
        photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5b.png",
        tags: ["test", "publication"],
        category: { _id: "1234567890abcdef12345678", name: "TestCategory" },
      },
      {
        _id: "60d9fbbf2b7e4e3a5c8e4f5c",
        categoryId: "1234567890abcdef12345678",
        date: new Date(),
        description: "Test publication 2",
        photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5c.png",
        tags: ["test", "publication2", "tag2"],
        category: { _id: "1234567890abcdef12345678", name: "TestCategory" },
      },
      {
        _id: "60d9fbbf2b7e4e3a5c8e4f5d",
        categoryId: "1234567890abcdef12345678",
        date: new Date(),
        description: "Test publication 1",
        photo: "/photos/publications/60d9fbbf2b7e4e3a5c8e4f5b.png",
        tags: ["test", "publication", "tag1"],
        category: { _id: "1234567890abcdef12345678", name: "TestCategory" },
      },
    ];
  }

  async getPublication(publicationId: string): Promise<any> {
    return this.publications.find((pub) => pub._id === publicationId) || null;
  }

  async getPublications(): Promise<any[]> {
    return this.publications;
  }

  async getPublicationsByCategory(categoryId: string): Promise<any[]> {
    return this.publications.filter(
      (pub) =>
        pub.categoryId === categoryId ||
        (pub.category && pub.category.fatherCategory === categoryId)
    );
  }

  async getPublicationsByTags(tags: string[]): Promise<any[]> {
    return this.publications.filter((pub) =>
      pub.tags.some((tag: string) => tags.includes(tag))
    );
  }

  async registerPublication(publication: any): Promise<any> {
    if (!this.isValidPublication(publication)) {
      throw new Error("Invalid publication object");
    }

    const newPublication = {
      _id: new mongoose.Types.ObjectId().toString(),
      categoryId: publication.getCategoryID(),
      date: new Date(),
      description: publication.getDescription(),
      photo: "/photos/publications/temp.png",
      tags: publication.getTags(),
      category: { _id: publication.getCategoryID(), name: "TestCategory" },
    };

    this.publications.push(newPublication);
    newPublication.photo = `/photos/publications/${newPublication._id}.png`;
    return newPublication._id;
  }

  private isValidPublication(publication: any): boolean {
    return (
      publication &&
      typeof publication.getCategoryID === "function" &&
      typeof publication.getDescription === "function" &&
      typeof publication.getTags === "function" &&
      Array.isArray(publication.getTags())
    );
  }
  async updatePublication(publicationToUpdate: PublicationModel): Promise<any> {
    if (!this.isValidPublication(publicationToUpdate)) {
      throw new Error("Invalid publication object");
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ nModified: 1 });
      }, 1000);
    });
  }

  async deletePublication(publicationId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (publicationId === "nonexistentid") {
          reject(new Error("Publication not found"));
        } else {
          resolve({ nDeleted: 1 });
        }
      }, 1000);
    });
  }
}

export { PublicationDAOStub };
