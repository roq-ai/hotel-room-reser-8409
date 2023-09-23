interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Hotel Owner'],
  customerRoles: [],
  tenantRoles: ['Hotel Owner', 'Hotel Manager', 'Front Desk Staff'],
  tenantName: 'Hotel',
  applicationName: 'Hotel room reservation application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage hotel information', 'Manage room details', 'Manage reservations', 'Manage services'],
  getQuoteUrl: 'https://app.roq.ai/proposal/5f2cf572-0754-470c-8a35-79822063f913',
};
