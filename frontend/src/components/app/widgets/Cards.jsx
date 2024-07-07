import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

const Cards = ({ titulo }) => {
  return (
    <Card color="gray" className="mt-6 w-96 hover:scale-110">
      <CardHeader className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </CardHeader>
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
