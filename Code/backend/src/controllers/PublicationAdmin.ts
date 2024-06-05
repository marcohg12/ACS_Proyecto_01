import { PublicationDAO } from "../daos/PublicationDAO";
import { Publication } from "../models/Publication";
import { IPublicationDAO } from "./_tests_/IPublicationDAO";
const fs = require("fs");

class PublicationAdmin {
  private publicationDAO: PublicationDAO = new PublicationDAO();

  constructor(publicationDAO: IPublicationDAO) {
    this.publicationDAO = publicationDAO;
  }

  // Obtiene una publicación por su Id
  public async getPublication(publicationId: string) {
    const publication = await this.publicationDAO.getPublication(publicationId);
    if (!publication) {
      throw new Error(`Publication with ID ${publicationId} not found`);
    }
    return publication;
  }

  // Obtiene todas las publicaciones registradas
  public async getPublications() {
    return await this.publicationDAO.getPublications();
  }

  // Obtiene todas las publicaciones de una categoría
  public async getPublicationsByCategory(categoryId: string) {
    const publications = await this.publicationDAO.getPublicationsByCategory(categoryId);
    if (publications.length === 0) {
      throw new Error(`No publications found for category ID ${categoryId}`);
    }
    return publications;
  }

  // Obtiene todas las publicaciones de un conjunto de palabras clave
  public async getPublicationsByTags(tags: string[]) {
    const publications = await this.publicationDAO.getPublicationsByTags(tags);
    if (publications.length === 0) {
      throw new Error(`No publications found for tags ${tags.join(', ')}`);
    }
    return publications;
  }

  // Registra una publicación
  public async registerPublication(publication: Publication) {
    if (!(publication instanceof Publication)) {
      throw new Error("Invalid publication object");
    }
    const publicationId = await this.publicationDAO.registerPublication(publication);
    await fs.renameSync(
      publication.getPhoto(),
      "photos/publications/" + publicationId + ".png"
    );
  }

  // Actualiza una publicación
  public async updatePublication(publication: Publication) {
    // Si hay una foto nueva
    if (publication.getPhoto() !== "") {
      // Eliminamos la foto anterior
      await fs.unlink(
        "photos/publications/" + publication.getID() + ".png",
        () => {}
      );
      // Guardamos la nueva foto
      await fs.renameSync(
        publication.getPhoto(),
        "photos/publications/" + publication.getID() + ".png"
      );
    }
    await this.publicationDAO.updatePublication(publication);
  }

  // Elimina una publicación por su Id
  public async deletePublication(publicationId: string) {
    try {
        await fs.unlink("photos/publications/" + publicationId + ".png");
        await this.publicationDAO.deletePublication(publicationId);
    } catch (error) {
        // Manejar errores
        console.error("Error deleting publication:", error);
        throw error;
    }
  }
}

export { PublicationAdmin };
