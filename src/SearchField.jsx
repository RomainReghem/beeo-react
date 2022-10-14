import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import '/node_modules/leaflet-geosearch/dist/geosearch.css'

const SearchField = () => {
  const provider = new OpenStreetMapProvider({
    params: {
      email:'beeo@beeo.fr',
      countrycodes: 'fr',
      'accept-language': 'fr'
    },
  });

  // @ts-ignore
  const searchControl = new SearchControl({
    notFoundMessage:"Désolé, nous n'avons pas trouvé cette adresse",
    searchLabel:"Rechercher un lieu",
    provider: provider,
    style:'bar',
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default SearchField;