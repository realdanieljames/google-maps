import React from "react";
import key from "./key";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from './Home'








// Map Options
const libraries = ["places"];
const mapContainerStyle = {

  height: "92vh",
   
};

const center = {
  lat: 40.73061,
  lng: -73.935242,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,

};
//==========================================================================================//
//==========================================================================================//
export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key.googleMapKey,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  // console.log(selected)
  const onMapClick = React.useCallback((event) => {
    console.log(event)
    // console.log(current)
    setMarkers((current) => 
    [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]
    );
    // console.log(current)

  }, []);
//==========================================================================================//
//==========================================================================================//

  const mapRef = React.useRef();
//==========================================================================================//
//==========================================================================================//

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;

  }, []);
//==========================================================================================//
//==========================================================================================//

  const panTo = React.useCallback(({lat, lng})=>{
    mapRef.current.panTo({lat, lng});
    // mapRef.current.setZoom(8);
    mapRef.current.setZoom(11);
  }, [])

//==========================================================================================//
//==========================================================================================//

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";
//==========================================================================================//
//==========================================================================================//


return (
    <div>
        <div className="header">
              <img 
                className="header_logo" 
                src="findJobs_logo.png">
              </img> 

            
              <Search panTo={panTo} />           
              <Locate panTo={panTo} />       
        </div>
{/* //==========================================================================================// */}
{/* //==========================================================================================// */}
    <div className="page_container">

      <div className="map">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
          >
  
  {/* //==========================================================================================// */}
  {/* //==========================================================================================// */}

          {markers.map((marker) => (
            <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/we'reHiringLogo.png",
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
            />
            ))}
  {/* //==========================================================================================// */}
  {/* //==========================================================================================// */}

          {selected 
          ? (
            <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
            >
              <div>
                <h2>Job Spotted!</h2>
                <p>Spotted {formatRelative(selected.time, new Date())}</p>
              </div>
            </InfoWindow>
          ) 
          : null}
        </GoogleMap>
      </div>

      <div className="product_list">

        <Home />
      </div>
      

      </div>
    </div>
  );
}
//==========================================================================================//
//==========================================================================================//


function Locate({panTo}){
  return (



    <button
    className="locate" 
    onClick={(event)=> {
      <InfoWindow/>
        console.log(event)

        navigator.geolocation.getCurrentPosition(
          (position)=>{

        
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              // zoom:position.setZoom(20)
            });
          },
          ()=> null);
    }}>
      <img src="compass.png" alt="compass - locate me"/>
      My Location
    </button>
  );
}


//==========================================================================================//
//==========================================================================================//
function Search({panTo}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 40.73061, lng: () => -73.935242 },
      radius: 200 * 1000,
    },
  });
//==========================================================================================//
//==========================================================================================//
  return (
    <div className ="search">

      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions()
          try{
            const results = await getGeocode({address});
            const {lat, lng} = await  getLatLng(results[0])
            panTo({lat,lng})
            

          } catch (error) {
            // console.log(error)
          }
          // console.log(address);
        }}
      >

        <div className="header_searchInput" >

        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
          />
        </div>


        <ComboboxPopover>
          <ComboboxList >

          {status === "OK" && 
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
              ))}
              </ComboboxList>
        </ComboboxPopover>
      </Combobox>


    
   
    </div>
  );
}
