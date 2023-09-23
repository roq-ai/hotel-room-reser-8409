const mapping: Record<string, string> = {
  hotels: 'hotel',
  reservations: 'reservation',
  rooms: 'room',
  services: 'service',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
