import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

const Cards = ({ titulo, descripcion, probar, accion }) => {
  return (
    <Card color="gray" className="flex mt-6 md:w-96 hover:scale-110 box-border justify-center h-auto text-white md:w-[90%] mx-2">
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2  font-titulo">
          {titulo}
        </Typography>
        {descripcion ? <Typography className=' font-titulo'>
          {descripcion}
        </Typography> : <span className='hidden'></span>}
      </CardBody>
      <CardFooter className="flex items-center justify-center pt-0 ">
        {probar ? <Button 
          color="transparent" 
          className="border-double border-4 border-white text-sm font-titulo hover:bg-white hover:text-black"
          onClick={() => accion()}>
          {probar}
        </Button> : <span className="hidden"></span>}
      </CardFooter>
    </Card>
  );
};

export default Cards;
