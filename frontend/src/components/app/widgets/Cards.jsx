import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

const Cards = ({ titulo }) => {
  return (
    <Card color="gray" className="flex mt-6 w-96 hover:scale-110 box-border justify-center h-auto text-white">
      <CardBody>
        <Typography variant="h5" color="white" className="mb-2  font-titulo">
          {titulo}
        </Typography>
        <Typography className=' font-titulo'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni odit eaque quas consectetur quidem expedita
          facere, dolor ducimus quaerat tempora animi totam magnam nemo commodi, doloribus cumque aliquid omnis mollitia?
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-center pt-0 ">
        <Button color="transparent" className="border-double border-4 border-white text-sm font-titulo">
          Probar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cards;
