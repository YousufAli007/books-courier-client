import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Container from '../../Components/Container';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const Coverage  = () => {
  const axiosSecure =useAxiosSecure()
  const {data:service =[]}=useQuery({
    queryKey:['service'],
    queryFn:async()=>{
      const res = await axiosSecure.get("/service")
      return res.data 
    }

  })
   console.log(service);
   
  const position = [51.505, -0.09];
  return (
    <Container>
      <div className="bg-gray-400 p-10 rounded-2xl">
        <h1 className="text-center font-bold text-3xl my-4">Coverage Ariea</h1>
        <div className="border w-full h-[800px]">
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="h-[800px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {service.map((center) => (
              <Marker
                
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </Container>
  );
};

export default Coverage ;