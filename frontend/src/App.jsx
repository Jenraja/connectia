import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DEFAULT_CURRENCY = "CAD";
const CURRENCIES = {
  CAD: { symbol: "$", label: "CAD" },
  USD: { symbol: "US$", label: "USD" },
  EUR: { symbol: "€", label: "EUR" },
  TND: { symbol: "TND", label: "TND" },
};

const fmt = (amount, currency = DEFAULT_CURRENCY) => {
  const cur = CURRENCIES[currency] || CURRENCIES.CAD;
  const safeAmount = Number.isFinite(Number(amount)) ? Number(amount) : 0;
  if (currency === "TND") return `${safeAmount.toLocaleString("fr-CA")} ${cur.symbol}`;
  return `${cur.symbol}${safeAmount.toLocaleString("fr-CA")}`;
};

const cls = (...items) => items.filter(Boolean).join(" ");


const CONNECTIA_FR_EN = {
  "Inscription client": "Client sign up",
  "Services": "Services",
  "Demandes": "Requests",
  "Mes demandes": "My requests",
  "Demandes reçues": "Received requests",
  "Offres": "Offers",
  "Offres reçues": "Received offers",
  "Offres envoyées": "Sent offers",
  "Rendez-vous": "Appointments",
  "Messages": "Messages",
  "Profil client": "Client profile",
  "Dashboard organisation": "Organization dashboard",
  "Dashboard admin": "Admin dashboard",
  "Compagnies": "Companies",
  "Rapports": "Reports",
  "Dashboard": "Dashboard",
  "Dash": "Dash",
  "Users": "Users",
  "Client": "Client",
  "Organisation": "Organization",
  "Admin": "Admin",
  "Pro": "Pro",
  "Profil & organisation": "Profile & organization",
  "Gestion du profil": "Profile management",
  "Changer d’espace": "Switch workspace",
  "Abonnement & factures": "Subscription & invoices",
  "Paramètres": "Settings",
  "Accès session": "Session access",
  "Déconnexion": "Sign out",
  "Ouvrir le menu": "Open menu",
  "Fermer le menu": "Close menu",
  "Devise changée vers": "Currency changed to",
  "Session employé changée.": "Employee session changed.",
  "Compagnie ajoutée avec succès.": "Company added successfully.",
  "Trusted by verified partners": "Trusted by verified partners",
  "Offres fiables, partenaires vérifiés.": "Reliable offers, verified partners.",
  "Choisissez votre besoin et recevez des offres adaptées.": "Choose your need and receive matching offers.",
  "Suivez vos demandes actives, vos documents et les offres associées.": "Track your active requests, documents and related offers.",
  "Comparez les offres reçues et choisissez celle qui répond le mieux à votre demande.": "Compare received offers and choose the one that best matches your request.",
  "Vos rendez-vous sont regroupés par offre pour suivre clairement chaque prochaine étape.": "Your appointments are grouped by offer so every next step is clear.",
  "Vos messages sont regroupés par offre pour garder chaque suivi clair.": "Your messages are grouped by offer to keep each follow-up clear.",
  "Gérez vos informations personnelles et vos préférences de contact.": "Manage your personal information and contact preferences.",
  "Voir détails": "View details",
  "Créer une demande": "Create request",
  "Nouvelle demande": "New request",
  "Créer une offre": "Create offer",
  "Envoyer l’offre": "Send offer",
  "Comparer": "Compare",
  "Accepter": "Accept",
  "Refuser": "Decline",
  "Sauvegarder": "Save",
  "Annuler": "Cancel",
  "Fermer": "Close",
  "Valider": "Confirm",
  "Continuer": "Continue",
  "Retour": "Back",
  "Étape précédente": "Previous step",
  "Suivant": "Next",
  "Modifier": "Edit",
  "Supprimer": "Delete",
  "Contacter": "Contact",
  "Ajouter": "Add",
  "Télécharger PDF": "Download PDF",
  "Imprimer / sauvegarder PDF": "Print / save PDF",
  "Générer rapport": "Generate report",
  "Export PDF simulé pour la preview. Backend: génération PDF serveur à brancher.": "PDF export simulated in preview. Backend server-side PDF generation to connect.",
  "Rapport performance": "Performance report",
  "Rapport mensuel": "Monthly report",
  "Rapport ventes & subscriptions": "Sales & subscriptions report",
  "Rapport activité plateforme": "Platform activity report",
  "Résumé du périmètre": "Scope summary",
  "Périmètre": "Scope",
  "Période": "Period",
  "Total compagnies": "Total companies",
  "Total clients": "Total clients",
  "Chiffre d’affaires": "Revenue",
  "Somme mensuelle des abonnements actifs": "Monthly sum of active subscriptions",
  "Partenaires": "Partners",
  "Clients": "Clients",
  "Service le plus demandé": "Most requested service",
  "Partenaires par domaine": "Partners by domain",
  "Répartition des compagnies actives avec pourcentage et nombre.": "Distribution of active companies with percentage and count.",
  "Évolution annuelle": "Annual evolution",
  "Croissance des partenaires et des clients sur 12 mois.": "Partner and client growth over 12 months.",
  "Business global": "Global business",
  "Période:": "Period:",
  "Date début": "Start date",
  "Date fin": "End date",
  "Toutes les compagnies": "All companies",
  "Tous les domaines": "All sectors",
  "Domaine": "Sector",
  "Compagnie": "Company",
  "Toutes les provinces": "All provinces",
  "Tout": "All",
  "Statut": "Status",
  "Plan": "Plan",
  "Premium": "Premium",
  "Free": "Free",
  "Demandes reçues": "Received requests",
  "Offres envoyées": "Sent offers",
  "Offres acceptées": "Accepted offers",
  "Closed offers": "Closed offers",
  "Réponse moyenne": "Average response",
  "Temps moyen de réponse": "Average response time",
  "Taux closing": "Closing rate",
  "Taux de closing": "Closing rate",
  "Taux de traitement": "Processing rate",
  "Score concurrentiel": "Competitive score",
  "Score business": "Business score",
  "Analyse concurrentielle": "Competitive analysis",
  "Meilleure compagnie sur la période": "Best company for the period",
  "Demandes, offres et closing par domaine": "Requests, offers and closing by sector",
  "Compagnie qui close le plus": "Company with highest closing",
  "Métriques utilisateurs": "User metrics",
  "Vue client globale": "Global client view",
  "Domaines recherchés": "Searched sectors",
  "Localisation": "Location",
  "Âge": "Age",
  "Sexe": "Gender",
  "utilisateurs": "users",
  "utilisateur": "user",
  "partenaires": "partners",
  "partenaire": "partner",
  "demandes": "requests",
  "demande": "request",
  "offres": "offers",
  "offre": "offer",
  "acceptées": "accepted",
  "Acceptées": "Accepted",
  "Offres": "Offers",
  "Demandes": "Requests",
  "Répartition des clients par ville.": "Client distribution by city.",
  "Segments d’âge principaux.": "Main age segments.",
  "Répartition simple des clients.": "Simple client distribution.",
  "Services demandés par les clients.": "Services requested by clients.",
  "Femmes": "Women",
  "Femme": "Woman",
  "Hommes": "Men",
  "Homme": "Man",
  "Profil": "Profile",
  "Actif": "Active",
  "Identité vérifiée": "Verified identity",
  "Langue": "Language",
  "Français": "French",
  "Anglais": "English",
  "Arabe": "Arabic",
  "Email + in-app": "Email + in-app",
  "Immobilier": "Real estate",
  "Emploi": "Jobs",
  "Immigration": "Immigration",
  "Assurance": "Insurance",
  "Auto": "Auto",
  "Consultation, permis, RP, études": "Consultation, permits, PR, studies",
  "Auto, habitation, entreprise": "Auto, home, business",
  "Achat, financement, leasing, assurance": "Purchase, financing, lease, insurance",
  "Location, achat, vente, gestion locative": "Rental, purchase, sale, rental management",
  "Recherche emploi, recrutement, présélection": "Job search, recruitment, preselection",
  "Recherche emploi": "Job search",
  "Location": "Rental",
  "Achat": "Purchase",
  "Vente": "Sale",
  "Mise en location": "List for rent",
  "Nouvelle": "New",
  "Renouvellement": "Renewal",
  "Prolongation": "Extension",
  "Consultation": "Consultation",
  "Analyse dossier": "File analysis",
  "Permis de travail": "Work permit",
  "Permis d’études": "Study permit",
  "Résidence permanente": "Permanent residence",
  "Parrainage": "Sponsorship",
  "Auto + habitation": "Auto + home",
  "Habitation": "Home",
  "Entreprise": "Business",
  "Type de demande": "Request type",
  "Type de bien": "Property type",
  "Ville / secteur recherché": "City / desired area",
  "Date recherchée": "Desired date",
  "Budget": "Budget",
  "Budget maximum": "Maximum budget",
  "Prix souhaité": "Desired price",
  "Loyer souhaité": "Desired rent",
  "Disponibilité": "Availability",
  "Date de disponibilité": "Availability date",
  "Documents": "Documents",
  "Documents à joindre": "Documents to upload",
  "Ajouter document": "Add document",
  "Pièce d’identité": "ID document",
  "Preuve de revenus": "Proof of income",
  "Preuve d’emploi": "Proof of employment",
  "CV": "Resume",
  "Diplôme": "Diploma",
  "Passeport": "Passport",
  "Soumettre": "Submit",
  "Demande soumise": "Request submitted",
  "Vous allez recevoir des offres comparées pour sélectionner la meilleure offre sur le marché.": "You will receive compared offers to select the best offer on the market.",
  "Top prioritaires": "Top priority",
  "Demandes à traiter en premier": "Requests to process first",
  "Très prioritaire": "Very high priority",
  "Prioritaire": "Priority",
  "Standard": "Standard",
  "Urgence": "Urgency",
  "Cette semaine": "This week",
  "30 jours": "30 days",
  "2 mois": "2 months",
  "Immédiate": "Immediate",
  "Dans 1 mois": "In 1 month",
  "Dans 2-3 mois": "In 2-3 months",
  "Flexible": "Flexible",
  "Oui": "Yes",
  "Non": "No",
  "Peut-être": "Maybe",
  "À confirmer": "To confirm",
  "À comparer": "To compare",
  "À valider": "To validate",
  "Disponible": "Available",
  "Reçu": "Received",
  "En cours": "In progress",
  "Brouillon": "Draft",
  "Clôturé": "Closed",
  "Accepté": "Accepted",
  "Refusé": "Declined",
  "Reçue": "Received",
  "Envoyée": "Sent",
  "Sauvegardée": "Saved",
  "Prix": "Price",
  "Salaire": "Salary",
  "Salaire proposé": "Proposed salary",
  "Salaire marché": "Market salary",
  "Prime mensuelle": "Monthly premium",
  "Prime moyenne": "Average premium",
  "Frais": "Fees",
  "Frais professionnels": "Professional fees",
  "Frais moyens": "Average fees",
  "Moyenne marché": "Market average",
  "Minimum": "Minimum",
  "Maximum": "Maximum",
  "Votre offre": "Your offer",
  "Marché": "Market",
  "Écart": "Gap",
  "Position": "Position",
  "Classement": "Ranking",
  "Vous": "You",
  "Leader": "Leader",
  "Moyenne": "Average",
  "Score": "Score",
  "Compétitivité": "Competitiveness",
  "Faible": "Low",
  "Moyen": "Medium",
  "Élevé": "High",
  "Très élevé": "Very high",
  "Rang": "Rank",
  "Top": "Top",
  "Comparaison marché": "Market comparison",
  "Position marché": "Market position",
  "Création d'offre": "Offer creation",
  "Analyse avant envoi": "Pre-send analysis",
  "Offre immobilière": "Real estate offer",
  "Offre emploi / recrutement": "Job / recruitment offer",
  "Offre immigration": "Immigration offer",
  "Offre assurance": "Insurance offer",
  "Offre auto": "Auto offer",
  "Ajouter une compagnie": "Add a company",
  "Gestion utilisateurs": "User management",
  "Gestion compagnies": "Company management",
  "Liste": "List",
  "Modifier": "Edit",
  "Supprimer": "Delete",
  "Ajouter une organisation": "Add an organization",
  "Nom": "Name",
  "Courriel": "Email",
  "Téléphone": "Phone",
  "Ville": "City",
  "Province": "Province",
  "Pays": "Country",
  "Adresse": "Address",
  "Description": "Description",
  "Paramètres organisation": "Organization settings",
  "Espace de travail opérationnel de l’employé connecté.": "Operational workspace for the connected employee.",
  "Suivez la charge, les offres envoyées et la conversion par membre.": "Track workload, sent offers and conversion by member.",
  "Retrouvez les profils importants pour vos suivis.": "Find important profiles for your follow-ups.",
  "Consultez votre plan, vos factures et vos options.": "View your plan, invoices and options.",
  "Gérez votre profil, vos accès et vos préférences.": "Manage your profile, access and preferences.",
  "Employés": "Employees",
  "Équipe": "Team",
  "Manager": "Manager",
  "Inviter employé": "Invite employee",
  "Profils sauvegardés": "Saved profiles",
  "Tracking demandes": "Request tracking",
  "Subscriptions & plans": "Subscriptions & plans",
  "Audit logs": "Audit logs",
  "Settings": "Settings",
  "Historique des actions clés de la plateforme.": "History of key platform actions.",
  "Configuration générale de la plateforme.": "General platform configuration.",
  "Métriques par domaine": "Metrics by sector",
  "Métriques par compagnie": "Metrics by company",
  "Lecture business": "Business reading",
  "Traitement": "Processing",
  "Closing": "Closing",
  "Utilisation": "Usage",
  "Document PDF généré à partir des métriques affichées dans le dashboard selon la sélection courante.": "PDF document generated from dashboard metrics based on the current selection.",
  "Ce document sert à exporter les données du dashboard sous format PDF/tableaux, pas à créer un nouveau dashboard.": "This document exports dashboard data as PDF/tables, not a new dashboard.",
  "Le taux de traitement mesure les demandes reçues qui ont réellement reçu une offre.": "Processing rate measures received requests that actually received an offer.",
  "Le closing est calculé sur les offres acceptées divisées par les offres envoyées.": "Closing is calculated as accepted offers divided by sent offers.",
  "Aucune donnée": "No data",
  "Aucun résultat": "No result",
  "Aucun document": "No document",
  "Enregistrer": "Save",
  "Confirmer": "Confirm",
  "Réinitialiser": "Reset",
  "Rechercher": "Search",
  "Filtrer": "Filter",
  "Résultats": "Results",
  "Aujourd’hui": "Today",
  "Ce mois": "This month",
  "Cette année": "This year",
  "12 mois": "12 months",
  "90 jours": "90 days",
  "Fr": "Fr",
  "FR": "FR",
  "EN": "EN"
};

const translateConnectiaText = (value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (CONNECTIA_FR_EN[trimmed]) return value.replace(trimmed, CONNECTIA_FR_EN[trimmed]);
  let translated = trimmed;
  Object.keys(CONNECTIA_FR_EN)
    .filter((key) => key.length > 2 && translated.includes(key))
    .sort((a, b) => b.length - a.length)
    .forEach((key) => {
      translated = translated.split(key).join(CONNECTIA_FR_EN[key]);
    });
  return value.replace(trimmed, translated);
};

function useConnectiaLanguage(language) {
  useEffect(() => {
    const root = document.querySelector("[data-connectia-root]");
    if (!root || language !== "en") return undefined;
    let frame = null;
    const translateDom = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        const next = translateConnectiaText(node.nodeValue);
        if (next !== node.nodeValue) node.nodeValue = next;
      });
      root.querySelectorAll("input, textarea, button, [aria-label], [title]").forEach((el) => {
        ["placeholder", "aria-label", "title"].forEach((attr) => {
          const value = el.getAttribute(attr);
          if (value) {
            const next = translateConnectiaText(value);
            if (next !== value) el.setAttribute(attr, next);
          }
        });
      });
    };
    const schedule = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(translateDom);
    };
    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "aria-label", "title"] });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [language]);
}

const ROLES = {
  USER: "user",
  ORG: "org",
  ADMIN: "admin",
};

const COLORS = {
  navy: "#061827",
  navy2: "#0B2235",
  navy3: "#102B40",
  orange: "#FF7A1A",
  orange2: "#D95500",
  cream: "#F4EFE9",
  bg: "#F7F5F2",
  card: "#FFFFFF",
  soft: "#F7F5F2",
  text: "#102132",
};

const profilePhoto = (name, bg = "062238", fg = "ffffff") => {
  const initials = String(name || "?").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23${bg}'/><stop offset='1' stop-color='%230B2E4A'/></linearGradient></defs><rect width='160' height='160' rx='42' fill='url(%23g)'/><circle cx='118' cy='38' r='24' fill='rgba(255,255,255,0.16)'/><circle cx='42' cy='126' r='34' fill='rgba(255,255,255,0.10)'/><text x='50%' y='54%' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-size='54' font-weight='800' fill='%23${fg}'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const userPhoto = () => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><rect width='160' height='160' rx='80' fill='%23F3F4F6'/><circle cx='80' cy='66' r='34' fill='%23F58A07' opacity='0.18'/><circle cx='80' cy='60' r='26' fill='%23F58A07'/><path d='M36 145c7-34 27-54 44-54s37 20 44 54' fill='%23062238'/><circle cx='70' cy='61' r='3' fill='white'/><circle cx='90' cy='61' r='3' fill='white'/><path d='M70 74c7 6 14 6 21 0' stroke='white' stroke-width='4' stroke-linecap='round' fill='none'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const CANADA_PROVINCES = ["Toutes les provinces", "Québec", "Ontario", "Alberta", "Colombie-Britannique", "Manitoba", "Saskatchewan", "Nouvelle-Écosse", "Nouveau-Brunswick", "Terre-Neuve-et-Labrador", "Île-du-Prince-Édouard", "Territoires du Nord-Ouest", "Yukon", "Nunavut"];
const WORLD_COUNTRIES = ["Canada", "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Bahreïn", "Bangladesh", "Belgique", "Bénin", "Brésil", "Bulgarie", "Burkina Faso", "Cameroun", "Chili", "Chine", "Colombie", "Congo", "Corée du Sud", "Côte d’Ivoire", "Croatie", "Danemark", "Égypte", "Émirats arabes unis", "Espagne", "États-Unis", "Finlande", "France", "Gabon", "Ghana", "Grèce", "Guinée", "Haïti", "Inde", "Indonésie", "Irak", "Irlande", "Italie", "Japon", "Jordanie", "Kenya", "Koweït", "Liban", "Libye", "Luxembourg", "Madagascar", "Mali", "Maroc", "Maurice", "Mexique", "Niger", "Nigeria", "Norvège", "Pakistan", "Pays-Bas", "Philippines", "Pologne", "Portugal", "Qatar", "République démocratique du Congo", "Roumanie", "Royaume-Uni", "Russie", "Sénégal", "Serbie", "Suède", "Suisse", "Syrie", "Togo", "Tunisie", "Turquie", "Ukraine", "Vietnam", "Autre pays / saisir"]; 
const JOB_TITLES = ["Mécanicien poids lourds", "Mécanicien automobile", "Carrossier", "Soudeur", "Monteur-assembleur", "Électricien", "Plombier", "Charpentier-menuisier", "Peintre industriel", "Opérateur de machine", "Technicien maintenance", "Machiniste CNC", "Électromécanicien", "Technicien HVAC", "Chauffeur camion", "Chauffeur classe 1", "Livreur", "Magasinier", "Préparateur commandes", "Cariste", "Cuisinier", "Chef cuisinier", "Boulanger", "Pâtissier", "Serveur", "Réceptionniste hôtel", "Préposé entretien ménager", "Agent sécurité", "Préposé aux bénéficiaires", "Infirmier", "Infirmier auxiliaire", "Assistant dentaire", "Hygiéniste dentaire", "Technicien laboratoire", "Pharmacien", "Développeur logiciel", "Développeur web", "Développeur mobile", "Analyste QA", "Analyste d’affaires", "Scrum master", "Product owner", "Technicien support IT", "Administrateur système", "Administrateur réseau", "Cybersécurité", "Data analyst", "Designer UX/UI", "Comptable", "Technicien comptable", "Contrôleur financier", "Agent administratif", "Adjoint administratif", "Service client", "Représentant ventes", "Vendeur", "Marketing digital", "Gestionnaire réseaux sociaux", "Éducatrice petite enfance", "Enseignant", "Tuteur", "Ingénieur", "Technicien génie civil", "Dessinateur industriel", "Architecte", "Gestionnaire projet", "Ouvrier agricole", "Technicien agricole", "Coiffeur", "Esthéticienne", "Nettoyage commercial", "Déménageur", "Autre métier / saisir"]; 

const OFFER_FORM_CONFIG = {
  realEstate: {
    title: "Offre immobilière",
    primaryLabel: "Loyer / prix proposé",
    benchmarkLabel: "Référence marché",
    primaryPriceKey: "rent",
    fields: [
      { key: "propertyType", label: "Type de bien", type: "select", options: ["Studio", "1 chambre", "2 chambres", "3 chambres+", "Maison", "Condo", "Commercial"] },
      { key: "address", label: "Adresse / secteur", type: "text", placeholder: "Ex: Métro Peel, Centre-ville" },
      { key: "rent", label: "Loyer / prix proposé", type: "number", placeholder: "1690" },
      { key: "bedrooms", label: "Chambres", type: "select", options: ["Studio", "1", "2", "3+"] },
      { key: "furnished", label: "Meublé", type: "select", options: ["Oui", "Non", "Semi-meublé"] },
      { key: "heatingIncluded", label: "Chauffage inclus", type: "select", options: ["Oui", "Non", "À confirmer"] },
      { key: "availability", label: "Disponibilité", type: "date" },
      { key: "leaseDuration", label: "Durée du bail", type: "select", options: ["Court terme", "6 mois", "12 mois", "Long terme", "Flexible"] },
      { key: "distanceMetro", label: "Distance métro / transport", type: "select", options: ["< 5 min", "5-10 min", "10-15 min", "Bus proche", "Stationnement inclus"] },
      { key: "included", label: "Inclusions", type: "select", options: ["Chauffage", "Eau chaude", "Internet", "Stationnement", "Tout inclus", "Aucune"] },
      { key: "docsRequired", label: "Documents demandés", type: "multiselect", options: ["Pièce d’identité", "Preuve de revenus", "Preuve d’emploi", "Références", "Rapport de crédit", "Garant si nécessaire"] },
      { key: "visitMode", label: "Visite", type: "select", options: ["Présentiel", "Virtuelle", "Les deux"] },
      { key: "pets", label: "Animaux", type: "select", options: ["Acceptés", "Non", "À confirmer"] },
    ],
    photoSupport: true,
    photoTips: ["Façade", "Salon", "Chambre", "Cuisine", "Salle de bain", "Vue / balcon"],
    pros: ["Disponible à la bonne date", "Prix aligné au budget", "Quartier demandé", "Informations complètes"],
  },
  jobs: {
    title: "Offre emploi / recrutement",
    primaryLabel: "Salaire proposé",
    benchmarkLabel: "Salaire marché",
    primaryPriceKey: "wage",
    fields: [
      { key: "jobTitle", label: "Poste proposé", type: "text", placeholder: "Mécanicien poids lourds" },
      { key: "wage", label: "Salaire horaire", type: "number", placeholder: "34.65" },
      { key: "contract", label: "Type de contrat", type: "select", options: ["Temps plein", "Temps partiel", "Contrat", "Permanent", "Temporaire"] },
      { key: "location", label: "Lieu", type: "select", options: ["Montréal", "Québec", "Laval", "Ontario", "Alberta", "Remote / hybride"] },
      { key: "startDate", label: "Date de début", type: "select", options: ["Immédiate", "Dans 2 semaines", "Dans 1 mois", "Flexible"] },
      { key: "lmia", label: "Support EIMT / permis", type: "select", options: ["Oui", "Non", "À valider", "Candidat déjà autorisé"] },
      { key: "interviewDelay", label: "Délai entrevue", type: "select", options: ["48h", "7 jours", "2 semaines", "À planifier"] },
      { key: "benefits", label: "Avantages", type: "select", options: ["Assurances", "Formation", "Transport", "Logement temporaire", "Aucun", "À discuter"] },
      { key: "docsRequired", label: "Documents demandés", type: "multiselect", options: ["CV", "Diplôme", "Attestations d’expérience", "Passeport", "Permis / statut", "Certificats métier"] },
    ],
    pros: ["Salaire compétitif", "Poste temps plein", "Délai d’entrevue clair", "Support permis précisé"],
  },
  immigration: {
    title: "Offre immigration",
    primaryLabel: "Frais professionnels",
    benchmarkLabel: "Frais moyens",
    primaryPriceKey: "fees",
    fields: [
      { key: "service", label: "Service proposé", type: "select", options: ["Consultation", "Analyse dossier", "Permis de travail", "Permis d’études", "Résidence permanente", "Parrainage"] },
      { key: "fees", label: "Frais", type: "number", placeholder: "450" },
      { key: "consultantStatus", label: "Statut consultant", type: "select", options: ["CRIC", "Avocat", "Conseiller autorisé", "Partenaire référé"] },
      { key: "analysisDelay", label: "Délai d’analyse", type: "select", options: ["24h", "48h", "7 jours", "2 semaines"] },
      { key: "strategy", label: "Stratégie", type: "select", options: ["Entrée Express", "Programme provincial", "Permis temporaire", "Études", "À déterminer après analyse"] },
      { key: "nextStep", label: "Prochaine étape", type: "select", options: ["Consultation vidéo", "Analyse documents", "Plan d’action", "Soumission dossier"] },
      { key: "docsRequired", label: "Documents demandés", type: "multiselect", options: ["Passeport", "CV", "Diplômes", "Tests de langue", "Statut actuel", "Expériences", "Refus antérieurs si applicable"] },
    ],
    pros: ["Consultant autorisé", "Stratégie claire", "Délai d’analyse précis", "Prochaine étape définie"],
  },
  insurance: {
    title: "Offre assurance",
    primaryLabel: "Prime mensuelle",
    benchmarkLabel: "Prime moyenne",
    primaryPriceKey: "monthlyPremium",
    fields: [
      { key: "insuranceType", label: "Produit", type: "select", options: ["Auto", "Habitation", "Auto + habitation", "Entreprise"] },
      { key: "monthlyPremium", label: "Prime mensuelle", type: "number", placeholder: "112" },
      { key: "coverage", label: "Couverture", type: "select", options: ["Basique", "Standard", "Complète", "Personnalisée"] },
      { key: "deductible", label: "Franchise", type: "select", options: ["250$", "500$", "1000$", "À choisir"] },
      { key: "activation", label: "Activation", type: "select", options: ["Aujourd’hui", "24h", "Cette semaine", "Date flexible"] },
      { key: "payment", label: "Paiement", type: "select", options: ["Mensuel", "Annuel", "Deux options"] },
      { key: "exclusions", label: "Exclusions importantes", type: "text", placeholder: "Ex: usage commercial non inclus" },
      { key: "docsRequired", label: "Documents demandés", type: "multiselect", options: ["Pièce d’identité", "Permis", "Adresse", "Informations véhicule/logement", "Historique assurance", "Preuve d’achat si applicable"] },
    ],
    pros: ["Prime compétitive", "Couverture claire", "Activation rapide", "Franchise adaptée"],
  },
  auto: {
    title: "Offre auto",
    primaryLabel: "Prix / mensualité",
    benchmarkLabel: "Prix marché",
    primaryPriceKey: "vehiclePrice",
    fields: [
      { key: "vehicle", label: "Véhicule proposé", type: "text", placeholder: "Toyota RAV4 2022" },
      { key: "vehiclePrice", label: "Prix véhicule", type: "number", placeholder: "31900" },
      { key: "monthlyPayment", label: "Paiement mensuel", type: "number", placeholder: "489" },
      { key: "year", label: "Année", type: "number", placeholder: "2022" },
      { key: "mileage", label: "Kilométrage", type: "number", placeholder: "52000" },
      { key: "financing", label: "Financement", type: "select", options: ["Disponible", "Préautorisation requise", "Comptant", "Leasing"] },
      { key: "warranty", label: "Garantie", type: "select", options: ["Incluse", "Optionnelle", "Constructeur", "Aucune"] },
      { key: "availability", label: "Disponibilité", type: "select", options: ["Immédiate", "Cette semaine", "Sur commande"] },
      { key: "tradeIn", label: "Reprise", type: "select", options: ["Acceptée", "Non", "À évaluer"] },
      { key: "docsRequired", label: "Documents demandés", type: "multiselect", options: ["Permis", "Preuve de revenus", "Preuve d’adresse", "Préautorisation", "Informations reprise", "Assurance actuelle"] },
    ],
    pros: ["Prix compétitif", "Mensualité claire", "Garantie précisée", "Disponibilité confirmée"],
  },
};

const REQUEST_BUDGET_LABELS = {
  realEstate: { min: "Budget logement minimum", max: "Budget logement maximum", defaultMin: 1200, defaultMax: 1800 },
  immigration: { min: "Budget accompagnement minimum", max: "Budget accompagnement maximum", defaultMin: 250, defaultMax: 1500 },
  insurance: { min: "Prime mensuelle minimum", max: "Prime mensuelle maximum", defaultMin: 60, defaultMax: 180 },
  auto: { min: "Budget auto minimum", max: "Budget auto maximum", defaultMin: 10000, defaultMax: 35000 },
};

function getDefaultBudgetRange(sector) {
  const config = REQUEST_BUDGET_LABELS[sector] || REQUEST_BUDGET_LABELS.realEstate;
  return { min: config.defaultMin, max: config.defaultMax };
}

function getRequestBudgetLabels(sector) {
  return REQUEST_BUDGET_LABELS[sector] || REQUEST_BUDGET_LABELS.realEstate;
}

function getRequestValueMode(sector, requestType) {
  if (sector === "jobs") return { mode: "none", label: "Salaire souhaité", detailKey: "salaryExpectation" };
  if (sector === "realEstate" && requestType === "Location") return { mode: "range", label: "Budget logement" };
  if (sector === "realEstate" && requestType === "Achat") return { mode: "range", label: "Budget achat" };
  if (sector === "realEstate" && requestType === "Mise en location") return { mode: "field", label: "Loyer souhaité", detailKey: "desiredRent" };
  if (sector === "realEstate" && requestType === "Vente") return { mode: "field", label: "Prix de vente visé", detailKey: "targetSalePrice" };
  if (sector === "auto" && ["Achat", "Financement"].includes(requestType)) return { mode: "range", label: "Budget véhicule" };
  if (sector === "auto" && ["Leasing", "Location long terme"].includes(requestType)) return { mode: "field", label: "Mensualité cible", detailKey: "monthlyTarget" };
  if (sector === "auto" && requestType === "Location court terme") return { mode: "field", label: "Durée / budget location", detailKey: "rentalDays" };
  if (sector === "auto" && ["Vente véhicule", "Reprise / échange"].includes(requestType)) return { mode: "field", label: "Prix souhaité / valeur reprise", detailKey: "targetSalePrice" };
  if (sector === "insurance") return { mode: "range", label: "Prime mensuelle souhaitée" };
  if (sector === "immigration") return { mode: "range", label: "Budget accompagnement" };
  return { mode: "range", label: "Budget" };
}

function fieldMatchesCondition(field, context = {}) {
  if (!field?.conditional) return true;
  const conditional = field.conditional;
  const watchedValue = conditional.key === "requestType" ? context.requestType : context.values?.[conditional.key];
  if (conditional.includes) return conditional.includes.includes(watchedValue);
  if (conditional.equals !== undefined) return watchedValue === conditional.equals;
  if (conditional.notEquals !== undefined) return watchedValue !== conditional.notEquals;
  return Boolean(watchedValue);
}

function getVisibleRequestFields(sector, requestType, values = {}) {
  const config = REQUEST_FORM_CONFIG[sector] || REQUEST_FORM_CONFIG.realEstate;
  return config.fields.filter((field) => fieldMatchesCondition(field, { requestType, values }));
}

function cleanRequestFieldValues(sector, requestType, values = {}) {
  const visibleKeys = new Set(getVisibleRequestFields(sector, requestType, values).flatMap((field) => [field.key, field.customKey].filter(Boolean)));
  return Object.fromEntries(Object.entries(values).filter(([key]) => visibleKeys.has(key)));
}

function shouldAskTargetProvince(sector, requestType, values = {}) {
  if (sector === "jobs") return true;
  if (sector === "immigration") return ["Venir au Canada", "Travailler au Canada", "Étudier au Canada", "Obtenir la résidence permanente", "Faire venir un proche"].includes(values.immigrationGoal);
  if (sector === "insurance") return true;
  if (sector === "auto") return !["Vente véhicule"].includes(requestType);
  if (sector === "realEstate") return ["Location", "Achat"].includes(requestType);
  return true;
}

function requestMainValue(request) {
  const mode = getRequestValueMode(request?.sector, requestTypeLabel(request?.sector, request?.type));
  if (mode.mode === "none") return request?.details?.[mode.detailKey] || "À discuter";
  if (mode.mode === "field") return request?.details?.[mode.detailKey] || "À estimer";
  return `${fmt(request?.budgetMin, request?.currency)} - ${fmt(request?.budgetMax, request?.currency)}`;
}

const REQUEST_FORM_CONFIG = {
  jobs: {
    title: "Demande emploi",
    requestTypes: ["Recherche emploi"],
    fields: [
      { key: "profileType", label: "Vous êtes", type: "select", options: ["Candidat au Canada", "Candidat à l’étranger", "Nouvel arrivant", "Étudiant / diplômé", "Travailleur temporaire"] },
      { key: "jobTitle", label: "Métier / poste ciblé", type: "combo", options: JOB_TITLES, customKey: "jobTitleCustom", customPlaceholder: "Saisir votre métier" },
      { key: "experience", label: "Années d’expérience", type: "select", options: ["0-2 ans", "3-5 ans", "5-10 ans", "10+ ans"] },
      { key: "currentLocation", label: "Localisation actuelle", type: "combo", options: WORLD_COUNTRIES, customKey: "currentLocationCustom", customPlaceholder: "Saisir votre pays actuel" },
      { key: "city", label: "Ville actuelle au Canada", type: "text", placeholder: "Ex: Montréal", conditional: { key: "currentLocation", equals: "Canada" } },
      { key: "targetProvince", label: "Province visée", type: "select", options: CANADA_PROVINCES },
      { key: "diploma", label: "Niveau / diplôme", type: "select", options: ["DEP", "DEC", "Baccalauréat", "Master", "Certificat professionnel", "Sans diplôme", "Autre"] },
      { key: "language", label: "Langues de travail", type: "select", options: ["Français", "Anglais", "Français + Anglais", "Français débutant", "Anglais débutant"] },
      { key: "permitStatus", label: "Statut / permis", type: "select", options: ["Citoyen/RP", "Permis de travail", "Permis d’études", "À l’étranger - besoin support", "Je ne sais pas"] },
      { key: "permitSupport", label: "Besoin EIMT / permis", type: "select", options: ["Oui", "Non", "À discuter", "Déjà autorisé à travailler"] },
      { key: "salaryExpectation", label: "Salaire souhaité", type: "select", options: ["Moins de 25 CAD/h", "25-35 CAD/h", "35-45 CAD/h", "45+ CAD/h", "À discuter"] },
      { key: "availability", label: "Disponibilité", type: "select", options: ["Immédiate", "Dans 1 mois", "Dans 2-3 mois", "Flexible"] },
      { key: "availabilityDate", label: "Date de disponibilité", type: "date" },
      { key: "interviewMode", label: "Entrevue possible", type: "select", options: ["Vidéo", "Téléphone", "Présentiel", "Tous"] },
    ],
    documents: ["CV", "Diplôme", "Attestations d’expérience", "Passeport", "Permis / statut", "Certificats métier"],
    providerOfferFocus: ["Salaire", "Type de contrat", "Support permis/EIMT", "Délai d’entrevue", "Lieu", "Date de début"],
  },
  realEstate: {
    title: "Demande immobilière",
    requestTypes: ["Location", "Achat", "Mise en location", "Vente"],
    fields: [
      { key: "city", label: "Ville / secteur recherché", type: "select", options: ["Montréal", "Laval", "Longueuil", "Québec", "Toronto", "Ottawa", "Flexible"], conditional: { key: "requestType", includes: ["Location", "Achat"] } },
      { key: "searchDate", label: "Date recherchée", type: "date", conditional: { key: "requestType", includes: ["Location", "Achat"] } },
      { key: "neighborhood", label: "Quartier préféré", type: "select", options: ["Centre-ville", "Griffintown", "Plateau", "Rosemont", "Laval", "Proche métro", "Peu importe"], conditional: { key: "requestType", includes: ["Location", "Achat"] } },

      { key: "rentalPropertyType", label: "Type de logement recherché", type: "select", options: ["Studio", "1 chambre", "2 chambres", "3 chambres+", "Maison", "Condo", "Peu importe"], conditional: { key: "requestType", includes: ["Location"] } },
      { key: "moveIn", label: "Date d’entrée souhaitée", type: "select", options: ["Immédiate", "Dans 30 jours", "Dans 2 mois", "Flexible"], conditional: { key: "requestType", includes: ["Location"] } },
      { key: "leaseDuration", label: "Durée souhaitée", type: "select", options: ["Court terme", "6 mois", "12 mois", "Long terme", "Flexible"], conditional: { key: "requestType", includes: ["Location"] } },
      { key: "furnished", label: "Meublé", type: "select", options: ["Oui", "Non", "Semi-meublé", "Flexible"], conditional: { key: "requestType", includes: ["Location"] } },
      { key: "included", label: "Inclusions importantes", type: "select", options: ["Chauffage", "Eau chaude", "Internet", "Stationnement", "Tout inclus", "Peu importe"], conditional: { key: "requestType", includes: ["Location"] } },
      { key: "transport", label: "Transport", type: "select", options: ["Métro < 5 min", "Métro < 10 min", "Bus proche", "Stationnement requis", "Peu importe"], conditional: { key: "requestType", includes: ["Location"] } },
      { key: "pets", label: "Animaux", type: "select", options: ["Aucun", "Chat", "Chien", "À confirmer"], conditional: { key: "requestType", includes: ["Location"] } },
      { key: "creditCheck", label: "Vérification crédit", type: "select", options: ["Disponible", "Pas disponible", "Garant possible", "À discuter"], conditional: { key: "requestType", includes: ["Location"] } },

      { key: "buyPropertyType", label: "Type de bien recherché", type: "select", options: ["Condo", "Maison", "Duplex / Triplex", "Plex", "Terrain", "Commercial", "Peu importe"], conditional: { key: "requestType", includes: ["Achat"] } },
      { key: "bedroomsMin", label: "Nombre de chambres minimum", type: "select", options: ["Studio", "1+", "2+", "3+", "4+", "Flexible"], conditional: { key: "requestType", includes: ["Achat"] } },
      { key: "purchasePurpose", label: "Objectif d’achat", type: "select", options: ["Résidence principale", "Investissement", "Premier achat", "Revente future", "Commercial"], conditional: { key: "requestType", includes: ["Achat"] } },
      { key: "mortgagePreApproval", label: "Préapprobation hypothécaire", type: "select", options: ["Oui", "Non", "En cours", "Besoin d’aide"], conditional: { key: "requestType", includes: ["Achat"] } },
      { key: "downPayment", label: "Mise de fonds disponible", type: "select", options: ["Moins de 5%", "5-10%", "10-20%", "20%+", "À confirmer"], conditional: { key: "requestType", includes: ["Achat"] } },
      { key: "occupancyDate", label: "Date d’occupation souhaitée", type: "select", options: ["Immédiate", "1-3 mois", "3-6 mois", "Flexible"], conditional: { key: "requestType", includes: ["Achat"] } },
      { key: "parkingNeeded", label: "Stationnement requis", type: "select", options: ["Oui", "Non", "Idéalement", "Peu importe"], conditional: { key: "requestType", includes: ["Achat"] } },
      { key: "mustHave", label: "Critère essentiel", type: "select", options: ["Prix", "Localisation", "Transport", "Écoles", "Stationnement", "Investissement rentable"], conditional: { key: "requestType", includes: ["Achat"] } },

      { key: "ownerPropertyType", label: "Type de bien à louer", type: "select", options: ["Studio", "Appartement", "Condo", "Maison", "Chambre", "Commercial"], conditional: { key: "requestType", includes: ["Mise en location"] } },
      { key: "propertyAddressArea", label: "Adresse / secteur du bien", type: "text", placeholder: "Ex: Centre-ville Montréal", conditional: { key: "requestType", includes: ["Mise en location", "Vente"] } },
      { key: "ownerBedrooms", label: "Chambres du bien", type: "select", options: ["Studio", "1", "2", "3", "4+"], conditional: { key: "requestType", includes: ["Mise en location", "Vente"] } },
      { key: "desiredRent", label: "Loyer souhaité", type: "select", options: ["À estimer", "Moins de 1200$", "1200-1800$", "1800-2500$", "2500$+"], conditional: { key: "requestType", includes: ["Mise en location"] } },
      { key: "availableDate", label: "Date de disponibilité du bien", type: "date", conditional: { key: "requestType", includes: ["Mise en location"] } },
      { key: "ownerFurnished", label: "Bien meublé", type: "select", options: ["Oui", "Non", "Semi-meublé"], conditional: { key: "requestType", includes: ["Mise en location"] } },
      { key: "petsAllowed", label: "Animaux acceptés", type: "select", options: ["Oui", "Non", "À décider"], conditional: { key: "requestType", includes: ["Mise en location"] } },
      { key: "tenantProfile", label: "Profil locataire souhaité", type: "select", options: ["Professionnel", "Étudiant", "Famille", "Peu importe", "À valider avec dossier"], conditional: { key: "requestType", includes: ["Mise en location"] } },
      { key: "managementHelp", label: "Besoin d’aide pour", type: "select", options: ["Trouver locataire", "Photos + annonce", "Vérification dossier", "Gestion complète", "Estimation loyer"], conditional: { key: "requestType", includes: ["Mise en location"] } },

      { key: "salePropertyType", label: "Type de bien à vendre", type: "select", options: ["Condo", "Maison", "Duplex / Triplex", "Plex", "Terrain", "Commercial"], conditional: { key: "requestType", includes: ["Vente"] } },
      { key: "targetSalePrice", label: "Prix de vente visé", type: "select", options: ["À estimer", "Moins de 300k", "300k-500k", "500k-800k", "800k+"], conditional: { key: "requestType", includes: ["Vente"] } },
      { key: "sellingTimeline", label: "Délai de vente souhaité", type: "select", options: ["Urgent", "1-3 mois", "3-6 mois", "Pas pressé"], conditional: { key: "requestType", includes: ["Vente"] } },
      { key: "saleTargetDate", label: "Date recherchée pour vendre", type: "date", conditional: { key: "requestType", includes: ["Vente"] } },
      { key: "propertyCondition", label: "État du bien", type: "select", options: ["Excellent", "Bon", "À rénover", "À évaluer"], conditional: { key: "requestType", includes: ["Vente"] } },
      { key: "valuationNeeded", label: "Besoin d’une estimation", type: "select", options: ["Oui", "Non", "Je veux comparer plusieurs avis"], conditional: { key: "requestType", includes: ["Vente"] } },
      { key: "occupancyStatus", label: "Occupation actuelle", type: "select", options: ["Occupé par propriétaire", "Loué", "Vacant", "À confirmer"], conditional: { key: "requestType", includes: ["Vente"] } },

      { key: "visitMode", label: "Visite / contact souhaité", type: "select", options: ["Présentiel", "Virtuelle", "Les deux", "Appel d’abord"], conditional: { key: "requestType", includes: ["Location", "Achat", "Mise en location", "Vente"] } },
    ],
    documents: ["Pièce d’identité", "Preuve de revenus si location", "Références si location", "Rapport de crédit si location", "Préapprobation hypothécaire si achat", "Photos du bien si propriétaire", "Compte de taxes si vente", "Bail actuel si bien loué"],
    providerOfferFocus: ["Loyer/prix", "Disponibilité", "Quartier", "Inclusions", "Documents demandés", "Flexibilité du bail"],
  },
  immigration: {
    title: "Demande immigration",
    requestTypes: ["Nouvelle demande", "Renouvellement", "Prolongation"],
    fields: [
      { key: "immigrationGoal", label: "Objectif principal", type: "select", options: ["Venir au Canada", "Rester au Canada", "Travailler au Canada", "Étudier au Canada", "Obtenir la résidence permanente", "Faire venir un proche", "Corriger / réviser un dossier"] },
      { key: "currentCountry", label: "Pays actuel", type: "combo", options: WORLD_COUNTRIES, customKey: "currentCountryCustom", customPlaceholder: "Saisir votre pays actuel" },
      { key: "insideCanada", label: "Êtes-vous actuellement au Canada?", type: "select", options: ["Oui", "Non"] },
      { key: "canadaProvince", label: "Province actuelle au Canada", type: "select", options: CANADA_PROVINCES, conditional: { key: "insideCanada", equals: "Oui" } },
      { key: "canadaCity", label: "Ville actuelle au Canada", type: "text", placeholder: "Ex: Montréal", conditional: { key: "insideCanada", equals: "Oui" } },
      { key: "hasCurrentStatus", label: "Avez-vous déjà un statut au Canada?", type: "select", options: ["Oui", "Non", "Je ne sais pas"], conditional: { key: "insideCanada", equals: "Oui" } },
      { key: "statusCanada", label: "Statut actuel au Canada", type: "select", options: ["Visiteur", "Étudiant", "Travailleur", "Statut maintenu", "Statut expiré", "Résident permanent", "Citoyen"], conditional: { key: "hasCurrentStatus", equals: "Oui" } },
      { key: "statusExpiry", label: "Date de fin du statut", type: "date", conditional: { key: "hasCurrentStatus", equals: "Oui" } },
      { key: "hasJobOffer", label: "Avez-vous une offre d’emploi?", type: "select", options: ["Oui", "Non", "En discussion", "Je cherche un employeur"] },
      { key: "jobOfferProvince", label: "Province de l’emploi", type: "select", options: CANADA_PROVINCES, conditional: { key: "hasJobOffer", includes: ["Oui", "En discussion"] } },
      { key: "lmiaStatus", label: "EIMT / LMIA", type: "select", options: ["Déjà approuvée", "En cours", "Employeur ouvert à le faire", "Non", "Je ne sais pas"], conditional: { key: "hasJobOffer", includes: ["Oui", "En discussion", "Je cherche un employeur"] } },
      { key: "nocJob", label: "Métier / CNP approximatif", type: "combo", options: JOB_TITLES, customKey: "nocJobCustom", customPlaceholder: "Saisir le métier ou code CNP", conditional: { key: "hasJobOffer", includes: ["Oui", "En discussion", "Je cherche un employeur"] } },
      { key: "studyLevel", label: "Niveau d’études visé", type: "select", options: ["DEP", "DEC / Collégial", "Baccalauréat", "Maîtrise", "Doctorat", "Formation courte", "Non applicable"], conditional: { key: "immigrationGoal", includes: ["Étudier au Canada"] } },
      { key: "hasSchoolAcceptance", label: "Admission dans une école?", type: "select", options: ["Oui", "Non", "En attente", "Je cherche une école"], conditional: { key: "immigrationGoal", includes: ["Étudier au Canada"] } },
      { key: "tuitionBudget", label: "Budget études / preuve financière", type: "select", options: ["Moins de 10k CAD", "10k-20k CAD", "20k-40k CAD", "40k+ CAD", "À valider"], conditional: { key: "immigrationGoal", includes: ["Étudier au Canada"] } },
      { key: "familyRelation", label: "Lien familial", type: "select", options: ["Époux / conjoint", "Enfant", "Parent / grand-parent", "Frère / sœur", "Autre proche"], conditional: { key: "immigrationGoal", includes: ["Faire venir un proche"] } },
      { key: "sponsorStatus", label: "Statut du répondant au Canada", type: "select", options: ["Citoyen canadien", "Résident permanent", "Permis temporaire", "Je ne sais pas"], conditional: { key: "immigrationGoal", includes: ["Faire venir un proche"] } },
      { key: "previousRefusal", label: "Avez-vous déjà eu un refus?", type: "select", options: ["Non", "Oui - visa visiteur", "Oui - permis d’études", "Oui - permis de travail", "Oui - RP", "Oui - autre"] },
      { key: "refusalDate", label: "Date approximative du refus", type: "select", options: ["Moins de 3 mois", "3-12 mois", "Plus d’un an", "Je ne sais pas"], conditional: { key: "previousRefusal", includes: ["Oui - visa visiteur", "Oui - permis d’études", "Oui - permis de travail", "Oui - RP", "Oui - autre"] } },
      { key: "refusalReason", label: "Raison principale du refus", type: "select", options: ["Finances", "Intention de retour", "Documents incomplets", "Lien familial / voyage", "Historique immigration", "Je ne sais pas"], conditional: { key: "previousRefusal", includes: ["Oui - visa visiteur", "Oui - permis d’études", "Oui - permis de travail", "Oui - RP", "Oui - autre"] } },
      { key: "education", label: "Plus haut niveau d’études", type: "select", options: ["Secondaire", "DEP / DEC", "Baccalauréat", "Maîtrise", "Doctorat", "Autre"] },
      { key: "workExperience", label: "Expérience professionnelle qualifiée", type: "select", options: ["0-1 an", "1-3 ans", "3-5 ans", "5+ ans", "10+ ans"] },
      { key: "languageTest", label: "Test de langue disponible", type: "select", options: ["TEF", "TCF", "IELTS", "CELPIP", "Aucun pour le moment", "Planifié"] },
      { key: "languageScore", label: "Niveau estimé français / anglais", type: "select", options: ["Français fort", "Anglais fort", "Français + Anglais", "Débutant", "À évaluer"] },
      { key: "family", label: "Situation familiale", type: "select", options: ["Seul(e)", "Marié(e) / conjoint", "Avec enfants", "Conjoint à inclure", "Famille complète"] },
      { key: "timeline", label: "Délai souhaité", type: "select", options: ["Urgent", "Ce mois", "1-3 mois", "3-6 mois", "Flexible"] },
      { key: "supportNeeded", label: "Besoin principal", type: "select", options: ["Choisir la meilleure stratégie", "Vérifier admissibilité", "Préparer les documents", "Corriger un refus", "Soumettre le dossier complet", "Consultation seulement"] },
    ],
    documents: ["Passeport", "CV", "Diplômes", "Relevés de notes", "Tests de langue", "Preuves d’expérience", "Statut actuel au Canada", "Offre d’emploi / EIMT si applicable", "Lettre d’admission si applicable", "Preuves financières", "Lettre de refus si applicable"],
    providerOfferFocus: ["Consultant réglementé", "Stratégie proposée", "Frais", "Délai d’analyse", "Documents", "Prochaine étape"],
  },
  insurance: {
    title: "Demande assurance",
    requestTypes: ["Comparer assurance"],
    fields: [
      { key: "insuranceType", label: "Type d’assurance", type: "select", options: ["Auto", "Habitation", "Auto + habitation", "Entreprise"] },
      { key: "province", label: "Province", type: "select", options: ["Québec", "Ontario", "Alberta", "Colombie-Britannique"] },
      { key: "startDate", label: "Date de début de l’assurance", type: "date" },
      { key: "currentInsured", label: "Situation actuelle", type: "select", options: ["Déjà assuré", "Non assuré", "Nouvel arrivant", "Je change d’assureur", "Première assurance"] },
      { key: "coverage", label: "Niveau de couverture souhaité", type: "select", options: ["Prix le plus bas", "Équilibré", "Protection complète", "Je veux comparer"] },
      { key: "payment", label: "Paiement préféré", type: "select", options: ["Mensuel", "Annuel", "Peu importe"] },

      { key: "driverAge", label: "Âge du conducteur principal", type: "select", options: ["Moins de 25 ans", "25-34 ans", "35-49 ans", "50+ ans"], conditional: { key: "insuranceType", includes: ["Auto", "Auto + habitation"] } },
      { key: "driverExperience", label: "Années de permis", type: "select", options: ["Moins de 2 ans", "2-5 ans", "5-10 ans", "10+ ans"], conditional: { key: "insuranceType", includes: ["Auto", "Auto + habitation"] } },
      { key: "vehicleYear", label: "Année du véhicule", type: "select", options: ["2024+", "2020-2023", "2015-2019", "Avant 2015", "Pas encore acheté"], conditional: { key: "insuranceType", includes: ["Auto", "Auto + habitation"] } },
      { key: "vehicleUse", label: "Usage du véhicule", type: "select", options: ["Personnel", "Travail", "Livraison / commercial", "Études", "Usage occasionnel"], conditional: { key: "insuranceType", includes: ["Auto", "Auto + habitation"] } },
      { key: "annualKm", label: "Kilométrage annuel estimé", type: "select", options: ["Moins de 10 000 km", "10 000-20 000 km", "20 000-30 000 km", "30 000+ km"], conditional: { key: "insuranceType", includes: ["Auto", "Auto + habitation"] } },
      { key: "parking", label: "Stationnement la nuit", type: "select", options: ["Garage privé", "Stationnement extérieur", "Rue", "Stationnement intérieur immeuble"], conditional: { key: "insuranceType", includes: ["Auto", "Auto + habitation"] } },
      { key: "autoClaims", label: "Réclamations / accidents auto", type: "select", options: ["Aucun", "1 réclamation", "2+ réclamations", "À préciser"], conditional: { key: "insuranceType", includes: ["Auto", "Auto + habitation"] } },

      { key: "homeStatus", label: "Statut du logement", type: "select", options: ["Locataire", "Propriétaire occupant", "Condo", "Maison", "Immeuble à revenus"], conditional: { key: "insuranceType", includes: ["Habitation", "Auto + habitation"] } },
      { key: "propertyTypeInsurance", label: "Type d’habitation", type: "select", options: ["Appartement", "Condo", "Maison unifamiliale", "Duplex / Triplex", "Commercial léger"], conditional: { key: "insuranceType", includes: ["Habitation", "Auto + habitation"] } },
      { key: "buildingYear", label: "Année de construction", type: "select", options: ["2020+", "2000-2019", "1980-1999", "Avant 1980", "Je ne sais pas"], conditional: { key: "insuranceType", includes: ["Habitation", "Auto + habitation"] } },
      { key: "homeValue", label: "Valeur des biens à assurer", type: "select", options: ["Moins de 25 000$", "25 000-50 000$", "50 000-100 000$", "100 000$+", "À estimer"], conditional: { key: "insuranceType", includes: ["Habitation", "Auto + habitation"] } },
      { key: "securitySystem", label: "Système de sécurité", type: "select", options: ["Alarme connectée", "Détecteurs fumée/eau", "Serrures sécurisées", "Aucun", "Je ne sais pas"], conditional: { key: "insuranceType", includes: ["Habitation", "Auto + habitation"] } },
      { key: "homeClaims", label: "Réclamations habitation", type: "select", options: ["Aucune", "Dégât d’eau", "Vol", "Incendie", "Autre / à préciser"], conditional: { key: "insuranceType", includes: ["Habitation", "Auto + habitation"] } },

      { key: "businessActivity", label: "Activité de l’entreprise", type: "text", placeholder: "Ex: consultant, commerce, entrepreneur", conditional: { key: "insuranceType", equals: "Entreprise" } },
      { key: "businessRevenue", label: "Chiffre d’affaires annuel", type: "select", options: ["Moins de 100k", "100k-500k", "500k-1M", "1M+", "Démarrage"], conditional: { key: "insuranceType", equals: "Entreprise" } },
      { key: "employeesCount", label: "Nombre d’employés", type: "select", options: ["0", "1-5", "6-20", "21+"], conditional: { key: "insuranceType", equals: "Entreprise" } },
      { key: "businessCoverageNeed", label: "Protection recherchée", type: "select", options: ["Responsabilité civile", "Locaux / biens", "Erreurs & omissions", "Cyber", "Package complet"], conditional: { key: "insuranceType", equals: "Entreprise" } },

      { key: "priority", label: "Priorité", type: "select", options: ["Prix le plus bas", "Meilleure couverture", "Activation rapide", "Conseil personnalisé"] },
    ],
    documents: ["Pièce d’identité", "Permis", "Informations véhicule", "Adresse du logement", "Historique assurance", "Preuve d’achat si applicable", "Bail / hypothèque si applicable"],
    providerOfferFocus: ["Prime mensuelle", "Couverture", "Franchise", "Exclusions", "Délai d’activation", "Documents"],
  },
  auto: {
    title: "Demande auto",
    requestTypes: ["Achat", "Financement", "Leasing", "Location court terme", "Location long terme", "Vente véhicule", "Reprise / échange"],
    fields: [
      { key: "city", label: "Ville / secteur recherché", type: "select", options: ["Montréal", "Laval", "Longueuil", "Québec", "Toronto", "Ottawa", "Flexible"], conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing", "Location court terme", "Location long terme"] } },
      { key: "vehicleType", label: "Type de véhicule recherché", type: "select", options: ["Berline", "SUV", "VUS compact", "Pickup", "Van", "Hybride", "Électrique", "Luxe", "Commercial", "Peu importe"], conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing", "Location court terme", "Location long terme"] } },
      { key: "condition", label: "État souhaité", type: "select", options: ["Neuf", "Occasion", "Les deux"], conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing"] } },
      { key: "brand", label: "Marque préférée", type: "combo", options: ["Toyota", "Honda", "Hyundai", "Kia", "Ford", "Chevrolet", "Nissan", "Mazda", "Volkswagen", "BMW", "Mercedes", "Audi", "Tesla", "Lexus", "Jeep", "Subaru", "Peu importe", "Autre marque / saisir"], customKey: "brandCustom", customPlaceholder: "Saisir la marque", conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing"] } },
      { key: "yearRange", label: "Année souhaitée", type: "select", options: ["2025+", "2020-2024", "2015-2019", "Avant 2015", "Peu importe"], conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing"] } },
      { key: "maxMileage", label: "Kilométrage maximum", type: "select", options: ["< 50 000 km", "< 100 000 km", "< 150 000 km", "Peu importe"], conditional: { key: "condition", includes: ["Occasion", "Les deux"] } },
      { key: "fuel", label: "Motorisation", type: "select", options: ["Essence", "Hybride", "Électrique", "Diesel", "Peu importe"], conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing", "Location court terme", "Location long terme"] } },
      { key: "vehicleUse", label: "Usage principal", type: "select", options: ["Personnel", "Famille", "Travail", "Uber / taxi", "Livraison", "Commercial"], conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing", "Location court terme", "Location long terme"] } },
      { key: "desiredAutoDate", label: "À partir de quand souhaitez-vous avoir votre auto?", type: "date", conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing", "Location court terme", "Location long terme"] } },
      { key: "monthlyTarget", label: "Mensualité cible", type: "select", options: ["< 300$/mois", "300-500$/mois", "500-750$/mois", "750$+/mois", "À discuter"], conditional: { key: "requestType", includes: ["Financement", "Leasing", "Location long terme"] } },
      { key: "downPayment", label: "Mise de fonds disponible", type: "select", options: ["0$", "< 1000$", "1000-3000$", "3000-5000$", "5000$+"], conditional: { key: "requestType", includes: ["Financement", "Leasing"] } },
      { key: "creditProfile", label: "Profil de crédit", type: "select", options: ["Excellent", "Bon", "Moyen", "Reconstruction", "Nouveau dossier", "Je ne sais pas"], conditional: { key: "requestType", includes: ["Financement", "Leasing"] } },
      { key: "loanTerm", label: "Durée souhaitée", type: "select", options: ["24 mois", "36 mois", "48 mois", "60 mois", "72 mois", "Flexible"], conditional: { key: "requestType", includes: ["Financement", "Leasing", "Location long terme"] } },
      { key: "rentalDates", label: "Dates de location", type: "text", placeholder: "Ex: 12 au 18 juin", conditional: { key: "requestType", includes: ["Location court terme"] } },
      { key: "rentalDays", label: "Nombre de jours", type: "select", options: ["1-2 jours", "3-7 jours", "1-2 semaines", "1 mois", "Flexible"], conditional: { key: "requestType", includes: ["Location court terme"] } },
      { key: "driverAge", label: "Âge du conducteur", type: "select", options: ["Moins de 25 ans", "25-34 ans", "35-49 ans", "50+ ans"], conditional: { key: "requestType", includes: ["Location court terme", "Location long terme"] } },
      { key: "licenseType", label: "Type de permis", type: "select", options: ["Permis canadien", "Permis international", "Permis étranger", "À valider"], conditional: { key: "requestType", includes: ["Location court terme", "Location long terme"] } },
      { key: "insuranceIncluded", label: "Assurance incluse souhaitée", type: "select", options: ["Oui", "Non", "À comparer"], conditional: { key: "requestType", includes: ["Location court terme", "Location long terme"] } },
      { key: "annualKm", label: "Kilométrage annuel", type: "select", options: ["10 000 km", "15 000 km", "20 000 km", "25 000+ km", "Flexible"], conditional: { key: "requestType", includes: ["Leasing", "Location long terme"] } },
      { key: "maintenanceIncluded", label: "Entretien inclus souhaité", type: "select", options: ["Oui", "Non", "À comparer"], conditional: { key: "requestType", includes: ["Location long terme", "Leasing"] } },
      { key: "hasTradeIn", label: "Avez-vous un véhicule à échanger?", type: "select", options: ["Oui", "Non", "Peut-être"], conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing", "Reprise / échange"] } },
      { key: "tradeBrand", label: "Marque du véhicule à échanger", type: "text", placeholder: "Ex: Honda", conditional: { key: "hasTradeIn", includes: ["Oui", "Peut-être"] } },
      { key: "tradeModelYear", label: "Modèle / année du véhicule à échanger", type: "text", placeholder: "Ex: Civic 2018", conditional: { key: "hasTradeIn", includes: ["Oui", "Peut-être"] } },
      { key: "tradeMileage", label: "Kilométrage du véhicule à échanger", type: "select", options: ["< 50 000 km", "50 000-100 000 km", "100 000-150 000 km", "150 000+ km"], conditional: { key: "hasTradeIn", includes: ["Oui", "Peut-être"] } },
      { key: "saleBrand", label: "Marque du véhicule à vendre", type: "combo", options: ["Toyota", "Honda", "Hyundai", "Kia", "Ford", "Chevrolet", "Nissan", "Mazda", "Volkswagen", "BMW", "Mercedes", "Audi", "Tesla", "Autre marque / saisir"], customKey: "saleBrandCustom", customPlaceholder: "Saisir la marque", conditional: { key: "requestType", includes: ["Vente véhicule"] } },
      { key: "saleModel", label: "Modèle", type: "text", placeholder: "Ex: Corolla LE", conditional: { key: "requestType", includes: ["Vente véhicule"] } },
      { key: "saleYear", label: "Année", type: "select", options: ["2024+", "2020-2023", "2015-2019", "2010-2014", "Avant 2010"], conditional: { key: "requestType", includes: ["Vente véhicule"] } },
      { key: "saleMileage", label: "Kilométrage", type: "select", options: ["< 50 000 km", "50 000-100 000 km", "100 000-150 000 km", "150 000+ km"], conditional: { key: "requestType", includes: ["Vente véhicule"] } },
      { key: "vehicleConditionSale", label: "État du véhicule", type: "select", options: ["Excellent", "Bon", "Réparations mineures", "Accidenté", "À évaluer"], conditional: { key: "requestType", includes: ["Vente véhicule"] } },
      { key: "targetSalePrice", label: "Prix souhaité", type: "select", options: ["À estimer", "< 5 000$", "5 000-10 000$", "10 000-20 000$", "20 000$+"], conditional: { key: "requestType", includes: ["Vente véhicule"] } },
      { key: "saleUrgency", label: "Urgence de vente", type: "select", options: ["Urgent", "Ce mois", "1-3 mois", "Pas pressé"], conditional: { key: "requestType", includes: ["Vente véhicule"] } },
      { key: "salePreference", label: "Préférence de vente", type: "select", options: ["Rachat concession", "Vente privée accompagnée", "Reprise pour achat", "Meilleure offre"], conditional: { key: "requestType", includes: ["Vente véhicule"] } },
      { key: "priority", label: "Priorité", type: "select", options: ["Prix le plus bas", "Paiement mensuel bas", "Garantie", "Disponibilité rapide", "Faible kilométrage", "Économie carburant"], conditional: { key: "requestType", includes: ["Achat", "Financement", "Leasing", "Location court terme", "Location long terme"] } }
    ],
    documents: ["Permis de conduire", "Preuve de revenus si financement", "Relevé de crédit si financement", "Preuve d’adresse", "Informations échange/reprise", "Photos véhicule si vente", "Certificat d’immatriculation si vente", "Historique Carfax si disponible"],
    providerOfferFocus: ["Prix", "Mensualité", "Année", "Kilométrage", "Garantie", "Financement", "Disponibilité"],
  },
};

const initialAppState = {
  currentRole: ROLES.USER,
  activeMenu: "userSignup",
  activeSector: "all",
  currentOrgUserId: "a2",
  currency: DEFAULT_CURRENCY,
  language: "fr",
  notifications: [
    { id: 1, type: "offer", text: "Nouvelle offre reçue pour Appartement 1 chambre", unread: true },
    { id: 2, type: "appointment", text: "Rendez-vous proposé par ImmoPro", unread: true },
    { id: 3, type: "doc", text: "Document demandé pour votre dossier immigration", unread: false },
  ],
  user: {
    id: "u1",
    name: "Raja Jendoubi",
    email: "raja@email.com",
    phone: "+1 514 000 0000",
    province: "Québec",
    city: "Montréal",
    avatar: "RJ",
    photoUrl: userPhoto(),
    profileCompletion: 78,
    preferredContact: "Email + in-app",
    language: "Français, Anglais, Arabe",
    memberSince: "2026-05-01",
    identityStatus: "Identité vérifiée",
    accountStatus: "Actif",
    preferredSectors: ["Immobilier", "Emploi", "Immigration"],
    savedOffers: ["off2"],
    savedProfiles: [],
  },
  organizations: [
    {
      id: "org1",
      name: "ImmoPro Montréal",
      sector: "realEstate",
      status: "verified",
      plan: "Premium",
      rating: 4.7,
      email: "contact@immopro.ca",
      phone: "+1 514 555 0190",
      website: "immopro.ca",
      contactPerson: "Marc D.",
      logoUrl: profilePhoto("ImmoPro Montréal", "062238"),
      city: "Montréal",
      provinceAccess: ["Québec"],
      domains: ["rental", "purchase"],
      verifiedAt: "2026-05-12",
      responsePolicy: "Réponse sous 24h",
      billingEmail: "billing@immopro.ca",
      availability: ["Lundi 10:00", "Mardi 14:30", "Jeudi 18:00", "Samedi 11:00"],
      offerTemplates: [
        { id: "tpl1", title: "Appartement 1 chambre meublé — Centre-ville", type: "Location", price: 1690, city: "Montréal", details: { propertyType: "1 chambre", furnished: "Oui", heatingIncluded: "Oui", distanceMetro: "< 5 min", docsRequired: ["Pièce d’identité", "Preuve de revenus"] }, scoreBoost: 8 },
        { id: "tpl2", title: "Studio meublé — Vieux-Montréal", type: "Location", price: 1610, city: "Montréal", details: { propertyType: "Studio", furnished: "Oui", heatingIncluded: "Non", distanceMetro: "5-10 min", docsRequired: ["Pièce d’identité", "Preuve de revenus"] }, scoreBoost: 4 },
      ],
      team: [
        { id: "a1", name: "Sofia A.", role: "Agent", email: "sofia@immopro.ca", photoUrl: profilePhoto("Sofia A.", "0B78A0"), status: "active", permissions: ["Demandes", "Messages", "RDV"], requests: 18, inProgress: 9, offersSent: 23, conversion: 31 },
        { id: "a2", name: "Marc D.", role: "Manager", email: "marc@immopro.ca", photoUrl: profilePhoto("Marc D.", "F58A07"), status: "active", permissions: ["Demandes", "Offres", "RDV", "Équipe", "Factures"], requests: 22, inProgress: 12, offersSent: 30, conversion: 37 },
      ],
      stats: { received: 245, treated: 198, inProgress: 32, offers: 152, accepted: 39, avgResponseHours: 3.2 },
    },
    {
      id: "org2",
      name: "TalentBridge Canada",
      sector: "jobs",
      status: "verified",
      plan: "Premium",
      rating: 4.8,
      email: "partners@talentbridge.ca",
      phone: "+1 438 555 0144",
      website: "talentbridge.ca",
      contactPerson: "Nadia K.",
      logoUrl: profilePhoto("TalentBridge Canada", "0B78A0"),
      city: "Montréal",
      provinceAccess: ["Québec", "Ontario"],
      domains: ["mechanic", "it", "healthcare"],
      verifiedAt: "2026-05-10",
      responsePolicy: "Réponse sous 48h",
      billingEmail: "finance@talentbridge.ca",
      availability: ["Lundi 09:30", "Mercredi 13:00", "Vendredi 15:00"],
      offerTemplates: [
        { id: "tpl3", title: "Poste mécanicien poids lourds — employeur partenaire", type: "Recherche emploi", price: 34.65, city: "Montréal", details: { jobTitle: "Mécanicien poids lourds", contract: "Temps plein", lmia: "À valider", interviewDelay: "7 jours" }, scoreBoost: 7 },
      ],
      team: [
        { id: "a3", name: "Nadia K.", role: "Recruiter", email: "nadia@talentbridge.ca", photoUrl: profilePhoto("Nadia K.", "14C9D6"), status: "active", permissions: ["Demandes", "Offres", "Messages", "RDV"], requests: 31, inProgress: 16, offersSent: 42, conversion: 28 },
        { id: "a4", name: "Omar B.", role: "Recruiter", email: "omar@talentbridge.ca", photoUrl: profilePhoto("Omar B.", "062238"), status: "active", permissions: ["Demandes", "Messages"], requests: 16, inProgress: 7, offersSent: 19, conversion: 34 },
      ],
      stats: { received: 332, treated: 260, inProgress: 41, offers: 188, accepted: 54, avgResponseHours: 5.4 },
    },
    {
      id: "org3",
      name: "NorthPath Immigration",
      sector: "immigration",
      status: "verified",
      plan: "Premium",
      rating: 4.5,
      email: "hello@northpath.ca",
      phone: "+1 647 555 0178",
      website: "northpath.ca",
      contactPerson: "Linda R.",
      logoUrl: profilePhoto("NorthPath Immigration", "6D5DFB"),
      city: "Toronto",
      provinceAccess: ["Québec", "Ontario", "Alberta"],
      domains: ["workPermit", "pr", "study"],
      verifiedAt: "2026-05-09",
      responsePolicy: "Réponse sous 72h",
      billingEmail: "admin@northpath.ca",
      availability: ["Mardi 11:00", "Jeudi 16:00", "Vendredi 10:30"],
      team: [{ id: "a5", name: "Linda R.", role: "Consultant", email: "linda@northpath.ca", photoUrl: profilePhoto("Linda R.", "6D5DFB"), status: "active", permissions: ["Demandes", "Offres", "Messages", "RDV"], requests: 14, inProgress: 6, offersSent: 17, conversion: 41 }],
      stats: { received: 126, treated: 91, inProgress: 18, offers: 66, accepted: 24, avgResponseHours: 7.1 },
    },
  ],
  sectors: [
    { id: "jobs", label: "Emploi", icon: "💼", description: "Emploi, opportunités, employeurs, permis", color: "bg-blue-50 text-blue-700 border-blue-100" },
    { id: "realEstate", label: "Immobilier", icon: "🏠", description: "Achat, location, vente, bail", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { id: "immigration", label: "Immigration", icon: "🛂", description: "Consultation, permis, RP, études", color: "bg-purple-50 text-purple-700 border-purple-100" },
    { id: "insurance", label: "Assurance", icon: "🛡️", description: "Auto, habitation, entreprise", color: "bg-cyan-50 text-cyan-700 border-cyan-100" },
    { id: "auto", label: "Auto", icon: "🚗", description: "Achat, financement, leasing, assurance", color: "bg-orange-50 text-orange-700 border-orange-100" },
  ],
  requests: [
    {
      id: "req1",
      sector: "realEstate",
      type: "Location",
      title: "Cherche appartement 1 chambre — Centre-ville Montréal",
      userId: "u1",
      status: "offersReceived",
      province: "Québec",
      city: "Montréal",
      budgetMin: 1400,
      budgetMax: 1800,
      currency: "CAD",
      urgency: "30 jours",
      createdAt: "2026-05-13",
      updatedAt: "2026-05-18",
      summary: "Appartement meublé, chauffage inclus, proche métro, bail long terme ou court terme jusqu’en septembre.",
      details: { bedrooms: 1, furnished: true, moveIn: "20 juillet", leaseType: "Long terme ou court terme", metro: true, heatingIncluded: true },
      documents: [
        { id: "d1", name: "Preuve d’identité", status: "uploaded" },
        { id: "d2", name: "Preuve de revenus", status: "missing" },
      ],
      assignedOffers: ["off1", "off2", "off4"],
      assignedTo: "a1",
      appointments: ["app1"],
    },
    {
      id: "req2",
      sector: "jobs",
      type: "Recherche emploi",
      title: "Mécanicien poids lourds — recherche employeur Canada",
      userId: "u1",
      status: "inProgress",
      province: "Québec",
      city: "Montréal",
      budgetMin: 32,
      budgetMax: 38,
      currency: "CAD",
      urgency: "2 mois",
      createdAt: "2026-05-10",
      updatedAt: "2026-05-17",
      summary: "Profil international avec 5+ ans d’expérience, français fonctionnel, recherche employeur ouvert au recrutement international.",
      details: { experience: "5+ ans", diploma: "Mécanique véhicules lourds", language: "Français", lmia: "Possible" },
      documents: [
        { id: "d3", name: "CV", status: "uploaded" },
        { id: "d4", name: "Diplôme", status: "uploaded" },
      ],
      assignedOffers: ["off3"],
      assignedTo: "a2",
      appointments: [],
    },
    {
      id: "req3",
      sector: "immigration",
      type: "Consultation",
      title: "Analyse admissibilité Entrée Express / Ontario",
      userId: "u1",
      status: "draft",
      province: "Ontario",
      city: "Toronto",
      budgetMin: 250,
      budgetMax: 500,
      currency: "CAD",
      urgency: "Cette semaine",
      createdAt: "2026-05-18",
      updatedAt: "2026-05-18",
      summary: "Besoin d’une consultation réglementée pour savoir quelle stratégie est la meilleure.",
      details: { program: "Entrée Express / PNP", language: "FR/EN", education: "Master" },
      documents: [{ id: "d5", name: "Résultats de langue", status: "missing" }],
      assignedOffers: [],
      assignedTo: "a2",
      appointments: [],
    },
  ],
  offers: [
    {
      id: "off1",
      requestId: "req1",
      orgId: "org1",
      assignedTo: "a1",
      sector: "realEstate",
      title: "Appartement meublé — 1 chambre — Métro Peel",
      status: "received",
      price: 1690,
      currency: "CAD",
      score: 87,
      label: "Meilleur équilibre",
      createdAt: "2026-05-18",
      expiresAt: "2026-05-23",
      details: { rent: 1690, bedrooms: 1, furnished: true, heatingIncluded: true, distanceMetro: "4 min", docsRequired: 2, availability: "20 juillet" },
      pros: ["Dans votre budget", "Chauffage inclus", "Très proche métro", "Disponible à la bonne date"],
      cons: ["Documents requis avant visite"],
      benchmark: { marketAvg: 1740, comparedToUserOffers: "Prix meilleur que 1 autre offre" },
    },
    {
      id: "off2",
      requestId: "req1",
      orgId: "org1",
      assignedTo: "a1",
      sector: "realEstate",
      title: "Appartement lumineux — Griffintown",
      status: "saved",
      price: 1780,
      currency: "CAD",
      score: 78,
      label: "Bon emplacement",
      createdAt: "2026-05-17",
      expiresAt: "2026-05-22",
      details: { rent: 1780, bedrooms: 1, furnished: false, heatingIncluded: false, distanceMetro: "9 min", docsRequired: 3, availability: "1 août" },
      pros: ["Quartier demandé", "Bâtiment récent", "Flexibilité visite"],
      cons: ["Non meublé", "Chauffage non inclus", "Plus de documents demandés"],
      benchmark: { marketAvg: 1740, comparedToUserOffers: "Plus cher que la meilleure offre" },
    },
    {
      id: "off4",
      requestId: "req1",
      orgId: "org1",
      assignedTo: "a2",
      sector: "realEstate",
      title: "Studio premium — Vieux-Montréal",
      status: "received",
      price: 1610,
      currency: "CAD",
      score: 73,
      label: "Prix attractif",
      createdAt: "2026-05-18",
      expiresAt: "2026-05-24",
      details: { rent: 1610, bedrooms: "Studio", furnished: true, heatingIncluded: false, distanceMetro: "7 min", docsRequired: 2, availability: "15 juillet" },
      pros: ["Prix sous le marché", "Meublé", "Disponible rapidement"],
      cons: ["Studio seulement", "Chauffage non inclus"],
      benchmark: { marketAvg: 1740, comparedToUserOffers: "Prix le plus bas, mais moins adapté" },
    },
    {
      id: "off3",
      requestId: "req2",
      orgId: "org2",
      assignedTo: "a3",
      sector: "jobs",
      title: "Préqualification mécanicien — employeur partenaire",
      status: "received",
      price: 34.65,
      currency: "CAD",
      score: 82,
      label: "Bon potentiel",
      createdAt: "2026-05-16",
      expiresAt: "2026-05-30",
      details: { wage: 34.65, contract: "Temps plein", lmia: "À valider", interviewDelay: "7 jours", location: "Montréal" },
      pros: ["Salaire dans la cible", "Poste temps plein", "Province compatible"],
      cons: ["EIMT non confirmé"],
      benchmark: { marketAvg: 33.2, comparedToUserOffers: "Salaire supérieur à la moyenne" },
    },
  ],
  appointments: [
    { id: "app1", requestId: "req1", offerId: "off1", orgId: "org1", assignedTo: "a1", title: "Visite virtuelle appartement", date: "2026-05-21", time: "18:00", status: "proposed", mode: "Visioconférence", contact: { method: "Visioconférence", phone: "+1 514 000 0000", email: "raja@email.com", note: "Disponible après 18h." } },
    { id: "app2", requestId: "req1", offerId: "off2", orgId: "org1", assignedTo: "a1", title: "Appel de validation logement", date: "2026-05-22", time: "12:30", status: "confirmed", mode: "Appel téléphonique", contact: { method: "Appel téléphonique", phone: "+1 514 000 0000", email: "raja@email.com", note: "Créneau confirmé avec le partenaire." } },
  ],
  messages: [
    { id: "m1", requestId: "req1", offerId: "off1", from: "ImmoPro Montréal", senderType: "org", text: "Bonjour Raja, nous pouvons organiser une visite virtuelle jeudi.", date: "2026-05-18", time: "09:12", unread: true },
    { id: "m3", requestId: "req1", offerId: "off1", from: "Raja Jendoubi", senderType: "user", text: "Merci, je suis disponible après 18h pour une visite virtuelle.", date: "2026-05-18", time: "10:04", unread: false },
    { id: "m4", requestId: "req1", offerId: "off2", from: "ImmoPro Montréal", senderType: "org", text: "Pour l’appartement Griffintown, nous pouvons proposer une visite en fin de semaine.", date: "2026-05-17", time: "14:30", unread: false },
    { id: "m2", requestId: "req2", offerId: "off3", from: "TalentBridge Canada", senderType: "org", text: "Votre profil semble compatible avec un employeur à Montréal.", date: "2026-05-16", time: "11:45", unread: false },
  ],
  auditLogs: [
    { id: "log1", actor: "Admin", action: "Partner verified", target: "ImmoPro Montréal", date: "2026-05-12" },
    { id: "log2", actor: "System", action: "Offer benchmark calculated", target: "off1", date: "2026-05-18" },
    { id: "log3", actor: "TalentBridge Canada", action: "Offer sent", target: "req2", date: "2026-05-16" },
  ],
};

function AppContextProvider({ children }) {
  const [state, setState] = useState(initialAppState);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);

  const actions = useMemo(
    () => ({
      setRole(role) {
        setState((s) => ({
          ...s,
          currentRole: role,
          activeMenu: role === ROLES.USER ? "userServices" : role === ROLES.ORG ? "orgDashboard" : "adminDashboard",
        }));
      },
      setMenu(menu) {
        setState((s) => ({ ...s, activeMenu: menu }));
      },
      openUserOffers(requestId = "req1") {
        setState((s) => ({ ...s, currentRole: ROLES.USER, activeMenu: "userOffers", activeSector: "all", selectedOfferRequestId: requestId }));
        setModal(null);
      },
      setSector(sector) {
        setState((s) => ({ ...s, activeSector: sector }));
      },
      setCurrency(currency) {
        setState((s) => ({ ...s, currency }));
        setToast({ type: "success", text: `Devise changée vers ${currency}` });
      },
      setLanguage(language) {
        setState((s) => ({ ...s, language }));
      },
      setOrgUser(userId) {
        setState((s) => ({ ...s, currentOrgUserId: userId }));
        setToast({ type: "success", text: "Session employé changée." });
      },
      addTeamMember(data) {
        const newMember = {
          id: `a${Date.now()}`,
          name: data.name,
          role: data.role || "Agent",
          email: data.email,
          login: data.login || data.email,
          password: data.password || "Temp@1234",
          mustChangePassword: true,
          status: "active",
          permissions: data.permissions || ["Demandes", "Offres", "Messages"],
          requests: 0,
          inProgress: 0,
          offersSent: 0,
          conversion: 0,
        };
        setState((s) => {
          const targetOrgId = data.companyId || s.organizations[0]?.id;
          return { ...s, organizations: s.organizations.map((org) => org.id === targetOrgId ? { ...org, team: [...(org.team || []), newMember] } : org) };
        });
        setToast({ type: "success", text: "Compte employé créé et rattaché à la compagnie." });
        setModal(null);
      },
      createCatalogOffer(data) {
        const template = { id: `tpl${Date.now()}`, title: data.title, type: data.type, price: Number(data.price || 0), city: data.city || "Montréal", details: data.details || {}, scoreBoost: 5 };
        setState((s) => ({ ...s, organizations: s.organizations.map((org, index) => index === 0 ? { ...org, offerTemplates: [template, ...(org.offerTemplates || [])] } : org) }));
        setToast({ type: "success", text: "Offre modèle créée dans le catalogue de la compagnie." });
        setModal(null);
      },
      sendMatchedOffer(requestId, templateId) {
        setState((s) => {
          const org = s.organizations[0];
          const request = s.requests.find((item) => item.id === requestId);
          const template = (org.offerTemplates || []).find((item) => item.id === templateId);
          if (!request || !template) return s;
          const price = Number(template.price || request.budgetMax || 0);
          const score = Math.max(55, Math.min(96, 78 + (template.scoreBoost || 0) + (request.sector === "jobs" ? 8 : (price <= request.budgetMax ? 8 : -5))));
          const newOffer = { id: `off${Date.now()}`, requestId, orgId: org.id, assignedTo: s.currentOrgUserId, sector: request.sector, title: template.title, status: "received", price, currency: request.currency || "CAD", score, label: score >= 85 ? "Suggestion forte" : "Suggestion compatible", createdAt: new Date().toISOString().slice(0, 10), expiresAt: "2026-06-01", details: { ...template.details, price }, pros: ["Offre déjà créée par la compagnie", "Compatible avec la demande reçue", "Prête à envoyer au client"], cons: score < 80 ? ["Vérifier le prix ou les critères avant envoi"] : [], benchmark: { marketAvg: request.budgetMax ? Math.round(request.budgetMax * 0.97) : price, comparedToUserOffers: score >= 85 ? "Très bonne correspondance" : "Correspondance correcte" }, matchedFromTemplateId: template.id };
          return { ...s, offers: [newOffer, ...s.offers], requests: s.requests.map((item) => item.id === requestId ? { ...item, status: "offersReceived", assignedOffers: [newOffer.id, ...(item.assignedOffers || [])] } : item) };
        });
        setToast({ type: "success", text: "Suggestion envoyée au client comme offre." });
      },
      openModal(type, payload = {}) {
        setModal({ type, payload });
      },
      closeModal() {
        setModal(null);
      },
      notify(text, type = "success") {
        setToast({ type, text });
        setTimeout(() => setToast(null), 2600);
      },
      createRequest(data) {
        const newReq = {
          id: `req${Date.now()}`,
          ...data,
          userId: "u1",
          status: "inProgress",
          createdAt: new Date().toISOString().slice(0, 10),
          updatedAt: new Date().toISOString().slice(0, 10),
          assignedOffers: [],
          appointments: [],
          documents: data.documents || [],
        };
        setState((s) => ({ ...s, requests: [newReq, ...s.requests] }));
        setToast({ type: "success", text: "Demande envoyée aux professionnels compatibles." });
        setModal({ type: "requestConfirmation", payload: { requestId: newReq.id, sector: newReq.sector, title: newReq.title } });
      },
      updateRequestStatus(id, status) {
        setState((s) => ({ ...s, requests: s.requests.map((r) => (r.id === id ? { ...r, status, updatedAt: new Date().toISOString().slice(0, 10) } : r)) }));
        setToast({ type: "success", text: "Statut de la demande mis à jour." });
      },
      saveOffer(id) {
        setState((s) => ({ ...s, user: { ...s.user, savedOffers: Array.from(new Set([...s.user.savedOffers, id])) }, offers: s.offers.map((o) => (o.id === id ? { ...o, status: "saved" } : o)) }));
        setToast({ type: "success", text: "Offre sauvegardée." });
      },
      acceptOffer(id) {
        setModal({ type: "acceptOffer", payload: { offerId: id } });
      },
      confirmAcceptOffer(id, contactData) {
        const offer = state.offers.find((o) => o.id === id);
        const appointmentStatus = contactData.responseType === "confirmSuggested" ? "confirmed" : "proposed";
        const appointmentTitle = contactData.responseType === "confirmSuggested" ? "Créneau confirmé par le client" : "Autre créneau proposé par le client";
        setState((s) => ({
          ...s,
          offers: s.offers.map((o) => (o.id === id ? { ...o, status: "accepted", acceptedContact: contactData } : o)),
          requests: s.requests.map((r) => (r.id === offer?.requestId ? { ...r, status: "closed", updatedAt: new Date().toISOString().slice(0, 10), acceptedOfferId: id, acceptedContact: contactData } : r)),
          appointments: [
            {
              id: `app${Date.now()}`,
              requestId: offer?.requestId,
              offerId: id,
              orgId: offer?.orgId,
              assignedTo: offer?.assignedTo,
              title: appointmentTitle,
              date: contactData.day || contactData.date,
              time: contactData.time,
              status: appointmentStatus,
              mode: contactData.method,
              proposedBy: "client",
              contact: contactData,
            },
            ...s.appointments.map((appointment) => appointment.offerId === id && contactData.responseType === "confirmSuggested" ? { ...appointment, status: "confirmed" } : appointment),
          ],
          messages: [
            {
              id: `m${Date.now()}`,
              requestId: offer?.requestId,
              offerId: id,
              from: s.user.name,
              senderType: "user",
              text: contactData.note,
              date: new Date().toISOString().slice(0, 10),
              time: contactData.time,
              unread: true,
            },
            ...s.messages,
          ],
          notifications: [
            { id: Date.now(), type: "acceptedOffer", text: appointmentStatus === "confirmed" ? "Offre acceptée et créneau confirmé" : "Offre acceptée avec proposition d’un autre créneau", unread: true },
            ...s.notifications,
          ],
        }));
        setToast({ type: "success", text: appointmentStatus === "confirmed" ? "Offre acceptée et créneau confirmé." : "Offre acceptée. Votre autre créneau a été proposé au professionnel." });
        setModal(null);
      },
      createOffer(reqId, data) {
        const request = state.requests.find((r) => r.id === reqId);
        const newOffer = {
          id: `off${Date.now()}`,
          requestId: reqId,
          orgId: state.organizations[0]?.id || "org1",
          assignedTo: state.currentOrgUserId,
          sector: request?.sector || state.organizations[0]?.sector || "realEstate",
          status: "received",
          createdAt: new Date().toISOString().slice(0, 10),
          expiresAt: "2026-06-01",
          pros: data.pros || ["Réponse rapide", "Critères principaux respectés"],
          cons: data.cons || [],
          benchmark: data.benchmark || { marketAvg: data.price, comparedToUserOffers: "Nouvelle offre à comparer" },
          ...data,
        };
        const proposed = data.proposedAppointment;
        const appointmentFromOffer = proposed ? {
          id: `app${Date.now()}`,
          requestId: reqId,
          offerId: newOffer.id,
          orgId: newOffer.orgId,
          assignedTo: newOffer.assignedTo,
          title: "Créneau suggéré avec l’offre",
          date: proposed.day || proposed.slot || "À confirmer",
          time: proposed.time || "",
          status: "proposed",
          mode: proposed.mode || "À confirmer",
          proposedBy: "org",
          contact: { method: proposed.mode || "À confirmer", phone: state.organizations[0]?.phone, email: state.organizations[0]?.email, note: proposed.note || "Créneau suggéré selon les disponibilités du client." },
        } : null;
        setState((s) => ({
          ...s,
          offers: [newOffer, ...s.offers],
          appointments: appointmentFromOffer ? [appointmentFromOffer, ...s.appointments] : s.appointments,
          requests: s.requests.map((r) => (r.id === reqId ? { ...r, status: "offersReceived", assignedOffers: [newOffer.id, ...(r.assignedOffers || [])], appointments: appointmentFromOffer ? [appointmentFromOffer.id, ...(r.appointments || [])] : r.appointments } : r)),
        }));
        setToast({ type: "success", text: proposed ? "Offre envoyée au client avec créneau suggéré." : "Offre envoyée au client avec score et benchmark." });
        setModal(null);
      },
      assignRequest(reqId) {
        setState((s) => ({ ...s, requests: s.requests.map((request) => request.id === reqId ? { ...request, assignedTo: s.currentOrgUserId } : request) }));
        setToast({ type: "success", text: `Demande ${reqId} assignée à la session active.` });
      },
      assignRequestTo(reqId, memberId) {
        setState((s) => ({
          ...s,
          requests: s.requests.map((request) => request.id === reqId ? { ...request, assignedTo: memberId, updatedAt: new Date().toISOString().slice(0, 10) } : request),
        }));
        const member = state.organizations.flatMap((org) => org.team || []).find((item) => item.id === memberId);
        setToast({ type: "success", text: member ? `Demande assignée à ${member.name}.` : "Demande assignée." });
        setModal(null);
      },
      sendMessage(target, payload = {}) {
        const offer = payload.offerId ? state.offers.find((o) => o.id === payload.offerId) : null;
        const request = payload.requestId ? state.requests.find((r) => r.id === payload.requestId) : offer ? state.requests.find((r) => r.id === offer.requestId) : null;
        const org = offer ? state.organizations.find((o) => o.id === offer.orgId) : state.organizations[0];
        const senderIsOrg = state.currentRole === ROLES.ORG;
        const message = {
          id: `m${Date.now()}`,
          requestId: request?.id || "req1",
          offerId: offer?.id || payload.offerId || "off1",
          from: senderIsOrg ? `${org?.name || "Organisation"} — ${(org?.team || []).find((member) => member.id === state.currentOrgUserId)?.name || "Équipe"}` : state.user.name,
          senderType: senderIsOrg ? "org" : "user",
          text: payload.text || "Message envoyé depuis Connectia.",
          date: new Date().toISOString().slice(0, 10),
          time: "Maintenant",
          unread: true,
        };
        setState((s) => ({ ...s, messages: [...s.messages, message] }));
        setToast({ type: "success", text: `Message envoyé à ${target}.` });
        setModal(null);
      },
      proposeAppointment(payload = {}) {
        const offer = payload.offerId ? state.offers.find((o) => o.id === payload.offerId) : state.offers[0];
        setState((s) => ({
          ...s,
          appointments: [
            {
              id: `app${Date.now()}`,
              requestId: offer?.requestId || "req1",
              offerId: offer?.id || "off1",
              orgId: offer?.orgId || "org1",
              assignedTo: offer?.assignedTo || state.currentOrgUserId,
              title: payload.title || "Rendez-vous proposé par le professionnel",
              date: payload.date || "2026-05-25",
              time: payload.time || "10:00",
              status: "proposed",
              mode: payload.mode || "Appel téléphonique",
              contact: payload.contact || { method: payload.mode || "Appel téléphonique", phone: s.user.phone, email: s.user.email, note: "Créneau proposé par le professionnel." },
            },
            ...s.appointments,
          ],
        }));
        setToast({ type: "success", text: "Créneau ajouté au calendrier partagé." });
        setModal(null);
      },
      generateReport(payload = {}) {
        setModal({ type: "generatedReport", payload });
        setToast({ type: "success", text: "Rapport généré avec aperçu prêt à exporter." });
      },
      exportRequestPdf(requestId) {
        setModal({ type: "requestPdfExport", payload: { requestId } });
        setToast({ type: "success", text: "Aperçu PDF de la demande prêt à exporter." });
      },
      updateUserProfile(data) {
        setState((s) => ({ ...s, user: { ...s.user, ...data, profileCompletion: Math.min(100, Math.max(s.user.profileCompletion, 86)) } }));
        setToast({ type: "success", text: "Profil utilisateur mis à jour." });
        setModal(null);
      },
      updateOrgProfile(data) {
        setState((s) => ({ ...s, organizations: s.organizations.map((org, index) => index === 0 ? { ...org, ...data } : org) }));
        setToast({ type: "success", text: "Profil organisation mis à jour." });
        setModal(null);
      },
      confirmAppointment(id) {
        setState((s) => ({ ...s, appointments: s.appointments.map((appointment) => appointment.id === id ? { ...appointment, status: "confirmed" } : appointment) }));
        setToast({ type: "success", text: "Rendez-vous confirmé." });
      },
      createPartner(data) {
        const newOrg = {
          id: `org${Date.now()}`,
          name: data.name,
          sector: data.sector,
          status: data.status,
          plan: data.plan,
          rating: 0,
          email: data.email,
          phone: data.phone,
          website: data.website,
          contactPerson: data.contactPerson,
          city: data.city,
          provinceAccess: data.provinceAccess,
          domains: data.domains,
          verifiedAt: data.status === "verified" ? new Date().toISOString().slice(0, 10) : "À valider",
          responsePolicy: data.responsePolicy,
          billingEmail: data.billingEmail,
          availability: data.availability || [],
          team: [
            {
              id: `a${Date.now()}`,
              name: data.contactPerson,
              role: "Manager",
              email: data.email,
              status: "active",
              permissions: ["Demandes", "Offres", "RDV", "Messages", "Factures"],
              requests: 0,
              inProgress: 0,
              offersSent: 0,
              conversion: 0,
            },
          ],
          stats: { received: 0, treated: 0, inProgress: 0, offers: 0, accepted: 0, avgResponseHours: 0 },
        };
        setState((s) => ({ ...s, organizations: [newOrg, ...s.organizations] }));
        setToast({ type: "success", text: "Compagnie ajoutée avec succès." });
        setModal(null);
      },
    }),
    [state]
  );

  return <AppContext.Provider value={{ state, actions, toast, modal }}>{children}</AppContext.Provider>;
}

const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className={cls("fixed bottom-5 right-5 z-[80] rounded-2xl px-4 py-3 text-xs font-semibold shadow-xl", toast.type === "error" ? "bg-red-600 text-white" : "bg-slate-950 text-white")}>
      {toast.text}
    </div>
  );
}

function Pill({ children, className = "" }) {
  return <span className={cls("inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] font-semibold leading-none sm:gap-1.5 sm:px-3 sm:text-[11px]", className)}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={cls("rounded-[1.35rem] border border-[#E7E2DA] bg-white shadow-[0_14px_36px_rgba(8,27,42,0.06)]", className)}>{children}</div>;
}

function MobileMenuBar() {
  const { state, actions } = useApp();
  const itemsByRole = {
    user: [["userServices", "🧩", "Services"], ["userRequests", "📌", "Demandes"], ["userOffers", "🏷️", "Offres"], ["userAppointments", "📅", "RDV"]],
    org: [["orgDashboard", "📊", "Dash"], ["orgRequests", "📥", "Demandes"], ["orgOffers", "🏷️", "Offres"], ["orgAppointments", "📅", "RDV"]],
    admin: [["adminDashboard", "🧭", "Dash"], ["adminOrganizations", "🏢", "Compagnies"], ["adminUsers", "👤", "Users"], ["adminReports", "📄", "Rapports"]],
  };
  const items = itemsByRole[state.currentRole] || itemsByRole.user;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#061827]/96 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-18px_40px_rgba(3,12,22,0.28)] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-4 gap-1">
        {items.map(([key, icon, label]) => (
          <button key={key} onClick={() => actions.setMenu(key)} className={cls("flex flex-col items-center justify-center rounded-2xl px-1 py-2 text-[10px] font-bold transition", state.activeMenu === key ? "bg-[#D95500] text-white" : "text-white/58 hover:bg-white/10 hover:text-white")}>
            <span className="text-base leading-none">{icon}</span>
            <span className="mt-1 truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Button({ children, className = "", variant = "primary", onClick, type = "button", disabled = false }) {
  const styles = {
    primary: "bg-[#D95500] text-white shadow-[0_14px_30px_rgba(217,85,0,0.24)] hover:bg-[#FF7A1A] hover:shadow-[0_18px_36px_rgba(217,85,0,0.30)] sm:hover:-translate-y-0.5",
    navy: "bg-[#061827] text-white shadow-[0_14px_30px_rgba(6,24,39,0.20)] hover:bg-[#0B2235] sm:hover:-translate-y-0.5",
    ghost: "border border-[#D9E0E6] bg-white/80 text-[#102132] shadow-[0_8px_22px_rgba(8,27,42,0.04)] hover:border-[#D95500] hover:bg-[#FFF5ED] hover:text-[#D95500]",
    subtle: "border border-transparent bg-[#F4EFE9] text-[#102B40] hover:bg-white hover:text-[#D95500] hover:shadow-[0_10px_26px_rgba(8,27,42,0.06)]",
    danger: "border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700",
    success: "bg-[#0B7A5A] text-white shadow-[0_14px_30px_rgba(11,122,90,0.20)] hover:bg-[#099268] sm:hover:-translate-y-0.5",
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls("connectia-btn inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-h-9 sm:px-5 sm:text-xs", styles[variant], className)}>
      {children}
    </button>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-[-0.04em] text-[#102B40] sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 max-w-3xl text-xs leading-relaxed text-[#526879] sm:text-sm">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function StatCard({ label, value, hint, icon, trend }) {
  return (
    <Card className="p-3 sm:p-4">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs">{label}</p>
          <p className="mt-1 truncate text-xl font-bold text-slate-900 sm:text-2xl">{value}</p>
          {hint && <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500 sm:text-xs">{hint}</p>}
        </div>
        <div className="shrink-0 rounded-2xl bg-orange-50 px-2.5 py-2 text-lg sm:px-3 sm:text-xl">{icon}</div>
      </div>
      {trend && <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700 sm:text-xs">{trend}</div>}
    </Card>
  );
}

function Layout() {
  const { state } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  useConnectiaLanguage(state.language);
  return (
    <div key={state.language} data-connectia-root className="min-h-screen bg-[#F7F5F2] text-slate-900 antialiased">
      <ResponsiveAppStyles />
      <Sidebar mobileOpen={mobileSidebarOpen} onMobileClose={() => setMobileSidebarOpen(false)} />
      {mobileSidebarOpen && <button aria-label="Fermer le menu" onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-sm lg:hidden" />}
      <div className="lg:pl-[270px]">
        <Topbar onMenuOpen={() => setMobileSidebarOpen(true)} />
        <main className="connectia-main px-3 pb-6 pt-4 sm:px-4 lg:p-6">
          <RoleRouter activeMenu={state.activeMenu} />
        </main>
      </div>
      <GlobalModal />
      <Toast />
    </div>
  );
}

function ResponsiveAppStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700;1,800&display=swap');
      body { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F7F5F2; }
      .connectia-main { background: #F7F5F2; min-height: calc(100vh - 72px); color: #102132; }
      .connectia-main h1, .connectia-main h2, .connectia-main h3 { letter-spacing: -0.035em; }
      .connectia-brand-font { font-family: 'Playfair Display', Georgia, serif; font-style: italic; }
      .connectia-main input, .connectia-main select, .connectia-main textarea { border-radius: 18px; border-color: #E8DFD6; background: #FFFCF8; color: #102B40; font-weight: 500; }
      .connectia-btn { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; letter-spacing: 0.12em; }
      .connectia-main button { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
      .connectia-main input:focus, .connectia-main select:focus, .connectia-main textarea:focus { border-color: #FF7A1A !important; box-shadow: 0 0 0 3px rgba(255,122,26,0.14); }
      .connectia-main table thead { background: #F4EFE9; }
      .connectia-main .bg-slate-50 { background-color: #F8F6F2 !important; }
      .connectia-main .text-slate-900 { color: #102132 !important; }
      .connectia-main .text-slate-800 { color: #173B57 !important; }
      .connectia-main .text-slate-700 { color: #28465C !important; }
      .connectia-main .text-slate-600 { color: #526879 !important; }
      .connectia-main .text-slate-500 { color: #728292 !important; }
      .connectia-main .border-slate-200 { border-color: #E8DFD6 !important; }
      .connectia-main .shadow-sm { box-shadow: 0 16px 44px rgba(8,27,42,0.08); }
      .connectia-main .bg-\[\#062238\] { background-color: #061827 !important; }
      .connectia-main .text-\[\#F58A07\] { color: #FF7A1A !important; }
      .connectia-main .bg-\[\#F58A07\] { background-color: #D95500 !important; }
      .connectia-main .focus\:border-\[\#F58A07\]:focus { border-color: #FF7A1A !important; }
      @media (max-width: 767px) {
        body { overflow-x: hidden; }
        .connectia-main { max-width: 100vw; }
        .connectia-main .grid { min-width: 0; }
        .connectia-main table { font-size: 11px; }
        .connectia-main th, .connectia-main td { padding: 10px 12px !important; }
        .connectia-main input, .connectia-main select, .connectia-main textarea { font-size: 12px; min-height: 40px; }
        .connectia-main .rounded-3xl { border-radius: 18px; }
        .connectia-main .rounded-2xl { border-radius: 14px; }
        .connectia-main .h-48 { height: 8.5rem; }
        .connectia-main .h-56 { height: 9rem; }
        .connectia-main .h-64 { height: 10rem; }
        .connectia-main .p-6 { padding: 1rem; }
        .connectia-main .p-5 { padding: 1rem; }
        .connectia-main .p-4 { padding: 0.875rem; }
        .connectia-main .gap-6 { gap: 1rem; }
        .connectia-main .gap-5 { gap: 0.875rem; }
        .connectia-main .gap-4 { gap: 0.75rem; }
        .connectia-main .mt-6 { margin-top: 1rem; }
        .connectia-main .mt-5 { margin-top: 0.875rem; }
        .connectia-main .mt-4 { margin-top: 0.75rem; }
        .connectia-main .text-5xl { font-size: 2rem; line-height: 2.25rem; }
        .connectia-main .text-4xl { font-size: 1.75rem; line-height: 2rem; }
        .connectia-main .text-3xl { font-size: 1.5rem; line-height: 1.85rem; }
        .connectia-main .text-2xl { font-size: 1.25rem; line-height: 1.65rem; }
        .connectia-main .text-xl { font-size: 1.125rem; line-height: 1.5rem; }
        .connectia-main .text-lg { font-size: 1rem; line-height: 1.4rem; }
        .connectia-main .text-base { font-size: 0.9rem; line-height: 1.35rem; }
      }
    `}</style>
  );
}

function Sidebar({ mobileOpen = false, onMobileClose }) {
  const { state, actions } = useApp();
  const menuByRole = {
    user: [
      ["userSignup", "✨", "Inscription"],
      ["userServices", "🧩", "Services"],
      ["userRequests", "📌", "Mes demandes"],
      ["userOffers", "🏷️", "Offres reçues"],
      ["userAppointments", "📅", "Rendez-vous"],
      ["userMessages", "💬", "Messages"],
    ],
    org: [
      ["orgDashboard", "📊", "Dashboard"],
      ["orgRequests", "📥", "Demandes reçues"],
      ["orgOffers", "🏷️", "Offres envoyées"],
      ["orgAppointments", "📅", "Rendez-vous"],
      ["orgMessages", "💬", "Messages"],
    ],
    admin: [
      ["adminDashboard", "🧭", "Dashboard"],
      ["adminOrganizations", "🏢", "Gestion compagnies"],
      ["adminUsers", "👤", "Gestion utilisateurs"],
      ["adminSubscriptions", "💳", "Subscriptions"],
      ["adminReports", "📄", "Rapports"],
    ],
  };
  const menus = menuByRole[state.currentRole];
  return (
    <aside className={cls("fixed left-0 top-0 z-40 h-screen w-[270px] bg-[#061827] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0", mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 p-3 xl:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0B2235] text-base font-bold text-white xl:h-14 xl:w-14 xl:text-lg"><span className="connectia-brand-font text-2xl text-white">RJ</span></div>
              <div className="block">
                <p className="connectia-brand-font text-2xl leading-tight text-white">Connectia</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">Platform</p>
              </div>
            </div>
            <button onClick={onMobileClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-bold text-white hover:bg-white/15 lg:hidden" aria-label="Fermer le menu">✕</button>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menus.map(([key, icon, label]) => (
            <button key={key} onClick={() => { actions.setMenu(key); onMobileClose?.(); }} className={cls("group relative flex w-full items-center justify-start gap-3 rounded-full px-3 py-2.5 text-left text-sm font-medium transition", state.activeMenu === key ? "bg-[#D95500] text-white shadow-[0_14px_30px_rgba(217,85,0,0.25)]" : "text-white/62 hover:bg-white/8 hover:text-white")}>
              <span className="text-lg xl:text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="rounded-[1.5rem] bg-white/8 p-3 text-left ring-1 ring-white/10">
            <p className="text-xs font-medium text-white">Trusted by verified partners</p>
            <p className="mt-1 text-xs text-white/55">Offres fiables, partenaires vérifiés.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ onMenuOpen }) {
  const { state, actions } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const unread = state.notifications.filter((n) => n.unread).length;
  const roleLabel = state.currentRole === "user" ? "Client" : state.currentRole === "org" ? "Organisation" : "Admin";
  const currentOrg = state.organizations[0];
  const currentOrgUser = currentOrg.team.find((member) => member.id === state.currentOrgUserId) || currentOrg.team[0];
  const avatarSrc = state.currentRole === "user" ? state.user.photoUrl : state.currentRole === "org" ? currentOrgUser.photoUrl : profilePhoto("Platform Admin", "062238");
  const displayName = state.currentRole === "user" ? state.user.name : state.currentRole === "org" ? currentOrgUser.name : "Platform Admin";
  const displaySub = state.currentRole === "org" ? `${currentOrgUser.role} • ${currentOrg.name}` : roleLabel;
  const title = pageTitle(state.activeMenu);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#081B2A] px-3 py-3 text-white shadow-[0_10px_30px_rgba(8,27,42,0.10)] sm:px-4 lg:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            onClick={onMenuOpen}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#D95500] text-xl font-bold text-white shadow-[0_12px_30px_rgba(217,85,0,0.22)] transition hover:bg-[#FF7A1A] lg:hidden"
            aria-label="Ouvrir le menu"
          >
            ☰
          </button>

          <div className="hidden min-w-0 sm:block" />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setCurrencyOpen((open) => !open)}
              className="flex h-9 items-center gap-1.5 rounded-full bg-transparent px-1 text-xs font-normal text-white/72 transition hover:text-[#FF7A1A] focus:outline-none sm:text-sm"
            >
              <span>{state.currency}</span>
              <span className="text-[10px] text-slate-400">▾</span>
            </button>
            {currencyOpen && (
              <div className="absolute right-0 top-14 z-50 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl">
                {Object.keys(CURRENCIES).map((currency) => (
                  <button
                    key={currency}
                    onClick={() => { actions.setCurrency(currency); setCurrencyOpen(false); }}
                    className={cls("flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition", state.currency === currency ? "bg-orange-50 text-[#F58A07]" : "text-slate-600 hover:bg-slate-50")}
                  >
                    <span>{currency}</span>
                    <span className="text-[11px] text-slate-400">{CURRENCIES[currency].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden items-center rounded-full bg-white/10 p-1 sm:flex">
            {[["fr", "FR"], ["en", "EN"]].map(([language, label]) => (
              <button
                key={language}
                type="button"
                onClick={() => actions.setLanguage(language)}
                className={cls("rounded-full px-3 py-1.5 text-[11px] font-bold transition", state.language === language ? "bg-[#D95500] text-white shadow-sm" : "text-white/60 hover:bg-white/10 hover:text-white")}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => actions.openModal("notifications")}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-base text-white/70 transition hover:bg-white/10 hover:text-[#FF7A1A] focus:outline-none"
            aria-label="Notifications"
          >
            🔔
            {unread > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#F58A07] px-1 text-[9px] font-medium text-white">{unread}</span>}
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((open) => !open)}
              className="group flex h-9 items-center gap-2 rounded-full bg-transparent py-1 pl-1 pr-1 transition hover:bg-white/10 focus:outline-none sm:h-10 sm:gap-2.5"
            >
              <AvatarBadge label={displayName} src={avatarSrc} className="h-8 w-8 rounded-full ring-0 shadow-none sm:h-9 sm:w-9" />
              <div className="hidden min-w-0 max-w-[170px] text-left leading-tight md:block xl:max-w-[220px]">
                <p className="truncate text-sm font-normal tracking-[-0.01em] text-white/90">{displayName}</p>
                <p className="truncate text-[11px] font-normal text-white/45">{displaySub}</p>
              </div>
              <span className="hidden items-center justify-center text-xs text-slate-300 transition group-hover:text-[#F58A07] md:flex">⌄</span>
            </button>
            {profileOpen && (
              <div className="fixed inset-x-3 top-16 z-50 max-h-[75vh] overflow-auto rounded-3xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-14 sm:w-80">
                <div className="bg-gradient-to-br from-[#062238] to-[#0B2E4A] p-4 text-white">
                  <div className="flex items-center gap-3">
                    <AvatarBadge label={displayName} src={avatarSrc} className="h-12 w-12 rounded-full ring-2 ring-white/40 shadow-none" />
                    <div className="min-w-0"><p className="truncate text-sm font-bold">{displayName}</p><p className="text-xs text-white/65">{displaySub}</p></div>
                  </div>
                </div>
                <div className="p-2">
                  <button onClick={() => { actions.openModal("profilePreview", { name: displayName }); setProfileOpen(false); }} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-normal text-slate-700 hover:bg-slate-50"><AvatarBadge label={displayName} src={avatarSrc} className="h-8 w-8 rounded-full ring-0 shadow-none" /><span>{state.currentRole === "org" ? "Profil & organisation" : "Gestion du profil"}</span></button>
                  <div className="mx-2 mb-1 rounded-2xl bg-slate-50 p-2">
                    <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Changer d’espace</p>
                    <div className="grid grid-cols-3 gap-1 rounded-2xl bg-white p-1 ring-1 ring-slate-100">
                      {[[ROLES.USER, "Client"], [ROLES.ORG, "Pro"], [ROLES.ADMIN, "Admin"]].map(([role, label]) => (
                        <button key={role} onClick={() => { actions.setRole(role); setProfileOpen(false); }} className={cls("rounded-xl px-2 py-2 text-xs font-semibold transition", state.currentRole === role ? "bg-[#062238] text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800")}>{label}</button>
                      ))}
                    </div>
                  </div>
                  {state.currentRole === "org" && <><button onClick={() => { actions.setMenu("orgBilling"); setProfileOpen(false); }} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"><span>💳</span><span>Abonnement & factures</span></button><button onClick={() => { actions.setMenu("orgSettings"); setProfileOpen(false); }} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50"><span>⚙️</span><span>Paramètres</span></button></>}
                  {state.currentRole === "org" && isManagerRole(currentOrgUser) && <div className="my-1 border-t border-slate-100 pt-2"><p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Accès session</p>{currentOrg.team.map((member) => <button key={member.id} onClick={() => { actions.setOrgUser(member.id); setProfileOpen(false); }} className={cls("flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-xs font-semibold hover:bg-slate-50", member.id === state.currentOrgUserId ? "bg-orange-50 text-[#F58A07]" : "text-slate-600")}><span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 text-[10px] text-slate-700">{member.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</span><span className="min-w-0"><span className="block truncate">{member.name}</span><span className="block text-[10px] font-medium text-slate-400">{member.role}</span></span></button>)}</div>}
                  <div className="mx-2 my-2 flex rounded-2xl bg-slate-50 p-1 sm:hidden">
                    {[["fr", "FR"], ["en", "EN"]].map(([language, label]) => (
                      <button key={language} type="button" onClick={() => actions.setLanguage(language)} className={cls("flex-1 rounded-xl px-3 py-2 text-xs font-bold transition", state.language === language ? "bg-[#062238] text-white" : "text-slate-500 hover:bg-white")}>{label}</button>
                    ))}
                  </div>
                  <button onClick={() => { actions.notify("Session fermée."); setProfileOpen(false); }} className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"><span>↪</span><span>Déconnexion</span></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function pageTitle(menu) {
  const map = {
    userSignup: "Inscription client",
    userDashboard: "Services",
    userServices: "Services",
    userRequests: "Mes demandes",
    userOffers: "Offres reçues",
    userAppointments: "Rendez-vous",
    userMessages: "Messages",
    userProfile: "Profil client",
    orgDashboard: "Dashboard organisation",
    orgRequests: "Demandes reçues",
    orgOffers: "Offres envoyées",
    orgAppointments: "Rendez-vous",
    orgMessages: "Messages",
    orgBilling: "Abonnement & factures",
    orgSettings: "Paramètres organisation",
    adminDashboard: "Dashboard admin",
    adminUsers: "Gestion utilisateurs",
    adminOrganizations: "Gestion compagnies",
    adminSubscriptions: "Subscriptions",
    adminReports: "Rapports",
  };
  return map[menu] || "Connectia";
}

function RoleRouter({ activeMenu }) {
  const routes = {
    userSignup: <UserFirstTimeSignup />,
    userDashboard: <UserDashboard />,
    userServices: <UserServices />,
    userRequests: <UserRequests />,
    userOffers: <UserOffers />,
    userAppointments: <UserAppointments />,
    userMessages: <MessagesPage />,
    userProfile: <UserProfile />,
    orgDashboard: <OrgDashboard />,
    orgRequests: <OrgRequests />,
    orgOffers: <OrgOffers />,
    orgAppointments: <OrgAppointments />,
    orgMessages: <OrgMessages />,
    orgBilling: <OrgBilling />,
    orgSettings: <OrgSettings />,
    adminDashboard: <AdminDashboard />,
    adminUsers: <AdminUsers />,
    adminOrganizations: <AdminOrganizations />,
    adminSubscriptions: <AdminSubscriptions />,
    adminReports: <AdminReports />,
  };
  return routes[activeMenu] || <UserDashboard />;
}

function SectorFilter() {
  const { state, actions } = useApp();
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <button onClick={() => actions.setSector("all")} className={cls("rounded-full border px-3 py-2 text-xs font-semibold", state.activeSector === "all" ? "border-[#F58A07] bg-orange-50 text-[#F58A07]" : "border-slate-200 bg-white text-slate-600")}>Tous</button>
      {state.sectors.map((s) => (
        <button key={s.id} onClick={() => actions.setSector(s.id)} className={cls("rounded-full border px-3 py-2 text-xs font-semibold", state.activeSector === s.id ? "border-[#F58A07] bg-orange-50 text-[#F58A07]" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50")}>{s.icon} {s.label}</button>
      ))}
    </div>
  );
}

function filterBySector(items, sector) {
  return sector === "all" ? items : items.filter((i) => i.sector === sector);
}

function isManagerRole(member) {
  return /manager|lead|directeur|responsable/i.test(member?.role || "");
}

function currentOrgContext(state) {
  const org = state.organizations[0];
  const employee = org.team.find((member) => member.id === state.currentOrgUserId) || org.team[0];
  const isManager = isManagerRole(employee);
  return { org, employee, isManager };
}

function employeeScope(items, employee, isManager) {
  if (isManager) return items;
  return items.filter((item) => item.assignedTo === employee.id);
}

function valueLabelForSector(sector, context = "request", requestType = "") {
  if (context === "request") return getRequestValueMode(sector, requestType).label;
  const labels = {
    jobs: "Salaire",
    realEstate: "Loyer / prix",
    immigration: "Frais",
    insurance: "Prime",
    auto: "Prix / mensualité",
  };
  return labels[sector] || "Valeur";
}

function comparisonLabelForSector(sector) {
  const labels = {
    jobs: "Salaire marché",
    realEstate: "Marché",
    immigration: "Frais moyens",
    insurance: "Prime moyenne",
    auto: "Prix marché",
  };
  return labels[sector] || "Marché";
}

function requestTypeLabel(sector, type) {
  const legacy = {
    realEstate: { rentalSearch: "Location", purchaseSearch: "Achat", propertyToRent: "Mise en location", propertyToSell: "Vente" },
    jobs: { candidateJobSearch: "Recherche emploi", employerMatch: "Trouver un employeur", profilePrecheck: "Préqualification de mon profil" },
    immigration: { consultation: "Consultation", workPermit: "Permis de travail", pr: "Résidence permanente", study: "Permis d’études", newRequest: "Nouvelle demande", renewal: "Renouvellement", extension: "Prolongation" },
    insurance: { autoInsurance: "Auto", homeInsurance: "Habitation", businessInsurance: "Entreprise", insuranceCompare: "Comparer assurance" },
    auto: { carPurchase: "Achat véhicule", financing: "Financement auto", leasing: "Leasing", tradeIn: "Reprise véhicule" },
  };
  return legacy[sector]?.[type] || type || "Type non défini";
}

function requestTypeOptionsForSector(sector, requests = []) {
  const configTypes = REQUEST_FORM_CONFIG[sector]?.requestTypes || [];
  const existing = requests.map((request) => requestTypeLabel(request.sector, request.type)).filter(Boolean);
  return Array.from(new Set([...configTypes, ...existing]));
}

function fieldLabelForRequest(request, key) {
  const config = REQUEST_FORM_CONFIG[request?.sector];
  const fromConfig = config?.fields?.find((field) => field.key === key)?.label;
  const fallback = {
    bedrooms: "Chambres",
    furnished: "Meublé",
    moveIn: "Date souhaitée",
    leaseType: "Durée / bail",
    metro: "Métro proche",
    heatingIncluded: "Chauffage inclus",
    experience: "Expérience",
    diploma: "Diplôme",
    language: "Langue",
    lmia: "EIMT / permis",
    program: "Programme visé",
    education: "Niveau d’études",
  };
  return fromConfig || fallback[key] || key;
}

function fieldLabelForOffer(offer, key) {
  const labelsBySector = {
    realEstate: {
      rent: "Loyer",
      bedrooms: "Chambres",
      furnished: "Meublé",
      heatingIncluded: "Chauffage inclus",
      distanceMetro: "Distance métro",
      docsRequired: "Documents demandés",
      availability: "Disponibilité",
      price: "Loyer / prix",
      delay: "Délai de réponse",
    },
    jobs: {
      wage: "Salaire",
      contract: "Type de contrat",
      lmia: "EIMT / permis",
      interviewDelay: "Délai d’entrevue",
      location: "Lieu",
      startDate: "Date de début",
      price: "Salaire",
      docsRequired: "Documents demandés",
      delay: "Délai de réponse",
    },
    immigration: {
      fees: "Frais",
      consultantStatus: "Statut consultant",
      strategy: "Stratégie proposée",
      analysisDelay: "Délai d’analyse",
      nextStep: "Prochaine étape",
      documents: "Documents requis",
      price: "Frais",
      docsRequired: "Documents demandés",
      delay: "Délai de réponse",
    },
    insurance: {
      monthlyPremium: "Prime mensuelle",
      coverage: "Couverture",
      deductible: "Franchise",
      exclusions: "Exclusions",
      activation: "Activation",
      price: "Prime",
      docsRequired: "Documents demandés",
      delay: "Délai de réponse",
    },
    auto: {
      vehiclePrice: "Prix véhicule",
      year: "Année",
      mileage: "Kilométrage",
      warranty: "Garantie",
      financing: "Financement",
      availability: "Disponibilité",
      price: "Prix / mensualité",
      docsRequired: "Documents demandés",
      delay: "Délai de réponse",
    },
  };
  return labelsBySector[offer?.sector]?.[key] || key;
}

function displayValue(value) {
  if (value === true) return "Oui";
  if (value === false) return "Non";
  if (Array.isArray(value)) return value.length ? value.join(" / ") : "Aucun";
  if (value === undefined || value === null || value === "") return "Non renseigné";
  return String(value);
}

function getOfferFormConfig(sector = "realEstate") {
  return OFFER_FORM_CONFIG[sector] || OFFER_FORM_CONFIG.realEstate;
}

function offerFieldLabel(sector, key) {
  const config = getOfferFormConfig(sector);
  return config.fields.find((field) => field.key === key)?.label || fieldLabelForOffer({ sector }, key);
}

function getOfferPriceKey(sector) {
  return getOfferFormConfig(sector).primaryPriceKey || "price";
}

function calculateOfferScore({ request, sector, price, docsRequired, delay, values }) {
  const numericPrice = Number(price || 0);
  const selectedDocs = Array.isArray(docsRequired) ? docsRequired : Array.isArray(values?.docsRequired) ? values.docsRequired : [];
  const docs = selectedDocs.length || Number(docsRequired || values?.docsRequired || 2);
  let score = 74;
  if (sector !== "jobs" && request?.budgetMax && numericPrice <= request.budgetMax) score += 10;
  if (sector !== "jobs" && request?.budgetMin && numericPrice < request.budgetMin * 0.9) score -= 4;
  if (sector === "jobs" && values?.wage) score += 8;
  if (docs <= 2) score += 6;
  if (["24h", "48h", "Aujourd’hui", "Immédiate", "24-48h"].includes(delay || values?.activation || values?.availability || values?.approvalDelay || values?.analysisDelay || values?.interviewDelay)) score += 5;
  if (sector === "realEstate" && values?.photos?.length >= 3) score += 6;
  if (sector === "jobs" && values?.lmia && values.lmia !== "Non") score += 4;
  if (sector === "insurance" && values?.coverage === "Complète") score += 4;
  if (sector === "auto" && values?.warranty && values.warranty !== "Aucune") score += 4;
  return Math.max(45, Math.min(96, score));
}

function getCompetitorBenchmarks({ request, currentPrice, currentScore, state }) {
  const linkedOffers = state.offers.filter((offer) => offer.requestId === request?.id);
  const marketAvg = linkedOffers.length
    ? Math.round(linkedOffers.reduce((sum, offer) => sum + Number(offer.price || 0), 0) / linkedOffers.length)
    : request?.sector !== "jobs" && request?.budgetMax
      ? Math.round(request.budgetMax * 0.97)
      : Number(currentPrice || 0);
  const bestPrice = linkedOffers.length ? Math.min(...linkedOffers.map((offer) => Number(offer.price || 0))) : marketAvg;
  const bestScore = linkedOffers.length ? Math.max(...linkedOffers.map((offer) => Number(offer.score || 0))) : currentScore;
  const priceRank = [...linkedOffers.map((offer) => Number(offer.price || 0)), Number(currentPrice || 0)].sort((a, b) => a - b).findIndex((price) => price === Number(currentPrice || 0)) + 1;
  const scoreRank = [...linkedOffers.map((offer) => Number(offer.score || 0)), Number(currentScore || 0)].sort((a, b) => b - a).findIndex((score) => score === Number(currentScore || 0)) + 1;
  const priceGap = Number(currentPrice || 0) - marketAvg;
  const suggestions = [];
  if (priceGap > 0) suggestions.push(`Votre prix est ${fmt(priceGap, request?.currency || "CAD")} au-dessus de la moyenne des offres reçues.`);
  if (Number(currentPrice || 0) > bestPrice) suggestions.push(`Pour battre la meilleure offre prix, visez ${fmt(bestPrice, request?.currency || "CAD")} ou justifiez l’écart avec plus de valeur.`);
  if (currentScore < bestScore) suggestions.push(`Le meilleur concurrent est à ${bestScore}/100. Ajoutez flexibilité, délai clair ou moins de documents.`);
  if (!suggestions.length) suggestions.push("Votre offre est bien positionnée face aux offres concurrentes déjà reçues par le client.");
  return { linkedOffers, marketAvg, bestPrice, bestScore, priceRank, scoreRank, priceGap, suggestions };
}

function buildOfferTitle(request, sector, values) {
  const bySector = {
    realEstate: `${values.propertyType || "Logement"} — ${values.address || request?.city || "secteur demandé"}`,
    jobs: `${values.jobTitle || "Poste proposé"} — ${values.location || request?.city || "Canada"}`,
    immigration: `${values.service || "Service immigration"} — ${values.strategy || "stratégie"}`,
    insurance: `${values.insuranceType || "Assurance"} — ${values.coverage || "couverture"}`,
    auto: `${values.vehicle || "Véhicule proposé"} — ${values.monthlyPayment ? fmt(values.monthlyPayment, request?.currency || "CAD") + "/mois" : "offre auto"}`,
  };
  return bySector[sector] || `Offre pour ${request?.title}`;
}

function defaultOfferValues(sector, request) {
  const defaults = {
    realEstate: { propertyType: "1 chambre", address: request?.city || "Centre-ville", rent: request?.budgetMax || 1690, bedrooms: "1", furnished: "Oui", heatingIncluded: "Oui", availability: "2026-07-20", leaseDuration: "12 mois", distanceMetro: "< 5 min", included: "Chauffage", docsRequired: ["Pièce d’identité", "Preuve de revenus"], visitMode: "Les deux", pets: "À confirmer", photos: ["Salon lumineux", "Chambre", "Cuisine"] },
    jobs: { jobTitle: "Mécanicien poids lourds", wage: request?.budgetMax || 34.65, contract: "Temps plein", location: request?.city || "Montréal", startDate: "Dans 1 mois", lmia: "À valider", interviewDelay: "7 jours", benefits: "Formation", docsRequired: ["CV", "Diplôme", "Attestations d’expérience"] },
    immigration: { service: "Analyse dossier", fees: request?.budgetMax || 450, consultantStatus: "CRIC", analysisDelay: "48h", strategy: "À déterminer après analyse", nextStep: "Consultation vidéo", docsRequired: ["Passeport", "CV", "Diplômes", "Tests de langue"] },
    insurance: { insuranceType: "Auto", monthlyPremium: request?.budgetMax || 112, coverage: "Standard", deductible: "500$", activation: "24h", payment: "Mensuel", exclusions: "À confirmer selon dossier", docsRequired: ["Pièce d’identité", "Permis"] },
    auto: { vehicle: "Toyota RAV4 2022", vehiclePrice: request?.budgetMax || 31900, monthlyPayment: 489, year: 2022, mileage: 52000, financing: "Disponible", warranty: "Incluse", availability: "Cette semaine", tradeIn: "Acceptée", docsRequired: ["Permis", "Preuve de revenus", "Preuve d’adresse"] }
  };
  return defaults[sector] || defaults.realEstate;
}

function UserFirstTimeSignup() {
  const { state, actions } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    country: "Canada",
    province: "Québec",
    city: "Montréal",
    language: "Français",
    preferredContact: "Email + notifications Connectia",
    selectedServices: [],
    consent: false,
    accountType: "Client",
    companyId: state.organizations[0]?.id || "",
  });
  const isCanada = form.country === "Canada";
  const update = (key, value) => setForm((prev) => {
    if (key === "country" && value !== "Canada") return { ...prev, country: value, province: "Non applicable", city: "Non applicable" };
    if (key === "country" && value === "Canada") return { ...prev, country: value, province: "Québec", city: "Montréal" };
    return { ...prev, [key]: value };
  });
  const toggleService = (label) => update("selectedServices", form.selectedServices.includes(label) ? form.selectedServices.filter((item) => item !== label) : [...form.selectedServices, label]);
  const passwordOk = form.password.length >= 8 && form.password === form.confirmPassword;
  const canContinue = step === 1 ? form.firstName && form.lastName && form.email && form.phone : step === 2 ? passwordOk : step === 3 ? form.country && (form.country !== "Canada" || (form.province && form.city)) : form.selectedServices.length > 0 && form.consent;
  const finish = () => {
    actions.updateUserProfile({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      city: form.city,
      province: form.province,
      language: form.language,
      preferredContact: form.preferredContact,
      preferredSectors: form.selectedServices,
      accountStatus: "Nouveau",
      identityStatus: "À vérifier",
      profileCompletion: 58,
    });
    if (form.accountType === "Employé compagnie") {
      actions.addTeamMember({ companyId: form.companyId, name: `${form.firstName} ${form.lastName}`, email: form.email, login: form.email, password: form.password, role: "Agent", permissions: ["Demandes", "Offres", "Messages"] });
      actions.setRole(ROLES.ORG);
      actions.setMenu("orgDashboard");
      return;
    }
    if (form.accountType === "Compagnie") {
      actions.openModal("createPartner");
      return;
    }
    actions.setMenu("userServices");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <div className="grid min-h-[620px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-[#062238] p-6 text-white sm:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#F58A07]/20 blur-2xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-[#062238]">C</div>
                  <div>
                    <p className="text-xl font-black tracking-[-0.03em]">Connectia</p>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/45">Smart marketplace</p>
                  </div>
                </div>

                <div className="mt-10">
                  <Pill className="bg-white/10 text-white">Créer un compte client</Pill>
                  <h1 className="mt-4 max-w-sm text-3xl font-black tracking-[-0.05em] sm:text-4xl">Faites votre demande, recevez les meilleures offres comparées.</h1>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/68">Votre compte sert seulement à sécuriser vos demandes, suivre les réponses et comparer les offres reçues.</p>
                </div>
              </div>

              <div className="relative z-10 mt-10 space-y-3">
                {[
                  ["01", "Créer votre accès client"],
                  ["02", "Choisir les services qui vous intéressent"],
                  ["03", "Envoyer une demande détaillée"],
                  ["04", "Comparer les offres reçues"],
                ].map(([number, label]) => (
                  <div key={number} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-xs font-semibold text-white/85 ring-1 ring-white/10">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[11px] font-black text-[#062238]">{number}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F58A07]">Première inscription</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-900">Créer votre compte</h2>
              </div>
              <Pill className="bg-slate-100 text-slate-600">Étape {step}/4</Pill>
            </div>

            <div className="mb-6 grid grid-cols-4 gap-2">
              {["Compte", "Sécurité", "Localisation", "Services"].map((label, index) => {
                const item = index + 1;
                return (
                  <button key={label} onClick={() => item < step && setStep(item)} className={cls("rounded-2xl px-2 py-3 text-center text-[10px] font-bold transition", step === item ? "bg-[#F58A07] text-white shadow-sm" : step > item ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-400")}>
                    <span className="block text-sm">{item}</span>
                    <span className="mt-1 block truncate">{label}</span>
                  </button>
                );
              })}
            </div>

            {step === 1 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900">Informations de compte</h3>
                <p className="mt-1 text-xs text-slate-500">Ces informations restent simples. Les détails importants seront demandés dans chaque demande.</p>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {["Client", "Compagnie", "Employé compagnie"].map((type) => <button key={type} onClick={() => update("accountType", type)} className={cls("rounded-3xl border p-4 text-left text-xs font-bold transition", form.accountType === type ? "border-orange-200 bg-orange-50 text-orange-700" : "border-slate-200 bg-white text-slate-600")}>{type}</button>)}
                </div>
                {form.accountType === "Employé compagnie" && <label className="mt-4 block text-xs font-semibold text-slate-700">Compagnie<select value={form.companyId} onChange={(e) => update("companyId", e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100">{state.organizations.map((org) => <option key={org.id} value={org.id}>{org.name}</option>)}</select></label>}
                {form.accountType === "Compagnie" && <label className="mt-4 block text-xs font-semibold text-slate-700">Nom de la compagnie<input value={form.companyName || ""} onChange={(e) => update("companyName", e.target.value)} placeholder="Nom légal ou commercial" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" /></label>}
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <label className="text-xs font-semibold text-slate-700">Prénom<input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Votre prénom" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" /></label>
                  <label className="text-xs font-semibold text-slate-700">Nom<input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Votre nom" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" /></label>
                  <label className="text-xs font-semibold text-slate-700 md:col-span-2">Adresse courriel<input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="exemple@email.com" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" /></label>
                  <label className="text-xs font-semibold text-slate-700 md:col-span-2">Téléphone<input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 514 000 0000" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" /></label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900">Sécuriser votre accès</h3>
                <p className="mt-1 text-xs text-slate-500">Vous utiliserez ce compte pour suivre vos demandes, offres, messages et documents.</p>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <label className="text-xs font-semibold text-slate-700">Mot de passe<input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="Minimum 8 caractères" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" /></label>
                  <label className="text-xs font-semibold text-slate-700">Confirmer<input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Retaper le mot de passe" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" /></label>
                </div>
                <div className={cls("mt-4 rounded-2xl p-3 text-xs font-bold", passwordOk ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700")}>{passwordOk ? "Mot de passe valide." : "Le mot de passe doit contenir au moins 8 caractères et être identique."}</div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900">Localisation de base</h3>
                <p className="mt-1 text-xs text-slate-500">La localisation aide à afficher les bons services et partenaires.</p>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <label className="text-xs font-semibold text-slate-700">Pays<select value={form.country} onChange={(e) => update("country", e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100">{WORLD_COUNTRIES.map((country) => <option key={country}>{country}</option>)}</select></label>
                  <label className={cls("text-xs font-semibold", isCanada ? "text-slate-700" : "text-slate-400")}>Province<select value={form.province} disabled={!isCanada} onChange={(e) => update("province", e.target.value)} className={cls("mt-2 w-full rounded-2xl border px-3 py-3 text-sm outline-none transition", isCanada ? "border-slate-200 bg-white focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" : "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400")}>{isCanada ? CANADA_PROVINCES.map((province) => <option key={province}>{province}</option>) : <option>Non applicable</option>}</select></label>
                  <label className={cls("text-xs font-semibold", isCanada ? "text-slate-700" : "text-slate-400")}>Ville<input value={form.city} disabled={!isCanada} onChange={(e) => update("city", e.target.value)} placeholder={isCanada ? "Ville" : "Non applicable"} className={cls("mt-2 w-full rounded-2xl border px-3 py-3 text-sm outline-none transition", isCanada ? "border-slate-200 bg-white focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100" : "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400")} /></label>
                  <label className="text-xs font-semibold text-slate-700">Langue principale<select value={form.language} onChange={(e) => update("language", e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100"><option>Français</option><option>Anglais</option><option>Français + Anglais</option><option>Français + Anglais + Arabe</option></select></label>
                </div>
                {!isCanada && <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-500">Province et ville sont désactivées parce que le pays sélectionné n’est pas le Canada. Ces détails seront demandés plus tard si nécessaire selon le service.</div>}
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900">Services recherchés</h3>
                <p className="mt-1 text-xs text-slate-500">Choisissez les services qui vous intéressent. Vous pourrez faire une demande détaillée ensuite.</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {state.sectors.map((sector) => <button key={sector.id} onClick={() => toggleService(sector.label)} className={cls("rounded-3xl border p-4 text-left transition", form.selectedServices.includes(sector.label) ? "border-orange-200 bg-orange-50 text-[#F58A07] shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-orange-100 hover:bg-slate-50")}><span className="text-2xl">{sector.icon}</span><span className="ml-2 text-sm font-black">{sector.label}</span><p className="mt-2 text-xs font-semibold text-slate-500">{sector.description}</p></button>)}
                </div>
                <label className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-xs font-semibold text-slate-700"><input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-0.5" /> J’accepte que Connectia utilise mes informations uniquement pour créer mon compte, envoyer mes demandes aux professionnels compatibles et comparer les offres reçues.</label>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-2 border-t border-slate-100 pt-5">
              <div>{step > 1 && <Button variant="ghost" onClick={() => setStep(step - 1)}>← Retour</Button>}</div>
              <div className="flex gap-2">
                {step < 4 ? <Button disabled={!canContinue} onClick={() => setStep(step + 1)}>Continuer</Button> : <Button disabled={!canContinue} onClick={finish}>Créer mon compte</Button>}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function UserDashboard() {
  const { state, actions } = useApp();
  const activeRequests = state.requests.filter((r) => r.status !== "closed");
  const offers = state.offers;
  const missingDocs = state.requests.flatMap((r) => r.documents.filter((d) => d.status === "missing")).length;
  const bestOffer = [...offers].sort((a, b) => b.score - a.score)[0];
  return (
    <div>
      <SectionHeader
        title="Bonjour Raja 👋"
        subtitle="Votre dashboard est centré sur vos demandes, les offres reçues, les rendez-vous et la prochaine action utile."
        action={null}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Demandes actives" value={activeRequests.length} hint="Groupées par secteur" icon="📌" />
        <StatCard label="Offres reçues" value={offers.length} hint="Comparables par demande" icon="🏷️" />
        <StatCard label="Documents manquants" value={missingDocs} hint="À compléter pour accélérer" icon="📎" />
        <StatCard label="Meilleure offre" value={`${bestOffer?.score || 0}/100`} hint={bestOffer?.label || "Aucune"} icon="⭐" />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
            <div className="p-4">
              <Pill className="border-orange-100 bg-orange-50 text-orange-700">Next best action</Pill>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">Comparer vos offres immobilières avant de confirmer la visite</h3>
              <p className="mt-2 text-xs text-slate-500">Vous avez 2 offres pour la même demande. Connectia vous montre pourquoi une offre est meilleure, moins chère ou plus flexible.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => actions.openModal("compareOffers", { requestId: "req1" })}>Comparer les offres</Button>
                <Button variant="subtle" onClick={() => actions.openModal("appointment", { id: "app1" })}>Voir rendez-vous</Button>
              </div>
            </div>
            <div className="bg-[#062238] p-4 text-white">
              <p className="text-xs font-medium uppercase tracking-wide text-white/50">Pourquoi cette recommandation?</p>
              <ul className="mt-4 space-y-3 text-xs text-white/80">
                <li>✓ Une offre est sous la moyenne du marché</li>
                <li>✓ Disponibilité alignée avec votre date</li>
                <li>✓ Moins de friction documentaire</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-base font-semibold text-slate-900">Vos disponibilités client</h3>
          <p className="mt-1 text-xs text-slate-500">Ces créneaux seront affichés aux professionnels quand ils préparent une offre.</p>
          <div className="mt-4 space-y-2">
            {[].map((a) => <div key={a} className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">📅 {a}</div>)}
          </div>
          <Button className="mt-4 w-full" variant="subtle" onClick={() => actions.openModal("availability")}>Modifier disponibilités</Button>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <RequestsList compact />
        <OffersList compact />
      </div>
    </div>
  );
}

function RequestsList({ compact = false, role = "user" }) {
  const { state, actions } = useApp();
  const items = filterBySector(state.requests, state.activeSector).slice(0, compact ? 3 : undefined);

  if (role === "user") {
    const drafts = items.filter((r) => r.status === "draft");
    const sentRequests = items.filter((r) => r.status !== "draft");
    return (
      <div className="space-y-5">
        <Card className="border-orange-200 bg-orange-50/40 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Brouillons</h3>
              <p className="text-xs text-orange-700/80">Demandes commencées, pas encore envoyées.</p>
            </div>
            <Button variant="ghost" onClick={() => actions.openModal("createRequest")}>+ Nouvelle</Button>
          </div>
          <div className="space-y-3">
            {drafts.length ? drafts.map((r) => <RequestCard key={r.id} request={r} role={role} />) : <EmptyState text="Aucun brouillon." tone="orange" />}
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-900">Demandes envoyées</h3>
            <p className="text-xs text-slate-500">Demandes en traitement, offres reçues ou fermées.</p>
          </div>
          <div className="space-y-3">
            {sentRequests.length ? sentRequests.map((r) => <RequestCard key={r.id} request={r} role={role} />) : <EmptyState text="Aucune demande envoyée." />}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{role === "org" ? "Demandes reçues" : "Demandes"}</h3>
          <p className="text-xs text-slate-500">Demandes actives, documents et offres associées.</p>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((r) => <RequestCard key={r.id} request={r} role={role} />)}
      </div>
    </Card>
  );
}

function EmptyState({ text, tone = "slate" }) {
  return <div className={cls("rounded-2xl border border-dashed px-4 py-6 text-center text-xs font-semibold", tone === "orange" ? "border-orange-200 bg-white/70 text-orange-500" : "border-slate-200 bg-slate-50 text-slate-400")}>{text}</div>;
}

function RequestCard({ request, role = "user" }) {
  const { state, actions } = useApp();
  const sector = state.sectors.find((s) => s.id === request.sector);
  const offers = state.offers.filter((o) => o.requestId === request.id);
  const org = state.organizations.find((organization) => organization.sector === request.sector) || state.organizations[0];
  const assignedMember = org?.team?.find((member) => member.id === request.assignedTo);
  const client = state.user;
  const isDraft = request.status === "draft";
  const isClosed = request.status === "closed";
  const statusMap = {
    draft: "Brouillon",
    inProgress: "En traitement",
    offersReceived: "Offres reçues",
    closed: "Fermée",
  };
  return (
    <div className={cls("rounded-2xl border p-4 transition hover:shadow-sm", isDraft ? "border-orange-200 bg-white hover:border-orange-300" : isClosed ? "border-slate-200 bg-slate-50/80 hover:border-slate-300" : "border-slate-200 bg-white hover:border-orange-200")}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill className={sector?.color}>{sector?.icon} {sector?.label}</Pill>
            <Pill className="border-slate-200 bg-white text-slate-600">{requestTypeLabel(request.sector, request.type)}</Pill>
            <Pill className={isDraft ? "border-orange-200 bg-orange-50 text-orange-700" : isClosed ? "border-slate-300 bg-slate-100 text-slate-500" : request.status === "offersReceived" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-blue-200 bg-blue-50 text-blue-700"}>{statusMap[request.status] || request.status}</Pill>
            {role === "org" && <Pill className={priorityLabel(request.priorityScore ?? getRequestPriorityScore(request)).className}>{priorityLabel(request.priorityScore ?? getRequestPriorityScore(request)).label}</Pill>}
            <Pill className="border-slate-200 bg-white text-slate-600">{request.province}</Pill>
          </div>
          <h4 className="mt-3 font-semibold text-slate-900">{request.title}</h4>
          <p className="mt-1 text-xs text-slate-500">{request.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            <span>{valueLabelForSector(request.sector, "request", requestTypeLabel(request.sector, request.type))}: <b>{requestMainValue(request)}</b></span>
            <span>• Urgence: <b>{request.urgency}</b></span>
            <span>• Offres: <b>{offers.length}</b></span>
          </div>
          {role === "org" && (
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <PersonLine label={client.name} src={client.photoUrl} sub={`${client.city}, ${client.province}`} />
              <PersonLine label={assignedMember?.name || "Non affectée"} src={assignedMember?.photoUrl} sub={assignedMember ? `${assignedMember.role} responsable` : "Aucun responsable"} tone="orange" />
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Button variant="ghost" onClick={() => actions.openModal("requestDetails", { requestId: request.id })}>Détails</Button>
          {role === "user" && request.status === "draft" && <Button onClick={() => actions.updateRequestStatus(request.id, "inProgress")}>Envoyer</Button>}
          {role === "user" && offers.length > 0 && <Button variant="navy" onClick={() => actions.openUserOffers(request.id)}>Voir offres</Button>}
          {role === "org" && <Button variant="ghost" onClick={() => actions.exportRequestPdf(request.id)}>Exporter PDF</Button>}
          {role === "org" && <Button onClick={() => actions.openModal("createOffer", { requestId: request.id })}>Créer offre</Button>}
          {role === "org" && <Button variant="ghost" onClick={() => actions.openModal("assignRequest", { requestId: request.id })}>Affecter</Button>}
        </div>
      </div>
    </div>
  );
}

function OffersList({ compact = false }) {
  const { state } = useApp();
  const items = filterBySector(state.offers, state.activeSector).slice(0, compact ? 3 : undefined);
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Offres reçues</h3>
          <p className="text-xs text-slate-500">Chaque offre est reliée à une demande précise.</p>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
      </div>
    </Card>
  );
}

function OfferCard({ offer, orgMode = false }) {
  const { state, actions } = useApp();
  const org = state.organizations.find((o) => o.id === offer.orgId);
  const request = state.requests.find((r) => r.id === offer.requestId);
  const sector = state.sectors.find((s) => s.id === offer.sector);
  const offerer = org?.team?.find((member) => member.id === offer.assignedTo) || org?.team?.[0];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-orange-200 hover:shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill className={sector?.color}>{sector?.icon} {sector?.label}</Pill>
            <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">Score {offer.score}/100</Pill>
            <Pill className="border-slate-200 bg-slate-50 text-slate-600">{offer.label}</Pill>
          </div>
          <div className="mt-3 flex items-start gap-3">
            <AvatarBadge label={org?.name} src={org?.logoUrl} className="h-12 w-12 rounded-3xl" />
            <div className="min-w-0">
              <h4 className="font-semibold text-slate-900">{offer.title}</h4>
              <p className="mt-1 text-xs text-slate-500">{org?.name} • lié à: {request?.title}</p>
              <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500"><AvatarBadge label={offerer?.name} src={offerer?.photoUrl} className="h-6 w-6 rounded-full text-[9px]" /> Offreur: {offerer?.name || org?.contactPerson}</div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            <span>{valueLabelForSector(offer.sector, "offer")}: <b>{fmt(offer.price, offer.currency)}</b></span>
            <span>• Expire: <b>{offer.expiresAt}</b></span>
            <span>• Benchmark: <b>{offer.benchmark.comparedToUserOffers}</b></span>
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800">
              <b>Pourquoi c’est fort</b>
              <ul className="mt-1 list-disc pl-4">{offer.pros.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className="rounded-xl bg-orange-50 p-3 text-xs text-orange-800">
              <b>À surveiller</b>
              <ul className="mt-1 list-disc pl-4">{offer.cons.length ? offer.cons.map((c) => <li key={c}>{c}</li>) : <li>Aucun point bloquant</li>}</ul>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Button variant="ghost" onClick={() => actions.openModal("offerDetails", { offerId: offer.id })}>Détails</Button>
          {!orgMode && <Button variant="success" onClick={() => actions.acceptOffer(offer.id)}>Accepter</Button>}
          {!orgMode && <Button variant="ghost" onClick={() => actions.saveOffer(offer.id)}>Sauvegarder</Button>}
          {orgMode && <Button onClick={() => actions.openModal("improveOffer", { offerId: offer.id })}>Améliorer</Button>}
        </div>
      </div>
    </div>
  );
}

function PartnerLogo({ org, index = 0 }) {
  const initials = org.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  const styles = [
    "bg-[#062238] text-white",
    "bg-orange-100 text-orange-700",
    "bg-emerald-100 text-emerald-700",
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
  ];
  return (
    <div title={org.name} className={cls("flex h-8 w-8 items-center justify-center rounded-xl text-[10px] font-bold ring-2 ring-white", styles[index % styles.length])}>
      {initials}
    </div>
  );
}

function PartnerCarousel({ organizations }) {
  const items = [...organizations, ...organizations, ...organizations];
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-50 px-2 py-2 ring-1 ring-slate-100">
      <style>{`
        @keyframes connectia-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .connectia-marquee-track {
          animation: connectia-marquee 24s linear infinite;
        }
        .connectia-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-50 to-transparent" />
      <div className="connectia-marquee-track flex w-max items-center gap-2">
        {items.map((org, index) => (
          <div key={`${org.id}-${index}`} className="flex shrink-0 items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-100">
            <PartnerLogo org={org} index={index} />
            <span className="whitespace-nowrap text-xs font-semibold text-slate-700">{org.name}</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Vérifié</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserServices() {
  const { state, actions } = useApp();
  return (
    <div>
      <SectionHeader title="Services" subtitle="Choisissez votre besoin et recevez des offres adaptées." />

      <Card className="mb-4 overflow-hidden">
        <div className="p-4">
          <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#F58A07]">Partenaires vérifiés</p>
              <p className="mt-1 text-xs text-slate-500">Des professionnels actifs peuvent répondre à vos demandes selon le service choisi.</p>
            </div>
            <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">{state.organizations.length} actifs</Pill>
          </div>
          <PartnerCarousel organizations={state.organizations} />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {state.sectors.map((s) => {
          return (
            <Card key={s.id} className="p-4 transition hover:border-orange-200 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-2xl">{s.icon}</div>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{s.label}</h3>
                  <p className="mt-1 text-xs text-slate-500">{s.description}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button onClick={() => actions.openModal("createRequest", { sector: s.id })}>Faire une demande</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function UserRequests() {
  return (
    <div>
      <SectionHeader title="Mes demandes" subtitle="Suivez vos demandes actives, vos documents et les offres associées." />
      <SectorFilter />
      <RequestsList />
    </div>
  );
}

function UserOffers() {
  return (
    <div>
      <SectionHeader title="Offres reçues" subtitle="Comparez les offres reçues et choisissez celle qui répond le mieux à votre demande." />
      <SectorFilter />
      <OffersComparisonBoard />
    </div>
  );
}

function OffersComparisonBoard() {
  const { state, actions } = useApp();
  const requestsWithOffers = filterBySector(state.requests, state.activeSector).filter((request) => state.offers.some((offer) => offer.requestId === request.id));
  const initialRequestId = state.selectedOfferRequestId && requestsWithOffers.some((r) => r.id === state.selectedOfferRequestId) ? state.selectedOfferRequestId : requestsWithOffers[0]?.id;
  const [selectedRequestId, setSelectedRequestId] = useState(initialRequestId);
  const safeSelectedRequestId = requestsWithOffers.some((r) => r.id === selectedRequestId) ? selectedRequestId : initialRequestId;
  const request = requestsWithOffers.find((r) => r.id === safeSelectedRequestId) || requestsWithOffers[0];
  const offers = state.offers.filter((offer) => offer.requestId === request?.id).sort((a, b) => b.score - a.score);
  const topOffers = offers.slice(0, 3);
  const otherOffers = offers.slice(3);
  const [selectedOfferId, setSelectedOfferId] = useState(topOffers[0]?.id);
  const safeSelectedOfferId = topOffers.some((offer) => offer.id === selectedOfferId) ? selectedOfferId : topOffers[0]?.id;
  const selectedOffer = topOffers.find((offer) => offer.id === safeSelectedOfferId) || topOffers[0];
  const selectedSector = state.sectors.find((s) => s.id === request?.sector);

  if (!request) {
    return <Card className="p-4"><p className="text-xs font-semibold text-slate-500">Aucune offre reçue pour le moment.</p></Card>;
  }

  return (
    <div className="space-y-5">
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {requestsWithOffers.map((r) => {
            const sector = state.sectors.find((s) => s.id === r.sector);
            const count = state.offers.filter((o) => o.requestId === r.id).length;
            return (
              <button key={r.id} onClick={() => setSelectedRequestId(r.id)} className={cls("inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium", safeSelectedRequestId === r.id ? "border-[#F58A07] bg-orange-50 text-[#F58A07]" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50")}>
                <span>{sector?.icon}</span>
                <span>{r.title}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{count}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {selectedOffer && (
        <Card className="overflow-hidden border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-white shadow-sm">
          <div className="grid gap-0 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Pill className="border-emerald-200 bg-emerald-100 text-emerald-800">Offre sélectionnée</Pill>
                <Pill className={selectedSector?.color}>{selectedSector?.icon} {selectedSector?.label}</Pill>
                <Pill className="border-white/60 bg-white text-slate-600">Score {selectedOffer.score}/100</Pill>
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-slate-900">{selectedOffer.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{state.organizations.find((o) => o.id === selectedOffer.orgId)?.name}</p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-emerald-100">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{valueLabelForSector(selectedOffer.sector, "offer")}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{fmt(selectedOffer.price, selectedOffer.currency)}</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-emerald-100">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{comparisonLabelForSector(selectedOffer.sector)}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{fmt(selectedOffer.benchmark.marketAvg, selectedOffer.currency)}</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-emerald-100">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Expire</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{selectedOffer.expiresAt}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-emerald-100/80 p-4 text-xs text-emerald-900 ring-1 ring-emerald-200">
                  <p className="font-semibold">Points forts</p>
                  <ul className="mt-2 space-y-1">{selectedOffer.pros.map((item) => <li key={item}>• {item}</li>)}</ul>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 text-xs text-slate-700 ring-1 ring-emerald-100">
                  <p className="font-semibold text-slate-900">À vérifier</p>
                  <ul className="mt-2 space-y-1">{selectedOffer.cons.length ? selectedOffer.cons.map((item) => <li key={item}>• {item}</li>) : <li>• Aucun point bloquant</li>}</ul>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Button variant="success" onClick={() => actions.acceptOffer(selectedOffer.id)}>Accepter</Button>
                <Button variant="ghost" onClick={() => actions.openModal("offerDetails", { offerId: selectedOffer.id })}>Détails</Button>
              </div>
            </div>

            <div className="border-l border-emerald-100 bg-emerald-900 p-5 text-white">
              <div className="mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200">Top 3 choix</p>
                <p className="mt-1 text-sm text-emerald-100/80">Cliquez sur une option pour afficher son détail à gauche.</p>
              </div>

              <div className="space-y-3">
                {topOffers.map((offer, index) => {
                  const org = state.organizations.find((o) => o.id === offer.orgId);
                  const isSelected = safeSelectedOfferId === offer.id;
                  const topMeta = [
                    { icon: "🏆", label: "Top 1", badge: "Meilleur choix", badgeClass: "bg-yellow-300 text-yellow-950" },
                    { icon: "🥈", label: "Top 2", badge: "Très bon choix", badgeClass: "bg-slate-200 text-slate-800" },
                    { icon: "🥉", label: "Top 3", badge: "Bon choix", badgeClass: "bg-orange-200 text-orange-900" },
                  ][index];
                  return (
                    <button key={offer.id} onClick={() => setSelectedOfferId(offer.id)} className={cls("w-full rounded-2xl p-4 text-left transition", isSelected ? "bg-emerald-500/25 ring-2 ring-emerald-300/70" : "bg-white/10 ring-1 ring-white/10 hover:bg-white/15")}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={cls("flex h-8 w-8 items-center justify-center rounded-full text-sm", isSelected ? "bg-white text-emerald-800" : "bg-white/15 text-white")}>{topMeta.icon}</span>
                            <p className="text-sm font-semibold text-white">{topMeta.label} · {offer.label}</p>
                            <span className={cls("rounded-full px-2 py-0.5 text-[10px] font-semibold", topMeta.badgeClass)}>{topMeta.badge}</span>
                          </div>
                          <p className="mt-1 text-xs text-emerald-100/80">{org?.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-semibold text-white">{offer.score}</p>
                          <p className="text-[11px] text-emerald-100/70">Score</p>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-white/10 px-3 py-2">
                          <p className="text-[10px] uppercase tracking-wide text-emerald-100/60">{valueLabelForSector(offer.sector, "offer")}</p>
                          <p className="mt-1 text-sm font-semibold text-white">{fmt(offer.price, offer.currency)}</p>
                        </div>
                        <div className="rounded-xl bg-white/10 px-3 py-2">
                          <p className="text-[10px] uppercase tracking-wide text-emerald-100/60">Position</p>
                          <p className="mt-1 text-sm font-semibold text-white">{offer.benchmark.comparedToUserOffers}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Autres offres</h3>
            <p className="text-xs text-slate-500">Les offres restantes restent disponibles pour consultation.</p>
          </div>
        </div>

        {otherOffers.length > 0 ? (
          <div className="space-y-3">
            {otherOffers.map((offer) => {
              const org = state.organizations.find((o) => o.id === offer.orgId);
              return (
                <div key={offer.id} className="rounded-3xl border border-slate-200 bg-white p-4 transition hover:shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Pill className="border-slate-200 bg-slate-50 text-slate-600">{offer.label}</Pill>
                        <Pill className="border-slate-200 bg-slate-50 text-slate-600">Score {offer.score}/100</Pill>
                      </div>
                      <h4 className="mt-3 text-base font-semibold text-slate-900">{offer.title}</h4>
                      <p className="mt-1 text-xs text-slate-500">{org?.name}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{valueLabelForSector(offer.sector, "offer")}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{fmt(offer.price, offer.currency)}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Référence</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{fmt(offer.benchmark.marketAvg, offer.currency)}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Position</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{offer.benchmark.comparedToUserOffers}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Expire</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{offer.expiresAt}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
                      <Button variant="ghost" onClick={() => actions.openModal("offerDetails", { offerId: offer.id })}>Détails</Button>
                      <Button variant="navy" onClick={() => actions.openModal("offerDetails", { offerId: offer.id })}>Voir offre</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-xs font-semibold text-slate-400">
            Aucune autre offre pour cette demande.
          </div>
        )}
      </Card>
    </div>
  );
}

function AppointmentGroupCard({ group, statusType }) {
  const { state, actions } = useApp();
  const { key, offer, request, org, sector, appointments } = group;
  const nextAppointment = appointments[0];
  const isConfirmed = statusType === "confirmed";

  return (
    <Card key={key} className={cls("overflow-hidden bg-white", isConfirmed ? "border-emerald-200" : "border-blue-200")}>
      <div className="grid gap-0 xl:grid-cols-[0.95fr_1.05fr]">
        <div className={cls("p-5", isConfirmed ? "bg-gradient-to-br from-emerald-50 via-slate-50 to-white" : "bg-gradient-to-br from-blue-50 via-slate-50 to-white")}>
          <div className="flex flex-wrap items-center gap-2">
            {sector && <Pill className={sector.color}>{sector.icon} {sector.label}</Pill>}
            <Pill className={isConfirmed ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-blue-100 bg-blue-50 text-blue-700"}>{appointments.length} RDV</Pill>
            <Pill className={isConfirmed ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-orange-200 bg-orange-50 text-orange-700"}>{isConfirmed ? "Confirmé" : "Proposé"}</Pill>
          </div>

          <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-slate-900">{offer?.title || request?.title}</h3>
          <p className="mt-1 text-xs text-slate-500">{org?.name} • {request?.title}</p>

          {offer && (
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/90 p-3 ring-1 ring-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{valueLabelForSector(offer.sector, "offer")}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{fmt(offer.price, offer.currency)}</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-3 ring-1 ring-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Score</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{offer.score}/100</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-3 ring-1 ring-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Offre</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{offer.label}</p>
              </div>
            </div>
          )}

          <div className="mt-4 rounded-2xl bg-white/80 p-3 ring-1 ring-slate-100">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Prochain créneau</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{nextAppointment.date} à {nextAppointment.time}</p>
            <p className="mt-1 text-xs text-slate-500">{nextAppointment.mode}</p>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-slate-900">{isConfirmed ? "Rendez-vous confirmés" : "Rendez-vous proposés"}</h4>
              <p className="text-xs text-slate-500">Contact et disponibilité liés à cette offre.</p>
            </div>
            {offer && <Button variant="ghost" onClick={() => actions.openModal("offerDetails", { offerId: offer.id })}>Voir offre</Button>}
          </div>

          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className={cls("rounded-3xl border bg-white p-4 transition hover:shadow-sm", isConfirmed ? "border-emerald-200 hover:border-emerald-300" : "border-blue-200 hover:border-blue-300")}>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill className="border-slate-200 bg-slate-50 text-slate-600">{appointment.mode}</Pill>
                      <Pill className={isConfirmed ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-orange-200 bg-orange-50 text-orange-700"}>{isConfirmed ? "Confirmé" : "Proposé"}</Pill>
                    </div>
                    <h5 className="mt-3 font-semibold text-slate-900">{appointment.title}</h5>
                    <p className="mt-1 text-xs text-slate-500">{appointment.date} à {appointment.time}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {!isConfirmed && <Button onClick={() => actions.confirmAppointment(appointment.id)}>Confirmer</Button>}
                    <Button variant="ghost" onClick={() => actions.openModal("reschedule", { appointmentId: appointment.id })}>{isConfirmed ? "Modifier" : "Autre créneau"}</Button>
                  </div>
                </div>

                {appointment.contact && (
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <Info label="Contact" value={appointment.contact.method} />
                    <Info label="Téléphone" value={appointment.contact.phone} />
                    <Info label="Email" value={appointment.contact.email} />
                  </div>
                )}
                {appointment.contact?.note && <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">{appointment.contact.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function UserAppointments() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState("proposed");
  const appointmentsByOffer = state.appointments.reduce((groups, appointment) => {
    const key = appointment.offerId || `request-${appointment.requestId}`;
    return { ...groups, [key]: [...(groups[key] || []), appointment] };
  }, {});
  const groups = Object.entries(appointmentsByOffer).map(([key, appointments]) => {
    const first = appointments[0];
    const offer = state.offers.find((o) => o.id === first.offerId);
    const request = state.requests.find((r) => r.id === first.requestId);
    const org = state.organizations.find((o) => o.id === first.orgId);
    const sector = state.sectors.find((s) => s.id === (offer?.sector || request?.sector));
    return { key, offer, request, org, sector, appointments };
  });

  const proposedGroups = groups.map((group) => ({ ...group, appointments: group.appointments.filter((a) => a.status !== "confirmed") })).filter((group) => group.appointments.length);
  const confirmedGroups = groups.map((group) => ({ ...group, appointments: group.appointments.filter((a) => a.status === "confirmed") })).filter((group) => group.appointments.length);
  const visibleGroups = activeTab === "confirmed" ? confirmedGroups : proposedGroups;

  return (
    <div>
      <SectionHeader title="Rendez-vous" subtitle="Vos rendez-vous sont regroupés par offre pour suivre clairement chaque prochaine étape." />
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <div className="inline-flex rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
          <button onClick={() => setActiveTab("proposed")} className={cls("rounded-xl px-4 py-2 text-xs font-semibold transition", activeTab === "proposed" ? "bg-[#062238] text-white" : "text-slate-500 hover:bg-slate-50")}>Proposés · {proposedGroups.reduce((sum, group) => sum + group.appointments.length, 0)}</button>
          <button onClick={() => setActiveTab("confirmed")} className={cls("rounded-xl px-4 py-2 text-xs font-semibold transition", activeTab === "confirmed" ? "bg-emerald-600 text-white" : "text-slate-500 hover:bg-slate-50")}>Confirmés · {confirmedGroups.reduce((sum, group) => sum + group.appointments.length, 0)}</button>
        </div>
      </div>

      <div className="grid gap-4">
        {visibleGroups.map((group) => <AppointmentGroupCard key={`${activeTab}-${group.key}`} group={group} statusType={activeTab} />)}
        {!visibleGroups.length && <EmptyState text={activeTab === "confirmed" ? "Aucun rendez-vous confirmé." : "Aucun rendez-vous proposé."} />}
      </div>
    </div>
  );
}

function MessagesPage() {
  const { state, actions } = useApp();
  const conversations = Object.entries(state.messages.reduce((groups, message) => {
    const key = message.offerId || `request-${message.requestId}`;
    return { ...groups, [key]: [...(groups[key] || []), message] };
  }, {})).map(([key, messages]) => {
    const first = messages[0];
    const offer = state.offers.find((o) => o.id === first.offerId);
    const request = state.requests.find((r) => r.id === first.requestId);
    const org = state.organizations.find((o) => o.id === offer?.orgId) || state.organizations.find((o) => messages.some((m) => m.from === o.name));
    const sector = state.sectors.find((s) => s.id === (offer?.sector || request?.sector));
    const lastMessage = messages[messages.length - 1];
    const unreadCount = messages.filter((m) => m.unread).length;
    return { key, offer, request, org, sector, messages, lastMessage, unreadCount };
  });
  const [activeKey, setActiveKey] = useState(conversations[0]?.key);
  const activeConversation = conversations.find((c) => c.key === activeKey) || conversations[0];

  if (!activeConversation) {
    return <EmptyState text="Aucun message pour le moment." />;
  }

  return (
    <div>
      <SectionHeader title="Messages" subtitle="Vos messages sont regroupés par offre pour garder chaque suivi clair." />

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-900">Boîtes par offre</h3>
              <p className="text-xs text-slate-500">Chaque conversation reste liée à une offre précise.</p>
            </div>
            <Pill className="border-blue-100 bg-blue-50 text-blue-700">{conversations.length}</Pill>
          </div>

          <div className="space-y-3">
            {conversations.map((conversation) => {
              const isActive = activeConversation.key === conversation.key;
              return (
                <button key={conversation.key} onClick={() => setActiveKey(conversation.key)} className={cls("w-full rounded-3xl border p-4 text-left transition", isActive ? "border-[#F58A07] bg-orange-50/60 shadow-sm" : "border-slate-200 bg-white hover:bg-slate-50")}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {conversation.sector && <Pill className={conversation.sector.color}>{conversation.sector.icon} {conversation.sector.label}</Pill>}
                        {conversation.unreadCount > 0 && <Pill className="border-orange-200 bg-orange-100 text-orange-700">{conversation.unreadCount} nouveau</Pill>}
                      </div>
                      <h4 className="mt-3 truncate text-sm font-semibold text-slate-900">{conversation.offer?.title || conversation.request?.title}</h4>
                      <p className="mt-1 text-xs text-slate-500">{conversation.org?.name || conversation.lastMessage.from}</p>
                      <p className="mt-2 line-clamp-2 text-xs text-slate-600">{conversation.lastMessage.text}</p>
                    </div>
                    {conversation.offer && (
                      <div className="shrink-0 text-right">
                        <p className="text-xs font-semibold text-slate-900">{fmt(conversation.offer.price, conversation.offer.currency)}</p>
                        <p className="text-[11px] text-slate-400">Score {conversation.offer.score}</p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {activeConversation.sector && <Pill className={activeConversation.sector.color}>{activeConversation.sector.icon} {activeConversation.sector.label}</Pill>}
                  {activeConversation.offer && <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">Score {activeConversation.offer.score}/100</Pill>}
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{activeConversation.offer?.title || activeConversation.request?.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{activeConversation.org?.name} • {activeConversation.request?.title}</p>
              </div>
              {activeConversation.offer && <Button variant="ghost" onClick={() => actions.openModal("offerDetails", { offerId: activeConversation.offer.id })}>Voir offre</Button>}
            </div>
          </div>

          {activeConversation.offer && (
            <div className="grid gap-3 border-b border-slate-100 p-4 md:grid-cols-3">
              <Info label={valueLabelForSector(activeConversation.offer.sector, "offer")} value={fmt(activeConversation.offer.price, activeConversation.offer.currency)} />
              <Info label="Statut" value={activeConversation.offer.status} />
              <Info label="Expire" value={activeConversation.offer.expiresAt} />
            </div>
          )}

          <div className="max-h-[420px] space-y-3 overflow-auto bg-slate-50/60 p-4">
            {activeConversation.messages.map((message) => {
              const isUser = message.senderType === "user";
              return (
                <div key={message.id} className={cls("flex", isUser ? "justify-end" : "justify-start")}>
                  <div className={cls("max-w-[78%] rounded-3xl px-4 py-3 shadow-sm", isUser ? "bg-[#062238] text-white" : "bg-white text-slate-700 ring-1 ring-slate-100")}>
                    <p className={cls("text-[11px] font-semibold", isUser ? "text-white/60" : "text-slate-400")}>{message.from} • {message.date} {message.time}</p>
                    <p className="mt-1 text-xs leading-relaxed">{message.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 bg-white p-4">
            <div className="flex gap-2">
              <input className="flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#F58A07]" placeholder="Écrire un message lié à cette offre..." />
              <Button onClick={() => actions.sendMessage(activeConversation.offer?.title || "conversation")}>Envoyer</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function UserProfile() {
  const { state, actions } = useApp();
  return (
    <div>
      <SectionHeader title="Profil client" subtitle="Gérez vos informations personnelles et vos préférences de contact." />
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <AvatarBadge label={state.user.name} src={state.user.photoUrl} className="h-16 w-16 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{state.user.name}</h3>
              <p className="text-xs text-slate-500">{state.user.city}, {state.user.province}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs font-semibold"><span>Profil complété</span><span>{state.user.profileCompletion}%</span></div>
            <div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-[#F58A07]" style={{ width: `${state.user.profileCompletion}%` }} /></div>
          </div>
          <Button className="mt-4 w-full" onClick={() => actions.notify("Profil mis à jour.")}>Mettre à jour le profil</Button>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-slate-900">Préférences</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Info label="Email" value={state.user.email} />
            <Info label="Téléphone" value={state.user.phone} />
            <Info label="Contact préféré" value={state.user.preferredContact} />
            <Info label="Province" value={state.user.province} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold text-slate-800">{value}</p></div>;
}

function AvatarBadge({ label = "", src = "", className = "" }) {
  const initials = String(label || "?").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={cls("relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#062238] text-xs font-semibold text-white ring-2 ring-white shadow-sm", className)}>
      {src ? <img src={src} alt={label} className="h-full w-full object-cover" /> : initials}
    </div>
  );
}

function PersonLine({ label, sub, tone = "slate", src = "" }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
      <AvatarBadge label={label} src={src} className={tone === "orange" ? "bg-[#F58A07]" : ""} />
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-slate-900">{label}</p>
        {sub && <p className="truncate text-[11px] text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}

function FilterTabs({ items, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button key={item.value} onClick={() => onChange(item.value)} className={cls("rounded-full border px-3 py-2 text-xs font-semibold transition", active === item.value ? "border-[#F58A07] bg-orange-50 text-[#F58A07]" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50")}>
          {item.label}
          {item.count !== undefined && <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">{item.count}</span>}
        </button>
      ))}
    </div>
  );
}

function FilterDropdown({ label, items, value, onChange }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
      {label}
      <div className="relative mt-2">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-xs font-semibold text-slate-700 outline-none transition hover:border-orange-200 focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100"
        >
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}{item.count !== undefined ? ` (${item.count})` : ""}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">▾</span>
      </div>
    </label>
  );
}

function getOrgDashboardConfig(org) {
  const configs = {
    realEstate: {
      marketTitle: "Marché immobilier",
      unitLabel: "Référence marché",
      segments: [
        { type: "Location", zone: "Centre-ville", active: 42, closed: 18, avgValue: "$1 740", ourAvg: "$1 690", position: "50$ sous le marché", treatment: "18h", opportunity: "Très forte demande pour 1 chambre meublé proche métro", tone: "emerald" },
        { type: "Location", zone: "Griffintown", active: 31, closed: 11, avgValue: "$1 820", ourAvg: "$1 780", position: "40$ sous le marché", treatment: "22h", opportunity: "Bonne zone, clients sensibles aux inclusions", tone: "blue" },
        { type: "Vente", zone: "Montréal", active: 16, closed: 7, avgValue: "$535k", ourAvg: "$522k", position: "2.4% sous le marché", treatment: "2.8 j", opportunity: "Mieux convertir avec préqualification hypothécaire", tone: "orange" },
        { type: "Mise en location", zone: "Laval", active: 13, closed: 6, avgValue: "$1 590", ourAvg: "$1 620", position: "30$ au-dessus du marché", treatment: "1.9 j", opportunity: "À améliorer par photos, inclusions et disponibilité rapide", tone: "red" },
      ],
      kpis: [
        { label: "Offres clôturées", value: "39", hint: "Acceptées ou finalisées", icon: "✅" },
        { label: "Temps traitement", value: "21h", hint: "Moyenne réception → offre", icon: "⚡" },
        { label: "Sous marché", value: "64%", hint: "Offres mieux placées que référence", icon: "📉" },
        { label: "Meilleure zone", value: "Centre-ville", hint: "Plus forte conversion", icon: "📍" },
      ],
      benchmarkNote: "Objectif: rester sous la référence marché sur les locations, surtout Centre-ville et Griffintown.",
      requestDistribution: [
        { label: "Location", value: 38, count: 86 },
        { label: "Vente", value: 22, count: 50 },
        { label: "Achat", value: 16, count: 36 },
        { label: "Mise en location", value: 14, count: 32 },
        { label: "Court terme", value: 10, count: 23 },
      ],
      zoneDistribution: [
        { label: "Centre-ville", value: 30, count: 68 },
        { label: "Griffintown", value: 22, count: 49 },
        { label: "Laval", value: 18, count: 41 },
        { label: "Longueuil", value: 16, count: 36 },
        { label: "Québec", value: 14, count: 32 },
      ],
      topSearches: [
        { label: "Appartement 1 chambre", count: 74, trend: "+12%" },
        { label: "Studio meublé", count: 48, trend: "+8%" },
        { label: "Condo 2 chambres", count: 39, trend: "+4%" },
        { label: "Proche métro", count: 36, trend: "+10%" },
        { label: "Chauffage inclus", count: 28, trend: "+6%" },
      ],
    },
    insurance: {
      marketTitle: "Marché assurance",
      unitLabel: "Prime moyenne",
      segments: [
        { type: "Auto", zone: "Québec", active: 58, closed: 24, avgValue: "$118/mois", ourAvg: "$112/mois", position: "6$ sous le marché", treatment: "9h", opportunity: "Volume élevé, réponse rapide importante", tone: "emerald" },
        { type: "Habitation", zone: "Montréal", active: 36, closed: 15, avgValue: "$74/mois", ourAvg: "$79/mois", position: "5$ au-dessus du marché", treatment: "14h", opportunity: "Besoin de mieux expliquer la couverture", tone: "orange" },
        { type: "Auto + habitation", zone: "Québec", active: 29, closed: 17, avgValue: "$176/mois", ourAvg: "$165/mois", position: "11$ sous le marché", treatment: "11h", opportunity: "Meilleur segment pour bundles", tone: "emerald" },
        { type: "Entreprise", zone: "Ontario", active: 12, closed: 5, avgValue: "$240/mois", ourAvg: "$252/mois", position: "12$ au-dessus du marché", treatment: "2.1 j", opportunity: "Nécessite qualification avant soumission", tone: "red" },
      ],
      kpis: [
        { label: "Offres clôturées", value: "61", hint: "Auto, habitation, bundle", icon: "✅" },
        { label: "Temps traitement", value: "13h", hint: "Moyenne devis envoyé", icon: "⚡" },
        { label: "Bundles gagnants", value: "59%", hint: "Auto + habitation", icon: "🛡️" },
        { label: "Top catégorie", value: "Auto", hint: "Plus forte demande", icon: "🚗" },
      ],
      benchmarkNote: "Objectif: pousser les offres auto + habitation, car elles sont sous marché et convertissent mieux.",
      requestDistribution: [
        { label: "Auto", value: 34, count: 112 },
        { label: "Habitation", value: 26, count: 86 },
        { label: "Auto + habitation", value: 22, count: 73 },
        { label: "Entreprise", value: 11, count: 36 },
      ],
      zoneDistribution: [
        { label: "Montréal", value: 29, count: 96 },
        { label: "Québec", value: 24, count: 79 },
        { label: "Laval", value: 18, count: 59 },
        { label: "Gatineau", value: 16, count: 53 },
        { label: "Ontario", value: 13, count: 43 },
      ],
      topSearches: [
        { label: "Soumission auto rapide", count: 91, trend: "+15%" },
        { label: "Auto + habitation", count: 73, trend: "+18%" },
        { label: "Habitation locataire", count: 54, trend: "+9%" },
        { label: "Prime mensuelle basse", count: 47, trend: "+7%" },
        { label: "Activation immédiate", count: 31, trend: "+5%" },
      ],
    },
    auto: {
      marketTitle: "Marché auto",
      unitLabel: "Référence marché",
      segments: [
        { type: "SUV occasion", zone: "Montréal", active: 44, closed: 19, avgValue: "$32 800", ourAvg: "$31 900", position: "900$ sous le marché", treatment: "16h", opportunity: "Très fort intérêt sur paiement mensuel", tone: "emerald" },
        { type: "Financement", zone: "Québec", active: 37, closed: 14, avgValue: "7.9%", ourAvg: "7.4%", position: "0.5% sous le marché", treatment: "20h", opportunity: "Meilleur taux = meilleure conversion", tone: "blue" },
        { type: "Leasing", zone: "Laval", active: 21, closed: 8, avgValue: "$489/mois", ourAvg: "$505/mois", position: "16$ au-dessus du marché", treatment: "1.6 j", opportunity: "Ajuster mensualité ou inclure entretien", tone: "orange" },
        { type: "Reprise véhicule", zone: "Montréal", active: 18, closed: 9, avgValue: "$12 400", ourAvg: "$12 900", position: "500$ mieux que marché", treatment: "12h", opportunity: "Bon levier pour conclure achat", tone: "emerald" },
      ],
      kpis: [
        { label: "Offres clôturées", value: "50", hint: "Achat, leasing, financement", icon: "✅" },
        { label: "Temps traitement", value: "18h", hint: "Lead → offre", icon: "⚡" },
        { label: "Sous marché", value: "57%", hint: "Prix ou mensualité compétitifs", icon: "📉" },
        { label: "Top segment", value: "SUV", hint: "Meilleure traction", icon: "🚗" },
      ],
      benchmarkNote: "Objectif: vendre avec mensualité claire, garantie et reprise avantageuse.",
      requestDistribution: [
        { label: "Achat", value: 31, count: 92 },
        { label: "Financement", value: 27, count: 80 },
        { label: "Leasing", value: 19, count: 56 },
        { label: "Reprise", value: 15, count: 45 },
      ],
      zoneDistribution: [
        { label: "Montréal", value: 32, count: 95 },
        { label: "Québec", value: 24, count: 71 },
        { label: "Laval", value: 19, count: 56 },
        { label: "Rive-Sud", value: 15, count: 44 },
        { label: "Ontario", value: 10, count: 30 },
      ],
      topSearches: [
        { label: "SUV occasion", count: 88, trend: "+14%" },
        { label: "Paiement mensuel bas", count: 76, trend: "+11%" },
        { label: "Toyota / Honda", count: 51, trend: "+7%" },
        { label: "Kilométrage bas", count: 42, trend: "+4%" },
        { label: "Reprise véhicule", count: 36, trend: "+6%" },
      ],
    },
    jobs: {
      marketTitle: "Marché recrutement",
      unitLabel: "Salaire marché",
      segments: [
        { type: "Mécaniciens", zone: "Québec", active: 46, closed: 21, avgValue: "$33.20/h", ourAvg: "$34.65/h", position: "1.45$ au-dessus du marché", treatment: "1.2 j", opportunity: "Excellent potentiel international", tone: "emerald" },
        { type: "IT", zone: "Ontario", active: 35, closed: 12, avgValue: "$48/h", ourAvg: "$46/h", position: "2$ sous le marché", treatment: "2.4 j", opportunity: "Besoin de meilleurs salaires ou remote", tone: "orange" },
      ],
      kpis: [
        { label: "Offres clôturées", value: "54", hint: "Candidats avancés", icon: "✅" },
        { label: "Temps traitement", value: "1.8 j", hint: "Demande → shortlist", icon: "⚡" },
        { label: "Salaire compétitif", value: "68%", hint: "Au-dessus du marché", icon: "💼" },
        { label: "Top métier", value: "Mécanique", hint: "Meilleure traction", icon: "🔧" },
      ],
      benchmarkNote: "Objectif: accélérer la préqualification et pousser les salaires au-dessus du marché sur métiers en tension.",
      requestDistribution: [
        { label: "Emploi", value: 36, count: 119 },
        { label: "Profil à évaluer", value: 25, count: 83 },
        { label: "Employeur avec support", value: 21, count: 70 },
        { label: "Permis / EIMT", value: 12, count: 40 },
        { label: "Entrevues", value: 6, count: 20 },
      ],
      zoneDistribution: [
        { label: "Québec", value: 34, count: 113 },
        { label: "Ontario", value: 28, count: 93 },
        { label: "Alberta", value: 16, count: 53 },
        { label: "Montréal", value: 14, count: 47 },
        { label: "Remote", value: 8, count: 26 },
      ],
      topSearches: [
        { label: "Mécaniciens poids lourds", count: 97, trend: "+21%" },
        { label: "Développeurs", count: 66, trend: "+8%" },
        { label: "EIMT possible", count: 41, trend: "+10%" },
        { label: "Francophone", count: 39, trend: "+6%" },
      ],
    },
  };

  return configs[org.sector] || configs.realEstate;
}

function toneClasses(tone) {
  const map = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };
  return map[tone] || map.blue;
}

function benchmarkStatus(tone) {
  const map = {
    emerald: { label: "Compétitif", dot: "bg-emerald-500", card: "border-emerald-200 bg-emerald-50 text-emerald-800", explanation: "Offre mieux placée que la référence marché. À prioriser." },
    blue: { label: "Bon", dot: "bg-blue-500", card: "border-blue-200 bg-blue-50 text-blue-800", explanation: "Offre correcte et proche du marché. À maintenir." },
    orange: { label: "À surveiller", dot: "bg-orange-500", card: "border-orange-200 bg-orange-50 text-orange-800", explanation: "Écart acceptable, mais il faut améliorer la valeur perçue." },
    red: { label: "À optimiser", dot: "bg-red-500", card: "border-red-200 bg-red-50 text-red-800", explanation: "Offre moins compétitive que le marché. Ajustement recommandé." },
  };
  return map[tone] || map.blue;
}

const CHART_COLORS = ["#14C9D6", "#08AFCB", "#0B78A0", "#FF405B", "#FF9F2E", "#FFC736"];

function MiniTrendChart({ title, subtitle, data = [], suffix = "%" }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <Pill className="border-blue-100 bg-blue-50 text-blue-700">Graphique</Pill>
      </div>
      <div className="flex h-44 items-end gap-3 rounded-3xl bg-slate-50 p-4">
        {data.map((item, index) => (
          <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
            <div className="text-[11px] font-semibold text-slate-500">{item.value}{suffix}</div>
            <div className="w-full rounded-t-2xl" style={{ height: `${Math.max(18, Math.round((item.value / max) * 120))}px`, background: CHART_COLORS[index % CHART_COLORS.length] }} />
            <div className="w-full truncate text-center text-[10px] font-semibold text-slate-500">{item.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TopPerformersChart({ members = [] }) {
  const topMembers = [...members].sort((a, b) => b.conversion - a.conversion).slice(0, 3);
  const maxConversion = Math.max(...topMembers.map((member) => member.conversion), 1);
  const medals = ["🏆", "🥈", "🥉"];
  return (
    <Card className="mt-4 overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#062238] to-[#0B2E4A] p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-200">Performance équipe</p>
        <h3 className="mt-2 text-lg font-semibold">Top 3 performers</h3>
        <p className="mt-1 text-xs text-white/65">Classement manager basé sur conversion, offres envoyées et dossiers en cours.</p>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex h-64 items-end gap-4 rounded-3xl bg-slate-50 p-4">
          {topMembers.map((member, index) => (
            <div key={member.id} className="flex flex-1 flex-col items-center justify-end gap-2">
              <div className="text-xl">{medals[index]}</div>
              <div className="w-full rounded-t-3xl shadow-sm" style={{ height: `${Math.max(55, Math.round((member.conversion / maxConversion) * 165))}px`, background: CHART_COLORS[index % CHART_COLORS.length] }} />
              <p className="text-xs font-semibold text-slate-900">{member.conversion}%</p>
              <p className="max-w-[90px] truncate text-center text-[11px] text-slate-500">{member.name}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {topMembers.map((member, index) => (
            <div key={member.id} className="rounded-3xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#062238] text-xs font-semibold text-white">{member.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{medals[index]} {member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                </div>
                <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">{member.conversion}%</Pill>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-slate-50 p-2"><b>{member.requests}</b><br />demandes</div>
                <div className="rounded-xl bg-slate-50 p-2"><b>{member.offersSent}</b><br />offres</div>
                <div className="rounded-xl bg-slate-50 p-2"><b>{member.inProgress}</b><br />en cours</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function DonutChart({ title, subtitle, data = [], countLabel = "demandes" }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let cumulative = 0;
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  return (
    <Card className="overflow-hidden p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <Pill className="border-slate-200 bg-slate-50 text-slate-600">{data.reduce((sum, item) => sum + item.count, 0)} {countLabel}</Pill>
      </div>
      <div className="grid gap-4 lg:grid-cols-[220px_1fr] lg:items-center">
        <div className="relative mx-auto h-[220px] w-[220px]">
          <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
            <circle cx="110" cy="110" r={radius} fill="none" stroke="#EEF2F7" strokeWidth="34" />
            {data.map((item, index) => {
              const dash = (item.value / total) * circumference;
              const gap = 4;
              const offset = circumference * (1 - cumulative / total);
              cumulative += item.value;
              return <circle key={item.label} cx="110" cy="110" r={radius} fill="none" stroke={CHART_COLORS[index % CHART_COLORS.length]} strokeWidth="34" strokeDasharray={`${Math.max(dash - gap, 0)} ${circumference}`} strokeDashoffset={offset} strokeLinecap="round" />;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-semibold text-slate-900">{data[0]?.value}%</p>
            <p className="max-w-[100px] text-[11px] font-semibold text-slate-500">{data[0]?.label}</p>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.map((item, index) => (
            <div key={item.label} className="rounded-2xl bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: CHART_COLORS[index % CHART_COLORS.length] }} />
                  <p className="truncate text-xs font-semibold text-slate-800">{item.label}</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{item.value}%</p>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">{item.count} {countLabel}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function TopSearchesCard({ items = [] }) {
  const max = Math.max(...items.map((item) => item.count), 1);
  return (
    <Card className="self-start p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Plus recherchés</h3>
          <p className="mt-1 text-xs text-slate-500">Intentions précises, sans répéter les types d’offre.</p>
        </div>
        <Pill className="border-orange-100 bg-orange-50 text-[#F58A07]">Top 5</Pill>
      </div>
      <div className="space-y-2.5">
        {items.map((item, index) => (
          <div key={item.label} className="rounded-2xl bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs">
              <p className="truncate font-semibold text-slate-800">{index + 1}. {item.label}</p>
              <p className="shrink-0 font-semibold text-emerald-700">{item.trend}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-[#F58A07]" style={{ width: `${Math.round((item.count / max) * 100)}%` }} />
              </div>
              <p className="w-16 text-right text-[11px] font-semibold text-slate-500">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MarketSegmentTable({ config, org, ranking = [], currentScore = 0, marketStats = {} }) {
  const marketScore = marketStats.score || 0;
  const leaderScore = ranking[0]?.score || currentScore;
  const maxScore = Math.max(leaderScore, currentScore, marketScore, 1);
  const comparisonRows = [
    { label: "Closing", you: `${marketStats.closeRate || 0}%`, market: `${marketStats.marketCloseRate || 0}%`, delta: `${(marketStats.closeRate || 0) - (marketStats.marketCloseRate || 0)} pts`, good: (marketStats.closeRate || 0) >= (marketStats.marketCloseRate || 0) },
    { label: "Réponse", you: `${marketStats.response || 0}h`, market: `${marketStats.marketResponse || 0}h`, delta: `${Math.round(((marketStats.marketResponse || 0) - (marketStats.response || 0)) * 10) / 10}h`, good: (marketStats.response || 0) <= (marketStats.marketResponse || 0) },
    { label: "Offres", you: marketStats.offers || 0, market: marketStats.marketOffers || 0, delta: (marketStats.offers || 0) - (marketStats.marketOffers || 0), good: (marketStats.offers || 0) >= (marketStats.marketOffers || 0) },
    { label: "Acceptées", you: marketStats.accepted || 0, market: marketStats.marketAccepted || 0, delta: (marketStats.accepted || 0) - (marketStats.marketAccepted || 0), good: (marketStats.accepted || 0) >= (marketStats.marketAccepted || 0) },
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#D95500]">Benchmark marché</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">Position de votre compagnie</h3>
            </div>
            <Pill className="bg-[#061827] text-white">#{marketStats.rank || "—"} / {marketStats.total || "—"}</Pill>
          </div>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-orange-50 p-4 ring-1 ring-orange-100">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-600">Score global</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">{currentScore}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">/100</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Domaine</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{config.marketTitle.replace("Marché ", "")}</p>
            <p className="mt-1 text-xs text-slate-500">{org.plan} · {org.rating}/5</p>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-4">
            <div className="space-y-3">
              {[
                { label: org.name, value: currentScore, tone: "bg-[#D95500]" },
                { label: "Moyenne marché", value: marketScore, tone: "bg-slate-400" },
                { label: "Leader", value: leaderScore, tone: "bg-emerald-500" },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600"><span className="truncate">{row.label}</span><span>{row.value}</span></div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={cls("h-full rounded-full", row.tone)} style={{ width: `${Math.round((row.value / maxScore) * 100)}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#D95500]">Comparaison marché</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">Vous vs moyenne du domaine</h3>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2">
          {comparisonRows.map((row) => (
            <div key={row.label} className="rounded-3xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{row.label}</p>
                <span className={cls("rounded-full px-2.5 py-1 text-[11px] font-semibold", row.good ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700")}>{row.delta}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Info label="Vous" value={row.you} />
                <Info label="Marché" value={row.market} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function OrgDashboard() {
  const { state } = useApp();
  const { org, employee: currentEmployee, isManager } = currentOrgContext(state);
  const config = getOrgDashboardConfig(org);
  const [dashboardDateFrom, setDashboardDateFrom] = useState("2026-01-01");
  const [dashboardDateTo, setDashboardDateTo] = useState("2026-12-31");
  const [calendarView, setCalendarView] = useState("month");
  const orgOffersAll = state.offers.filter((offer) => offer.orgId === org.id);
  const orgOffers = employeeScope(orgOffersAll, currentEmployee, isManager);
  const orgAppointments = employeeScope(state.appointments.filter((appointment) => appointment.orgId === org.id), currentEmployee, isManager);
  const acceptedOffers = orgOffers.filter((offer) => offer.status === "accepted");
  const sameSectorOrgs = state.organizations.filter((item) => item.sector === org.sector);
  const scoreOrg = (item) => {
    const close = Math.round((Number(item.stats?.accepted || 0) / Math.max(Number(item.stats?.offers || 0), 1)) * 100);
    const treatment = Math.round((Number(item.stats?.offers || 0) / Math.max(Number(item.stats?.received || 0), 1)) * 100);
    const speed = Math.max(0, 100 - Math.round(Number(item.stats?.avgResponseHours || 0) * 8));
    const rating = Math.min(100, Math.round(Number(item.rating || 0) * 20));
    return Math.max(0, Math.min(100, Math.round(close * 0.45 + treatment * 0.20 + speed * 0.20 + rating * 0.15)));
  };
  const ranking = sameSectorOrgs.map((item) => ({ org: item, score: scoreOrg(item) })).sort((a, b) => b.score - a.score);
  const currentRank = ranking.findIndex((item) => item.org.id === org.id) + 1;
  const receivedTotal = isManager ? Number(org.stats?.received || 0) : Number(currentEmployee.requests || 0);
  const offersSentTotal = isManager ? Number(org.stats?.offers || 0) : Number(currentEmployee.offersSent || 0);
  const acceptedTotal = isManager ? Number(org.stats?.accepted || 0) : acceptedOffers.length;
  const closeRate = Math.round((acceptedTotal / Math.max(offersSentTotal, 1)) * 100);
  const responseHours = isManager ? Number(org.stats?.avgResponseHours || 0) : 4.2;
  const competitiveScore = isManager ? scoreOrg(org) : Math.max(0, Math.min(100, Math.round((Number(currentEmployee.conversion || 0) * 0.75) + 45)));
  const marketCloseRate = Math.round(sameSectorOrgs.reduce((sum, item) => sum + ((Number(item.stats?.accepted || 0) / Math.max(Number(item.stats?.offers || 0), 1)) * 100), 0) / Math.max(sameSectorOrgs.length, 1));
  const marketResponse = Math.round((sameSectorOrgs.reduce((sum, item) => sum + Number(item.stats?.avgResponseHours || 0), 0) / Math.max(sameSectorOrgs.length, 1)) * 10) / 10;
  const marketOffers = Math.round(sameSectorOrgs.reduce((sum, item) => sum + Number(item.stats?.offers || 0), 0) / Math.max(sameSectorOrgs.length, 1));
  const marketAccepted = Math.round(sameSectorOrgs.reduce((sum, item) => sum + Number(item.stats?.accepted || 0), 0) / Math.max(sameSectorOrgs.length, 1));
  const marketScore = Math.round(ranking.reduce((sum, item) => sum + item.score, 0) / Math.max(ranking.length, 1));
  const pendingAppointments = orgAppointments.filter((appointment) => appointment.status !== "confirmed").length;
  const latestOffer = orgOffers[0] || orgOffersAll[0];
  const latestRequest = latestOffer ? state.requests.find((request) => request.id === latestOffer.requestId) : state.requests.find((request) => request.sector === org.sector);
  const marketAvg = latestOffer?.benchmark?.marketAvg || latestRequest?.budgetMax || latestOffer?.price || 0;
  const offerPrice = latestOffer?.price || marketAvg;
  const minMarket = Math.round(marketAvg * 0.92);
  const maxMarket = Math.round(marketAvg * 1.12);
  const priceDelta = offerPrice - marketAvg;
  const competitiveness = Math.max(0, Math.min(100, Math.round((latestOffer?.score || competitiveScore) - Math.max(0, (priceDelta / Math.max(marketAvg, 1)) * 100))));
  const kpis = [
    { label: "Demandes reçues", value: receivedTotal, hint: "Total période", icon: "📥" },
    { label: "Offres envoyées", value: offersSentTotal, hint: `${Math.round((offersSentTotal / Math.max(receivedTotal, 1)) * 100)}% des demandes`, icon: "📤" },
    { label: "Offres acceptées", value: acceptedTotal, hint: "Closed offers", icon: "✅" },
    { label: "Taux closing", value: `${closeRate}%`, hint: "Acceptées / envoyées", icon: "🎯" },
    { label: "Réponse moyenne", value: `${responseHours}h`, hint: `${pendingAppointments} RDV à suivre`, icon: "⚡" },
    { label: "Score concurrentiel", value: `${competitiveScore}/100`, hint: `Rang #${currentRank || "—"}`, icon: "🏆" },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#D95500]">{isManager ? "Vue compagnie" : "Vue employé"}</p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-900">Performance professionnelle</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill className="border-blue-100 bg-blue-50 text-blue-700">{org.name}</Pill>
          <Pill className="border-orange-100 bg-orange-50 text-[#D95500]">{config.marketTitle}</Pill>
        </div>
      </div>

      <Card className="mb-4 border-orange-100 bg-white p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_180px_auto] lg:items-end">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Date début
            <input type="date" value={dashboardDateFrom} onChange={(event) => setDashboardDateFrom(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-[#D95500] focus:ring-2 focus:ring-orange-100" />
          </label>
          <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Date fin
            <input type="date" value={dashboardDateTo} onChange={(event) => setDashboardDateTo(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-[#D95500] focus:ring-2 focus:ring-orange-100" />
          </label>
          <FilterDropdown
            label="Vue calendrier"
            items={[{ value: "week", label: "Semaine" }, { value: "month", label: "Mois" }, { value: "quarter", label: "Trimestre" }]}
            value={calendarView}
            onChange={setCalendarView}
          />
          <div className="rounded-2xl bg-[#061827] px-4 py-3 text-xs font-semibold text-white shadow-sm">
            <div className="flex items-center gap-2"><span>📅</span><span>{dashboardDateFrom} → {dashboardDateTo}</span></div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {kpis.map((metric) => <StatCard key={metric.label} {...metric} />)}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <DonutChart title="Répartition par type d’offre" subtitle="Demandes par catégorie." data={config.requestDistribution} />
        <DonutChart title="Zones les plus demandées" subtitle="Demandes par localisation." data={config.zoneDistribution} />
      </div>

      <div className="mt-4">
        <MarketSegmentTable
          config={config}
          org={org}
          ranking={ranking}
          currentScore={competitiveScore}
          marketStats={{
            rank: currentRank,
            total: ranking.length,
            score: marketScore,
            closeRate,
            marketCloseRate,
            response: responseHours,
            marketResponse,
            offers: offersSentTotal,
            marketOffers,
            accepted: acceptedTotal,
            marketAccepted,
          }}
        />
      </div>

      <div className="mt-4 grid items-start gap-4 xl:grid-cols-[360px_1fr]">
        <TopSearchesCard items={config.topSearches} />
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 bg-white p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#D95500]">Analyse avant envoi</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">Compétitivité de l’offre</h3>
              </div>
              <Pill className={competitiveness >= 80 ? "bg-emerald-50 text-emerald-700" : competitiveness >= 60 ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700"}>{competitiveness}/100</Pill>
            </div>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <Info label="Votre offre" value={fmt(offerPrice, latestOffer?.currency || latestRequest?.currency || "CAD")} />
            <Info label="Moyenne marché" value={fmt(marketAvg, latestOffer?.currency || latestRequest?.currency || "CAD")} />
            <Info label="Minimum" value={fmt(minMarket, latestOffer?.currency || latestRequest?.currency || "CAD")} />
            <Info label="Maximum" value={fmt(maxMarket, latestOffer?.currency || latestRequest?.currency || "CAD")} />
          </div>
          <div className="px-4 pb-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600"><span>Positionnement prix</span><span>{priceDelta >= 0 ? "+" : ""}{fmt(priceDelta, latestOffer?.currency || latestRequest?.currency || "CAD")}</span></div>
              <div className="h-3 overflow-hidden rounded-full bg-white"><div className={cls("h-full rounded-full", competitiveness >= 80 ? "bg-emerald-500" : competitiveness >= 60 ? "bg-[#D95500]" : "bg-red-500")} style={{ width: `${competitiveness}%` }} /></div>
              <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wide text-slate-400"><span>Faible</span><span>Moyen</span><span>Élevé</span></div>
            </div>
          </div>
        </Card>
      </div>

      {isManager && <TopPerformersChart members={org.team} />}
    </div>
  );
}


function QualityRow({ label, value }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-medium text-slate-600"><span>{label}</span><span>{value}/100</span></div>
      <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#F58A07]" style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function getRequestPriorityScore(request) {
  const details = request?.details || {};
  let score = 40;
  const urgency = String(request?.urgency || "").toLowerCase();
  if (/cette semaine|urgent|immédiate/.test(urgency)) score += 30;
  if (/30 jours|ce mois/.test(urgency)) score += 18;
  if (details.statusExpiry) score += 20;
  if (["Immédiate", "Aujourd’hui", "Cette semaine", "Urgent"].includes(details.availability || details.startDate || details.moveIn || details.sellingTimeline || details.saleUrgency)) score += 18;
  if (details.availabilityDate || details.searchDate || details.desiredAutoDate) score += 12;
  if ((request.documents || []).some((doc) => doc.status === "uploaded")) score += 8;
  if ((request.assignedOffers || []).length === 0) score += 7;
  return Math.max(0, Math.min(100, score));
}

function priorityLabel(score) {
  if (score >= 80) return { label: "Très prioritaire", className: "bg-red-50 text-red-700" };
  if (score >= 60) return { label: "Prioritaire", className: "bg-orange-50 text-orange-700" };
  return { label: "Standard", className: "bg-slate-100 text-slate-600" };
}

function OrgRequests() {
  const { state, actions } = useApp();
  const { org, employee, isManager } = currentOrgContext(state);
  const allReceived = state.requests.filter((request) => request.sector === org.sector && org.provinceAccess.includes(request.province));
  const scopedReceived = employeeScope(allReceived, employee, isManager);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [responsibleFilter, setResponsibleFilter] = useState("all");

  const serviceTypes = requestTypeOptionsForSector(org.sector, scopedReceived);
  const typeOptions = [
    { value: "all", label: "Tous types", count: scopedReceived.length },
    ...serviceTypes.map((type) => ({ value: type, label: type, count: scopedReceived.filter((request) => requestTypeLabel(request.sector, request.type) === type).length })),
  ];
  const statusOptions = [
    { value: "all", label: "Tous statuts", count: scopedReceived.length },
    { value: "inProgress", label: "En traitement", count: scopedReceived.filter((request) => request.status === "inProgress").length },
    { value: "offersReceived", label: "Offres reçues", count: scopedReceived.filter((request) => request.status === "offersReceived").length },
    { value: "closed", label: "Fermées", count: scopedReceived.filter((request) => request.status === "closed").length },
  ];
  const userOptions = [
    { value: "all", label: "Tous clients", count: scopedReceived.length },
    { value: state.user.id, label: state.user.name, count: scopedReceived.filter((request) => request.userId === state.user.id).length },
  ];
  const responsibleOptions = [
    { value: "all", label: "Tous responsables", count: scopedReceived.length },
    { value: "unassigned", label: "Non affectées", count: scopedReceived.filter((request) => !request.assignedTo).length },
    ...org.team.map((member) => ({ value: member.id, label: member.name, count: scopedReceived.filter((request) => request.assignedTo === member.id).length })),
  ].filter((option) => option.count > 0 || option.value === "all" || option.value === "unassigned");

  const visibleRequests = scopedReceived.filter((request) => {
    const matchType = typeFilter === "all" || requestTypeLabel(request.sector, request.type) === typeFilter;
    const matchStatus = statusFilter === "all" || request.status === statusFilter;
    const matchUser = userFilter === "all" || request.userId === userFilter;
    const matchResponsible = responsibleFilter === "all" || (responsibleFilter === "unassigned" ? !request.assignedTo : request.assignedTo === responsibleFilter);
    return matchType && matchStatus && matchUser && matchResponsible;
  }).map((request) => ({ ...request, priorityScore: getRequestPriorityScore(request) })).sort((a, b) => b.priorityScore - a.priorityScore);

  const topPriorityRequests = visibleRequests.filter((request) => request.priorityScore >= 60).slice(0, 3);

  const matchSuggestions = visibleRequests.flatMap((request) => (org.offerTemplates || []).map((template) => {
    const price = Number(template.price || 0);
    const score = Math.max(45, Math.min(98, 62 + (template.type === requestTypeLabel(request.sector, request.type) ? 16 : 5) + (template.city === request.city ? 10 : 0) + (request.sector === "jobs" ? 8 : (price >= request.budgetMin && price <= request.budgetMax ? 12 : price <= request.budgetMax ? 7 : -8)) + (template.scoreBoost || 0)));
    return { request, template, score };
  })).sort((a, b) => b.score - a.score).slice(0, 4);

  return (
    <div>
      <SectionHeader title="Demandes reçues" subtitle={isManager ? `Demandes reçues par ${org.name}, filtrées par client, type, statut et responsable.` : `Demandes assignées à ${employee.name}.`} />

      <Card className="mb-4 p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <FilterDropdown label="Client" items={userOptions} value={userFilter} onChange={setUserFilter} />
          <FilterDropdown label="Type de demande" items={typeOptions} value={typeFilter} onChange={setTypeFilter} />
          <FilterDropdown label="Statut" items={statusOptions} value={statusFilter} onChange={setStatusFilter} />
          {isManager ? <FilterDropdown label="Responsable" items={responsibleOptions} value={responsibleFilter} onChange={setResponsibleFilter} /> : <PersonLine label={employee.name} sub="Session employé active" tone="orange" />}
        </div>
      </Card>

      {topPriorityRequests.length > 0 && (
        <Card className="mb-4 overflow-hidden border-red-100 bg-gradient-to-r from-red-50 via-orange-50 to-white">
          <div className="border-b border-red-100 p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <Pill className="bg-red-100 text-red-700">Top prioritaires</Pill>
                <h3 className="mt-2 text-base font-semibold text-slate-900">Demandes à traiter en premier</h3>
                <p className="mt-1 text-xs text-slate-500">Classement basé sur urgence, dates de besoin, fin de statut, documents et absence d’offre.</p>
              </div>
              <Pill className="bg-white text-slate-700">{topPriorityRequests.length} demande{topPriorityRequests.length > 1 ? "s" : ""}</Pill>
            </div>
          </div>
          <div className="grid gap-3 p-4 lg:grid-cols-3">
            {topPriorityRequests.map((request) => {
              const priority = priorityLabel(request.priorityScore);
              return (
                <button key={request.id} onClick={() => actions.openModal("requestDetails", { requestId: request.id })} className="rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-red-100 transition hover:ring-orange-200">
                  <div className="flex items-center justify-between gap-3">
                    <Pill className={priority.className}>{priority.label}</Pill>
                    <span className="text-sm font-semibold text-red-700">{request.priorityScore}/100</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm font-semibold text-slate-900">{request.title}</p>
                  <p className="mt-2 text-xs text-slate-500">Urgence: {request.urgency} • Offres: {(request.assignedOffers || []).length}</p>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      <Card className="mb-4 overflow-hidden border-orange-100 bg-gradient-to-r from-orange-50 to-white">
        <div className="grid gap-0 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="p-4">
            <Pill className="bg-orange-100 text-orange-700">Matching automatique</Pill>
            <h3 className="mt-3 text-base font-semibold text-slate-900">Suggestions d’envoi au client</h3>
            <p className="mt-1 text-xs text-slate-500">Le système compare les demandes reçues avec les offres déjà créées par la compagnie et propose les meilleures correspondances.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Info label="Offres catalogue" value={(org.offerTemplates || []).length} />
              <Info label="Demandes analysées" value={visibleRequests.length} />
              <Info label="Meilleur match" value={`${matchSuggestions[0]?.score || 0}%`} />
            </div>
          </div>
          <div className="space-y-3 p-4">
            {matchSuggestions.length ? matchSuggestions.map(({ request, template, score }) => (
              <div key={`${request.id}-${template.id}`} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-orange-100">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill className={score >= 85 ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}>Match {score}%</Pill>
                      <Pill className="bg-slate-100 text-slate-700">{template.type}</Pill>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{template.title}</p>
                    <p className="mt-1 text-xs text-slate-500">Pour: {request.title}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Pill className="bg-orange-50 text-orange-700">{fmt(template.price, request.currency)}</Pill>
                    <Button onClick={() => actions.sendMatchedOffer(request.id, template.id)}>Envoyer au client</Button>
                  </div>
                </div>
              </div>
            )) : <EmptyState text="Aucune offre modèle disponible pour matcher les demandes." />}
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Demandes reçues par client</h3>
            <p className="text-xs text-slate-500">Service organisation: {state.sectors.find((s) => s.id === org.sector)?.label}. Les demandes sont affichées par client et non par service.</p>
          </div>
          <Pill className="border-blue-100 bg-blue-50 text-blue-700">{visibleRequests.length} résultat{visibleRequests.length > 1 ? "s" : ""}</Pill>
        </div>
        <div className="space-y-3">
          {visibleRequests.map((request) => <RequestCard key={request.id} request={request} role="org" />)}
          {!visibleRequests.length && <EmptyState text="Aucune demande reçue pour ces filtres." />}
        </div>
      </Card>
    </div>
  );
}

function OrgOffers() {
  const { state, actions } = useApp();
  const { org, employee, isManager } = currentOrgContext(state);
  const orgOffers = state.offers.filter((offer) => offer.orgId === org.id);
  const scopedOffers = employeeScope(orgOffers, employee, isManager);
  const [statusFilter, setStatusFilter] = useState("all");
  const [responsibleFilter, setResponsibleFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");

  const statusOptions = [
    { value: "all", label: "Tous statuts", count: scopedOffers.length },
    { value: "received", label: "Envoyées", count: scopedOffers.filter((offer) => offer.status === "received").length },
    { value: "saved", label: "Sauvegardées", count: scopedOffers.filter((offer) => offer.status === "saved").length },
    { value: "accepted", label: "Acceptées", count: scopedOffers.filter((offer) => offer.status === "accepted").length },
  ];
  const responsibleOptions = [
    { value: "all", label: "Tous responsables", count: scopedOffers.length },
    ...org.team.map((member) => ({ value: member.id, label: member.name, count: scopedOffers.filter((offer) => offer.assignedTo === member.id).length })),
  ].filter((option) => option.count > 0 || option.value === "all");
  const userOptions = [
    { value: "all", label: "Tous clients", count: scopedOffers.length },
    { value: state.user.id, label: state.user.name, count: scopedOffers.filter((offer) => state.requests.find((request) => request.id === offer.requestId)?.userId === state.user.id).length },
  ];

  const offers = scopedOffers.filter((offer) => {
    const linkedRequest = state.requests.find((request) => request.id === offer.requestId);
    const matchStatus = statusFilter === "all" || offer.status === statusFilter;
    const matchResponsible = responsibleFilter === "all" || offer.assignedTo === responsibleFilter;
    const matchUser = userFilter === "all" || linkedRequest?.userId === userFilter;
    return matchStatus && matchResponsible && matchUser;
  });

  const accepted = offers.filter((offer) => offer.status === "accepted");
  const active = offers.filter((offer) => offer.status !== "accepted");
  return (
    <div>
      <SectionHeader title="Offres envoyées" subtitle="Suivi des offres par responsable, client et statut." />
      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <StatCard label="Offres envoyées" value={offers.length} hint="Selon filtres" icon="🏷️" />
        <StatCard label="Acceptées" value={accepted.length} hint="Avec disponibilité reçue" icon="✅" />
        <StatCard label="En attente" value={active.length} hint="Suivi possible" icon="⏳" />
      </div>

      <Card className="mb-4 p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <FilterDropdown label="Client" items={userOptions} value={userFilter} onChange={setUserFilter} />
          <FilterDropdown label="Statut offre" items={statusOptions} value={statusFilter} onChange={setStatusFilter} />
          {isManager ? <FilterDropdown label="Responsable" items={responsibleOptions} value={responsibleFilter} onChange={setResponsibleFilter} /> : <PersonLine label={employee.name} sub="Responsable connecté" tone="orange" />}
        </div>
      </Card>

      <div className="grid gap-4">
        {offers.map((offer) => {
          const request = state.requests.find((r) => r.id === offer.requestId);
          const responsible = org.team.find((member) => member.id === offer.assignedTo);
          return (
            <Card key={offer.id} className={cls("p-4", offer.status === "accepted" ? "border-emerald-200 bg-emerald-50/30" : "")}> 
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill className={offer.status === "accepted" ? "border-emerald-200 bg-emerald-100 text-emerald-800" : "border-blue-100 bg-blue-50 text-blue-700"}>{offer.status === "accepted" ? "Acceptée" : "Envoyée"}</Pill>
                    <Pill className="border-slate-200 bg-white text-slate-600">Responsable: {responsible?.name || "Non affectée"}</Pill>
                    <Pill className="border-slate-200 bg-white text-slate-600">Score {offer.score}/100</Pill>
                    <Pill className="border-slate-200 bg-white text-slate-600">{offer.label}</Pill>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{offer.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">Demande: {request?.title}</p>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <PersonLine label={responsible?.name || "Non affectée"} src={responsible?.photoUrl} sub={responsible ? `${responsible.role} responsable de l’offre` : "Aucun responsable"} tone="orange" />
                    <PersonLine label={state.user.name} src={state.user.photoUrl} sub={`Client lié à la demande • ${state.user.city}`} />
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    <Info label={valueLabelForSector(offer.sector, "offer")} value={fmt(offer.price, offer.currency)} />
                    <Info label="Référence" value={fmt(offer.benchmark.marketAvg, offer.currency)} />
                    <Info label="Expiration" value={offer.expiresAt} />
                    <Info label="Statut" value={offer.status} />
                  </div>
                  <OfferAppointmentTimeline offer={offer} />
                  {offer.acceptedContact && (
                    <div className="mt-4 rounded-3xl bg-white p-4 ring-1 ring-emerald-100">
                      <p className="font-semibold text-emerald-900">Disponibilité reçue</p>
                      <div className="mt-3 grid gap-3 md:grid-cols-3">
                        <Info label="Créneau" value={`${offer.acceptedContact.date} à ${offer.acceptedContact.time}`} />
                        <Info label="Contact" value={offer.acceptedContact.method} />
                        <Info label="Téléphone" value={offer.acceptedContact.phone} />
                      </div>
                      <div className="mt-3 rounded-2xl bg-emerald-50 p-3 text-xs text-emerald-800">{offer.acceptedContact.note}</div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <Button variant="ghost" onClick={() => actions.openModal("offerDetails", { offerId: offer.id })}>Détails</Button>
                  <Button variant="ghost" onClick={() => actions.openModal("orgMessage", { offerId: offer.id })}>Message</Button>
                </div>
              </div>
            </Card>
          );
        })}
        {!offers.length && <EmptyState text="Aucune offre envoyée pour ces filtres." />}
      </div>
    </div>
  );
}

function MultiSelectDropdown({ field, value = [], update }) {
  const [open, setOpen] = useState(false);
  const selected = Array.isArray(value) ? value : [];
  const toggle = (option) => {
    const next = selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option];
    update(field.key, next);
  };

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((current) => !current)} className="mt-2 flex min-h-[42px] w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left outline-none transition hover:border-orange-200 focus:border-[#F58A07]">
        <span className={cls("text-xs", selected.length ? "font-semibold text-slate-700" : "text-slate-400")}>{selected.length ? `${selected.length} document${selected.length > 1 ? "s" : ""} sélectionné${selected.length > 1 ? "s" : ""}` : "Sélectionner les documents"}</span>
        <span className="text-xs text-slate-400">▾</span>
      </button>
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((item) => <span key={item} className="inline-flex items-center gap-1 rounded-full border border-orange-100 bg-orange-50 px-2 py-1 text-[11px] font-semibold text-orange-700">📎 {item}<button type="button" onClick={() => toggle(item)} className="text-orange-400 hover:text-orange-700">×</button></span>)}
        </div>
      )}
      {open && (
        <div className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          {field.options.map((option) => (
            <button key={option} type="button" onClick={() => toggle(option)} className={cls("flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition", selected.includes(option) ? "bg-orange-50 text-[#F58A07]" : "text-slate-600 hover:bg-slate-50")}>
              <span>{option}</span>
              {selected.includes(option) && <span>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function OfferDynamicFields({ config, values, update }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {config.fields.map((field) => {
        const value = values[field.key] ?? (field.type === "multiselect" ? [] : "");
        return (
          <label key={field.key} className={cls("text-xs font-semibold text-slate-700", field.type === "multiselect" ? "md:col-span-2" : "")}>{field.label}
            {field.type === "multiselect" ? (
              <MultiSelectDropdown field={field} value={value} update={update} />
            ) : field.type === "select" ? (
              <select value={value} onChange={(e) => update(field.key, e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">
                <option value="">Sélectionner</option>
                {field.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            ) : field.type === "date" ? (
              <input value={value} onChange={(e) => update(field.key, e.target.value)} type="date" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
            ) : (
              <input value={value} onChange={(e) => update(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)} type={field.type === "number" ? "number" : "text"} placeholder={field.placeholder || ""} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
            )}
          </label>
        );
      })}
    </div>
  );
}

function RealEstatePhotosUploader({ photos = [], onChange, tips = [] }) {
  const [photoName, setPhotoName] = useState("");
  const addPhoto = (name) => {
    const clean = (name || photoName).trim();
    if (!clean) return;
    onChange(Array.from(new Set([...(photos || []), clean])));
    setPhotoName("");
  };
  const removePhoto = (name) => onChange((photos || []).filter((photo) => photo !== name));

  return (
    <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h4 className="font-semibold text-slate-900">Photos du bien</h4>
          <p className="mt-1 text-xs text-emerald-700">Ajoutez des photos pour augmenter la confiance et le score de l’offre.</p>
        </div>
        <Pill className="border-emerald-200 bg-white text-emerald-700">{photos.length} photo{photos.length > 1 ? "s" : ""}</Pill>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {(photos || []).map((photo, index) => (
          <div key={photo} className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3">
            <div className="flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-blue-50 text-3xl">🏠</div>
            <p className="mt-2 truncate text-xs font-semibold text-slate-800">{photo}</p>
            <p className="text-[11px] text-slate-400">Photo {index + 1}</p>
            <button onClick={() => removePhoto(photo)} className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-red-600 shadow-sm">Supprimer</button>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/70 p-3">
          <div className="flex h-24 items-center justify-center rounded-xl bg-slate-50 text-2xl">＋</div>
          <input value={photoName} onChange={(e) => setPhotoName(e.target.value)} placeholder="Nom photo" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#F58A07]" />
          <Button className="mt-2 w-full" variant="ghost" onClick={() => addPhoto()}>Ajouter</Button>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tips.map((tip) => <button key={tip} onClick={() => addPhoto(tip)} className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-semibold text-emerald-700">+ {tip}</button>)}
      </div>
    </div>
  );
}

function OfferScorePanel({ score, request, config, values, price, docsRequired, delay }) {
  const { state } = useApp();
  const competitor = getCompetitorBenchmarks({ request, currentPrice: price, currentScore: score, state });
  const marketAvg = competitor.marketAvg;
  const diff = Number(price || 0) - marketAvg;
  const isGood = diff <= 0;
  const docs = Array.isArray(docsRequired) ? docsRequired.length : Array.isArray(values?.docsRequired) ? values.docsRequired.length : Number(docsRequired || values?.docsRequired || 0);
  return (
    <Card className="sticky top-24 p-4">
      <h3 className="text-base font-semibold text-slate-900">Analyse avant envoi</h3>
      <div className="mt-4 rounded-3xl bg-[#062238] p-4 text-white">
        <p className="text-xs text-white/60">Score estimé</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-5xl font-semibold">{score}</p>
          <p className="pb-1 text-xs font-semibold text-orange-200">/100</p>
        </div>
        <p className="mt-3 text-xs font-semibold text-orange-200">{score >= 85 ? "Offre forte, prête à envoyer." : score >= 70 ? "Offre correcte, optimisation possible." : "Offre fragile, à améliorer avant envoi."}</p>
      </div>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <div className="flex justify-between text-xs"><span className="font-semibold text-slate-600">{config.benchmarkLabel}</span><span className="font-semibold text-slate-900">{fmt(marketAvg, request?.currency || "CAD")}</span></div>
          <div className="mt-2 flex justify-between text-xs"><span className="text-slate-500">Votre offre</span><span className={cls("font-semibold", isGood ? "text-emerald-700" : "text-orange-700")}>{fmt(price, request?.currency || "CAD")}</span></div>
          <p className={cls("mt-2 rounded-xl px-3 py-2 text-[11px] font-semibold", isGood ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700")}>{isGood ? `${fmt(Math.abs(diff), request?.currency || "CAD")} sous la référence` : `${fmt(diff, request?.currency || "CAD")} au-dessus de la référence`}</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3">
          <p className="text-xs font-semibold text-blue-900">Comparaison concurrents</p>
          <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
            <div className="rounded-xl bg-white px-3 py-2"><span className="text-slate-500">Rang prix</span><b className="mt-1 block text-slate-900">#{competitor.priceRank}</b></div>
            <div className="rounded-xl bg-white px-3 py-2"><span className="text-slate-500">Rang score</span><b className="mt-1 block text-slate-900">#{competitor.scoreRank}</b></div>
            <div className="rounded-xl bg-white px-3 py-2"><span className="text-slate-500">Meilleur prix</span><b className="mt-1 block text-slate-900">{fmt(competitor.bestPrice, request?.currency || "CAD")}</b></div>
            <div className="rounded-xl bg-white px-3 py-2"><span className="text-slate-500">Meilleur score</span><b className="mt-1 block text-slate-900">{competitor.bestScore}/100</b></div>
          </div>
        </div>
        <div className="rounded-2xl bg-orange-50 p-3 text-xs text-orange-800">
          <p className="font-semibold">Suggestions système avant envoi</p>
          <ul className="mt-2 space-y-1">
            {competitor.suggestions.map((suggestion) => <li key={suggestion}>• {suggestion}</li>)}
          </ul>
        </div>
        <div className="grid gap-2 text-xs">
          <div className="rounded-xl bg-slate-50 px-3 py-2"><div className="flex items-center justify-between"><span>Documents</span><b>{docs || 0}</b></div>{Array.isArray(docsRequired) && docsRequired.length > 0 && <p className="mt-1 text-[11px] text-slate-500">{docsRequired.join(" / ")}</p>}</div>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Délai</span><b>{delay || "À préciser"}</b></div>
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Demande</span><b>{request?.province}</b></div>
        </div>
      </div>
    </Card>
  );
}

function parseSlot(slot) {
  const [day, time] = String(slot || "").split(" ");
  return { day, time };
}

function SharedAvailabilityPanel({ request, org, mode = "pro", selectedSlot = "", onSelect, compact = false, titleOverride, helperOverride }) {
  const { state } = useApp();
  const userSlots = state.user.availability || [];
  const orgSlots = org?.availability || [];
  const visibleSlots = mode === "user" ? orgSlots : userSlots;
  const slotSet = new Set(visibleSlots);
  const baseDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const dayShort = { Lundi: "Lun", Mardi: "Mar", Mercredi: "Mer", Jeudi: "Jeu", Vendredi: "Ven", Samedi: "Sam" };
  const defaultTimes = compact ? ["09:00", "10:00", "12:30", "14:30", "18:00"] : ["09:00", "10:00", "11:00", "12:30", "14:30", "16:00", "18:00"];
  const extraTimes = visibleSlots.map((slot) => parseSlot(slot).time).filter(Boolean);
  const times = Array.from(new Set([...defaultTimes, ...extraTimes])).sort((a, b) => a.localeCompare(b));
  const title = titleOverride || (mode === "user" ? "Calendrier du professionnel" : "Calendrier du client");
  const helper = helperOverride || (mode === "user" ? "Le client peut choisir un autre créneau uniquement parmi les disponibilités du professionnel." : "Le professionnel suggère un créneau uniquement parmi les disponibilités du client.");
  const [internalSelected, setInternalSelected] = useState(selectedSlot || "");
  const activeSlot = selectedSlot || internalSelected;

  const chooseSlot = (slot) => {
    if (!slotSet.has(slot)) return;
    setInternalSelected(slot);
    onSelect?.(slot);
  };

  return (
    <Card className="overflow-hidden border-slate-200">
      <div className="border-b border-slate-100 bg-white p-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            <p className="mt-0.5 text-[11px] text-slate-500">{helper}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Disponible</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-700"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />Non disponible</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <div className="grid min-w-[560px]" style={{ gridTemplateColumns: `58px repeat(${baseDays.length}, minmax(72px, 1fr))` }}>
            <div className="bg-slate-50 px-2 py-2 text-[9px] font-semibold uppercase tracking-wide text-slate-400">Heure</div>
            {baseDays.map((day) => <div key={day} className="bg-slate-50 px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-wide text-slate-400">{dayShort[day]}</div>)}
            {times.map((time) => (
              <React.Fragment key={time}>
                <div className="border-t border-slate-100 bg-slate-50/70 px-2 py-2 text-[11px] font-semibold text-slate-600">{time}</div>
                {baseDays.map((day) => {
                  const slot = `${day} ${time}`;
                  const available = slotSet.has(slot);
                  const selected = activeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!available}
                      onClick={() => chooseSlot(slot)}
                      title={slot}
                      className={cls(
                        "min-h-[34px] border-t border-l border-slate-100 px-1.5 py-1 text-[10px] font-semibold transition",
                        available
                          ? selected
                            ? "bg-emerald-600 text-white ring-2 ring-inset ring-emerald-700"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "cursor-not-allowed bg-red-50 text-red-300 opacity-80"
                      )}
                    >
                      {available ? (selected ? "✓" : "OK") : "—"}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-1.5 rounded-2xl bg-slate-50 px-3 py-2 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>{visibleSlots.length} créneau{visibleSlots.length > 1 ? "x" : ""} disponible{visibleSlots.length > 1 ? "s" : ""}</span>
          {activeSlot ? <span className="font-semibold text-emerald-700">Sélectionné: {activeSlot}</span> : <span className="font-semibold text-orange-600">Aucun créneau sélectionné</span>}
        </div>
      </div>
    </Card>
  );
}

function OfferAppointmentTimeline({ offer, compact = false }) {
  const { state } = useApp();
  const appointments = state.appointments.filter((appointment) => appointment.offerId === offer?.id);
  if (!offer?.proposedAppointment && !appointments.length) return null;
  return (
    <Card className={cls("p-4", compact ? "" : "mt-4")}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h4 className="font-semibold text-slate-900">Calendrier de l’offre</h4>
          <p className="mt-1 text-xs text-slate-500">Suivi du créneau suggéré par le professionnel et des réponses du client.</p>
        </div>
        <Pill className="border-blue-100 bg-blue-50 text-blue-700">{appointments.length || 1} suivi</Pill>
      </div>
      <div className="space-y-2">
        {offer.proposedAppointment && (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3 text-xs">
            <p className="font-semibold text-blue-900">Créneau suggéré par le professionnel</p>
            <p className="mt-1 text-blue-800">{offer.proposedAppointment.slot} • {offer.proposedAppointment.mode}</p>
            <p className="mt-1 text-blue-700/80">Basé sur les disponibilités du client.</p>
          </div>
        )}
        {appointments.map((appointment) => (
          <div key={appointment.id} className={cls("rounded-2xl border p-3 text-xs", appointment.status === "confirmed" ? "border-emerald-100 bg-emerald-50 text-emerald-800" : "border-orange-100 bg-orange-50 text-orange-800")}>
            <p className="font-semibold">{appointment.title}</p>
            <p className="mt-1">{appointment.date} {appointment.time} • {appointment.mode}</p>
            <p className="mt-1 opacity-80">Statut: {appointment.status === "confirmed" ? "confirmé" : "proposé"} • Par: {appointment.proposedBy === "org" ? "professionnel" : "client"}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OrgAppointments() {
  const { state } = useApp();
  const { org, employee, isManager } = currentOrgContext(state);
  const allOrgAppointments = state.appointments.filter((appointment) => appointment.orgId === org.id);
  const orgAppointments = employeeScope(allOrgAppointments, employee, isManager);
  const [activeTab, setActiveTab] = useState("proposed");
  const proposed = orgAppointments.filter((appointment) => appointment.status !== "confirmed");
  const confirmed = orgAppointments.filter((appointment) => appointment.status === "confirmed");
  const visible = activeTab === "confirmed" ? confirmed : proposed;

  return (
    <div>
      <SectionHeader title="Rendez-vous" subtitle="Rendez-vous reçus ou proposés, liés aux offres envoyées." />
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <div className="inline-flex rounded-2xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
          <button onClick={() => setActiveTab("proposed")} className={cls("rounded-xl px-4 py-2 text-xs font-semibold transition", activeTab === "proposed" ? "bg-[#062238] text-white" : "text-slate-500 hover:bg-slate-50")}>Proposés · {proposed.length}</button>
          <button onClick={() => setActiveTab("confirmed")} className={cls("rounded-xl px-4 py-2 text-xs font-semibold transition", activeTab === "confirmed" ? "bg-emerald-600 text-white" : "text-slate-500 hover:bg-slate-50")}>Confirmés · {confirmed.length}</button>
        </div>
      </div>
      <div className="grid gap-4">
        {visible.map((appointment) => {
          const offer = state.offers.find((o) => o.id === appointment.offerId);
          const request = state.requests.find((r) => r.id === appointment.requestId);
          return (
            <Card key={appointment.id} className={cls("overflow-hidden", appointment.status === "confirmed" ? "border-emerald-200" : "border-blue-200")}> 
              <div className="grid gap-0 xl:grid-cols-[0.9fr_1.1fr]">
                <div className={cls("p-5", appointment.status === "confirmed" ? "bg-emerald-50" : "bg-blue-50")}> 
                  <Pill className={appointment.status === "confirmed" ? "border-emerald-200 bg-emerald-100 text-emerald-800" : "border-orange-200 bg-orange-100 text-orange-800"}>{appointment.status === "confirmed" ? "Confirmé" : "Proposé"}</Pill>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{appointment.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{appointment.date} à {appointment.time} • {appointment.mode}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <Info label="Offre" value={offer?.title || "Offre liée"} />
                    <Info label="Demande" value={request?.title || "Demande liée"} />
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-slate-900">Informations transmises par le client</h4>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <Info label="Moyen" value={appointment.contact?.method || appointment.mode} />
                    <Info label="Téléphone" value={appointment.contact?.phone || "Non renseigné"} />
                    <Info label="Email" value={appointment.contact?.email || "Non renseigné"} />
                  </div>
                  {appointment.contact?.note && <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">{appointment.contact.note}</div>}
                </div>
              </div>
            </Card>
          );
        })}
        {!visible.length && <EmptyState text={activeTab === "confirmed" ? "Aucun rendez-vous confirmé." : "Aucun rendez-vous proposé."} />}
      </div>
    </div>
  );
}

function OrgMessages() {
  const { state, actions } = useApp();
  const { org, employee, isManager } = currentOrgContext(state);
  const orgOfferIds = employeeScope(state.offers.filter((offer) => offer.orgId === org.id), employee, isManager).map((offer) => offer.id);
  const orgMessages = state.messages.filter((message) => orgOfferIds.includes(message.offerId));
  const conversations = Object.entries(orgMessages.reduce((groups, message) => {
    const key = message.offerId || `request-${message.requestId}`;
    return { ...groups, [key]: [...(groups[key] || []), message] };
  }, {})).map(([key, messages]) => {
    const offer = state.offers.find((o) => o.id === key);
    const request = state.requests.find((r) => r.id === offer?.requestId || r.id === messages[0]?.requestId);
    const sector = state.sectors.find((s) => s.id === (offer?.sector || request?.sector));
    const lastMessage = messages[messages.length - 1];
    return { key, offer, request, sector, messages, lastMessage, unreadCount: messages.filter((m) => m.unread && m.senderType === "user").length };
  });
  const [activeKey, setActiveKey] = useState(conversations[0]?.key);
  const activeConversation = conversations.find((c) => c.key === activeKey) || conversations[0];

  if (!activeConversation) return <EmptyState text="Aucun message lié à vos offres." />;

  return (
    <div>
      <SectionHeader title="Messages" subtitle="Messages reçus par offre envoyée, avec le contexte de la demande et de l’offre." />
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-slate-900">Conversations par offre</h3><Pill className="border-blue-100 bg-blue-50 text-blue-700">{conversations.length}</Pill></div>
          <div className="space-y-3">
            {conversations.map((conversation) => (
              <button key={conversation.key} onClick={() => setActiveKey(conversation.key)} className={cls("w-full rounded-3xl border p-4 text-left transition", activeConversation.key === conversation.key ? "border-[#F58A07] bg-orange-50/60" : "border-slate-200 bg-white hover:bg-slate-50")}>
                <div className="flex flex-wrap items-center gap-2">{conversation.sector && <Pill className={conversation.sector.color}>{conversation.sector.icon} {conversation.sector.label}</Pill>}{conversation.unreadCount > 0 && <Pill className="border-orange-200 bg-orange-100 text-orange-700">{conversation.unreadCount} client</Pill>}</div>
                <h4 className="mt-3 truncate text-sm font-semibold text-slate-900">{conversation.offer?.title}</h4>
                <p className="mt-1 line-clamp-2 text-xs text-slate-600">{conversation.lastMessage.text}</p>
              </button>
            ))}
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-4">
            <div className="flex justify-between gap-3">
              <div><h3 className="text-base font-semibold text-slate-900">{activeConversation.offer?.title}</h3><p className="mt-1 text-xs text-slate-500">{activeConversation.request?.title}</p></div>
              <Button variant="ghost" onClick={() => actions.openModal("offerDetails", { offerId: activeConversation.offer?.id })}>Voir offre</Button>
            </div>
          </div>
          <div className="grid gap-3 border-b border-slate-100 p-4 md:grid-cols-3">
            <Info label={valueLabelForSector(activeConversation.offer?.sector, "offer")} value={fmt(activeConversation.offer?.price, activeConversation.offer?.currency)} />
            <Info label="Statut" value={activeConversation.offer?.status} />
            <Info label="Expire" value={activeConversation.offer?.expiresAt} />
          </div>
          <div className="max-h-[420px] space-y-3 overflow-auto bg-slate-50/60 p-4">
            {activeConversation.messages.map((message) => {
              const isOrg = message.senderType === "org";
              return <div key={message.id} className={cls("flex", isOrg ? "justify-end" : "justify-start")}><div className={cls("max-w-[78%] rounded-3xl px-4 py-3 shadow-sm", isOrg ? "bg-[#062238] text-white" : "bg-white text-slate-700 ring-1 ring-slate-100")}><p className={cls("text-[11px] font-semibold", isOrg ? "text-white/60" : "text-slate-400")}>{message.from} • {message.date} {message.time}</p><p className="mt-1 text-xs leading-relaxed">{message.text}</p></div></div>;
            })}
          </div>
          <div className="border-t border-slate-100 bg-white p-4"><div className="flex gap-2"><input className="flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#F58A07]" placeholder="Répondre au client pour cette offre..." /><Button onClick={() => actions.sendMessage("client", { offerId: activeConversation.offer?.id, text: "Réponse envoyée par le professionnel." })}>Envoyer</Button></div></div>
        </Card>
      </div>
    </div>
  );
}

function OrgEmployeeWorkspace({ compact = false }) {
  const { state, actions } = useApp();
  const { org, employee } = currentOrgContext(state);
  const employeeRequests = state.requests.filter((request) => request.sector === org.sector && request.assignedTo === employee.id).slice(0, compact ? 2 : undefined);
  const employeeOffers = state.offers.filter((offer) => offer.orgId === org.id && offer.assignedTo === employee.id).slice(0, compact ? 2 : undefined);
  const employeeAppointments = state.appointments.filter((appointment) => appointment.orgId === org.id && appointment.assignedTo === employee.id).slice(0, compact ? 2 : undefined);
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Espace employé</h3>
          <p className="text-xs text-slate-500">Vue de travail de {employee.name}, sans informations de gestion d’équipe.</p>
        </div>
        <Pill className="border-orange-200 bg-orange-50 text-orange-700">{employee.role}</Pill>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Info label="Demandes assignées" value={employee.requests} />
        <Info label="En cours" value={employee.inProgress} />
        <Info label="Offres envoyées" value={employee.offersSent} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{employee.permissions.map((permission) => <Pill key={permission} className="border-slate-200 bg-slate-50 text-slate-600">{permission}</Pill>)}</div>
      <div className="mt-4 space-y-3">
        {employeeRequests.map((request) => <button key={request.id} onClick={() => actions.openModal("requestDetails", { requestId: request.id })} className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-orange-200"><p className="text-xs font-semibold text-slate-900">{request.title}</p><p className="mt-1 text-[11px] text-slate-500">Demande assignée • {request.status}</p></button>)}
        {employeeOffers.map((offer) => <button key={offer.id} onClick={() => actions.openModal("offerDetails", { offerId: offer.id })} className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-orange-200"><p className="text-xs font-semibold text-slate-900">{offer.title}</p><p className="mt-1 text-[11px] text-slate-500">{offer.status} • Score {offer.score}/100</p></button>)}
        {employeeAppointments.map((appointment) => <div key={appointment.id} className="rounded-2xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-900">{appointment.title}</p><p className="mt-1 text-[11px] text-slate-500">{appointment.date} à {appointment.time}</p></div>)}
        {!employeeRequests.length && !employeeOffers.length && !employeeAppointments.length && <EmptyState text="Aucun élément assigné à cette session." />}
      </div>
    </Card>
  );
}

function OrgManagerPage() {
  const { state, actions } = useApp();
  const org = state.organizations[0];
  const managers = org.team.filter((member) => /manager|lead|directeur/i.test(member.role));
  const employees = org.team.filter((member) => !/manager|lead|directeur/i.test(member.role));
  const activeManager = managers[0] || org.team[0];
  const totals = org.team.reduce((acc, member) => ({
    requests: acc.requests + member.requests,
    inProgress: acc.inProgress + member.inProgress,
    offers: acc.offers + member.offersSent,
  }), { requests: 0, inProgress: 0, offers: 0 });
  return (
    <div>
      <SectionHeader title="Manager" subtitle="Pilotage de l’équipe, répartition des demandes et permissions employés." action={<Button variant="ghost" onClick={() => actions.openModal("inviteAgent")}>Inviter employé</Button>} />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Demandes équipe" value={totals.requests} hint="Charge totale" icon="📥" />
        <StatCard label="En cours" value={totals.inProgress} hint="À distribuer" icon="⚙️" />
        <StatCard label="Offres envoyées" value={totals.offers} hint="Par tous les employés" icon="📤" />
      </div>
      <Card className="mt-4 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <Info label="Plan" value={org.plan} />
          <Info label="Accès inclus" value={org.plan === "Premium" ? Math.max(5, Number(org.employeeSeats || 5)) : 5} />
          <Info label="Accès utilisés" value={org.team.length} />
          <Info label="Accès disponibles" value={Math.max(0, (org.plan === "Premium" ? Math.max(5, Number(org.employeeSeats || 5)) : 5) - org.team.length)} />
        </div>
      </Card>
      <Card className="mt-4 overflow-hidden border-blue-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Responsable équipe</p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">{activeManager.name}</h3>
            <p className="text-xs text-slate-500">{activeManager.email} • {activeManager.role}</p>
          </div>
          <div className="flex flex-wrap gap-2">{activeManager.permissions.map((permission) => <Pill key={permission} className="border-blue-100 bg-white text-blue-700">{permission}</Pill>)}</div>
        </div>
      </Card>
      <Card className="mt-4 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Employés à gérer</h3>
            <p className="text-xs text-slate-500">Performance, permissions et ouverture de session pour la preview.</p>
          </div>
        </div>
        <div className="grid gap-3">
          {[...managers, ...employees].map((member) => (
            <div key={member.id} className={cls("rounded-3xl border p-4", member.id === state.currentOrgUserId ? "border-orange-200 bg-orange-50/40" : "border-slate-200 bg-white")}>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#062238] text-xs font-semibold text-white">{member.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role} • {member.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {member.id === state.currentOrgUserId && <Pill className="border-orange-200 bg-orange-100 text-orange-700">Session active</Pill>}
                  <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">{member.conversion}% conversion</Pill>
                  <Button variant="ghost" onClick={() => actions.setOrgUser(member.id)}>Ouvrir session</Button>
                </div>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                <Info label="Demandes" value={member.requests} />
                <Info label="En cours" value={member.inProgress} />
                <Info label="Offres" value={member.offersSent} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">{member.permissions.map((permission) => <Pill key={permission} className="border-slate-200 bg-slate-50 text-slate-600">{permission}</Pill>)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function OrgEmployeesPage() {
  return (
    <div>
      <SectionHeader title="Employés" subtitle="Espace de travail opérationnel de l’employé connecté." />
      <OrgEmployeeWorkspace />
    </div>
  );
}

function OrgTeam({ compact = false }) {
  const { state, actions } = useApp();
  const org = state.organizations[0];
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Sessions employés</h3>
          <p className="text-xs text-slate-500">Chaque employé a sa propre session, ses permissions et sa performance.</p>
        </div>
        <Button variant="ghost" onClick={() => actions.openModal("inviteAgent")}>Inviter employé</Button>
      </div>
      <div className="grid gap-3">
        {org.team.slice(0, compact ? 2 : undefined).map((m) => (
          <div key={m.id} className={cls("rounded-2xl border p-4", m.id === state.currentOrgUserId ? "border-orange-200 bg-orange-50/40" : "border-slate-200")}> 
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#062238] text-xs font-semibold text-white">{m.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}</div>
                <div><p className="font-semibold text-slate-900">{m.name}</p><p className="text-xs text-slate-500">{m.role} • {m.email}</p></div>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {m.id === state.currentOrgUserId && <Pill className="border-orange-200 bg-orange-100 text-orange-700">Session active</Pill>}
                <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">{m.conversion}% conversion</Pill>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">{m.permissions.map((permission) => <Pill key={permission} className="border-slate-200 bg-slate-50 text-slate-600">{permission}</Pill>)}</div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-white p-2"><b>{m.requests}</b><br />demandes</div>
              <div className="rounded-xl bg-white p-2"><b>{m.inProgress}</b><br />en cours</div>
              <div className="rounded-xl bg-white p-2"><b>{m.offersSent}</b><br />offres</div>
            </div>
            <Button className="mt-3 w-full" variant={m.id === state.currentOrgUserId ? "navy" : "ghost"} onClick={() => actions.setOrgUser(m.id)}>{m.id === state.currentOrgUserId ? "Session active" : "Ouvrir cette session"}</Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OrgTeamPage() {
  return (
    <div>
      <SectionHeader title="Équipe" subtitle="Suivez la charge, les offres envoyées et la conversion par membre." />
      <OrgTeam />
    </div>
  );
}

function OrgSavedProfiles() {
  const { actions } = useApp();
  return (
    <div>
      <SectionHeader title="Profils sauvegardés" subtitle="Retrouvez les profils importants pour vos suivis." />
      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["Ahmed B.", "Sofia M.", "Karim T."].map((name, i) => (
            <div key={name} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-semibold">{name.split(" ").map((x) => x[0]).join("")}</div><div><p className="font-semibold text-slate-900">{name}</p><p className="text-xs text-slate-500">{i === 0 ? "Mécanique" : i === 1 ? "Immobilier" : "Immigration"}</p></div></div>
              <Button className="mt-4 w-full" variant="ghost" onClick={() => actions.openModal("profilePreview", { name })}>Voir profil</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function OrgBilling() {
  const { state, actions } = useApp();
  const org = state.organizations[0];
  return (
    <div>
      <SectionHeader title="Abonnement & factures" subtitle="Consultez votre plan, vos factures et vos options." />
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-4">
          <Pill className="border-orange-100 bg-orange-50 text-orange-700">{org.plan}</Pill>
          <h3 className="mt-4 text-xl font-semibold text-slate-900">Plan {org.plan}</h3>
          <p className="mt-2 text-xs text-slate-500">Accès secteurs: {org.provinceAccess.join(", ")}</p>
          <Button className="mt-4 w-full" onClick={() => actions.openModal("upgradePlan")}>Changer de plan</Button>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-slate-900">Factures</h3>
          <div className="mt-4 space-y-2">
            {["Mai 2026", "Avril 2026", "Mars 2026"].map((m) => <div key={m} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3"><span className="font-semibold">{m}</span><Button variant="ghost" onClick={() => actions.notify("Facture téléchargée.")}>Télécharger</Button></div>)}
          </div>
        </Card>
      </div>
    </div>
  );
}

function OrgSettings() {
  const { actions } = useApp();
  return (
    <div>
      <SectionHeader title="Paramètres organisation" subtitle="Gérez votre profil, vos accès et vos préférences." />
      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Info label="Organisation" value="ImmoPro Montréal" />
          <Info label="Secteur" value="Immobilier" />
          <Info label="Province couverte" value="Québec" />
          <Info label="Statut" value="Vérifiée" />
        </div>
        <Button className="mt-4" onClick={() => actions.notify("Paramètres sauvegardés.")}>Sauvegarder</Button>
      </Card>
    </div>
  );
}

function CircularKpiCard({ label, value, percent = 0, total, hint, tone = "blue", sub, trend, onClick, active = false }) {
  const tones = {
    blue: { stroke: "#14C9D6", bg: "bg-cyan-50", text: "text-cyan-700", ring: "border-cyan-100" },
    green: { stroke: "#10B981", bg: "bg-emerald-50", text: "text-emerald-700", ring: "border-emerald-100" },
    orange: { stroke: "#F58A07", bg: "bg-orange-50", text: "text-orange-700", ring: "border-orange-100" },
    purple: { stroke: "#7C3AED", bg: "bg-purple-50", text: "text-purple-700", ring: "border-purple-100" },
    red: { stroke: "#EF4444", bg: "bg-red-50", text: "text-red-700", ring: "border-red-100" },
    navy: { stroke: "#062238", bg: "bg-slate-50", text: "text-slate-800", ring: "border-slate-100" },
  };
  const toneConfig = tones[tone] || tones.blue;
  const safePercent = Math.max(0, Math.min(100, Number(percent) || 0));
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dash = (safePercent / 100) * circumference;
  const content = (
    <Card className={cls("p-4 transition", active ? "border-orange-200 shadow-[0_16px_40px_rgba(245,138,7,0.10)]" : "hover:border-orange-100 hover:shadow-md")}> 
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-1 truncate text-xl font-semibold text-slate-900">{value}</p>
          {sub && <p className="mt-1 line-clamp-2 text-[11px] font-medium text-slate-500">{sub}</p>}
        </div>
        {trend && <span className={cls("shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold", toneConfig.bg, toneConfig.text)}>{trend}</span>}
      </div>

      <div className="mt-4 grid grid-cols-[120px_1fr] items-center gap-3">
        <div className="relative h-[118px] w-[118px]">
          <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#EEF2F7" strokeWidth="14" />
            <circle cx="64" cy="64" r={radius} fill="none" stroke={toneConfig.stroke} strokeWidth="14" strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-semibold text-slate-900">{safePercent}%</p>
            <p className="text-[10px] font-semibold text-slate-400">ratio</p>
          </div>
        </div>
        <div className="space-y-2 text-xs">
          <div className={cls("rounded-2xl border px-3 py-2", toneConfig.bg, toneConfig.ring)}>
            <p className={cls("font-semibold", toneConfig.text)}>{hint}</p>
          </div>
          {total !== undefined && <div className="rounded-2xl bg-slate-50 px-3 py-2 text-slate-600"><b className="text-slate-900">{total}</b> total analysé</div>}
        </div>
      </div>
    </Card>
  );
  if (!onClick) return content;
  return <button type="button" onClick={onClick} className="w-full text-left">{content}</button>;
}

function AdminDashboard() {
  const { state, actions } = useApp();
  const [activeSection, setActiveSection] = useState("business");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [selectedOrgId, setSelectedOrgId] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("12m");
  const [businessDateFrom, setBusinessDateFrom] = useState("2026-01-01");
  const [businessDateTo, setBusinessDateTo] = useState("2026-12-31");

  const getSector = (id) => state.sectors.find((sector) => sector.id === id);
  const periodMultiplier = { "30d": 0.18, "90d": 0.42, "12m": 1 }[periodFilter] || 1;
  const scale = (value) => Math.max(0, Math.round(Number(value || 0) * periodMultiplier));
  const rate = (num, den) => den > 0 ? Math.round((num / den) * 100) : 0;
  const monthlyPlanPrice = (org) => org.plan === "Premium" ? (org.sector === "jobs" ? 499 : 299) : 0;
  const realOfferScore = (org) => {
    const liveOffers = state.offers.filter((offer) => offer.orgId === org.id);
    if (liveOffers.length) return Math.round(liveOffers.reduce((sum, offer) => sum + Number(offer.score || 0), 0) / liveOffers.length);
    const close = rate(org.stats.accepted, org.stats.offers);
    const speed = Math.max(0, 100 - Math.round(Number(org.stats.avgResponseHours || 0) * 7));
    return Math.round(close * 0.55 + speed * 0.30 + Math.min(100, Number(org.rating || 0) * 20) * 0.15);
  };

  const organizationsBySector = sectorFilter === "all" ? state.organizations : state.organizations.filter((org) => org.sector === sectorFilter);
  const selectedOrg = selectedOrgId === "all" ? null : state.organizations.find((org) => org.id === selectedOrgId);
  const scopeOrgs = selectedOrg ? [selectedOrg] : organizationsBySector;
  const scopeSectors = sectorFilter === "all" ? state.sectors : state.sectors.filter((sector) => sector.id === sectorFilter);

  const adminUsers = [
    { id: state.user.id, name: state.user.name, province: state.user.province, city: state.user.city, gender: "Femme", age: "35-44", location: "Montréal", mainService: "Immobilier", requests: state.requests.length, offers: state.offers.length },
    { id: "u2", name: "Ahmed Ben Ali", province: "Québec", city: "Laval", gender: "Homme", age: "25-34", location: "Laval", mainService: "Emploi", requests: 1, offers: 1 },
    { id: "u3", name: "Sofia M.", province: "Ontario", city: "Toronto", gender: "Femme", age: "25-34", location: "Toronto", mainService: "Immigration", requests: 2, offers: 0 },
    { id: "u4", name: "Karim H.", province: "Québec", city: "Montréal", gender: "Homme", age: "35-44", location: "Montréal", mainService: "Auto", requests: 3, offers: 2 },
    { id: "u5", name: "Amira B.", province: "Québec", city: "Longueuil", gender: "Femme", age: "18-24", location: "Longueuil", mainService: "Assurance", requests: 2, offers: 3 },
    { id: "u6", name: "Marc T.", province: "Québec", city: "Québec", gender: "Homme", age: "45+", location: "Québec", mainService: "Auto", requests: 1, offers: 0 },
  ];

  const groupCount = (items, key) => Object.entries(items.reduce((acc, item) => ({ ...acc, [item[key]]: (acc[item[key]] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  const userByGender = groupCount(adminUsers, "gender");
  const userByAge = groupCount(adminUsers, "age");
  const userByLocation = groupCount(adminUsers, "location");
  const userByService = groupCount(adminUsers, "mainService");
  const toDonutData = (items) => {
    const total = items.reduce((sum, item) => sum + item[1], 0) || 1;
    return items.map(([label, count]) => ({ label, count, value: Math.round((count / total) * 100) }));
  };

  const totalRevenue = state.organizations.reduce((sum, org) => sum + monthlyPlanPrice(org), 0);
  const totalPartners = state.organizations.length;
  const premiumPartners = state.organizations.filter((org) => org.plan === "Premium").length;
  const freePartners = totalPartners - premiumPartners;
  const totalClients = adminUsers.length;
  const totalRequests = scopeOrgs.reduce((sum, org) => sum + scale(org.stats.received), 0);
  const totalOffers = scopeOrgs.reduce((sum, org) => sum + scale(org.stats.offers), 0);
  const totalAccepted = scopeOrgs.reduce((sum, org) => sum + scale(org.stats.accepted), 0);
  const avgResponse = Math.round((scopeOrgs.reduce((sum, org) => sum + Number(org.stats.avgResponseHours || 0), 0) / Math.max(scopeOrgs.length, 1)) * 10) / 10;
  const closeRate = rate(totalAccepted, totalOffers);
  const offerRate = rate(totalOffers, totalRequests);

  const partnersByDomain = state.sectors.map((sector) => ({ sector, count: state.organizations.filter((org) => org.sector === sector.id).length }));
  const partnersDomainDonut = (() => {
    const total = partnersByDomain.reduce((sum, item) => sum + item.count, 0) || 1;
    return partnersByDomain.map(({ sector, count }) => ({ label: sector.label, count, value: Math.round((count / total) * 100) }));
  })();
  const servicesDemanded = state.sectors.map((sector) => ({ label: sector.label, count: Math.max(1, state.requests.filter((request) => request.sector === sector.id).length || Math.round(state.organizations.filter((org) => org.sector === sector.id).reduce((sum, org) => sum + org.stats.received, 0) / 40)) })).sort((a, b) => b.count - a.count);
  const servicesDonut = (() => {
    const total = servicesDemanded.reduce((sum, item) => sum + item.count, 0) || 1;
    return servicesDemanded.map((item) => ({ ...item, value: Math.round((item.count / total) * 100) }));
  })();
  const evolutionData = [
    { month: "Jan", partners: 18, clients: 82 }, { month: "Fév", partners: 21, clients: 104 }, { month: "Mar", partners: 26, clients: 131 }, { month: "Avr", partners: 29, clients: 156 },
    { month: "Mai", partners: 34, clients: 188 }, { month: "Juin", partners: 38, clients: 214 }, { month: "Juil", partners: 42, clients: 248 }, { month: "Août", partners: 46, clients: 291 },
    { month: "Sep", partners: 49, clients: 330 }, { month: "Oct", partners: 55, clients: 374 }, { month: "Nov", partners: 61, clients: 421 }, { month: "Déc", partners: 68, clients: 486 },
  ];

  const sectorOptions = [
    { value: "all", label: "Tous les domaines", count: state.organizations.length },
    ...state.sectors.map((sector) => ({ value: sector.id, label: sector.label, count: state.organizations.filter((org) => org.sector === sector.id).length })),
  ];
  const companyOptions = [
    { value: "all", label: "Toutes les compagnies", count: organizationsBySector.length },
    ...organizationsBySector.map((org) => ({ value: org.id, label: org.name })),
  ];
  const periodOptions = [{ value: "30d", label: "30 jours" }, { value: "90d", label: "90 jours" }, { value: "12m", label: "12 mois" }];
  const resetSector = (value) => { setSectorFilter(value); setSelectedOrgId("all"); };

  const partnerRows = scopeOrgs.map((org) => {
    const received = scale(org.stats.received);
    const offers = scale(org.stats.offers);
    const accepted = scale(org.stats.accepted);
    const close = rate(accepted, offers);
    const response = Number(org.stats.avgResponseHours || 0);
    const score = Math.round(close * 0.50 + rate(offers, received) * 0.20 + Math.max(0, 100 - response * 8) * 0.20 + realOfferScore(org) * 0.10);
    return { org, received, offers, accepted, closed: accepted, response, close, score };
  }).sort((a, b) => b.score - a.score);
  const bestCompany = partnerRows[0];

  const domainRows = scopeSectors.map((sector) => {
    const sectorOrgs = state.organizations.filter((org) => org.sector === sector.id);
    const requests = sectorOrgs.reduce((sum, org) => sum + scale(org.stats.received), 0);
    const offers = sectorOrgs.reduce((sum, org) => sum + scale(org.stats.offers), 0);
    const accepted = sectorOrgs.reduce((sum, org) => sum + scale(org.stats.accepted), 0);
    const bestOrg = [...sectorOrgs].sort((a, b) => rate(scale(b.stats.accepted), scale(b.stats.offers)) - rate(scale(a.stats.accepted), scale(a.stats.offers)))[0];
    return { sector, requests, offers, accepted, close: rate(accepted, offers), bestOrg };
  });

  const activeTabClass = (tab) => activeSection === tab ? "bg-[#061827] text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-50";
  const barList = (title, items, tone = "orange") => {
    const max = Math.max(...items.map((item) => item.value || item.count), 1);
    const color = tone === "navy" ? "bg-[#061827]" : tone === "green" ? "bg-emerald-500" : "bg-[#D95500]";
    return (
      <Card className="p-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <div className="mt-4 space-y-3">
          {items.map((item) => {
            const value = item.value || item.count;
            return <div key={item.label}>
              <div className="mb-1 flex justify-between text-xs font-semibold text-slate-600"><span>{item.label}</span><span>{value}</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={cls("h-full rounded-full", color)} style={{ width: `${Math.round((value / max) * 100)}%` }} /></div>
            </div>;
          })}
        </div>
      </Card>
    );
  };

  return (
    <div>
      <SectionHeader
        title="Dashboard admin"
        subtitle="Dashboard organisé en trois sections: business global, partenaires, et utilisateurs. Les pages de gestion restent dédiées à la liste, modification, suppression, contact et ajout."
        action={<Button onClick={() => actions.generateReport({ companyId: selectedOrg?.id || "all", sectorId: sectorFilter, period: periodFilter, reportType: "performance", source: "adminDashboard" })}>Générer rapport</Button>}
      />

      <Card className="mb-4 p-2">
        <div className="grid gap-2 md:grid-cols-3">
          {[["business", "1. Business global"], ["partners", "2. Partenaires"], ["users", "3. Utilisateurs"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveSection(key)} className={cls("rounded-2xl px-4 py-3 text-xs font-semibold transition", activeTabClass(key))}>{label}</button>
          ))}
        </div>
      </Card>

      {activeSection === "business" && (
        <Card className="mb-4 border-orange-100 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Date début
              <input type="date" value={businessDateFrom} onChange={(event) => setBusinessDateFrom(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none" />
            </label>
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Date fin
              <input type="date" value={businessDateTo} onChange={(event) => setBusinessDateTo(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none" />
            </label>
            <div className="rounded-2xl bg-orange-50 px-4 py-3 text-xs font-semibold text-orange-700 ring-1 ring-orange-100">
              Période: {businessDateFrom} → {businessDateTo}
            </div>
          </div>
        </Card>
      )}

      {activeSection === "business" && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Chiffre d’affaires" value={fmt(totalRevenue)} hint="Somme mensuelle des abonnements actifs" icon="💵" />
            <StatCard label="Partenaires" value={totalPartners} hint={`${premiumPartners} premium · ${freePartners} free`} icon="🏢" />
            <StatCard label="Clients" value={totalClients} hint={`${userByGender.map(([g, c]) => `${g}: ${c}`).join(" · ")}`} icon="👥" />
            <StatCard label="Service le plus demandé" value={servicesDemanded[0]?.label || "—"} hint={`${servicesDemanded[0]?.count || 0} demandes`} icon="🧩" />
          </div>
          <div className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
            <DonutChart title="Partenaires par domaine" subtitle="Répartition des compagnies actives avec pourcentage et nombre." data={partnersDomainDonut} countLabel="partenaires" />

            <Card className="p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Évolution annuelle</h3>
                  <p className="mt-1 text-xs text-slate-500">Croissance des partenaires et des clients sur 12 mois.</p>
                </div>
                <Pill className="bg-orange-50 text-orange-700">Partenaires + clients</Pill>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={evolutionData}>
                  <defs><linearGradient id="adminGrowth" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#D95500" stopOpacity={0.35} /><stop offset="95%" stopColor="#D95500" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="clients" stroke="#D95500" fill="url(#adminGrowth)" strokeWidth={3} name="Clients" />
                  <Line type="monotone" dataKey="partners" stroke="#061827" strokeWidth={3} name="Partenaires" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
</div>
      )}

      {activeSection === "partners" && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="grid gap-3 lg:grid-cols-[240px_1fr_180px] lg:items-end">
              <FilterDropdown label="Domaine" items={sectorOptions} value={sectorFilter} onChange={resetSector} />
              <FilterDropdown label="Compagnie" items={companyOptions} value={selectedOrgId} onChange={setSelectedOrgId} />
              <FilterDropdown label="Période" items={periodOptions} value={periodFilter} onChange={setPeriodFilter} />
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <CircularKpiCard label="Demandes reçues" value={totalRequests} percent={offerRate} total={totalRequests} hint={`${totalOffers} avec offre`} tone="blue" sub={selectedOrg ? selectedOrg.name : "Périmètre sélectionné"} />
            <CircularKpiCard label="Offres envoyées" value={totalOffers} percent={offerRate} total={totalRequests} hint={`${offerRate}% des demandes`} tone="orange" sub="Demandes traitées = offres envoyées" />
            <CircularKpiCard label="Offres acceptées" value={totalAccepted} percent={closeRate} total={totalOffers} hint={`${closeRate}% closing`} tone={closeRate >= 30 ? "green" : closeRate > 0 ? "orange" : "red"} sub="Accepted / sent" />
            <CircularKpiCard label="Closed offers" value={totalAccepted} percent={closeRate} total={totalOffers} hint="Offres acceptées et clôturées" tone="green" sub="Close réel" />
            <CircularKpiCard label="Réponse moyenne" value={`${avgResponse}h`} percent={Math.max(0, 100 - Math.round(avgResponse * 8))} total={scopeOrgs.length} hint={avgResponse <= 4 ? "Rapide" : "À accélérer"} tone={avgResponse <= 4 ? "green" : "red"} sub="SLA" />
          </div>

          {!selectedOrg && sectorFilter !== "all" && bestCompany && (
            <Card className="border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <AvatarBadge label={bestCompany.org.name} src={bestCompany.org.logoUrl} className="h-12 w-12 rounded-2xl" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Meilleure compagnie sur la période</p>
                    <h3 className="truncate text-base font-semibold text-slate-900">{bestCompany.org.name}</h3>
                    <p className="text-xs text-slate-500">{getSector(bestCompany.org.sector)?.label} • score {bestCompany.score}/100</p>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-4 lg:min-w-[560px]"><Info label="Demandes reçues" value={bestCompany.received} /><Info label="Offres envoyées" value={bestCompany.offers} /><Info label="Offres acceptées" value={bestCompany.accepted} /><Info label="Réponse" value={`${bestCompany.response}h`} /></div>
              </div>
            </Card>
          )}

          {!selectedOrg ? (
            <Card className="overflow-hidden">
              <div className="border-b border-slate-100 bg-white p-4"><p className="text-xs font-semibold uppercase tracking-wide text-[#D95500]">Analyse concurrentielle</p><h3 className="mt-1 text-lg font-semibold text-slate-900">Demandes, offres et closing par domaine</h3></div>
              <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {domainRows.map((row) => {
                  const closeTone = row.close >= 30 ? "bg-emerald-50 text-emerald-700" : row.close > 0 ? "bg-orange-50 text-orange-700" : "bg-red-50 text-red-700";
                  const maxValue = Math.max(row.requests, row.offers, row.accepted, 1);
                  return <div key={row.sector.id} className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_10px_26px_rgba(8,27,42,0.04)]">
                    <div className="flex items-start justify-between gap-3"><Pill className={row.sector.color}>{row.sector.icon} {row.sector.label}</Pill><span className={cls("rounded-full px-2.5 py-1 text-[11px] font-semibold", closeTone)}>{row.close}% close</span></div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center"><Info label="Demandes" value={row.requests} /><Info label="Offres" value={row.offers} /><Info label="Acceptées" value={row.accepted} /></div>
                    <div className="mt-4 space-y-3">{[["Offres", row.offers, "#D95500"], ["Acceptées", row.accepted, "#059669"]].map(([label, value, color]) => <div key={label}><div className="mb-1 flex justify-between text-[11px] font-semibold text-slate-500"><span>{label}</span><span>{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${Math.round((Number(value) / maxValue) * 100)}%`, background: color }} /></div></div>)}</div>
                    <div className="mt-4 rounded-2xl bg-slate-50 px-3 py-2"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Compagnie qui close le plus</p><p className="mt-1 truncate text-sm font-semibold text-slate-900">{row.bestOrg?.name || "—"}</p></div>
                  </div>;
                })}
              </div>
            </Card>
          ) : (
            <Card className="p-4">
              <div className="mb-4 flex items-center gap-3"><AvatarBadge label={selectedOrg.name} src={selectedOrg.logoUrl} className="h-12 w-12 rounded-2xl" /><div><h3 className="text-base font-semibold text-slate-900">{selectedOrg.name}</h3><p className="text-xs text-slate-500">{getSector(selectedOrg.sector)?.label} • {selectedOrg.plan}</p></div></div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"><Info label="Statut" value={selectedOrg.plan} /><Info label="Demandes reçues" value={partnerRows[0]?.received || 0} /><Info label="Offres envoyées" value={partnerRows[0]?.offers || 0} /><Info label="Offres acceptées" value={partnerRows[0]?.accepted || 0} /><Info label="Closed offers" value={partnerRows[0]?.closed || 0} /><Info label="Réponse moyenne" value={`${partnerRows[0]?.response || 0}h`} /><Info label="Taux close" value={`${partnerRows[0]?.close || 0}%`} /><Info label="Score business" value={`${partnerRows[0]?.score || 0}/100`} /></div>
            </Card>
          )}
        </div>
      )}

      {activeSection === "users" && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total clients" value={totalClients} hint="Clients inscrits" icon="👥" />
            <StatCard label="Genre dominant" value={userByGender[0]?.[0] || "—"} hint={`${userByGender[0]?.[1] || 0} clients`} icon="⚖️" />
            <StatCard label="Âge dominant" value={userByAge[0]?.[0] || "—"} hint={`${userByAge[0]?.[1] || 0} clients`} icon="🎂" />
            <StatCard label="Localisation top" value={userByLocation[0]?.[0] || "—"} hint={`${userByLocation[0]?.[1] || 0} clients`} icon="📍" />
          </div>

          <Card className="p-4">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#D95500]">Métriques utilisateurs</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">Vue client globale</h3>
              <p className="mt-1 text-xs text-slate-500">Pas de tableau détaillé ici. Les détails, modification, suppression et contact restent dans Gestion utilisateurs.</p>
            </div>
            <div className="grid gap-4 xl:grid-cols-4">
              <DonutChart title="Domaines recherchés" subtitle="Services demandés par les clients." data={toDonutData(userByService)} countLabel="utilisateurs" />
              <DonutChart title="Localisation" subtitle="Répartition des clients par ville." data={toDonutData(userByLocation)} countLabel="utilisateurs" />
              <DonutChart title="Âge" subtitle="Segments d’âge principaux." data={toDonutData(userByAge)} countLabel="utilisateurs" />
              <DonutChart title="Sexe" subtitle="Répartition simple des clients." data={toDonutData(userByGender)} countLabel="utilisateurs" />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function AdminUsers() {
  const { state, actions } = useApp();
  const [statusFilter, setStatusFilter] = useState("all");
  const [identityFilter, setIdentityFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeMonth, setActiveMonth] = useState("Déc");

  const adminUsers = [
    { id: state.user.id, name: state.user.name, email: state.user.email, phone: state.user.phone, province: state.user.province, city: state.user.city, status: state.user.accountStatus, identity: state.user.identityStatus, type: "Client", preferredContact: state.user.preferredContact, language: state.user.language, gender: "Femme", age: "35-44", mainService: "Immobilier", createdMonth: "Jan", requests: state.requests.length, offers: state.offers.length, lastActivity: "Aujourd’hui" },
    { id: "u2", name: "Ahmed Ben Ali", email: "ahmed@email.com", phone: "+1 514 222 1000", province: "Québec", city: "Laval", status: "Actif", identity: "À vérifier", type: "Client", preferredContact: "Téléphone", language: "Français, Arabe", gender: "Homme", age: "25-34", mainService: "Emploi", createdMonth: "Fév", requests: 1, offers: 1, lastActivity: "Hier" },
    { id: "u3", name: "Sofia M.", email: "sofia@email.com", phone: "+1 647 333 2000", province: "Ontario", city: "Toronto", status: "Nouveau", identity: "Non vérifiée", type: "Client", preferredContact: "Email seulement", language: "Français, Anglais", gender: "Femme", age: "25-34", mainService: "Immigration", createdMonth: "Mars", requests: 2, offers: 0, lastActivity: "2026-05-18" },
    { id: "u4", name: "Karim H.", email: "karim@email.com", phone: "+1 514 333 4400", province: "Québec", city: "Montréal", status: "Actif", identity: "Identité vérifiée", type: "Client", preferredContact: "Message in-app", language: "Français", gender: "Homme", age: "35-44", mainService: "Auto", createdMonth: "Avr", requests: 3, offers: 2, lastActivity: "Aujourd’hui" },
    { id: "u5", name: "Amira B.", email: "amira@email.com", phone: "+1 438 444 1200", province: "Québec", city: "Longueuil", status: "Actif", identity: "Identité vérifiée", type: "Client", preferredContact: "Email + in-app", language: "Français, Arabe", gender: "Femme", age: "18-24", mainService: "Assurance", createdMonth: "Mai", requests: 2, offers: 3, lastActivity: "Aujourd’hui" },
    { id: "u6", name: "Marc T.", email: "marc@email.com", phone: "+1 418 555 8710", province: "Québec", city: "Québec", status: "Actif", identity: "À vérifier", type: "Client", preferredContact: "Téléphone", language: "Français", gender: "Homme", age: "45+", mainService: "Auto", createdMonth: "Juin", requests: 1, offers: 0, lastActivity: "Cette semaine" },
  ];

  const filteredUsers = adminUsers.filter((user) => {
    const matchStatus = statusFilter === "all" || user.status === statusFilter;
    const matchIdentity = identityFilter === "all" || user.identity === identityFilter;
    const matchCity = cityFilter === "all" || user.city === cityFilter;
    const matchSearch = !search.trim() || `${user.name} ${user.email} ${user.phone} ${user.city} ${user.mainService}`.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchIdentity && matchCity && matchSearch;
  });

  const groupCount = (items, key) => Object.entries(items.reduce((acc, item) => ({ ...acc, [item[key]]: (acc[item[key]] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  const totalUsers = filteredUsers.length;
  const byGender = groupCount(filteredUsers, "gender");
  const byAge = groupCount(filteredUsers, "age");
  const byLocation = groupCount(filteredUsers, "city");
  const byService = groupCount(filteredUsers, "mainService");
  const months = [
    { month: "Jan", count: 14 },
    { month: "Fév", count: 18 },
    { month: "Mars", count: 16 },
    { month: "Avr", count: 22 },
    { month: "Mai", count: 20 },
    { month: "Juin", count: 24 },
    { month: "Juil", count: 21 },
    { month: "Août", count: 26 },
    { month: "Sept", count: 28 },
    { month: "Oct", count: 31 },
    { month: "Nov", count: 29 },
    { month: "Déc", count: 34 },
  ];
  const selectedMonth = months.find((item) => item.month === activeMonth) || months[months.length - 1];
  const maxMonth = Math.max(...months.map((item) => item.count), 1);
  const maxAge = Math.max(...byAge.map(([, count]) => count), 1);
  const maxLocation = Math.max(...byLocation.map(([, count]) => count), 1);
  const maxService = Math.max(...byService.map(([, count]) => count), 1);

  const statusOptions = [
    { value: "all", label: "Tous statuts", count: adminUsers.length },
    ...Array.from(new Set(adminUsers.map((user) => user.status))).map((status) => ({ value: status, label: status, count: adminUsers.filter((user) => user.status === status).length })),
  ];
  const identityOptions = [
    { value: "all", label: "Toutes identités", count: adminUsers.length },
    ...Array.from(new Set(adminUsers.map((user) => user.identity))).map((identity) => ({ value: identity, label: identity, count: adminUsers.filter((user) => user.identity === identity).length })),
  ];
  const cityOptions = [
    { value: "all", label: "Toutes villes", count: adminUsers.length },
    ...Array.from(new Set(adminUsers.map((user) => user.city))).map((city) => ({ value: city, label: city, count: adminUsers.filter((user) => user.city === city).length })),
  ];

  return (
    <div>
      <SectionHeader
        title="Gestion utilisateurs"
        subtitle="Vue admin des clients avec métriques par genre, âge, localisation, service demandé et évolution annuelle."
      />

      <Card className="mb-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_210px_180px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Recherche
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nom, email, téléphone, ville ou service"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none transition hover:border-orange-200 focus:border-[#F58A07] focus:ring-2 focus:ring-orange-100"
            />
          </label>
          <FilterDropdown label="Statut" items={statusOptions} value={statusFilter} onChange={setStatusFilter} />
          <FilterDropdown label="Identité" items={identityOptions} value={identityFilter} onChange={setIdentityFilter} />
          <FilterDropdown label="Ville" items={cityOptions} value={cityFilter} onChange={setCityFilter} />
        </div>
      </Card>

      <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total utilisateurs" value={totalUsers} icon="👥" />
        <StatCard label="Femmes" value={byGender.find(([label]) => label === "Femme")?.[1] || 0} icon="♀" />
        <StatCard label="Hommes" value={byGender.find(([label]) => label === "Homme")?.[1] || 0} icon="♂" />
        <StatCard label="Top location" value={byLocation[0]?.[0] || "-"} hint={`${byLocation[0]?.[1] || 0} utilisateur(s)`} icon="📍" />
        <StatCard label="Service top" value={byService[0]?.[0] || "-"} hint={`${byService[0]?.[1] || 0} demande(s)`} icon="🧩" />
      </div>

      <div className="mb-4 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="p-4">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Évolution utilisateurs — 12 mois</h3>
              <p className="text-xs text-slate-500">Cliquez sur un mois pour afficher son volume.</p>
            </div>
            <Pill className="bg-orange-50 text-orange-700">Interactif</Pill>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {months.map((item) => (
              <button
                key={item.month}
                onClick={() => setActiveMonth(item.month)}
                className={cls("rounded-full px-3 py-1.5 text-xs font-semibold transition", activeMonth === item.month ? "bg-[#F58A07] text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}
              >
                {item.month}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-12 items-end gap-2 rounded-3xl bg-slate-50 p-4">
            {months.map((item) => {
              const active = activeMonth === item.month;
              return (
                <button key={item.month} onClick={() => setActiveMonth(item.month)} className="flex flex-col items-center justify-end gap-2">
                  <p className={cls("text-xs font-semibold", active ? "text-[#F58A07]" : "text-slate-600")}>{item.count}</p>
                  <div className={cls("flex h-48 w-full items-end justify-center rounded-2xl px-1.5 py-2 transition", active ? "bg-orange-100" : "bg-white hover:bg-slate-100")}>
                    <div className={cls("w-full max-w-[34px] rounded-t-2xl transition-all", active ? "bg-[#F58A07]" : "bg-slate-300")} style={{ height: `${Math.max(22, Math.round((item.count / maxMonth) * 150))}px` }} />
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500">{item.month}</p>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-900">Genre</h3>
            <p className="text-xs text-slate-500">Mois sélectionné: {selectedMonth.month} · {selectedMonth.count} utilisateurs</p>
          </div>
          <div className="mb-4 rounded-3xl bg-[#062238] p-4 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/50">Volume du mois</p>
            <p className="mt-2 text-3xl font-bold">{selectedMonth.count}</p>
            <p className="mt-1 text-xs text-white/65">{selectedMonth.month}</p>
          </div>
          <div className="space-y-3">
            {byGender.map(([label, count]) => (
              <div key={label} className="rounded-2xl bg-slate-50 p-3">
                <div className="mb-2 flex justify-between text-xs font-semibold"><span>{label}</span><span>{count}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-white"><div className={cls("h-full rounded-full", label === "Femme" ? "bg-purple-500" : "bg-blue-500")} style={{ width: `${Math.round((count / Math.max(totalUsers, 1)) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mb-4 grid gap-4 xl:grid-cols-3">
        <Card className="p-4">
          <h3 className="text-base font-semibold text-slate-900">Utilisateurs par âge</h3>
          <div className="mt-4 space-y-3">
            {byAge.map(([label, count]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-xs font-semibold text-slate-600"><span>{label}</span><span>{count}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#F58A07]" style={{ width: `${Math.round((count / maxAge) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="text-base font-semibold text-slate-900">Utilisateurs par location</h3>
          <div className="mt-4 space-y-3">
            {byLocation.map(([label, count]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-xs font-semibold text-slate-600"><span>{label}</span><span>{count}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.round((count / maxLocation) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="text-base font-semibold text-slate-900">Services demandés</h3>
          <div className="mt-4 space-y-3">
            {byService.map(([label, count]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-xs font-semibold text-slate-600"><span>{label}</span><span>{count}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#062238]" style={{ width: `${Math.round((count / maxService) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-slate-100 bg-white p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Liste des utilisateurs</h3>
            <p className="text-xs text-slate-500">Informations administratives de base uniquement.</p>
          </div>
          <Pill className="bg-blue-50 text-blue-700">{filteredUsers.length} utilisateur{filteredUsers.length > 1 ? "s" : ""}</Pill>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Utilisateur</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Ville</th>
                <th className="px-4 py-3 font-semibold">Genre / âge</th>
                <th className="px-4 py-3 font-semibold">Service demandé</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3 font-semibold">Identité</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50/70">
                  <td className="px-4 py-4"><div className="flex items-center gap-3"><AvatarBadge label={user.name} src={user.photoUrl || profilePhoto(user.name, user.gender === "Femme" ? "F58A07" : "062238")} /><div className="min-w-0"><p className="truncate font-semibold text-slate-900">{user.name}</p><p className="truncate text-[11px] text-slate-500">{user.type}</p></div></div></td>
                  <td className="px-4 py-4"><p className="font-semibold text-slate-800">{user.email}</p><p className="text-[11px] text-slate-500">{user.phone}</p></td>
                  <td className="px-4 py-4 font-semibold text-slate-700">{user.city}, {user.province}</td>
                  <td className="px-4 py-4"><Pill className="bg-slate-100 text-slate-700">{user.gender} · {user.age}</Pill></td>
                  <td className="px-4 py-4"><Pill className="bg-orange-50 text-orange-700">{user.mainService}</Pill></td>
                  <td className="px-4 py-4"><Pill className={user.status === "Actif" ? "bg-emerald-50 text-emerald-700" : user.status === "Nouveau" ? "bg-blue-50 text-blue-700" : "bg-orange-50 text-orange-700"}>{user.status}</Pill></td>
                  <td className="px-4 py-4"><Pill className={user.identity === "Identité vérifiée" ? "bg-emerald-50 text-emerald-700" : user.identity === "Non vérifiée" ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"}>{user.identity}</Pill></td>
                  <td className="px-4 py-4"><div className="flex flex-wrap justify-end gap-2"><Button variant="ghost" className="px-4" onClick={() => actions.openModal("profilePreview")}>Voir</Button><Button variant="ghost" className="px-4" onClick={() => actions.notify(`Message envoyé à ${user.name}.`)}>Contacter</Button><Button variant="danger" className="px-4" onClick={() => actions.notify(`Accès stoppé pour ${user.name}.`)}>Stopper accès</Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filteredUsers.length && <div className="p-4"><EmptyState text="Aucun utilisateur ne correspond à ces filtres." /></div>}
      </Card>
    </div>
  );
}

function AdminOrganizations() {
  const { state, actions } = useApp();
  const [sectorFilter, setSectorFilter] = useState("all");
  const [selectedOrgId, setSelectedOrgId] = useState("all");
  const [activeMonth, setActiveMonth] = useState("Déc");

  const orgsBySector = sectorFilter === "all" ? state.organizations : state.organizations.filter((org) => org.sector === sectorFilter);
  const selectedOrg = selectedOrgId === "all" ? null : state.organizations.find((org) => org.id === selectedOrgId);
  const visibleOrgs = selectedOrg ? [selectedOrg] : orgsBySector;

  const sectorOptions = [
    { value: "all", label: "Tous les domaines", count: state.organizations.length },
    ...state.sectors.map((sector) => ({ value: sector.id, label: sector.label, count: state.organizations.filter((org) => org.sector === sector.id).length })),
  ];

  const companyOptions = [
    { value: "all", label: selectedOrgId === "all" ? "Toutes les compagnies" : "Vue globale", count: orgsBySector.length },
    ...orgsBySector.map((org) => ({ value: org.id, label: org.name, count: org.stats.offers })),
  ];

  const getOrgRequests = (org) => state.requests.filter((request) => request.sector === org.sector && org.provinceAccess.includes(request.province));
  const getOrgOffers = (org) => state.offers.filter((offer) => offer.orgId === org.id);
  const getSector = (id) => state.sectors.find((sector) => sector.id === id);

  const globalStats = {
    total: visibleOrgs.length,
    premium: visibleOrgs.filter((org) => org.plan === "Premium").length,
    free: visibleOrgs.filter((org) => org.plan !== "Premium").length,
    requests: visibleOrgs.reduce((sum, org) => sum + getOrgRequests(org).length, 0),
    offers: visibleOrgs.reduce((sum, org) => sum + getOrgOffers(org).length, 0),
    accepted: visibleOrgs.reduce((sum, org) => sum + getOrgOffers(org).filter((offer) => offer.status === "accepted").length, 0),
  };

  const companyOffers = selectedOrg ? getOrgOffers(selectedOrg) : [];
  const companyRequests = selectedOrg ? getOrgRequests(selectedOrg) : [];
  const companyAccepted = companyOffers.filter((offer) => offer.status === "accepted");
  const companyRefused = companyOffers.filter((offer) => ["refused", "declined", "rejected"].includes(offer.status));
  const companyPending = companyOffers.filter((offer) => !["accepted", "refused", "declined", "rejected"].includes(offer.status));
  const companyConversion = Math.round((companyAccepted.length / Math.max(companyOffers.length, 1)) * 100);
  const avgScore = Math.round(companyOffers.reduce((sum, offer) => sum + Number(offer.score || 0), 0) / Math.max(companyOffers.length, 1));

  const requestsByDomain = state.sectors.map((sector) => ({
    label: sector.label,
    value: Math.max(8, state.requests.filter((request) => request.sector === sector.id).length * 22),
    count: state.requests.filter((request) => request.sector === sector.id).length,
  })).filter((item) => item.count > 0 || sectorFilter === "all");

  const offersByDomain = state.sectors.map((sector) => ({
    label: sector.label,
    value: Math.max(8, state.offers.filter((offer) => offer.sector === sector.id).length * 22),
    count: state.offers.filter((offer) => offer.sector === sector.id).length,
  })).filter((item) => item.count > 0 || sectorFilter === "all");

  const partnerGrowth = [
    { label: "Jan", value: 8 }, { label: "Fév", value: 10 }, { label: "Mar", value: 11 }, { label: "Avr", value: 13 },
    { label: "Mai", value: 15 }, { label: "Juin", value: 17 }, { label: "Juil", value: 18 }, { label: "Août", value: 19 },
    { label: "Sep", value: 21 }, { label: "Oct", value: 23 }, { label: "Nov", value: 25 }, { label: "Déc", value: 28 },
  ];
  const maxGrowth = Math.max(...partnerGrowth.map((item) => item.value), 1);
  const selectedMonth = partnerGrowth.find((item) => item.label === activeMonth) || partnerGrowth[partnerGrowth.length - 1];

  const resetCompanyWhenSectorChanges = (value) => {
    setSectorFilter(value);
    setSelectedOrgId("all");
  };

  return (
    <div>
      <SectionHeader
        title="Gestion compagnies"
        subtitle="Consultation des compagnies, métriques par compagnie, génération de rapport et contrôle des accès."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => actions.generateReport({ companyId: selectedOrg?.id || "all", sectorId: sectorFilter, reportType: "companyMetrics", source: "adminOrganizations" })}>{selectedOrg ? "Rapport compagnie" : "Rapport global"}</Button>
            {selectedOrg && <Button variant="danger" onClick={() => actions.notify(`Accès stoppé pour ${selectedOrg.name}.`)}>Stopper accès</Button>}
          </div>
        }
      />

      <Card className="mb-4 p-4">
        <div className="grid gap-3 lg:grid-cols-[260px_1fr_auto] lg:items-end">
          <FilterDropdown label="Domaine" items={sectorOptions} value={sectorFilter} onChange={resetCompanyWhenSectorChanges} />
          <FilterDropdown label="Compagnie" items={companyOptions} value={selectedOrgId} onChange={setSelectedOrgId} />
          <Button variant="ghost" onClick={() => setSelectedOrgId("all")}>Vue globale</Button>
        </div>
      </Card>

      {!selectedOrg ? (
        <>
          <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Total compagnies" value={globalStats.total} hint={sectorFilter === "all" ? "Tous domaines" : getSector(sectorFilter)?.label} icon="🏢" />
            <StatCard label="Premium" value={globalStats.premium} hint="Plans payants" icon="⭐" />
            <StatCard label="Free" value={globalStats.free} hint="Plans gratuits" icon="🆓" />
            <StatCard label="Demandes totales" value={globalStats.requests} hint="Par domaine" icon="📥" />
            <StatCard label="Offres totales" value={globalStats.offers} hint={`${globalStats.accepted} acceptées`} icon="🏷️" />
          </div>

          <div className="mb-4 grid gap-4 xl:grid-cols-2">
            <DonutChart title="Total des demandes par domaine" subtitle="Répartition des demandes reçues sur la plateforme." data={requestsByDomain} />
            <DonutChart title="Total des offres par domaine" subtitle="Répartition des offres envoyées par les partenaires." data={offersByDomain} />
          </div>

          <Card className="mb-4 p-4">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Évolution des partenaires — 12 mois</h3>
                <p className="text-xs text-slate-500">Suivi du nombre de compagnies actives sur une année.</p>
              </div>
              <Pill className="bg-orange-50 text-orange-700">{selectedMonth.label} · {selectedMonth.value} partenaires</Pill>
            </div>
            <div className="grid grid-cols-12 items-end gap-2 rounded-3xl bg-slate-50 p-4">
              {partnerGrowth.map((item) => {
                const active = activeMonth === item.label;
                return (
                  <button key={item.label} onClick={() => setActiveMonth(item.label)} className="flex flex-col items-center justify-end gap-2">
                    <p className={cls("text-xs font-semibold", active ? "text-[#F58A07]" : "text-slate-600")}>{item.value}</p>
                    <div className={cls("flex h-44 w-full items-end justify-center rounded-2xl px-1.5 py-2 transition", active ? "bg-orange-100" : "bg-white hover:bg-slate-100")}>
                      <div className={cls("w-full max-w-[34px] rounded-t-2xl transition-all", active ? "bg-[#F58A07]" : "bg-slate-300")} style={{ height: `${Math.max(22, Math.round((item.value / maxGrowth) * 140))}px` }} />
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500">{item.label}</p>
                  </button>
                );
              })}
            </div>
          </Card>
        </>
      ) : (
        <>
          <Card className="mb-4 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <AvatarBadge label={selectedOrg.name} src={selectedOrg.logoUrl} className="h-14 w-14 rounded-3xl" />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-slate-900">{selectedOrg.name}</h3>
                  <p className="text-xs text-slate-500">{getSector(selectedOrg.sector)?.label} • {selectedOrg.city} • {selectedOrg.contactPerson}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <Pill className={getSector(selectedOrg.sector)?.color}>{getSector(selectedOrg.sector)?.icon} {getSector(selectedOrg.sector)?.label}</Pill>
                <Pill className={selectedOrg.plan === "Premium" ? "bg-orange-50 text-orange-700" : "bg-slate-100 text-slate-700"}>{selectedOrg.plan}</Pill>
                <Pill className={selectedOrg.status === "verified" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"}>{selectedOrg.status}</Pill>
                <Button variant="ghost" className="px-4" onClick={() => actions.generateReport({ companyId: selectedOrg.id, sectorId: selectedOrg.sector, reportType: "companyMetrics", source: "adminOrganizations" })}>Générer rapport</Button>
                <Button variant="danger" className="px-4" onClick={() => actions.notify(`Accès stoppé pour ${selectedOrg.name}.`)}>Stopper accès</Button>
              </div>
            </div>
          </Card>

          <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Offres envoyées" value={companyOffers.length} hint="Par cette compagnie" icon="🏷️" />
            <StatCard label="Offres acceptées" value={companyAccepted.length} hint={`${companyConversion}% conversion`} icon="✅" />
            <StatCard label="Offres refusées" value={companyRefused.length} hint="Non retenues par clients" icon="✕" />
            <StatCard label="Offres en attente" value={companyPending.length} hint="À suivre" icon="⏳" />
            <StatCard label="Plan" value={selectedOrg.plan} hint={selectedOrg.billingEmail} icon="💳" />
          </div>

          <div className="mb-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <Card className="p-4">
              <h3 className="text-base font-semibold text-slate-900">Informations compagnie</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Info label="Contact" value={selectedOrg.contactPerson} />
                <Info label="Email" value={selectedOrg.email} />
                <Info label="Téléphone" value={selectedOrg.phone} />
                <Info label="Site web" value={selectedOrg.website} />
                <Info label="Provinces" value={selectedOrg.provinceAccess.join(" / ")} />
                <Info label="Politique réponse" value={selectedOrg.responsePolicy} />
              </div>
            </Card>
            <Card className="p-4">
              <h3 className="text-base font-semibold text-slate-900">Insights de performance</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Info label="Demandes accessibles" value={companyRequests.length} />
                <Info label="Score moyen offres" value={`${avgScore}/100`} />
                <Info label="Délai moyen réponse" value={`${selectedOrg.stats.avgResponseHours}h`} />
                <Info label="Membres équipe" value={selectedOrg.team.length} />
              </div>
              <div className="mt-4 rounded-2xl bg-orange-50 p-3 text-xs font-semibold text-orange-800">
                {companyConversion >= 30 ? "Bonne conversion. Garder la qualité des offres et le délai de réponse." : "Conversion à améliorer: optimiser prix, délai et valeur avant envoi."}
              </div>
            </Card>
          </div>
        </>
      )}

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-slate-100 bg-white p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{selectedOrg ? "Compagnie sélectionnée" : "Compagnies du domaine"}</h3>
            <p className="text-xs text-slate-500">La liste suit le domaine sélectionné. Les insights au-dessus changent selon la compagnie choisie.</p>
          </div>
          <Pill className="bg-blue-50 text-blue-700">{visibleOrgs.length} compagnie{visibleOrgs.length > 1 ? "s" : ""}</Pill>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Compagnie</th>
                <th className="px-4 py-3 font-semibold">Domaine</th>
                <th className="px-4 py-3 font-semibold">Plan</th>
                <th className="px-4 py-3 font-semibold">Demandes</th>
                <th className="px-4 py-3 font-semibold">Offres envoyées</th>
                <th className="px-4 py-3 font-semibold">Acceptées</th>
                <th className="px-4 py-3 font-semibold">Refusées</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {visibleOrgs.map((org) => {
                const sector = getSector(org.sector);
                const offers = getOrgOffers(org);
                const accepted = offers.filter((offer) => offer.status === "accepted").length;
                const refused = offers.filter((offer) => ["refused", "declined", "rejected"].includes(offer.status)).length;
                return (
                  <tr key={org.id} className={cls("transition hover:bg-slate-50/70", selectedOrg?.id === org.id ? "bg-orange-50/30" : "")}> 
                    <td className="px-4 py-4"><div className="flex items-center gap-3"><AvatarBadge label={org.name} src={org.logoUrl} /><div className="min-w-0"><p className="truncate font-semibold text-slate-900">{org.name}</p><p className="truncate text-[11px] text-slate-500">{org.email}</p></div></div></td>
                    <td className="px-4 py-4"><Pill className={sector?.color}>{sector?.icon} {sector?.label}</Pill></td>
                    <td className="px-4 py-4"><Pill className={org.plan === "Premium" ? "bg-orange-50 text-orange-700" : "bg-slate-100 text-slate-700"}>{org.plan}</Pill></td>
                    <td className="px-4 py-4 font-semibold text-slate-800">{getOrgRequests(org).length}</td>
                    <td className="px-4 py-4 font-semibold text-slate-800">{offers.length}</td>
                    <td className="px-4 py-4 font-semibold text-emerald-700">{accepted}</td>
                    <td className="px-4 py-4 font-semibold text-red-600">{refused}</td>
                    <td className="px-4 py-4"><div className="flex flex-wrap justify-end gap-2"><Button variant="ghost" className="px-4" onClick={() => setSelectedOrgId(org.id)}>Métriques</Button><Button variant="ghost" className="px-4" onClick={() => actions.generateReport({ companyId: org.id, sectorId: org.sector, reportType: "companyMetrics", source: "adminOrganizations" })}>Rapport</Button><Button variant="ghost" className="px-4" onClick={() => actions.notify(`Message envoyé à ${org.name}.`)}>Contacter</Button><Button variant="danger" className="px-4" onClick={() => actions.notify(`Accès stoppé pour ${org.name}.`)}>Stopper accès</Button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AdminRequests() {
  const { state, actions } = useApp();
  const [companyFilter, setCompanyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const companyOptions = [
    { value: "all", label: "Toutes compagnies", count: state.requests.length },
    ...state.organizations.map((org) => ({ value: org.id, label: org.name, count: state.requests.filter((request) => request.sector === org.sector && org.provinceAccess.includes(request.province)).length })),
  ];
  const statusOptions = [
    { value: "all", label: "Tous statuts", count: state.requests.length },
    { value: "draft", label: "Brouillons", count: state.requests.filter((request) => request.status === "draft").length },
    { value: "inProgress", label: "En traitement", count: state.requests.filter((request) => request.status === "inProgress").length },
    { value: "offersReceived", label: "Offres reçues", count: state.requests.filter((request) => request.status === "offersReceived").length },
    { value: "closed", label: "Clôturées", count: state.requests.filter((request) => request.status === "closed").length },
  ];
  const sectorOptions = [
    { value: "all", label: "Tous services", count: state.requests.length },
    ...state.sectors.map((sector) => ({ value: sector.id, label: sector.label, count: state.requests.filter((request) => request.sector === sector.id).length })),
  ];

  const visibleRequests = state.requests.filter((request) => {
    const company = state.organizations.find((org) => org.id === companyFilter);
    const matchCompany = companyFilter === "all" || (company && request.sector === company.sector && company.provinceAccess.includes(request.province));
    const matchStatus = statusFilter === "all" || request.status === statusFilter;
    const matchSector = sectorFilter === "all" || request.sector === sectorFilter;
    return matchCompany && matchStatus && matchSector;
  });

  return (
    <div>
      <SectionHeader title="Tracking demandes" subtitle="Suivi admin de toutes les demandes par compagnie, client, statut, offres acceptées et clôtures." />
      <Card className="mb-4 p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <FilterDropdown label="Compagnie" items={companyOptions} value={companyFilter} onChange={setCompanyFilter} />
          <FilterDropdown label="Statut" items={statusOptions} value={statusFilter} onChange={setStatusFilter} />
          <FilterDropdown label="Service" items={sectorOptions} value={sectorFilter} onChange={setSectorFilter} />
        </div>
      </Card>
      <div className="mb-4 grid gap-4 md:grid-cols-4">
        <StatCard label="Demandes filtrées" value={visibleRequests.length} hint="Selon critères" icon="📌" />
        <StatCard label="Clôturées" value={visibleRequests.filter((request) => request.status === "closed").length} hint="Process terminé" icon="✅" />
        <StatCard label="Avec offres" value={visibleRequests.filter((request) => request.assignedOffers?.length).length} hint="Au moins une offre" icon="🏷️" />
        <StatCard label="Offres acceptées" value={state.offers.filter((offer) => offer.status === "accepted").length} hint="Global plateforme" icon="🎯" />
      </div>
      <div className="grid gap-4">
        {visibleRequests.map((request) => {
          const sector = state.sectors.find((item) => item.id === request.sector);
          const companies = state.organizations.filter((org) => org.sector === request.sector && org.provinceAccess.includes(request.province));
          const offers = state.offers.filter((offer) => offer.requestId === request.id);
          const accepted = offers.find((offer) => offer.status === "accepted" || request.acceptedOfferId === offer.id);
          return (
            <Card key={request.id} className="p-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill className={sector?.color}>{sector?.icon} {sector?.label}</Pill>
                    <Pill className="border-slate-200 bg-white text-slate-600">{requestTypeLabel(request.sector, request.type)}</Pill>
                    <Pill className={request.status === "closed" ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-blue-100 bg-blue-50 text-blue-700"}>{request.status}</Pill>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{request.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">Client: {state.user.name} • {request.city}, {request.province}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-4">
                    <Info label="Compagnies éligibles" value={companies.map((org) => org.name).join(" / ") || "Aucune"} />
                    <Info label="Offres reçues" value={offers.length} />
                    <Info label="Offre acceptée" value={accepted?.title || "Non"} />
                    <Info label="Mise à jour" value={request.updatedAt} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 xl:justify-end">
                  <Button variant="ghost" onClick={() => actions.openModal("requestDetails", { requestId: request.id })}>Voir demande</Button>
                  {accepted && <Button variant="ghost" onClick={() => actions.openModal("offerDetails", { offerId: accepted.id })}>Offre acceptée</Button>}
                </div>
              </div>
            </Card>
          );
        })}
        {!visibleRequests.length && <EmptyState text="Aucune demande pour ces filtres." />}
      </div>
    </div>
  );
}

function AdminReports() {
  const { state, actions } = useApp();
  const [companyId, setCompanyId] = useState(state.organizations[0]?.id || "all");
  const [reportType, setReportType] = useState("monthly");
  const selectedOrg = state.organizations.find((org) => org.id === companyId) || state.organizations[0];
  const companyOptions = state.organizations.map((org) => ({ value: org.id, label: org.name }));
  const reportOptions = [
    { value: "monthly", label: "Rapport mensuel" },
    { value: "sales", label: "Rapport ventes & subscriptions" },
    { value: "performance", label: "Rapport performance compagnie" },
    { value: "activity", label: "Rapport activité plateforme" },
  ];
  const companyRequests = state.requests.filter((request) => request.sector === selectedOrg?.sector && selectedOrg?.provinceAccess.includes(request.province));
  const companyOffers = state.offers.filter((offer) => offer.orgId === selectedOrg?.id);
  const acceptedOffers = companyOffers.filter((offer) => offer.status === "accepted");
  const monthlyRevenue = selectedOrg?.plan === "Premium" ? (selectedOrg.sector === "jobs" ? 499 : 299) : 0;
  const reportRows = [
    { label: "Compagnie", value: selectedOrg?.name },
    { label: "Type rapport", value: reportOptions.find((item) => item.value === reportType)?.label },
    { label: "Demandes reçues", value: companyRequests.length },
    { label: "Offres envoyées", value: companyOffers.length },
    { label: "Offres acceptées", value: acceptedOffers.length },
    { label: "Subscription", value: `${selectedOrg?.plan} · ${fmt(monthlyRevenue)}/mois` },
  ];

  return (
    <div>
      <SectionHeader
        title="Rapports"
        subtitle="Générez un rapport admin par compagnie, avec activité, offres, ventes et subscription."
        action={<Button onClick={() => actions.generateReport({ companyId, reportType })}>Générer rapport</Button>}
      />

      <Card className="mb-4 p-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_auto] xl:items-end">
          <FilterDropdown label="Compagnie" items={companyOptions} value={companyId} onChange={setCompanyId} />
          <FilterDropdown label="Type de rapport" items={reportOptions} value={reportType} onChange={setReportType} />
          <Button className="h-10" onClick={() => actions.generateReport({ companyId, reportType })}>Générer</Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Demandes" value={companyRequests.length} hint="Compagnie sélectionnée" icon="📥" />
        <StatCard label="Offres" value={companyOffers.length} hint="Envoyées" icon="🏷️" />
        <StatCard label="Acceptées" value={acceptedOffers.length} hint="Conversion" icon="✅" />
        <StatCard label="Revenu mensuel" value={fmt(monthlyRevenue)} hint={selectedOrg?.plan} icon="💵" />
      </div>

      <Card className="mt-4 overflow-hidden">
        <div className="border-b border-slate-100 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Aperçu du rapport</h3>
          <p className="text-xs text-slate-500">Résumé avant génération ou export.</p>
        </div>
        <div className="grid gap-3 p-4 md:grid-cols-2">
          {reportRows.map((row) => <Info key={row.label} label={row.label} value={row.value} />)}
        </div>
        <div className="border-t border-slate-100 bg-slate-50 p-4">
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="ghost" onClick={() => actions.notify("Prévisualisation ouverte.")}>Prévisualiser</Button>
            <Button variant="ghost" onClick={() => actions.notify("Export PDF simulé.")}>Exporter PDF</Button>
            <Button onClick={() => actions.generateReport({ companyId, reportType })}>Générer rapport</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function AdminSubscriptions() {
  const { state, actions } = useApp();
  const getMonthlyPrice = (org) => org.plan === "Premium" ? (org.sector === "jobs" ? 499 : 299) : 0;
  const subscriptions = state.organizations.map((org) => {
    const monthly = getMonthlyPrice(org);
    const salesTotal = monthly * 12;
    return {
      org,
      monthly,
      salesTotal,
      status: org.status === "verified" ? "Active" : "À vérifier",
      nextInvoice: "2026-06-01",
    };
  });
  const mrr = subscriptions.reduce((sum, item) => sum + item.monthly, 0);
  const arr = mrr * 12;
  const totalSales = subscriptions.reduce((sum, item) => sum + item.salesTotal, 0);
  const paidSubscriptions = subscriptions.filter((item) => item.monthly > 0);
  const planRows = [
    { plan: "Premium", price: 299, count: subscriptions.filter((item) => item.org.plan === "Premium").length, total: subscriptions.filter((item) => item.org.plan === "Premium").reduce((sum, item) => sum + item.monthly * 12, 0), note: "Plan mensuel standard" },
  ];

  return (
    <div>
      <SectionHeader title="Subscriptions & plans" subtitle="Vue admin des abonnements, revenus récurrents et total des ventes par compagnie et par plan." />
      <div className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total ventes" value={fmt(totalSales)} hint="Valeur annuelle estimée des plans actifs" icon="💵" />
        <StatCard label="MRR estimé" value={fmt(mrr)} hint="Revenu mensuel récurrent" icon="💰" />
        <StatCard label="ARR estimé" value={fmt(arr)} hint="Projection annuelle" icon="📈" />
        <StatCard label="Plans payants" value={paidSubscriptions.length} hint={`${subscriptions.length} compagnies au total`} icon="⭐" />
      </div>

      <div className="mb-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Ventes par plan</h3>
              <p className="text-xs text-slate-500">Résumé simple des revenus par type de subscription.</p>
            </div>
            <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">{fmt(totalSales)} total</Pill>
          </div>
          <div className="space-y-3">
            {planRows.map((row) => (
              <div key={row.plan} className="rounded-3xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{row.plan}</p>
                    <p className="mt-1 text-xs text-slate-500">{row.note}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    <Pill className="border-blue-100 bg-blue-50 text-blue-700">{row.count} compagnie{row.count > 1 ? "s" : ""}</Pill>
                    <Pill className="border-orange-100 bg-orange-50 text-orange-700">{fmt(row.price)}/mois</Pill>
                    <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">Ventes {fmt(row.total)}</Pill>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Répartition des ventes</h3>
              <p className="text-xs text-slate-500">Lecture rapide du poids de chaque plan dans le chiffre d’affaires.</p>
            </div>
            <Pill className="border-blue-100 bg-blue-50 text-blue-700">Graphique</Pill>
          </div>
          <div className="space-y-3">
            {planRows.map((row) => {
              const percent = Math.round((row.total / Math.max(totalSales, 1)) * 100);
              return (
                <div key={row.plan} className="rounded-2xl bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{row.plan}</span>
                    <span className="font-semibold text-slate-900">{percent}% · {fmt(row.total)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-[#F58A07]" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-slate-100 bg-white p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Subscriptions par compagnie</h3>
            <p className="text-xs text-slate-500">Plan, facturation, ventes estimées et prochaine facture.</p>
          </div>
          <Pill className="border-blue-100 bg-blue-50 text-blue-700">{subscriptions.length} compagnies</Pill>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Compagnie</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Plan</th>
                <th className="px-4 py-3 font-semibold">Mensuel</th>
                <th className="px-4 py-3 font-semibold">Total ventes</th>
                <th className="px-4 py-3 font-semibold">Prochaine facture</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {subscriptions.map(({ org, monthly, salesTotal, status, nextInvoice }) => {
                const sector = state.sectors.find((item) => item.id === org.sector);
                return (
                  <tr key={org.id} className="transition hover:bg-slate-50/70">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <AvatarBadge label={org.name} />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">{org.name}</p>
                          <p className="truncate text-[11px] text-slate-500">{org.billingEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4"><Pill className={sector?.color}>{sector?.icon} {sector?.label}</Pill></td>
                    <td className="px-4 py-4"><Pill className={org.plan === "Premium" || org.plan === "Enterprise" ? "border-orange-100 bg-orange-50 text-orange-700" : "border-slate-200 bg-slate-50 text-slate-600"}>{org.plan}</Pill></td>
                    <td className="px-4 py-4 font-semibold text-slate-900">{fmt(monthly)}/mois</td>
                    <td className="px-4 py-4 font-semibold text-emerald-700">{fmt(salesTotal)}</td>
                    <td className="px-4 py-4 font-semibold text-slate-700">{nextInvoice}</td>
                    <td className="px-4 py-4"><Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">{status}</Pill></td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => actions.openModal("editOrgProfile")}>Modifier plan</Button>
                        <Button variant="ghost" onClick={() => actions.notify("Facture ouverte.")}>Factures</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AdminAudit() {
  const { state } = useApp();
  return (
    <div>
      <SectionHeader title="Audit logs" subtitle="Historique des actions clés de la plateforme." />
      <Card className="p-4"><DataTable columns={["Actor", "Action", "Target", "Date"]} rows={state.auditLogs.map((l) => [l.actor, l.action, l.target, l.date])} /></Card>
    </div>
  );
}

function AdminSettings() {
  const { actions } = useApp();
  return (
    <div>
      <SectionHeader title="Settings" subtitle="Configuration générale de la plateforme." />
      <Card className="p-4"><div className="grid gap-4 md:grid-cols-2"><Info label="Matching" value="Strict sector/province/domain" /><Info label="Benchmark" value="Anonymous competitors" /><Info label="Compliance" value="Loi 25 / OQLF ready" /><Info label="Fair rotation" value="Enabled" /></div><Button className="mt-4" onClick={() => actions.notify("Settings saved.")}>Save settings</Button></Card>
    </div>
  );
}

function DataTable({ columns, rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{columns.map((c) => <th key={c} className="px-4 py-3 font-medium">{c}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-100 bg-white">{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="px-4 py-3 font-semibold text-slate-700">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function GlobalModal() {
  const { modal, actions, state } = useApp();
  if (!modal) return null;
  const { type, payload } = modal;
  const close = () => actions.closeModal();
  const request = payload?.requestId ? state.requests.find((r) => r.id === payload.requestId) : null;
  const offer = payload?.offerId ? state.offers.find((o) => o.id === payload.offerId) : null;

  const titleMap = {
    createRequest: "Créer une demande",
    serviceFormPreview: "Formulaire du service",
    requestDetails: "Détails de la demande",
    requestConfirmation: "Demande envoyée",
    compareOffers: "Comparer les offres",
    offerDetails: "Détail de l’offre",
    acceptOffer: "Accepter l’offre",
    createOffer: "Créer une offre",
    improveOffer: "Améliorer l’offre",
    appointment: "Rendez-vous",
    availability: "Disponibilités",
    notifications: "Notifications",
    quickCreate: "Action rapide",
    reschedule: "Proposer un autre créneau",
    inviteAgent: "Inviter un agent",
    assignRequest: "Affecter la demande",
    addTeamMember: "Ajouter un membre équipe",
    createCatalogOffer: "Créer une offre compagnie",
    upgradePlan: "Changer de plan",
    generatedReport: "Rapport généré",
    requestPdfExport: "Export PDF demande",
    createPartner: "Ajouter partenaire",
    editPartner: "Update partner",
    messagePartner: "Message partner",
    profilePreview: state.currentRole === "org" ? "Profil organisation" : state.currentRole === "admin" ? "Profil admin" : "Profil client",
    editUserProfile: "Modifier profil client",
    editOrgProfile: "Modifier profil organisation",
    orgProposeAppointment: "Proposer un rendez-vous",
    orgMessage: "Message client",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className={cls("max-h-[90vh] w-full overflow-auto rounded-3xl bg-white shadow-2xl", ["createOffer", "acceptOffer"].includes(type) ? "max-w-6xl" : "max-w-3xl")}>
        <div className="flex items-start justify-between border-b border-slate-100 p-4">
          <div><p className="text-xs font-medium uppercase tracking-[0.2em] text-[#F58A07]">Connectia</p><h3 className="mt-1 text-lg font-semibold text-slate-900">{titleMap[type] || "Action"}</h3></div>
          <button onClick={close} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200">✕</button>
        </div>
        <div className="p-4">
          {type === "createRequest" && <CreateRequestForm initialSector={payload?.sector} />}
          {type === "serviceFormPreview" && <ServiceFormPreview sectorId={payload?.sector} />}
          {type === "requestConfirmation" && <RequestConfirmation payload={payload} />}
          {type === "requestDetails" && request && <RequestDetails request={request} />}
          {type === "compareOffers" && <CompareOffers requestId={payload.requestId} />}
          {type === "offerDetails" && offer && <OfferDetails offer={offer} />}
          {type === "acceptOffer" && offer && <AcceptOfferModal offer={offer} />}
          {type === "createOffer" && request && <CreateOfferMini request={request} />}
          {type === "createOffer" && !request && <EmptyState text="Sélectionnez une demande reçue pour créer une offre." />}
          {type === "improveOffer" && offer && <ImproveOffer offer={offer} />}
          {type === "notifications" && <Notifications />}
          {type === "profilePreview" && <ProfilePreview />}
          {type === "editUserProfile" && <EditUserProfile />}
          {type === "editOrgProfile" && <EditOrgProfile />}
          {type === "orgProposeAppointment" && offer && <OrgProposeAppointmentModal offer={offer} />}
          {type === "orgMessage" && offer && <OrgMessageModal offer={offer} />}
          {type === "quickCreate" && <QuickCreate />}
          {type === "appointment" && <AppointmentModal />}
          {type === "availability" && <AvailabilityModal />}
          {type === "reschedule" && <RescheduleModal payload={payload} />}
          {type === "inviteAgent" && <InviteAgentModal />}
          {type === "assignRequest" && request && <AssignRequestModal request={request} />}
          {type === "upgradePlan" && <UpgradePlanModal />}
          {type === "generatedReport" && <GeneratedReportModal payload={payload} />}
          {type === "requestPdfExport" && <RequestPdfExportModal payload={payload} />}
          {type === "createPartner" && <CreatePartnerForm />}
          {type === "addTeamMember" && <AddTeamMemberForm />}
          {type === "createCatalogOffer" && <CreateCatalogOfferForm />}
          {!["createRequest", "serviceFormPreview", "requestConfirmation", "requestDetails", "compareOffers", "offerDetails", "acceptOffer", "createOffer", "improveOffer", "notifications", "profilePreview", "editUserProfile", "editOrgProfile", "orgProposeAppointment", "orgMessage", "quickCreate", "appointment", "availability", "reschedule", "inviteAgent", "assignRequest", "upgradePlan", "generatedReport", "requestPdfExport", "createPartner", "addTeamMember", "createCatalogOffer"].includes(type) && <GenericAction type={type} payload={payload} />}
        </div>
      </div>
    </div>
  );
}

function RequestConfirmation({ payload = {} }) {
  const { state, actions } = useApp();
  const sector = state.sectors.find((item) => item.id === payload.sector);
  return (
    <div>
      <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-5 text-center ring-1 ring-emerald-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">✓</div>
        <Pill className="mt-4 bg-emerald-50 text-emerald-700">Demande envoyée</Pill>
        <h3 className="mt-4 text-xl font-bold text-slate-900">Votre demande a bien été transmise</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
          Vous allez recevoir des offres comparées pour sélectionner la meilleure offre sur le marché.
        </p>
      </div>

      <Card className="mt-4 p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Info label="Service" value={sector ? `${sector.icon} ${sector.label}` : "Service"} />
          <Info label="Demande" value={payload.title || "Demande envoyée"} />
          <Info label="Prochaine étape" value="Comparer les offres reçues" />
        </div>
      </Card>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-700"><b>1. Réception</b><br />Les professionnels compatibles peuvent répondre à votre demande.</div>
        <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-700"><b>2. Comparaison</b><br />Connectia classe les offres selon prix, qualité, délai et critères.</div>
        <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-700"><b>3. Choix</b><br />Vous choisissez l’offre la plus avantageuse pour vous.</div>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={() => { actions.closeModal(); actions.setMenu("userRequests"); }}>Voir mes demandes</Button>
        <Button onClick={() => { actions.closeModal(); actions.setMenu("userOffers"); }}>Voir les offres</Button>
      </div>
    </div>
  );
}

function CreateRequestForm({ initialSector = "realEstate" }) {
  const { state, actions } = useApp();
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState(initialSector || "realEstate");
  const config = REQUEST_FORM_CONFIG[sector] || REQUEST_FORM_CONFIG.realEstate;
  const selected = state.sectors.find((s) => s.id === sector);
  const [requestType, setRequestType] = useState(config.requestTypes[0]);
  const [title, setTitle] = useState(config.title);
  const [province, setProvince] = useState("Québec");
  const initialBudget = getDefaultBudgetRange(initialSector || "realEstate");
  const [budgetMin, setBudgetMin] = useState(initialBudget.min);
  const [budgetMax, setBudgetMax] = useState(initialBudget.max);
  const [urgency, setUrgency] = useState("30 jours");
  const [fieldValues, setFieldValues] = useState({});
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [customDocName, setCustomDocName] = useState("");
  const valueMode = getRequestValueMode(sector, requestType);
  const hasBudgetRange = valueMode.mode === "range";
  const budgetLabels = getRequestBudgetLabels(sector);

  const midpoint = Math.ceil(config.fields.length / 2);
  const firstFields = config.fields.slice(0, midpoint);
  const secondFields = config.fields.slice(midpoint);

  const changeSector = (id) => {
    const next = REQUEST_FORM_CONFIG[id] || REQUEST_FORM_CONFIG.realEstate;
    setSector(id);
    setRequestType(next.requestTypes[0]);
    setTitle(next.title);
    setFieldValues({});
    const nextBudget = getDefaultBudgetRange(id);
    setBudgetMin(nextBudget.min);
    setBudgetMax(nextBudget.max);
    setUploadedDocs([]);
    setCustomDocName("");
    setStep(1);
  };

  const updateField = (key, value) => setFieldValues((prev) => ({ ...prev, [key]: value }));
  const summaryParts = Object.entries(fieldValues).filter(([key, value]) => value && !key.endsWith("Custom")).map(([key, value]) => {
    const label = config.fields.find((field) => field.key === key)?.label || key;
    return `${label}: ${displayValue(value)}${fieldValues[`${key}Custom`] ? ` (${fieldValues[`${key}Custom`]})` : ""}`;
  });
  const canGoBack = step > 1;
  const canGoNext = step < 3;

  const create = () => actions.createRequest({
    sector,
    type: requestType,
    title,
    province,
    city: fieldValues.city || "Montréal",
    budgetMin: hasBudgetRange ? budgetMin : 0,
    budgetMax: hasBudgetRange ? budgetMax : 0,
    currency: "CAD",
    urgency,
    summary: `${requestType} — ${summaryParts.length ? summaryParts.join(" • ") : selected?.description}`,
    details: fieldValues,
    documents: Array.from(new Set([...config.documents, ...uploadedDocs.map((doc) => doc.name)])).map((name, index) => ({
      id: `doc${Date.now()}${index}`,
      name,
      status: uploadedDocs.some((doc) => doc.name === name) ? "uploaded" : "missing",
      fileName: uploadedDocs.find((doc) => doc.name === name)?.fileName || "",
    })),
  });

  const isVisibleField = (field) => {
    if (!field.conditional) return true;
    const watchedValue = field.conditional.key === "requestType" ? requestType : fieldValues[field.conditional.key];
    if (field.conditional.includes) return field.conditional.includes.includes(watchedValue);
    if (field.conditional.equals) return watchedValue === field.conditional.equals;
    return Boolean(watchedValue);
  };

  const addUploadedDoc = (name, fileName = "") => {
    const cleanName = String(name || "").trim();
    if (!cleanName) return;
    setUploadedDocs((prev) => {
      const exists = prev.some((doc) => doc.name === cleanName);
      return exists ? prev.map((doc) => doc.name === cleanName ? { ...doc, fileName: fileName || doc.fileName || `${cleanName}.pdf` } : doc) : [...prev, { name: cleanName, fileName: fileName || `${cleanName}.pdf` }];
    });
    setCustomDocName("");
  };
  const removeUploadedDoc = (name) => setUploadedDocs((prev) => prev.filter((doc) => doc.name !== name));

  const renderFieldControl = (field) => {
    const value = fieldValues[field.key] || "";
    if (field.type === "date") {
      return <input type="date" value={value} onChange={(e) => updateField(field.key, e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />;
    }
    if (field.type === "text") {
      return <input value={value} onChange={(e) => updateField(field.key, e.target.value)} placeholder={field.placeholder || ""} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />;
    }
    if (field.type === "combo") {
      const customValue = fieldValues[field.customKey] || "";
      const showCustom = /saisir|autre/i.test(value || "");
      return (
        <>
          <select value={value} onChange={(e) => updateField(field.key, e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">
            <option value="">Sélectionner</option>
            {field.options.map((option) => <option key={option}>{option}</option>)}
          </select>
          {showCustom && <input value={customValue} onChange={(e) => updateField(field.customKey, e.target.value)} placeholder={field.customPlaceholder || "Préciser"} className="mt-2 w-full rounded-xl border border-orange-200 px-3 py-2 outline-none focus:border-[#F58A07]" />}
        </>
      );
    }
    return (
      <select value={value} onChange={(e) => updateField(field.key, e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">
        <option value="">Sélectionner</option>
        {field.options.map((option) => <option key={option}>{option}</option>)}
      </select>
    );
  };

  const FieldGrid = ({ fields }) => (
    <div className="grid gap-3 md:grid-cols-2">
      {fields.filter(isVisibleField).map((field) => (
        <label key={field.key} className="text-xs font-semibold text-slate-700">{field.label}
          {renderFieldControl(field)}
        </label>
      ))}
    </div>
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((item) => (
            <span key={item} className={cls("inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold", step === item ? "bg-[#F58A07] text-white" : step > item ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400")}>{item}</span>
          ))}
        </div>
        <Pill className={selected?.color}>{selected?.icon} {selected?.label}</Pill>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {state.sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => changeSector(s.id)}
                className={cls(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition",
                  sector === s.id
                    ? "border-[#F58A07] bg-orange-50 text-[#F58A07]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          <Card className="p-4">
            <h4 className="mb-3 font-semibold text-slate-900">Votre besoin</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-xs font-semibold text-slate-700">Type de demande
                {config.requestTypes.length === 1 ? (
                  <div className="mt-2 rounded-xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-200">{config.requestTypes[0]}</div>
                ) : (
                  <select value={requestType} onChange={(e) => setRequestType(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none">
                    {config.requestTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                )}
              </label>
              <label className="text-xs font-semibold text-slate-700">Titre
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none" />
              </label>
              <label className="text-xs font-semibold text-slate-700">Province cible
                <select value={province} onChange={(e) => setProvince(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none">
                  {CANADA_PROVINCES.map((provinceName) => <option key={provinceName}>{provinceName}</option>) }
                </select>
              </label>
              <label className="text-xs font-semibold text-slate-700">Urgence
                <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none">
                  <option>Cette semaine</option><option>30 jours</option><option>2 mois</option><option>Flexible</option>
                </select>
              </label>
{hasBudgetRange && (
                <>
                  <label className="text-xs font-semibold text-slate-700">{budgetLabels.min}
                    <input value={budgetMin} onChange={(e) => setBudgetMin(Number(e.target.value))} type="number" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none" />
                  </label>
                  <label className="text-xs font-semibold text-slate-700">{budgetLabels.max}
                    <input value={budgetMax} onChange={(e) => setBudgetMax(Number(e.target.value))} type="number" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none" />
                  </label>
                </>
              )}
            </div>
          </Card>
        </div>
      )}

      {step === 2 && (
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-slate-900">Critères principaux</h4>
            <Pill className={selected?.color}>{firstFields.length} champs</Pill>
          </div>
          <FieldGrid fields={firstFields} />
        </Card>
      )}

      {step === 3 && (
        <div className="space-y-4">
          {secondFields.length > 0 && (
            <Card className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-semibold text-slate-900">Préférences complémentaires</h4>
                <Pill className={selected?.color}>{secondFields.length} champs</Pill>
              </div>
              <FieldGrid fields={secondFields} />
            </Card>
          )}

          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h4 className="font-semibold text-slate-900">Documents à ajouter</h4>
                <p className="mt-1 text-xs text-slate-500">Ajoutez les documents disponibles maintenant. Les autres resteront marqués comme manquants.</p>
              </div>
              <Pill className="bg-blue-50 text-blue-700">{uploadedDocs.length} ajouté{uploadedDocs.length > 1 ? "s" : ""}</Pill>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {config.documents.map((doc) => {
                const uploaded = uploadedDocs.find((item) => item.name === doc);
                return (
                  <div key={doc} className={cls("rounded-2xl p-3 ring-1", uploaded ? "bg-emerald-50 ring-emerald-100" : "bg-slate-50 ring-slate-100")}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900">{doc}</p>
                        <p className={cls("mt-1 text-[11px] font-semibold", uploaded ? "text-emerald-700" : "text-slate-400")}>{uploaded ? uploaded.fileName : "Non ajouté"}</p>
                      </div>
                      {uploaded ? <button type="button" onClick={() => removeUploadedDoc(doc)} className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-red-500 shadow-sm">Retirer</button> : null}
                    </div>
                    <label className="mt-3 flex cursor-pointer items-center justify-center rounded-xl bg-white px-3 py-2 text-[11px] font-bold text-[#F58A07] shadow-sm ring-1 ring-orange-100 hover:bg-orange-50">
                      {uploaded ? "Remplacer" : "Uploader"}
                      <input type="file" className="hidden" onChange={(event) => addUploadedDoc(doc, event.target.files?.[0]?.name)} />
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-800">Autre document</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
                <input value={customDocName} onChange={(event) => setCustomDocName(event.target.value)} placeholder="Ex: Certificat, portfolio, lettre explicative" className="rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#F58A07]" />
                <Button variant="ghost" onClick={() => addUploadedDoc(customDocName)}>Ajouter</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="mt-4 flex justify-between gap-2 border-t border-slate-100 pt-4">
        <div>{canGoBack && <Button variant="ghost" onClick={() => setStep(step - 1)}>← Retour étape précédente</Button>}</div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
          {canGoNext ? <Button onClick={() => setStep(step + 1)}>Continuer</Button> : <Button onClick={create}>Créer la demande</Button>}
        </div>
      </div>
    </div>
  );
}

function ServiceFormPreview({ sectorId = "realEstate" }) {
  const { state, actions } = useApp();
  const sector = state.sectors.find((s) => s.id === sectorId) || state.sectors[1];
  const config = REQUEST_FORM_CONFIG[sector.id] || REQUEST_FORM_CONFIG.realEstate;
  return (
    <div>
      <Pill className={sector.color}>{sector.icon} {sector.label}</Pill>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{config.title}</h3>
      <p className="mt-2 text-xs text-slate-500">Aperçu de la demande avant de commencer.</p>
      <div className="mt-4">
        <p className="text-xs font-semibold text-slate-800">Ce que vous pouvez demander</p>
        <div className="mt-2 flex flex-wrap gap-2">{config.requestTypes.map((type) => <Pill key={type} className="border-slate-200 bg-slate-50 text-slate-600">{type}</Pill>)}</div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {config.fields.map((field) => <Info key={field.key} label={field.label} value={(field.options || []).join(" / ") || field.placeholder || "Saisie libre"} />)}
      </div>
      <div className="mt-4 flex justify-end"><Button onClick={() => actions.openModal("createRequest", { sector: sector.id })}>Commencer</Button></div>
    </div>
  );
}

function RequestDetails({ request }) {
  const { state } = useApp();
  const sector = state.sectors.find((s) => s.id === request.sector);
  const config = REQUEST_FORM_CONFIG[request.sector];
  const detailEntries = Object.entries(request.details || {});
  const orderedDetails = [
    ...(config?.fields || [])
      .filter((field) => Object.prototype.hasOwnProperty.call(request.details || {}, field.key))
      .map((field) => [field.key, request.details[field.key]]),
    ...detailEntries.filter(([key]) => !(config?.fields || []).some((field) => field.key === key)),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Pill className={sector?.color}>{sector?.icon} {sector?.label}</Pill>
        <Pill className="border-slate-200 bg-slate-50 text-slate-600">{requestTypeLabel(request.sector, request.type)}</Pill>
        <Pill className="border-slate-200 bg-white text-slate-600">{request.status}</Pill>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{request.title}</h3>
      <p className="mt-2 text-xs text-slate-500">{request.summary}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Info label="Type de demande" value={requestTypeLabel(request.sector, request.type)} />
        <Info label="Province cible" value={request.province} />
        <Info label="Ville" value={request.city || "Non renseignée"} />
        <Info label="Urgence" value={request.urgency} />
        <Info label={valueLabelForSector(request.sector, "request", requestTypeLabel(request.sector, request.type))} value={requestMainValue(request)} />
        <Info label="Dernière mise à jour" value={request.updatedAt} />
      </div>

      <h4 className="mt-4 font-semibold text-slate-900">Informations de la demande</h4>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {orderedDetails.length ? orderedDetails.map(([key, value]) => (
          <Info key={key} label={fieldLabelForRequest(request, key)} value={displayValue(value)} />
        )) : <div className="rounded-2xl bg-slate-50 p-4 text-xs font-semibold text-slate-400">Aucun détail supplémentaire.</div>}
      </div>

      <h4 className="mt-4 font-semibold text-slate-900">Documents liés à cette demande</h4>
      <div className="mt-3 space-y-2">
        {request.documents.map((d) => (
          <div key={d.id} className="flex justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs">
            <span>{d.name}</span>
            <b>{d.status === "uploaded" ? "Ajouté" : "Manquant"}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareOffers({ requestId }) {
  const { state, actions } = useApp();
  const request = state.requests.find((r) => r.id === requestId);
  const offers = state.offers.filter((o) => o.requestId === requestId).sort((a, b) => b.score - a.score);
  if (!request) return <div className="rounded-2xl bg-slate-50 p-4 text-xs font-semibold text-slate-500">Demande introuvable.</div>;
  return (
    <div>
      <p className="text-xs text-slate-500">Comparaison pour: <b>{request?.title}</b></p>
      <div className="mt-4 space-y-3">
        {offers.map((o, idx) => <div key={o.id} className={cls("rounded-2xl border p-4", idx === 0 ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white")}><div className="flex justify-between"><div><p className="font-semibold text-slate-900">{o.title}</p><p className="text-xs text-slate-500">{o.label}</p></div><div className="text-right"><p className="text-xl font-semibold text-slate-900">{o.score}</p><p className="text-xs text-slate-500">score</p></div></div><div className="mt-3 grid gap-2 md:grid-cols-3"><Info label={valueLabelForSector(o.sector, "offer")} value={fmt(o.price, o.currency)} /><Info label={comparisonLabelForSector(o.sector)} value={fmt(o.benchmark.marketAvg, o.currency)} /><Info label="Expire" value={o.expiresAt} /></div><div className="mt-3 flex gap-2"><Button onClick={() => actions.acceptOffer(o.id)}>Accepter</Button><Button variant="ghost" onClick={() => actions.saveOffer(o.id)}>Sauvegarder</Button></div></div>)}
      </div>
    </div>
  );
}

function OfferDetails({ offer }) {
  const { state, actions } = useApp();
  const isUserView = state.currentRole === ROLES.USER;
  const org = state.organizations.find((o) => o.id === offer.orgId);
  const request = state.requests.find((r) => r.id === offer.requestId);
  const sector = state.sectors.find((s) => s.id === offer.sector);
  const detailEntries = Object.entries(offer.details || {});

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Pill className={sector?.color}>{sector?.icon} {sector?.label}</Pill>
        <Pill className="border-emerald-200 bg-emerald-50 text-emerald-700">Score {offer.score}/100</Pill>
        <Pill className="border-slate-200 bg-slate-50 text-slate-600">{offer.label}</Pill>
        <Pill className="border-slate-200 bg-white text-slate-600">{offer.status}</Pill>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{offer.title}</h3>
      <p className="mt-2 text-xs text-slate-500">{org?.name} • liée à: {request?.title}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Info label="Organisation" value={org?.name || "Non renseignée"} />
        <Info label="Demande liée" value={request?.title || "Non renseignée"} />
        <Info label={valueLabelForSector(offer.sector, "offer")} value={fmt(offer.price, offer.currency)} />
        <Info label={comparisonLabelForSector(offer.sector)} value={fmt(offer.benchmark.marketAvg, offer.currency)} />
        <Info label="Comparaison" value={offer.benchmark.comparedToUserOffers} />
        <Info label="Date de réception" value={offer.createdAt} />
        <Info label="Expiration" value={offer.expiresAt} />
        <Info label="Statut" value={offer.status} />
      </div>

      <OfferAppointmentTimeline offer={offer} />

      <h4 className="mt-4 font-semibold text-slate-900">Informations de l’offre</h4>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {detailEntries.length ? detailEntries.map(([key, value]) => (
          <Info key={key} label={fieldLabelForOffer(offer, key)} value={displayValue(value)} />
        )) : <div className="rounded-2xl bg-slate-50 p-4 text-xs font-semibold text-slate-400">Aucun détail supplémentaire.</div>}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-emerald-50 p-4 text-xs text-emerald-800">
          <b>Points forts</b>
          <ul className="mt-2 list-disc pl-4">{offer.pros.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
        <div className="rounded-2xl bg-orange-50 p-4 text-xs text-orange-800">
          <b>À surveiller</b>
          <ul className="mt-2 list-disc pl-4">{offer.cons.length ? offer.cons.map((c) => <li key={c}>{c}</li>) : <li>Aucun point bloquant</li>}</ul>
        </div>
      </div>

      {isUserView && (
        <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
          <Button variant="ghost" onClick={() => actions.saveOffer(offer.id)}>Sauvegarder</Button>
          <Button variant="success" onClick={() => actions.acceptOffer(offer.id)}>Accepter l’offre</Button>
        </div>
      )}
    </div>
  );
}


function AssignRequestModal({ request }) {
  const { state, actions } = useApp();
  const { org } = currentOrgContext(state);
  const [memberId, setMemberId] = useState(request.assignedTo || state.currentOrgUserId || org.team?.[0]?.id || "");
  const activeMembers = (org.team || []).filter((member) => member.status !== "disabled");
  const selectedMember = activeMembers.find((member) => member.id === memberId);
  const limit = org.plan === "Premium" ? Math.max(5, Number(org.employeeSeats || 5)) : 5;
  return (
    <div>
      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">{request.title}</h4>
            <p className="mt-1 text-xs text-slate-500">{org.name} • {activeMembers.length}/{limit} accès employés</p>
          </div>
          <Pill className={org.plan === "Premium" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}>{org.plan}</Pill>
        </div>
        <div className="mt-4 grid gap-3">
          {activeMembers.map((member) => (
            <button key={member.id} onClick={() => setMemberId(member.id)} className={cls("rounded-3xl border p-4 text-left transition", memberId === member.id ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-white hover:border-orange-100")}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <AvatarBadge label={member.name} src={member.photoUrl} className="h-11 w-11 rounded-2xl" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role} • {member.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <Pill className="bg-slate-50 text-slate-600">{member.requests} demandes</Pill>
                  <Pill className="bg-emerald-50 text-emerald-700">{member.conversion}% closing</Pill>
                  {request.assignedTo === member.id && <Pill className="bg-orange-100 text-orange-700">Actuel</Pill>}
                </div>
              </div>
            </button>
          ))}
        </div>
        {!activeMembers.length && <EmptyState text="Aucun employé actif dans cette compagnie." />}
        {selectedMember && <div className="mt-4 grid gap-3 md:grid-cols-3"><Info label="Responsable" value={selectedMember.name} /><Info label="Rôle" value={selectedMember.role} /><Info label="Email" value={selectedMember.email} /></div>}
      </Card>
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
        <Button disabled={!memberId} onClick={() => actions.assignRequestTo(request.id, memberId)}>Affecter</Button>
      </div>
    </div>
  );
}

function AcceptOfferModal({ offer }) {
  const { state, actions } = useApp();
  const org = state.organizations.find((o) => o.id === offer.orgId);
  const request = state.requests.find((r) => r.id === offer.requestId);
  const suggested = offer.proposedAppointment;
  const [responseType, setResponseType] = useState(suggested ? "confirmSuggested" : "chooseProfessionalSlot");
  const [form, setForm] = useState({
    method: suggested?.mode || "Appel téléphonique",
    slot: suggested?.slot || "",
    day: suggested?.day || "",
    date: suggested?.day || "2026-05-24",
    time: suggested?.time || "18:00",
    phone: state.user.phone,
    email: state.user.email,
    note: "Je suis disponible pour être contacté(e) au créneau sélectionné.",
  });
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <div className="rounded-3xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
        <div className="flex flex-wrap items-center gap-2">
          <Pill className="border-emerald-200 bg-emerald-100 text-emerald-800">Offre sélectionnée</Pill>
          <Pill className="border-slate-200 bg-white text-slate-600">Score {offer.score}/100</Pill>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">{offer.title}</h3>
        <p className="mt-1 text-xs text-slate-600">{org?.name} • {request?.title}</p>
      </div>

      <OfferAppointmentTimeline offer={offer} compact />

      {suggested && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <button type="button" onClick={() => {
            const parsed = parseSlot(suggested.slot);
            setResponseType("confirmSuggested");
            setForm((prev) => ({ ...prev, slot: suggested.slot, day: parsed.day, date: parsed.day, time: parsed.time, method: suggested.mode, note: `Je confirme le créneau proposé: ${suggested.slot}.` }));
          }} className={cls("rounded-3xl border p-4 text-left transition", responseType === "confirmSuggested" ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50")}>
            <p className="font-semibold text-slate-900">Confirmer le créneau proposé</p>
            <p className="mt-1 text-xs text-slate-500">{suggested.slot} • {suggested.mode}</p>
          </button>
          <button type="button" onClick={() => setResponseType("chooseProfessionalSlot")} className={cls("rounded-3xl border p-4 text-left transition", responseType === "chooseProfessionalSlot" ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50")}>
            <p className="font-semibold text-slate-900">Proposer un autre créneau</p>
            <p className="mt-1 text-xs text-slate-500">Choisir un créneau vert dans le calendrier du professionnel.</p>
          </button>
        </div>
      )}

      {responseType === "chooseProfessionalSlot" && (
        <div className="mt-4">
          <SharedAvailabilityPanel
            request={request}
            org={org}
            mode="user"
            selectedSlot={form.slot}
            onSelect={(slot) => {
              const parsed = parseSlot(slot);
              setForm((prev) => ({ ...prev, slot, day: parsed.day, date: parsed.day, time: parsed.time || prev.time, note: `Je propose cet autre créneau selon vos disponibilités: ${slot}.` }));
            }}
            titleOverride="Disponibilités du professionnel"
            helperOverride="Sélectionnez un créneau vert disponible chez le professionnel pour proposer une alternative."
          />
        </div>
      )}

      <div className="mt-4 rounded-3xl bg-white p-4 ring-1 ring-slate-200">
        <h4 className="font-semibold text-slate-900">Contact et message pour cette offre</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">Date souhaitée
            <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
          </label>
          <label className="text-xs font-semibold text-slate-700">Heure souhaitée
            <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
          </label>
          <label className="text-xs font-semibold text-slate-700 md:col-span-2">Moyen de contact pour cette offre
            <select value={form.method} onChange={(e) => update("method", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">
              <option>Appel téléphonique</option>
              <option>Courriel</option>
              <option>Message in-app</option>
              <option>Visioconférence</option>
              <option>WhatsApp</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-700">Téléphone à utiliser
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
          </label>
          <label className="text-xs font-semibold text-slate-700">Email à utiliser
            <input value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
          </label>
          <label className="text-xs font-semibold text-slate-700 md:col-span-2">Message pour le professionnel
            <textarea value={form.note} onChange={(e) => update("note", e.target.value)} className="mt-2 min-h-[90px] w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
          </label>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
        Ces informations sont liées uniquement à cette offre acceptée. Elles ne changent pas vos préférences de profil.
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
        <Button variant="success" disabled={!form.slot} onClick={() => actions.confirmAcceptOffer(offer.id, { ...form, responseType })}>Confirmer l’acceptation</Button>
      </div>
    </div>
  );
}

function CreateOfferMini({ request }) {
  const { state, actions } = useApp();
  if (!request) return <div className="rounded-2xl bg-slate-50 p-4 text-xs font-semibold text-slate-500">Sélectionnez une demande valide.</div>;
  const sector = request.sector;
  const config = getOfferFormConfig(sector);
  const [values, setValues] = useState(defaultOfferValues(sector, request));
  const [message, setMessage] = useState("Bonjour, voici notre offre détaillée selon votre demande.");
  const [suggestedSlot, setSuggestedSlot] = useState("");
  const [appointmentMode, setAppointmentMode] = useState("Appel téléphonique");
  const priceKey = getOfferPriceKey(sector);
  const price = Number(values[priceKey] || request?.budgetMax || 0);
  const docsRequired = Array.isArray(values.docsRequired) ? values.docsRequired : [];
  const delay = values.interviewDelay || values.analysisDelay || values.activation || values.approvalDelay || values.availability || "24h";
  const score = calculateOfferScore({ request, sector, price, docsRequired, delay, values });
  const update = (key, value) => setValues((prev) => ({ ...prev, [key]: value }));
  const submit = () => {
    const parsed = parseSlot(suggestedSlot);
    actions.createOffer(request.id, {
      title: buildOfferTitle(request, sector, values),
      price,
      currency: request.currency,
      score,
      label: score >= 85 ? "Forte" : score >= 70 ? "Correcte" : "À améliorer",
      details: { ...values, price, docsRequired, delay },
      pros: config.pros,
      cons: score < 75 ? ["Améliorer le positionnement ou réduire les documents demandés"] : [],
      benchmark: { marketAvg: request?.sector !== "jobs" && request?.budgetMax ? Math.round(request.budgetMax * 0.97) : price, comparedToUserOffers: score >= 85 ? "Position compétitive" : "Peut être améliorée" },
      message,
      proposedAppointment: suggestedSlot ? {
        slot: suggestedSlot,
        day: parsed.day,
        time: parsed.time,
        mode: appointmentMode,
        note: `Créneau suggéré selon les disponibilités du client: ${suggestedSlot}.`,
      } : null,
    });
  };

  return (
    <div>
      <div className="rounded-3xl bg-white p-4 ring-1 ring-[#E7E2DA]">
        <Pill className="border-blue-100 bg-blue-50 text-blue-700">{config.title}</Pill>
        <h3 className="mt-3 text-base font-semibold text-slate-900">{request.title}</h3>
        <p className="mt-1 text-xs text-slate-500">Formulaire d’offre adapté au domaine.</p>
      </div>
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <Card className="p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-slate-900">Informations de l’offre</h3>
                <p className="mt-1 text-xs text-slate-500">Chaque offre contient toujours une valeur principale.</p>
              </div>
              <Pill className="border-emerald-100 bg-emerald-50 text-emerald-700">{config.primaryLabel}: {fmt(price, request?.currency || "CAD")}</Pill>
            </div>
            <OfferDynamicFields config={config} values={values} update={update} />
          </Card>
          {config.photoSupport && <RealEstatePhotosUploader photos={values.photos || []} onChange={(photos) => update("photos", photos)} tips={config.photoTips} />}
          <SharedAvailabilityPanel
            request={request}
            org={state.organizations[0]}
            mode="pro"
            compact
            selectedSlot={suggestedSlot}
            onSelect={setSuggestedSlot}
            titleOverride="Disponibilités du client"
            helperOverride="Choisissez un créneau vert pour le suggérer avec l’offre. Rouge = client non disponible."
          />
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-slate-900">Créneau suggéré avec l’offre</h3>
            <p className="mt-1 text-xs text-slate-500">Ce créneau sera affiché dans le calendrier de l’offre côté client.</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <Info label="Créneau client" value={suggestedSlot || "Sélectionner un créneau vert"} />
              <label className="text-xs font-semibold text-slate-700">Mode proposé
                <select value={appointmentMode} onChange={(e) => setAppointmentMode(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">
                  <option>Appel téléphonique</option>
                  <option>Visioconférence</option>
                  <option>Visite en personne</option>
                  <option>Message in-app</option>
                </select>
              </label>
            </div>
          </Card>

      <Card className="p-4">
            <label className="text-xs font-semibold text-slate-700">Message au client
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 min-h-[100px] w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
            </label>
          </Card>
        </div>
        <div className="space-y-4">
          <OfferScorePanel score={score} request={request} config={config} values={values} price={price} docsRequired={docsRequired} delay={delay} />
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-slate-900">Résumé avant envoi</h3>
            <div className="mt-3 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Offre</span><b>{config.title}</b></div>
              <div className="flex justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Valeur</span><b>{fmt(price, request?.currency || "CAD")}</b></div>
              <div className="flex justify-between rounded-xl bg-slate-50 px-3 py-2"><span>Documents</span><b>{docsRequired.length}</b></div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4"><Button variant="ghost" onClick={actions.closeModal}>Annuler</Button><Button disabled={!suggestedSlot} onClick={submit}>Envoyer avec créneau</Button></div>
    </div>
  );
}

function ImproveOffer({ offer }) {
  const { actions } = useApp();
  return (
    <div>
      <h3 className="text-base font-semibold text-slate-900">{offer.title}</h3>
      <p className="mt-2 text-xs text-slate-500">Score actuel: {offer.score}/100</p>
      <div className="mt-4 space-y-2 text-xs text-slate-700"><p>✓ Réduire les documents demandés peut augmenter la conversion.</p><p>✓ Ajouter un délai clair peut améliorer la confiance.</p><p>✓ Une valeur sous {fmt(offer.benchmark.marketAvg, offer.currency)} serait plus compétitive.</p></div>
      <div className="mt-4 flex justify-end"><Button onClick={() => actions.notify("Suggestions appliquées au brouillon.")}>Appliquer suggestions</Button></div>
    </div>
  );
}

function Notifications() {
  const { state, actions } = useApp();
  return (
    <div className="space-y-2">
      {state.notifications.map((n) => (
        <button key={n.id} onClick={() => actions.openUserOffers("req1")} className="w-full rounded-xl bg-slate-50 px-3 py-3 text-left text-xs font-semibold text-slate-700 hover:bg-orange-50">
          {n.unread ? "🔴" : "⚪"} {n.text}
        </button>
      ))}
    </div>
  );
}

function ProfilePreview() {
  const { state, actions } = useApp();
  const org = state.organizations[0];
  const isOrg = state.currentRole === "org";
  const isAdmin = state.currentRole === "admin";

  if (isOrg) {
    const sector = state.sectors.find((s) => s.id === org.sector);
    return (
      <div>
        <div className="flex flex-col gap-4 rounded-3xl bg-[#062238] p-5 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-lg font-semibold text-[#062238]">IP</div>
            <div>
              <p className="text-lg font-semibold">{org.name}</p>
              <p className="text-xs text-white/65">{sector?.label} • {org.city}</p>
              <div className="mt-2 flex flex-wrap gap-2"><Pill className="border-white/10 bg-white/10 text-white">{org.plan}</Pill><Pill className="border-white/10 bg-white/10 text-white">⭐ {org.rating}</Pill><Pill className="border-white/10 bg-white/10 text-white">{org.status}</Pill></div>
            </div>
          </div>
          <Button variant="primary" onClick={() => actions.openModal("editOrgProfile")}>Modifier</Button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Info label="Contact principal" value={org.contactPerson} />
          <Info label="Email" value={org.email} />
          <Info label="Téléphone" value={org.phone} />
          <Info label="Site web" value={org.website} />
          <Info label="Secteur" value={sector?.label || org.sector} />
          <Info label="Domaines" value={org.domains.join(" / ")} />
          <Info label="Provinces couvertes" value={org.provinceAccess.join(" / ")} />
          <Info label="Politique réponse" value={org.responsePolicy} />
          <Info label="Vérifié le" value={org.verifiedAt} />
          <Info label="Email facturation" value={org.billingEmail} />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <StatCard label="Demandes reçues" value={org.stats.received} hint="Total" icon="📥" />
          <StatCard label="En cours" value={org.stats.inProgress} hint="À traiter" icon="⚙️" />
          <StatCard label="Offres" value={org.stats.offers} hint={`${org.stats.accepted} acceptées`} icon="📤" />
          <StatCard label="Délai moyen" value={`${org.stats.avgResponseHours}h`} hint="Réponse" icon="⏱️" />
        </div>

        <Card className="mt-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-semibold text-slate-900">Équipe</h4>
            <Button variant="ghost" onClick={() => actions.openModal("addTeamMember")}>Ajouter membre</Button>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {org.team.map((member) => <div key={member.id} className="rounded-2xl bg-slate-50 p-3"><p className="font-semibold text-slate-900">{member.name}</p><p className="text-xs text-slate-500">{member.role} • {member.requests} demandes • {member.conversion}% conversion</p></div>)}
          </div>
        </Card>

        <Card className="mt-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-slate-900">Offres créées par la compagnie</h4>
              <p className="mt-1 text-xs text-slate-500">Ces offres modèles sont utilisées par le matching automatique lorsqu’une demande est reçue.</p>
            </div>
            <Button variant="ghost" onClick={() => actions.openModal("createCatalogOffer")}>Créer offre</Button>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {(org.offerTemplates || []).map((template) => (
              <div key={template.id} className="rounded-2xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-900">{template.title}</p>
                <p className="mt-1 text-xs text-slate-500">{template.type} • {fmt(template.price)}</p>
              </div>
            ))}
            {!(org.offerTemplates || []).length && <EmptyState text="Aucune offre modèle créée." />}
          </div>
        </Card>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div>
        <div className="flex items-center gap-4 rounded-3xl bg-[#062238] p-5 text-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-lg font-semibold text-[#062238]">AD</div>
          <div><p className="text-lg font-semibold">Platform Admin</p><p className="text-xs text-white/65">Supervision marketplace • Accès complet</p></div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Info label="Rôle" value="Admin plateforme" />
          <Info label="Accès" value="Utilisateurs, partenaires, demandes, offres, facturation" />
          <Info label="Statut" value="Actif" />
          <Info label="Dernière activité" value="Aujourd’hui" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl bg-[#062238] p-5 text-white md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <AvatarBadge label={state.user.name} src={state.user.photoUrl} className="h-16 w-16 rounded-full ring-2 ring-white/30 shadow-none" />
          <div>
            <p className="text-lg font-semibold">{state.user.name}</p>
            <p className="text-xs text-white/65">{state.user.city}, {state.user.province} • {state.user.identityStatus}</p>
            <div className="mt-2 flex flex-wrap gap-2"><Pill className="border-white/10 bg-white/10 text-white">{state.user.accountStatus}</Pill><Pill className="border-white/10 bg-white/10 text-white">Profil {state.user.profileCompletion}%</Pill></div>
          </div>
        </div>
        <Button variant="primary" onClick={() => actions.openModal("editUserProfile")}>Modifier</Button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Info label="Email" value={state.user.email} />
        <Info label="Téléphone" value={state.user.phone} />
        <Info label="Ville" value={state.user.city} />
        <Info label="Province" value={state.user.province} />
        <Info label="Langues" value={state.user.language} />
        <Info label="Contact préféré" value={state.user.preferredContact} />
        <Info label="Membre depuis" value={state.user.memberSince} />
        <Info label="Statut identité" value={state.user.identityStatus} />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <StatCard label="Demandes" value={state.requests.length} hint="Tous secteurs" icon="📌" />
        <StatCard label="Offres reçues" value={state.offers.length} hint="Comparables" icon="🏷️" />
        <StatCard label="Offres sauvées" value={state.user.savedOffers.length} hint="À revoir" icon="⭐" />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Card className="p-4"><h4 className="font-semibold text-slate-900">Services préférés</h4><div className="mt-3 flex flex-wrap gap-2">{state.user.preferredSectors.map((item) => <Pill key={item} className="border-slate-200 bg-slate-50 text-slate-600">{item}</Pill>)}</div></Card>
        <Card className="p-4"><h4 className="font-semibold text-slate-900">Disponibilités par demande</h4><p className="mt-1 text-xs text-slate-500">Le client choisira date et heure dans chaque demande ou au moment d’accepter une offre.</p><div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">📅 Calendrier lié à chaque demande</div></Card>
      </div>
    </div>
  );
}

function AvailabilityEditor({ value = [], onChange, title = "Calendrier de disponibilité", subtitle = "Définissez vos créneaux disponibles. Les créneaux verts seront visibles par les professionnels lorsqu’ils créent une offre.", showUnavailable = true }) {
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const shortDays = { Lundi: "Lun", Mardi: "Mar", Mercredi: "Mer", Jeudi: "Jeu", Vendredi: "Ven", Samedi: "Sam" };
  const times = ["09:00", "10:00", "11:00", "12:30", "14:30", "16:00", "18:00"];
  const selected = new Set(value || []);
  const toggle = (slot) => {
    const next = selected.has(slot) ? (value || []).filter((item) => item !== slot) : [...(value || []), slot];
    onChange(next);
  };

  return (
    <div className="rounded-3xl bg-white p-4 ring-1 ring-slate-200">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="font-semibold text-slate-900">{title}</h4>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Disponible</span>
          {showUnavailable && <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-700"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />Non disponible</span>}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <div className="grid min-w-[620px]" style={{ gridTemplateColumns: `70px repeat(${days.length}, minmax(80px, 1fr))` }}>
          <div className="bg-slate-50 px-2 py-2 text-[9px] font-semibold uppercase tracking-wide text-slate-400">Heure</div>
          {days.map((day) => <div key={day} className="bg-slate-50 px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-wide text-slate-400">{shortDays[day]}</div>)}
          {times.map((time) => (
            <React.Fragment key={time}>
              <div className="border-t border-slate-100 bg-slate-50/70 px-2 py-2 text-[11px] font-semibold text-slate-600">{time}</div>
              {days.map((day) => {
                const slot = `${day} ${time}`;
                const active = selected.has(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggle(slot)}
                    className={cls(
                      "min-h-[34px] border-t border-l border-slate-100 px-1.5 py-1 text-[10px] font-semibold transition",
                      active ? "bg-emerald-500 text-white hover:bg-emerald-600" : showUnavailable ? "bg-red-50 text-red-300 hover:bg-red-100 hover:text-red-500" : "bg-slate-50 text-slate-300 hover:bg-emerald-50 hover:text-emerald-600"
                    )}
                  >
                    {active ? "Dispo" : showUnavailable ? "—" : "+"}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-slate-50 px-3 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Créneaux sélectionnés</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(value || []).length ? (value || []).map((slot) => <Pill key={slot} className="border-emerald-200 bg-emerald-50 text-emerald-700">📅 {slot}</Pill>) : <span className="text-xs font-semibold text-slate-400">Aucun créneau disponible sélectionné.</span>}
        </div>
      </div>
    </div>
  );
}

function CreatePartnerForm() {
  const { state, actions } = useApp();
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    city: "Montréal",
    sector: "realEstate",
    plan: "Premium",
    status: "pending",
    provinceAccess: ["Québec"],
    domains: [],
    responsePolicy: "Réponse sous 24h",
    billingEmail: "",
    availability: ["Lundi 10:00", "Mercredi 14:30"],
  });
  const [step, setStep] = useState(1);
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggleList = (key, value) => {
    const current = form[key] || [];
    update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };
  const selectedSector = state.sectors.find((sector) => sector.id === form.sector);
  const sectorDomains = {
    realEstate: ["Location", "Achat", "Vente", "Mise en location"],
    jobs: ["Emploi", "Employeurs", "International", "EIMT"],
    immigration: ["Nouvelle demande", "Renouvellement", "Prolongation", "Révision dossier"],
    insurance: ["Auto", "Habitation", "Entreprise"],
    auto: ["Achat", "Financement", "Leasing", "Reprise"],
  };
  const provinceOptions = ["Québec", "Ontario", "Alberta", "Colombie-Britannique"];
  const canSave = form.name && form.email && form.contactPerson && form.sector && form.provinceAccess.length;
  const save = () => actions.createPartner({ ...form, billingEmail: form.billingEmail || form.email, domains: form.domains.length ? form.domains : sectorDomains[form.sector]?.slice(0, 2) || [] });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          {[1, 2, 3].map((item) => <span key={item} className={cls("flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold", step === item ? "bg-[#F58A07] text-white" : step > item ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400")}>{item}</span>)}
        </div>
        <Pill className={selectedSector?.color}>{selectedSector?.icon} {selectedSector?.label}</Pill>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <Card className="p-4">
            <h4 className="font-semibold text-slate-900">Informations de base</h4>
            <p className="mt-1 text-xs text-slate-500">Ces informations alimentent la fiche compagnie dans la gestion admin.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-xs font-semibold text-slate-700">Nom compagnie<input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ex: ImmoPro Montréal" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
              <label className="text-xs font-semibold text-slate-700">Contact principal<input value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} placeholder="Nom du responsable" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
              <label className="text-xs font-semibold text-slate-700">Email<input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="contact@compagnie.ca" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
              <label className="text-xs font-semibold text-slate-700">Téléphone<input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 514 000 0000" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
              <label className="text-xs font-semibold text-slate-700">Site web<input value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="compagnie.ca" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
              <label className="text-xs font-semibold text-slate-700">Ville<input value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
            </div>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <Card className="p-4">
            <h4 className="font-semibold text-slate-900">Accès service</h4>
            <p className="mt-1 text-xs text-slate-500">Une compagnie travaille dans un seul service, avec des domaines internes.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="text-xs font-semibold text-slate-700">Service autorisé<select value={form.sector} onChange={(e) => { update("sector", e.target.value); update("domains", []); }} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">{state.sectors.map((sector) => <option key={sector.id} value={sector.id}>{sector.label}</option>)}</select></label>
              <label className="text-xs font-semibold text-slate-700">Politique réponse<select value={form.responsePolicy} onChange={(e) => update("responsePolicy", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option>Réponse sous 24h</option><option>Réponse sous 48h</option><option>Réponse sous 72h</option><option>Sur rendez-vous</option></select></label>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-700">Provinces couvertes</p>
              <div className="mt-2 flex flex-wrap gap-2">{provinceOptions.map((province) => <button key={province} type="button" onClick={() => toggleList("provinceAccess", province)} className={cls("rounded-full border px-3 py-2 text-xs font-semibold", form.provinceAccess.includes(province) ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-500")}>{province}</button>)}</div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-700">Domaines du service</p>
              <div className="mt-2 flex flex-wrap gap-2">{(sectorDomains[form.sector] || []).map((domain) => <button key={domain} type="button" onClick={() => toggleList("domains", domain)} className={cls("rounded-full border px-3 py-2 text-xs font-semibold", form.domains.includes(domain) ? "border-orange-200 bg-orange-50 text-orange-700" : "border-slate-200 bg-white text-slate-500")}>{domain}</button>)}</div>
            </div>
          </Card>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Card className="p-4">
            <h4 className="font-semibold text-slate-900">Subscription & statut</h4>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <label className="text-xs font-semibold text-slate-700">Plan<select value={form.plan} onChange={(e) => update("plan", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option>Premium</option></select></label>
              <label className="text-xs font-semibold text-slate-700">Statut<select value={form.status} onChange={(e) => update("status", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option value="pending">pending</option><option value="verified">verified</option><option value="suspended">suspended</option></select></label>
              <label className="text-xs font-semibold text-slate-700">Email facturation<input value={form.billingEmail} onChange={(e) => update("billingEmail", e.target.value)} placeholder="billing@compagnie.ca" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
            </div>
          </Card>
          <AvailabilityEditor value={form.availability} onChange={(slots) => update("availability", slots)} title="Disponibilités professionnelles" subtitle="Ces créneaux seront visibles au client s’il veut proposer un autre rendez-vous." showUnavailable={false} />
          <Card className="p-4">
            <h4 className="font-semibold text-slate-900">Résumé avant ajout</h4>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <Info label="Compagnie" value={form.name || "Non renseignée"} />
              <Info label="Service" value={selectedSector?.label || "Non renseigné"} />
              <Info label="Subscription" value={form.plan} />
              <Info label="Statut" value={form.status} />
            </div>
          </Card>
        </div>
      )}

      <div className="mt-4 flex justify-between gap-2 border-t border-slate-100 pt-4">
        <div>{step > 1 && <Button variant="ghost" onClick={() => setStep(step - 1)}>← Retour étape précédente</Button>}</div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
          {step < 3 ? <Button onClick={() => setStep(step + 1)}>Continuer</Button> : <Button disabled={!canSave} onClick={save}>Ajouter compagnie</Button>}
        </div>
      </div>
    </div>
  );
}

function AddTeamMemberForm() {
  const { state, actions } = useApp();
  const currentOrg = state.organizations[0];
  const [form, setForm] = useState({ companyId: currentOrg?.id || "", name: "", email: "", login: "", password: "Temp@1234", confirmPassword: "Temp@1234", role: "Agent", permissions: ["Demandes", "Offres", "Messages"] });
  const selectedOrg = state.organizations.find((org) => org.id === form.companyId) || currentOrg;
  const accessLimit = selectedOrg?.plan === "Premium" ? Math.max(5, Number(selectedOrg.employeeSeats || 5)) : 5;
  const usedAccess = selectedOrg?.team?.length || 0;
  const remainingAccess = Math.max(0, accessLimit - usedAccess);
  const needsPaidAccess = selectedOrg?.plan === "Premium" && remainingAccess === 0;
  const freeLimitReached = selectedOrg?.plan !== "Premium" && remainingAccess === 0;
  const update = (key, value) => setForm((prev) => {
    const next = { ...prev, [key]: value };
    if (key === "email" && !prev.login) next.login = value;
    return next;
  });
  const togglePermission = (permission) => update("permissions", form.permissions.includes(permission) ? form.permissions.filter((item) => item !== permission) : [...form.permissions, permission]);
  const permissions = ["Demandes", "Offres", "RDV", "Messages", "Équipe", "Factures"];
  const passwordOk = form.password && form.password.length >= 8 && form.password === form.confirmPassword;
  const canCreate = form.companyId && form.name && form.email && form.login && passwordOk && !freeLimitReached && !(selectedOrg?.plan === "Premium" && needsPaidAccess);
  return (
    <div>
      <Card className="p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">Créer un compte membre équipe</h4>
            <p className="mt-1 text-xs text-slate-500">Chaque employé possède son propre accès, rattaché à une compagnie.</p>
          </div>
          <Pill className={selectedOrg?.plan === "Premium" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}>{selectedOrg?.plan || "Free"}</Pill>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700 md:col-span-2">Compagnie<select value={form.companyId} onChange={(e) => update("companyId", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">{state.organizations.map((org) => <option key={org.id} value={org.id}>{org.name} — {org.plan}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-700">Nom complet<input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ex: Sofia A." className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Email professionnel<input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="sofia@compagnie.ca" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Login<input value={form.login} onChange={(e) => update("login", e.target.value)} placeholder="Identifiant de connexion" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Rôle<select value={form.role} onChange={(e) => update("role", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option>Agent</option><option>Recruiter</option><option>Consultant</option><option>Manager</option></select></label>
          <label className="text-xs font-semibold text-slate-700">Mot de passe temporaire<input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Confirmer mot de passe<input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Info label="Accès inclus" value={accessLimit} />
          <Info label="Accès utilisés" value={usedAccess} />
          <Info label="Accès disponibles" value={remainingAccess} />
        </div>
        {(freeLimitReached || needsPaidAccess) && <div className="mt-3 rounded-2xl bg-orange-50 p-3 text-xs font-semibold text-orange-700">{freeLimitReached ? "Plan Free: 5 employés inclus maximum." : "Ajoutez un accès employé premium pour créer ce compte."}</div>}
        <div className={cls("mt-3 rounded-2xl p-3 text-xs font-semibold", passwordOk ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700")}>
          {passwordOk ? "Mot de passe valide. Le membre devra le changer à sa première connexion." : "Le mot de passe doit contenir au moins 8 caractères et être confirmé."}
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-700">Permissions</p>
          <div className="mt-2 flex flex-wrap gap-2">{permissions.map((permission) => <button key={permission} onClick={() => togglePermission(permission)} className={cls("rounded-full px-3 py-2 text-xs font-semibold", form.permissions.includes(permission) ? "bg-orange-50 text-orange-700" : "bg-slate-100 text-slate-500")}>{permission}</button>)}</div>
        </div>
      </Card>
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4"><Button variant="ghost" onClick={actions.closeModal}>Annuler</Button><Button disabled={!canCreate} onClick={() => actions.addTeamMember(form)}>Créer compte membre</Button></div>
    </div>
  );
}

function RequestPdfExportModal({ payload = {} }) {
  const { state, actions } = useApp();
  const request = state.requests.find((item) => item.id === payload.requestId) || state.requests[0];
  const sector = state.sectors.find((item) => item.id === request?.sector);
  const config = REQUEST_FORM_CONFIG[request?.sector];
  const offers = state.offers.filter((offer) => offer.requestId === request?.id);
  const details = [
    ["Référence", request?.id],
    ["Service", sector ? `${sector.icon} ${sector.label}` : request?.sector],
    ["Type", requestTypeLabel(request?.sector, request?.type)],
    ["Statut", request?.status],
    ["Client", state.user.name],
    ["Localisation", `${request?.city || "Non renseignée"}, ${request?.province || ""}`],
    ["Urgence", request?.urgency],
    [valueLabelForSector(request?.sector, "request", requestTypeLabel(request?.sector, request?.type)), requestMainValue(request)],
    ["Offres reçues", offers.length],
    ["Dernière mise à jour", request?.updatedAt],
  ];
  const fieldRows = Object.entries(request?.details || {}).filter(([key]) => !key.endsWith("Custom")).map(([key, value]) => [fieldLabelForRequest(request, key), displayValue(value)]);
  const fileName = `Connectia-demande-${request?.id || "export"}.pdf`;
  return (
    <div>
      <div id="request-pdf-preview" className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F58A07]">Connectia</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">Fiche demande professionnelle</h3>
            <p className="mt-1 text-xs text-slate-500">Document exportable pour analyse interne avant création d’offre.</p>
          </div>
          <div className="text-left md:text-right">
            <Pill className={sector?.color}>{sector?.icon} {sector?.label}</Pill>
            <p className="mt-2 text-[11px] font-semibold text-slate-400">{fileName}</p>
          </div>
        </div>

        <div className="mt-4 rounded-3xl bg-slate-50 p-4">
          <h4 className="text-base font-semibold text-slate-900">{request?.title}</h4>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">{request?.summary}</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {details.map(([label, value]) => <Info key={label} label={label} value={value || "Non renseigné"} />)}
        </div>

        <h4 className="mt-5 font-semibold text-slate-900">Critères détaillés</h4>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {fieldRows.length ? fieldRows.map(([label, value]) => <Info key={label} label={label} value={value} />) : <EmptyState text="Aucun critère détaillé." />}
        </div>

        <h4 className="mt-5 font-semibold text-slate-900">Documents</h4>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {(request?.documents || []).map((doc) => (
            <div key={doc.id} className={cls("rounded-2xl px-3 py-2 text-xs font-semibold", doc.status === "uploaded" ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700")}>📎 {doc.name} · {doc.status === "uploaded" ? "Ajouté" : "Manquant"}</div>
          ))}
        </div>
      </div>

      <Card className="mt-4 p-4">
        <h4 className="font-semibold text-slate-900">Export professionnel</h4>
        <p className="mt-1 text-xs text-slate-500">Le PDF contient les informations de demande, critères, documents et contexte utile pour préparer une offre.</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Info label="Format" value="PDF" />
          <Info label="Nom fichier" value={fileName} />
          <Info label="Portée" value="Tous types de demande" />
        </div>
      </Card>

      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Fermer</Button>
        <Button variant="ghost" onClick={() => actions.notify("Export PDF simulé pour la preview. Backend: génération serveur à brancher.")}>Télécharger PDF</Button>
        <Button onClick={() => window.print?.()}>Imprimer / sauvegarder PDF</Button>
      </div>
    </div>
  );
}

function GeneratedReportModal({ payload = {} }) {
  const { state, actions } = useApp();
  const reportType = payload.reportType || "performance";
  const sectorId = payload.sectorId || "all";
  const period = payload.period || "12m";
  const selectedOrg = payload.companyId && payload.companyId !== "all" ? state.organizations.find((org) => org.id === payload.companyId) : null;
  const sectorScope = sectorId === "all" ? state.sectors : state.sectors.filter((sector) => sector.id === sectorId);
  const orgScope = selectedOrg ? [selectedOrg] : sectorId === "all" ? state.organizations : state.organizations.filter((org) => org.sector === sectorId);
  const periodLabel = { "30d": "30 jours", "90d": "90 jours", "12m": "12 mois" }[period] || period;
  const multiplier = { "30d": 0.18, "90d": 0.42, "12m": 1 }[period] || 1;
  const scale = (value) => Math.max(0, Math.round(Number(value || 0) * multiplier));
  const rate = (num, den) => den > 0 ? Math.round((num / den) * 100) : 0;
  const reportLabel = { monthly: "Rapport mensuel", sales: "Rapport ventes & subscriptions", performance: "Rapport performance", activity: "Rapport activité plateforme" }[reportType] || "Rapport performance";
  const getSector = (id) => state.sectors.find((sector) => sector.id === id);
  const orgRows = orgScope.map((org) => {
    const received = scale(org.stats?.received);
    const offers = scale(org.stats?.offers);
    const accepted = scale(org.stats?.accepted);
    const close = rate(accepted, offers);
    const treatment = rate(offers, received);
    const revenue = org.plan === "Premium" ? (org.sector === "jobs" ? 499 : 299) : 0;
    return { org, sector: getSector(org.sector)?.label || org.sector, plan: org.plan, received, treated: offers, offers, accepted, treatment, close, response: org.stats?.avgResponseHours || 0, revenue };
  });
  const totals = orgRows.reduce((acc, row) => ({ received: acc.received + row.received, treated: acc.treated + row.treated, offers: acc.offers + row.offers, accepted: acc.accepted + row.accepted, revenue: acc.revenue + row.revenue }), { received: 0, treated: 0, offers: 0, accepted: 0, revenue: 0 });
  const domainRows = sectorScope.map((sector) => {
    const rows = orgRows.filter((row) => row.org.sector === sector.id);
    const received = rows.reduce((sum, row) => sum + row.received, 0);
    const offers = rows.reduce((sum, row) => sum + row.offers, 0);
    const accepted = rows.reduce((sum, row) => sum + row.accepted, 0);
    const best = [...rows].sort((a, b) => b.close - a.close)[0];
    return { sector: sector.label, received, offers, accepted, treatment: rate(offers, received), close: rate(accepted, offers), bestCompany: best?.org.name || "—" };
  });
  const scopeLabel = selectedOrg ? selectedOrg.name : sectorId === "all" ? "Toutes les compagnies" : getSector(sectorId)?.label;
  const executiveRows = [
    ["Périmètre", scopeLabel],
    ["Période", periodLabel],
    ["Total compagnies", orgScope.length],
    ["Demandes reçues", totals.received],
    ["Offres envoyées", totals.offers],
    ["Offres acceptées", totals.accepted],
    ["Taux de traitement", `${rate(totals.offers, totals.received)}%`],
    ["Taux de closing", `${rate(totals.accepted, totals.offers)}%`],
    ["Revenu mensuel subscriptions", fmt(totals.revenue)],
  ];
  const safeName = selectedOrg ? selectedOrg.name.split(" ").join("-") : sectorId;
  const fileName = `Connectia-rapport-${safeName}-${period}.pdf`;

  return (
    <div>
      <div id="generated-report-document" className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D95500]">Connectia</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">{reportLabel}</h3>
            <p className="mt-1 text-xs text-slate-500">Document PDF généré à partir des métriques affichées dans le dashboard selon la sélection courante.</p>
          </div>
          <div className="text-left md:text-right">
            <Pill className="bg-slate-100 text-slate-700">{periodLabel}</Pill>
            <p className="mt-2 text-[11px] font-semibold text-slate-400">{fileName}</p>
          </div>
        </div>

        <h4 className="mt-5 font-semibold text-slate-900">Résumé du périmètre</h4>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <tbody className="divide-y divide-slate-100 bg-white">
              {executiveRows.map(([label, value]) => (
                <tr key={label}>
                  <td className="w-1/2 bg-slate-50 px-4 py-3 font-semibold text-slate-600">{label}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!selectedOrg && (
          <>
            <h4 className="mt-5 font-semibold text-slate-900">Métriques par domaine</h4>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[820px] text-left text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400"><tr><th className="px-4 py-3 font-semibold">Domaine</th><th className="px-4 py-3 font-semibold">Demandes reçues</th><th className="px-4 py-3 font-semibold">Offres envoyées</th><th className="px-4 py-3 font-semibold">Offres acceptées</th><th className="px-4 py-3 font-semibold">Taux traitement</th><th className="px-4 py-3 font-semibold">Taux closing</th><th className="px-4 py-3 font-semibold">Compagnie qui close le plus</th></tr></thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {domainRows.map((row) => <tr key={row.sector}><td className="px-4 py-3 font-semibold text-slate-900">{row.sector}</td><td className="px-4 py-3 text-slate-700">{row.received}</td><td className="px-4 py-3 text-slate-700">{row.offers}</td><td className="px-4 py-3 text-slate-700">{row.accepted}</td><td className="px-4 py-3 text-slate-700">{row.treatment}%</td><td className="px-4 py-3 text-slate-700">{row.close}%</td><td className="px-4 py-3 text-slate-700">{row.bestCompany}</td></tr>)}
                </tbody>
              </table>
            </div>
          </>
        )}

        <h4 className="mt-5 font-semibold text-slate-900">Métriques par compagnie</h4>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[980px] text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-400"><tr><th className="px-4 py-3 font-semibold">Compagnie</th><th className="px-4 py-3 font-semibold">Domaine</th><th className="px-4 py-3 font-semibold">Plan</th><th className="px-4 py-3 font-semibold">Demandes reçues</th><th className="px-4 py-3 font-semibold">Offres envoyées</th><th className="px-4 py-3 font-semibold">Offres acceptées</th><th className="px-4 py-3 font-semibold">Taux closing</th><th className="px-4 py-3 font-semibold">Réponse moyenne</th></tr></thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {orgRows.map((row) => <tr key={row.org.id} className={selectedOrg?.id === row.org.id ? "bg-orange-50/40" : ""}><td className="px-4 py-3 font-semibold text-slate-900">{row.org.name}</td><td className="px-4 py-3 text-slate-700">{row.sector}</td><td className="px-4 py-3 text-slate-700">{row.plan}</td><td className="px-4 py-3 text-slate-700">{row.received}</td><td className="px-4 py-3 text-slate-700">{row.offers}</td><td className="px-4 py-3 text-slate-700">{row.accepted}</td><td className="px-4 py-3 text-slate-700">{row.close}%</td><td className="px-4 py-3 text-slate-700">{row.response}h</td></tr>)}
            </tbody>
          </table>
        </div>

        <h4 className="mt-5 font-semibold text-slate-900">Lecture business</h4>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs"><tbody className="divide-y divide-slate-100 bg-white"><tr><td className="w-1/3 bg-slate-50 px-4 py-3 font-semibold text-slate-600">Traitement</td><td className="px-4 py-3 text-slate-700">Le taux de traitement mesure les demandes reçues qui ont réellement reçu une offre.</td></tr><tr><td className="bg-slate-50 px-4 py-3 font-semibold text-slate-600">Closing</td><td className="px-4 py-3 text-slate-700">Le closing est calculé sur les offres acceptées divisées par les offres envoyées.</td></tr><tr><td className="bg-slate-50 px-4 py-3 font-semibold text-slate-600">Utilisation</td><td className="px-4 py-3 text-slate-700">Ce document sert à exporter les données du dashboard sous format PDF/tableaux, pas à créer un nouveau dashboard.</td></tr></tbody></table>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Fermer</Button>
        <Button variant="ghost" onClick={() => actions.notify("Export PDF simulé pour la preview. Backend: génération PDF serveur à brancher.")}>Télécharger PDF</Button>
        <Button onClick={() => window.print?.()}>Imprimer / sauvegarder PDF</Button>
      </div>
    </div>
  );
}

function CreateCatalogOfferForm() {
  const { state, actions } = useApp();
  const org = state.organizations[0];
  const config = getOfferFormConfig(org.sector);
  const requestTypes = REQUEST_FORM_CONFIG[org.sector]?.requestTypes || ["Offre standard"];
  const sampleRequest = state.requests.find((request) => request.sector === org.sector) || { city: org.city, province: org.provinceAccess[0], budgetMax: 1000, currency: state.currency };
  const [form, setForm] = useState({ title: "", type: requestTypes[0], city: org.city, details: defaultOfferValues(org.sector, sampleRequest) });
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const updateDetail = (key, value) => setForm((prev) => ({ ...prev, details: { ...prev.details, [key]: value } }));
  const priceKey = getOfferPriceKey(org.sector);
  const price = Number(form.details?.[priceKey] || 0);
  const canSave = form.title && form.type && price > 0;
  return (
    <div>
      <Card className="p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">Offre modèle détaillée</h4>
            <p className="mt-1 text-xs text-slate-500">Cette offre sera matchée automatiquement avec les demandes reçues, puis comparée aux concurrents avant envoi.</p>
          </div>
          <Pill className="bg-orange-50 text-orange-700">{config.title}</Pill>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700 md:col-span-2">Titre de l’offre modèle<input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Ex: Offre premium adaptée à une demande client" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Type de demande ciblé<select value={form.type} onChange={(e) => update("type", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">{requestTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-700">Ville / zone<input value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
        </div>
      </Card>
      <Card className="mt-4 p-4">
        <div className="mb-4 flex items-center justify-between gap-3"><div><h4 className="font-semibold text-slate-900">Détails de l’offre par domaine</h4><p className="mt-1 text-xs text-slate-500">Les champs changent selon le service de la compagnie.</p></div><Pill className="bg-emerald-50 text-emerald-700">{config.primaryLabel}: {fmt(price, state.currency)}</Pill></div>
        <OfferDynamicFields config={config} values={form.details} update={updateDetail} />
        {config.photoSupport && <div className="mt-4"><RealEstatePhotosUploader photos={form.details.photos || []} onChange={(photos) => updateDetail("photos", photos)} tips={config.photoTips} /></div>}
      </Card>
      <Card className="mt-4 p-4"><h4 className="font-semibold text-slate-900">Résumé matching</h4><div className="mt-3 grid gap-3 md:grid-cols-3"><Info label="Service" value={state.sectors.find((sector) => sector.id === org.sector)?.label || org.sector} /><Info label="Type ciblé" value={form.type} /><Info label="Valeur principale" value={fmt(price, state.currency)} /></div></Card>
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4"><Button variant="ghost" onClick={actions.closeModal}>Annuler</Button><Button disabled={!canSave} onClick={() => actions.createCatalogOffer({ title: form.title, type: form.type, price, city: form.city, details: form.details })}>Créer offre modèle</Button></div>
    </div>
  );
}

function EditUserProfile() {
  const { state, actions } = useApp();
  const [form, setForm] = useState({
    name: state.user.name,
    email: state.user.email,
    phone: state.user.phone,
    city: state.user.city,
    province: state.user.province,
    language: state.user.language,
    preferredContact: state.user.preferredContact,
    accountStatus: state.user.accountStatus,
    identityStatus: state.user.identityStatus,
    preferredSectors: state.user.preferredSectors.join(", "),
    availability: state.user.availability || [],
  });
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const save = () => actions.updateUserProfile({
    ...form,
    preferredSectors: form.preferredSectors.split(",").map((item) => item.trim()).filter(Boolean),
    availability: form.availability,
  });

  return (
    <div>
      <div className="rounded-3xl bg-slate-50 p-4">
        <h4 className="font-semibold text-slate-900">Informations personnelles</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">Nom complet<input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Email<input value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Téléphone<input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Ville<input value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Province<select value={form.province} onChange={(e) => update("province", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">{CANADA_PROVINCES.map((provinceName) => <option key={provinceName}>{provinceName}</option>) }</select></label>
          <label className="text-xs font-semibold text-slate-700">Langues<input value={form.language} onChange={(e) => update("language", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
        </div>
      </div>

      <div className="mt-4 rounded-3xl bg-white p-4 ring-1 ring-slate-200">
        <h4 className="font-semibold text-slate-900">Préférences</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">Contact préféré<select value={form.preferredContact} onChange={(e) => update("preferredContact", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option>Email + in-app</option><option>Téléphone</option><option>Email seulement</option><option>Messages in-app</option></select></label>
          <label className="text-xs font-semibold text-slate-700">Statut du compte<select value={form.accountStatus} onChange={(e) => update("accountStatus", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option>Actif</option><option>En attente</option><option>À vérifier</option></select></label>
          <label className="text-xs font-semibold text-slate-700 md:col-span-2">Services préférés<input value={form.preferredSectors} onChange={(e) => update("preferredSectors", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
        </div>
      </div>

      <div className="mt-4">
        <AvailabilityEditor value={form.availability} onChange={(slots) => update("availability", slots)} title="Calendrier de disponibilité client" showUnavailable={false} />
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
        <Button onClick={save}>Sauvegarder</Button>
      </div>
    </div>
  );
}

function EditOrgProfile() {
  const { state, actions } = useApp();
  const org = state.organizations[0];
  const [form, setForm] = useState({
    name: org.name,
    contactPerson: org.contactPerson,
    email: org.email,
    phone: org.phone,
    website: org.website,
    city: org.city,
    sector: org.sector,
    plan: org.plan,
    status: org.status,
    domains: org.domains.join(", "),
    provinceAccess: org.provinceAccess.join(", "),
    responsePolicy: org.responsePolicy,
    billingEmail: org.billingEmail,
  });
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const save = () => actions.updateOrgProfile({
    ...form,
    domains: form.domains.split(",").map((item) => item.trim()).filter(Boolean),
    provinceAccess: form.provinceAccess.split(",").map((item) => item.trim()).filter(Boolean),
  });

  return (
    <div>
      <div className="rounded-3xl bg-slate-50 p-4">
        <h4 className="font-semibold text-slate-900">Informations organisation</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">Nom organisation<input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Contact principal<input value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Email<input value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Téléphone<input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Site web<input value={form.website} onChange={(e) => update("website", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700">Ville<input value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
        </div>
      </div>

      <div className="mt-4 rounded-3xl bg-white p-4 ring-1 ring-slate-200">
        <h4 className="font-semibold text-slate-900">Accès et facturation</h4>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="text-xs font-semibold text-slate-700">Secteur<select value={form.sector} onChange={(e) => update("sector", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">{state.sectors.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select></label>
          <label className="text-xs font-semibold text-slate-700">Plan<select value={form.plan} onChange={(e) => update("plan", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option>Premium</option></select></label>
          <label className="text-xs font-semibold text-slate-700">Statut<select value={form.status} onChange={(e) => update("status", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option>verified</option><option>pending</option><option>suspended</option></select></label>
          <label className="text-xs font-semibold text-slate-700">Email facturation<input value={form.billingEmail} onChange={(e) => update("billingEmail", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700 md:col-span-2">Domaines<input value={form.domains} onChange={(e) => update("domains", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700 md:col-span-2">Provinces couvertes<input value={form.provinceAccess} onChange={(e) => update("provinceAccess", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
          <label className="text-xs font-semibold text-slate-700 md:col-span-2">Politique de réponse<input value={form.responsePolicy} onChange={(e) => update("responsePolicy", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
        <Button onClick={save}>Sauvegarder</Button>
      </div>
    </div>
  );
}

function OrgProposeAppointmentModal({ offer }) {
  const { state, actions } = useApp();
  const request = state.requests.find((r) => r.id === offer.requestId);
  const [form, setForm] = useState({ date: "2026-05-25", time: "10:00", mode: "Appel téléphonique", note: "Nous vous proposons ce créneau pour discuter de l’offre." });
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <div>
      <div className="rounded-3xl bg-blue-50 p-4 ring-1 ring-blue-100">
        <Pill className="border-blue-200 bg-blue-100 text-blue-800">Offre liée</Pill>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">{offer.title}</h3>
        <p className="mt-1 text-xs text-slate-600">{request?.title}</p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-xs font-semibold text-slate-700">Date proposée<input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
        <label className="text-xs font-semibold text-slate-700">Heure proposée<input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
        <label className="text-xs font-semibold text-slate-700 md:col-span-2">Mode<select value={form.mode} onChange={(e) => update("mode", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]"><option>Appel téléphonique</option><option>Visioconférence</option><option>Message in-app</option><option>Visite en personne</option></select></label>
        <label className="text-xs font-semibold text-slate-700 md:col-span-2">Message<textarea value={form.note} onChange={(e) => update("note", e.target.value)} className="mt-2 min-h-[90px] w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
      </div>
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4"><Button variant="ghost" onClick={actions.closeModal}>Annuler</Button><Button onClick={() => actions.proposeAppointment({ offerId: offer.id, date: form.date, time: form.time, mode: form.mode, contact: { method: form.mode, phone: state.user.phone, email: state.user.email, note: form.note } })}>Envoyer au client</Button></div>
    </div>
  );
}

function OrgMessageModal({ offer }) {
  const { state, actions } = useApp();
  const request = state.requests.find((r) => r.id === offer.requestId);
  const [text, setText] = useState("Bonjour, nous vous contactons au sujet de notre offre. Nous restons disponibles pour la prochaine étape.");
  return (
    <div>
      <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
        <Pill className="border-slate-200 bg-white text-slate-600">Message lié à l’offre</Pill>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">{offer.title}</h3>
        <p className="mt-1 text-xs text-slate-500">{request?.title}</p>
      </div>
      <label className="mt-4 block text-xs font-semibold text-slate-700">Message au client<textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-2 min-h-[140px] w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" /></label>
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4"><Button variant="ghost" onClick={actions.closeModal}>Annuler</Button><Button onClick={() => actions.sendMessage("client", { offerId: offer.id, text })}>Envoyer</Button></div>
    </div>
  );
}

function QuickCreate() {
  const { actions } = useApp();
  return <div className="grid gap-3 md:grid-cols-3"><Button onClick={() => actions.openModal("createRequest")}>Créer demande</Button><Button variant="ghost" onClick={() => actions.notify("Document upload ouvert.")}>Uploader document</Button><Button variant="ghost" onClick={() => actions.openModal("availability")}>Disponibilités</Button></div>;
}

function AppointmentModal() {
  const { actions } = useApp();
  return <div><p className="text-xs text-slate-500">Choisissez votre réponse.</p><div className="mt-4 flex gap-2"><Button onClick={() => actions.notify("Rendez-vous confirmé.")}>Confirmer</Button><Button variant="ghost" onClick={() => actions.openModal("reschedule")}>Autre créneau</Button></div></div>;
}

function AvailabilityModal() {
  const { state, actions } = useApp();
  const [slots, setSlots] = useState(state.user.availability || []);
  return (
    <div>
      <AvailabilityEditor
        value={slots}
        onChange={setSlots}
        title="Calendrier de disponibilité client"
        subtitle="Ces disponibilités seront vues par les professionnels lorsqu’ils préparent une offre."
        showUnavailable={false}
      />
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
        <Button onClick={() => actions.updateUserProfile({ availability: slots })}>Sauvegarder</Button>
      </div>
    </div>
  );
}

function RescheduleModal({ payload = {} }) {
  const { state, actions } = useApp();
  const appointment = payload.appointmentId ? state.appointments.find((item) => item.id === payload.appointmentId) : state.appointments[0];
  const offer = state.offers.find((item) => item.id === appointment?.offerId) || state.offers[0];
  const org = state.organizations.find((item) => item.id === offer?.orgId) || state.organizations[0];
  const mode = state.currentRole === ROLES.USER ? "user" : "pro";
  const [slot, setSlot] = useState(appointment ? `${appointment.date} ${appointment.time}` : "");
  const [method, setMethod] = useState(appointment?.mode || "Appel téléphonique");
  const parsed = parseSlot(slot);
  return (
    <div>
      <div className="rounded-3xl bg-blue-50 p-4 ring-1 ring-blue-100">
        <Pill className="bg-blue-100 text-blue-700">Modification de créneau</Pill>
        <h3 className="mt-3 text-base font-semibold text-slate-900">{offer?.title || "Rendez-vous lié à une offre"}</h3>
        <p className="mt-1 text-xs text-slate-600">Sélectionnez uniquement un créneau disponible dans le calendrier partagé.</p>
      </div>
      <div className="mt-4">
        <SharedAvailabilityPanel
          org={org}
          mode={mode === "user" ? "user" : "pro"}
          selectedSlot={slot}
          onSelect={setSlot}
          titleOverride={mode === "user" ? "Disponibilités du professionnel" : "Disponibilités du client"}
          helperOverride={mode === "user" ? "Le client propose un nouveau créneau selon les disponibilités du professionnel." : "Le professionnel propose un nouveau créneau selon les disponibilités du client."}
        />
      </div>
      <Card className="mt-4 p-4">
        <label className="text-xs font-semibold text-slate-700">Mode du rendez-vous
          <select value={method} onChange={(event) => setMethod(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]">
            <option>Appel téléphonique</option><option>Visioconférence</option><option>Visite en personne</option><option>Message in-app</option>
          </select>
        </label>
      </Card>
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
        <Button disabled={!slot} onClick={() => actions.proposeAppointment({ offerId: offer?.id, date: parsed.day || slot, time: parsed.time || "", mode: method, title: "Nouveau créneau proposé", contact: { method, phone: state.user.phone, email: state.user.email, note: `Nouveau créneau proposé: ${slot}` } })}>Proposer ce créneau</Button>
      </div>
    </div>
  );
}

function InviteAgentModal() {
  return <AddTeamMemberForm />;
}

function UpgradePlanModal() {
  const { state, actions } = useApp();
  const org = state.organizations[0];
  const [billingEmail, setBillingEmail] = useState(org.billingEmail || org.email);
  const features = ["Demandes qualifiées par secteur", "Matching demande ↔ offre", "Comparaison concurrentielle avant envoi", "Équipe multi-utilisateurs", "Dashboard avec métriques", "Calendrier partagé"];
  return (
    <div>
      <div className="rounded-3xl bg-[#062238] p-5 text-white">
        <Pill className="bg-white/10 text-white">Plan actuel: {org.plan}</Pill>
        <h3 className="mt-4 text-xl font-semibold">Premium Connectia</h3>
        <p className="mt-2 text-sm text-white/70">299$/mois pour accéder aux demandes qualifiées et améliorer les offres avant envoi.</p>
        <p className="mt-4 text-3xl font-bold">299$<span className="text-sm font-semibold text-white/60"> / mois</span></p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {features.map((feature) => <div key={feature} className="rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-700">✓ {feature}</div>)}
      </div>
      <Card className="mt-4 p-4">
        <label className="text-xs font-semibold text-slate-700">Email de facturation
          <input value={billingEmail} onChange={(event) => setBillingEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#F58A07]" />
        </label>
        <div className="mt-3 rounded-2xl bg-orange-50 p-3 text-xs text-orange-800">Au MVP, le paiement des services se fait hors plateforme. Connectia facture l’abonnement mensuel compagnie.</div>
      </Card>
      <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">
        <Button variant="ghost" onClick={actions.closeModal}>Annuler</Button>
        <Button onClick={() => { actions.updateOrgProfile({ plan: "Premium", billingEmail }); actions.notify("Plan Premium activé pour la preview."); }}>Activer Premium</Button>
      </div>
    </div>
  );
}

function GenericAction({ type, payload }) {
  const { actions } = useApp();
  return <div><p className="text-xs text-slate-500">Action</p><p className="mt-2 text-xs text-slate-500">Confirmez votre choix.</p><div className="mt-4 flex justify-end"><Button onClick={() => actions.notify("Action exécutée.")}>Confirmer</Button></div></div>;
}

export default function ConnectiaFullUIMockup() {
  return (
    <AppContextProvider>
      <Layout />
    </AppContextProvider>
  );
}

