// Fonction utilitaire pour simuler un délai réseau
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Initialiser les données de test si nécessaire
const initializeTestData = () => {
  if (!localStorage.getItem("reservations")) {
    localStorage.setItem("reservations", JSON.stringify([]));
  }
  if (!localStorage.getItem("menu")) {
    const menuData = {
      entrees: [
        {
          id: 1,
          nom: "Foie Gras Maison",
          description:
            "Foie gras mi-cuit, chutney de figues et pain brioché toasté",
          prix: 24,
          allergenes: ["gluten", "fruits à coque"],
        },
        {
          id: 2,
          nom: "Carpaccio de Saint-Jacques",
          description:
            "Fines tranches de Saint-Jacques, huile d'olive citronnée, fleur de sel",
          prix: 22,
          allergenes: ["fruits de mer"],
        },
      ],
      plats: [
        {
          id: 3,
          nom: "Filet de Bœuf Rossini",
          description:
            "Filet de bœuf, escalope de foie gras poêlée, sauce Périgueux",
          prix: 42,
          allergenes: ["œufs", "lactose"],
        },
        {
          id: 4,
          nom: "Homard Bleu en Thermidor",
          description: "Homard gratiné, bisque crémeuse, légumes de saison",
          prix: 48,
          allergenes: ["crustacés", "lactose"],
        },
      ],
      desserts: [
        {
          id: 5,
          nom: "Soufflé au Chocolat",
          description: "Chocolat Valrhona, glace vanille Bourbon",
          prix: 16,
          allergenes: ["œufs", "lactose", "gluten"],
        },
        {
          id: 6,
          nom: "Tarte Tatin",
          description: "Pommes caramélisées, crème fraîche d'Isigny",
          prix: 14,
          allergenes: ["gluten", "lactose"],
        },
      ],
      vins: [
        {
          id: 7,
          nom: "Château Margaux 2015",
          description: "Grand cru classé, Bordeaux",
          prix: 280,
        },
        {
          id: 8,
          nom: "Chablis Premier Cru 2018",
          description: "Domaine William Fèvre",
          prix: 85,
        },
      ],
    };
    localStorage.setItem("menu", JSON.stringify(menuData));
  }
};

// Initialiser les données de test
initializeTestData();

// Service de réservation
export const reservationService = {
  create: async (reservationData) => {
    await delay(1000); // Simuler un délai réseau

    try {
      const reservations = JSON.parse(
        localStorage.getItem("reservations") || "[]"
      );
      const newReservation = {
        id: Date.now(),
        ...reservationData,
        statut: "confirmee",
        createdAt: new Date().toISOString(),
      };

      reservations.push(newReservation);
      localStorage.setItem("reservations", JSON.stringify(reservations));

      return {
        success: true,
        message: "Réservation créée avec succès",
        data: newReservation,
      };
    } catch (error) {
      throw new Error("Erreur lors de la création de la réservation");
    }
  },

  getAll: async () => {
    await delay(800);
    try {
      const reservations = JSON.parse(
        localStorage.getItem("reservations") || "[]"
      );
      return {
        success: true,
        data: reservations,
      };
    } catch (error) {
      throw new Error("Erreur lors de la récupération des réservations");
    }
  },
};

// Service du menu
export const menuService = {
  getAll: async () => {
    await delay(800);
    try {
      const menu = JSON.parse(localStorage.getItem("menu") || "{}");
      return {
        success: true,
        data: menu,
      };
    } catch (error) {
      throw new Error("Erreur lors de la récupération du menu");
    }
  },
};

// Service de contact
export const contactService = {
  send: async (contactData) => {
    await delay(1000);
    // Simuler un envoi réussi
    return {
      success: true,
      message: "Message envoyé avec succès",
      data: {
        id: Date.now(),
        ...contactData,
        createdAt: new Date().toISOString(),
      },
    };
  },
};
