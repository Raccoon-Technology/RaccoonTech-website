export const siteConfig = {
  name: "Raccoon Technology",
  // Projects page stays built but hidden from navigation until there are real cases to show.
  showProjects: false,
  domain: "raccoontechnology.com.br",
  url: "https://raccoontechnology.com.br",
  whatsapp: {
    number: "5592985569300",
    display: "+55 (92) 98556-9300",
  },
  emails: {
    contact: "contato@raccoontechnology.com.br",
    support: "suporte@raccoontechnology.com.br",
  },
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
